// BOSS_FILE: IronhaulBoss
// BOSS_SNAPSHOT: 3cf4652cd737d36361a15b25712b9a3ff21a9a13bbe8337913bcf233f06c6a1d
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: BossProjectile, DPR, Effect, FloatingText, Math, Number, Object, SFX, Set, bossProjectiles, camReset, canvas, checkAABB, combatStance, ctx, danteGuardContact, danteRoyalShield, dealDamage, dino, dojoMode, enemies, floatingTexts, frames, freeMove, hasRune, mapTheme, obstacles, parry, parryDamage, parryGainUlt, perfectParryCd, platforms, sgSegmentBox, shakeTimer, shinGuardReset, visualEffects, voidChanParry, worldR
// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24480 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GiantSpiderBoss, GreatSerpentBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MosaBoss, MountainGodBoss, PoisonMothBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, VoltCloneBoss
// BOSS_PART_BEGIN s0.hudManHinh.1 READ_ONLY
function hudManHinh(b){
            if (_tbbDaVeKhung !== frames){ _tbbDaVe.clear(); _tbbDaVeKhung = frames; }
            _tbbDaVe.add(b);
            // nhieu boss cung tu ve thanh (dau tay doi) -> thanh sau xep xuong hang duoi
            if (_tbbKhung === frames) _tbbSo++; else { _tbbSo = 0; _tbbKhung = frames; }
            let d = (typeof DPR === 'number') ? DPR : 1;
            let dy = ((typeof dojoMode !== 'undefined' && dojoMode) ? 42 : 0) + _tbbSo * 40;
            ctx.setTransform(d, 0, 0, d, 0, dy * d);
        }
// BOSS_PART_END s0.hudManHinh.1

// Nguồn: index.html:24489 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, IronhaulBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0.drawTopBossBar.1 READ_ONLY
function drawTopBossBar(b, col, label, sub, hang){
            /* Khong truyen `hang` (boss TU ve thanh mau) ma trong cung mot khung co hai con
               cung goi thi thanh thu hai phai TU xuong hang duoi, khong de len nhau. */
            if (_tbbKhung === frames) _tbbSo++; else { _tbbSo = 0; _tbbKhung = frames; }
            /* Tap phai co DAU KHUNG rieng. Neu chi xoa o day thi khung nao KHONG con nao tu ve
               thanh mau se khong xoa gi ca, va tap giu nguyen ten boss cua khung truoc — con
               boss thuong bi coi la "da co thanh roi" mai mai, thanh ra mat sach thanh mau. */
            if (_tbbDaVeKhung !== frames){ _tbbDaVe.clear(); _tbbDaVeKhung = frames; }
            _tbbDaVe.add(b);
            let W = 340, x0 = canvas.width/2 - W/2, H = sub ? 30 : 17;
            /* SAN TAP co mot hang nut chiem tron dai y = 10..46, ve thanh mau len do la bi
               che khuat. Chi trong san tap moi day thanh xuong duoi hang nut do. */
            let _dinh = (typeof dojoMode !== 'undefined' && dojoMode) ? 52 : 10;
            let Y = _dinh + ((hang === undefined ? _tbbSo : hang)) * 34;
            ctx.save();
            /* Thanh mau la HUD, phai nam yen o dinh man hinh. Truoc day no duoc ve BEN TRONG
               phep dich camera, ma camY khoi dau la -CAM_TROI (160) — nen thanh mau tut hn
               160px xuong giua khung hinh, va o cac map camera cuon doc (bien, tetris) no con
               truot theo camera. Tra ve dung toa do MAN HINH. */
            if (typeof DPR === 'number') ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            ctx.fillStyle = "rgba(0,0,0,0.74)"; ctx.fillRect(x0 - 4, Y, W + 8, H);
            ctx.strokeStyle = "rgba(255,255,255,0.20)"; ctx.lineWidth = 1; ctx.strokeRect(x0 - 4, Y, W + 8, H);
            ctx.fillStyle = "rgba(255,255,255,0.13)"; ctx.fillRect(x0, Y + 4, W, 10);
            ctx.fillStyle = col; ctx.fillRect(x0, Y + 4, W * Math.max(0, Math.min(1, b.hp / b.maxHp)), 10);
            if (sub){
                ctx.fillStyle = "rgba(255,255,255,0.13)"; ctx.fillRect(x0, Y + 17, W, 7);
                ctx.fillStyle = sub.col; ctx.fillRect(x0, Y + 17, W * Math.max(0, Math.min(1, sub.v)), 7);
                ctx.fillStyle = "#0A0C10"; ctx.font = "bold 8px Consolas, monospace"; ctx.textAlign = "left";
                ctx.fillText(sub.name, x0 + 4, Y + 23.5);
            }
            ctx.fillStyle = "white"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
            ctx.fillText(label + "   " + Math.max(0, Math.ceil(b.hp)) + " / " + b.maxHp, canvas.width/2, Y + H + 12);
            ctx.textAlign = "left"; ctx.restore();
        }
// BOSS_PART_END s0.drawTopBossBar.1

// Nguồn: index.html:34234 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.IRONHAUL_MOVES.1 EDITABLE
const IRONHAUL_MOVES = {
    ih_ram:{name:'CÒI HƠI · TÔNG HAI LƯỢT',end:240},
    ih_cannon:{name:'TRIỂN KHAI PHÁO',end:137},
    ih_gatling:{name:'GIÁ SÚNG MÁY',end:148},
    ih_advance:{name:'BOOSTER · CHÉM ÁP SÁT',end:111},
    ih_combo:{name:'GUNBLADE · TAM LIÊN TRẢM',end:124},
    ih_gunblade:{name:'LÙI BẮN → CHÉM TRẢ',end:124},
    ih_upper:{name:'CHÉM HẤT · KHÔNG KÍCH',end:129},
    ih_barrage:{name:'SONG PHÁO XUNG',end:109},
    ih_skyfall:{name:'BOOSTER · THIÊN GIÁNG',end:177},
    ih_morph:{name:'CHUYỂN DẠNG · THIẾT XA',end:320},
    ih_silvercombo:{name:'KIẾM → KHIÊN → KIẾM → XUNG KÍCH',end:151},
    ih_aegis:{name:'PHI KHIÊN → ĐÂM KIẾM',end:124},
    ih_parry:{name:'THẾ ĐỠ · CHỜ PHẢN ĐÒN',end:80},
    ih_riposte:{name:'PARRY · PHẢN KÍCH',end:105},
    ih_cross:{name:'KHIÊN CHẤN → SONG TRẢM',end:130}
};
// BOSS_PART_END s1.IRONHAUL_MOVES.1

