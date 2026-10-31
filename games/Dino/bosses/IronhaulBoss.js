// BOSS_FILE: IronhaulBoss
// BOSS_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: BossProjectile, DPR, Effect, FloatingText, Math, Number, Object, SFX, Set, bossProjectiles, camReset, canvas, checkAABB, combatStance, ctx, danteGuardContact, danteRoyalShield, dealDamage, dino, dojoMode, enemies, floatingTexts, frames, freeMove, hasRune, mapTheme, obstacles, parry, parryDamage, parryGainUlt, perfectParryCd, platforms, sgSegmentBox, shakeTimer, shinGuardReset, visualEffects, voidChanParry, worldR
// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
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

// Nguồn: index.html:24489 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, IronhaulBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
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
// BOSS_PART_BEGIN s1.IRONHAUL_SHIELD_SCALE.1 EDITABLE
const IRONHAUL_SHIELD_SCALE=1.25;
// BOSS_PART_END s1.IRONHAUL_SHIELD_SCALE.1

// Nguồn: index.html:34235 · Dùng bởi: IronhaulBoss
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
    ih_cleaver:{name:'KIẾM HAI TAY · BỔ NẶNG → ĐÂM → BẮN',end:160},
    ih_flank:{name:'BOOSTER · VƯỢT ĐẦU → QUAY KIẾM',end:140},
    ih_silvercombo:{name:'KIẾM → XOAY KHIÊN → CHÉM HẤT → HÚC',end:180},
    ih_aegis:{name:'PHI KHIÊN → ĐÂM KIẾM',end:124},
    ih_parry:{name:'THẾ ĐỠ · CHỜ PHẢN ĐÒN',end:80},
    ih_riposte:{name:'PARRY · PHẢN KÍCH',end:105},
    ih_cross:{name:'ĐẬP KHIÊN → CHÉM HẤT → BỔ KIẾM',end:148},
    ih_shieldrush:{name:'KHIÊN TIÊN PHONG → KIẾM → XOAY KHIÊN',end:163},
    ih_reversal:{name:'XOAY NGƯỢC KHIÊN → ĐÂM → HẤT KHIÊN',end:164},
    ih_overcharge:{name:'LÕI NĂNG LƯỢNG → CƯỜNG HÓA KIẾM',end:122},
    ih_bladefan:{name:'TAM LIÊN KIẾM KHÍ',end:142}
};
// BOSS_PART_END s1.IRONHAUL_MOVES.1

// Nguồn: index.html:34259 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.IRONHAUL_SWORD_BEATS.1 EDITABLE
const IRONHAUL_SWORD_BEATS={
    ih_overcharge:[[88,'cut',124,16]],ih_bladefan:[[32,'rise',120,16],[64,'cut',124,16],[96,'thrust',130,16]],
    ih_advance:[[52,'cut',112,14],[78,'rise',112,14]],
    ih_combo:[[26,'cut',112,14],[54,'rise',112,14],[86,'thrust',112,14]],
    ih_gunblade:[[82,'cut',125,14]],ih_upper:[[30,'rise',120,14],[54,'cut',120,13],[83,'cut',125,15]],
    ih_cleaver:[[34,'cut',128,18],[86,'thrust',130,15]],ih_flank:[[72,'cut',120,15],[99,'thrust',120,15]],
    ih_silvercombo:[[24,'cut',120,15],[91,'rise',120,15]],ih_aegis:[[70,'thrust',132,15]],
    ih_riposte:[[61,'cut',135,15]],ih_cross:[[72,'rise',126,15],[106,'cut',126,15]],
    ih_shieldrush:[[68,'cut',119,15]],ih_reversal:[[84,'thrust',128,15]]
};
// BOSS_PART_END s1.IRONHAUL_SWORD_BEATS.1

// Nguồn: index.html:34269 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulSwordBeats.1 EDITABLE
function ironhaulSwordBeats(b){const beats=IRONHAUL_SWORD_BEATS[b.state]||[];return b.silver&&b.state==='ih_advance'?beats.slice(0,1):beats;}
// BOSS_PART_END s1.ironhaulSwordBeats.1

// Nguồn: index.html:34270 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.IRONHAUL_SHIELD_BEATS.1 EDITABLE
const IRONHAUL_SHIELD_BEATS={
    ih_advance:[[78,'spin',24]],
    ih_silvercombo:[[50,'spin',28],[125,'bash',18]],ih_riposte:[[28,'bash',18]],
    ih_cross:[[30,'slam',18]],ih_shieldrush:[[29,'bash',21],[101,'spin',30]],ih_reversal:[[29,'spin',32],[119,'upper',18]]
};
// BOSS_PART_END s1.IRONHAUL_SHIELD_BEATS.1

// Nguồn: index.html:34275 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.setupIronhaulArena.1 EDITABLE
function setupIronhaulArena(){
    mapTheme='ironcity';camReset();freeMove=true;
    platforms.length=enemies.length=obstacles.length=bossProjectiles.length=lavaGeysers.length=0;
    forestScene=null;grassField=[];
    platforms.push({x:-50,top:320,w:canvas.width+100,h:110});
    dino.x=130;dino.y=320-dino.h;dino.dy=0;dino.grounded=true;dino.invincible=true;dino.invTimer=90;
}
// BOSS_PART_END s1.setupIronhaulArena.1

// Nguồn: index.html:34282 · Dùng bởi: IronhaulBoss
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

// Nguồn: index.html:34314 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulPolygon.1 READ_ONLY
function ironhaulPolygon(points,fill,edge='#152633'){
    ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(edge){ctx.strokeStyle=edge;ctx.lineWidth=2;ctx.stroke();}
}
// BOSS_PART_END s1.ironhaulPolygon.1

// Nguồn: index.html:34317 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulWheel.1 EDITABLE
function ironhaulWheel(x,y,r,angle){
    ctx.fillStyle='#101a23';ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.strokeStyle='#465662';ctx.lineWidth=3;ctx.stroke();ctx.fillStyle='#a0afb6';ctx.beginPath();ctx.arc(x,y,r*.53,0,7);ctx.fill();ctx.strokeStyle='#354651';ctx.lineWidth=2;
    for(let i=0;i<5;i++){const a=angle+i*Math.PI*.4;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(a)*r*.47,y+Math.sin(a)*r*.47);ctx.stroke();}
}
// BOSS_PART_END s1.ironhaulWheel.1

// Nguồn: index.html:34321 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulTruck.1 READ_ONLY
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

// Nguồn: index.html:34348 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulMix.1 READ_ONLY
function ironhaulMix(a,b,t){return a+(b-a)*Math.max(0,Math.min(1,t));}
// BOSS_PART_END s1.ironhaulMix.1

// Nguồn: index.html:34349 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulEase.1 READ_ONLY
function ironhaulEase(t){t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);}
// BOSS_PART_END s1.ironhaulEase.1

// Nguồn: index.html:34350 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulAngleMix.1 EDITABLE
function ironhaulAngleMix(a,b,t){return a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*Math.max(0,Math.min(1,t));}
// BOSS_PART_END s1.ironhaulAngleMix.1

// Nguồn: index.html:34351 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulRot.1 EDITABLE
function ironhaulRot(p,a,origin={x:0,y:0}){return {x:origin.x+p.x*Math.cos(a)-p.y*Math.sin(a),y:origin.y+p.x*Math.sin(a)+p.y*Math.cos(a)};}
// BOSS_PART_END s1.ironhaulRot.1

