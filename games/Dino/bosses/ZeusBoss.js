// BOSS_FILE: ZeusBoss
// BOSS_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: BossProjectile, DPR, FloatingText, Math, Number, Object, SFX, Set, bossProjectiles, camReset, canvas, checkAABB, combatStance, ctx, danteGuardContact, danteRoyalShield, dealDamage, dino, dojoMode, enemies, floatingTexts, frames, freeMove, hasRune, mapTheme, obstacles, parry, parryDamage, parryGainUlt, perfectParryCd, platforms, sgSegmentBox, shakeTimer, shinGuardReset, voidChanParry, worldR
// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

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

// Nguồn: index.html:34909 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.ZEUS_MOVES.1 EDITABLE
const ZEUS_MOVES={
    z_blink:{name:'LÔI BỘ · KHÓA ẢNH → TAM LIÊN ĐÂM',end:288,air:false},
    z_spear:{name:'LAO SÉT · SONG KÍCH',end:154,air:false},
    z_blade:{name:'THIỂM KIẾM · LAO CHÉM',end:154,air:false},
    z_smite:{name:'THIÊN CHÙY · SÉT ĐÁNH & SÓNG ĐIỆN',end:174,air:false},
    z_hunt:{name:'LÔI ẢNH · DỊCH CHUYỂN → SONG TRẢM → THIÊN GIÁNG',end:382,air:false},
    z_clap:{name:'BẠO LÔI VỖ TAY · RỜI KHỎI VÒNG ĐIỆN',cast:84,end:174,air:false},
    z_crown:{name:'THIÊN LUÂN · THẤT LÔI THƯƠNG',cast:120,end:298,air:true},
    z_tempest:{name:'PHONG BẠO · SONG LỐC',cast:110,end:328,air:true},
    z_rain:{name:'THIÊN LÔI · TỨ TRẬN MƯA SÉT',cast:100,end:342,air:true},
    z_cataclysm:{name:'PHÁN QUYẾT BẦU TRỜI · VÀO VÙNG XANH',cast:150,end:310,air:true}
};
// BOSS_PART_END s1.ZEUS_MOVES.1

// Nguồn: index.html:34921 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusClamp.1 EDITABLE
function zeusClamp(v,a,b){return Math.max(a,Math.min(b,v));}
// BOSS_PART_END s1.zeusClamp.1

// Nguồn: index.html:34922 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusEase.1 EDITABLE
function zeusEase(u){u=zeusClamp(u,0,1);return u*u*(3-2*u);}
// BOSS_PART_END s1.zeusEase.1

// Nguồn: index.html:34923 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusMix.1 EDITABLE
function zeusMix(a,b,u){return a+(b-a)*u;}
// BOSS_PART_END s1.zeusMix.1

// Nguồn: index.html:34924 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusPoly.1 EDITABLE
function zeusPoly(points,fill,edge='#302940'){
    ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();
    ctx.fillStyle=fill;ctx.fill();if(edge){ctx.strokeStyle=edge;ctx.lineWidth=2;ctx.stroke();}
}
// BOSS_PART_END s1.zeusPoly.1

// Nguồn: index.html:34928 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusLightning.1 EDITABLE
function zeusLightning(x,y,tx,ty,seed=0,width=3,color='#a6edff'){
    const dx=tx-x,dy=ty-y,L=Math.hypot(dx,dy)||1,n=Math.max(4,Math.ceil(L/24));
    const pts=[];for(let i=0;i<=n;i++){const u=i/n,noise=Math.sin(i*12.73+seed*2.1)*43758.5453,j=i===0||i===n?0:(noise-Math.floor(noise)-.5)*22;pts.push([x+dx*u-dy/L*j,y+dy*u+dx/L*j]);}
    ctx.save();ctx.lineJoin='miter';ctx.strokeStyle=color;ctx.lineWidth=width+5;ctx.globalAlpha*=.24;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();
    ctx.globalAlpha/=.24;ctx.strokeStyle='#f6feff';ctx.lineWidth=width;ctx.stroke();ctx.restore();
}
// BOSS_PART_END s1.zeusLightning.1

// Nguồn: index.html:34934 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusSigil.1 EDITABLE
function zeusSigil(x,y,R,turn=0,alpha=1){
    ctx.save();ctx.translate(x,y);ctx.rotate(turn);ctx.globalAlpha*=alpha;ctx.strokeStyle='#9fe8ff';ctx.lineWidth=2;
    for(const r of [R,R*.81]){ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();}
    for(let i=0;i<12;i++){const a=i*Math.PI/6;ctx.save();ctx.rotate(a);ctx.beginPath();ctx.moveTo(R*.87,-4);ctx.lineTo(R*.94,0);ctx.lineTo(R*.87,5);ctx.moveTo(R*.91,-5);ctx.lineTo(R*.91,7);ctx.stroke();ctx.restore();}
    for(let i=0;i<3;i++){ctx.save();ctx.rotate(i*Math.PI/3);ctx.beginPath();ctx.moveTo(0,-R*.7);ctx.lineTo(R*.61,R*.35);ctx.lineTo(-R*.61,R*.35);ctx.closePath();ctx.stroke();ctx.restore();}
    ctx.restore();
}
// BOSS_PART_END s1.zeusSigil.1

// Nguồn: index.html:34941 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusPulseTouches.1 EDITABLE
function zeusPulseTouches(h,target){
    const R=8+Math.min(h.life,h.age-h.warn)*8;
    const near=Math.hypot(zeusClamp(h.x,target.x,target.x+target.w)-h.x,zeusClamp(h.y,target.y,target.y+target.h)-h.y);
    const far=Math.max(...[target.x,target.x+target.w].flatMap(x=>[target.y,target.y+target.h].map(y=>Math.hypot(x-h.x,y-h.y))));
    return near<=R+9&&far>=R-9;
}
// BOSS_PART_END s1.zeusPulseTouches.1

// Nguồn: index.html:34947 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusSpearShape.1 EDITABLE
function zeusSpearShape(x,y,angle,size=1,alpha=1){
    ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.scale(size,size);ctx.globalAlpha*=alpha;
    ctx.fillStyle='rgba(98,205,255,.14)';ctx.beginPath();ctx.ellipse(-6,0,52,12,0,0,7);ctx.fill();
    zeusPoly([[-44,-3],[4,-6],[-1,-13],[36,0],[-1,13],[4,6],[-44,3]],'#98e9ff','#ecfcff');
    ctx.fillStyle='#f5d389';ctx.fillRect(-26,-8,4,16);ctx.fillStyle='#fff';ctx.fillRect(-38,-1,56,2);ctx.restore();
}
// BOSS_PART_END s1.zeusSpearShape.1

// Nguồn: index.html:34953 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusPatternAngles.1 EDITABLE
function zeusPatternAngles(h){
    if(h.mode==='cross')return(h.dense?[-.72,-.48,-.24,.24,.48,.72]:[-.48,-.24,.24,.48]).map(a=>h.aim+a);
    // The omitted sector leaves a wide route for full-size side-scroller characters.
    const angles=[];for(let i=0;i<19;i++){const a=.18+i*(Math.PI-.36)/18;if(Math.abs(a-h.aim)>.32)angles.push(a);}
    return angles;
}
// BOSS_PART_END s1.zeusPatternAngles.1