// Nguồn: index.html:34251 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.setupIronhaulArena.1 EDITABLE
function setupIronhaulArena(){
    mapTheme='ironcity';camReset();freeMove=true;
    platforms.length=enemies.length=obstacles.length=bossProjectiles.length=lavaGeysers.length=0;
    forestScene=null;grassField=[];
    platforms.push({x:-50,top:320,w:canvas.width+100,h:110});
    dino.x=130;dino.y=320-dino.h;dino.dy=0;dino.grounded=true;dino.invincible=true;dino.invTimer=90;
}
// BOSS_PART_END s1.setupIronhaulArena.1

// Nguồn: index.html:34258 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.drawIronhaulCity.1 EDITABLE
function drawIronhaulCity(){
    ctx.save();
    const sky=ctx.createLinearGradient(0,-200,0,340);sky.addColorStop(0,'#10192e');sky.addColorStop(.65,'#34334b');sky.addColorStop(1,'#b2776b');ctx.fillStyle=sky;ctx.fillRect(-50,-220,canvas.width+100,670);
    ctx.fillStyle='#b3cbd3';ctx.beginPath();ctx.arc(765,-83,31,0,7);ctx.fill();ctx.fillStyle='#253147';ctx.beginPath();ctx.arc(751,-94,29,0,7);ctx.fill();
    for(let layer=0;layer<3;layer++){
        const step=layer===0?86:layer===1?142:205;
        for(let i=-1;i<canvas.width/step+1;i++){
            const x=i*step+layer*23,h=95+((i+3)*71+layer*53)%170,top=310-h-layer*20;
            ctx.fillStyle=['#263147','#293449','#354052'][layer];ctx.fillRect(x,top,step-9,h+70);
            ctx.fillStyle=['#51616e','#7c777c','#ac9481'][layer];
            for(let yy=top+16;yy<300;yy+=24)for(let xx=x+12;xx<x+step-20;xx+=21)if((xx+yy+i*11)%7<4)ctx.fillRect(xx,yy,6,10);
            if(layer===2){ctx.fillStyle='#1d2a3a';ctx.fillRect(x+step*.3,top-15,step*.45,16);ctx.fillRect(x+step*.48,top-36,3,25);}
        }
    }
    // Loading district: gantry, suspended cables, neon freight sign and street lights.
    ctx.strokeStyle='#1e2936';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(37,308);ctx.lineTo(37,-44);ctx.lineTo(320,-44);ctx.moveTo(37,8);ctx.lineTo(260,-44);ctx.stroke();
    ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(260,-44);ctx.lineTo(260,90);ctx.lineTo(271,103);ctx.lineTo(281,92);ctx.stroke();
    ctx.fillStyle='#1b2636';ctx.fillRect(413,135,186,42);ctx.strokeStyle='#78d3cd';ctx.lineWidth=2;ctx.strokeRect(418,140,176,32);ctx.fillStyle='#a4dfd3';ctx.font='bold 18px Consolas';ctx.textAlign='center';ctx.fillText('FREIGHT DISTRICT',506,162);
    ctx.fillStyle='#202a34';ctx.fillRect(0,282,canvas.width,40);ctx.fillStyle='#636b70';ctx.fillRect(0,307,canvas.width,12);
    for(const x of [90,905]){
        ctx.fillStyle='#34434f';ctx.fillRect(x,100,6,210);ctx.fillRect(x-32,96,40,7);
        const glow=ctx.createRadialGradient(x-26,107,1,x-26,107,150);glow.addColorStop(0,'rgba(255,221,147,.18)');glow.addColorStop(1,'rgba(255,221,147,0)');ctx.fillStyle=glow;ctx.fillRect(x-176,-43,300,300);ctx.fillStyle='#ffdb9c';ctx.fillRect(x-35,103,25,4);
    }
    ctx.fillStyle='#1a222e';ctx.fillRect(-40,320,canvas.width+80,160);ctx.fillStyle='#687277';ctx.fillRect(-20,320,canvas.width+40,5);
    ctx.fillStyle='#b7aa7e';for(let x=10;x<canvas.width;x+=115)ctx.fillRect(x,359,65,4);
    ctx.fillStyle='#3d4b57';ctx.fillRect(60,394,130,4);ctx.fillRect(705,340,150,3);ctx.fillRect(430,383,200,3);
    ctx.fillStyle='#bd8c75';ctx.globalAlpha=.16;for(let x=35;x<canvas.width;x+=200)ctx.fillRect(x,327,22,36);ctx.globalAlpha=1;
    // Bounded rain streaks and wet asphalt; all scenery is decorative and never hides a pit.
    ctx.strokeStyle='rgba(171,209,219,.14)';ctx.lineWidth=1;
    for(let i=0;i<55;i++){const x=(i*137+frames*.7)%(canvas.width+60)-30,y=-180+(i*83+frames*5)%610;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-3,y+12);ctx.stroke();}
    ctx.restore();
}
// BOSS_PART_END s1.drawIronhaulCity.1

// Nguồn: index.html:34290 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulPolygon.1 EDITABLE
function ironhaulPolygon(points,fill,edge='#152633'){
    ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(edge){ctx.strokeStyle=edge;ctx.lineWidth=2;ctx.stroke();}
}
// BOSS_PART_END s1.ironhaulPolygon.1

// Nguồn: index.html:34293 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulWheel.1 EDITABLE
function ironhaulWheel(x,y,r,angle){
    ctx.fillStyle='#101a23';ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.strokeStyle='#465662';ctx.lineWidth=3;ctx.stroke();ctx.fillStyle='#a0afb6';ctx.beginPath();ctx.arc(x,y,r*.53,0,7);ctx.fill();ctx.strokeStyle='#354651';ctx.lineWidth=2;
    for(let i=0;i<5;i++){const a=angle+i*Math.PI*.4;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(a)*r*.47,y+Math.sin(a)*r*.47);ctx.stroke();}
}
// BOSS_PART_END s1.ironhaulWheel.1