// Nguồn: index.html:34352 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulIK.1 EDITABLE
function ironhaulIK(root,target,upper,lower,bend=1){
    const dx=target.x-root.x,dy=target.y-root.y,L=Math.hypot(dx,dy)||1;
    const d=Math.max(Math.abs(upper-lower)+.01,Math.min(upper+lower-.01,L)),ux=dx/L,uy=dy/L;
    const along=(upper*upper-lower*lower+d*d)/(2*d),h=Math.sqrt(Math.max(0,upper*upper-along*along));
    return {root:{...root},joint:{x:root.x+ux*along-uy*h*bend,y:root.y+uy*along+ux*h*bend},end:{x:root.x+ux*d,y:root.y+uy*d}};
}
// BOSS_PART_END s1.ironhaulIK.1

// Nguồn: index.html:34358 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulRig.1 READ_ONLY
function ironhaulRig(b){
    const t=b.subTimer||0,st=b.state||'idle',s=b.slash,q=b.shieldStrike;
    const recent=Math.exp(-Math.max(0,frames-(b.animAt??-1000))*.24),speed=Math.min(1,Math.abs(b.animSpeed||0)/6)*recent;
    const gait=b.gait||0,air=!b.grounded,silver=!!b.silver;
    const gunWindow=(a,b,c,d)=>ironhaulEase((t-a)/(b-a))*(1-ironhaulEase((t-c)/(d-c)));
    const gunBlend=st==='ih_barrage'?gunWindow(8,25,86,109):st==='ih_gunblade'?gunWindow(18,29,55,73):st==='ih_cleaver'?gunWindow(103,114,131,159):b.pose==='gun'?1:0;
    let turn=0,lean=speed*.13,crouch=0,swordTarget={x:50,y:-88},offTarget={x:8,y:-94},blade=.72,shieldAngle=-.1;
    const nextSword=ironhaulSwordBeats(b).find(k=>t<=k[0]&&t>=k[0]-18);
    const wind=nextSword?ironhaulEase((t-nextSword[0]+18)/18):0;
    if(st==='ih_advance'&&t>=20&&t<50){swordTarget={x:5,y:-125};blade=-2.7;offTarget={x:30,y:-115};lean=.22;crouch=.25;}
    if(st==='ih_flank'&&t>=20&&t<68){turn=Math.sin(Math.max(0,Math.min(1,(t-43)/20))*Math.PI)*.25;lean=-.2;swordTarget={x:18,y:-151};blade=-1.8;}
    if(st==='ih_skyfall'&&t<=24){const u=ironhaulEase(t/24);swordTarget={x:ironhaulMix(54,27,u),y:ironhaulMix(-96,-149,u)};blade=ironhaulAngleMix(.95,-1.8,u);crouch=u*.65;}
    if(st==='ih_skyfall'&&b.landT&&t>=b.landT)crouch=Math.max(crouch,Math.sin(Math.min(1,(t-b.landT)/14)*Math.PI)*.75);
    if(st==='ih_overcharge'&&t<=80){const u=ironhaulEase(t/25);swordTarget={x:ironhaulMix(50,43,u),y:ironhaulMix(-88,-109,u)};offTarget={x:8,y:ironhaulMix(-94,-114,u)};blade=ironhaulAngleMix(.72,-1.55,u);lean=-.04;crouch=.04;}
    if(st==='ih_parry'||(st==='ih_riposte'&&t<=28)){offTarget={x:52,y:-113};shieldAngle=.12;swordTarget={x:22,y:-97};blade=.65;crouch=.2;}
    if((st==='ih_aegis'&&t<31)){const a=ironhaulEase(t/30);offTarget={x:ironhaulMix(-31,68,a),y:ironhaulMix(-136,-108,a)};shieldAngle=ironhaulMix(-.75,.3,a);lean=-.13+.3*a;}
    if(gunBlend&&!silver){offTarget={x:ironhaulMix(8,57-(b.muzzle||0)*1.2,gunBlend),y:ironhaulMix(-94,-111,gunBlend)};lean=(-.07-(b.muzzle||0)*.012)*gunBlend;}
    if(wind&&!q){
        const kind=nextSword[1],goal=kind==='rise'?{x:40,y:-73}:kind==='thrust'?(st==='ih_cleaver'?{x:14,y:-111}:{x:22,y:-103}):st==='ih_cleaver'?{x:14,y:-160}:{x:29,y:-153};
        swordTarget={x:ironhaulMix(swordTarget.x,goal.x,wind),y:ironhaulMix(swordTarget.y,goal.y,wind)};
        blade=ironhaulAngleMix(blade,kind==='rise'?.52:kind==='thrust'?-.12:-2.2,wind);
        lean=ironhaulMix(lean,kind==='rise'?.19:kind==='thrust'?0:-.16,wind);
    }
    const nextShield=silver?(IRONHAUL_SHIELD_BEATS[st]||[]).find(k=>t<=k[0]&&t>=k[0]-18):undefined;
    if(nextShield&&!s&&!q){
        const u=ironhaulEase((t-nextShield[0]+18)/18),kind=nextShield[1],goal=kind==='spin'?{x:73,y:-101}:kind==='slam'?{x:28,y:-157}:kind==='upper'?{x:46,y:-64}:{x:22,y:-102};
        offTarget={x:ironhaulMix(offTarget.x,goal.x,u),y:ironhaulMix(offTarget.y,goal.y,u)};
        shieldAngle=ironhaulAngleMix(shieldAngle,kind==='slam'?-1.4:kind==='upper'?.8:kind==='spin'?.15:-.25,u);
    }
    if(s){
        const u=ironhaulEase(s.age/s.life);blade=s.angle;
        if(s.kind==='thrust'){swordTarget={x:ironhaulMix(22,91,Math.sin(u*Math.PI*.75)),y:-103};lean=.18*Math.sin(u*Math.PI);}
        else if(s.kind==='rise'){swordTarget={x:40+Math.sin(u*Math.PI)*36,y:ironhaulMix(-73,-157,u)};lean=ironhaulMix(.19,-.15,u);}
        else{swordTarget={x:29+Math.sin(u*Math.PI)*47,y:ironhaulMix(-153,-80,u)};lean=ironhaulMix(-.16,.2,u);}
        if(st==='ih_cleaver'){swordTarget=s.kind==='thrust'?{x:14+Math.sin(u*Math.PI*.75)*21,y:-111}:{x:14+Math.sin(u*Math.PI)*16,y:ironhaulMix(-160,-89,u)};offTarget={x:swordTarget.x-13,y:swordTarget.y+5};crouch=Math.sin(u*Math.PI)*.38;}
    }
    if(st==='ih_cleaver'&&wind&&!s){offTarget={x:swordTarget.x-13,y:swordTarget.y+5};}
    if(q){
        const u=ironhaulEase(q.age/q.life),power=Math.sin(u*Math.PI);
        if(q.kind==='spin'){
            turn=u;offTarget={x:Math.cos(u*Math.PI*2)*73,y:-101+Math.sin(u*Math.PI*2)*14};shieldAngle=u*Math.PI*2+.15;
            swordTarget={x:-18+Math.cos(u*Math.PI*2+.8)*37,y:-143};blade=-1.7+u*Math.PI*2;lean=Math.sin(u*Math.PI*2)*.12;crouch=.18;
        }else if(q.kind==='slam'){
            offTarget={x:ironhaulMix(28,60,u),y:ironhaulMix(-157,-55,u)};shieldAngle=ironhaulMix(-1.4,.9,u);crouch=u*.9;lean=u*.26;swordTarget={x:3,y:-136};blade=-2.4;
        }else if(q.kind==='upper'){
            offTarget={x:46+power*25,y:ironhaulMix(-64,-142,u)};shieldAngle=ironhaulMix(.8,-.8,u);lean=ironhaulMix(.25,-.15,u);
        }else{
            offTarget={x:ironhaulMix(22,87,power),y:-102};shieldAngle=ironhaulMix(-.25,.25,power);lean=.25*power;crouch=.3*power;swordTarget={x:9,y:-144};blade=-2.2;
        }
    }
    if(air){crouch=Math.max(crouch,.35);if(!s&&!q){swordTarget={x:27,y:-149};blade=-1.8;}}
    const fold=st==='ih_morph'?ironhaulEase(t/28):st==='ih_unfold'?1-ironhaulEase((t-22)/36):st==='ih_shift'?1-ironhaulEase((t-44)/45):0;
    if(fold&&!silver){swordTarget={x:ironhaulMix(swordTarget.x,9,fold),y:ironhaulMix(swordTarget.y,-105,fold)};offTarget={x:ironhaulMix(offTarget.x,-9,fold),y:ironhaulMix(offTarget.y,-113,fold)};crouch=Math.max(crouch,fold);lean=ironhaulMix(lean,.3,fold);blade=ironhaulAngleMix(blade,-2.8,fold);}
    const follow=b.followPose,blendActive=b.playerBlend&&(s||q)&&(s||q).age<4;
    if(follow&&(!s&&!q||blendActive)){
        const u=ironhaulEase(blendActive?(s||q).age/4:(frames-follow.at)/(follow.duration||12)),old=follow.targets;
        swordTarget={x:ironhaulMix(old.swordTarget.x,swordTarget.x,u),y:ironhaulMix(old.swordTarget.y,swordTarget.y,u)};
        offTarget={x:ironhaulMix(old.offTarget.x,offTarget.x,u),y:ironhaulMix(old.offTarget.y,offTarget.y,u)};
        blade=ironhaulAngleMix(old.blade,blade,u);shieldAngle=ironhaulAngleMix(old.shieldAngle,shieldAngle,u);
        lean=ironhaulMix(old.lean,lean,u);crouch=ironhaulMix(old.crouch,crouch,u);turn=ironhaulAngleMix(old.turn*Math.PI*2,turn*Math.PI*2,u)/(Math.PI*2);
    }
    if(b.playerCrouch){crouch=Math.max(crouch,2.8);swordTarget.y+=36;offTarget.y+=36;}
    const targets={swordTarget:{...swordTarget},offTarget:{...offTarget},blade,shieldAngle,lean,crouch,turn};
    const yaw=Math.cos(turn*Math.PI*2),width=Math.max(.2,Math.abs(yaw)),bob=air?0:Math.sin(gait*2)*speed*2+Math.sin(frames*.055)*.7;
    const pelvis={x:Math.sin(turn*Math.PI*2)*5,y:-94+crouch*15+bob};
    const chest=ironhaulRot({x:0,y:-38},lean,pelvis),neck=ironhaulRot({x:0,y:-23},lean,chest);
    const shoulderFront=ironhaulRot({x:31*yaw,y:-5},lean,chest),shoulderBack=ironhaulRot({x:-31*yaw,y:-5},lean,chest);
    const sword=ironhaulIK(shoulderFront,swordTarget,34,35,1),off=ironhaulIK(shoulderBack,offTarget,34,35,1);
    sword.angle=blade;sword.hand={x:sword.end.x+Math.cos(blade)*11,y:sword.end.y+Math.sin(blade)*11};
    off.angle=(q||nextShield||(st==='ih_aegis'&&t<=30)||(follow&&silver))?shieldAngle:st==='ih_cleaver'&&(s||wind||(follow&&t<103))?blade:silver?-.1:0;
    if(gunBlend&&!silver&&!s){
        const localDX=((b.lockX??b.cx()+b.dir()*200)-b.cx())*b.dir()-off.end.x;
        const localDY=(b.lockY??b.cy())-(b.y+b.h)-off.end.y;
        off.angle=Math.max(-.85,Math.min(.85,Math.atan2(localDY,Math.max(30,localDX))))*gunBlend;
    }
    off.hand={x:off.end.x+Math.cos(off.angle)*11,y:off.end.y+Math.sin(off.angle)*11};
    const legs=[];
    for(const side of [-1,1]){
        const phase=gait+(side<0?Math.PI:0),stride=Math.sin(phase)*19*speed;
        const ankle={x:side*20+stride+(air?side*8:0),y:-9-Math.max(0,Math.cos(phase))*14*speed-(air?side<0?18:5:0)};
        const hip={x:pelvis.x+side*14*width,y:pelvis.y+3};
        const leg=ironhaulIK(hip,ankle,40,44,-1);
        legs.push({hip:leg.root,knee:leg.joint,ankle:leg.end,angle:air?.3:-.09*Math.sin(phase)*speed+Math.sin(turn*Math.PI*2)*side*.16});
    }
    return {targets,fold,pelvis,chest,neck,head:{x:neck.x,y:neck.y-9},lean,width,yaw,turn,crouch,legs,sword,off,shieldFace:q?.kind==='spin'?Math.max(.18,Math.abs(Math.cos(turn*Math.PI*2))):1,offBehind:q?.kind==='spin'&&Math.sin(turn*Math.PI*2)<-.1};
}
// BOSS_PART_END s1.ironhaulRig.1

