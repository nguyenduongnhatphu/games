// PLAYER_FILE: DinoRender
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Player, bzVeChanNgoi, bzVeGiap, bzVeGiapMay, ctx, currentAmmoType, deathCineActive, deathSkel, frames, keys, kinhPal, previewDino, veBzGiapThan, veKinhManh, vePhuKien, vePhuKienThan, veTenLuaNeuCo, vkMoc, xuongVeLoiAt
// index.html:106009 · Phạm vi: global
// PLAYER_PART_BEGIN s10.trialPose.1 EDITABLE
function trialPose(n,form,crouch,airborne){
 const preview=typeof previewDino!=='undefined'&&n===previewDino;
 const facing=n.isFacingLeft?-1:1;
 let a=n._trialMotion;
 if(!a||a.form!==form||frames<a.frame||frames-a.frame>20){
  a=n._trialMotion={form,frame:frames-1,x:n.x,y:n.y,face:facing,vx:0,vy:0,phase:0,run:0,crouch:crouch?1:0,air:airborne?1:0,wasAir:airborne,land:0,landV:0,jaw:0,lean:0,turn:0,
   tail:Array.from({length:7},(_,i)=>({a:-.15-i*.025,v:0}))};
 }
 if(a.frame===frames)return a;
 const dt=Math.min(3,Math.max(1,frames-a.frame));
 const vx=Math.max(-24,Math.min(24,((n.x||0)-(a.x||0))/dt));
 const vy=Math.max(-20,Math.min(20,n.dy||0));
 const moving=preview||Math.abs(vx)>.25||(n.id===1&&(keys.KeyA||keys.KeyD||keys.ArrowLeft||keys.ArrowRight));
 const blend=(old,target,k)=>old+(target-old)*(1-Math.pow(1-k,dt));
 a.run=blend(a.run,moving&&!airborne&&!crouch?1:0,.16);
 a.crouch=blend(a.crouch,crouch?1:0,.2);a.air=blend(a.air,airborne?1:0,.18);
 a.phase+=dt*(form===1?.30:.23)*(preview?1:Math.min(1.8,.45+Math.abs(vx)*.15));
 if(a.wasAir&&!airborne)a.landV+=Math.min(.2,.06+Math.abs(a.vy)*.009);
 a.landV+=(-a.land*.18-a.landV*.42)*dt;a.land+=a.landV*dt;
 a.land=Math.max(-.08,Math.min(.24,a.land));
 if(facing!==a.face)a.turn=.9;
 a.turn*=Math.pow(.78,dt);
 a.lean=blend(a.lean,Math.max(-.12,Math.min(.12,vx*facing*.013))*(1-a.crouch)* (1-a.air*.5),.13);
 a.jaw=blend(a.jaw,Math.min(1,(n.chargeProgress||0)*.8+(n.attackCooldown>0?.45:0)),.24);
 const impulse=Math.max(-1,Math.min(1,(vx-a.vx)*facing*.09+(vy-a.vy)*.045));
 // Each segment follows its own rest angle plus the previous segment's lag.
 for(let i=0;i<a.tail.length;i++){
  const t=a.tail[i],lag=i?a.tail[i-1].a+.18:0;
  const target=-.15-i*.025+Math.sin(a.phase*.55-i*.55)*(.025+a.run*.04)+lag*.5+vy*.007+a.turn*.2+a.land*.7;
  t.v+=((target-t.a)*(.15-i*.012)-t.v*.32+impulse*(.012+i*.006))*dt;
  t.v=Math.max(-.12,Math.min(.12,t.v));t.a=Math.max(-.8,Math.min(.55,t.a+t.v*dt));
 }
 a.frame=frames;a.x=n.x;a.y=n.y;a.face=facing;a.vx=vx;a.vy=vy;a.wasAir=airborne;
 return a;
}
// PLAYER_PART_END s10.trialPose.1