// Nguồn: index.html:34297 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulTruck.1 EDITABLE
function ironhaulTruck(b,split=0){
    ctx.save();ctx.translate(b.cx(),b.y+b.h);ctx.scale(b.facingLeft?-1:1,1);
    const white=b.silver,body=white?'#dce5e8':'#426575',light=white?'#f6fbfa':'#7596a4',cab=white?'#becdd7':'#a95039';
    ctx.translate(0,-Math.sin(split*Math.PI)*22);
    ctx.fillStyle='#23343c';ctx.fillRect(-142,-35,286,21);
    // ISO container: corrugations, corner castings, locking rods and hazard labels.
    ctx.save();ctx.translate(-split*90,-split*72);ctx.rotate(-split*.28);
    ironhaulPolygon([[-142,-103],[50,-103],[55,-36],[-142,-36]],body);ctx.fillStyle=light;ctx.fillRect(-139,-101,186,5);
    ctx.strokeStyle=white?'#8eabbc':'#2b4c5d';ctx.lineWidth=3;for(let x=-130;x<49;x+=13){ctx.beginPath();ctx.moveTo(x,-94);ctx.lineTo(x,-42);ctx.stroke();}
    ctx.fillStyle='#ced7c9';ctx.font='bold 11px Consolas';ctx.textAlign='center';ctx.save();ctx.translate(-48,-72);if(b.facingLeft)ctx.scale(-1,1);ctx.fillText('IH · 081',0,0);ctx.restore();ctx.fillStyle='#cda858';ctx.fillRect(-125,-52,23,6);ctx.fillStyle='#1d2e37';ctx.fillRect(-122,-51,16,2);
    ctx.fillStyle='#91a7af';for(const x of [-141,43])for(const y of [-102,-44])ctx.fillRect(x,y,7,7);ctx.restore();
    ctx.save();ctx.translate(split*74,-split*45);ctx.rotate(split*.4);
    ironhaulPolygon([[60,-83],[105,-83],[131,-58],[139,-27],[57,-27]],cab);ctx.fillStyle=light;ctx.fillRect(59,-84,47,6);
    ironhaulPolygon([[75,-74],[104,-74],[122,-57],[75,-57]],'#112b3d','#b0d8dd');ctx.fillStyle='#517985';ctx.fillRect(78,-71,23,3);
    ctx.fillStyle='#17232c';ctx.fillRect(118,-51,19,16);ctx.strokeStyle='#9bafb6';ctx.lineWidth=2;for(let y=-48;y<-33;y+=4){ctx.beginPath();ctx.moveTo(120,y);ctx.lineTo(136,y);ctx.stroke();}
    ctx.fillStyle='#e7ddab';ctx.fillRect(132,-32,10,6);ctx.fillStyle='#9faeb4';ctx.fillRect(128,-22,18,7);ctx.fillRect(63,-36,24,4);ctx.fillStyle='#9eafb3';ctx.fillRect(58,-92,5,38);ctx.fillRect(50,-88,7,7);ctx.restore();
    for(const x of [-119,-83,34,106])ironhaulWheel(x+(x<0?-split*35:split*35),-16-split*5,16,frames*.15*(b.driveDir||1));
    const deploy=Math.min(1,b.subTimer/24);
    if(b.state==='ih_cannon'){
        ctx.save();ctx.translate(-20,-103);ctx.scale(1,deploy);ctx.fillStyle='#223e4e';ctx.fillRect(-30,-18,60,18);ctx.fillStyle='#91aab0';ctx.fillRect(-10,-35,32,20);ctx.fillStyle='#314d60';ctx.fillRect(15,-31,70,13);ctx.fillStyle='#ffcb72';ctx.fillRect(79,-30,7,11);ctx.restore();
    }else if(b.state==='ih_gatling'){
        ctx.save();ctx.translate(25,-94);ctx.scale(1,deploy);ctx.fillStyle='#253b49';ctx.fillRect(-14,-23,30,26);ctx.fillStyle='#7899a6';for(let k=0;k<3;k++)ctx.fillRect(7,-24+k*5,44,3);ctx.fillStyle='#f2ca83';ctx.fillRect(48,-25,5,17);ctx.restore();
    }
    if(b.muzzle>0){const gy=b.state==='ih_gatling'?-111:-124;ctx.fillStyle='#fff1ae';ctx.beginPath();ctx.moveTo(76,gy-7);ctx.lineTo(105,gy);ctx.lineTo(76,gy+7);ctx.closePath();ctx.fill();}
    ctx.restore();
}
// BOSS_PART_END s1.ironhaulTruck.1

// Nguồn: index.html:34323 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulArm.1 EDITABLE
function ironhaulArm(x,y,elbow,hand,col){
    ctx.strokeStyle='#162a35';ctx.lineWidth=24;ctx.lineJoin='bevel';ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(...elbow);ctx.lineTo(...hand);ctx.stroke();ctx.strokeStyle=col;ctx.lineWidth=18;ctx.stroke();
    ctx.fillStyle='#a2b4bc';ctx.beginPath();ctx.arc(...elbow,8,0,7);ctx.fill();ctx.fillStyle='#324651';ctx.fillRect(hand[0]-9,hand[1]-7,18,16);
}
// BOSS_PART_END s1.ironhaulArm.1