// Nguồn: index.html:34444 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulWorldPoint.1 EDITABLE
function ironhaulWorldPoint(b,p){return {x:b.cx()+b.dir()*p.x,y:b.y+b.h+p.y};}
// BOSS_PART_END s1.ironhaulWorldPoint.1

// Nguồn: index.html:34445 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulWeapons.1 READ_ONLY
function ironhaulWeapons(b){
    const r=b.rigPose||ironhaulRig(b),grip=ironhaulWorldPoint(b,r.sword.hand),reach=(b.playerReach??b.slash?.reach??112)*(1-r.fold*.65);
    const tip=ironhaulWorldPoint(b,{x:r.sword.hand.x+Math.cos(r.sword.angle)*reach,y:r.sword.hand.y+Math.sin(r.sword.angle)*reach});
    const shield=ironhaulWorldPoint(b,r.off.hand),points=[[-27,-35],[19,-37],[32,-16],[25,29],[0,43],[-28,22],[-33,-13]].map(([x,y])=>ironhaulWorldPoint(b,ironhaulRot({x:x*r.shieldFace*IRONHAUL_SHIELD_SCALE,y:y*IRONHAUL_SHIELD_SCALE},r.off.angle,r.off.hand)));
    const gun=ironhaulWorldPoint(b,{x:r.off.hand.x+Math.cos(r.off.angle)*48,y:r.off.hand.y+Math.sin(r.off.angle)*48});
    const loX=Math.min(...points.map(p=>p.x)),loY=Math.min(...points.map(p=>p.y));
    return {rig:r,grip,tip,shield,shieldPoints:points,shieldBox:{x:loX,y:loY,w:Math.max(...points.map(p=>p.x))-loX,h:Math.max(...points.map(p=>p.y))-loY},gun,gunAngle:Math.atan2(gun.y-shield.y,gun.x-shield.x)};
}
// BOSS_PART_END s1.ironhaulWeapons.1

// Nguồn: index.html:34453 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulJoint.1 EDITABLE
function ironhaulJoint(p,r,col){
    ctx.fillStyle='#152934';ctx.beginPath();ctx.arc(p.x,p.y,r+2,0,7);ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y,r,0,7);ctx.stroke();ctx.fillStyle='#a0b5bf';ctx.fillRect(p.x-2,p.y-2,4,4);
}
// BOSS_PART_END s1.ironhaulJoint.1