// index.html:106045 · Phạm vi: global
// PLAYER_PART_BEGIN s10.trialOriginalBody.1 EDITABLE
const trialOriginalBody=Player.prototype.drawDinoBody;
// PLAYER_PART_END s10.trialOriginalBody.1

// index.html:106046 · Phạm vi: global
// PLAYER_PART_BEGIN s10.Player.prototype.drawDinoBody.1 EDITABLE
Player.prototype.drawDinoBody=function(bx,by,form,crouch,airborne,palOverride){
 if(form===7||form===8||form<0||form>8)return trialOriginalBody.apply(this,arguments);
 if(form===6&&deathSkel&&deathCineActive&&this.id===1)return trialOriginalBody.apply(this,arguments);
 if(form===4||form===6)return trialConstructBody(this,bx,by,form,crouch,airborne,palOverride);
 const rush=form===1||form===2||form===3;
 const themed=form===2?{bd:'#27272c',hd:'#4b4247',dk:'#11151d',lt:'#b64649',foot:'#171920',spk:'#ff4654',out:'#090e17',rim:'#ff9a87',eye:'#fff0cd',pup:'#d62343'}:form===3?{bd:'#302343',hd:'#513766',dk:'#141c30',lt:'#aa77c6',foot:'#1b1a2d',spk:'#e479ff',out:'#10182b',rim:'#e8baff',eye:'#fdf0ff',pup:'#a543ed'}:form===5?kinhPal(this):null;
 const P=palOverride||themed|| (rush?{bd:'#344d5b',hd:'#537181',dk:'#172c3a',lt:'#a2bbc4',foot:'#142531',spk:'#36d7fb',out:'#0c1c28',rim:'#a0edff',eye:'#d6fbff',pup:'#087eb2'}:{bd:'#a63f2b',hd:'#ca6040',dk:'#652c23',lt:'#f0bd7d',foot:'#582a24',spk:'#8f382c',out:'#382321',rim:'#f9cd95',eye:'#ffe6a1',pup:'#30221d'});
 const preview=typeof previewDino!=='undefined'&&this===previewDino;
 const motion=trialPose(this,form,crouch,airborne),run=motion.run,phase=motion.phase,breath=Math.sin(frames*.065)*.45;
 const bob=Math.cos(phase*2)*.65*run+breath*(1-run)+motion.land*5,cs=motion.crouch;
 const jaw=motion.jaw;
 const paint=(path,fill,stroke=P.out,width=1.05)=>{const p=new Path2D(path);ctx.fillStyle=fill;ctx.fill(p);if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke(p);}};
 const grad=(y0,y1,a,b)=>{let g=ctx.createLinearGradient(0,y0,0,y1);g.addColorStop(0,a);g.addColorStop(1,b);return g;};
 const line=(path,color,width=1)=>{ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke(new Path2D(path));};
 const poly=(pts,fill,stroke=P.out)=>paint('M'+pts.map(p=>p.join(',')).join(' L')+' Z',fill,stroke,.7);
 const ellipse=(x,y,rx,ry,fill)=>{ctx.fillStyle=fill;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill();};
 ctx.save();ctx.translate(bx,by);ctx.lineJoin='round';ctx.lineCap='round';
 // Far limb is darker and trails the near limb by half a cycle.
 const leg=(near)=>{let wave=Math.sin(phase+(near?0:Math.PI))*run+(near?.1:-.25)*(1-run);
 let hip={x:near?17:24,y:26+cs*7},knee={x:hip.x+5+wave*3,y:33+cs*3},ankle={x:hip.x-2-wave*6,y:40-Math.max(0,-wave)*6},toe={x:ankle.x+8,y:44-Math.max(0,-wave)*6};
 const mixPoint=(p,q,t)=>({x:p.x+(q.x-p.x)*t,y:p.y+(q.y-p.y)*t});
 knee=mixPoint(knee,{x:hip.x+8,y:31},motion.air);ankle=mixPoint(ankle,{x:hip.x+4,y:36},motion.air);toe=mixPoint(toe,{x:hip.x+12,y:38},motion.air);
 knee=mixPoint(knee,{x:hip.x+9,y:38},cs);ankle=mixPoint(ankle,{x:hip.x+2,y:42},cs);toe=mixPoint(toe,{x:hip.x+11,y:44},cs);
 hip.y+=bob*.5;knee.y+=motion.land*2;

 const fill=near?grad(25,42,P.bd,P.dk):P.dk;
 paint(`M${hip.x-5},${hip.y-3} Q${hip.x+6},${hip.y-5} ${knee.x+3},${knee.y} L${ankle.x+2},${ankle.y} L${ankle.x-2},${ankle.y+1} L${knee.x-3},${knee.y} Q${hip.x-7},${hip.y+5} ${hip.x-5},${hip.y-3}Z`,fill);
 ellipse(hip.x,hip.y+1,4.6,5.7,near?P.bd:P.dk);
 line(`M${hip.x-2},${hip.y-1} Q${hip.x+5},${hip.y} ${knee.x},${knee.y-1}`,near?P.hd:P.bd,1.3);
 paint(`M${ankle.x-2},${ankle.y-1} L${ankle.x+3},${ankle.y-1} L${toe.x},${toe.y-2} L${toe.x+2},${toe.y} L${ankle.x-3},${toe.y}Z`,P.foot);
 for(let k=0;k<3;k++)poly([[toe.x-1-k*3,toe.y-2],[toe.x+2-k*3,toe.y],[toe.x-1-k*3,toe.y+.2]],near?P.lt:P.hd);
 if(near&&this.id===1&&typeof bzVeChanNgoi==='function'&&crouch)bzVeChanNgoi(hip.x,0);
 };
 leg(false);
 ctx.save();ctx.translate(0,bob); // Continuous spine / tail movement, while the muzzle keeps its original anchor.
 const nodes=[{x:9,y:24+cs*8,r:rush?8:6.5}];
 for(let i=0;i<motion.tail.length;i++){const prev=nodes[nodes.length-1],t=motion.tail[i],len=(i<3?6.8:5.8)*(form===3?1.12:1);nodes.push({x:prev.x-Math.cos(t.a)*len,y:prev.y+Math.sin(t.a)*len,r:(rush?7:5.8)*Math.pow(1-(i+1)/8,1.2)});}
 const top=[],bottom=[];
 for(let i=0;i<nodes.length;i++){let n=nodes[i],before=nodes[Math.max(0,i-1)],after=nodes[Math.min(nodes.length-1,i+1)],dx=after.x-before.x,dy=after.y-before.y,l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l;top.push([n.x+nx*n.r,n.y+ny*n.r]);bottom.push([n.x-nx*n.r,n.y-ny*n.r]);}
 const smoothPath=pts=>{let d=`M${pts[0][0]},${pts[0][1]}`;for(let i=1;i<pts.length-1;i++)d+=` Q${pts[i][0]},${pts[i][1]} ${(pts[i][0]+pts[i+1][0])/2},${(pts[i][1]+pts[i+1][1])/2}`;return d+` L${pts[pts.length-1][0]},${pts[pts.length-1][1]}`;};
 paint(smoothPath(top)+' L'+bottom.slice().reverse().map(p=>p.join(',')).join(' L')+'Z',grad(12,34,P.bd,P.dk));
 line(smoothPath(top),P.hd,1.1);
 const stripe=nodes.map(n=>[n.x,n.y+n.r*.48]);line(smoothPath(stripe),P.lt,rush?1.6:1.2);
 if(form===2||form===3){for(let i=2;i<nodes.length-1;i+=2){const n=nodes[i];poly([[n.x-2,n.y-n.r],[n.x-3,n.y-n.r-(form===3?5:3)],[n.x+2,n.y-n.r]],P.spk);}}
 // Ribcage and shoulder form one muscular silhouette.
 ctx.translate(17,25+cs*10);ctx.rotate(motion.lean);ctx.translate(-17,-25);
 paint(rush?'M4,18 Q7,7 22,10 Q32,7 36,16 Q40,27 32,33 Q20,39 7,31 Q1,25 4,18Z':'M5,18 Q10,10 23,12 Q31,10 35,16 Q40,24 32,31 Q20,37 9,30 Q3,25 5,18Z',grad(11,34,P.hd,P.dk));
 paint('M11,27 Q23,30 34,23 Q34,32 24,33 Q15,35 11,30Z',grad(23,35,P.lt,P.bd),null);
 for(let k=0;k<4;k++)line(`M${14+k*4},29 Q${15+k*4},32 ${17+k*4},33`,P.dk,.55);
 ellipse(24,21,6.4,7.4,P.bd);
 line('M8,18 Q16,11 28,15',P.rim,.85);
 // Rush's swept cyan dorsal fins; Normal keeps subtle organic ridges.
 for(let i=0;i<(form===5?Math.min(4,P.crest):4);i++){
  let x=(rush?1:5)+i*(rush?8.5:6.3),y=(rush?14:16)-Math.sin(i*.65)*2,h=rush?[6,10,11,7][i]*(form===3?1.2:form===2?1.05:1):form===5?6:2.5;
  if(rush||form===5){
   poly([[x-2.2,y+2],[x-3.5,y-h*.35],[x-1.6,y-h*.4],[x-2.5,y-h*.72],[x-.8,y-h*.62],[x,y-h],[x+1,y-h*.62],[x+2.6,y-h*.72],[x+1.8,y-h*.4],[x+3.4,y-h*.35],[x+2.2,y+2]],grad(y-h,y,P.rim,P.spk));
   line(`M${x},${y-h+2} L${x+.3},${y}`,P.hd,.75);
  }else poly([[x-1.8,y+2],[x-2.4,y-h],[x+.6,y-1],[x+1.8,y+2]],P.dk);
 }

 if(rush){for(let k=0;k<3;k++){poly([[9+k*6,18],[14+k*6,17],[16+k*6,22],[12+k*6,25],[8+k*6,22]],grad(17,26,P.hd,P.dk));line(`M${10+k*6},19 L${13+k*6},21`,P.spk,.9);}}
 else{for(let k=0;k<5;k++)ellipse(9+k*4,20+(k%2)*2,.9,.65,P.dk);}
 ctx.restore();
 if(this.id===1&&typeof vePhuKienThan==='function')vePhuKienThan(0,0,cs,bob);
 if(this.id===1&&typeof veBzGiapThan==='function')veBzGiapThan(0,0,cs,bob,false);
 leg(true);
 // Bent forearm, with a small opposing movement against the gait.
 let arm=Math.sin(phase-.5)*1.8*run+motion.air*1.8;
 paint(`M28,${18+cs*9} Q32,${18+cs*9} 31,${23+cs*8} L${34+arm},${27+cs*8} L${38+arm},${27+cs*8} L${38+arm},${29+cs*8} L${32+arm},${30+cs*8} L27,${24+cs*8}Z`,grad(18,32,P.hd,P.dk));
 for(let i=0;i<2;i++)poly([[37+arm,27+cs*8+i*2],[42+arm-i,30+cs*8+i*2],[37+arm,30+cs*8+i*2]],P.lt);
 line(`M30,${20+cs*9} L${33+arm},${27+cs*8}`,P.rim,.7);
 // Thick neck, angular brow and articulated jaw. Nose remains at x=53.
 ctx.save();ctx.translate(0,cs*12+bob*.3);
 paint(rush?'M23,19 Q25,9 30,5 L41,6 Q42,18 35,27 L27,27Z':'M27,18 Q31,12 32,7 L40,8 Q39,18 34,25 L29,25Z',grad(6,27,P.hd,P.dk));
 paint('M32,14 L48,14 L52,13 L51,17 Q43,22 34,19Z',P.dk);
 ctx.save();ctx.translate(34,15);ctx.rotate(jaw*.16);
 paint('M0,0 L17,-1 L18,2 Q8,8 1,4Z',grad(0,6,P.hd,P.dk));
 line('M3,4 Q10,7 16,2',P.lt,1.1);ctx.restore();
 paint(rush?'M28,5 Q29,0 38,1 L43,4 L51,5 Q55,7 53,13 L45,16 L31,14Z':'M30,6 Q33,1 40,2 L45,4 L52,5 Q55,8 53,13 L45,15 L33,13Z',grad(1,16,P.hd,P.bd));
 paint('M31,6 L36,4 L44,6 L41,10 L33,10Z',P.dk,null);
 poly([[35,6],[42,7],[38,10],[35,9]],P.eye,null);
 line('M38,7 L38,9',P.pup,1.1);ellipse(37,7,.55,.55,'#fff');
 line('M32,5 L36,3.8 L43,5.8',P.rim,1.1);
 line('M43,12 Q49,14 53,11',P.out,1.1);
 for(let i=0;i<3;i++)poly([[42+i*3,14],[44+i*3,14],[43+i*3,16+jaw]],'#fff3d7',null);
 ellipse(51,8,1.05,.7,P.out);line('M45,5.6 L51,6.7',P.rim,.8);
 if(rush){line('M29,5 Q34,2 41,5',P.hd,2);line('M26,16 L30,20 M27,20 L31,24',P.dk,1.1);}
 if(form===2||form===3){poly([[30,5],[27,form===3?-7:-4],[35,3]],P.spk);line('M29,13 L32,16 L30,19',P.spk,1.1);}
 ctx.restore();
 if(form===5&&this.id===1)veKinhManh(0,0,cs,bob,this.kinhLop===undefined?2:this.kinhLop);
 if(this.id===1&&typeof bzVeGiap==='function')bzVeGiap(0,0,cs,bob,false);
 if(this.id===1&&typeof vePhuKien==='function')vePhuKien(0,cs*12+bob,cs,airborne);
 const ammo=this.id===1?currentAmmoType:this.ammoType;const hook=vkMoc(ammo,'veTrenNguoi');if(hook)hook.call(this,0,cs*12+bob,P);
 if(this.id===1&&typeof veTenLuaNeuCo==='function')veTenLuaNeuCo(0,0,cs,bob,form);
 ctx.restore();
};
// PLAYER_PART_END s10.Player.prototype.drawDinoBody.1