// Nguồn: index.html:34327 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulRobot.1 EDITABLE
function ironhaulRobot(b,alpha=1){
    ctx.save();ctx.globalAlpha*=alpha;ctx.translate(b.cx(),b.y+b.h);ctx.scale(b.facingLeft?-1:1,1);
    const silver=b.silver,col=silver?'#dce7ee':'#53798c',hi=silver?'#ffffff':'#86a8b7',dark='#203541',energy=silver?'#9de9f2':'#ffbe68';
    const active=b.slash,lean=b.pose==='thrust'?10:b.pose==='shield'?13:Math.sin(b.subTimer*.06)*1.5;
    const walk=b.state==='idle'?Math.sin(frames*.15)*4:b.pose==='dash'?16:0;
    // Container panels fold into the backpack; wheel assemblies stay visible on the new form.
    ironhaulPolygon([[-39,-142],[-62,-147],[-56,-64],[-37,-58]],dark);ironhaulPolygon([[36,-143],[57,-153],[63,-66],[38,-54]],col);
    ctx.strokeStyle=hi;ctx.lineWidth=2;for(let y=-137;y<-66;y+=12){ctx.beginPath();ctx.moveTo(43,y);ctx.lineTo(57,y-3);ctx.stroke();}
    for(const side of [-1,1]){
        const hip=side*18,knee=side*(22+walk*.25),foot=side*(27+walk*.35);
        ironhaulPolygon([[hip-14,-66],[hip+14,-66],[knee+12,-34],[knee-11,-28]],col);
        ironhaulPolygon([[knee-11,-33],[knee+12,-33],[foot+14,-7],[foot-14,-7]],hi);
        ironhaulPolygon([[foot-17,-15],[foot+13,-15],[foot+23,-3],[foot+22,0],[foot-19,0]],col);
        ctx.fillStyle=dark;ctx.fillRect(knee-8,-36,16,8);ctx.fillRect(foot-11,-23,22,4);ironhaulWheel(side*32,-54,11,0);
    }
    ctx.save();ctx.translate(lean,-2);
    ironhaulPolygon([[-42,-137],[-25,-148],[24,-148],[43,-134],[31,-81],[16,-65],[-20,-65],[-34,-86]],col);
    ironhaulPolygon([[-30,-135],[0,-129],[30,-135],[25,-107],[0,-99],[-26,-108]],silver?'#edf5fa':'#a95842');
    ironhaulPolygon([[-26,-132],[-3,-127],[-3,-114],[-25,-118]],'#153949',hi);ironhaulPolygon([[4,-127],[26,-132],[24,-118],[4,-113]],'#153949',hi);
    ctx.fillStyle=dark;for(let y=-102;y<-78;y+=6)ctx.fillRect(-19,y,38,3);
    ctx.fillStyle=energy;ctx.beginPath();ctx.arc(0,-107,silver?7:4,0,7);ctx.fill();
    ironhaulPolygon([[-16,-169],[-10,-180],[12,-180],[19,-165],[12,-149],[-12,-149]],col);ctx.fillStyle=dark;ctx.fillRect(-14,-166,29,8);ctx.fillStyle=energy;ctx.fillRect(-11,-165,23,3);ctx.fillStyle=hi;ctx.fillRect(-7,-155,15,5);
    for(const side of [-1,1]){ctx.fillStyle=col;ctx.fillRect(side<0?-56:31,-145,26,28);ctx.fillStyle=hi;ctx.fillRect(side<0?-57:30,-145,28,5);ironhaulWheel(side*48,-130,12,0);}
    const swordHand=[51+(b.pose==='thrust'?15:0),b.pose==='overhead'?-133:-88];
    const shieldHand=[b.pose==='gun'?45:-46+(b.pose==='shield'?75:0),b.pose==='shield'?-86:-101];
    ironhaulArm(-41,-126,[-56,-99],shieldHand,col);
    ironhaulArm(40,-126,[51,-110],swordHand,col);
    if(silver&&b.shieldOut<=0){
        ctx.save();ctx.translate(...shieldHand);if(b.pose==='shield')ctx.scale(1.1,1);
        ironhaulPolygon([[-27,-35],[19,-37],[32,-16],[25,29],[0,45],[-28,22],[-33,-13]],'#9dafbe',hi);
        ironhaulPolygon([[-19,-26],[13,-29],[23,-13],[16,22],[0,34],[-20,17],[-23,-9]],'#eaf3f8');
        ironhaulPolygon([[0,-24],[12,0],[0,26],[-12,0]],'#365665',energy);
        ctx.strokeStyle=energy;ctx.lineWidth=b.state==='ih_parry'?4:2;ctx.beginPath();ctx.moveTo(0,-20);ctx.lineTo(0,25);ctx.stroke();ctx.restore();
    }else if(!silver){ctx.fillStyle=dark;ctx.fillRect(shieldHand[0]-6,shieldHand[1]-5,48,14);ctx.fillStyle=hi;ctx.fillRect(shieldHand[0]+31,shieldHand[1]-4,13,12);if(b.muzzle>0){ctx.fillStyle='#ffe7a2';ctx.fillRect(shieldHand[0]+44,shieldHand[1]-9,23,18);}}
    const angle=active?active.angle:b.pose==='overhead'?-2.3:b.pose==='thrust'?0:.9;
    ctx.save();ctx.translate(...swordHand);ctx.rotate(angle);
    ironhaulPolygon([[0,-5],[90,-5],[112,0],[90,5],[0,5]],silver?'#eefaff':'#c2d0d4',energy);ctx.fillStyle=energy;ctx.fillRect(12,-4,77,2);ctx.fillStyle=dark;ctx.fillRect(-13,-5,18,10);ctx.fillStyle=hi;ctx.fillRect(-1,-12,5,24);ctx.restore();
    ctx.restore();
    if(b.pose==='dash'||!b.grounded){ctx.fillStyle=energy;for(const side of [-1,1]){ctx.beginPath();ctx.moveTo(side*40,-108);ctx.lineTo(side*41-20,-97);ctx.lineTo(side*40-50-Math.sin(frames*2)*14,-99);ctx.closePath();ctx.fill();}}
    ctx.restore();
}
// BOSS_PART_END s1.ironhaulRobot.1