// Nguồn: index.html:34456 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulBone.1 EDITABLE
function ironhaulBone(a,b,w,col,hi,forearm=false){
    ctx.save();ctx.translate(a.x,a.y);ctx.rotate(Math.atan2(b.y-a.y,b.x-a.x));const L=Math.hypot(b.x-a.x,b.y-a.y);
    ctx.fillStyle='#18303b';ctx.fillRect(2,-w*.4,L-4,w*.8);
    ctx.strokeStyle='#bdcbd0';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(3,-w*.48);ctx.lineTo(L-4,-w*.42);ctx.stroke();
    ironhaulPolygon([[5,-w*.55],[L-8,-w*.43],[L-2,0],[L-7,w*.5],[7,w*.55],[2,0]],col);
    ctx.fillStyle=hi;ctx.fillRect(8,-w*.42,Math.max(5,L-18),3);ctx.fillStyle='#28424e';ctx.fillRect(L*.4,-2,Math.max(5,L*.3),4);
    if(forearm){ctx.fillStyle=hi;ctx.fillRect(L-11,-w*.62,6,w*1.2);ctx.strokeStyle='#93adb6';ctx.lineWidth=1;for(let x=12;x<L-11;x+=5){ctx.beginPath();ctx.moveTo(x,3);ctx.lineTo(x,w*.42);ctx.stroke();}}
    ctx.restore();
}
// BOSS_PART_END s1.ironhaulBone.1

// Nguồn: index.html:34465 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulHand.1 EDITABLE
function ironhaulHand(arm,col,hi){
    ctx.save();ctx.translate(arm.end.x,arm.end.y);ctx.rotate(arm.angle);
    ironhaulPolygon([[-4,-8],[11,-9],[17,-4],[17,6],[1,8],[-5,3]],col);ctx.fillStyle=hi;
    for(let i=0;i<3;i++){ctx.fillRect(7+i*3,-7,2,12);ctx.fillStyle=i%2?'#728e9b':hi;}
    ctx.fillStyle='#263e4b';ctx.fillRect(0,6,10,5);ctx.restore();
}
// BOSS_PART_END s1.ironhaulHand.1

// Nguồn: index.html:34471 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulRobot.1 READ_ONLY
function ironhaulRobot(b,alpha=1){
    const w=ironhaulWeapons(b),r=w.rig,silver=b.silver,col=silver?'#cfdee8':'#4c748a',hi=silver?'#f6fdff':'#8aaebf',dark='#203b4a',energy=silver?'#93edfa':'#ffbf70';
    ctx.save();ctx.globalAlpha*=alpha;ctx.translate(b.cx(),b.y+b.h);ctx.scale(b.dir(),1);
    const limb=(a,armed)=>{
        ironhaulBone(a.root,a.joint,19,col,hi);ironhaulJoint(a.root,9,hi);ironhaulJoint(a.joint,7,energy);ironhaulBone(a.joint,a.end,22,col,hi,true);ironhaulJoint(a.end,5,hi);ironhaulHand(a,col,hi);
        if(armed==='shield'&&silver&&b.shieldOut<=0){ctx.save();ctx.translate(a.hand.x,a.hand.y);ctx.rotate(a.angle);ctx.scale(r.shieldFace*IRONHAUL_SHIELD_SCALE,IRONHAUL_SHIELD_SCALE);
            ironhaulPolygon([[-27,-35],[19,-37],[32,-16],[25,29],[0,43],[-28,22],[-33,-13]],'#7d98ab',hi);
            ironhaulPolygon([[-21,-28],[15,-30],[24,-13],[18,23],[0,33],[-21,17],[-25,-10]],'#eaf7ff');
            ironhaulPolygon([[0,-23],[12,0],[0,25],[-12,0]],'#315c71',energy);ctx.strokeStyle=energy;ctx.lineWidth=b.state==='ih_parry'?4:2;ctx.beginPath();ctx.moveTo(0,-20);ctx.lineTo(0,23);ctx.stroke();
            for(const [x,y] of [[-18,-23],[15,-22],[-18,16],[15,19]]){ctx.fillStyle='#607f92';ctx.fillRect(x-2,y-2,4,4);}ctx.restore();
        }else if(armed==='gun'&&!silver&&!((b.state==='ih_cleaver'&&b.subTimer<103)||b.state==='ih_overcharge')){ctx.save();ctx.translate(a.hand.x,a.hand.y);ctx.rotate(a.angle);ironhaulPolygon([[-5,-8],[30,-9],[36,-5],[49,-5],[49,5],[8,9],[-5,3]],dark,hi);ctx.fillStyle=hi;ctx.fillRect(32,-4,17,8);ctx.fillStyle=energy;ctx.fillRect(8,-7,16,2);
            if(b.muzzle>0){ctx.fillStyle='#ffedb7';ironhaulPolygon([[49,-7],[70,0],[49,7],[55,0]],ctx.fillStyle,null);}ctx.restore();}
        else if(armed==='sword'){ctx.save();ctx.translate(a.hand.x,a.hand.y);ctx.rotate(a.angle);const L=(b.playerReach??b.slash?.reach??112)*(1-r.fold*.65);
            ironhaulPolygon([[0,-5],[L-20,-5],[L,0],[L-20,5],[0,5]],silver?'#f0fcff':'#bbcdd7',energy);ctx.fillStyle=energy;ctx.fillRect(11,-4,L-34,2);ctx.fillStyle=dark;ctx.fillRect(-10,-5,15,10);ctx.fillStyle=hi;ctx.fillRect(-2,-12,5,24);ctx.restore();}
    };
    const leg=l=>{
        ironhaulJoint(l.hip,9,hi);ironhaulBone(l.hip,l.knee,24,col,hi);ironhaulJoint(l.knee,8,energy);ironhaulBone(l.knee,l.ankle,25,col,hi,true);
        ctx.save();ctx.translate(l.ankle.x,l.ankle.y);ctx.rotate(l.angle);ironhaulPolygon([[-15,-6],[12,-7],[25,3],[25,9],[-17,9]],col);ctx.fillStyle=hi;ctx.fillRect(-11,-5,20,3);ctx.fillStyle=dark;ctx.fillRect(-15,6,37,4);ctx.restore();
    };
    leg(r.legs[0]);if(r.offBehind)limb(r.off,silver?'shield':'gun');
    // Container hinges / backpack, pelvis yaw bearing, independent spine and chest rotation.
    ctx.save();ctx.translate(r.chest.x,r.chest.y);ctx.rotate(r.lean);ctx.scale(r.width,1);
    for(const side of [-1,1]){ctx.save();ctx.translate(side*38,-4);ctx.rotate(side*(-.2+r.turn*.28));ironhaulPolygon([[-10,-23],[12,-22],[17,54],[-11,58]],'#274655',hi);ctx.strokeStyle='#64889b';for(let y=-10;y<45;y+=11){ctx.beginPath();ctx.moveTo(-7,y);ctx.lineTo(12,y-2);ctx.stroke();}ctx.restore();}ctx.restore();
    ironhaulBone(r.pelvis,r.chest,29,dark,hi);ironhaulJoint(r.pelvis,13,energy);
    ctx.save();ctx.translate(r.pelvis.x,r.pelvis.y);ctx.scale(r.width,1);ironhaulPolygon([[-32,-8],[27,-8],[32,13],[12,21],[-22,18],[-35,6]],col);ctx.fillStyle=hi;ctx.fillRect(-18,-5,35,4);ctx.restore();
    ctx.save();ctx.translate(r.chest.x,r.chest.y);ctx.rotate(r.lean);ctx.scale(r.width,1);
    ironhaulPolygon([[-37,-19],[-23,-25],[24,-25],[38,-14],[30,21],[7,29],[-24,22],[-35,7]],col);
    if(r.yaw>=0){ironhaulPolygon([[-29,-14],[0,-7],[29,-14],[24,8],[0,16],[-26,7]],silver?'#eff9ff':'#a75943');
        for(const side of [-1,1])ironhaulPolygon([[side*3,-6],[side*25,-11],[side*23,3],[side*3,9]],'#14384a',hi);
        ctx.fillStyle=energy;ctx.beginPath();ctx.arc(0,16,silver?6:4,0,7);ctx.fill();
    }else{ctx.fillStyle=dark;ctx.fillRect(-22,-15,44,37);ctx.fillStyle=hi;for(let y=-9;y<20;y+=8)ctx.fillRect(-17,y,34,3);}
    ctx.restore();
    leg(r.legs[1]);
    for(const arm of [r.off,r.sword]){ctx.save();ctx.translate(arm.root.x,arm.root.y);ctx.rotate(Math.atan2(arm.joint.y-arm.root.y,arm.joint.x-arm.root.x)*.2);ironhaulPolygon([[-14,-15],[13,-16],[18,-2],[11,16],[-16,12]],col);ctx.fillStyle=hi;ctx.fillRect(-12,-14,24,4);ironhaulWheel(0,0,10,0);ctx.restore();}
    ctx.strokeStyle=hi;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(r.chest.x,r.chest.y-19);ctx.lineTo(r.neck.x,r.neck.y);ctx.lineTo(r.head.x,r.head.y+4);ctx.stroke();
    ironhaulJoint(r.neck,6,hi);ctx.save();ctx.translate(r.head.x,r.head.y);ctx.rotate(-r.lean*.4);ctx.scale(Math.max(.35,r.width),1);
    ironhaulPolygon([[-15,-12],[-8,-21],[10,-21],[18,-9],[12,9],[-12,9]],col);ctx.fillStyle=dark;ctx.fillRect(-13,-8,28,8);if(r.yaw>=0){ctx.fillStyle=energy;ctx.fillRect(-10,-7,22,3);}else{ctx.fillStyle=hi;for(let x=-9;x<=9;x+=6)ctx.fillRect(x,-8,2,12);}ctx.fillStyle=hi;ctx.fillRect(-7,3,15,4);ctx.restore();
    limb(r.sword,'sword');if(!r.offBehind)limb(r.off,silver?'shield':'gun');
    if(b.pose==='dash'||!b.grounded){ctx.fillStyle=energy;for(const side of [-1,1]){const p=r.chest;ironhaulPolygon([[p.x+side*34,p.y+5],[p.x+side*34-18,p.y+17],[p.x+side*34-48-Math.sin(frames*2)*8,p.y+12]],energy,null);}}
    ctx.restore();
}
// BOSS_PART_END s1.ironhaulRobot.1