// Nguồn: index.html:34959 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusSpark.1 EDITABLE
function zeusSpark(b,x,y,angle,speed,curve=0,life=210,color='#9cecff'){
    if(bossProjectiles.filter(q=>q._zeusSpark&&q._zeusOwner===b).length>=180)return null;
    const p=new BossProjectile(x-4,y-4,Math.cos(angle)*speed,Math.sin(angle)*speed,false,1);
    p.w=p.h=8;p._zeusOwner=b;p._zeusSpark=true;p.age=0;p.curve=curve;p.life=life;p.color=color;p.frail=false;
    p.update=function(){
        if(++this.age<=36&&this.curve){const a=Math.atan2(this.vy,this.vx)+this.curve,v=Math.hypot(this.vx,this.vy);this.vx=Math.cos(a)*v;this.vy=Math.sin(a)*v;}
        this.x+=this.vx;this.y+=this.vy;if(this.age>=this.life||this.vy>0&&this.y>=320||b.dying||b.hp<=0)this.x=worldR()+9999;
    };
    p.veRieng=function(q){ctx.save();ctx.translate(q.x+4,q.y+4);ctx.rotate(Math.atan2(q.vy,q.vx));ctx.fillStyle=q.color;ctx.globalAlpha=.22;ctx.beginPath();ctx.ellipse(-5,0,12,6,0,0,7);ctx.fill();ctx.globalAlpha=1;ctx.beginPath();ctx.ellipse(0,0,5,4,0,0,7);ctx.fill();ctx.fillStyle='#f4ffff';ctx.fillRect(-1,-2,3,4);ctx.restore();};
    bossProjectiles.push(p);return p;
}
// BOSS_PART_END s1.zeusSpark.1

// Nguồn: index.html:34970 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusDrawPattern.1 EDITABLE
function zeusDrawPattern(h){
    const live=h.age>=h.warn,u=Math.min(1,h.age/h.warn),R=16+u*11;
    ctx.save();ctx.globalAlpha=live?Math.max(0,1-(h.age-h.warn)/14):.28+u*.5;
    zeusSigil(h.x,h.y,R,-frames*.025,.8);ctx.strokeStyle=h.dense?'#d6adff':'#96e6ff';ctx.lineWidth=1.5;
    for(const a of zeusPatternAngles(h)){ctx.beginPath();ctx.moveTo(h.x+Math.cos(a)*R,h.y+Math.sin(a)*R);ctx.lineTo(h.x+Math.cos(a)*(R+16),h.y+Math.sin(a)*(R+16));ctx.stroke();}
    if(h.mode!=='cross'){ctx.strokeStyle='#f4d68b';ctx.setLineDash([3,5]);for(const a of [h.aim-.32,h.aim+.32]){ctx.beginPath();ctx.moveTo(h.x,h.y);ctx.lineTo(h.x+Math.cos(a)*125,h.y+Math.sin(a)*125);ctx.stroke();}ctx.setLineDash([]);}
    ctx.restore();
}
// BOSS_PART_END s1.zeusDrawPattern.1

// Nguồn: index.html:34978 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusDrawPortal.1 EDITABLE
function zeusDrawPortal(b){
    const p=b.portal;if(!p||p.age>=58)return;
    const col=p.locked?'#ffb58c':'#e1c482',dir=p.dir||1,y=236;
    ctx.save();ctx.strokeStyle=col;ctx.lineWidth=p.locked?3:2;ctx.globalAlpha=p.locked?.95:.55;
    // A translucent thrust silhouette travels with the candidate destination, then freezes red.
    const g=Object.create(b);Object.assign(g,{x:p.x-b.w/2,y:b.baseY,state:'idle',subTimer:0,airborne:false,slash:{kind:'thrust',age:9,life:18,a0:-.12,a1:.12},facingLeft:dir<0});
    ctx.save();ctx.globalAlpha*=.28;zeusBody(g,true);ctx.restore();
    ctx.setLineDash(p.locked?[]:[5,5]);ctx.beginPath();ctx.moveTo(p.x,y);ctx.lineTo(p.x+dir*145,y);ctx.stroke();ctx.setLineDash([]);
    ctx.save();ctx.translate(p.x+dir*126,y);ctx.scale(dir,1);zeusPoly([[-16,-13],[7,0],[-16,13],[-8,0]],col,null);ctx.restore();
    ctx.beginPath();ctx.ellipse(p.x,317,45,8,0,0,7);ctx.stroke();ctx.fillStyle=col;ctx.font='bold 10px Consolas';ctx.textAlign='center';ctx.fillText(p.locked?'ĐÃ KHÓA':'TRUY ẢNH',p.x,216);
    ctx.restore();
}
// BOSS_PART_END s1.zeusDrawPortal.1

// Nguồn: index.html:34990 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusStormFx.1 EDITABLE
function zeusStormFx(b){
    const st=b.state,t=b.subTimer,m=ZEUS_MOVES[st];
    ctx.save();
    if(m?.air){
        const channel=zeusClamp(t/(m.cast||100),0,1),fade=zeusClamp((m.end-t)/45,0,1);
        ctx.fillStyle='rgba(5,12,33,'+(.12*channel*fade)+')';ctx.fillRect(0,-200,canvas.width,520);
        // A rotating storm eye and branching cloud currents form above the ritual.
        const R=st==='z_cataclysm'?150:94;
        ctx.globalAlpha=(.18+.35*channel)*fade;
        for(let k=0;k<6;k++){
            ctx.strokeStyle=k%2?'#7c99ca':'#bad7ee';ctx.lineWidth=12-k;
            ctx.beginPath();ctx.ellipse(b.cx(),-96,R+k*12,13+k*5,Math.sin(frames*.01)*.08,frames*.017+k,frames*.017+k+4.3);ctx.stroke();
        }
        ctx.globalAlpha=1;
        if(st==='z_cataclysm'){
            const a=zeusClamp((t-35)/65,0,1)*zeusClamp((188-t)/35,0,1);
            // A luminous god-image follows the actual ritual pose; it has no hidden body damage.
            ctx.save();ctx.globalAlpha=a*.2;ctx.translate(b.cx(),180);ctx.scale(2.4,2.4);ctx.translate(-b.cx(),-b.y-b.h);zeusBody(b,true);ctx.restore();
            zeusSigil(b.cx(),-82,80+channel*46,-frames*.008,a*.55);
            if(t>=150&&t<174){ctx.fillStyle='rgba(197,233,255,'+((174-t)/24*.13)+')';ctx.fillRect(0,-200,canvas.width,520);}
        }else zeusSigil(b.cx(),b.y+60,94,frames*.009,channel*.25*fade);
    }
    for(const q of b.crown||[]){
        if(q.sent)continue;
        const alpha=zeusClamp((t-q.appear)/20,0,1);if(!alpha)continue;
        zeusSpearShape(q.x,q.y,q.locked?Math.atan2(q.ty-q.y,q.tx-q.x):Math.PI/2,1.15,alpha);
        if(q.locked){ctx.strokeStyle='rgba(244,202,117,.65)';ctx.lineWidth=1;ctx.setLineDash([5,7]);ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(q.tx,q.ty);ctx.stroke();ctx.setLineDash([]);}
    }
    ctx.restore();
}
// BOSS_PART_END s1.zeusStormFx.1

// Nguồn: index.html:35020 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusDrawBursts.1 EDITABLE
function zeusDrawBursts(b){
    ctx.save();
    for(const f of b.fx){
        const u=f.age/f.life,a=(1-u)*(1-u);ctx.globalAlpha=a;
        if(f.kind==='slash'){
            ctx.strokeStyle='#a1eaff';ctx.lineWidth=4*(1-u);ctx.beginPath();ctx.moveTo(f.grip.x,f.grip.y);ctx.lineTo(f.tip.x,f.tip.y);ctx.stroke();
            ctx.strokeStyle='#e6fcff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(f.grip.x,f.grip.y,112,f.angle-f.dir*.35,f.angle,f.dir<0);ctx.stroke();continue;
        }
        const R=f.size*(.25+u*.85);
        ctx.strokeStyle=f.kind==='gold'?'#ffe9a0':'#a8eaff';ctx.lineWidth=2+4*(1-u);
        ctx.beginPath();ctx.ellipse(f.x,f.y,R,R*.28,0,0,Math.PI*2);ctx.stroke();
        for(let i=0;i<9;i++){const a=i*Math.PI*2/9+f.seed;ctx.beginPath();ctx.moveTo(f.x+Math.cos(a)*R*.55,f.y+Math.sin(a)*R*.5);ctx.lineTo(f.x+Math.cos(a)*R,f.y+Math.sin(a)*R*.8);ctx.stroke();}
        if(f.age<8){ctx.fillStyle='#effbff';ctx.beginPath();ctx.arc(f.x,f.y,Math.max(1,12-f.age),0,7);ctx.fill();}
    }
    ctx.restore();
}
// BOSS_PART_END s1.zeusDrawBursts.1