// Nguồn: index.html:34368 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulRound.1 EDITABLE
function ironhaulRound(b,x,y,vx,vy,kind='bullet',targetX=null){
    const p=new BossProjectile(x,y,vx,vy,false,1);p._ironhaulOwner=b;p.ihKind=kind;p.age=0;p.color=b.silver?'#b4f7ff':'#ffc788';p.frail=kind==='bullet';
    p.w=kind==='shell'?18:kind==='shield'?48:kind==='wave'?34:12;p.h=kind==='shell'?18:kind==='shield'?48:kind==='wave'?40:7;
    p.update=function(){
        this.age++;const ox=this.x;
        if(this.ihKind==='shell')this.vy+=.22;
        if(this.ihKind==='shield'){
            if(this.age>25){const dx=b.cx()-this.x,dy=b.cy()-this.y,L=Math.hypot(dx,dy)||1;this.vx=dx/L*11;this.vy=dy/L*11;if(L<22)this.x=worldR()+9999;}
            else this.vy=Math.sin(this.age*.13)*.7;
        }
        this.x+=this.vx;this.y+=this.vy;
        if(this.ihKind==='shell'&&this.y+this.h>=317){
            visualEffects.push(new Effect(this.x,316,'explosion',true,55));
            b.hurtBox({x:this.x-52,y:259,w:104,h:62},'shell:'+this.age+':'+ox);
            this.x=worldR()+9999;
        }
        if(this.age>180||b.dying||b.hp<=0)this.x=worldR()+9999;
    };
    p.veRieng=function(q){
        ctx.save();ctx.translate(q.x+q.w/2,q.y+q.h/2);ctx.fillStyle=q.color;ctx.strokeStyle='#f1ffff';ctx.lineWidth=2;
        if(q.ihKind==='shield'){
            ctx.rotate(q.age*.25);ironhaulPolygon([[-23,-16],[0,-27],[24,-15],[24,15],[0,27],[-23,15]],'#dce9f2',q.color);ctx.beginPath();ctx.arc(0,0,14,0,7);ctx.stroke();
        }else if(q.ihKind==='shell'){ctx.beginPath();ctx.arc(0,0,9,0,7);ctx.fill();ctx.fillStyle='#fff8d5';ctx.fillRect(-3,-3,6,6);}
        else if(q.ihKind==='wave'){ctx.beginPath();ctx.moveTo(-15,19);ctx.quadraticCurveTo(28,0,0,-21);ctx.quadraticCurveTo(10,0,-15,19);ctx.fill();}
        else{ctx.rotate(Math.atan2(q.vy,q.vx));ctx.fillRect(-8,-3,16,6);ctx.fillStyle='#fff3da';ctx.fillRect(1,-2,8,4);}
        ctx.restore();
    };
    if(targetX!==null)b.reticles.push({x:targetX,t:47});
    bossProjectiles.push(p);return p;
}
// BOSS_PART_END s1.ironhaulRound.1