// Nguồn: index.html:34513 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulPaintCrescent.1 EDITABLE
function ironhaulPaintCrescent(q){
    const angle=Math.atan2(q.vy,q.vx),R=q.arcRadius||20,depth=q.arcDepth||28;
    ctx.rotate(angle);ctx.beginPath();ctx.moveTo(-R*.7,-R);ctx.quadraticCurveTo(depth,0,-R*.7,R);ctx.quadraticCurveTo(depth*.2,0,-R*.7,-R);ctx.closePath();ctx.fill();
    if(q.ihKind==='energy'){
        ctx.strokeStyle='#efffff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-R*.65,-R*.86);ctx.quadraticCurveTo(depth*.84,0,-R*.65,R*.86);ctx.stroke();
        ctx.globalAlpha*=.35;ctx.strokeStyle=q.color;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-R,-R*.7);ctx.lineTo(-R-20,-R*.4);ctx.moveTo(-R,R*.7);ctx.lineTo(-R-20,R*.4);ctx.stroke();
    }
}
// BOSS_PART_END s1.ironhaulPaintCrescent.1

// Nguồn: index.html:34521 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulEnergySlash.1 EDITABLE
function ironhaulEnergySlash(b,origin,tilt=0){
    const targetX=Number.isFinite(b.lockX)?b.lockX:dino.x+dino.w/2,targetY=Number.isFinite(b.lockY)?b.lockY:dino.y+dino.h/2;
    const localAim=Math.max(-.5,Math.min(.5,Math.atan2(targetY-origin.y,Math.max(160,Math.abs(targetX-origin.x)))))+tilt;
    const vx=(b.attackDir||b.dir())*Math.cos(localAim)*8,vy=Math.sin(localAim)*8,p=new BossProjectile(0,0,vx,vy,false,1);
    p._ironhaulOwner=b;p.ihKind='energy';p.age=0;p.color=b.silver?'#acffff':'#78dfff';p.arcRadius=b.coreBuff>0?43:34;p.arcDepth=40;p.frail=false;
    // A rotated, symmetric envelope contains the complete crescent for every aim direction.
    const angle=Math.atan2(vy,vx),halfX=p.arcRadius,halfY=p.arcRadius;
    p.w=2*(Math.abs(Math.cos(angle))*halfX+Math.abs(Math.sin(angle))*halfY);p.h=2*(Math.abs(Math.sin(angle))*halfX+Math.abs(Math.cos(angle))*halfY);
    p.x=origin.x-p.w/2;p.y=origin.y-p.h/2;p.spawn={...origin};
    p.update=function(){const cx=this.x+this.w/2+this.vx,cy=this.y+this.h/2+this.vy,a=Math.atan2(this.vy,this.vx);this.age++;this.w=this.h=2*this.arcRadius*(Math.abs(Math.cos(a))+Math.abs(Math.sin(a)));this.x=cx-this.w/2;this.y=cy-this.h/2;if(this.age>150||b.dying||b.hp<=0)this.x=worldR()+9999;};
    p.veRieng=function(q){ctx.save();ctx.translate(q.x+q.w/2,q.y+q.h/2);ctx.fillStyle=q.color;ctx.globalAlpha=.85;ironhaulPaintCrescent(q);ctx.restore();};
    bossProjectiles.push(p);return p;
}
// BOSS_PART_END s1.ironhaulEnergySlash.1

// Nguồn: index.html:34534 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulCoreFx.1 READ_ONLY
function ironhaulCoreFx(b){
    const charging=b.state==='ih_overcharge'&&b.subTimer<=74,charge=charging?ironhaulEase(b.subTimer/72):b.coreBuff>0?1:0;
    if(!charge||b.vehicle)return;
    const g=ironhaulWeapons(b),r=g.rig,core=ironhaulWorldPoint(b,ironhaulRot({x:0,y:16},r.lean,r.chest));
    ctx.save();ctx.strokeStyle=b.silver?'#d1ffff':'#91eaff';ctx.fillStyle=ctx.strokeStyle;
    ctx.globalAlpha=.2+charge*.45;ctx.lineWidth=1+charge*3;ctx.beginPath();ctx.arc(core.x,core.y,7+charge*5+Math.sin(frames*.2),0,Math.PI*2);ctx.stroke();
    if(charging){
        const control={x:(core.x+g.grip.x)/2,y:Math.min(core.y,g.grip.y)-22};
        ctx.beginPath();ctx.moveTo(core.x,core.y);ctx.quadraticCurveTo(control.x,control.y,g.grip.x,g.grip.y);ctx.stroke();
        for(let i=0;i<6;i++){
            const u=(frames*.035+i/6)%1,v=1-u,x=v*v*core.x+2*v*u*control.x+u*u*g.grip.x,y=v*v*core.y+2*v*u*control.y+u*u*g.grip.y;
            ctx.fillRect(x-2,y-2,4,4);
        }
    }
    ctx.globalAlpha=charge*.4;ctx.lineWidth=5+charge*4;ctx.beginPath();ctx.moveTo(g.grip.x,g.grip.y);ctx.lineTo(g.tip.x,g.tip.y);ctx.stroke();
    ctx.globalAlpha=charge*.85;ctx.lineWidth=2;const u=(frames*.025)%1;
    const x=ironhaulMix(g.grip.x,g.tip.x,u),y=ironhaulMix(g.grip.y,g.tip.y,u);ctx.beginPath();ctx.arc(x,y,3,0,7);ctx.stroke();ctx.restore();
}
// BOSS_PART_END s1.ironhaulCoreFx.1