// Nguồn: index.html:35036 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.setupZeusArena.1 EDITABLE
function setupZeusArena(){
    mapTheme='olympus';camReset();freeMove=true;
    platforms.length=enemies.length=obstacles.length=bossProjectiles.length=lavaGeysers.length=0;
    forestScene=null;grassField=[];
    platforms.push({x:-60,top:320,w:canvas.width+120,h:110});
    // Side altars bring every player rig within melee reach of the casting god.
    for(const x of [225,canvas.width-365])platforms.push({x,top:236,w:140,h:22});
    dino.x=130;dino.y=320-dino.h;dino.dy=0;dino.grounded=true;dino.invincible=true;dino.invTimer=90;
}
// BOSS_PART_END s1.setupZeusArena.1

// Nguồn: index.html:35045 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.drawZeusSky.1 EDITABLE
function drawZeusSky(){
    ctx.save();const W=canvas.width;
    const sky=ctx.createLinearGradient(0,-240,0,350);sky.addColorStop(0,'#11182f');sky.addColorStop(.5,'#354264');sky.addColorStop(1,'#ac95aa');ctx.fillStyle=sky;ctx.fillRect(-80,-260,W+160,760);
    ctx.fillStyle='#dbd3b7';ctx.globalAlpha=.26;ctx.beginPath();ctx.arc(W*.53,-105,76,0,7);ctx.fill();ctx.globalAlpha=1;
    for(let layer=0;layer<3;layer++)for(let i=-2;i<12;i++){
        const x=i*138+Math.sin(frames*.0015+layer)*22+(layer%2)*65,y=-100+layer*145+Math.sin(i*3.7+layer)*28;
        ctx.fillStyle=['#26344e','#66738d','#b0a5b3'][layer];ctx.globalAlpha=.65;
        ctx.beginPath();ctx.ellipse(x,y,108,24+layer*4,0,0,7);ctx.ellipse(x+42,y-16,66,33,0,0,7);ctx.fill();
    }
    ctx.globalAlpha=1;
    // Distant marble shrine, broken fluted columns and gold lightning pediment.
    for(const x of [60,145,W-171,W-86]){
        zeusPoly([[x,305],[x+12,5],[x+43,5],[x+53,305]],'#6d7793','#495470');
        ctx.fillStyle='#a5a7bb';ctx.fillRect(x+15,14,5,280);ctx.fillRect(x+31,14,3,280);
        ctx.fillStyle='#c8bdab';ctx.fillRect(x+5,-3,43,12);ctx.fillRect(x-3,296,61,17);
        ctx.fillStyle='#bc9c58';ctx.fillRect(x+2,8,48,5);
    }
    zeusPoly([[26,-18],[W/2,-100],[W-26,-18]],'#4c5773','#bca874');
    ctx.strokeStyle='#aa9d7e';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(56,-25);ctx.lineTo(W/2,-84);ctx.lineTo(W-56,-25);ctx.stroke();
    zeusPoly([[W/2+7,-76],[W/2-15,-49],[W/2+2,-49],[W/2-8,-24],[W/2+21,-56],[W/2+4,-56]],'#f3d58b',null);
    ctx.fillStyle='#a6a6b4';ctx.fillRect(-60,320,W+120,105);ctx.fillStyle='#e7ded0';ctx.fillRect(-60,316,W+120,8);
    ctx.fillStyle='#706f88';for(let i=0;i<16;i++){ctx.fillRect(i*76,329,2,85);ctx.fillRect(i*76+18,351,47,2);}
    ctx.fillStyle='#bd9b57';ctx.fillRect(0,324,W,3);
    for(const x of [225,W-365]){
        zeusPoly([[x+15,320],[x+29,249],[x+111,249],[x+125,320]],'#757e99','#4d5770');
        ctx.fillStyle='#e7ded0';ctx.fillRect(x-3,235,146,9);ctx.fillStyle='#c49d54';ctx.fillRect(x+4,245,132,4);
        ctx.strokeStyle='#d4bd7a';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x+70,280,17,0,7);ctx.stroke();
    }
    for(let i=0;i<30;i++){const x=(i*83+frames*1.8)%(W+80)-40,y=(i*67+frames*5)%530-200;ctx.strokeStyle='rgba(181,211,255,.16)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-5,y+13);ctx.stroke();}
    ctx.restore();
}
// BOSS_PART_END s1.drawZeusSky.1

// Nguồn: index.html:35077 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusRig.1 EDITABLE
function zeusRig(b){
    const t=b.subTimer,st=b.state,casting=ZEUS_MOVES[st]?.air,walk=b.state==='idle'?Math.sin(frames*.08)*2:0;
    const lift=casting?zeusEase(t/28):0,dir=b.dir(),feet=b.y+b.h;
    let hand={x:39,y:-74},elbow={x:35,y:-92},off={x:-34,y:-66},angle=.6;
    if(casting){hand={x:34,y:-99-36*lift};elbow={x:41,y:-107};off={x:-43,y:-94-22*lift};angle=-1.25;}
    if(st==='z_spear'){
        const shot=t<=65?52:90,prep=zeusEase((t-(shot-28))/22),release=zeusEase((t-shot)/12);
        hand={x:zeusMix(38,-8,prep)+release*63,y:zeusMix(-74,-123,prep)+release*24};elbow={x:9,y:-98};angle=-.4;
    }
    if(st==='z_blink'){hand={x:28,y:-110};off={x:-33,y:-100};angle=-1.1;}
    if(st==='z_hunt'&&!b.slash){hand={x:5,y:-121};elbow={x:20,y:-103};off={x:-29,y:-91};angle=-2.05;}
    if(st==='z_clap'){
        const squeeze=zeusEase(t/70),release=zeusEase((t-84)/14);
        hand={x:zeusMix(56,28,squeeze)+release*18,y:-84};off={x:zeusMix(-51,24,squeeze)-release*55,y:-84};elbow={x:37,y:-104};angle=-.4;
    }
    if(st==='z_smite'){const q=t<86?zeusEase(t/35):1-zeusEase((t-86)/15);hand={x:25,y:-65-q*75};elbow={x:35,y:-90-q*25};angle=-1.4;}
    if(st==='z_blade'&&t<=58){const u=zeusEase(t/30);hand={x:zeusMix(39,2,u),y:zeusMix(-74,-115,u)};angle=zeusMix(.6,-2.1,u);elbow={x:18,y:-101};}
    if(b.slash){const s=b.slash,u=zeusEase(s.age/s.life);angle=zeusMix(s.a0,s.a1,u);hand={x:27+Math.cos(angle)*11,y:-88+Math.sin(angle)*10};elbow={x:18,y:-95};}
    if(b.slash?.kind==='thrust'){const u=zeusEase(b.slash.age/b.slash.life);hand={x:34+Math.sin(u*Math.PI)*20,y:-84};elbow={x:18,y:-99};}
    const point=p=>({x:b.cx()+dir*p.x,y:feet+p.y});
    return {hand,elbow,off,angle,walk,lift,grip:point(hand),tip:point({x:hand.x+Math.cos(angle)*112,y:hand.y+Math.sin(angle)*112})};
}
// BOSS_PART_END s1.zeusRig.1