// index.html:106143 · Phạm vi: global
// PLAYER_PART_BEGIN s10.trialConstructBody.1 EDITABLE
function trialConstructBody(n,bx,by,form,crouch,airborne,pal){
 const bone=form===6,m=trialPose(n,form,crouch,airborne),cs=m.crouch,dy=cs*9,bob=Math.sin(frames*.065)*.35+m.land*4;
 const P=pal|| (bone?{bd:'#dccca8',hd:'#fff0ca',dk:'#867867',lt:'#fff8e3',out:'#302b2a',rim:'#fff3cc',eye:'#f55b57',foot:'#b5a382'}:{bd:'#506d7b',hd:'#a5c2cd',dk:'#243b4b',lt:'#d5e9eb',out:'#101f2c',rim:'#93e9f3',eye:'#5df4f5',foot:'#253c4b'});
 const path=(d,c,w=1)=>{const q=new Path2D(d);ctx.fillStyle=c;ctx.fill(q);ctx.strokeStyle=P.out;ctx.lineWidth=w;ctx.stroke(q);};
 const line=(d,c,w)=>{ctx.strokeStyle=c;ctx.lineWidth=w;ctx.stroke(new Path2D(d));};
 const oval=(x,y,rx,ry,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,6.2832);ctx.fill();};
 const metal=ctx.createLinearGradient(0,8,0,35);metal.addColorStop(0,P.hd);metal.addColorStop(.45,P.bd);metal.addColorStop(1,P.dk);
 const beam=(x,y,xx,yy,w,c)=>{line(`M${x},${y} L${xx},${yy}`,P.out,w+1.7);line(`M${x},${y} L${xx},${yy}`,c,w);line(`M${x},${y-.6} L${xx},${yy-.6}`,P.lt,.6);};
 const limb=(near)=>{
 const wave=Math.sin(m.phase+(near?0:Math.PI))*m.run,hip=near?16:26;
 const ky=33+cs*4-m.air*3,kx=hip+5+wave*3,ax=hip-1-wave*5+m.air*7,ay=42-Math.max(0,-wave)*5-m.air*5;
 if(bone){beam(hip,26+dy,kx,ky,3,near?P.bd:P.dk);beam(kx,ky,ax,ay,2.2,near?P.bd:P.dk);oval(kx,ky,2.4,2.2,P.hd);beam(ax-2,ay,ax+8,ay+1,2.7,P.bd);for(let j=0;j<3;j++)line(`M${ax+4-j*2},${ay} L${ax+8-j*2},${ay+2}`,P.lt,1);}
 else{
 path(`M${hip-5},${23+dy} L${hip+5},${23+dy} L${kx+4},${ky} L${kx-4},${ky+1}Z`,near?metal:P.dk);
 beam(kx,ky,ax,ay-3,3.8,P.hd);oval(kx,ky,3.1,3.1,P.out);oval(kx,ky,1.5,1.5,P.eye);
 path(`M${ax-4},${ay-4} L${ax+4},${ay-4} L${ax+9},${ay} L${ax+9},${ay+3} L${ax-5},${ay+3}Z`,near?metal:P.dk);
 line(`M${ax-3},${ay-1} L${ax+4},${ay-1}`,'#f5b958',1);
 if(airborne&&((n.dy||0)<1.2||(n.mayBay||0)>0)){const h=7+Math.sin(frames*.8)*3;path(`M${ax-2},${ay+3} Q${ax-4},${ay+8} ${ax},${ay+h+5} Q${ax+4},${ay+8} ${ax+2},${ay+3}Z`,'#f59c41',.4);line(`M${ax},${ay+3} L${ax},${ay+h}`,'#fff3ad',1.5);}}
 };
 ctx.save();ctx.translate(bx,by);ctx.lineJoin='round';ctx.lineCap='round';limb(false);
 // Articulated tail: separate vertebrae or armored links follow the same spring chain.
 let tx=8,ty=24+dy+bob;
 for(let i=0;i<7;i++){const t=m.tail[i],xx=tx-Math.cos(t.a)*5.8,yy=ty+Math.sin(t.a)*5.8,r=bone?Math.max(.8,3-i*.32):Math.max(1.2,4-i*.43);
 if(bone){beam(tx,ty,xx,yy,r,P.bd);oval(xx,yy,r*.8,r*.95,P.hd);if(i<4)beam(xx,yy,xx-1,yy-r-2,1.1,P.bd);}
 else{ctx.save();ctx.translate((tx+xx)/2,(ty+yy)/2);ctx.rotate(-t.a);path(`M-3,${-r} L2,${-r} L3,${-r+1} L3,${r} L-3,${r}Z`,metal,.8);line('M-1,-1 L1,-1',P.eye,1);ctx.restore();}tx=xx;ty=yy;}
 ctx.save();ctx.translate(17,24+dy+bob);ctx.rotate(m.lean);ctx.translate(-17,-24);
 if(bone){
 beam(6,17,29,13,3.6,P.bd);beam(10,30,28,29,2.2,P.dk);
 for(let i=0;i<5;i++){const x=9+i*4.3;line(`M${x},16 Q${x+9},${23+i*.3} ${x+1},31`,P.out,3.6);line(`M${x},16 Q${x+9},${23+i*.3} ${x+1},31`,P.bd,2.1);line(`M${x+1},17 Q${x+7},22 ${x+5},26`,P.lt,.65);}
 xuongVeLoiAt(21,23,.8+.12*Math.sin(frames*.09));
 }else{
 path('M5,16 L12,11 L30,11 L38,18 L36,32 L12,34 L5,28Z',metal,1.3);
 path('M12,14 L22,13 L25,23 L15,29 L9,25Z',P.dk);
 oval(21,22,5.6,5.6,P.out);oval(21,22,3.8,3.8,P.eye);oval(20,21,1.8,1.8,P.lt);
 for(let i=0;i<3;i++){line(`M${27+i*2},16 L${28+i*2},23`,P.dk,1.1);}
 line('M8,16 L13,13 L28,13',P.lt,.8);line('M11,30 L28,29','#f5b958',1.1);
 for(const [x,y]of [[8,20],[12,28],[33,27]])oval(x,y,.9,.9,P.out);
 path('M10,11 L10,4 L17,4 L19,11Z',P.dk);line('M12,6 L15,6',P.eye,1.2);
 }
 ctx.restore();
 if(n.id===1&&typeof vePhuKienThan==='function')vePhuKienThan(0,0,cs,bob);
 limb(true);
 // Forearms keep the original accessory and weapon attachment area clear.
 beam(29,19+dy,31,26+dy, bone?2:3.7,P.bd);beam(31,26+dy,38,28+dy,bone?1.6:2.6,P.hd);
 for(let i=0;i<2;i++)beam(38,28+dy+i*2,42-i,30+dy+i*2,1,P.lt);
 ctx.save();ctx.translate(0,cs*12+bob*.3);
 if(bone){
 for(let i=0;i<4;i++){const x=29+i*1.3,y=20-i*3;beam(x-2,y,x+3,y-1,2.8,P.bd);}
 path('M31,4 Q35,0 42,3 L51,5 L54,10 L52,14 L34,13 L30,9Z',metal);
 path('M33,6 Q37,3 40,7 L38,11 L34,10Z',P.out,.5);oval(36,8,1.1,1.4,P.eye);
 path('M47,7 L51,8 L50,11 L47,10Z',P.dk,.5);
 ctx.save();ctx.translate(34,14);ctx.rotate(m.jaw*.18);path('M0,0 L18,-1 L17,4 L4,6 L0,3Z',P.bd,.8);ctx.restore();
 for(let i=0;i<5;i++)path(`M${37+i*3},12 L${39+i*3},12 L${38+i*3},16Z`,P.lt,.4);
 }else{
 beam(31,20,35,8,7,P.dk);line('M32,17 L36,8',P.eye,1.2);
 path('M29,4 L34,0 L45,2 L53,5 L55,11 L51,15 L33,14 L29,10Z',metal,1.2);
 path('M32,5 L43,6 L41,10 L33,10Z',P.out);line('M34,7 L41,7',P.eye,1.8);
 line('M45,6 L51,7',P.lt,.8);oval(51,10,1.3,1.3,P.dk);
 ctx.save();ctx.translate(34,15);ctx.rotate(m.jaw*.16);path('M0,0 L18,-1 L17,5 L3,5Z',P.dk,.9);line('M4,3 L15,3','#f5b958',1);ctx.restore();
 }
 ctx.restore();
 if(n.id===1){if(bone){if(typeof veBzGiapThan==='function')veBzGiapThan(0,0,cs,bob,false);if(typeof bzVeGiap==='function')bzVeGiap(0,0,cs,bob,false);}else if(typeof bzVeGiapMay==='function')bzVeGiapMay(0,0,cs,bob,crouch,airborne);if(typeof vePhuKien==='function')vePhuKien(0,cs*12+bob,cs,airborne);}
 const ammo=n.id===1?currentAmmoType:n.ammoType,hook=vkMoc(ammo,'veTrenNguoi');if(hook)hook.call(n,0,cs*12+bob,P);
 if(n.id===1&&typeof veTenLuaNeuCo==='function')veTenLuaNeuCo(0,0,cs,bob,form);
 ctx.restore();
}
// PLAYER_PART_END s10.trialConstructBody.1