// Nguồn: index.html:34552 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.ironhaulRound.1 EDITABLE
function ironhaulRound(b,x,y,vx,vy,kind='bullet',targetX=null){
    const p=new BossProjectile(x,y,vx,vy,false,1);p._ironhaulOwner=b;p.ihKind=kind;p.age=0;p.color=b.silver?'#b4f7ff':'#ffc788';p.frail=kind==='bullet';
    p.w=kind==='shell'?18:kind==='shield'?72:kind==='wave'?34:12;p.h=kind==='shell'?18:kind==='shield'?72:kind==='wave'?40:7;
    if(kind==='shield'){p.x-=p.w/2;p.y-=p.h/2;}else if(kind==='wave')p.x-=p.w/2;
    p.update=function(){
        this.age++;const ox=this.x;
        if(this.ihKind==='shell')this.vy+=.22;
        if(this.ihKind==='shield'){
            if(this.age>25){const hand=ironhaulWeapons(b).shield,dx=hand.x-this.x-this.w/2,dy=hand.y-this.y-this.h/2,L=Math.hypot(dx,dy)||1;this.vx=dx/L*11;this.vy=dy/L*11;if(L<22){this.x=worldR()+9999;b.shieldOut=0;}}
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
            ctx.rotate(q.age*.25);ctx.scale(IRONHAUL_SHIELD_SCALE,IRONHAUL_SHIELD_SCALE);ironhaulPolygon([[-23,-16],[0,-27],[24,-15],[24,15],[0,27],[-23,15]],'#dce9f2',q.color);ctx.beginPath();ctx.arc(0,0,14,0,7);ctx.stroke();
        }else if(q.ihKind==='shell'){ctx.beginPath();ctx.arc(0,0,9,0,7);ctx.fill();ctx.fillStyle='#fff8d5';ctx.fillRect(-3,-3,6,6);}
        else if(q.ihKind==='wave'){ironhaulPaintCrescent(q);}
        else{ctx.rotate(Math.atan2(q.vy,q.vx));ctx.fillRect(-8,-3,16,6);ctx.fillStyle='#fff3da';ctx.fillRect(1,-2,8,4);}
        ctx.restore();
    };
    if(targetX!==null)b.reticles.push({x:targetX,t:47});
    bossProjectiles.push(p);return p;
}
// BOSS_PART_END s1.ironhaulRound.1