// Nguồn: index.html:35099 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusBody.1 EDITABLE
function zeusBody(b,ghost=false){
    const r=zeusRig(b),cast=ZEUS_MOVES[b.state]?.air,t=b.subTimer,charged=cast&&t<ZEUS_MOVES[b.state].cast;
    ctx.save();ctx.translate(b.cx(),b.y+b.h);ctx.scale(b.dir(),1);ctx.lineCap='round';
    if(b.airborne){ctx.fillStyle='#b8c5df';ctx.globalAlpha*=.6;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.ellipse(i*20,5+Math.sin(frames*.04+i)*3,28,10,0,0,7);ctx.fill();}ctx.globalAlpha/=.6;}
    const flutter=Math.sin(frames*.065)*7;
    zeusPoly([[-17,-110],[-34,-102],[-46,-64],[-40+flutter,-12],[-9,-28],[10,-79]],'#293551','#c7b475');
    zeusPoly([[-27,-99],[-35,-65],[-31+flutter,-26],[-21,-38],[-13,-91]],'#455675',null);
    // Separate thighs, knees, calves, ankles and gold-strapped sandals.
    for(const side of [-1,1]){const hip=side*12,knee=side*15+r.walk*side,ankle=side*20;
        ctx.strokeStyle='#694c50';ctx.lineWidth=15;ctx.beginPath();ctx.moveTo(hip,-57);ctx.lineTo(knee,-32);ctx.lineTo(ankle,-6);ctx.stroke();
        ctx.strokeStyle='#dba987';ctx.lineWidth=10;ctx.stroke();
        ctx.fillStyle='#edbf91';ctx.fillRect(knee-5,-37,9,8);ctx.fillStyle='#c5a15a';ctx.fillRect(ankle-6,-17,11,4);ctx.fillRect(ankle-7,-8,15,5);
        zeusPoly([[ankle-8,-4],[ankle+12,-4],[ankle+15,1],[ankle-8,1]],'#9e7953','#4a4255');
    }
    zeusPoly([[-24,-112],[17,-116],[28,-96],[20,-65],[-18,-65],[-28,-96]],'#e6b18c');
    zeusPoly([[-15,-111],[2,-110],[16,-100],[13,-81],[-3,-85],[-20,-98]],'#f2c7a2',null);
    ctx.strokeStyle='#b77e69';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-16,-95);ctx.lineTo(-2,-91);ctx.lineTo(12,-95);ctx.moveTo(-2,-90);ctx.lineTo(-2,-70);ctx.stroke();
    zeusPoly([[-27,-116],[-10,-111],[7,-69],[-21,-67]],'#e5e6eb','#9296ac');
    zeusPoly([[-22,-70],[21,-70],[31,-35],[10,-40],[1,-28],[-15,-39],[-30,-32]],'#dddfe8','#919ab4');
    for(let i=-2;i<=2;i++){ctx.strokeStyle='#a2abc1';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(i*8,-64);ctx.lineTo(i*10,-39);ctx.stroke();}
    ctx.fillStyle='#caa351';ctx.fillRect(-24,-71,47,7);ctx.fillStyle='#fff0ad';ctx.fillRect(-5,-72,11,9);
    const arm=(root,joint,hand)=>{ctx.strokeStyle='#73535a';ctx.lineWidth=16;ctx.beginPath();ctx.moveTo(...root);ctx.lineTo(joint.x,joint.y);ctx.lineTo(hand.x,hand.y);ctx.stroke();ctx.strokeStyle='#e6b18c';ctx.lineWidth=11;ctx.stroke();ctx.fillStyle='#e5be72';ctx.fillRect(hand.x-6,hand.y-10,12,8);ctx.fillStyle='#f2c6a0';ctx.fillRect(hand.x-5,hand.y-3,11,9);};
    arm([-23,-107],{x:-39,y:-88-r.lift*12},r.off);arm([20,-107],r.elbow,r.hand);
    // White hair silhouette, brow, aquiline nose, separate beard locks and laurel.
    zeusPoly([[-20,-123],[-23,-137],[-12,-147],[8,-149],[23,-139],[25,-124],[14,-113],[-11,-115]],'#dbe7f1','#52617c');
    zeusPoly([[-13,-135],[13,-136],[19,-124],[11,-113],[-12,-116]],'#efbd98');
    ctx.fillStyle='#f6fcff';ctx.fillRect(6,-130,10,3);ctx.fillStyle='#71e7ff';ctx.fillRect(11,-128,5,3);
    zeusPoly([[13,-125],[22,-121],[13,-119]],'#f6d1a8',null);
    zeusPoly([[-17,-123],[-6,-118],[10,-118],[17,-123],[15,-109],[7,-96],[2,-101],[-5,-97],[-15,-109]],'#e8f0f3','#7b879c');
    ctx.strokeStyle='#aabaca';ctx.lineWidth=2;for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(i*7,-116);ctx.lineTo(i*6,-104);ctx.stroke();}
    ctx.strokeStyle='#d7b15f';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-18,-134);ctx.quadraticCurveTo(0,-145,20,-135);ctx.stroke();
    for(let i=-2;i<=2;i++)zeusPoly([[i*7-3,-138],[i*7,-146+Math.abs(i)*2],[i*7+3,-138]],'#ffe29c',null);
    ctx.save();ctx.translate(r.hand.x,r.hand.y);ctx.rotate(r.angle);
    const sword=b.state==='z_blade'||b.state==='z_hunt'||b.slash;
    if(sword){zeusPoly([[-5,-5],[78,-8],[112,0],[78,7],[-5,5]],'#a2eaff','#e6ffff');ctx.fillStyle='#e7bd6b';ctx.fillRect(-7,-14,5,28);ctx.fillRect(-22,-3,18,6);}
    else{zeusPoly([[-9,5],[17,-10],[9,0],[36,-8],[9,16],[15,5],[-9,12]],'#d3f8ff','#73dfff');}
    ctx.restore();
    if(charged&&!ghost){ctx.strokeStyle='#9eeeff';ctx.lineWidth=2;ctx.globalAlpha*=.6;ctx.beginPath();ctx.arc(0,-83,60+Math.sin(frames*.08)*4,-Math.PI,0);ctx.stroke();}
    ctx.restore();
}
// BOSS_PART_END s1.zeusBody.1

// Nguồn: index.html:35139 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.zeusSpear.1 EDITABLE
function zeusSpear(b,source=null){
    const r=zeusRig(b),origin=source||r.grip,tx=source?source.tx:b.lockX,ty=source?source.ty:b.lockY,a=Math.atan2(ty-origin.y,tx-origin.x);
    const size=source?1.15:.65,p=new BossProjectile(origin.x+Math.cos(a)*26*size-10,origin.y+Math.sin(a)*26*size-10,Math.cos(a)*7.5,Math.sin(a)*7.5,false,1);
    // Only the bright lance tip deals damage. Its long glowing wake is a visual trail.
    p.w=p.h=20;p._zeusOwner=b;p.age=0;p.frail=false;p.spearSize=size;p.spawn={x:origin.x,y:origin.y};
    p.update=function(){this.x+=this.vx;this.y+=this.vy;if(++this.age>160||b.dying||b.hp<=0)this.x=worldR()+9999;};
    p.veRieng=function(q){const a=Math.atan2(q.vy,q.vx);zeusSpearShape(q.x+q.w/2-Math.cos(a)*26*q.spearSize,q.y+q.h/2-Math.sin(a)*26*q.spearSize,a,q.spearSize);};
    bossProjectiles.push(p);SFX.tone(700,.12,'sawtooth',.08,170);return p;
}
// BOSS_PART_END s1.zeusSpear.1