// Nguồn: index.html:34398 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.IronhaulBoss.1 EDITABLE
class IronhaulBoss{
    static setupArena(){setupIronhaulArena();}
    static drawArena(){drawIronhaulCity();}
    constructor(level=1){
        this.name='IRONHAUL';this.phase=1;this.silver=false;this._tier='S';this.aiRieng=true;this.tuXuLyKhien=true;
        this.w=286;this.h=104;this.x=canvas.width-325;this.y=320-this.h;this.baseY=this.y;this.dy=0;this.grounded=true;
        this._hp=30;this.maxHp=30;this.totalHp=180;this._firstStrikeHooked=true;
        Object.defineProperty(this,'hp',{enumerable:true,configurable:true,get:()=>this._hp,set:v=>this.setHealth(v)});
        this.state='entering';this.subTimer=0;this.actionTimer=45;this.facingLeft=true;this.invulnAll=true;this.burnTimer=0;
        this.pose='idle';this.vehicle=true;this.parryCd=0;this.parryLock=0;this.shieldOut=0;this.muzzle=0;
        this.slash=null;this.hitKeys=new Set();this.reticles=[];this.ghosts=[];this.lastAttack='';this.driveDir=-1;this.ram=null;
    }
    cx(){return this.x+this.w/2;}
    cy(){return this.y+this.h/2;}
    dir(){return this.facingLeft?-1:1;}
    faceP(){this.facingLeft=dino.x+dino.w/2<this.cx();}
    setHealth(v){
        if(!Number.isFinite(v))return;
        const checked=this._damageChecked;this._damageChecked=false;
        if(v<this._hp){
            if(this.invulnAll||this.dying)return;
            if(!checked&&this.anDon())return; // Legacy direct HP hits use the same finite parry window.
            if(!this._firstStrikeUsed&&hasRune('firststrike')){v-=Math.ceil(this.maxHp*.2);this._firstStrikeUsed=true;floatingTexts.push(new FloatingText(this.cx()-45,this.y-20,'FIRST STRIKE!'));}
            if(this.phase===2&&!this.silver&&v<50)v=50; // Hold the gate through every hit until the armour transition starts.
        }
        this._hp=Math.max(0,v);
    }
    resizeVehicle(vehicle){
        const cx=this.cx(),feet=this.y+this.h;this.vehicle=vehicle;this.w=vehicle?286:104;this.h=vehicle?104:180;
        this.x=Math.max(8,Math.min(canvas.width-this.w-8,cx-this.w/2));this.y=feet-this.h;this.baseY=320-this.h;
    }
    clearAttack(){
        this.slash=null;this.hitKeys.clear();this.ram=null;this.pose='idle';this.dy=0;this.shieldOut=0;this.reticles=[];this.landT=0;
        const c=this._dswControl;if(c?.release)c.release();
    }
    startPhase2(){
        if(this.phase!==1)return;
        this.clearAttack();this.phase=2;this._hp=this.maxHp=150;this.state='ih_shift';this.subTimer=0;this.invulnAll=true;
        this.y=this.baseY;this.grounded=true;
        for(let i=bossProjectiles.length-1;i>=0;i--)if(bossProjectiles[i]._ironhaulOwner===this)bossProjectiles.splice(i,1);
        floatingTexts.push(new FloatingText(this.cx()-90,120,'IRONHAUL · CHUYỂN DẠNG'));shakeTimer=14;
        SFX.tone(120,.3,'sawtooth',.12,500);
    }
    startSilver(){
        if(this.silver||this.phase!==2)return;
        this.clearAttack();this.silver=true;this.resizeVehicle(false);this.y=this.baseY;this.grounded=true;
        this.state='ih_silver';this.subTimer=0;this.invulnAll=true;this.parryCd=80;
        for(let i=bossProjectiles.length-1;i>=0;i--)if(bossProjectiles[i]._ironhaulOwner===this)bossProjectiles.splice(i,1);
        floatingTexts.push(new FloatingText(this.cx()-85,100,'SILVER AEGIS · KIẾM & KHIÊN'));shakeTimer=20;
        SFX.tone(350,.4,'triangle',.15,1500);
    }
    combatTick(){
        if(this.dying)return;
        if(this.phase===1&&this.hp<=0)this.startPhase2();
        else if(this.phase===2&&!this.silver&&this.hp<=50)this.startSilver();
    }
    idle(wait=40){
        this.clearAttack();if(this.phase===2&&this.vehicle)this.resizeVehicle(false);
        this.state='idle';this.subTimer=0;this.actionTimer=wait;this.invulnAll=false;
    }
    legalMoves(){return this.phase===1?['ih_ram','ih_cannon','ih_gatling']:this.silver?['ih_advance','ih_silvercombo','ih_aegis','ih_parry','ih_cross','ih_morph']:['ih_advance','ih_combo','ih_gunblade','ih_upper','ih_barrage','ih_skyfall','ih_morph'];}
    chooseAttack(){
        this.faceP();const gap=Math.abs(dino.x+dino.w/2-this.cx());let pool;
        if(this.phase===1)pool=this.legalMoves();
        else if(this.silver){pool=gap>260?['ih_advance','ih_aegis','ih_morph']:['ih_silvercombo','ih_cross','ih_aegis','ih_parry'];if(this.parryCd>0)pool=pool.filter(x=>x!=='ih_parry');}
        else pool=gap>290?['ih_advance','ih_morph','ih_advance','ih_barrage']:!dino.grounded?['ih_upper','ih_gunblade','ih_skyfall']:['ih_combo','ih_advance','ih_gunblade','ih_upper','ih_skyfall'];
        const next=pool.filter(x=>x!==this.lastAttack);this.begin(next[Math.floor(Math.random()*next.length)]||pool[0]);
    }
    begin(state){
        if(!this.legalMoves().includes(state)&&state!=='ih_riposte')return false;
        this.clearAttack();this.state=state;this.lastAttack=state;this.subTimer=0;this.faceP();this.attackDir=this.dir();
        this.lockX=Math.max(70,Math.min(canvas.width-70,dino.x+dino.w/2));this.lockY=dino.y+dino.h/2;
        if(state==='ih_parry')this.parryCd=300;
        if(state==='ih_ram')this.ram={leg:0,stage:'warn',t:0,dir:this.ramDirection(),hit:false};
        return true;
    }
    anDon(context){
        // dealDamage already checked the projectile's approach side; do not check it again using the player's new position.
        if(context)this._damageChecked=true;
        if(!this.silver||this.state!=='ih_parry'||this.subTimer<26||this.subTimer>34)return false;
        const source=context?.proj,px=source?source.x+(source.w||8)/2:dino.x+dino.w/2;
        if((px-this.cx())*this.dir()<-8)return false;
        this._damageChecked=false;this.state='ih_riposte';this.subTimer=0;this.slash=null;this.hitKeys.clear();this.parryLock=8;this.invulnAll=true;
        visualEffects.push(new Effect(this.cx()+this.dir()*45,this.cy(),'parry'));floatingTexts.push(new FloatingText(this.cx()-40,this.y-24,'PARRY!'));
        shakeTimer=Math.max(shakeTimer,7);return true;
    }
    hurtBox(box,key){
        if(this.hitKeys.has(key)||!checkAABB(box,dino))return false;
        this.hitKeys.add(key);
        if(dino.isShielding()){
            if(danteRoyalShield())danteGuardContact(1,this);
            else{
                const perfect=(dino.parryWindow>0||dino.meleeTimer>=(combatStance===2?38:23))&&perfectParryCd<=0&&!voidChanParry();
                parry(dino.y+20);
                if(perfect){dealDamage(this,parryDamage(this,true),'flat');perfectParryCd=30;parryGainUlt(true);shinGuardReset(true);if(!this.invulnAll)this.idle(55);}
            }
        }else dino.takeDamage(1);
        return true;
    }
    swing(kind='cut',reach=112,life=11){
        const angles=kind==='rise'?[1.25,-1.9]:kind==='thrust'?[-.12,.08]:[-2.2,1.25];
        this.slash={age:0,life,kind,reach,dir:this.attackDir,a0:angles[0],a1:angles[1],angle:angles[0],hit:false};
        this.pose=kind==='thrust'?'thrust':kind==='rise'?'overhead':'cut';
        SFX.tone(400,.08,'sawtooth',.06,130);
    }
    tickSlash(){
        const s=this.slash;if(!s)return;
        const prev=s.angle;s.angle=s.a0+(s.a1-s.a0)*Math.min(1,++s.age/s.life);
        const x=this.cx()+s.dir*(s.kind==='thrust'?66:51),y=this.y+this.h-(s.kind==='rise'?135:90);
        if(!s.hit)for(let k=0;k<=8;k++){
            const a=prev+(s.angle-prev)*k/8;
            if(sgSegmentBox(x,y,x+s.dir*Math.cos(a)*s.reach,y+Math.sin(a)*s.reach,dino,12)!==null){s.hit=true;this.hurtBox({x:dino.x,y:dino.y,w:dino.w,h:dino.h},'sword:'+this.subTimer);break;}
        }
        if(s.age>=s.life)this.slash=null;
    }
    shoot(count=1,spread=.08){
        const x=this.cx()+this.attackDir*(this.vehicle?78:95),y=this.vehicle?this.y+this.h-111:this.cy()-7,angle=Math.atan2(this.lockY-y,this.lockX-x);
        if(!this.vehicle)this.pose='gun';
        for(let i=0;i<count;i++){
            const a=angle+(i-(count-1)/2)*spread;
            ironhaulRound(this,x,y,Math.cos(a)*8,Math.sin(a)*8);
        }
        this.muzzle=5;SFX.tone(160,.045,'square',.06,80);
    }
    move(dx){
        const old=this.x;this.x=Math.max(8,Math.min(canvas.width-this.w-8,this.x+dx));
        if(Math.abs(dx)>7&&frames%4===0){
            const g=Object.create(IronhaulBoss.prototype);
            for(const k of ['y','w','h','facingLeft','pose','silver','state','subTimer','shieldOut','grounded','vehicle','driveDir'])g[k]=this[k];
            Object.assign(g,{x:old,t:12,slash:null,muzzle:0});this.ghosts.push(g);
        }
    }
    physics(){
        this.dy+=.65;this.y+=this.dy;
        if(this.y>=this.baseY){this.y=this.baseY;this.dy=0;this.grounded=true;}else this.grounded=false;
    }
    ramDirection(){return this.x<80?1:this.x+this.w>canvas.width-80?-1:this.attackDir;}
    tickRam(){
        const r=this.ram;if(!r){this.idle(50);return;}
        r.t++;this.driveDir=r.dir;this.facingLeft=r.dir<0;this.pose=r.stage==='drive'?'dash':'idle';
        if(r.stage==='warn'){
            if(r.t===1)SFX.tone(100,.26,'sawtooth',.10,85);
            if(r.t>=32){r.stage='drive';r.t=0;}
        }else{
            const old=this.x;this.move(r.dir*12.5);
            this.hurtBox({x:Math.min(old,this.x)+12,y:this.y+22,w:this.w-24+Math.abs(this.x-old),h:this.h-24},'ram:'+r.leg);
            if(this.x<=8||this.x>=canvas.width-this.w-8||r.t>90){
                r.leg++;if(r.leg>=2){this.ram=null;if(this.phase===1)this.idle(57);else{this.state='ih_unfold';this.subTimer=0;}return;}
                r.dir=-r.dir;r.stage='warn';r.t=0;
            }
        }
    }
    update(){
        if(this.dying)return;
        this.combatTick();if(this.hp<=0)return;
        for(const g of this.ghosts)g.t--;this.ghosts=this.ghosts.filter(g=>g.t>0).slice(-8);
        for(const r of this.reticles)r.t--;this.reticles=this.reticles.filter(r=>r.t>0);
        if(this.parryCd>0)this.parryCd--;if(this.shieldOut>0)this.shieldOut--;if(this.muzzle>0)this.muzzle--;
        if(this.parryLock>0){this.parryLock--;if(!this.parryLock)this.invulnAll=false;}
        this.subTimer++;const t=this.subTimer,st=this.state;
        if(st==='entering'){if(t>=60)this.idle(40);return;}
        if(st==='ih_shift'){
            if(t===44)this.resizeVehicle(false);
            if(t>=100)this.idle(48);return;
        }
        if(st==='ih_silver'){if(t===46)visualEffects.push(new Effect(this.cx(),this.cy(),'body_slam_shockwave',true,110));if(t>=100)this.idle(48);return;}
        this.physics();this.tickSlash();
        if(this.phase===2&&t<=23&&['ih_combo','ih_upper','ih_skyfall','ih_silvercombo','ih_cross'].includes(st))this.pose='overhead';
        if(['returning','returning_place','stunned','vulnerable'].includes(st)){if(t>45||--this.actionTimer<=0)this.idle(45);return;}
        if(st==='idle'){
            this.faceP();if(this.phase===2){const gap=dino.x+dino.w/2-this.cx();if(Math.abs(gap)>155)this.move(Math.sign(gap)*2.1);}
            if(--this.actionTimer<=0)this.chooseAttack();return;
        }
        if(st==='ih_ram'){this.tickRam();return;}
        if(st==='ih_morph'){
            if(t===28){this.resizeVehicle(true);this.y=this.baseY;this.ram={leg:0,stage:'warn',t:0,dir:this.ramDirection(),hit:false};}
            if(t>=28){this.tickRam();if(this.state==='ih_morph'&&t>300){this.state='ih_unfold';this.subTimer=0;}}return;
        }
        if(st==='ih_unfold'){if(t===22)this.resizeVehicle(false);if(t>=58)this.idle(48);return;}
        if(st==='ih_cannon'){
            if([24,52,80].includes(t))this.lockX=Math.max(25,Math.min(canvas.width-25,dino.x+dino.w/2));
            if([38,66,94].includes(t)){
                const x=this.cx()+this.attackDir*75,y=this.y-20,flight=46;
                ironhaulRound(this,x,y,(this.lockX-x)/flight,(303-y-.22*flight*(flight+1)/2)/flight,'shell',this.lockX);this.muzzle=6;SFX.tone(85,.15,'square',.12,35);
            }
        }else if(st==='ih_gatling'){
            if(t===24){this.lockX=dino.x+dino.w/2;this.lockY=dino.y+dino.h/2;}
            if(t>=36&&t<=113&&(t-36)%7===0)this.shoot();
        }else if(st==='ih_advance'){
            if(t>=25&&t<45){this.pose='dash';if(Math.abs(dino.x+dino.w/2-this.cx())>110)this.move(this.attackDir*10);}
            if(t===52||t===78)this.swing(t===52?'cut':'rise');
        }else if(st==='ih_combo'){
            if([26,54,86].includes(t)){this.move(this.attackDir*16);this.swing(t===54?'rise':t===86?'thrust':'cut');}
        }else if(st==='ih_gunblade'){
            if(t===20){this.dy=-8;this.pose='dash';}
            if(t>=20&&t<45)this.move(-this.attackDir*3.6);
            if([30,40,50].includes(t))this.shoot();
            if(t>=58&&t<74)this.move(this.attackDir*6);
            if(t===82)this.swing('cut',125);
        }else if(st==='ih_upper'){
            if(t===30){this.swing('rise',120);this.dy=-10;}
            if(t>=30&&t<48)this.move(this.attackDir*2.8);
            if(t===54)this.swing('cut',120);
            if(t===83)this.swing('cut',125);
        }else if(st==='ih_barrage'){
            if(t===20){this.lockX=dino.x+dino.w/2;this.lockY=dino.y+dino.h/2;}
            if([30,38,46,66,74,82].includes(t))this.shoot(1);
        }else if(st==='ih_skyfall'){
            if(t===12)this.reticles.push({x:this.lockX,t:60});
            if(t===24){this.dy=-13;this.pose='overhead';}
            if(t>=25&&t<47)this.move((this.lockX-this.cx())*.12);
            if(t===50)this.dy=16;
            if(t>=50&&this.grounded&&!this.hitKeys.has('skyfall-land')){
                this.hitKeys.add('skyfall-land');this.landT=t;
                this.hurtBox({x:this.cx()-95,y:250,w:190,h:70},'skyfall');visualEffects.push(new Effect(this.cx(),318,'explosion',true,85));shakeTimer=12;
                for(const dir of [-1,1])ironhaulRound(this,this.cx(),280,dir*5,0,'wave');
            }
            if(this.landT&&t>this.landT+38){this.landT=0;this.idle(35);return;}
        }else if(st==='ih_silvercombo'){
            if(t===24||t===79)this.swing(t===24?'cut':'rise',120);
            if(t>=44&&t<=52){this.pose='shield';this.move(this.attackDir*3.2);this.hurtBox({x:this.cx()+this.attackDir*48-(this.attackDir<0?65:0),y:this.y+60,w:65,h:105},'shield-bash');}
            if(t===108){this.pose='shield';ironhaulRound(this,this.cx()+this.attackDir*60,279,this.attackDir*6.4,0,'wave');}
        }else if(st==='ih_aegis'){
            if(t===30){ironhaulRound(this,this.cx()+this.attackDir*35,this.cy()-8,this.attackDir*9,0,'shield');this.shieldOut=70;}
            if(t>=56&&t<69)this.move(this.attackDir*5);
            if(t===70)this.swing('thrust',132);
        }else if(st==='ih_parry'){
            this.pose='shield';
        }else if(st==='ih_riposte'){
            if(t>=28&&t<37){this.pose='shield';this.move(this.attackDir*5);this.hurtBox({x:this.cx()+this.attackDir*45-(this.attackDir<0?80:0),y:this.y+58,w:80,h:108},'riposte-shield');}
            if(t===59)this.swing('cut',135);
        }else if(st==='ih_cross'){
            if(t===30){this.pose='shield';for(const dir of [-1,1])ironhaulRound(this,this.cx(),279,dir*5.2,0,'wave');}
            if(t===64||t===91){this.move(this.attackDir*20);this.swing(t===64?'rise':'cut',126);}
        }else{this.idle(45);return;}
        if(t>=(IRONHAUL_MOVES[st]?.end||150))this.idle(st==='ih_parry'?55:42);
    }
    draw(){
        ctx.save();
        for(const g of this.ghosts){ctx.save();ctx.globalAlpha=g.t/12*.15;if(g.vehicle)ironhaulTruck(g);else ironhaulRobot(g);ctx.restore();}
        ctx.fillStyle='rgba(3,11,19,.35)';ctx.beginPath();ctx.ellipse(this.cx(),322,this.vehicle?145:65,10,0,0,7);ctx.fill();
        for(const r of this.reticles){ctx.strokeStyle=this.silver?'#b9f6ff':'#ffb46a';ctx.lineWidth=2;ctx.setLineDash([5,5]);ctx.beginPath();ctx.ellipse(r.x,318,54,8,0,0,7);ctx.stroke();ctx.setLineDash([]);}
        if(this.state==='ih_shift'){
            const u=Math.min(1,this.subTimer/80);
            if(u<.7){ctx.globalAlpha=1-u;ironhaulTruck(this,u);ctx.globalAlpha=1;}
            if(this.subTimer>=44){ctx.save();ctx.translate(0,(1-u)*50);ironhaulRobot(this,Math.min(1,u*1.5));ctx.restore();}
        }else if(this.state==='ih_morph'&&this.subTimer<28){ironhaulRobot(this,1-this.subTimer/34);ctx.globalAlpha=this.subTimer/28;ironhaulTruck(this,1-this.subTimer/28);ctx.globalAlpha=1;}
        else if(this.state==='ih_unfold'){if(this.subTimer<22)ironhaulTruck(this,this.subTimer/30);else ironhaulRobot(this,Math.min(1,(this.subTimer-22)/20));}
        else if(this.vehicle)ironhaulTruck(this);
        else ironhaulRobot(this);
        if(this.state==='ih_silver'){
            const t=this.subTimer,q=Math.min(1,t/75);
            if(t<75)for(const side of [-1,1]){ctx.save();ctx.globalAlpha=1-q;ctx.translate(this.cx()+side*(20+q*100),this.y+70-q*35);ctx.rotate(side*q*.8);ironhaulPolygon([[-16,-37],[16,-33],[18,35],[-17,31]],'#53798c','#9cb4be');ctx.restore();}
            ctx.strokeStyle='rgba(213,250,255,'+Math.max(0,1-t/100)+')';ctx.lineWidth=3;
            for(let i=0;i<8;i++){const a=i*Math.PI/4+t*.04,R=20+t*1.5;ctx.beginPath();ctx.moveTo(this.cx()+Math.cos(a)*R,this.cy()+Math.sin(a)*R);ctx.lineTo(this.cx()+Math.cos(a)*(R+22),this.cy()+Math.sin(a)*(R+22));ctx.stroke();}
        }
        if(this.slash){
            const s=this.slash,x=this.cx()+s.dir*51,y=this.y+this.h-(s.kind==='rise'?135:90);
            ctx.save();ctx.translate(x,y);ctx.scale(s.dir,1);ctx.strokeStyle=this.silver?'#bdfaff':'#ffc987';ctx.lineWidth=9;ctx.globalAlpha=.45;
            const old=s.angle-(s.a1-s.a0)*.22;
            ctx.beginPath();ctx.arc(0,0,s.reach*.78,Math.min(old,s.angle),Math.max(old,s.angle));ctx.stroke();ctx.globalAlpha=.9;ctx.lineWidth=2;ctx.stroke();ctx.restore();
        }
        const wind=this.ram?.stage==='warn'||this.state==='ih_parry'&&this.subTimer<=34;
        if(wind){ctx.strokeStyle=this.state==='ih_parry'?'#bdfaff':'#ffbc6e';ctx.lineWidth=3;ctx.beginPath();ctx.arc(this.cx()+this.dir()*(this.vehicle?123:52),this.cy(),this.state==='ih_parry'?29:19,0,7);ctx.stroke();}
        ctx.restore();
        const label=this.phase===1?'CONTAINER · 30 HP':this.silver?'SILVER AEGIS · KIẾM & KHIÊN':'GUNBLADE · 150 HP';
        drawTopBossBar(this,this.silver?'#d9eff7':this.phase===1?'#f3b664':'#79b8d0','IRONHAUL · '+label);
        ctx.save();hudManHinh(this);ctx.textAlign='center';ctx.font='bold 11px Consolas';ctx.fillStyle=this.silver?'#d9faff':'#f4cca0';ctx.fillText(IRONHAUL_MOVES[this.state]?.name||(['ih_shift','ih_silver'].includes(this.state)?'ĐANG CHUYỂN DẠNG…':'FREIGHT DISTRICT'),canvas.width/2,53);ctx.restore();
    }
}
// BOSS_PART_END s1.IronhaulBoss.1

// Nguồn: index.html:34717 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.lavaGeysers.1 READ_ONLY
let lavaGeysers = [];
// BOSS_PART_END s1.lavaGeysers.1

// Nguồn: index.html:34718 · Dùng bởi: IndominusBoss, IronhaulBoss
// BOSS_PART_BEGIN s1.grassField.1 READ_ONLY
let grassField = [];
// BOSS_PART_END s1.grassField.1

// Nguồn: index.html:34719 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.forestScene.1 READ_ONLY
let forestScene = null;
// BOSS_PART_END s1.forestScene.1