// Nguồn: index.html:34583 · Dùng bởi: IronhaulBoss
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
        this.pose='idle';this.vehicle=true;this.coreBuff=0;this.coreCd=0;this.arcCd=0;this.usedCoreInForm=false;this.parryCd=0;this.parryLock=0;this.shieldOut=0;this.muzzle=0;
        this.slash=null;this.shieldStrike=null;this.gait=0;this.animSpeed=0;this.animAt=-1000;this.hitKeys=new Set();this.reticles=[];this.ghosts=[];this.lastAttack='';this.driveDir=-1;this.ram=null;
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
        if(vehicle&&this.silver)return false;
        const cx=this.cx(),feet=this.y+this.h;this.vehicle=vehicle;this.w=vehicle?286:104;this.h=vehicle?104:180;
        this.x=Math.max(8,Math.min(canvas.width-this.w-8,cx-this.w/2));this.y=feet-this.h;this.baseY=320-this.h;
    }
    clearAttack(){
        if(!this.vehicle&&(this.slash||this.shieldStrike))this.followPose={at:frames,targets:ironhaulRig(this).targets,duration:12};
        this.slash=null;this.shieldStrike=null;this.hitKeys.clear();this.ram=null;this.pose='idle';this.dy=0;this.shieldOut=0;this.reticles=[];this.landT=0;
        const c=this._dswControl;if(c?.release)c.release();
    }
    startPhase2(){
        if(this.phase!==1)return;
        this.clearAttack();this.coreBuff=0;this.coreCd=0;this.usedCoreInForm=false;this.phase=2;this._hp=this.maxHp=150;this.state='ih_shift';this.subTimer=0;this.invulnAll=true;
        this.y=this.baseY;this.grounded=true;
        for(let i=bossProjectiles.length-1;i>=0;i--)if(bossProjectiles[i]._ironhaulOwner===this)bossProjectiles.splice(i,1);
        floatingTexts.push(new FloatingText(this.cx()-90,120,'IRONHAUL · CHUYỂN DẠNG'));shakeTimer=14;
        SFX.tone(120,.3,'sawtooth',.12,500);
    }
    startSilver(){
        if(this.silver||this.phase!==2)return;
        this.clearAttack();this.coreBuff=0;this.coreCd=0;this.usedCoreInForm=false;this.silver=true;this.resizeVehicle(false);this.y=this.baseY;this.grounded=true;
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
    legalMoves(){return this.phase===1?['ih_ram','ih_cannon','ih_gatling']:(this.silver?['ih_advance','ih_silvercombo','ih_aegis','ih_parry','ih_cross','ih_shieldrush','ih_reversal']:['ih_advance','ih_combo','ih_gunblade','ih_upper','ih_barrage','ih_skyfall','ih_morph','ih_cleaver','ih_flank']).concat('ih_overcharge','ih_bladefan');}
    chooseAttack(){
        this.faceP();const gap=Math.abs(dino.x+dino.w/2-this.cx());let pool;
        if(this.phase===2&&!this.usedCoreInForm&&this.coreCd<=0){this.begin('ih_overcharge');return;}
        if(this.phase===1)pool=this.legalMoves();
        else if(this.silver){pool=gap>260?['ih_shieldrush','ih_advance','ih_aegis']:['ih_silvercombo','ih_cross','ih_reversal','ih_shieldrush','ih_aegis','ih_parry'];if(this.parryCd>0)pool=pool.filter(x=>x!=='ih_parry');}
        else pool=gap>290?['ih_advance','ih_morph','ih_flank','ih_barrage']:!dino.grounded?['ih_upper','ih_gunblade','ih_skyfall','ih_flank']:['ih_combo','ih_advance','ih_cleaver','ih_gunblade','ih_upper','ih_flank'];
        if(gap>420)pool=pool.filter(x=>x!=='ih_flank');
        if(this.phase===2){
            if(this.coreBuff>0){pool=pool.filter(x=>x!=='ih_morph');if(this.arcCd<=0&&gap>170)pool.push('ih_bladefan','ih_bladefan');}
            else if(this.coreCd<=0)pool.push('ih_overcharge');
        }
        const next=pool.filter(x=>x!==this.lastAttack);this.begin(next[Math.floor(Math.random()*next.length)]||pool[0]);
    }
    begin(state){
        if(!this.legalMoves().includes(state)&&state!=='ih_riposte')return false;
        this.clearAttack();this.state=state;this.lastAttack=state;this.subTimer=0;this.faceP();this.attackDir=this.dir();
        this.lockX=Math.max(70,Math.min(canvas.width-70,dino.x+dino.w/2));this.lockY=dino.y+dino.h/2;
        if(state==='ih_overcharge'){this.usedCoreInForm=true;this.coreCd=540;}
        if(state==='ih_bladefan')this.arcCd=300;
        if(state==='ih_flank')this.flankTo=Math.max(8,Math.min(canvas.width-this.w-8,this.lockX+this.attackDir*85-this.w/2));
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
        this._damageChecked=false;this.state='ih_riposte';this.subTimer=0;this.slash=this.shieldStrike=null;this.hitKeys.clear();this.parryLock=8;this.invulnAll=true;
        visualEffects.push(new Effect(this.cx()+this.dir()*45,this.cy(),'parry'));floatingTexts.push(new FloatingText(this.cx()-40,this.y-24,'PARRY!'));
        shakeTimer=Math.max(shakeTimer,7);return true;
    }
    hurtBox(box,key,damage=1){
        if(this.hitKeys.has(key)||!checkAABB(box,dino))return false;
        this.hitKeys.add(key);
        if(dino.isShielding()){
            if(danteRoyalShield())danteGuardContact(damage,this);
            else{
                const perfect=(dino.parryWindow>0||dino.meleeTimer>=(combatStance===2?38:23))&&perfectParryCd<=0&&!voidChanParry();
                parry(dino.y+20);
                if(perfect){dealDamage(this,parryDamage(this,true),'flat');perfectParryCd=30;parryGainUlt(true);shinGuardReset(true);if(!this.invulnAll)this.idle(55);}
            }
        }else dino.takeDamage(damage);
        return true;
    }
    swing(kind='cut',reach=112,life=11){
        const angles=kind==='rise'?[.52,-1.9]:kind==='thrust'?[-.12,.08]:[-2.2,.65];
        this.slash={age:0,life,kind,reach,dir:this.attackDir,a0:angles[0],a1:angles[1],angle:angles[0],hit:false,power:this.coreBuff>0?2:1};
        this.pose=kind==='thrust'?'thrust':kind==='rise'?'overhead':'cut';
        this.slash.previous=ironhaulWeapons(this);
        SFX.tone(400,.08,'sawtooth',.06,130);
    }
    tickSlash(){
        const s=this.slash;if(!s)return;
        const prev=s.previous||ironhaulWeapons(this);
        s.angle=s.a0+(s.a1-s.a0)*ironhaulEase(Math.min(1,++s.age/s.life));
        const next=ironhaulWeapons(this);
        if(!s.hit)for(let k=0;k<=8;k++){
            const u=k/8,x=ironhaulMix(prev.grip.x,next.grip.x,u),y=ironhaulMix(prev.grip.y,next.grip.y,u),tx=ironhaulMix(prev.tip.x,next.tip.x,u),ty=ironhaulMix(prev.tip.y,next.tip.y,u);
            if(sgSegmentBox(x,y,tx,ty,dino,11)!==null){s.hit=true;this.hurtBox({x:dino.x,y:dino.y,w:dino.w,h:dino.h},'sword:'+this.subTimer,s.power);break;}
        }
        if(this.coreBuff>0&&s.age===8&&['ih_combo','ih_cleaver'].includes(this.state)&&s.kind==='thrust')this.releaseEnergy();
        s.previous=next;if(s.age>=s.life){this.followPose={at:frames,targets:next.rig.targets,duration:12};this.slash=null;}
    }
    shieldSwing(kind='bash',life=18){
        if(!this.silver||this.shieldOut>0)return false;
        this.shieldStrike={kind,age:0,life,hit:false};this.pose='shield';
        this.shieldStrike.previous=ironhaulWeapons(this);
        SFX.tone(210,.11,'sawtooth',.08,75);return true;
    }
    tickShield(){
        const q=this.shieldStrike;if(!q)return;
        const old=q.previous||ironhaulWeapons(this);q.age++;
        const next=ironhaulWeapons(this),active=q.age>=Math.ceil(q.life*.2)&&q.age<=Math.ceil(q.life*.9);
        if(!q.hit&&active&&(checkAABB(next.shieldBox,dino)||sgSegmentBox(old.shield.x,old.shield.y,next.shield.x,next.shield.y,dino,23*IRONHAUL_SHIELD_SCALE)!==null)){
            q.hit=true;this.hurtBox({x:dino.x,y:dino.y,w:dino.w,h:dino.h},'shield:'+this.subTimer);
        }
        q.previous=next;if(q.age>=q.life){this.followPose={at:frames,targets:next.rig.targets,duration:12};this.shieldStrike=null;}
    }
    releaseEnergy(tilt=0){
        const g=ironhaulWeapons(this),origin={x:ironhaulMix(g.grip.x,g.tip.x,.6),y:ironhaulMix(g.grip.y,g.tip.y,.6)};
        ironhaulEnergySlash(this,origin,tilt);SFX.tone(450,.12,'sawtooth',.08,170);
    }
    shoot(count=1,spread=.08){
        let x,y,angle;
        if(this.vehicle){x=this.cx()+this.attackDir*78;y=this.y+this.h-111;angle=Math.atan2(this.lockY-y,this.lockX-x);}
        else{
            this.pose='gun';const g=ironhaulWeapons(this);x=g.gun.x;y=g.gun.y;angle=g.gunAngle;
        }
        for(let i=0;i<count;i++){
            const a=angle+(i-(count-1)/2)*spread;
            ironhaulRound(this,x,y,Math.cos(a)*8,Math.sin(a)*8);
        }
        this.muzzle=5;SFX.tone(160,.045,'square',.06,80);
    }
    move(dx){
        const old=this.x;this.x=Math.max(8,Math.min(canvas.width-this.w-8,this.x+dx));
        this.animSpeed=this.x-old;this.animAt=frames;this.gait+=Math.abs(this.animSpeed)*.065;
        if(Math.abs(dx)>7&&frames%4===0){
            const g=Object.create(IronhaulBoss.prototype);
            for(const k of ['y','w','h','facingLeft','pose','silver','state','subTimer','shieldOut','grounded','vehicle','driveDir'])g[k]=this[k];
            Object.assign(g,{x:old,t:12,slash:this.slash?{...this.slash}:null,muzzle:0,rigPose:ironhaulRig(this)});this.ghosts.push(g);
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
        if(this.silver&&(this.vehicle||['ih_morph','ih_unfold','ih_ram'].includes(this.state))){this.resizeVehicle(false);this.idle(45);}
        for(const g of this.ghosts)g.t--;this.ghosts=this.ghosts.filter(g=>g.t>0).slice(-8);
        for(const r of this.reticles)r.t--;this.reticles=this.reticles.filter(r=>r.t>0);
        if(this.coreBuff>0)this.coreBuff--;if(this.coreCd>0)this.coreCd--;if(this.arcCd>0)this.arcCd--;
        if(this.parryCd>0)this.parryCd--;if(this.shieldOut>0)this.shieldOut--;if(this.muzzle>0)this.muzzle--;
        if(this.parryLock>0){this.parryLock--;if(!this.parryLock)this.invulnAll=false;}
        this.subTimer++;const t=this.subTimer,st=this.state;
        if(st==='entering'){if(t>=60)this.idle(40);return;}
        if(st==='ih_shift'){
            if(t===44)this.resizeVehicle(false);
            if(t>=100)this.idle(48);return;
        }
        if(st==='ih_silver'){if(t===46)visualEffects.push(new Effect(this.cx(),this.cy(),'body_slam_shockwave',true,110));if(t>=100)this.idle(48);return;}
        this.physics();this.tickSlash();this.tickShield();
        for(const beat of ironhaulSwordBeats(this))if(t===beat[0])this.swing(beat[1],beat[2],beat[3]);
        for(const beat of IRONHAUL_SHIELD_BEATS[st]||[])if(t===beat[0])this.shieldSwing(beat[1],beat[2]);
        if(this.phase===2&&t<=23&&['ih_combo','ih_upper','ih_skyfall','ih_cleaver','ih_silvercombo','ih_cross'].includes(st))this.pose='overhead';
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
        }else if(st==='ih_combo'){
            if([26,54,86].includes(t))this.move(this.attackDir*16);
        }else if(st==='ih_gunblade'){
            if(t===20){this.dy=-8;this.pose='dash';}
            if(t>=20&&t<45)this.move(-this.attackDir*3.6);
            if([30,40,50].includes(t))this.shoot();
            if(t>=58&&t<74)this.move(this.attackDir*6);
        }else if(st==='ih_upper'){
            if(t===30)this.dy=-10;
            if(t>=30&&t<48)this.move(this.attackDir*2.8);
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
        }else if(st==='ih_cleaver'){
            if(t>=68&&t<82)this.move(this.attackDir*3.5);
            if(t===115||t===125)this.shoot();
        }else if(st==='ih_flank'){
            if(t===20){this.dy=-11;this.pose='dash';}
            if(t>=21&&t<51)this.move(Math.max(-16,Math.min(16,(this.flankTo-this.x)/Math.max(1,51-t))));
            if(t===53){this.faceP();this.attackDir=this.dir();}
        }else if(st==='ih_silvercombo'){
            if(t>=52&&t<69)this.move(this.attackDir*1.6);
            if(t>=127&&t<137)this.move(this.attackDir*3.2);
        }else if(st==='ih_aegis'){
            if(t===30){const g=ironhaulWeapons(this);ironhaulRound(this,g.shield.x,g.shield.y,this.attackDir*9,0,'shield');this.followPose={at:frames,targets:g.rig.targets,duration:14};this.shieldOut=70;}
            if(t>=56&&t<69)this.move(this.attackDir*5);
        }else if(st==='ih_parry'){
            this.pose='shield';
        }else if(st==='ih_riposte'){
            if(t>=29&&t<39)this.move(this.attackDir*4);
        }else if(st==='ih_cross'){
            if(t===46){for(const dir of [-1,1])ironhaulRound(this,this.cx(),279,dir*5.2,0,'wave');shakeTimer=Math.max(shakeTimer,7);}
            if(t===72||t===106)this.move(this.attackDir*18);
        }else if(st==='ih_shieldrush'){
            if(t>=21&&t<45){this.pose='shield';if(Math.abs(dino.x+dino.w/2-this.cx())>75)this.move(this.attackDir*6);}
        }else if(st==='ih_reversal'){
            if(t>=33&&t<50)this.move(this.attackDir*1.4);
        }else if(st==='ih_overcharge'){
            if(t===72){this.coreBuff=480;visualEffects.push(new Effect(this.cx(),this.cy(),'body_slam_shockwave',true,46));SFX.tone(250,.3,'triangle',.1,900);}
            if(t===96)this.releaseEnergy();
        }else if(st==='ih_bladefan'){
            if(t===40||t===72||t===104)this.releaseEnergy(t===40?-.14:t===72?.14:0);
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
        if(!this.vehicle)ironhaulCoreFx(this);
        if(this.state==='ih_silver'){
            const t=this.subTimer,q=Math.min(1,t/75);
            if(t<75)for(const side of [-1,1]){ctx.save();ctx.globalAlpha=1-q;ctx.translate(this.cx()+side*(20+q*100),this.y+70-q*35);ctx.rotate(side*q*.8);ironhaulPolygon([[-16,-37],[16,-33],[18,35],[-17,31]],'#53798c','#9cb4be');ctx.restore();}
            ctx.strokeStyle='rgba(213,250,255,'+Math.max(0,1-t/100)+')';ctx.lineWidth=3;
            for(let i=0;i<8;i++){const a=i*Math.PI/4+t*.04,R=20+t*1.5;ctx.beginPath();ctx.moveTo(this.cx()+Math.cos(a)*R,this.cy()+Math.sin(a)*R);ctx.lineTo(this.cx()+Math.cos(a)*(R+22),this.cy()+Math.sin(a)*(R+22));ctx.stroke();}
        }
        if(this.slash){
            const s=this.slash,g=ironhaulWeapons(this),prev=s.previous;
            if(prev){ctx.strokeStyle=this.silver?'#c7faff':'#ffcf96';ctx.lineWidth=3;ctx.globalAlpha=.65;ctx.beginPath();ctx.moveTo(g.grip.x,g.grip.y);ctx.lineTo(g.tip.x,g.tip.y);ctx.stroke();ctx.globalAlpha=1;}
        }
        if(this.shieldStrike){
            const g=ironhaulWeapons(this),q=this.shieldStrike;
            ctx.save();ctx.globalAlpha=.18;ctx.strokeStyle='#bdfaff';ctx.lineWidth=4;
            ctx.beginPath();g.shieldPoints.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.stroke();ctx.restore();
        }
        const wind=this.ram?.stage==='warn'||this.state==='ih_parry'&&this.subTimer<=34;
        if(wind){ctx.strokeStyle=this.state==='ih_parry'?'#bdfaff':'#ffbc6e';ctx.lineWidth=3;ctx.beginPath();ctx.arc(this.cx()+this.dir()*(this.vehicle?123:52),this.cy(),this.state==='ih_parry'?29:19,0,7);ctx.stroke();}
        ctx.restore();
        drawTopBossBar(this,this.silver?'#d9eff7':this.phase===1?'#f3b664':'#79b8d0','IRONHAUL');
        ctx.save();hudManHinh(this);ctx.textAlign='center';ctx.font='bold 11px Consolas';ctx.fillStyle=this.silver?'#d9faff':'#f4cca0';ctx.fillText((this.coreBuff>0?'⚡ KIẾM CƯỜNG HÓA · ':'')+(IRONHAUL_MOVES[this.state]?.name||(['ih_shift','ih_silver'].includes(this.state)?'ĐANG CHUYỂN DẠNG…':'FREIGHT DISTRICT')),canvas.width/2,53);ctx.restore();
    }
}
// BOSS_PART_END s1.IronhaulBoss.1

// Nguồn: index.html:35472 · Dùng bởi: IronhaulBoss, ZeusBoss
// BOSS_PART_BEGIN s1.lavaGeysers.1 READ_ONLY
let lavaGeysers = [];
// BOSS_PART_END s1.lavaGeysers.1

// Nguồn: index.html:35473 · Dùng bởi: IndominusBoss, IronhaulBoss, ZeusBoss
// BOSS_PART_BEGIN s1.grassField.1 READ_ONLY
let grassField = [];
// BOSS_PART_END s1.grassField.1

// Nguồn: index.html:35474 · Dùng bởi: IronhaulBoss, ZeusBoss
// BOSS_PART_BEGIN s1.forestScene.1 READ_ONLY
let forestScene = null;
// BOSS_PART_END s1.forestScene.1