// Nguồn: index.html:35148 · Dùng bởi: ZeusBoss
// BOSS_PART_BEGIN s1.ZeusBoss.1 EDITABLE
class ZeusBoss{
    static setupArena(){setupZeusArena();}
    static drawArena(){drawZeusSky();}
    constructor(level=1){
        this.name='ZEUS';this.w=68;this.h=132;this.x=canvas.width-240;this.baseY=320-this.h;this.y=this.baseY;
        this.maxHp=240;this._hp=240;this.phase=1;this._tier='S';this.aiRieng=true;this.tuXuLyKhien=true;this._firstStrikeHooked=true;
        Object.defineProperty(this,'hp',{enumerable:true,configurable:true,get:()=>this._hp,set:v=>{
            if(!Number.isFinite(v))return;if(v<this._hp&&(this.invulnAll||this.dying))return;
            if(v<this._hp&&!this._firstStrikeUsed&&hasRune('firststrike')){v-=Math.ceil(this.maxHp*.2);this._firstStrikeUsed=true;floatingTexts.push(new FloatingText(this.cx()-40,this.y-20,'FIRST STRIKE!'));}
            if(this.isCasting())this.castDamage+=Math.max(0,this._hp-v);this._hp=Math.max(0,v);
        }});
        this.state='entering';this.subTimer=0;this.actionTimer=60;this.invulnAll=true;this.facingLeft=true;this.airborne=false;this.grounded=true;this.dy=0;this.burnTimer=0;
        this.groundCount=0;this.groundCycle=0;this.airCount=0;this.airCycle=0;this.castDamage=0;this.hazards=[];this.ghosts=[];this.fx=[];this.crown=[];this.hitKeys=new Set();this.slash=null;this.lastAttack='';this.serial=0;
    }
    cx(){return this.x+this.w/2;}
    dir(){return this.facingLeft?-1:1;}
    faceP(){this.facingLeft=dino.x+dino.w/2<this.cx();}
    isCasting(){const m=ZEUS_MOVES[this.state];return !!(m?.cast&&this.subTimer<m.cast);}
    clearAttack(purge=false){
        this.slash=null;this.portal=null;this.crown=[];this.hitKeys.clear();this.castDamage=0;this.dy=0;
        const c=this._dswControl;if(c?.release)c.release();
        if(purge){this.hazards.length=0;this.fx.length=0;for(let i=bossProjectiles.length-1;i>=0;i--)if(bossProjectiles[i]._zeusOwner===this)bossProjectiles.splice(i,1);}
    }
    idle(wait=48){this.clearAttack();this.state='idle';this.subTimer=0;this.actionTimer=wait;this.invulnAll=false;}
    legalMoves(){return Object.keys(ZEUS_MOVES).filter(k=>ZEUS_MOVES[k].air===this.airborne);}
    chooseAttack(){
        if(!this.airborne&&this.groundCount>=3){this.travel(true);return;}
        if(this.airborne&&this.airCount>=2){this.travel(false);return;}
        if(this.airborne){this.begin(['z_crown','z_tempest','z_rain','z_cataclysm'][this.airCycle++%4]);return;}
        if(this.groundCount===0){this.begin(this.groundCycle++%2?'z_clap':'z_hunt');return;}
        const gap=Math.abs(this.cx()-dino.x-dino.w/2),pool=gap>270?['z_blink','z_spear','z_blade']:['z_blink','z_blade','z_smite','z_spear'];
        const list=pool.filter(k=>k!==this.lastAttack);this.begin(list[Math.floor(Math.random()*list.length)]);
    }
    travel(up){
        this.clearAttack(true);this.state=up?'z_ascend':'z_descend';this.subTimer=0;this.fromY=this.y;this.fromX=this.x;
        this.toX=up?canvas.width/2-this.w/2:zeusClamp(this.cx()-this.w/2,65,canvas.width-this.w-65);this.toY=up?178-this.h:this.baseY;
        this.grounded=false;this.invulnAll=false;
    }
    begin(state){
        if(!this.legalMoves().includes(state))return false;
        this.clearAttack(state==='z_cataclysm');this.state=this.lastAttack=state;this.subTimer=0;this.faceP();this.attackDir=this.dir();this.serial++;
        this.lockX=zeusClamp(dino.x+dino.w/2,40,canvas.width-40);this.lockY=dino.y+dino.h/2;
        if(this.airborne)this.airCount++;else this.groundCount++;
        if(state==='z_blink'||state==='z_hunt')this.planBlink(0);
        if(state==='z_clap'){this.addHazard('pulse',this.cx()+this.dir()*28,this.y+this.h-84,84,24,{radius:192});}
        if(state==='z_crown')for(let i=0;i<7;i++){
            const a=Math.PI+(i+.5)*Math.PI/7;
            this.crown.push({x:this.cx()+Math.cos(a)*182,y:145+Math.sin(a)*184,fire:120+i*16,appear:i*9,locked:false,sent:false});
        }
        if(state==='z_blade')this.dashTo=zeusClamp(this.lockX-this.attackDir*90-this.w/2,8,canvas.width-this.w-8);
        if(state==='z_cataclysm'){
            this.safeX=zeusClamp(this.lockX,160,canvas.width-160);this.safeHalf=96;
            this.addHazard('judgement',0,0,150,20,{safeX:this.safeX,safeHalf:this.safeHalf});
        }
        if(state==='z_tempest')for(const x of [170,canvas.width-170])this.addHazard('tornado',x,110,110,180,{dir:x<canvas.width/2?1:-1});
        if(state==='z_smite')this.addHazard('bolt',this.lockX,0,90,18,{radius:40});
        return true;
    }
    planBlink(leg){
        const px=dino.x+dino.w/2,side=leg%2?1:-1,tx=zeusClamp(px+side*125,64,canvas.width-64);
        this.portal={x:tx,leg,side,age:0,locked:false,dir:Math.sign(px-tx)||1,targetX:px,targetY:dino.y+dino.h/2,hazard:this.addHazard('arrival',tx,320,56,18,{radius:43})};
    }
    tickPortal(){
        const p=this.portal;if(!p)return;p.age++;
        // Thirty tracking frames, twelve locked frames, then a fourteen-frame arrival grace period.
        if(p.age<=30){p.targetX=dino.x+dino.w/2;p.targetY=dino.y+dino.h/2;p.x=zeusClamp(p.targetX+p.side*125,64,canvas.width-64);p.dir=Math.sign(p.targetX-p.x)||-p.side;p.hazard.x=p.x;}
        if(p.age===30){p.locked=true;SFX.tone(1250,.045,'sine',.05,900);}
        if(p.age===42){
            this.ghosts.push({x:this.x,y:this.y,facingLeft:this.facingLeft,life:22});this.burst(this.cx(),this.y+65,60);
            this.x=p.x-this.w/2;this.y=this.baseY;this.facingLeft=p.dir<0;this.attackDir=p.dir;this.burst(this.cx(),this.y+65,75);SFX.tone(880,.09,'sine',.08,120);
        }
        if(p.age===60&&this.state==='z_blink')this.swing(false,true);
        if(p.age===66){const r=zeusRig(this);this.queuePattern(r.grip.x,r.grip.y,'cross',Math.atan2(p.targetY-r.grip.y,p.targetX-r.grip.x),16,p.side*.004);}
        if(p.age>=78)this.portal=null;
    }
    queuePattern(x,y,mode='petals',aim=Math.PI/2,warn=30,curve=0){
        return this.addHazard('petals',x,y,warn,14,{mode,aim,curve,dense:this.phase===2,speed:mode==='cross'?2.7:2.4,bulletLife:210});
    }
    addHazard(kind,x,y,warn,life,extra={}){
        const h={kind,x,y,warn,life,age:0,id:++this.serial,hit:false,...extra};this.hazards.push(h);return h;
    }
    burst(x,y,size=80,kind='blue'){this.fx.push({kind,x,y,size,age:0,life:26,seed:this.serial%7});if(this.fx.length>64)this.fx.shift();}
    hurt(box,key){
        if(this.hitKeys.has(key)||!checkAABB(box,dino))return false;
        this.hitKeys.add(key);
        if(dino.isShielding()){
            if(danteRoyalShield())danteGuardContact(1,this);
            else{const perfect=(dino.parryWindow>0||dino.meleeTimer>=(combatStance===2?38:23))&&perfectParryCd<=0&&!voidChanParry();
                parry(dino.y+20);if(perfect){dealDamage(this,parryDamage(this,true),'flat');perfectParryCd=30;parryGainUlt(true);shinGuardReset(true);this.breakCast();}}
        }else dino.takeDamage(1);
        return true;
    }
    breakCast(){
        this.clearAttack(true);const fall=this.airborne||this.y<this.baseY-1;this.state=fall?'z_fall':'z_exposed';this.subTimer=0;this.fromY=this.y;this.grounded=!fall;this.invulnAll=false;this.burst(this.cx(),this.y+50,95,'gold');
        this.groundCount=0;this.airCount=0;floatingTexts.push(new FloatingText(this.cx()-60,this.y-22,'PHÁ NIỆM!'));shakeTimer=Math.max(shakeTimer,8);
    }
    combatTick(){
        if(this.dying||this.hp<=0){this.clearAttack(true);return;}
        this.phase=this.hp<=this.maxHp/2?2:1;
        if(this.isCasting()&&this.castDamage>=12)this.breakCast();
    }
    swing(rise=false,thrust=false){
        this.slash={age:0,life:thrust?18:22,a0:thrust?-.12:rise?.65:-2.1,a1:thrust?.12:rise?-1.7:.7,kind:thrust?'thrust':'cut',hit:false};this.slash.previous=zeusRig(this);
        SFX.tone(440,.16,'sawtooth',.08,100);
    }
    tickSword(){
        const s=this.slash;if(!s)return;const old=s.previous;s.age++;const next=zeusRig(this);
        if(s.age%2)this.fx.push({kind:'slash',grip:{...next.grip},tip:{...next.tip},angle:Math.atan2(next.tip.y-next.grip.y,next.tip.x-next.grip.x),dir:this.dir(),age:0,life:14});
        if(!s.hit)for(let i=0;i<=8;i++){const u=i/8;if(sgSegmentBox(zeusMix(old.grip.x,next.grip.x,u),zeusMix(old.grip.y,next.grip.y,u),zeusMix(old.tip.x,next.tip.x,u),zeusMix(old.tip.y,next.tip.y,u),dino,9)!==null){s.hit=true;this.hurt({x:dino.x,y:dino.y,w:dino.w,h:dino.h},'sword:'+this.serial+':'+this.subTimer);break;}}
        s.previous=next;if(s.age>=s.life)this.slash=null;
    }
    tickHazards(){
        for(const h of [...this.hazards]){
            if(!this.hazards.includes(h))break; // A perfect guard can cancel the remaining ritual fields.
            h.age++;if(h.age<h.warn||h.age>=h.warn+h.life)continue;const t=h.age-h.warn;
            if(t===0){SFX.tone(h.kind==='tornado'?90:60,.2,'sawtooth',.1,30);shakeTimer=Math.max(shakeTimer,h.kind==='judgement'?17:6);if(['bolt','arrival','judgement','pulse'].includes(h.kind))this.burst(h.kind==='judgement'?this.cx():h.x,h.kind==='pulse'?h.y:316,h.kind==='judgement'?170:h.kind==='pulse'?105:80,h.kind==='judgement'?'gold':'blue');}
            if(t===0&&h.kind==='petals')for(const a of zeusPatternAngles(h))zeusSpark(this,h.x,h.y,a,h.speed,h.curve,h.bulletLife,h.dense?'#d5adff':'#9cecff');
            let boxes=[];
            if(h.kind==='bolt')boxes=[{x:h.x-h.radius,y:-190,w:h.radius*2,h:510}];
            if(h.kind==='arrival')boxes=[{x:h.x-h.radius,y:258,w:h.radius*2,h:62}];
            if(h.kind==='tornado'){
                h.x+=h.dir*.62;
                // Layered collision follows the tapered funnel; no hidden suction or permanent stun.
                boxes=[{x:h.x-24,y:266,w:48,h:54},{x:h.x-38,y:204,w:76,h:62},{x:h.x-52,y:126,w:104,h:78}];
            }
            if(h.kind==='judgement')boxes=[{x:0,y:-190,w:h.safeX-h.safeHalf,h:510},{x:h.safeX+h.safeHalf,y:-190,w:canvas.width-h.safeX-h.safeHalf,h:510}];
            if(h.kind==='bridge')boxes=[{x:h.x,y:h.y-9,w:h.toX-h.x,h:18}];
            if(h.kind==='pulse'&&!h.hit&&zeusPulseTouches(h,dino)){h.hit=true;this.hurt({x:dino.x,y:dino.y,w:dino.w,h:dino.h},'hazard:'+h.id);}
            if(h.kind==='ring'){
                h.radius=18+t*4;
                for(const side of [-1,1])boxes.push({x:h.x+side*h.radius-12,y:292,w:24,h:28});
            }
            if(!h.hit)for(const box of boxes)if(checkAABB(box,dino)){h.hit=true;this.hurt(box,'hazard:'+h.id);break;}
        }
        this.hazards=this.hazards.filter(h=>h.age<h.warn+h.life);
    }
    update(){
        this.combatTick();if(this.dying||this.hp<=0)return;
        this.subTimer++;const t=this.subTimer,st=this.state;
        this.tickPortal();
        this.fx=this.fx.filter(f=>++f.age<f.life).slice(-64);
        this.ghosts=this.ghosts.filter(g=>--g.life>0);this.tickSword();this.tickHazards();
        // A perfect guard may have cancelled the attack during hazard/sword evaluation.
        if(this.state!==st)return;
        if(st==='entering'){if(t>=60){this.invulnAll=false;this.idle(40);}return;}
        if(['z_ascend','z_descend','z_fall'].includes(st)){
            const duration=st==='z_fall'?40:60,u=zeusEase(t/duration);
            this.y=zeusMix(this.fromY,st==='z_fall'?this.baseY:this.toY,u);
            if(st!=='z_fall')this.x=zeusMix(this.fromX,this.toX,u);
            if(t>=duration){this.airborne=st==='z_ascend';this.grounded=!this.airborne;this.groundCount=this.airCount=0;if(st==='z_fall'){this.state='z_exposed';this.subTimer=0;}else this.idle(45);}return;
        }
        if(st==='z_exposed'){if(t>=90)this.idle(50);return;}
        if(['returning','returning_place','stunned','vulnerable'].includes(st)){this.breakCast();return;}
        if(st==='idle'){
            this.faceP();if(this.airborne)this.y=178-this.h+Math.sin(frames*.035)*4;
            else{this.y=this.baseY;const dx=dino.x+dino.w/2-this.cx();if(Math.abs(dx)>165)this.x=zeusClamp(this.x+Math.sign(dx)*1.3,8,canvas.width-this.w-8);}
            if(--this.actionTimer<=0)this.chooseAttack();return;
        }
        if(st==='z_blink'){
            if(t===80||t===160)this.planBlink(t/80);
        }else if(st==='z_spear'){
            if([36,74].includes(t)){this.lockX=dino.x+dino.w/2;this.lockY=dino.y+dino.h/2;this.faceP();}
            if([52,90].includes(t))zeusSpear(this);
            if([64,102].includes(t)){const r=zeusRig(this);this.queuePattern(r.grip.x,r.grip.y,'cross',Math.atan2(this.lockY-r.grip.y,this.lockX-r.grip.x),20);}
        }else if(st==='z_blade'){
            if(t>=37&&t<=56){const old=this.x;this.x+=zeusClamp(this.dashTo-this.x,-10,10);if(t%4===0)this.ghosts.push({x:old,y:this.y,facingLeft:this.facingLeft,life:13});}
            if(t===58)this.swing();if(t===98)this.swing(true);
        }else if(st==='z_smite'){
            if(t===92)this.addHazard('ring',this.cx(),320,0,65,{radius:18});
        }else if(st==='z_hunt'){
            if(t===104)this.planBlink(1);
            if(t===68)this.swing();if(t===172)this.swing(true);
            if(t===202){this.portal=null;this.addHazard('arrival',this.cx(),320,58,18,{radius:84});}
            if(t>=202&&t<=260){this.y=this.baseY-Math.sin((t-202)/58*Math.PI)*94;this.grounded=t===260;}
            if(t===244)this.swing();
            if(t===260){this.y=this.baseY;this.grounded=true;this.burst(this.cx(),315,150,'gold');shakeTimer=Math.max(shakeTimer,13);}
            if(t===264)this.addHazard('ring',this.cx(),320,20,55,{radius:18});
        }else if(st==='z_clap'){
            if(t===84){this.burst(this.cx()+this.dir()*28,this.y+this.h-84,130,'gold');shakeTimer=Math.max(shakeTimer,12);SFX.tone(65,.28,'sawtooth',.12,25);}
        }else if(st==='z_crown'){
            if([88,128,168].includes(t))this.queuePattern(this.cx(),this.y+50,'petals',Math.PI/2+((t-128)/40)*.22,32);
            for(const q of this.crown){
                if(t===q.fire-24){q.tx=dino.x+dino.w/2;q.ty=dino.y+dino.h/2;q.locked=true;}
                if(t===q.fire){q.sent=true;zeusSpear(this,q);this.burst(q.x,q.y,48);this.queuePattern(q.x,q.y,'cross',Math.atan2(q.ty-q.y,q.tx-q.x),18,(t%32?1:-1)*.006);}
            }
        }else if(st==='z_tempest'){
            if([124,154,184,214].includes(t))for(const h of this.hazards.filter(h=>h.kind==='tornado'))this.queuePattern(h.x,142,'cross',h.dir>0?.8:Math.PI-.8,28,h.dir*.007);
            if(t===160){const cols=this.hazards.filter(h=>h.kind==='tornado').sort((a,b)=>a.x-b.x);if(cols.length===2)this.addHazard('bridge',cols[0].x,126,42,24,{toX:cols[1].x});}
        }else if(st==='z_cataclysm'){
            if(t===178){this.addHazard('ring',this.cx(),320,38,80,{radius:18});this.burst(this.cx(),316,180,'gold');}
            if(t===178||t===226)this.queuePattern(this.cx(),this.y+50,'petals',Math.PI/2+(t===178?-.2:.2),30);
        }else if(st==='z_rain'){
            if([100,140,180,220].includes(t)){
                const group=[0,2,1,0][(t-100)/40],step=canvas.width/12;
                for(let lane=0;lane<12;lane++)if(lane%3===group)this.addHazard('bolt',(lane+.5)*step,0,45,18,{radius:20});
            }
            if(t===116||t===196)this.queuePattern(this.cx(),this.y+50,'petals',Math.PI/2+(t===116?.2:-.2),30);
        }
        if(t>=(ZEUS_MOVES[st]?.end||180))this.idle(this.airborne?48:52);
    }
    drawHazards(){
        for(const h of this.hazards){
            const live=h.age>=h.warn,u=h.warn?Math.min(1,h.age/h.warn):1,t=h.age-h.warn;
            ctx.save();ctx.strokeStyle=live?'#dbfbff':'#efc86e';ctx.lineWidth=2;
            if(h.kind==='petals'){zeusDrawPattern(h);
            }else if(h.kind==='judgement'){
                const L=h.safeX-h.safeHalf,R=h.safeX+h.safeHalf;
                ctx.fillStyle=live?'rgba(139,215,255,.34)':'rgba(224,164,71,.10)';ctx.fillRect(0,-190,L,510);ctx.fillRect(R,-190,canvas.width-R,510);
                ctx.fillStyle='rgba(42,170,202,.13)';ctx.fillRect(L,-190,R-L,510);
                ctx.strokeStyle='#83f8f3';ctx.setLineDash([7,6]);for(const x of [L,R]){ctx.beginPath();ctx.moveTo(x,-190);ctx.lineTo(x,320);ctx.stroke();}ctx.setLineDash([]);
                if(live){for(let x=24;x<canvas.width;x+=54)if(x<L||x>R)zeusLightning(x,-190,x+Math.sin(x)*13,319,Math.floor(frames/3)+x,4);}
                else{ctx.fillStyle='#a5fcf1';ctx.font='bold 12px Consolas';ctx.textAlign='center';ctx.fillText('VÙNG AN TOÀN',h.safeX,300);}
            }else if(h.kind==='pulse'){
                const R=live?8+t*8:h.radius;
                ctx.strokeStyle=live?'#d0faff':'#e7c77e';ctx.lineWidth=live?7:2;
                if(!live){ctx.setLineDash([6,7]);ctx.globalAlpha=.18+u*.45;}
                ctx.beginPath();ctx.arc(h.x,h.y,R,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
                if(live){ctx.lineWidth=2;ctx.beginPath();ctx.arc(h.x,h.y,Math.max(1,R-12),0,7);ctx.stroke();for(let i=0;i<10;i++){const a=i*Math.PI/5+frames*.04;zeusLightning(h.x+Math.cos(a)*(R-13),h.y+Math.sin(a)*(R-13),h.x+Math.cos(a)*R,h.y+Math.sin(a)*R,frames+i,2);}}
                else{ctx.globalAlpha=.7;zeusSigil(h.x,h.y,12+u*28,-frames*.025,.8);ctx.fillStyle='#f7d990';ctx.font='bold 11px Consolas';ctx.textAlign='center';ctx.fillText('BẠO LÔI',h.x,h.y-42);}
            }else if(h.kind==='bridge'){
                if(live){zeusLightning(h.x,h.y,h.toX,h.y,Math.floor(frames/3),5);zeusLightning(h.x,h.y-4,h.toX,h.y+4,Math.floor(frames/3)+6,2);}
                else{ctx.strokeStyle='rgba(244,204,126,.65)';ctx.setLineDash([5,8]);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(h.x,h.y);ctx.lineTo(h.toX,h.y);ctx.stroke();ctx.setLineDash([]);}
            }else if(h.kind==='tornado'){
                if(!live){ctx.setLineDash([4,5]);ctx.beginPath();ctx.ellipse(h.x,317,56,10,0,0,7);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=.2+u*.3;}
                const sway=Math.sin(frames*.09)*7;
                ctx.fillStyle=live?'rgba(159,190,229,.23)':'rgba(159,190,229,.10)';ctx.beginPath();ctx.moveTo(h.x-17,316);
                ctx.bezierCurveTo(h.x-24+sway,255,h.x-32-sway,174,h.x-58,126);ctx.quadraticCurveTo(h.x,107,h.x+58,126);
                ctx.bezierCurveTo(h.x+32-sway,174,h.x+24+sway,255,h.x+17,316);ctx.closePath();ctx.fill();
                for(let i=0;i<12;i++){
                    const v=i/11,y=314-v*188,R=18+v*40,spin=frames*.18+i*.9;
                    ctx.strokeStyle=i%3?'#afcbec':'#f0faff';ctx.lineWidth=live?3:1;
                    ctx.beginPath();ctx.ellipse(h.x+Math.sin(spin)*7,y,R,5+v*5,Math.sin(spin)*.08,0,Math.PI*1.7);ctx.stroke();
                    if(live&&i%3===0){ctx.fillStyle='#d6ddf0';ctx.fillRect(h.x+Math.cos(spin)*R-3,y+Math.sin(spin)*8,6,4);}
                }
                if(live){zeusLightning(h.x-5,145,h.x+6,313,Math.floor(frames/4),2);ctx.strokeStyle='rgba(211,233,255,.5)';ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(h.x,126,61,11,0,0,7);ctx.stroke();}
            }else if(h.kind==='ring'){
                if(!live){ctx.strokeStyle='#e7c77e';ctx.setLineDash([5,8]);ctx.beginPath();ctx.moveTo(0,303);ctx.lineTo(canvas.width,303);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#e7c77e';ctx.font='bold 11px Consolas';ctx.textAlign='center';ctx.fillText('NHẢY QUA SÓNG ĐIỆN',h.x,281);}
                else{ctx.strokeStyle='#a4ecff';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(h.x,316,h.radius,9,0,0,7);ctx.stroke();
                    for(const side of [-1,1]){zeusLightning(h.x+side*h.radius,316,h.x+side*h.radius,293,frames,3);ctx.fillStyle='rgba(169,230,255,.18)';ctx.fillRect(h.x+side*h.radius-12,292,24,28);}}
            }else{
                const R=h.radius||40;
                ctx.fillStyle=live?'rgba(155,230,255,.20)':'rgba(244,187,79,.15)';ctx.fillRect(h.x-R,h.kind==='arrival'?258:-190,R*2,h.kind==='arrival'?62:510);
                ctx.beginPath();ctx.ellipse(h.x,317,R,8,0,0,7);ctx.stroke();
                ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(h.x,317,R*u,8*u,0,-Math.PI/2,-Math.PI/2+Math.PI*2*u);ctx.stroke();
                if(live){ctx.globalAlpha=Math.max(.15,1-t/h.life);for(let i=-1;i<=1;i++)zeusLightning(h.x+i*R*.5,h.kind==='arrival'?257:-190,h.x+i*R*.3,318,Math.floor(frames/2)+i,3);ctx.beginPath();ctx.ellipse(h.x,317,R+8,10,0,0,7);ctx.stroke();}
                else if(h.kind==='arrival'){ctx.setLineDash([3,4]);ctx.beginPath();ctx.ellipse(h.x,247,24,64,0,0,7);ctx.stroke();ctx.setLineDash([]);}
            }
            ctx.restore();
        }
    }
    draw(){
        ctx.save();zeusStormFx(this);this.drawHazards();zeusDrawPortal(this);
        if(this.state==='z_blade'&&this.subTimer<37){ctx.strokeStyle='#f4d286';ctx.lineWidth=2;ctx.setLineDash([7,7]);ctx.beginPath();ctx.moveTo(this.cx(),304);ctx.lineTo(this.dashTo+this.w/2,304);ctx.stroke();ctx.setLineDash([]);}
        if(this.state==='z_spear'&&((this.subTimer>=36&&this.subTimer<52)||(this.subTimer>=74&&this.subTimer<90))){const r=zeusRig(this);ctx.strokeStyle='rgba(235,215,146,.55)';ctx.setLineDash([3,7]);ctx.beginPath();ctx.moveTo(r.grip.x,r.grip.y);ctx.lineTo(this.lockX,this.lockY);ctx.stroke();ctx.setLineDash([]);}
        ctx.fillStyle='rgba(19,24,44,.24)';ctx.beginPath();ctx.ellipse(this.cx(),320,this.airborne?46:33,7,0,0,7);ctx.fill();
        for(const g of this.ghosts){const ghost=Object.create(this);Object.assign(ghost,g,{state:'idle',slash:null,airborne:false});ctx.save();ctx.globalAlpha=g.life/22*.28;zeusBody(ghost,true);ctx.restore();}
        if(this.isCasting()){
            const u=this.subTimer/ZEUS_MOVES[this.state].cast,R=25+u*105;
            ctx.strokeStyle=this.phase===2?'#e3bbff':'#a9ebff';ctx.lineWidth=2;ctx.globalAlpha=.3+u*.3;
            for(let ring=0;ring<2;ring++){ctx.beginPath();ctx.ellipse(this.cx(),this.y-18,R+ring*23,13+ring*6,0,0,7);ctx.stroke();}
            for(let i=0;i<6;i++){const a=i*Math.PI/3+frames*.025;ctx.beginPath();ctx.moveTo(this.cx()+Math.cos(a)*(R-5),this.y-18+Math.sin(a)*13);ctx.lineTo(this.cx()+Math.cos(a)*(R+8),this.y-18+Math.sin(a)*16);ctx.stroke();}
            ctx.globalAlpha=1;if(this.subTimer%18<9)zeusLightning(this.cx(),this.y+12,this.cx()+Math.sin(frames)*26,this.y-50,Math.floor(frames/6),2);
        }
        zeusBody(this);
        if(this.state==='z_clap'&&this.subTimer<84){const u=this.subTimer/84,r=zeusRig(this);ctx.save();ctx.globalAlpha=.4+u*.5;zeusLightning(r.grip.x,r.grip.y,this.cx()+this.dir()*r.off.x,this.y+this.h+r.off.y,frames,3);zeusSigil(this.cx()+this.dir()*28,this.y+this.h-84,8+u*23,frames*.08,.8);ctx.restore();}
        if(this.slash){const r=zeusRig(this);zeusLightning(r.grip.x,r.grip.y,r.tip.x,r.tip.y,frames,4);}
        zeusDrawBursts(this);
        ctx.restore();
        const m=ZEUS_MOVES[this.state],casting=this.isCasting(),label=this.airborne?'THIÊN KHÔNG · NGHI LỄ BÃO':'HẠ GIỚI · LÔI KIẾM';
        drawTopBossBar(this,this.phase===2?'#d0b1ff':'#e9cc80','ZEUS · '+label);
        ctx.save();const d=typeof DPR==='number'?DPR:1;ctx.setTransform(d,0,0,d,0,0);ctx.textAlign='center';ctx.font='bold 11px Consolas';ctx.fillStyle='#e8e4d9';
        if(casting){ctx.fillStyle='#182334';ctx.fillRect(canvas.width/2-170,47,340,7);ctx.fillStyle='#91e5ff';ctx.fillRect(canvas.width/2-170,47,340*this.subTimer/m.cast,7);ctx.fillStyle='#d9f5ff';ctx.fillText('NIỆM CHÚ · GÂY 12 SÁT THƯƠNG ĐỂ NGẮT',canvas.width/2,68);}
        ctx.fillText(this.state==='z_cataclysm'&&this.subTimer>=178?'DƯ CHẤN THẦN PHẠT · NHẢY QUA SÓNG ĐIỆN':m?.name||({z_ascend:'ĐĂNG THIÊN',z_descend:'HẠ PHÀM',z_fall:'PHÁ NIỆM · RƠI XUỐNG',z_exposed:'SƠ HỞ · PHẢN CÔNG!'}[this.state]||'OLYMPUS · ĐỀN TRÊN MÂY'),canvas.width/2,casting?84:54);ctx.restore();
    }
}
// BOSS_PART_END s1.ZeusBoss.1

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
