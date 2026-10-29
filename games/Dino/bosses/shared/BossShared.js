// BOSS_FILE: BossShared
// BOSS_SNAPSHOT: beba2bbb918dbf33475490c993ed1556c7f85c4568f316c2be580c4161e1acfd
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: (xem các Boss và API trong README.md)
// Nguồn: index.html:206 · Dùng bởi: DragonLordBoss, EmberWolfBoss, FlameCoreBoss, FlameLancerBoss, GreatApeBoss, MagmorBoss, QuetzalBoss
// BOSS_PART_BEGIN s0.GWAVE_H.1 EDITABLE
const GWAVE_H = 96, GWAVE_SPD = 11.5;
// BOSS_PART_END s0.GWAVE_H.1

// Nguồn: index.html:216 · Dùng bởi: GodzillaBoss, PteroBoss, QuetzalBoss, ScarabLordBoss, SpinoBoss, TriceratopsBoss
// BOSS_PART_BEGIN s0.desertBossPoly.1 EDITABLE
function desertBossPoly(points,fill,edge='#20242a',width=2){
            ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);
            for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);
            ctx.closePath();ctx.fillStyle=fill;ctx.fill();
            if(edge){ctx.strokeStyle=edge;ctx.lineWidth=width;ctx.stroke();}
        }
// BOSS_PART_END s0.desertBossPoly.1

// Nguồn: index.html:222 · Dùng bởi: GodzillaBoss, PteroBoss, QuetzalBoss, ScarabLordBoss, SpinoBoss, TriceratopsBoss
// BOSS_PART_BEGIN s0.desertBossLine.1 EDITABLE
function desertBossLine(points,color,width=1.5){
            ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);
            for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);
            ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();
        }
// BOSS_PART_END s0.desertBossLine.1

// Nguồn: index.html:227 · Dùng bởi: PteroBoss, QuetzalBoss
// BOSS_PART_BEGIN s0.drawDesertPterosaur.1 EDITABLE
function drawDesertPterosaur(b,quetzal=false){
            const q=quetzal,dir=q?(b.state==='q_talon_go'?(b.talonDir||-1):-1):(b.oDir||-1);
            const dive=/swoop|q_dive|q_talon_go/.test(b.state),charge=/laser|q_slash|q_flurry/.test(b.state);
            const flap=dive?-.55:Math.sin(frames*(q?.105:.15)),bob=dive||charge?0:-flap*2;
            const P=q?{edge:'#251c1b',body:'#6b5141',lit:'#a28260',mem:'#a95535',shade:'#653629',rib:'#d8a664',crest:'#bc763c',beak:'#d8c19a'}:{edge:'#19242c',body:'#415e68',lit:'#79949b',mem:'#87594e',shade:'#553c3b',rib:'#b88d71',crest:'#b66a4b',beak:'#c1b399'};
            const poly=(p,c,e=true)=>desertBossPoly(p,c,e?P.edge:null,1.8);
            ctx.save();ctx.translate(b.x+(dir>0?b.w:0),b.y);ctx.scale((dir>0?-1:1)*b.w/120,b.h/80);ctx.translate(0,bob);
            const wing=(back)=>{
                ctx.save();ctx.translate(q?58:52,38);ctx.rotate(flap*(back?.36:.53)+(back?-.12:.08));ctx.scale(back?.82:1,back?.8:1);
                const tip=q?106:92,top=q?-57:-51;
                poly([[0,0],[21,-19],[44,-44],[tip,top],[tip-25,-25],[55,-2],[35,9],[15,17],[3,15]],back?P.shade:P.mem);
                poly([[4,1],[23,-14],[45,-38],[tip-7,top+3],[50,-15],[27,7],[10,12]],back?P.mem:P.shade,false);
                poly([[0,-3],[18,-20],[41,-44],[47,-43],[24,-14],[6,4]],back?P.body:P.lit);
                // The elongated fourth finger supports a single membrane; the
                // other three fingers stay short at the wrist.
                desertBossLine([[0,0],[22,-18],[44,-43],[tip,top]],P.rib,2.5);
                for(const [x,y] of [[tip-25,-25],[55,-2],[35,9],[15,17]])desertBossLine([[44,-42],[x,y]],P.rib,1.1);
                for(let i=0;i<3;i++)poly([[40+i*3,-41],[42+i*3,-48],[44+i*3,-42]],P.beak,false);
                poly([[47,-35],[58,-39],[53,-23]],P.mem,false);
                ctx.restore();
            };
            wing(true);
            // Keeled chest and folded hind limbs, with weight at the shoulder.
            poly([[26,35],[42,28],[67,28],[87,35],[94,42],[86,51],[64,56],[40,51],[25,43]],P.body);
            poly([[34,40],[50,36],[76,37],[88,42],[77,49],[53,51],[37,46]],P.lit,false);
            poly([[84,37],[105,40],[111,36],[108,45],[92,48]],P.body);
            for(let i=0;i<2;i++){
                const x=65+i*17,dy=dive?12:0;
                poly([[x,48],[x+7,48],[x+4,56+dy],[x-4,60+dy],[x-8,57+dy],[x-2,53]],i?P.body:P.shade);
                for(let j=0;j<3;j++)poly([[x-7+j*3,56+dy],[x-10+j*3,64+dy],[x-5+j*3,60+dy]],P.beak,false);
            }
            if(q){
                // Quetzal has a long, stiff neck and a broad spear-shaped bill.
                poly([[40,41],[31,41],[23,28],[14,22],[9,12],[16,9],[23,17],[29,20],[37,32],[45,35]],P.body);
                poly([[34,37],[27,24],[17,19],[13,13],[17,12],[24,20],[31,23],[39,35]],P.lit,false);
                ctx.save();ctx.translate(0,20);
                poly([[3,9],[7,0],[18,-3],[25,3],[21,16],[11,18],[0,15]],P.body);
                poly([[9,0],[15,-17],[23,-27],[23,-7],[26,1],[19,3]],P.crest);
                poly([[0,7],[-40,15],[-49,19],[-3,17],[11,13]],P.beak);
                poly([[0,16],[-43,20-charge*3],[-4,23+charge*3],[10,17]],P.lit);
                desertBossLine([[-43,18],[-3,15],[10,13]],P.edge,1.2);
                ctx.fillStyle='#efb744';ctx.fillRect(9,6,7,3);ctx.fillStyle=P.edge;ctx.fillRect(10,6,2,3);
                ctx.restore();
            }else{
                ctx.save();ctx.translate(0,charge?6:0);
                poly([[28,38],[19,35],[12,31],[6,31],[4,37],[16,43],[29,47],[36,43]],P.body);
                poly([[9,29],[16,21],[23,23],[25,33],[18,39],[5,39],[0,34]],P.lit);
                poly([[15,24],[30,13],[56,5],[43,18],[22,30]],P.crest);
                poly([[18,24],[32,15],[48,10],[35,19]],P.rib,false);
                poly([[4,31],[-29,34],[-4,37],[9,36]],P.beak);
                poly([[3,38],[-23,38+charge*3],[-1,42+charge*3],[13,37]],P.body);
                ctx.fillStyle='#ffba70';ctx.fillRect(13,28,6,3);ctx.fillStyle=P.edge;ctx.fillRect(14,28,2,3);
                if(charge){ctx.fillStyle='#e48bfa';ctx.beginPath();ctx.arc(3,38,4+Math.sin(frames*.4),0,Math.PI*2);ctx.fill();}
                ctx.restore();
            }
            wing(false);ctx.restore();
        }
// BOSS_PART_END s0.drawDesertPterosaur.1

// Nguồn: index.html:779 · Dùng bởi: TRexBoss, TyrantRexBoss
// BOSS_PART_BEGIN s0.drawRexBossBody.1 EDITABLE
function drawRexBossBody(b, tyrant=false, offsetX=0){
            const dir=tyrant?b.dir():(b.oDir||-1),enraged=tyrant&&b.phase===2;
            const P=tyrant
                ? {edge:'#241211',dark:'#48251f',body:enraged?'#a32d24':'#82402c',light:enraged?'#c65b36':'#b06a3e',belly:'#b99063',stripe:'#48251f',bone:'#d7b483',eye:enraged?'#ffdd84':'#ff8f35'}
                : {edge:'#49241d',dark:'#9b3c25',body:'#e36a31',light:'#f79d4e',belly:'#f3cb85',stripe:'#b14728',bone:'#ffe4b0',eye:'#ffe76d'};
            const rush=/^(dashing|huc|retreat_out|retreat_in)$/.test(b.state);
            const moving=rush||(tyrant?/^(entering|returning|idle)$/:/^(entering|returning|retreat_out|retreat_in)$/).test(b.state);
            const gait=tyrant?(b.chan||0)*2:frames*(rush?.52:.24);
            const stride=moving?(rush?1:.55):0,breath=Math.sin(frames*.075)*.65;
            const bob=breath+(rush?Math.abs(Math.sin(gait))*1.4:0);
            const jaw=tyrant?.12+.88*Math.max(0,Math.min(1,b.ham||0)):(b.state==='shooting'?.55+Math.sin(frames*.35)*.12:0);
            const tail=(tyrant?(b.duoi||0)*-.38:0)+Math.sin(frames*.065)*.035;
            const poly=(points,fill,outline=true)=>{
                ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);
                for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);
                ctx.closePath();ctx.fillStyle=fill;ctx.fill();
                if(outline){ctx.strokeStyle=P.edge;ctx.lineWidth=1.8;ctx.stroke();}
            };
            const leg=(back)=>{
                const wave=Math.sin(gait+(back?Math.PI:0))*stride,lift=Math.max(0,-Math.cos(gait+(back?Math.PI:0)))*stride*5;
                const hip=back?79:64,knee=hip-10+wave*6,hock=hip+8-wave*3;
                const hy=75-lift*.5,fy=86-lift,bulk=tyrant?17:14;
                // A broad hip/thigh feeds a forward knee, then a heavy calf
                // folds back to the raised hock. Only the toes rest on the floor.
                poly([[hip-bulk,46+bob],[hip+9,45+bob],[hip+15,50+bob],[hip+14,58+bob],[knee+10,67],[hock+8,hy-1],[hock+7,fy-2],[hock+2,fy],[hock-8,fy-2],[hock-7,hy+3],[knee-7,69],[knee-11,63],[hip-bulk-1,55+bob]],back?P.dark:P.body);
                if(!back){
                    poly([[hip-10,49+bob],[hip+5,48+bob],[hip+9,53+bob],[hip+6,59],[knee+5,65],[knee-5,65],[hip-12,57+bob]],P.light,false);
                    poly([[hip+8,50+bob],[hip+13,53+bob],[hip+10,59],[knee+8,66],[knee+3,66],[hip+5,58]],P.stripe,false);
                    poly([[knee-4,67],[knee+5,65],[hock+4,hy],[hock+1,hy+5],[hock-4,hy+3],[knee-3,70]],P.light,false);
                    poly([[knee-8,63],[knee+1,61],[knee+5,65],[knee+2,69],[knee-6,68]],P.body);
                }
                // Thick ankle scales and three separate, splayed clawed toes.
                for(let i=0;i<3;i++){ctx.fillStyle=back?P.edge:P.stripe;ctx.fillRect(hock-5,hy+3+i*2,10,1);}
                poly([[hock-6,fy-6],[hock+6,fy-6],[hock+10,fy-1],[hock+7,fy+2],[hock-8,fy+2],[hock-15,fy-1]],back?P.dark:P.body);
                for(let i=0;i<3;i++){
                    const y=fy-4+i*2,tip=hock-23-(i===1?6:0);
                    poly([[hock-3,y-2],[hock-13,y-2],[tip+4,y-1],[tip,y+2],[hock-11,y+2],[hock+1,y+1]],back?P.dark:(i===1?P.body:P.light));
                    poly([[tip+5,y-1],[tip,y],[tip-3,y+2],[tip+5,y+2]],back?'#947452':P.bone,false);
                }
            };
            ctx.save();ctx.translate(b.x+offsetX+(dir>0?b.w:0),b.y);ctx.scale((dir>0?-1:1)*b.w/112,b.h/88);
            ctx.lineJoin='miter';ctx.lineCap='square';
            // A tapered, raised counterweight tail, rather than a rectangular stub.
            ctx.save();ctx.translate(82,43+bob);ctx.rotate(tail);
            poly([[-7,-7],[9,-6],[22,0],[36,1],[51,-4],[48,1],[36,7],[21,9],[8,5],[-7,5]],P.body);
            poly([[1,1],[13,2],[24,6],[36,5],[47,0],[35,7],[21,8],[8,4]],P.dark,false);
            ctx.fillStyle=P.stripe;ctx.fillRect(17,0,4,5);ctx.fillRect(29,2,3,4);ctx.restore();
            leg(true);
            // Rib cage, heavy pelvis and an S-shaped neck under the large skull.
            poly(tyrant?[[37,22+bob],[47,20+bob],[57,27+bob],[69,24+bob],[86,29+bob],[96,38+bob],[96,52+bob],[84,64+bob],[62,65+bob],[49,59+bob],[40,49+bob],[33,39+bob]]:[[38,22+bob],[47,24+bob],[52,29+bob],[69,27+bob],[84,31+bob],[93,39+bob],[92,52+bob],[82,62+bob],[62,64+bob],[49,59+bob],[42,49+bob],[34,41+bob]],P.body);
            poly([[36,35+bob],[43,39+bob],[48,49+bob],[59,56+bob],[77,57+bob],[84,54+bob],[78,61+bob],[62,62+bob],[49,56+bob],[40,46+bob]],P.belly,false);
            poly([[49,30+bob],[68,29+bob],[83,33+bob],[86,37+bob],[68,34+bob],[52,36+bob]],P.light,false);
            for(let i=0;i<4;i++){
                const x=53+i*8;
                poly([[x,30+bob],[x+5,29+bob],[x+4,40+bob],[x,45+bob],[x+1,36+bob]],P.stripe,false);
            }
            // Small skin scales, not a row of stegosaur plates.
            ctx.fillStyle=P.dark;
            for(const [x,y] of [[52,42],[59,46],[76,43],[83,48],[55,51],[73,52],[88,40]])ctx.fillRect(x,y+bob,2,2);
            if(tyrant){
                // Knotted neck muscles, low bony scutes and healed flank gashes.
                poly([[37,25+bob],[43,23+bob],[51,32+bob],[49,42+bob],[43,46+bob],[39,37+bob]],P.dark,false);
                for(let i=0;i<5;i++){const x=53+i*8,y=27+(i%2)*2+bob;poly([[x-2,y+2],[x,y-2],[x+4,y-3],[x+6,y+3]],P.dark);}
                ctx.strokeStyle='#c68d68';ctx.lineWidth=1.2;
                for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(78+i*4,38+bob);ctx.lineTo(75+i*4,45+bob);ctx.stroke();}
            }
            leg(false);
            // Short two-finger arms curl in against the chest.
            poly([[43,40+bob],[49,43+bob],[46,49+bob],[39,50+bob],[37,46+bob],[41,47+bob],[43,45+bob]],P.dark);
            poly([[44,39+bob],[48,41+bob],[44,47+bob],[37,47+bob],[35,44+bob],[39,45+bob],[42,43+bob]],P.body);
            ctx.fillStyle=P.bone;ctx.fillRect(34,43+bob,2,3);ctx.fillRect(37,45+bob,2,3);
            ctx.save();ctx.translate(0,bob);
            if(tyrant){ctx.translate(37,29);ctx.scale(1.12,1.1);ctx.translate(-37,-29);}
            // Deep skull, a muscular cheek and a separate hinged lower jaw.
            poly([[3,10],[10,7],[24,7],[29,4],[39,5],[44,12],[43,28],[37,35],[20,34],[7,29],[2,24]],P.dark);
            poly([[4,11],[23,9],[29,7],[38,8],[41,14],[39,25],[32,29],[8,27],[3,23]],P.body,false);
            poly([[5,11],[24,9],[29,7],[38,8],[37,12],[22,13],[5,15]],P.light,false);
            poly([[29,20],[38,17],[39,25],[34,30],[25,29]],P.stripe,false);
            // Mouth cavity remains dark even when the upper and lower teeth overlap.
            poly([[5,25],[33,25],[39,30],[34,37+jaw*10],[9,34+jaw*12]],tyrant?'#210d0e':'#411b1b',false);
            if(jaw>.4){ctx.fillStyle=enraged?'#ffad45':'#bb6250';ctx.fillRect(11,32+jaw*8,19,3);}
            ctx.save();ctx.translate(37,29);ctx.rotate(-jaw*.62);
            poly(tyrant?[[3,-2],[-33,0],[-33,7],[-27,14],[-7,14],[5,6]]:[[2,-1],[-32,0],[-32,5],[-26,11],[-8,12],[3,5]],P.body);
            poly(tyrant?[[-30,8],[-25,11],[-8,11],[2,7],[-3,12],[-8,14],[-27,12]]:[[-29,5],[-24,8],[-8,9],[1,4],[-3,9],[-8,12],[-26,10]],P.belly,false);
            ctx.fillStyle=P.bone;
            for(let i=0;i<5;i++)poly([[-29+i*5,1],[-27+i*5,tyrant?-(3+i%3):-3],[-25+i*5,1]],P.bone,false);
            ctx.restore();
            for(let i=0;i<(tyrant?7:6);i++){const x=5+i*(tyrant?4.2:5),tooth=tyrant?[4,6,4,7,5,6,3][i]:4+i%2;poly([[x,25],[x+3.8,25],[x+1.1,25+tooth]],P.bone,false);}
            ctx.fillStyle=P.edge;ctx.fillRect(7,18,4,2);
            // Sunken eye under a projecting brow; the giant has scarred bone ridges.
            poly([[24,14],[31,12],[37,14],[35,20],[26,21]],P.edge,false);
            if(tyrant){
                poly([[25,16],[33,14],[36,15],[32,18],[26,19]],P.eye,false);
                ctx.fillStyle='#190e0b';ctx.fillRect(28,15,1.5,4);
                poly([[22,12],[29,10],[39,8],[40,13],[31,14],[25,17],[22,16]],P.dark);
                poly([[25,12],[30,10],[38,9],[37,11],[30,12],[25,14]],P.light,false);
            }else{
                ctx.fillStyle=P.eye;ctx.fillRect(27,15,7,4);ctx.fillStyle='#26150d';ctx.fillRect(28,15,2,4);ctx.fillStyle='#fff4c9';ctx.fillRect(32,15,2,1);
                poly([[23,12],[30,10],[39,12],[37,15],[29,13],[24,15]],P.dark,false);
            }
            if(tyrant){
                poly([[29,5],[31,1],[34,4],[39,3],[42,8],[36,7]],P.dark);
                ctx.strokeStyle='#e5bd8c';ctx.lineWidth=1.4;
                ctx.beginPath();ctx.moveTo(20,13);ctx.lineTo(17,20);ctx.lineTo(21,25);ctx.stroke();
                ctx.fillStyle=enraged?'#ff7740':P.dark;ctx.fillRect(40,17,2,7);ctx.fillRect(37,23,2,5);
                if(enraged){poly([[26,17],[33,15],[32,17],[27,18]],'#fff2a1',false);}
            }else if(b.state==='shooting'&&b.shotsFired>=3){ctx.fillStyle='#fff5c3';ctx.fillRect(27,15,6,3);}
            ctx.restore();ctx.restore();
        }
// BOSS_PART_END s0.drawRexBossBody.1

// Nguồn: index.html:12802 · Dùng bởi: DeathBoss, WarBoss
// BOSS_PART_BEGIN s0.pcxOf.1 EDITABLE
function pcxOf(){ return dino.x + dino.w / 2; }
// BOSS_PART_END s0.pcxOf.1

// Nguồn: index.html:15620 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_HP.1 EDITABLE
const GAE_HP = [0, 80, 76, 70];
// BOSS_PART_END s0.GAE_HP.1

// Nguồn: index.html:15633 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_CD.1 EDITABLE
const GAE_CD = {
            g_combo:38,  g_keo:78,  g_lao:70,  g_ao:84,  g_nhay:78, g_quet:62,
            g_quay:82,   g_banlen:96,
            g_mau:98,    g_song:84, g_xung:110, g_bay:98, g_no:96,  g_echo:90,
            g_set:124,   g_loan:98, g_xoay:98, g_corona:124, g_dich:140,
            g_vuot:96,   g_hon:150
        };
// BOSS_PART_END s0.GAE_CD.1

// Nguồn: index.html:15653 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_QUAY_R.1 EDITABLE
const GAE_QUAY_R  = 150;
// BOSS_PART_END s0.GAE_QUAY_R.1

// Nguồn: index.html:15667 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_PHA.1 EDITABLE
const GAE_PHA = { g_combo:1, g_quet:1, g_keo:1, g_lao:1, g_nhay:1, g_quay:1,
                          g_banlen:1,
                          g_ao:2, g_song:2, g_mau:2, g_xung:2, g_bay:2, g_no:2, g_echo:2,
                          g_corona:2, g_dich:2, g_vuot:2,
                          g_set:3, g_loan:3, g_xoay:3, g_hon:3 };
// BOSS_PART_END s0.GAE_PHA.1

// Nguồn: index.html:15743 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.gaeChop.1 EDITABLE
let gaeChop = 0;
// BOSS_PART_END s0.gaeChop.1

// Nguồn: index.html:17773 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_W2.1 EDITABLE
const SOC_W2 = 54, SOC_H2 = 92;
// BOSS_PART_END s0.SOC_W2.1

// Nguồn: index.html:17779 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_HP.1 EDITABLE
const SOC_HP = [0, 150, 125];
// BOSS_PART_END s0.SOC_HP.1

// Nguồn: index.html:17780 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_DOI_CHU.1 EDITABLE
const SOC_DOI_CHU = 34;
// BOSS_PART_END s0.SOC_DOI_CHU.1

// Nguồn: index.html:17786 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_TU.1 EDITABLE
const SOC_TU = ['thang', 'cong', 'bua', 'phep'];
// BOSS_PART_END s0.SOC_TU.1

// Nguồn: index.html:17791 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_NHIP.1 EDITABLE
const SOC_NHIP = { thang: 1.16, cong: 1.32, bua: 0.86, phep: 1.00 };
// BOSS_PART_END s0.SOC_NHIP.1

// Nguồn: index.html:17794 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_CULY.1 EDITABLE
const SOC_CULY = { thang: 96, cong: 78, bua: 150, phep: 300 };
// BOSS_PART_END s0.SOC_CULY.1

// Nguồn: index.html:17809 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_BO.1 EDITABLE
const SOC_BO = {
            thang: ['s_ba', 's_luotdam', 's_trang', 's_song'],
            cong:  ['c_bal', 'c_mua', 'c_cau', 'c_xoay'],
            bua:   ['b_nem', 'b_lon', 'b_ngang', 'b_dia'],
            phep:  ['p_laser', 'p_kiem', 'p_bom', 'p_dich']
        };
// BOSS_PART_END s0.SOC_BO.1

// Nguồn: index.html:17816 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_BO2.1 EDITABLE
const SOC_BO2 = ['w_chuoi5', 'w_lao', 'w_vong', 'w_luot',
                         'w_set3', 'w_muaset', 'w_giangset', 'w_dap', 'w_bat', 'w_kydi'];
// BOSS_PART_END s0.SOC_BO2.1

// Nguồn: index.html:17818 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_BO2T.1 EDITABLE
const SOC_BO2T = ['w_ptTren', 'w_ptNgang'];
// BOSS_PART_END s0.SOC_BO2T.1

// Nguồn: index.html:17871 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_CHUOI_MAX.1 EDITABLE
const SOC_CHUOI_MAX = 4;
// BOSS_PART_END s0.SOC_CHUOI_MAX.1

// Nguồn: index.html:17875 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_LUA_NGHI.1 EDITABLE
const SOC_LUA_NGHI = 40;
// BOSS_PART_END s0.SOC_LUA_NGHI.1

// Nguồn: index.html:17876 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_LUOT_XA.1 EDITABLE
const SOC_LUOT_XA  = 300;
// BOSS_PART_END s0.SOC_LUOT_XA.1

// Nguồn: index.html:17878 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_SONG_R0.1 EDITABLE
const SOC_SONG_R0  = 26;
// BOSS_PART_END s0.SOC_SONG_R0.1

// Nguồn: index.html:17879 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_SONG_RMAX.1 EDITABLE
const SOC_SONG_RMAX= 96;
// BOSS_PART_END s0.SOC_SONG_RMAX.1

// Nguồn: index.html:17880 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_BAL_XA.1 EDITABLE
const SOC_BAL_XA   = 270;
// BOSS_PART_END s0.SOC_BAL_XA.1

// Nguồn: index.html:17882 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_DOM_SO.1 EDITABLE
const SOC_DOM_SO   = 9;
// BOSS_PART_END s0.SOC_DOM_SO.1

// Nguồn: index.html:17883 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_CAU_SO.1 EDITABLE
const SOC_CAU_SO   = 5;
// BOSS_PART_END s0.SOC_CAU_SO.1

// Nguồn: index.html:17884 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_CAU_NHIP.1 EDITABLE
const SOC_CAU_NHIP = 300;
// BOSS_PART_END s0.SOC_CAU_NHIP.1

// Nguồn: index.html:17885 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_CAU_GIU.1 EDITABLE
const SOC_CAU_GIU  = 60;
// BOSS_PART_END s0.SOC_CAU_GIU.1

// Nguồn: index.html:17886 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_LAS_SAC.1 EDITABLE
const SOC_LAS_SAC  = 120;
// BOSS_PART_END s0.SOC_LAS_SAC.1

// Nguồn: index.html:17887 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_LAS_TONG.1 EDITABLE
const SOC_LAS_TONG = 240;
// BOSS_PART_END s0.SOC_LAS_TONG.1

// Nguồn: index.html:17888 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_LAS_QUAY.1 EDITABLE
const SOC_LAS_QUAY = 0.016;
// BOSS_PART_END s0.SOC_LAS_QUAY.1

// Nguồn: index.html:17891 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_MIN_TRAN.1 EDITABLE
const SOC_MIN_TRAN = 4;
// BOSS_PART_END s0.SOC_MIN_TRAN.1

// Nguồn: index.html:17892 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_MIN_MO.1 EDITABLE
const SOC_MIN_MO   = 34;
// BOSS_PART_END s0.SOC_MIN_MO.1

// Nguồn: index.html:17895 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_VOI.1 EDITABLE
const SOC_G_VOI   = 78;
// BOSS_PART_END s0.SOC_G_VOI.1

// Nguồn: index.html:17896 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_TRE.1 EDITABLE
const SOC_G_TRE   = 7;
// BOSS_PART_END s0.SOC_G_TRE.1

// Nguồn: index.html:17901 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_NO_R.1 EDITABLE
const SOC_G_NO_R  = 333;
// BOSS_PART_END s0.SOC_G_NO_R.1

// Nguồn: index.html:17902 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_NO_BAO.1 EDITABLE
const SOC_G_NO_BAO= 52;
// BOSS_PART_END s0.SOC_G_NO_BAO.1

// Nguồn: index.html:17903 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_AUTO.1 EDITABLE
const SOC_G_AUTO  = 180;
// BOSS_PART_END s0.SOC_G_AUTO.1

// Nguồn: index.html:17904 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_PT_SO.1 EDITABLE
const SOC_G_PT_SO = 5;
// BOSS_PART_END s0.SOC_G_PT_SO.1

// Nguồn: index.html:17905 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_PT_NHIP.1 EDITABLE
const SOC_G_PT_NHIP = 30;
// BOSS_PART_END s0.SOC_G_PT_NHIP.1

// Nguồn: index.html:17906 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_KYDI_R0.1 EDITABLE
const SOC_KYDI_R0   = 34;
// BOSS_PART_END s0.SOC_KYDI_R0.1

// Nguồn: index.html:17907 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_KYDI_RMAX.1 EDITABLE
const SOC_KYDI_RMAX = 150;
// BOSS_PART_END s0.SOC_KYDI_RMAX.1

// Nguồn: index.html:17909 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_KYDI_HUT.1 EDITABLE
const SOC_KYDI_HUT  = 2.3;
// BOSS_PART_END s0.SOC_KYDI_HUT.1

// Nguồn: index.html:17914 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_PT_ROI.1 EDITABLE
const SOC_PT_ROI    = 20;
// BOSS_PART_END s0.SOC_PT_ROI.1

// Nguồn: index.html:17915 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_PT_BUOC.1 EDITABLE
const SOC_PT_BUOC   = 62;
// BOSS_PART_END s0.SOC_PT_BUOC.1

// Nguồn: index.html:17916 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_SET_NAP.1 EDITABLE
const SOC_SET_NAP   = 26;
// BOSS_PART_END s0.SOC_SET_NAP.1

// Nguồn: index.html:17917 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_SET_NHIP.1 EDITABLE
const SOC_SET_NHIP  = 42;
// BOSS_PART_END s0.SOC_SET_NHIP.1

// Nguồn: index.html:17927 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_HP.1 EDITABLE
const COR_HP   = [0, 55, 55, 70];
// BOSS_PART_END s0.COR_HP.1

// Nguồn: index.html:17928 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_W.1 EDITABLE
const COR_W    = [0, 58, 80, 58];
// BOSS_PART_END s0.COR_W.1

// Nguồn: index.html:17929 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_H.1 EDITABLE
const COR_H    = [0, 96, 130, 96];
// BOSS_PART_END s0.COR_H.1

// Nguồn: index.html:17931 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_CD.1 EDITABLE
const COR_CD   = { chem: 40, loan: 140, giam: 170, lao: 115, keo: 190, xuc: 120, re: 250,
                           nhay: 140, song: 280, quet: 145, bay: 250, tom: 290, cuong: 390,
                           luot: 140, vuot: 220, don: 280, mua: 240, phan: 220 };
// BOSS_PART_END s0.COR_CD.1

// Nguồn: index.html:17934 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_BO.1 EDITABLE
const COR_BO   = [null,
            ['chem', 'loan', 'giam', 'lao', 'keo', 'xuc', 're', 'nhay', 'song', 'luot', 'vuot', 'mua'],
            ['chem', 'loan', 'giam', 'lao', 'keo', 'xuc', 're', 'nhay', 'song', 'quet', 'cuong', 'luot', 'vuot', 'don', 'mua', 'phan'],
            ['chem', 'loan', 'giam', 'lao', 'keo', 'xuc', 're', 'nhay', 'song', 'bay', 'tom', 'cuong', 'luot', 'vuot', 'don', 'mua', 'phan']];
// BOSS_PART_END s0.COR_BO.1

// Nguồn: index.html:17939 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_TRONG.1 EDITABLE
const COR_TRONG = { chem: [3, 0, 0], loan: [4, 2, 0], quet: [3, 0, 0], giam: [0, 0, 0],
                            lao: [0, 4, 3], keo: [0, 3, 3], xuc: [0, 2, 1], re: [1, 2, 1], nhay: [1, 3, 3],
                            song: [0, 1, 2], bay: [0, 2, 2], tom: [1, 2, 1], cuong: [3, 2, 1],
                            luot: [0, 2, 2], vuot: [0, 1, 2], don: [1, 1, 2], mua: [0, 2, 3], phan: [1, 3, 2] };
// BOSS_PART_END s0.COR_TRONG.1

// Nguồn: index.html:17943 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_KEO_DAI.1 EDITABLE
const COR_KEO_DAI = 560, COR_ROI_DAI = 260;
// BOSS_PART_END s0.COR_KEO_DAI.1

// Nguồn: index.html:17944 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_BUNG.1 EDITABLE
const COR_BUNG = 0.35;
// BOSS_PART_END s0.COR_BUNG.1

// Nguồn: index.html:17946 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_NOI_LUON.1 EDITABLE
const COR_NOI_LUON = { luot: 1, vuot: 1, don: 1 };
// BOSS_PART_END s0.COR_NOI_LUON.1

// Nguồn: index.html:17947 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_NOI_TL.1 EDITABLE
const COR_NOI_TL   = [0, 0.65, 0.82, 0.94];
// BOSS_PART_END s0.COR_NOI_TL.1

// Nguồn: index.html:17948 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_NOI_MAX.1 EDITABLE
const COR_NOI_MAX  = [0, 2, 3, 3];
// BOSS_PART_END s0.COR_NOI_MAX.1

// Nguồn: index.html:17949 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_NOI_NGHI.1 EDITABLE
const COR_NOI_NGHI = [0, 7, 5, 3];
// BOSS_PART_END s0.COR_NOI_NGHI.1

// Nguồn: index.html:17951 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.corKichBan.1 EDITABLE
function corKichBan(b, tu){
            let g = b.gap(), ad = Math.abs(g), S = b.stage;
            let om = ad < b.w / 2 + 26, gan = ad < 165, tren = !dino.grounded;
            const co = id => COR_BO[S].indexOf(id) >= 0;
            switch (tu){
                case 'luot':  return om ? 'giam' : (gan ? (S >= 2 && Math.random() < 0.6 ? 'loan' : 'chem') : 'lao');
                case 'vuot':  return gan ? 'loan' : 'keo';
                case 'don':   return om ? 'giam' : (gan ? 'loan' : 'lao');
                case 'lao':   return gan ? (Math.random() < 0.55 ? 'loan' : 'chem') : (co('nhay') ? 'nhay' : 'keo');
                case 'nhay':  return om ? 'giam' : (gan ? (S >= 2 && Math.random() < 0.55 ? 'quet' : 'chem') : 'lao');
                case 'keo':   return b.keoBat ? (Math.random() < 0.5 ? 'lao' : 'luot') : (gan ? 'loan' : (Math.random() < 0.5 ? 'luot' : 'vuot'));
                case 're':    return b.daTrung ? null : (gan ? 'loan' : (Math.random() < 0.5 ? 'lao' : 'luot'));
                case 'giam':  return Math.random() < 0.5 ? 'keo' : 'lao';
                case 'loan':  return om ? 'giam' : (gan ? 'quet' : ['keo', 'lao', 'nhay'][Math.floor(Math.random() * 3)]);
                case 'chem':  return gan ? (S >= 2 ? 'loan' : 'giam') : (Math.random() < 0.5 ? 'lao' : 'nhay');
                case 'song':  return tren ? 'keo' : (Math.random() < 0.5 ? 'lao' : 'don');
                case 'xuc':   return om ? 'giam' : (gan ? 'loan' : 'nhay');
                case 'quet':  return gan ? 'loan' : 'lao';
                case 'bay':   return gan ? 'loan' : (Math.random() < 0.5 ? 'keo' : 'lao');
                case 'tom':   return b.daTrung ? null : 'lao';
                case 'cuong': return gan ? 'giam' : (Math.random() < 0.5 ? 'keo' : 'lao');
                case 'mua':   return gan ? 'chem' : 'lao';
                case 'phan':  return gan ? 'giam' : 'keo';
            }
            return null;
        }
// BOSS_PART_END s0.corKichBan.1

// Nguồn: index.html:17982 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_SONG1.1 EDITABLE
const COR_SONG1 = [0, 44, 88], COR_SONG2 = [0, 12, 56, 68, 112];
// BOSS_PART_END s0.COR_SONG1.1

// Nguồn: index.html:17983 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_QUY.1 EDITABLE
const COR_QUY  = 100, COR_BIEN = 40;
// BOSS_PART_END s0.COR_QUY.1

// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 EDITABLE
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 EDITABLE
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24480 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GiantSpiderBoss, GreatSerpentBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MosaBoss, MountainGodBoss, PoisonMothBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, VoltCloneBoss
// BOSS_PART_BEGIN s0.hudManHinh.1 EDITABLE
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
// BOSS_PART_BEGIN s0.drawTopBossBar.1 EDITABLE
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

// Nguồn: index.html:24699 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.VG_W.1 EDITABLE
const VG_W = 38, VG_H = 58;
// BOSS_PART_END s0.VG_W.1

// Nguồn: index.html:24778 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.drawVergilBody.1 EDITABLE
function drawVergilBody(b, x, y){
            let dr = b.facingLeft ? -1 : 1, dt = b.stage === 3;
            let cxb = x + VG_W/2;
            ctx.save();
            ctx.translate(cxb, y); ctx.scale(dr, 1); ctx.translate(-cxb, -y);
            let sway = Math.sin(frames * 0.065) * 2.0 + (b.dashV ? -Math.abs(b.dashV) * 0.4 : 0);

            // Bang mau DMC5 Vergil: Xanh den sam / Hai quan + Vien Vang Bac + Áo gile trong
            let coat  = b.isDop ? "#1B3B6F" : (dt ? "#1E1442" : "#162038");
            let coatD = b.isDop ? "#0F2347" : (dt ? "#100926" : "#0C1222");
            let trim  = b.isDop ? "#80D8FF" : (dt ? "#B388FF" : "#4FC3F7");
            let gold  = b.isDop ? "#B3E5FC" : (dt ? "#E040FB" : "#FFD54F");

            // 1. TA AO KHOAC DARK SLAYER (xẻ tà đôi bay phấp phới + hoa văn viền)
            ctx.fillStyle = coatD;
            ctx.beginPath();
            ctx.moveTo(cxb - 12, y + 24);
            ctx.quadraticCurveTo(cxb - 32 - sway*2.2, y + 43, cxb - 26 - sway*3.2, y + VG_H - 1);
            ctx.lineTo(cxb - 14 - sway*2, y + VG_H - 6);
            ctx.lineTo(cxb - 7 - sway*1.2, y + VG_H);
            ctx.lineTo(cxb - 1, y + VG_H - 5);
            ctx.lineTo(cxb - 2, y + 24);
            ctx.closePath(); ctx.fill();

            ctx.fillStyle = coat;
            ctx.beginPath();
            ctx.moveTo(cxb - 10, y + 26);
            ctx.quadraticCurveTo(cxb - 23 - sway*1.6, y + 42, cxb - 19 - sway*2.4, y + VG_H - 3);
            ctx.lineTo(cxb - 3, y + VG_H - 6);
            ctx.lineTo(cxb - 3, y + 26);
            ctx.closePath(); ctx.fill();
            // Duong vien bac doc ta ao sau
            ctx.strokeStyle = trim; ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.moveTo(cxb - 10, y + 27);
            ctx.quadraticCurveTo(cxb - 21 - sway*1.5, y + 42, cxb - 17 - sway*2.2, y + VG_H - 4);
            ctx.stroke();

            // 2. CHAN + BOOTS CAO CO (+ Giáp chân Beowulf nếu đang bật b.beo)
            ctx.fillStyle = "#101320";
            ctx.fillRect(cxb - 9, y + 40, 7, 18); ctx.fillRect(cxb + 1, y + 40, 7, 18);
            if (b.beo){
                // Giap chan anh sang Beowulf
                ctx.fillStyle = "#B3E5FC";
                ctx.fillRect(cxb - 11, y + 44, 9, 14); ctx.fillRect(cxb + 1, y + 44, 9, 14);
                ctx.fillStyle = "#00E5FF";
                ctx.fillRect(cxb - 10, y + 46, 7, 3); ctx.fillRect(cxb + 2, y + 46, 7, 3);
            } else {
                ctx.fillStyle = "#080A12";
                ctx.fillRect(cxb - 11, y + VG_H - 9, 10, 9); ctx.fillRect(cxb + 1, y + VG_H - 9, 10, 9);
                ctx.fillStyle = gold; // Khoa giay vang
                ctx.fillRect(cxb - 5, y + VG_H - 7, 3, 2); ctx.fillRect(cxb + 7, y + VG_H - 7, 3, 2);
            }

            // 3. THAN AO GILE DEN + AO KHOAC NGOAI + KHAN CO XANH
            ctx.fillStyle = "#0E101A"; ctx.fillRect(cxb - 8, y + 15, 16, 26);
            // That lung + khoa bac
            ctx.fillStyle = "#1C2230"; ctx.fillRect(cxb - 10, y + 38, 20, 3);
            ctx.fillStyle = gold; ctx.fillRect(cxb - 2, y + 37.5, 5, 4);

            // Hai ve ao khoac xanh den
            ctx.fillStyle = coat;
            ctx.beginPath();
            ctx.moveTo(cxb - 12, y + 14); ctx.lineTo(cxb - 4, y + 15);
            ctx.lineTo(cxb - 5, y + 44); ctx.lineTo(cxb - 14, y + 44);
            ctx.closePath(); ctx.fill();
            ctx.beginPath();
            ctx.moveTo(cxb + 4, y + 15); ctx.lineTo(cxb + 12, y + 14);
            ctx.lineTo(cxb + 14, y + 44); ctx.lineTo(cxb + 5, y + 44);
            ctx.closePath(); ctx.fill();

            // Vien hoa van xanh-vang doc nep ao
            ctx.fillStyle = trim;
            ctx.fillRect(cxb - 5.5, y + 15, 1.8, 28); ctx.fillRect(cxb + 3.8, y + 15, 1.8, 28);
            ctx.fillStyle = gold;
            for (let k = 0; k < 3; k++){
                ctx.fillRect(cxb - 8, y + 19 + k * 6, 2, 1.5);
                ctx.fillRect(cxb + 6, y + 19 + k * 6, 2, 1.5);
            }

            // Khan co xanh lam (Ascot) + Co ao dung cao
            ctx.fillStyle = "#0288D1";
            ctx.beginPath(); ctx.moveTo(cxb - 4, y + 14); ctx.lineTo(cxb + 4, y + 14); ctx.lineTo(cxb, y + 23); ctx.closePath(); ctx.fill();
            ctx.fillStyle = coat;
            ctx.beginPath();
            ctx.moveTo(cxb - 11, y + 16); ctx.lineTo(cxb - 9, y + 8); ctx.lineTo(cxb + 9, y + 8); ctx.lineTo(cxb + 11, y + 16);
            ctx.closePath(); ctx.fill();

            // Cau vai vien vang
            ctx.fillStyle = coat; ctx.fillRect(cxb - 15, y + 13, 30, 5);
            ctx.fillStyle = gold; ctx.fillRect(cxb - 15, y + 13, 9, 1.8); ctx.fillRect(cxb + 6, y + 13, 9, 1.8);

            // 4. TAY TRAI + VO KIEM YAMATO (SAYA) LUON CAM TREN TAY TRAI
            let ar = b.armR || 0, al = b.armL || 0;
            ctx.save(); ctx.translate(cxb - 12, y + 19); ctx.rotate(al);
            ctx.fillStyle = coatD; ctx.fillRect(-3.5, 0, 7, 14);
            ctx.fillStyle = trim; ctx.fillRect(-3.8, 11, 7.6, 2.5); // vien co tay
            ctx.fillStyle = b.beo ? "#B3E5FC" : "#141824"; ctx.fillRect(-3.5, 13.5, 7, 5); // gang tay

            // VO KIEM SAYA DEN + DAY SAGEO VANG
            ctx.save();
            ctx.translate(0, 15); ctx.rotate(b.drawn ? -0.35 : -0.45);
            ctx.fillStyle = "#0D101A"; ctx.fillRect(-2.5, -6, 5, 46);
            ctx.fillStyle = gold; ctx.fillRect(-3, 2, 6, 3); ctx.fillRect(-2.5, 36, 5, 4); // Kurikata & Kojiri vang
            // Neu CHUA rut kiem -> chuoi kiem Yamato (Tsuka) trang quan day den nam trong vo
            if (!b.drawn){
                ctx.fillStyle = gold; ctx.fillRect(-5.5, -8, 11, 2.5); // Tsuba (ho thu)
                ctx.fillStyle = "#ECEFF1"; ctx.fillRect(-2.2, -20, 4.4, 12);
                ctx.fillStyle = "#263238";
                for (let k = 0; k < 3; k++) ctx.fillRect(-2.2, -19 + k * 4, 4.4, 1.8);
            }
            ctx.restore();
            ctx.restore();

            // 5. DAU + TOC BAC VUOT NGUOC DAC TRUNG VERGIL
            ctx.fillStyle = b.isDop ? "#90CAF9" : "#E3C9A5"; ctx.fillRect(cxb - 7, y + 2, 14, 13);
            ctx.fillStyle = b.isDop ? "#64B5F6" : "#C4A882"; ctx.fillRect(cxb - 6, y + 12, 12, 3);
            // Mat lanh lung sắc bén
            ctx.fillStyle = dt ? "#FF1744" : (b.isDop ? "#E1F5FE" : "#29B6F6");
            ctx.fillRect(cxb + 1.5, y + 7.5, 4, 2.2); ctx.fillRect(cxb - 5.5, y + 7.5, 3, 2.2);
            ctx.fillStyle = "#FFFFFF"; ctx.fillRect(cxb + 3, y + 7.5, 1.5, 1.2);
            // Mái tóc bạc vuốt ngược từng lọn sắc nhọn ra sau
            ctx.fillStyle = dt ? "#B388FF" : "#CFD8DC";
            ctx.beginPath();
            ctx.moveTo(cxb - 9, y + 9); ctx.lineTo(cxb - 13, y + 1);
            ctx.lineTo(cxb - 11, y - 5); ctx.lineTo(cxb - 4, y - 8);
            ctx.lineTo(cxb + 6, y - 7); ctx.lineTo(cxb + 10, y + 5);
            ctx.closePath(); ctx.fill();

            ctx.fillStyle = dt ? "#EDE7F6" : "#F8FAFC";
            ctx.beginPath();
            ctx.moveTo(cxb - 8, y + 6);
            ctx.lineTo(cxb + 9, y + 5);
            ctx.lineTo(cxb + 13, y - 3);
            ctx.lineTo(cxb + 5, y - 1);
            ctx.lineTo(cxb + 8, y - 7);
            ctx.lineTo(cxb - 1, y - 2);
            ctx.lineTo(cxb + 1, y - 8);
            ctx.lineTo(cxb - 7, y - 2);
            ctx.lineTo(cxb - 12, y - 5);
            ctx.lineTo(cxb - 9, y + 2);
            ctx.closePath(); ctx.fill();

            // 6. TAY PHAI + VU KHI DANG CAM (YAMATO / BEOWULF / MIRAGE EDGE)
            ctx.save(); ctx.translate(cxb + 11, y + 19); ctx.rotate(ar);
            ctx.fillStyle = coat; ctx.fillRect(-3.5, 0, 7, 14);
            ctx.fillStyle = trim; ctx.fillRect(-3.8, 11, 7.6, 2.5);
            ctx.fillStyle = b.beo ? "#B3E5FC" : "#141824"; ctx.fillRect(-3.5, 13.5, 7, 5);

            if (b.beo){
                // GANG TAY ANH SANG BEOWULF
                ctx.save();
                ctx.shadowColor = "#00E5FF"; ctx.shadowBlur = 14;
                ctx.fillStyle = "#E1F5FE";
                ctx.beginPath(); ctx.moveTo(-6, 10); ctx.lineTo(6, 10); ctx.lineTo(8, 22); ctx.lineTo(0, 26); ctx.lineTo(-8, 22); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#00B0FF"; ctx.fillRect(-4, 13, 8, 4);
                ctx.restore();
            } else if (b.drawn){
                ctx.save();
                ctx.translate(0, 17); ctx.rotate(-1.05);
                if (b.mirageWep){
                    // MIRAGE EDGE — Dai kiem linh hon xanh ngoc
                    ctx.shadowColor = "#00E5FF"; ctx.shadowBlur = 16;
                    ctx.fillStyle = "#00B0FF";
                    ctx.beginPath(); ctx.moveTo(-6, -4); ctx.lineTo(-7, -46); ctx.lineTo(0, -64); ctx.lineTo(7, -46); ctx.lineTo(6, -4); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#E0F7FA";
                    ctx.beginPath(); ctx.moveTo(-3, -6); ctx.lineTo(0, -58); ctx.lineTo(3, -6); ctx.closePath(); ctx.fill();
                } else {
                    // THANH KATANA YAMATO — Luoi cong tinh xao + Hamon sang ruc
                    ctx.shadowColor = dt ? "#B388FF" : "#40C4FF"; ctx.shadowBlur = 12;
                    // Chuoi kiem (Tsuka) + Ho thu (Tsuba) vang
                    ctx.fillStyle = "#ECEFF1"; ctx.fillRect(-2, 0, 4, 12);
                    ctx.fillStyle = "#263238"; ctx.fillRect(-2, 3, 4, 2); ctx.fillRect(-2, 8, 4, 2);
                    ctx.fillStyle = gold; ctx.fillRect(-6, -2, 12, 2.5);
                    // Luoi kiem Katana hoi cong
                    let bg = ctx.createLinearGradient(0, -2, 0, -60);
                    bg.addColorStop(0, "#FFFFFF");
                    bg.addColorStop(0.6, dt ? "#D1C4E9" : "#E1F5FE");
                    bg.addColorStop(1, dt ? "#9575CD" : "#4FC3F7");
                    ctx.fillStyle = bg;
                    ctx.beginPath();
                    ctx.moveTo(-2, -2);
                    ctx.quadraticCurveTo(-3.5, -30, -1, -60);
                    ctx.lineTo(2.5, -55);
                    ctx.quadraticCurveTo(1.5, -28, 2, -2);
                    ctx.closePath(); ctx.fill();
                }
                ctx.restore();
            }
            ctx.restore();
            ctx.restore();
        }
// BOSS_PART_END s0.drawVergilBody.1

// Nguồn: index.html:24972 · Dùng bởi: DanteBoss, VergilBoss
// BOSS_PART_BEGIN s0.drawSinVergil.1 EDITABLE
function drawSinVergil(b, x, y){
            let dr = b.facingLeft ? -1 : 1, W = 64, H = 86, cxb = x + W/2;
            let wf = Math.sin((b.wing || 0)), nh = 0.65 + 0.35 * Math.sin(frames * 0.16);
            const DEN = "#090614", THAN = "#140E29", GIAP = "#261C4A", VIEN = "#3F2E78", XANH = "#00E5FF", LAM = "#40C4FF", TIM = "#7C4DFF";

            ctx.save();
            ctx.translate(cxb, y); ctx.scale(dr, 1); ctx.translate(-cxb, -y);

            // ---------- HAO QUANG TRONG TRUONG DUOI CHAN ----------
            let ag = ctx.createRadialGradient(cxb, y + 42, 6, cxb, y + 42, 64);
            ag.addColorStop(0, "rgba(0, 229, 255, " + (0.30 * nh).toFixed(2) + ")");
            ag.addColorStop(0.5, "rgba(124, 77, 255, 0.16)");
            ag.addColorStop(1, "rgba(12, 8, 28, 0)");
            ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(cxb, y + 42, 64, 0, 6.28); ctx.fill();

            // ---------- DOI CANH NANG LUONG THIEN THANH (4 dải cánh ánh sáng) ----------
            for (let s = -1; s <= 1; s += 2){
                let vai = { x: cxb - 5 * s, y: y + 22 };
                let khop = { x: cxb + s * (-38 - 6 * wf), y: y - 16 - 10 * wf };
                let dinh = [
                    { x: cxb + s * (-78 - 9 * wf), y: y - 6 - 12 * wf },
                    { x: cxb + s * (-84 - 7 * wf), y: y + 28 - 6 * wf },
                    { x: cxb + s * (-62 - 4 * wf), y: y + 64 }
                ];
                let wg = ctx.createLinearGradient(vai.x, vai.y, dinh[0].x, dinh[2].y);
                wg.addColorStop(0, "rgba(26, 18, 64, 0.92)");
                wg.addColorStop(0.6, "rgba(63, 81, 181, 0.78)");
                wg.addColorStop(1, "rgba(0, 229, 255, 0.65)");
                ctx.fillStyle = wg;
                ctx.beginPath(); ctx.moveTo(vai.x, vai.y); ctx.lineTo(khop.x, khop.y);
                for (let k = 0; k < 3; k++){
                    let d0 = dinh[k], d1 = dinh[k + 1] || { x: cxb - s * 14, y: y + 56 };
                    ctx.lineTo(d0.x, d0.y);
                    ctx.quadraticCurveTo((d0.x + d1.x) / 2 + s * 6, (d0.y + d1.y) / 2 - 6, d1.x, d1.y);
                }
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "rgba(0, 229, 255, " + (0.75 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.8; ctx.stroke();

                // Xuong canh den + tia nang luong
                ctx.strokeStyle = DEN; ctx.lineWidth = 4; ctx.lineCap = "round";
                ctx.beginPath(); ctx.moveTo(vai.x, vai.y); ctx.lineTo(khop.x, khop.y); ctx.stroke();
                ctx.strokeStyle = LAM; ctx.lineWidth = 2;
                for (const d0 of dinh){ ctx.beginPath(); ctx.moveTo(khop.x, khop.y); ctx.lineTo(d0.x, d0.y); ctx.stroke(); }
            }

            // ---------- TA AO QUY & DUOI QUY ----------
            ctx.fillStyle = THAN;
            ctx.beginPath();
            ctx.moveTo(cxb - 15, y + 40);
            ctx.quadraticCurveTo(cxb - 48, y + 68, cxb - 34, y + H);
            ctx.lineTo(cxb + 2, y + H - 4); ctx.lineTo(cxb + 2, y + 40);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = XANH; ctx.lineWidth = 1.4;
            ctx.beginPath(); ctx.moveTo(cxb - 14, y + 42); ctx.quadraticCurveTo(cxb - 40, y + 66, cxb - 30, y + H - 2); ctx.stroke();

            // ---------- CHAN QUY ----------
            for (let s = -1; s <= 1; s += 2){
                let hx = cxb + s * 9;
                ctx.fillStyle = THAN;
                ctx.beginPath(); ctx.moveTo(hx - 7, y + 56); ctx.lineTo(hx + 7, y + 56); ctx.lineTo(hx + 9 + s * 2, y + 70);
                ctx.lineTo(hx + 5, y + H - 3); ctx.lineTo(hx - 5, y + H - 3); ctx.lineTo(hx - 7, y + 68); ctx.closePath(); ctx.fill();
                ctx.fillStyle = GIAP; ctx.fillRect(hx - 5, y + 59, 10, 6);
                ctx.strokeStyle = "rgba(0,229,255," + (0.8 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.3;
                ctx.beginPath(); ctx.moveTo(hx, y + 65); ctx.lineTo(hx + s * 2, y + 79); ctx.stroke();
            }

            // ---------- THAN GIAP VAY RONG + LOI LINH HON XANH ----------
            ctx.fillStyle = THAN;
            ctx.beginPath(); ctx.moveTo(cxb - 21, y + 18); ctx.lineTo(cxb + 21, y + 18); ctx.lineTo(cxb + 16, y + 42);
            ctx.lineTo(cxb + 11, y + 58); ctx.lineTo(cxb - 11, y + 58); ctx.lineTo(cxb - 16, y + 42); ctx.closePath(); ctx.fill();

            ctx.fillStyle = GIAP;
            ctx.beginPath(); ctx.moveTo(cxb - 18, y + 20); ctx.lineTo(cxb - 3, y + 22); ctx.lineTo(cxb - 5, y + 36); ctx.lineTo(cxb - 15, y + 33); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cxb + 18, y + 20); ctx.lineTo(cxb + 3, y + 22); ctx.lineTo(cxb + 5, y + 36); ctx.lineTo(cxb + 15, y + 33); ctx.closePath(); ctx.fill();

            // Mach nang luong xanh lam tren nguc
            ctx.strokeStyle = "rgba(0, 229, 255, " + (0.9 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(cxb, y + 34); ctx.lineTo(cxb - 6, y + 45); ctx.lineTo(cxb - 3, y + 55);
            ctx.moveTo(cxb, y + 34); ctx.lineTo(cxb + 6, y + 45); ctx.lineTo(cxb + 3, y + 55);
            ctx.moveTo(cxb - 12, y + 24); ctx.lineTo(cxb - 15, y + 35);
            ctx.moveTo(cxb + 12, y + 24); ctx.lineTo(cxb + 15, y + 35);
            ctx.stroke();

            // Loi nguc SDT xanh ngoc bích
            ctx.fillStyle = "rgba(0, 229, 255, " + (0.45 * nh).toFixed(2) + ")"; ctx.beginPath(); ctx.arc(cxb, y + 29, 9, 0, 6.28); ctx.fill();
            ctx.fillStyle = "#E0F7FA"; ctx.beginPath(); ctx.moveTo(cxb, y + 23); ctx.lineTo(cxb + 4.5, y + 29); ctx.lineTo(cxb, y + 35); ctx.lineTo(cxb - 4.5, y + 29); ctx.closePath(); ctx.fill();

            // ---------- VAI GAI QUY + ONG KHOI NANG LUONG XANH ----------
            for (let s = -1; s <= 1; s += 2){
                ctx.fillStyle = VIEN;
                ctx.beginPath(); ctx.moveTo(cxb + s * 12, y + 14); ctx.quadraticCurveTo(cxb + s * 30, y + 10, cxb + s * 28, y + 26); ctx.lineTo(cxb + s * 15, y + 24); ctx.closePath(); ctx.fill();
                ctx.fillStyle = XANH;
                ctx.beginPath(); ctx.moveTo(cxb + s * 22, y + 14); ctx.lineTo(cxb + s * 35, y + 2); ctx.lineTo(cxb + s * 26, y + 18); ctx.closePath(); ctx.fill();
            }

            // ---------- TAY SAU + LUOI KIEM PHU ----------
            ctx.save(); ctx.translate(cxb - 20, y + 26); ctx.rotate(b.armL || 0.25);
            ctx.fillStyle = THAN; ctx.fillRect(-4, 0, 8, 24); ctx.fillStyle = GIAP; ctx.fillRect(-5, 10, 10, 6);
            ctx.fillStyle = XANH; ctx.beginPath(); ctx.moveTo(-3, 20); ctx.lineTo(0, 38); ctx.lineTo(3, 20); ctx.closePath(); ctx.fill();
            ctx.restore();

            // ---------- DAU QUY VERGIL: VUONG MIEN SUNG DOI + LUOI ANH SANG XANH ----------
            ctx.fillStyle = THAN;
            ctx.beginPath(); ctx.moveTo(cxb - 9, y + 16); ctx.lineTo(cxb - 10, y + 1); ctx.lineTo(cxb + 10, y + 1); ctx.lineTo(cxb + 12, y + 9); ctx.lineTo(cxb + 4, y + 18); ctx.closePath(); ctx.fill();
            // Hai sung vuong mien uon cong vut len va ra sau
            for (let k = 0; k < 2; k++){
                let o = k * 5;
                ctx.fillStyle = k ? GIAP : VIEN;
                ctx.beginPath();
                ctx.moveTo(cxb - 3 + o, y);
                ctx.quadraticCurveTo(cxb - 16 + o, y - 20, cxb - 34 + o, y - 24);
                ctx.quadraticCurveTo(cxb - 18 + o, y - 10, cxb - 6 + o, y + 3);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = XANH; ctx.lineWidth = 1.3;
                ctx.beginPath(); ctx.moveTo(cxb - 3 + o, y); ctx.quadraticCurveTo(cxb - 16 + o, y - 20, cxb - 34 + o, y - 24); ctx.stroke();
            }
            // Lua linh hon xanh chay nguoc tu dau
            let gio = Math.sin(frames * 0.14) * 3;
            ctx.fillStyle = "rgba(0, 229, 255, 0.75)";
            ctx.beginPath(); ctx.moveTo(cxb - 2, y - 2); ctx.quadraticCurveTo(cxb - 20, y - 6 + gio, cxb - 30, y + 5 + gio);
            ctx.lineTo(cxb - 10, y + 10); ctx.closePath(); ctx.fill();
            // Mat sang ruc
            ctx.fillStyle = "#FF1744"; ctx.fillRect(cxb + 2, y + 6, 8, 2.5);
            ctx.fillStyle = "#FFFFFF"; ctx.fillRect(cxb + 6, y + 6.5, 2.5, 1.5);

            // ---------- TAY TRUOC + THANH YAMATO NANG LUONG KHONG LO ----------
            let ar = b.armR || 0;
            ctx.save(); ctx.translate(cxb + 20, y + 26); ctx.rotate(ar);
            ctx.fillStyle = THAN; ctx.fillRect(-4, 0, 9, 24); ctx.fillStyle = VIEN; ctx.fillRect(-5, 9, 11, 6);
            if (b.drawn){
                ctx.translate(0, 24); ctx.rotate(-1.0);
                ctx.shadowColor = XANH; ctx.shadowBlur = 18;
                // Hao quang luoi kiem SDT
                ctx.fillStyle = "rgba(0, 229, 255, 0.28)"; ctx.fillRect(-8, -104, 16, 98);
                let g2 = ctx.createLinearGradient(0, 0, 0, -102);
                g2.addColorStop(0, "#FFFFFF"); g2.addColorStop(0.5, "#80D8FF"); g2.addColorStop(1, "#7C4DFF");
                ctx.fillStyle = g2;
                ctx.beginPath();
                ctx.moveTo(-4.5, -4); ctx.lineTo(-5.5, -86); ctx.lineTo(0, -106);
                ctx.lineTo(5.5, -86); ctx.lineTo(4.5, -4);
                ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FFFFFF"; ctx.fillRect(-1.2, -96, 2.4, 88);
            } else {
                ctx.fillStyle = XANH; ctx.beginPath(); ctx.moveTo(-3, 22); ctx.lineTo(0, 38); ctx.lineTo(4, 22); ctx.closePath(); ctx.fill();
            }
            ctx.restore();
            ctx.restore();
        }
// BOSS_PART_END s0.drawSinVergil.1

// Nguồn: index.html:25126 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_W.1 EDITABLE
const DT_W = 40, DT_H = 60;
// BOSS_PART_END s0.DT_W.1

// Nguồn: index.html:25127 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_ARMS.1 EDITABLE
const DT_ARMS = [
            { n: 'DEVIL SWORD DANTE', c: '#E53935', d: '#7F0000' },
            { n: 'BALROG',            c: '#FF6D00', d: '#7F2100' },
            { n: 'CAVALIERE',         c: '#B0BEC5', d: '#37474F' },
            { n: 'KING CERBERUS',     c: '#4FC3F7', d: '#01579B' },
            { n: 'EBONY & IVORY',     c: '#FFD54F', d: '#795548' },
            { n: 'DR. FAUST',         c: '#EF5350', d: '#B71C1C' }
        ];
// BOSS_PART_END s0.DT_ARMS.1

// Nguồn: index.html:25135 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_SWITCH.1 EDITABLE
const DT_SWITCH = 460;
// BOSS_PART_END s0.DT_SWITCH.1

// Nguồn: index.html:25631 · Dùng bởi: DanteBoss, VergilBoss
// BOSS_PART_BEGIN s0.drawSdtDante.1 EDITABLE
function drawSdtDante(b, x, y){
            if (b._sdtDrill?.phase === 'dash') { danteDrawSinDrill(x + 33, y + 44, b._sdtDrill.dir, b._sdtDrill.age); return; }
            if (b._sdtDrill?.phase === 'gap') return;
            let dr = b.facingLeft ? -1 : 1, W = 66, H = 88, cxb = x + W/2;
            const DEN = "#110507", THAN = "#24080C", DO = "#5E0F16", DO2 = "#9A1B21", NHAM = "#FF6D00", VANG = "#FFC400", TOC = "#EEF1F4";
            let wf = Math.sin(b.wing || 0), nh = 0.65 + 0.35 * Math.sin(frames * 0.16);
            ctx.save();
            ctx.translate(cxb, y); ctx.scale(dr, 1); ctx.translate(-cxb, -y);

            // ---------- HAO QUANG LUA DIA NGUC DUOI CHAN ----------
            let ag = ctx.createRadialGradient(cxb, y + 42, 6, cxb, y + 42, 64);
            ag.addColorStop(0, "rgba(255, 109, 0, " + (0.32 * nh).toFixed(2) + ")");
            ag.addColorStop(1, "rgba(255, 23, 68, 0)");
            ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(cxb, y + 42, 64, 0, 6.28); ctx.fill();

            // ---------- DOI CANH QUY 4 NHANH KHONG LO ----------
            for (let s = -1; s <= 1; s += 2){
                let vai = { x: cxb - 6 * s, y: y + 24 };
                let khop = { x: cxb + s * (-38 - 7 * wf), y: y - 18 - 11 * wf };
                let dinh = [
                    { x: cxb + s * (-78 - 9 * wf), y: y - 8 - 14 * wf },
                    { x: cxb + s * (-84 - 7 * wf), y: y + 28 - 6 * wf },
                    { x: cxb + s * (-64 - 4 * wf), y: y + 66 }
                ];
                // Mang canh ruc lua
                let wg = ctx.createLinearGradient(vai.x, vai.y, dinh[0].x, dinh[2].y);
                wg.addColorStop(0, "rgba(95, 10, 18, 0.94)");
                wg.addColorStop(0.7, "rgba(45, 5, 10, 0.88)");
                wg.addColorStop(1, "rgba(255, 109, 0, 0.55)");
                ctx.fillStyle = wg;
                ctx.beginPath(); ctx.moveTo(vai.x, vai.y); ctx.lineTo(khop.x, khop.y);
                for (let k = 0; k < 3; k++){
                    let d0 = dinh[k], d1 = dinh[k + 1] || { x: cxb - s * 14, y: y + 58 };
                    ctx.lineTo(d0.x, d0.y);
                    ctx.quadraticCurveTo((d0.x + d1.x) / 2 + s * 6, (d0.y + d1.y) / 2 - 6, d1.x, d1.y);
                }
                ctx.closePath(); ctx.fill();
                // Vien sang mep mang
                ctx.strokeStyle = "rgba(255,145,0," + (0.7 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.8; ctx.stroke();
                // Xuong canh den + ranh nham
                ctx.strokeStyle = DEN; ctx.lineWidth = 4.5; ctx.lineCap = "round";
                ctx.beginPath(); ctx.moveTo(vai.x, vai.y); ctx.lineTo(khop.x, khop.y); ctx.stroke();
                ctx.lineWidth = 2.8;
                for (const d0 of dinh){ ctx.beginPath(); ctx.moveTo(khop.x, khop.y); ctx.lineTo(d0.x, d0.y); ctx.stroke(); }
                // Vuot vang o khop canh
                ctx.fillStyle = VANG;
                ctx.beginPath(); ctx.moveTo(khop.x, khop.y); ctx.lineTo(khop.x - s * 4, khop.y - 11); ctx.lineTo(khop.x + s * 3, khop.y - 1); ctx.closePath(); ctx.fill();
            }

            // ---------- DUOI GAI QUY ----------
            ctx.strokeStyle = THAN; ctx.lineWidth = 6.5; ctx.lineCap = "round";
            let dq = Math.sin(frames * 0.09) * 6;
            ctx.beginPath(); ctx.moveTo(cxb - 6, y + 58); ctx.quadraticCurveTo(cxb - 38, y + 72 + dq, cxb - 54, y + 56 + dq); ctx.stroke();
            ctx.fillStyle = NHAM;
            ctx.beginPath(); ctx.moveTo(cxb - 54, y + 56 + dq); ctx.lineTo(cxb - 66, y + 48 + dq); ctx.lineTo(cxb - 56, y + 63 + dq); ctx.closePath(); ctx.fill();

            // ---------- CHAN QUY ----------
            for (let s = -1; s <= 1; s += 2){
                let hx = cxb + s * 9;
                ctx.fillStyle = THAN;
                ctx.beginPath(); ctx.moveTo(hx - 7, y + 56); ctx.lineTo(hx + 7, y + 56); ctx.lineTo(hx + 9 + s * 2, y + 70);
                ctx.lineTo(hx + 3, y + 80); ctx.lineTo(hx + 6, y + H - 3); ctx.lineTo(hx - 4, y + H - 3); ctx.lineTo(hx - 6, y + 78); ctx.lineTo(hx - 8, y + 68); ctx.closePath(); ctx.fill();
                ctx.fillStyle = DO2; ctx.fillRect(hx - 5, y + 60, 10, 6);
                ctx.fillStyle = DEN;
                ctx.beginPath(); ctx.moveTo(hx - 6, y + H - 4); ctx.lineTo(hx + 13, y + H - 2); ctx.lineTo(hx - 6, y + H + 1); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "rgba(255,145,0," + (0.85 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(hx - 2, y + 65); ctx.lineTo(hx + 2, y + 73); ctx.lineTo(hx - 1, y + 81); ctx.stroke();
            }

            // ---------- THAN QUY + LOI NANG LUONG NGUC ----------
            ctx.fillStyle = THAN;
            ctx.beginPath(); ctx.moveTo(cxb - 22, y + 18); ctx.lineTo(cxb + 22, y + 18); ctx.lineTo(cxb + 16, y + 42);
            ctx.lineTo(cxb + 11, y + 58); ctx.lineTo(cxb - 11, y + 58); ctx.lineTo(cxb - 16, y + 42); ctx.closePath(); ctx.fill();
            // Giap nguc vay rong
            ctx.fillStyle = DO;
            ctx.beginPath(); ctx.moveTo(cxb - 18, y + 20); ctx.lineTo(cxb - 3, y + 22); ctx.lineTo(cxb - 5, y + 36); ctx.lineTo(cxb - 15, y + 33); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cxb + 18, y + 20); ctx.lineTo(cxb + 3, y + 22); ctx.lineTo(cxb + 5, y + 36); ctx.lineTo(cxb + 15, y + 33); ctx.closePath(); ctx.fill();
            for (let k = 0; k < 3; k++){ ctx.fillStyle = k % 2 ? DO : DO2; ctx.fillRect(cxb - 8, y + 40 + k * 5, 16 - k * 2, 3.2); }
            // Khe dung nham ruc sang
            ctx.strokeStyle = "rgba(255,145,0," + (0.9 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(cxb, y + 34); ctx.lineTo(cxb - 6, y + 44); ctx.lineTo(cxb - 3, y + 54);
            ctx.moveTo(cxb, y + 34); ctx.lineTo(cxb + 7, y + 43); ctx.lineTo(cxb + 4, y + 52);
            ctx.moveTo(cxb - 12, y + 24); ctx.lineTo(cxb - 16, y + 34);
            ctx.moveTo(cxb + 12, y + 24); ctx.lineTo(cxb + 16, y + 34);
            ctx.stroke();
            // Loi sang Sin Devil Trigger giua nguc
            ctx.fillStyle = "rgba(255,109,0," + (0.45 * nh).toFixed(2) + ")"; ctx.beginPath(); ctx.arc(cxb, y + 30, 10, 0, 6.28); ctx.fill();
            ctx.fillStyle = VANG; ctx.beginPath(); ctx.moveTo(cxb, y + 23); ctx.lineTo(cxb + 5, y + 30); ctx.lineTo(cxb, y + 37); ctx.lineTo(cxb - 5, y + 30); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#FFFFFF"; ctx.fillRect(cxb - 1.5, y + 28.5, 3, 3);

            // ---------- VAI GAI ----------
            for (let s = -1; s <= 1; s += 2){
                ctx.fillStyle = DO2;
                ctx.beginPath(); ctx.moveTo(cxb + s * 12, y + 14); ctx.quadraticCurveTo(cxb + s * 30, y + 11, cxb + s * 28, y + 26); ctx.lineTo(cxb + s * 16, y + 24); ctx.closePath(); ctx.fill();
                ctx.fillStyle = DEN;
                ctx.beginPath(); ctx.moveTo(cxb + s * 22, y + 14); ctx.lineTo(cxb + s * 36, y + 3); ctx.lineTo(cxb + s * 26, y + 18); ctx.closePath(); ctx.fill();
            }

            // ---------- TAY SAU ----------
            ctx.save(); ctx.translate(cxb - 21, y + 26); ctx.rotate(b.armL || 0.25);
            ctx.fillStyle = THAN; ctx.fillRect(-4, 0, 8, 24); ctx.fillStyle = DO; ctx.fillRect(-5, 10, 10, 6);
            ctx.fillStyle = NHAM; ctx.beginPath(); ctx.moveTo(-4, 24); ctx.lineTo(0, 33); ctx.lineTo(4, 24); ctx.closePath(); ctx.fill();
            ctx.restore();

            // ---------- DAU QUY: BOM TOC TRANG + SUNG DAI CONG VUT ----------
            let gio = Math.sin(frames * 0.12) * 2.5;
            ctx.fillStyle = TOC;
            ctx.beginPath(); ctx.moveTo(cxb - 2, y - 2); ctx.quadraticCurveTo(cxb - 22, y - 5 + gio, cxb - 33, y + 6 + gio);
            ctx.lineTo(cxb - 24, y + 8 + gio); ctx.lineTo(cxb - 34, y + 16 + gio); ctx.quadraticCurveTo(cxb - 16, y + 14, cxb - 6, y + 12); ctx.closePath(); ctx.fill();
            ctx.fillStyle = THAN;
            ctx.beginPath(); ctx.moveTo(cxb - 9, y + 16); ctx.lineTo(cxb - 10, y + 2); ctx.lineTo(cxb - 2, y - 4); ctx.lineTo(cxb + 8, y - 2);
            ctx.lineTo(cxb + 13, y + 6); ctx.lineTo(cxb + 9, y + 12); ctx.lineTo(cxb + 3, y + 18); ctx.closePath(); ctx.fill();
            ctx.fillStyle = DO2; ctx.beginPath(); ctx.moveTo(cxb + 3, y + 12); ctx.lineTo(cxb + 13, y + 7); ctx.lineTo(cxb + 9, y + 14); ctx.closePath(); ctx.fill();
            for (let k = 0; k < 2; k++){
                let o = k * 5;
                ctx.fillStyle = k ? DEN : "#3B1418";
                ctx.beginPath(); ctx.moveTo(cxb - 2 + o, y - 1); ctx.quadraticCurveTo(cxb - 20 + o, y - 22, cxb - 40 + o, y - 25);
                ctx.quadraticCurveTo(cxb - 22 + o, y - 12, cxb - 6 + o, y + 3); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = k ? "rgba(255,145,0," + (0.85 * nh).toFixed(2) + ")" : DO2; ctx.lineWidth = 1.4;
                ctx.beginPath(); ctx.moveTo(cxb - 2 + o, y - 1); ctx.quadraticCurveTo(cxb - 20 + o, y - 22, cxb - 40 + o, y - 25); ctx.stroke();
            }
            ctx.fillStyle = VANG; ctx.beginPath(); ctx.moveTo(cxb + 3, y + 6); ctx.lineTo(cxb + 12, y + 4); ctx.lineTo(cxb + 10, y + 7); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#FFF"; ctx.fillRect(cxb + 8, y + 5, 2, 1.5);

            // ---------- TAY TRUOC + DEVIL SWORD DANTE AWAKENED (Mở tách đôi lưỡi kiếm) ----------
            ctx.save(); ctx.translate(cxb + 21, y + 26); ctx.rotate(b.armR || 0);
            ctx.fillStyle = THAN; ctx.fillRect(-4, 0, 9, 24); ctx.fillStyle = DO2; ctx.fillRect(-5, 9, 11, 6);
            ctx.strokeStyle = "rgba(255,145,0," + (0.85 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(0, 3); ctx.lineTo(2, 20); ctx.stroke();
            if (b.drawn){
                ctx.translate(0, 26); ctx.rotate(-1.0);
                ctx.fillStyle = "#1B0A0A"; ctx.fillRect(-3, -2, 6, 14);
                ctx.fillStyle = DO2; ctx.beginPath(); ctx.moveTo(-12, -2); ctx.lineTo(12, -2); ctx.lineTo(7, -11); ctx.lineTo(-7, -11); ctx.closePath(); ctx.fill();
                ctx.fillStyle = VANG; ctx.fillRect(-3.5, -8, 2.5, 2.5); ctx.fillRect(1, -8, 2.5, 2.5);
                // Hao quang luoi kiem
                ctx.fillStyle = "rgba(255,61,0,0.34)"; ctx.fillRect(-10, -108, 20, 100);
                // Hai nhanh luoi kiem mo tach + Loi nang luong o giua
                ctx.fillStyle = "#1A0A0C";
                ctx.beginPath();
                ctx.moveTo(-7, -10); ctx.lineTo(-8, -88); ctx.lineTo(0, -108);
                ctx.lineTo(8, -88); ctx.lineTo(7, -10); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#FF3D00"; ctx.lineWidth = 2.2; ctx.stroke();
                ctx.fillStyle = "#FFAB00"; ctx.fillRect(-2, -96, 4, 82);
                ctx.fillStyle = "#FFFFFF"; ctx.fillRect(-0.8, -92, 1.6, 74);
            } else {
                ctx.fillStyle = NHAM; ctx.beginPath(); ctx.moveTo(-4, 24); ctx.lineTo(0, 33); ctx.lineTo(5, 24); ctx.closePath(); ctx.fill();
            }
            ctx.restore();
            ctx.restore();
        }
// BOSS_PART_END s0.drawSdtDante.1

// Nguồn: index.html:26335 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.dthQuetNgang.1 EDITABLE
function dthQuetNgang(cx, nuaRong, dat){
            if (typeof dino === 'undefined' || !dino || dino.isCrouching) return false;
            let d = dat || 320;
            return dino.x + dino.w > cx - nuaRong && dino.x < cx + nuaRong
                && dino.y + dino.h > d - DTH_NGANG_TREN && dino.y < d - DTH_NGANG_DUOI;
        }
// BOSS_PART_END s0.dthQuetNgang.1

// Nguồn: index.html:26347 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.RP_CD.1 EDITABLE
const RP_CD = { r_combo: 70, r_harv: 260, r_luot: 150, r_moc: 220, r_bo: 200, r_nhay: 200, p_reap: 540 };
// BOSS_PART_END s0.RP_CD.1

// Nguồn: index.html:26712 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.RP_TIM.1 EDITABLE
let RP_TIM = false, RP_ALPHA = 1;
// BOSS_PART_END s0.RP_TIM.1

// Nguồn: index.html:26713 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.drawReaperDeath.1 EDITABLE
function drawReaperDeath(b, x, y){
            let dr = b.facingLeft ? -1 : 1, W = 92, H = 108, cxb = x + W/2;
            let t = frames * 0.08, gio = Math.sin(t);
            let mainGlow = RP_TIM ? "#CE93D8" : "#69F0AE";

            ctx.save();
            ctx.translate(cxb, y); ctx.scale(dr, 1); ctx.translate(-cxb, -y);

            // 1. Hào quang linh hồn Tử Thần
            ctx.globalAlpha = 0.16 * RP_ALPHA; ctx.fillStyle = mainGlow;
            ctx.beginPath(); ctx.ellipse(cxb, y + H*0.55, W*0.54, H*0.58, 0, 0, 6.28); ctx.fill();

            // 2. ĐÔI CÁNH KHÓI LINH HỒN ĐEN RÁCH TẢ TƠI (Ethereal Wraith Wings)
            ctx.globalAlpha = 0.68 * RP_ALPHA;
            for (let s = -1; s <= 1; s += 2){
                ctx.fillStyle = RP_TIM ? "#1A0B2E" : "#0A0E17";
                ctx.beginPath();
                ctx.moveTo(cxb - s * 6, y + 24);
                ctx.quadraticCurveTo(cxb - s * (58 + gio * 6), y - 16 - gio * 8, cxb - s * (78 + gio * 8), y + 18);
                ctx.quadraticCurveTo(cxb - s * 54, y + 36, cxb - s * (68 + gio * 5), y + 58);
                ctx.quadraticCurveTo(cxb - s * 38, y + 52, cxb - s * 14, y + 48);
                ctx.closePath(); ctx.fill();

                ctx.strokeStyle = mainGlow; ctx.lineWidth = 1.6;
                ctx.beginPath();
                ctx.moveTo(cxb - s * 8, y + 24);
                ctx.quadraticCurveTo(cxb - s * (54 + gio * 6), y - 12 - gio * 8, cxb - s * (76 + gio * 8), y + 18);
                ctx.stroke();
            }
            ctx.globalAlpha = RP_ALPHA;

            // 3. ÁO CHOÀNG RÁCH PHÍA SAU (Tua vải bay theo gió âm giới)
            ctx.fillStyle = RP_TIM ? "#190C26" : "#0B0E14";
            ctx.beginPath();
            ctx.moveTo(cxb - 22, y + 26);
            ctx.quadraticCurveTo(cxb - 42, y + 70, cxb - 38 - gio * 4, y + H + 4);
            for (let k = 0; k <= 6; k++){
                let px = cxb - 38 + k * 12.5 - gio * 4 * (1 - k / 6), py = y + H + 4 + (k % 2 ? -15 : 7) + Math.sin(t * 1.6 + k) * 4;
                ctx.lineTo(px, py);
            }
            ctx.quadraticCurveTo(cxb + 36, y + 70, cxb + 22, y + 26);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = RP_TIM ? "#190C26" : "#0B0E14"; ctx.lineWidth = 3; ctx.lineCap = "round";
            for (let k = 0; k < 4; k++){
                let bx = cxb - 28 + k * 16;
                ctx.beginPath(); ctx.moveTo(bx, y + H - 4);
                ctx.quadraticCurveTo(bx - 6 - gio * 6, y + H + 12, bx - 12 - gio * 10, y + H + 20 + (k % 2) * 6); ctx.stroke();
            }

            // 4. LỒNG NGỰC XƯƠNG SƯỜN HỞ + LÕI LỬA LINH HỒN
            ctx.fillStyle = "#06070B";
            ctx.beginPath(); ctx.moveTo(cxb - 14, y + 30); ctx.lineTo(cxb + 14, y + 30); ctx.lineTo(cxb + 9, y + 70); ctx.lineTo(cxb - 9, y + 70); ctx.closePath(); ctx.fill();
            // Loi linh hon dap theo nhip tim
            ctx.fillStyle = (RP_TIM ? "rgba(224,64,251," : "rgba(0,230,118,") + "0.42)";
            ctx.beginPath(); ctx.arc(cxb, y + 48, 6 + Math.sin(t * 2.2) * 1.8, 0, 6.28); ctx.fill();
            // Cot song & xuong suon trang nga
            ctx.strokeStyle = "#C8C2B0"; ctx.lineWidth = 2.4;
            ctx.beginPath(); ctx.moveTo(cxb, y + 32); ctx.lineTo(cxb, y + 70); ctx.stroke();
            for (let k = 0; k < 5; k++){
                let yy = y + 36 + k * 6.5, r = 11.5 - k * 1.1;
                ctx.beginPath(); ctx.moveTo(cxb, yy); ctx.quadraticCurveTo(cxb - r, yy + 1, cxb - r + 1, yy + 5); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(cxb, yy); ctx.quadraticCurveTo(cxb + r, yy + 1, cxb + r - 1, yy + 5); ctx.stroke();
            }
            ctx.fillStyle = "#151821";
            ctx.beginPath(); ctx.moveTo(cxb - 23, y + 28); ctx.lineTo(cxb - 12, y + 30); ctx.lineTo(cxb - 9, y + 72); ctx.lineTo(cxb - 25, y + 80); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cxb + 23, y + 28); ctx.lineTo(cxb + 12, y + 30); ctx.lineTo(cxb + 9, y + 72); ctx.lineTo(cxb + 25, y + 80); ctx.closePath(); ctx.fill();

            // 5. ĐẠI LIỀM TỬ THẦN KHỔNG LỒ
            let ngang = (b.quayNgang !== undefined && b.quayNgang !== null);
            let goc = (b.armVe !== undefined ? b.armVe : (b.armR || 0)) - 0.5, px0 = cxb + 24, py0 = y + 56;
            let ca = Math.cos(goc), sa = Math.sin(goc);
            let quay = (lx, ly) => ({ x: px0 + lx * ca - ly * sa, y: py0 + lx * sa + ly * ca });
            let tay1 = quay(0, 0), tay2 = quay(0, -28);
            let luoi = b.luoi || 'thuong', dinh = null;
            if (ngang){
                let th = b.quayNgang, cy0 = y + 62, c = Math.cos(th), s = Math.sin(th);
                tay1 = { x: cxb + c * 12, y: cy0 }; tay2 = { x: cxb - c * 12, y: cy0 + 2 };
                b._ngang = { th: th, cy0: cy0, c: c, s: s };
                if (s < 0) veLuoiNgang(cxb, cy0, c, s);
            }
            veTayXuong(cxb - 14, y + 32, tay2.x, tay2.y, -1);
            if (!b.khongLuoi && !ngang){
                ctx.save();
                ctx.translate(px0, py0); ctx.rotate(goc);
                // Can xuong cot song khong lo
                ctx.fillStyle = "#23201C"; ctx.fillRect(-3.8, -104, 7.6, 166);
                ctx.fillStyle = "#C8C2B0"; for (const yy of [-75, -45, -15, 15, 40]) ctx.fillRect(-4.8, yy, 9.6, 3.5);
                ctx.save();
                ctx.translate(0, -100);
                if (luoi === 'dai') ctx.scale(1.35, 1.35);
                else if (luoi === 'luot'){ ctx.rotate(0.55); ctx.scale(0.9, 1.05); }
                else if (luoi === 'moc') ctx.scale(0.72, 1.28);
                ctx.translate(0, 100);
                if (b.nguoc) ctx.scale(-1, 1);

                let lg = ctx.createLinearGradient(0, -110, 110, -20);
                lg.addColorStop(0, "#546E7A"); lg.addColorStop(0.5, "#ECEFF1"); lg.addColorStop(1, "#90A4AE");
                ctx.fillStyle = lg;
                ctx.beginPath();
                ctx.moveTo(-4, -108);
                ctx.quadraticCurveTo(72, -130, 120, -44);
                ctx.quadraticCurveTo(124, -28, 114, -10);
                if (luoi === 'moc'){ ctx.quadraticCurveTo(104, 4, 90, 2); ctx.quadraticCurveTo(104, -8, 100, -22); }
                ctx.quadraticCurveTo(96, -60, 40, -84);
                ctx.quadraticCurveTo(16, -90, -4, -86);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#263238"; ctx.lineWidth = 1.5; ctx.stroke();
                ctx.strokeStyle = luoi === 'dai' ? (RP_TIM?"rgba(224,64,251,":"rgba(105,240,174,")+"0.95)" : (RP_TIM?"rgba(186,104,200,":"rgba(105,240,174,")+"0.85)";
                ctx.lineWidth = luoi === 'dai' ? 3.8 : 2.2;
                ctx.beginPath(); ctx.moveTo(112, -12); ctx.quadraticCurveTo(95, -58, 40, -82); ctx.stroke();

                if (b.loeT > 0){
                    ctx.save(); ctx.globalCompositeOperation = 'lighter';
                    let k = Math.min(1, b.loeT / 10);
                    ctx.fillStyle = (RP_TIM?"rgba(206,147,216,":"rgba(105,240,174,")+"" + (0.55 * k).toFixed(2) + ")";
                    ctx.beginPath(); ctx.arc(70, -60, 34 + (1 - k) * 18, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = (RP_TIM?"rgba(243,229,245,":"rgba(230,255,235,")+"" + k.toFixed(2) + ")"; ctx.lineWidth = 2;
                    for (let q = 0; q < 4; q++){ let a = q * Math.PI / 4 + frames * 0.2; ctx.beginPath(); ctx.moveTo(70 - Math.cos(a) * 40, -60 - Math.sin(a) * 40); ctx.lineTo(70 + Math.cos(a) * 40, -60 + Math.sin(a) * 40); ctx.stroke(); }
                    ctx.restore();
                }
                ctx.restore();
                // Khop dau lau giua luoi hai khong lo
                ctx.fillStyle = "#C8C2B0"; ctx.beginPath(); ctx.arc(0, -98, 9, 0, 6.28); ctx.fill();
                ctx.fillStyle = mainGlow; ctx.fillRect(-4, -100, 3, 3); ctx.fillRect(2, -100, 3, 3);
                ctx.restore();
                let sc = luoi === 'dai' ? 1.35 : 1, tl = { x: (b.nguoc ? -112 : 112) * sc, y: -100 + 90 * sc };
                let rx = tl.x * ca - tl.y * sa, ry = tl.x * sa + tl.y * ca;
                dinh = { x: cxb + dr * ((px0 - cxb) + rx), y: py0 + ry };
            }
            if (ngang && b.loeT > 0){
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = (RP_TIM?"rgba(206,147,216,":"rgba(105,240,174,")+"" + (0.5 * Math.min(1, b.loeT / 10)).toFixed(2) + ")";
                ctx.beginPath(); ctx.ellipse(cxb, y + 62, 90, 18, 0, 0, 6.28); ctx.fill(); ctx.restore();
            }

            // 6. MŨ TRÙM TỬ THẦN SÂU HUN HÚT + GAI XƯƠNG VAI
            ctx.fillStyle = "#B0A896";
            for (let s2 of [-1, 1]){
                ctx.beginPath(); ctx.moveTo(cxb + s2 * 18, y + 28); ctx.lineTo(cxb + s2 * 36, y + 14); ctx.lineTo(cxb + s2 * 26, y + 36); ctx.closePath(); ctx.fill();
            }
            ctx.fillStyle = RP_TIM ? "#221231" : "#10131B";
            ctx.beginPath();
            ctx.moveTo(cxb - 25, y + 36);
            ctx.quadraticCurveTo(cxb - 27, y + 2, cxb - 2, y - 12);
            ctx.quadraticCurveTo(cxb + 23, y + 2, cxb + 25, y + 34);
            ctx.quadraticCurveTo(cxb, y + 28, cxb - 25, y + 36); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#020203";
            ctx.beginPath(); ctx.ellipse(cxb + 4, y + 18, 11.5, 13.5, 0.1, 0, 6.28); ctx.fill();
            ctx.strokeStyle = "#262B38"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.ellipse(cxb + 4, y + 18, 12.5, 14.5, 0.1, -2.4, 0.9); ctx.stroke();

            if (ngang && b._ngang.s >= 0) veLuoiNgang(cxb, b._ngang.cy0, b._ngang.c, b._ngang.s);
            veTayXuong(cxb + 14, y + 32, tay1.x, tay1.y, 1);
            ctx.restore();
            return dinh;
        }
// BOSS_PART_END s0.drawReaperDeath.1

// Nguồn: index.html:29206 · Dùng bởi: ZeroBoss
// BOSS_PART_BEGIN s0.ZX_HP.1 EDITABLE
const ZX_HP = 140;
// BOSS_PART_END s0.ZX_HP.1

// Nguồn: index.html:29216 · Dùng bởi: MegaManXBoss, ThalassaBoss, ZeroBoss
// BOSS_PART_BEGIN s0.BOSS_NGHI.1 EDITABLE
const BOSS_NGHI = { x: 40, xGiap: 34, xUlt: 28, zero: 38, sauChuoi: 20, chuoiMax: 3, tl1: 40, tl2: 30, tlThem: 16 };
// BOSS_PART_END s0.BOSS_NGHI.1

// Nguồn: index.html:30383 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MMX_HP.1 EDITABLE
const MMX_HP = 160;
// BOSS_PART_END s0.MMX_HP.1

// Nguồn: index.html:30384 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MMX_VK.1 EDITABLE
const MMX_VK = ['cshot', 'goo', 'tri', 'flaser', 'dark', 'wing', 'fire', 'spike'];
// BOSS_PART_END s0.MMX_VK.1

// Nguồn: index.html:30385 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MMX_VK_TEN.1 EDITABLE
const MMX_VK_TEN = { cshot: 'C-SHOT', goo: 'GOO SHAVER', tri: 'TRI-THUNDER', flaser: 'F-LASER',
                     dark: 'DARK HOLD', wing: 'WING SPIRAL', fire: 'GROUND FIRE', spike: 'SPIKE BALL' };
// BOSS_PART_END s0.MMX_VK_TEN.1

// Nguồn: index.html:30391 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MMX_GIAP_TEN.1 EDITABLE
const MMX_GIAP_TEN = { thuong: 'MEGA MAN X', fourth: 'X — FOURTH ARMOR', falcon: 'X — FALCON ARMOR',
                       gaea: 'X — GAEA ARMOR', ultimate: 'X — ULTIMATE ARMOR' };
// BOSS_PART_END s0.MMX_GIAP_TEN.1

// Nguồn: index.html:30393 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MMX_GIAP_MAU.1 EDITABLE
const MMX_GIAP_MAU = { thuong: '#42A5F5', fourth: '#EF5350', falcon: '#E0E0E0', gaea: '#FF8F00', ultimate: '#B388FF' };
// BOSS_PART_END s0.MMX_GIAP_MAU.1

// Nguồn: index.html:34891 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.lavaGeysers.1 EDITABLE
let lavaGeysers = [];
// BOSS_PART_END s1.lavaGeysers.1

// Nguồn: index.html:34892 · Dùng bởi: IndominusBoss, IronhaulBoss
// BOSS_PART_BEGIN s1.grassField.1 EDITABLE
let grassField = [];
// BOSS_PART_END s1.grassField.1

// Nguồn: index.html:34893 · Dùng bởi: IronhaulBoss
// BOSS_PART_BEGIN s1.forestScene.1 EDITABLE
let forestScene = null;
// BOSS_PART_END s1.forestScene.1

// Nguồn: index.html:34894 · Dùng bởi: GiantSpiderBoss
// BOSS_PART_BEGIN s1.spiderTree.1 EDITABLE
let spiderTree = { trunkX: 520, canopyBottom: 70 };
// BOSS_PART_END s1.spiderTree.1

// Nguồn: index.html:35299 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s1.resolveSolidPillars.1 EDITABLE
function resolveSolidPillars(ent) {
            if (mapTheme !== 'volcano' && mapTheme !== 'tetris' && !wildernessOn()) return;
            for (let pf of platforms) {
                if (!pf.pillar) continue;
                if (ent.x + ent.w <= pf.x || ent.x >= pf.x + pf.w) continue;
                if (ent.y + ent.h <= pf.top + (mapTheme==='tetris'?6:30)) continue;
                if (ent.y >= pf.top + pf.h) continue;
                if ((ent.x + ent.w / 2) < (pf.x + pf.w / 2)) ent.x = pf.x - ent.w;
                else ent.x = pf.x + pf.w;
            }
            if (ent.x < 0) ent.x = 0;
            if (ent.x > worldR() - ent.w) ent.x = worldR() - ent.w;
        }
// BOSS_PART_END s1.resolveSolidPillars.1

// Nguồn: index.html:35313 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s1.resolveTetrisWalls.1 EDITABLE
function resolveTetrisWalls(ent, dx){
            if (mapTheme !== 'tetris' || !tetris) return; let T=tetris;
            let topR=Math.floor((ent.y+2 - T.worldTop)/T.cell), botR=Math.floor((ent.y+ent.h-2 - T.worldTop)/T.cell);
            if (dx>0){ let ec=Math.floor((ent.x+ent.w - T.fx)/T.cell);
                for (let r=topR;r<=botR;r++){ if (r>=0&&r<T.rows&&ec>=0&&ec<T.cols&&T.grid[r][ec]){ ent.x=T.fx+ec*T.cell-ent.w-0.01; break; } } }
            else if (dx<0){ let ec=Math.floor((ent.x - T.fx)/T.cell);
                for (let r=topR;r<=botR;r++){ if (r>=0&&r<T.rows&&ec>=0&&ec<T.cols&&T.grid[r][ec]){ ent.x=T.fx+(ec+1)*T.cell+0.01; break; } } }
            if (ent.x<0) ent.x=0; if (ent.x>canvas.width-ent.w) ent.x=canvas.width-ent.w;
        }
// BOSS_PART_END s1.resolveTetrisWalls.1

// Nguồn: index.html:35324 · Dùng bởi: DanteBoss, TetrisBoss
// BOSS_PART_BEGIN s1.tetris.1 EDITABLE
let tetris = null, tetrisCamY = 0;
// BOSS_PART_END s1.tetris.1

// Nguồn: index.html:37064 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PON_HP.1 EDITABLE
const PON_HP   = [0, 90, 90];
// BOSS_PART_END s1.PON_HP.1

// Nguồn: index.html:37066 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PON_TRE.1 EDITABLE
const PON_TRE  = 42;
// BOSS_PART_END s1.PON_TRE.1

// Nguồn: index.html:37071 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PON_PHA.1 EDITABLE
const PON_PHA = { q_bung: 2, q_chu: 2, q_damkep: 2, q_combo: 2, q_trieu: 2 };
// BOSS_PART_END s1.PON_PHA.1

// Nguồn: index.html:37072 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PON_LUA.1 EDITABLE
const PON_LUA = "#FF7043", PON_PHEP = "#B388FF";
// BOSS_PART_END s1.PON_LUA.1

// Nguồn: index.html:40577 · Dùng bởi: HelicoprionBoss, MegalodonBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.OCEAN_SURF.1 EDITABLE
const OCEAN_SURF = 150;
// BOSS_PART_END s1.OCEAN_SURF.1

// Nguồn: index.html:40578 · Dùng bởi: MegaManXBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.OCEAN_FLOOR.1 EDITABLE
const OCEAN_FLOOR = 500;
// BOSS_PART_END s1.OCEAN_FLOOR.1

// Nguồn: index.html:40579 · Dùng bởi: HelicoprionBoss, MegalodonBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.oceanPads.1 EDITABLE
let oceanPads = [], oceanCamY = 0;
// BOSS_PART_END s1.oceanPads.1

// Nguồn: index.html:40639 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.BIEN_DAY.1 EDITABLE
const BIEN_DAY = 760, BIEN_NONG = 330, BIEN_SAU = 470, BIEN_VUC = 560;
// BOSS_PART_END s1.BIEN_DAY.1

// Nguồn: index.html:40646 · Dùng bởi: HelicoprionBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienVat.1 EDITABLE
let bienVat = [], bienCuoi = 0, bienLoaiTruoc = -1, bienX0 = null, bienTrongBun = 0, bienChon = false, bienDaDoan = 0;
// BOSS_PART_END s1.bienVat.1

// Nguồn: index.html:40648 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienChay.1 EDITABLE
function bienChay(){
            return typeof gameState !== 'undefined' && gameState === 'normal' && mapChay === 'ocean' && mapTheme === 'ocean'
                && bosses.length === 0 && !defMode;
        }
// BOSS_PART_END s1.bienChay.1

// Nguồn: index.html:40653 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienCoDiaHinh.1 EDITABLE
function bienCoDiaHinh(){ return bienChay() || (typeof bienDT !== 'undefined' && bienDT && mapTheme === 'ocean'); }
// BOSS_PART_END s1.bienCoDiaHinh.1

// Nguồn: index.html:40654 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s1.bienDayHT.1 EDITABLE
function bienDayHT(){ return bienCoDiaHinh() ? BIEN_DAY : OCEAN_FLOOR; }
// BOSS_PART_END s1.bienDayHT.1

// Nguồn: index.html:41538 · Dùng bởi: HelicoprionBoss
// BOSS_PART_BEGIN s1.HELI_TRANG.1 EDITABLE
const HELI_TRANG = { vao: 1, nghi: 1, xe: 1, rang: 1, xoay: 1, vo: 1, can: 1, bao: 1, gam: 1 };
// BOSS_PART_END s1.HELI_TRANG.1

// Nguồn: index.html:41541 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.bienDT.1 EDITABLE
let bienDT = false, bienToiY = 520;
// BOSS_PART_END s1.bienDT.1

// Nguồn: index.html:41557 · Dùng bởi: HelicoprionBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienTickTinh.1 EDITABLE
function bienTickTinh(){
            for (let o of bienVat) o.t++;
            for (let p of oceanPads) if (p.bien) p.top = p.top0 + Math.sin(frames * 0.045 + p.pha) * 5;
            for (let p of projectiles) for (let o of bienVat) if (o.k === 'sang' && checkAABB(p, o)) o.sang = 360;
        }
// BOSS_PART_END s1.bienTickTinh.1

// Nguồn: index.html:41869 · Dùng bởi: MegalodonBoss
// BOSS_PART_BEGIN s1.MEG_HP.1 EDITABLE
const MEG_HP = 200;
// BOSS_PART_END s1.MEG_HP.1

// Nguồn: index.html:41870 · Dùng bởi: MegalodonBoss
// BOSS_PART_BEGIN s1.MEG_TRANG.1 EDITABLE
const MEG_TRANG = { vao: 1, lan: 1, chop: 1, vuc: 1, vay: 1, can: 1, duoi: 1, gam: 1 };
// BOSS_PART_END s1.MEG_TRANG.1

// Nguồn: index.html:41871 · Dùng bởi: MegalodonBoss
// BOSS_PART_BEGIN s1.MEG_CD.1 EDITABLE
const MEG_CD = { chop: 150, vuc: 180, vay: 200, can: 140, duoi: 170 };
// BOSS_PART_END s1.MEG_CD.1

// Nguồn: index.html:42266 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.CL_HP.1 EDITABLE
const CL_HP = 240;
// BOSS_PART_END s1.CL_HP.1

// Nguồn: index.html:42267 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.CL_TRANG.1 EDITABLE
const CL_TRANG = { vao: 1, nghi: 1, combo: 1, thuong: 1, phun: 1, cot: 1, loc: 1, giang: 1, chan: 1, songthan: 1, ngap: 1,
                           luot: 1, chem: 1, trieu: 1, xoay: 1, long: 1 };
// BOSS_PART_END s1.CL_TRANG.1

// Nguồn: index.html:42269 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.CL_CD.1 EDITABLE
const CL_CD = { combo: 70, thuong: 110, phun: 150, cot: 230, loc: 330, giang: 280, chan: 200, songthan: 260,
                        luot: 190, chem: 150, trieu: 520, xoay: 380, long: 420 };
// BOSS_PART_END s1.CL_CD.1

// Nguồn: index.html:42272 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.CL_GIAO_CACH.1 EDITABLE
const CL_GIAO_CACH = 26;
// BOSS_PART_END s1.CL_GIAO_CACH.1

// Nguồn: index.html:42273 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.bbNgap.1 EDITABLE
let bbNgap = false, bbNuoc = 400;
// BOSS_PART_END s1.bbNgap.1

// Nguồn: index.html:43580 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.HEAT_MAX.1 EDITABLE
const HEAT_MAX = 100, HEAT_DECAY = 0.16, HEAT_BURNOUT = 170;
// BOSS_PART_END s1.HEAT_MAX.1

// Nguồn: index.html:43581 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatInit.1 EDITABLE
function heatInit(b, gain) { b.heat = 0; b.heatGain = gain; b.burnoutT = 0; b.dmgMul = 1; }
// BOSS_PART_END s1.heatInit.1

// Nguồn: index.html:43582 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatTier.1 EDITABLE
function heatTier(b) { return b.heat >= 75 ? 2 : (b.heat >= 40 ? 1 : 0); }
// BOSS_PART_END s1.heatTier.1

// Nguồn: index.html:43584 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatRate.1 EDITABLE
function heatRate(b) { return [1, 0.78, 0.58][heatTier(b)]; }
// BOSS_PART_END s1.heatRate.1

// Nguồn: index.html:43585 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatAdd.1 EDITABLE
function heatAdd(b, n) {
            if (b.burnoutT > 0) return;
            b.heat = Math.min(HEAT_MAX, b.heat + (n === undefined ? b.heatGain : n));
            if (b.heat >= HEAT_MAX) heatBurnout(b);
        }
// BOSS_PART_END s1.heatAdd.1

// Nguồn: index.html:43590 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatBurnout.1 EDITABLE
function heatBurnout(b) {
            b.heat = 0; b.burnoutT = HEAT_BURNOUT; b.dmgMul = 2;
            b.state = 'burnout'; b.subTimer = 0;
            floatingTexts.push(new FloatingText(b.x - 20, b.y - 30, "BÙNG CHÁY... TÀN!"));
            visualEffects.push(new Effect(b.x + b.w / 2, b.y + b.h / 2, 'explosion', true, 70));
            shakeTimer = Math.max(shakeTimer, 30);
            if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
        }
// BOSS_PART_END s1.heatBurnout.1

// Nguồn: index.html:43599 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatTick.1 EDITABLE
function heatTick(b) {
            if (b.burnoutT > 0) {
                b.burnoutT--;
                if (b.burnoutT <= 0) {
                    b.dmgMul = 1; b.state = 'idle'; b.actionTimer = 24;
                    floatingTexts.push(new FloatingText(b.x - 14, b.y - 30, "CHÁY LẠI!"));
                    visualEffects.push(new Effect(b.x + b.w / 2, b.y + b.h / 2, 'explosion', true, 44));
                }
                return true;
            }
            if (b.heat > 0) b.heat = Math.max(0, b.heat - HEAT_DECAY);
            return false;
        }
// BOSS_PART_END s1.heatTick.1

// Nguồn: index.html:43612 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.drawHeatBar.1 EDITABLE
function drawHeatBar(b) {
            let w = 96, x = b.x + b.w / 2 - w / 2, y = b.y - 26;
            let t = heatTier(b), col = b.burnoutT > 0 ? "#546E7A" : ["#FF9800", "#FF5722", "#FFEB3B"][t];
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(x, y, w, 7);
            if (b.burnoutT > 0) {
                ctx.fillStyle = "#455A64"; ctx.fillRect(x, y, w * (b.burnoutT / HEAT_BURNOUT), 7);
                ctx.fillStyle = "#90A4AE"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText("TÀN — SƠ HỞ! x2 DMG", b.x + b.w / 2, y - 4);
            } else {
                ctx.fillStyle = col; ctx.fillRect(x, y, w * (b.heat / HEAT_MAX), 7);
                if (t === 2) { ctx.strokeStyle = (frames % 8 < 4) ? "#FFEB3B" : "#FF5722"; ctx.lineWidth = 2; ctx.strokeRect(x - 1, y - 1, w + 2, 9); }
            }
            ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, 7);
            for (let m of [40, 75]) { ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.fillRect(x + w * m / 100, y - 2, 1, 11); }
            ctx.textAlign = "left"; ctx.restore();
        }
// BOSS_PART_END s1.drawHeatBar.1

// Nguồn: index.html:43831 · Dùng bởi: EchoStalkerBoss
// BOSS_PART_BEGIN s1.echoTrees.1 EDITABLE
let echoTrees = [];
// BOSS_PART_END s1.echoTrees.1

// Nguồn: index.html:43851 · Dùng bởi: SporeCrownBoss
// BOSS_PART_BEGIN s1.sporeStacks.1 EDITABLE
let sporeStacks = 0, sporePools = [], sporeFlash = 0;
// BOSS_PART_END s1.sporeStacks.1

// Nguồn: index.html:98282 · Dùng bởi: DanteBoss, VergilBoss
// BOSS_PART_BEGIN s6.SDTU_DON.1 EDITABLE
const SDTU_DON = 70, SDTU_TUNG = 340, SDTU_CAN = 70, SDTU_YEU = 380;
// BOSS_PART_END s6.SDTU_DON.1

// Nguồn: index.html:98283 · Dùng bởi: DanteBoss, VergilBoss
// BOSS_PART_BEGIN s6.SDT_ULT.1 EDITABLE
const SDT_ULT = {
            sdtUltNen(){ return !this.sdtUltXong && this.hp <= this.maxHp * 0.25; },
            // tra ve true neu dang trong chuoi chieu cuoi -> ham update goc phai dung lai
            sdtUltTick(){
                if (this.sdtUltNen() && !this.suSt){ this.suBatDau(); }
                if (!this.suSt) return false;
                this.suChay();
                return true;
            },
            // Cat ngang mot chieu dang chay se bo lai tan du: `beam` cua Dante co vong cap nhat
            // nam trong updateSDT, bi bo qua thi no dung yen mai ma phan VE van chay -> hien ra
            // mot "soi day vang" khong bao gio tat. Don sach moi thu tam thoi o day.
            suDon(){
                for (const k of ['beam','bike','hat','slash','tel','chain','glaive','throwArr'])
                    if (this[k] !== undefined) this[k] = null;
                for (const k of ['spikes','orbs','cuts','rain'])
                    if (Array.isArray(this[k])) this[k].length = 0;
                this.fly = 0;
            },
            suBatDau(){
                this.suSt = 'don'; this.suT = 0;
                this.suHit = {}; this.suCung = []; this.suMoc = 0; this.suVung = null; this.suCau = [];
                this.suDon();
                this.suTen = (this.name.indexOf('VERGIL') >= 0) ? 'JUDGEMENT CUT END' : 'JUDGEMENT';
                this.suPhim = [];
                floatingTexts.push(new FloatingText(this.cx() - 120, 118, this.suTen + '!'));
                shakeTimer = Math.max(shakeTimer, 40);
                if (SFX.bossEntry) SFX.bossEntry();
            },
            // dinh doat sat thuong: CHI khien hoac luot bat tu moi chan duoc
            suGiang(dmg){
                let chan = (typeof dino.isShielding === 'function' && dino.isShielding()) || dino.invincible || (dino.dashInvul > 0);
                if (chan){
                    visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + 14, 'parry', false));
                    floatingTexts.push(new FloatingText(dino.x - 20, dino.y - 34, 'CHẶN!'));
                    if (SFX.parry) SFX.parry();
                    return false;
                }
                dino.takeDamage(dmg);
                return true;
            },
            suChay(){
                this.suT++;
                let vg = this.suTen === 'JUDGEMENT CUT END';
                this.suTickBong();
                // ---------- DON LUC ----------
                if (this.suSt === 'don'){
                    this.invulnAll = false;      // KHONG bat tu: nguoi choi van danh duoc suot combo
                    if (this.y !== undefined && this.baseY !== undefined) this.y += ((this.baseY - 30) - this.y) * 0.08;
                    if (this.suT % 6 === 0){
                        let a = Math.random() * Math.PI * 2, r = 120 - this.suT * 0.6;
                        visualEffects.push(new Effect(this.cx() + Math.cos(a)*r, this.cy() + Math.sin(a)*r, 'explosion', true, 16));
                    }
                    if (this.suT % 22 === 0 && SFX.tone) SFX.tone(90 + this.suT, 0.18, 'sawtooth', 0.20, 60);
                    if (this.suT > SDTU_DON){ this.suSt = 'tung'; this.suT = 0; this.suDanh = false; }
                    return;
                }
                // ---------- TUNG CHIEU ----------
                if (this.suSt === 'tung'){
                    /* @@HE-SDTULT-XONG — LOI GOC cua "dung xong chieu cuoi van o dang quy": moc ket thuc
                       (suT > SDTU_TUNG) nam O CUOI nhanh nay, ma don ket (t >= 200/224) goi donKet roi
                       `return` truoc khi toi do -> chieu cuoi KHONG BAO GIO ket thuc, boss ket o dang SDT
                       den het tran. Kiem tra ket thuc ngay dau nhanh. */
                    if (this.suT > (vg ? SDTU_TUNG + 12 : SDTU_TUNG + 60)){ this.suSt = 'can'; this.suT = 0; this.suBong = []; return; }
                    // KHONG BAT TU. Nguoi choi danh duoc, ngat duoc, va quan trong nhat: NE DUOC.
                    // Day la mot COMBO gom cac don RIENG BIET co vi tri ro rang, khong phai mot
                    // tran mua phu kin man hinh. Ne sach ca combo -> van giu Perfect Victory.
                    this.invulnAll = false;
                    let t = this.suT, d = this.dir();
                    const B = (n) => t === n;
                    // hop danh mot nhip, chi an mot lan
                    const danh = (rect, key, hat) => {
                        if (this.suHit[key]) return;
                        if (checkAABB(dino, rect)){ this.suHit[key] = 1; this.suGiang(1); if (hat) dino.dy = hat; }
                    };
                    const cung = (reach, up) => { this.suCung.push({ t: 10, max: 10, dir: d, reach: reach, up: up || 0, x: this.cx(), y: this.cy() }); };

                    if (vg){
                        // ===== VERGIL: RAPID SLASH -> JUDGEMENT CUT -> UPPER SLASH -> AERIAL RAVE -> HELM BREAKER
                        if (B(1)){ this.suNhan('RAPID SLASH'); this.suMoc = dino.x + dino.w/2; this.suTu = this.cx(); }
                        if (t >= 20 && t <= 34){                       // luot xuyen qua
                            this.x += ((this.suMoc - this.w/2) - this.x) * 0.34;
                            if (t % 3 === 0) visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 16));
                            danh({x:this.x-20,y:this.y,w:this.w+40,h:this.h}, 'rs');
                            if (t === 22) cung(78, 10);
                        }
                        // @@HE-SDTULT-AP: Rapid Slash de lai MOT DAY vet cat doc duong luot
                        if (B(34)) for (let k = 1; k <= 4; k++){
                            let px = this.suTu + (this.cx() - this.suTu) * k / 4;
                            this.suPhim.push({ x: px, y: this.baseY + this.h/2 - 10, t: 26 + k*4, max: 26 + k*4, R: 40, cho: 16 + k*4 });
                        }
                        if (B(40)){ this.suNhan('JUDGEMENT CUT');
                            for (let k = 0; k < 3; k++){          // BA VUNG co vong bao 22 khung -> ne ra duoc
                                let px = dino.x + dino.w/2 + (k-1)*70;
                                this.suPhim.push({ x: px, y: 210, t: 30, max: 30, R: 56, cho: 22 });
                            } }
                        if (B(58)){                                // DOT HAI: bam theo cho nguoi choi vua ne toi
                            for (let k = 0; k < 2; k++){
                                let px = dino.x + dino.w/2 + (k ? 60 : -60), py = dino.y + dino.h/2 - 10;
                                this.suPhim.push({ x: px, y: py, t: 30, max: 30, R: 60, cho: 20 });
                            } }
                        if (B(74)){ this.suNhan('UPPER SLASH'); cung(72, 40);
                            this.suTaoBong({ x: dino.x + dino.w/2 + d * 50, y: dino.y + dino.h/2, dir: -d, reach: 90, up: 50, cho: 12, kieu: 'hat' }); }
                        if (t >= 74 && t <= 86) danh({x:d>0?this.x+this.w-8:this.x-70,y:this.y-26,w:78,h:this.h+26}, 'up', -12);
                        if (B(92)){ this.dy = -12; this.grounded = false; }
                        if (t >= 100 && t <= 142 && t % 14 === 0){ cung(70, 20);
                            danh({x:d>0?this.x+this.w-8:this.x-70,y:this.y-10,w:78,h:this.h+20}, 'ar'+t);
                            // PHAN THAN chem GONG tu phia ben kia nguoi choi
                            this.suTaoBong({ x: dino.x + dino.w/2 + d * 60, y: dino.y + dino.h/2, dir: -d, reach: 96, up: 20, cho: 10, kieu: 'chem' }); }
                        if (t >= 200) { this.donKet(t - 200, true); return; }
                        if (B(150)){ this.suNhan('HELM BREAKER'); this.dy = 17; }
                        if (t >= 150 && t <= 176){
                            danh({x:this.x-16,y:this.y,w:this.w+32,h:this.h+30}, 'hb');
                            if (this.y >= this.baseY && !this.suHit.no){
                                this.suHit.no = 1; this.y = this.baseY; this.dy = 0;
                                visualEffects.push(new Effect(this.cx(), this.y+this.h, 'body_slam_shockwave', true, 96));
                                shakeTimer = Math.max(shakeTimer, 30);
                                if (Math.abs((dino.x+dino.w/2)-this.cx()) < 88 && dino.grounded) this.suGiang(1);
                                for (let k = -1; k <= 1; k += 2) for (let q = 1; q <= 2; q++)     // vong cat lan ra hai ben
                                    this.suPhim.push({ x: this.cx() + k * q * 110, y: this.baseY + this.h/2 - 6, t: 22 + q*8, max: 22 + q*8, R: 48, cho: 10 + q*8 });
                            }
                        }
                    } else {
                        // ===== DANTE: STINGER -> MILLION STAB -> HIGH TIME -> AERIAL RAVE -> HELM BREAKER
                        if (B(1)) this.suNhan('STINGER');
                        // @@HE-SDTULT-AP — Hans: "chem va DONG THOI tao ra cac nhat chem cua Swordmaster chem
                        // theo o tam xa hon". Moi nhip deu keo theo BONG KIEM (anh Dante mo) danh xa hon.
                        if (B(20)) for (let q = 1; q <= 2; q++)
                            this.suTaoBong({ x: this.cx() + d * (70 + q * 120), y: this.cy() + 6, dir: d, reach: 150, up: 0, cho: 6 + q * 7, kieu: 'dam' });
                        if (t >= 18 && t <= 34){
                            // Lao TOI TAN NOI chu khong di mot van toc co dinh: o xa 500px thi
                            // 13px/khung x 16 khung chi duoc 208px, combo se danh vao khong khi.
                            let muon = (dino.x + dino.w/2) - d*70 - this.w/2;
                            this.x += (muon - this.x) * 0.30 + d * 4;
                            this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
                            if (t % 3 === 0) visualEffects.push(new Effect(this.cx()-d*20, this.cy(), 'explosion', true, 14));
                            danh({x:d>0?this.x+this.w-10:this.x-56,y:this.y+10,w:66,h:this.h-16}, 'st');
                        }
                        if (B(42)) this.suNhan('MILLION STAB');
                        if (t >= 46 && t <= 90 && t % 8 === 2)          // bong kiem dam xa, lech do cao
                            this.suTaoBong({ x: this.cx() + d * (110 + Math.random() * 130), y: this.cy() + 6 + (Math.random() - 0.5) * 60,
                                             dir: d, reach: 130, up: 0, cho: 7, kieu: 'dam' });
                        if (t >= 42 && t <= 92 && t % 4 === 0){        // dam lien tuc, hinh non HEP phia truoc
                            cung(66, 6);
                            visualEffects.push(new Effect(this.cx()+d*54, this.cy()+6, 'explosion', true, 14));
                            danh({x:d>0?this.x+this.w-6:this.x-64,y:this.y+14,w:70,h:34}, 'ms'+Math.floor(t/16));
                            if (SFX.tone) SFX.tone(900, 0.02, 'square', 0.06, 700);
                        }
                        if (B(100)){ this.suNhan('HIGH TIME'); cung(74, 44);
                            for (let q = 1; q <= 2; q++) this.suTaoBong({ x: this.cx() + d * (40 + q * 95), y: this.cy(), dir: d, reach: 100, up: 60, cho: 5 + q * 6, kieu: 'hat' }); }
                        if (t >= 100 && t <= 112) danh({x:d>0?this.x+this.w-8:this.x-72,y:this.y-28,w:80,h:this.h+28}, 'ht', -12);
                        if (B(118)){ this.dy = -12; this.grounded = false; }
                        if (t >= 126 && t <= 168 && t % 14 === 0){ cung(70, 20);
                            danh({x:d>0?this.x+this.w-8:this.x-70,y:this.y-10,w:78,h:this.h+20}, 'ar'+t);
                            // bong kiem chem NGAY CHO nguoi choi dang lo lung, tu phia sau lung
                            this.suTaoBong({ x: dino.x + dino.w/2 + d * 50, y: dino.y + dino.h/2, dir: -d, reach: 100, up: 24, cho: 10, kieu: 'chem' }); }
                        if (t >= 224) { this.donKet(t - 224, false); return; }
                        if (B(176)){ this.suNhan('HELM BREAKER'); this.dy = 17; }
                        if (t >= 176 && t <= 202){
                            danh({x:this.x-16,y:this.y,w:this.w+32,h:this.h+30}, 'hb');
                            if (this.y >= this.baseY && !this.suHit.no){
                                this.suHit.no = 1; this.y = this.baseY; this.dy = 0;
                                visualEffects.push(new Effect(this.cx(), this.y+this.h, 'body_slam_shockwave', true, 96));
                                shakeTimer = Math.max(shakeTimer, 30);
                                if (Math.abs((dino.x+dino.w/2)-this.cx()) < 88 && dino.grounded) this.suGiang(1);
                                for (let k = -1; k <= 1; k += 2){                  // song lua chay doc san hai phia (nhay qua)
                                    let bp = new BossProjectile(this.cx() + k * 40 - 18, 320 - 46, k * 9, 0, true, 1);
                                    bp.w = 36; bp.h = 46; bp.color = '#FF3D00'; bp.fire = true; bossProjectiles.push(bp);
                                    for (let q = 1; q <= 2; q++) this.suTaoBong({ x: this.cx() + k * q * 150, y: this.baseY + this.h/2, dir: k, reach: 90, up: 40, cho: 8 + q * 8, kieu: 'dap' });
                                }
                            }
                        }
                    }
                    // trong luc bay: tu roi
                    if (!this.grounded || this.y < this.baseY){
                        this.dy += 0.55; this.y += this.dy;
                        if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; }
                    }
                    this.faceP();
                    return;
                }
                // ---------- CAN LUC -> TRO VE DANG NGUOI ----------
                if (this.suSt === 'can'){
                    this.invulnAll = false;
                    if (this.suT === 1){
                        floatingTexts.push(new FloatingText(this.cx() - 70, this.y - 40, 'CẠN SỨC QUỶ'));
                        if (SFX.tone) SFX.tone(70, 0.7, 'sawtooth', 0.24, 40);
                    }
                    if (this.suT % 7 === 0) visualEffects.push(new Effect(this.cx() + (Math.random()-0.5)*70, this.cy() + (Math.random()-0.5)*70, 'explosion', true, 20));
                    if (this.y !== undefined && this.baseY !== undefined) this.y += (this.baseY - this.y) * 0.16;
                    if (this.suT > SDTU_CAN) this.suVeNguoi();
                    return;
                }
            },
            // ===== BONG KIEM (Swordmaster / phan than) — @@HE-SDTULT-AP =====
            // Mot nhat chem ANH hien ra o tam xa, bao truoc `cho` khung (vien mo) roi chem that.
            suTaoBong(o){
                if (!this.suBong) this.suBong = [];
                o.x = Math.max(20, Math.min(canvas.width - 20, o.x));
                o.max = o.cho; o.t = o.cho + 12; o.key = 'b' + (this._bongId = (this._bongId || 0) + 1);
                this.suBong.push(o);
            },
            suBongRect(o){
                if (o.kieu === 'dam') return o.dir > 0 ? { x: o.x - 20, y: o.y - 14, w: o.reach, h: 28 } : { x: o.x - o.reach + 20, y: o.y - 14, w: o.reach, h: 28 };
                if (o.kieu === 'dap') return { x: o.x - o.reach/2, y: o.y - 30 - o.up, w: o.reach, h: 60 + o.up };
                return { x: o.x - o.reach/2, y: o.y - 34 - o.up, w: o.reach, h: 68 + o.up };
            },
            suTickBong(){
                if (!this.suBong || !this.suBong.length) return;
                for (let i = this.suBong.length - 1; i >= 0; i--){
                    let o = this.suBong[i]; o.t--; o.cho--;
                    if (o.cho === 0){
                        if (checkAABB(dino, this.suBongRect(o))){ if (this.suGiang(1) && o.kieu === 'hat'){ dino.dy = -12; dino.grounded = false; } }
                        visualEffects.push(new Effect(o.x, o.y, 'explosion', true, o.kieu === 'dap' ? 34 : 18));
                        if (o.kieu === 'dap') shakeTimer = Math.max(shakeTimer, 10);
                        if (SFX.tone) SFX.tone(o.kieu === 'dam' ? 1500 : 700, 0.03, 'square', 0.07, 500);
                    }
                    if (o.t <= 0) this.suBong.splice(i, 1);
                }
            },
            suVeBong(){
                if (!this.suBong || !this.suBong.length) return;
                let vg = this.suTen === 'JUDGEMENT CUT END', mau = vg ? '#81D4FA' : '#FF6E40';
                for (const o of this.suBong){
                    ctx.save();
                    if (o.cho > 0){                                 // bao truoc: vien net dut + bong mo dang hien ra
                        let k = 1 - o.cho / o.max, r = this.suBongRect(o);
                        ctx.globalAlpha = 0.25 + 0.45 * k; ctx.strokeStyle = mau; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
                        ctx.strokeRect(r.x, r.y, r.w, r.h); ctx.setLineDash([]);
                        ctx.globalAlpha = 0.12 + 0.28 * k;
                        let gm = { facingLeft: o.dir < 0, drawn: true, armR: -1.2 + k * 1.6, armL: 0, wing: this.wing || 0, stage: 3, w: this.w, h: this.h, arms: 0 };
                        let gx = o.x - (vg ? 32 : 33) - o.dir * 30, gy = o.y - 46;
                        if (vg) drawSinVergil(gm, gx, gy); else drawSdtDante(gm, gx, gy);
                    } else {                                          // CHEM: cung sang lon
                        let a = Math.max(0, o.t / 12);
                        ctx.globalAlpha = a; ctx.strokeStyle = '#FFFFFF'; ctx.lineCap = 'round';
                        ctx.shadowColor = mau; ctx.shadowBlur = 14;
                        if (o.kieu === 'dam'){
                            let r = this.suBongRect(o);
                            ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(r.x, o.y); ctx.lineTo(r.x + r.w, o.y); ctx.stroke();
                            ctx.strokeStyle = mau; ctx.lineWidth = 2;
                            for (let q = -1; q <= 1; q++){ ctx.beginPath(); ctx.moveTo(r.x + 10, o.y + q * 7); ctx.lineTo(r.x + r.w - 10, o.y + q * 9); ctx.stroke(); }
                        } else {
                            let R = o.reach * 0.62, a0 = o.kieu === 'hat' ? -2.4 : (o.dir > 0 ? -1.0 : Math.PI - 1.0);
                            let a1 = o.kieu === 'hat' ? -0.7 : (o.dir > 0 ? 1.0 : Math.PI + 1.0);
                            if (o.kieu === 'dap'){ a0 = 0.15; a1 = Math.PI - 0.15; }
                            for (let q = 0; q < 3; q++){
                                ctx.lineWidth = 6 - q * 2; ctx.strokeStyle = q === 0 ? '#FFFFFF' : mau;
                                ctx.beginPath(); ctx.arc(o.x, o.y, R - q * 10, a0, a1, o.dir < 0 && o.kieu !== 'hat' && o.kieu !== 'dap'); ctx.stroke();
                            }
                        }
                    }
                    ctx.restore();
                }
            },
            suNhan(ten){
                floatingTexts.push(new FloatingText(this.cx()-34, this.y-34, ten));
                if (SFX.tone) SFX.tone(520, 0.06, 'square', 0.10, 300);
            },
            suVeNguoi(){
                this.suSt = null; this.sdtUltXong = true;
                this.invulnAll = false;
                this.suDon();
                this.suYeu = SDTU_YEU;                       // khoang YEU cho nguoi choi danh tra
                // Tro ve dang nguoi that su: phase 1 -> ca phan VE lan bo chieu deu quay lai
                this.phase = 1;
                if (this.suW !== undefined){ this.w = this.suW; this.h = this.suH; this.baseY = 320 - this.h; }
                // @@HE-SDTULT-XONG: bo HET dau vet dang quy — Vergil mat hao quang DT + phan than,
                // Dante mat vong Devil Trigger. Ca hai ve dung dang nguoi thuong, dang KIET SUC.
                if (this.name.indexOf('VERGIL') >= 0){ this.stage = 1; this.aura = 0; this.dop = null; this.dopEv = []; this.chuoi = []; }
                if (Array.isArray(this.fams)) this.fams.length = 0;
                if (Array.isArray(this.swords)) this.swords.length = 0;
                this.dim = null; this.dome = null; this.wing = 0; this.hover = 0; this.suBong = []; this.suVung = null; this.suCau = [];
                this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.name = this.suTenGoc || this.name.split(' —')[0];
                this.state = 'idle'; this.subTimer = 0; this.actionTimer = 90; this._bag = null; this.atkBag = [];
                this.fly = 0; this.slash = null; this.tel = null;
                bossProjectiles.length = 0;
                floatingTexts.push(new FloatingText(this.cx() - 60, this.y - 34, 'TRỞ VỀ DẠNG NGƯỜI'));
                visualEffects.push(new Effect(this.cx(), this.cy(), 'charge_wave', true, 2.2));
                shakeTimer = Math.max(shakeTimer, 30);
            },
            // dem lui khoang yeu + tick kiem anh; goi moi khung ke ca sau khi da ve dang nguoi
            suTickPhu(){
                if (this.suYeu > 0) this.suYeu--;
                if (!this.suPhim || !this.suPhim.length) return;
                for (let i = this.suPhim.length - 1; i >= 0; i--){
                    let ph = this.suPhim[i]; ph.t--;
                    if (ph.vx) ph.x += ph.vx;
                    if (ph.hoi){                                   // kiem anh don ve phia nguoi choi
                        let tx = dino.x + dino.w/2, ty = dino.y + dino.h/2;
                        ph.ang = Math.atan2(ty - ph.y, tx - ph.x);
                        let sp = 2.6 + (1 - ph.t/ph.max) * 9.0;
                        ph.x += Math.cos(ph.ang) * sp; ph.y += Math.sin(ph.ang) * sp;
                    }
                    // No khi CHAM duoc nguoi choi, hoac khi het doi, hoac khi nhat ket kich hoat.
                    // Truoc day chi kiem tra dung MOT khung o giua doi -> vet bay toi noi thi da
                    // qua thoi diem kiem tra, ca chieu cuoi chi giang don duoc 1-4 lan.
                    if (ph.cho !== undefined){
                        // VUNG BAO TRUOC: hien vong tron, dem nguoc, HET gio moi no.
                        // Nguoi choi thay truoc va di ra khoi vung la khong dinh gi.
                        ph.cho--;
                        if (ph.cho === 0){
                            let R = ph.R || 56;
                            if (Math.hypot((dino.x+dino.w/2)-ph.x, (dino.y+dino.h/2)-ph.y) < R) this.suGiang(1);
                            visualEffects.push(new Effect(ph.x, ph.y, 'explosion', true, R));
                            shakeTimer = Math.max(shakeTimer, 14);
                            if (SFX.tone) SFX.tone(1300, 0.06, 'square', 0.10, 500);
                        }
                    }
                    if (ph.t <= 0) this.suPhim.splice(i, 1);
                }
            },
            // ================= DON KET (@@HE-SDTULT-AP) =================
            // Hans: "cam giac ve do AP BUC cua 2 chieu cuoi khong to lam".
            // VERGIL — JUDGEMENT CUT END that: tra Yamato vao vo, CA MAN HINH toi sam lai, hang chuc
            //   duong cat xe ngang doc khap noi, lang mot nhip, roi tieng "CACH" dong vo — ca man hinh
            //   vo nhu kinh. Khong co cho nao an toan: phai GIO KHIEN (parry) hoac LUOT dung nhip "cach".
            // DANTE — SIN DEVIL TRIGGER: bay len giua troi, goi mot RUNG KIEM TOI (Sin Swords) — moi thanh
            //   khoa vao cho nguoi choi dung luc no hien ra — roi phong xuong tung loat; cuoi cung dap xuong
            //   san tao hai lan song lua (nhay qua). Dung yen la an ca rung kiem: phai CHAY.
            donKet(t, vg){
                const B = (n) => t === n;
                if (B(0)){
                    this.suNhan(vg ? 'JUDGEMENT CUT END' : 'JUDGEMENT');
                    this.suVung = vg ? { toan: true, pha: 'khoa', vet: [], manh: [] } : { mua: true, pha: 'khoa', kiem: [] };
                    this.suCau = [];
                    this.dy = 0; this.grounded = true;
                    if (vg) this.y = this.baseY;
                    if (SFX.tone) SFX.tone(300, 0.25, 'sine', 0.16, 120);
                    shakeTimer = Math.max(shakeTimer, 16);
                }
                let V = this.suVung; if (!V) return;
                this.faceP();
                if (vg){
                    // 1. tra kiem, man hinh toi dan
                    if (t < 26){ this.drawn = false; V.pha = 'khoa'; return; }
                    // 2. loat rut: duong cat xe KHAP man hinh + qua cau cat
                    if (t < 80){
                        V.pha = 'rut';
                        for (let q = 0; q < 2; q++){
                            let cx = 40 + Math.random() * (canvas.width - 80), cy = 40 + Math.random() * 280, a = Math.random() * Math.PI, L = 260 + Math.random() * 420;
                            V.vet.push({ x1: cx - Math.cos(a) * L / 2, y1: cy - Math.sin(a) * L / 2, x2: cx + Math.cos(a) * L / 2, y2: cy + Math.sin(a) * L / 2, t: 0 });
                        }
                        if (t % 3 === 1) this.suCau.push({ x: 40 + Math.random() * (canvas.width - 80), y: 30 + Math.random() * 290, R: 14 + Math.random() * 18, ang: Math.random() * Math.PI * 2, t: 0 });
                        if (t % 2 === 0 && SFX.tone) SFX.tone(1400 + Math.random() * 600, 0.02, 'square', 0.04, 900);
                        return;
                    }
                    // 3. lang — man hinh gan nhu den
                    if (t < 104){ V.pha = 'lang'; return; }
                    // 4. "CACH" — ca man hinh vo
                    if (t === 104){
                        V.pha = 'no'; V.no = 40;
                        hitstopTimer = Math.max(hitstopTimer || 0, 10);
                        shakeTimer = Math.max(shakeTimer, 70);
                        if (SFX.tone) SFX.tone(2400, 0.08, 'square', 0.22, 400);
                        if (SFX.bossExplode) SFX.bossExplode();
                        for (let k = 0; k < 60; k++) V.manh.push({ x: Math.random() * canvas.width, y: Math.random() * 330, vx: (Math.random() - 0.5) * 6, vy: -2 + Math.random() * 3,
                                                                   s: 6 + Math.random() * 16, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.3 });
                        for (let c of this.suCau) visualEffects.push(new Effect(c.x, c.y, 'explosion', true, 30));
                        this.suGiang(2);                     // khong co cho an toan: parry / luot dung nhip
                    }
                    if (V.no > 0){ V.no--; for (const m of V.manh){ m.x += m.vx; m.y += m.vy; m.vy += 0.25; m.r += m.vr; }
                                   if (V.no === 0){ this.suVung = null; this.suCau = []; } }
                    return;
                }
                // ===== DANTE — RUNG KIEM =====
                let hy = this.baseY - 130;
                if (V.pha !== 'dap' && V.pha !== 'xong'){ this.y += (hy - this.y) * 0.12; this.dy = 0; this.grounded = false; this.drawn = true; this.armR = -2.2; }
                if (t >= 8 && t < 62){
                    V.pha = 'goi';
                    if (t % 3 === 0){
                        let tx = dino.x + dino.w/2 + (Math.random() - 0.5) * 60, ty = Math.min(312, dino.y + dino.h/2 + (Math.random() - 0.5) * 30);
                        let sx = Math.max(30, Math.min(canvas.width - 30, tx + (Math.random() - 0.5) * 520)), sy = 10 + Math.random() * 110;
                        V.kiem.push({ x: sx, y: sy, tx: tx, ty: ty, pha: 'treo', t: 0, key: 'k' + V.kiem.length });
                        if (SFX.tone) SFX.tone(700 + Math.random() * 300, 0.03, 'sawtooth', 0.05, 300);
                    }
                    return;
                }
                if (t < 74){ V.pha = 'lang'; return; }
                if (t < 150){
                    V.pha = 'ban';
                    let i = Math.floor((t - 74) / 3);
                    if ((t - 74) % 3 === 0 && V.kiem[i] && V.kiem[i].pha === 'treo'){
                        let k = V.kiem[i], a = Math.atan2(k.ty - k.y, k.tx - k.x); k.vx = Math.cos(a) * 20; k.vy = Math.sin(a) * 20; k.pha = 'bay';
                    }
                }
                for (const k of V.kiem){
                    if (k.pha !== 'bay') continue;
                    k.x += k.vx; k.y += k.vy;
                    if (k.y >= k.ty || k.y >= 318){
                        k.pha = 'no'; k.t = 14;
                        visualEffects.push(new Effect(k.x, k.y, 'explosion', true, 34));
                        if (Math.hypot((dino.x + dino.w/2) - k.x, (dino.y + dino.h/2) - k.y) < 38) this.suGiang(1);
                        shakeTimer = Math.max(shakeTimer, 6);
                    }
                }
                for (const k of V.kiem) if (k.pha === 'no' && --k.t <= 0) k.pha = 'het';
                if (t === 150){ V.pha = 'dap'; this.dy = 24; this.suNhan('DEVIL TRIGGER!'); }
                if (V.pha === 'dap'){
                    this.y += this.dy;
                    if (this.y >= this.baseY){
                        this.y = this.baseY; this.dy = 0; this.grounded = true; V.pha = 'xong'; V.no = 24;
                        shakeTimer = Math.max(shakeTimer, 50); hitstopTimer = Math.max(hitstopTimer || 0, 6);
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'body_slam_shockwave', true, 140));
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'lightning_burst', true, 3.2));
                        if (Math.abs((dino.x + dino.w/2) - this.cx()) < 100 && dino.y + dino.h > 270) this.suGiang(1);
                        for (let s2 = -1; s2 <= 1; s2 += 2) for (let q = 0; q < 2; q++){      // HAI lan song lua moi ben — nhay qua
                            let bp = new BossProjectile(this.cx() + s2 * (30 + q * 60) - 20, 320 - 52, s2 * (10 - q * 2.5), 0, true, 1);
                            bp.w = 40; bp.h = 52; bp.color = '#FF3D00'; bp.fire = true; bossProjectiles.push(bp);
                        }
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                }
                if (V.pha === 'xong' && V.no > 0 && --V.no === 0){ this.suVung = null; }
            },
            veDonKet(){
                let V = this.suVung; if (!V) return;
                if (V.toan){
                    // man toi phu CA KHUNG NHIN (ke ca vung camera keo len)
                    let x0 = ((typeof camX === 'number') ? camX : 0) - 40, y0 = ((typeof camY === 'number') ? camY : 0) - 40;
                    let toi = V.pha === 'khoa' ? 0.35 : V.pha === 'rut' ? 0.55 : V.pha === 'lang' ? 0.82 : Math.max(0, V.no / 40) * 0.6;
                    ctx.save();
                    ctx.fillStyle = '#02040A'; ctx.globalAlpha = toi; ctx.fillRect(x0, y0, canvas.width + 80, canvas.height + 80);
                    if (V.pha === 'no' && V.no > 30){ ctx.globalAlpha = (V.no - 30) / 10; ctx.fillStyle = '#E1F5FE'; ctx.fillRect(x0, y0, canvas.width + 80, canvas.height + 80); }
                    // duong cat
                    ctx.lineCap = 'round';
                    for (const v of V.vet){
                        v.t++;
                        let a = V.pha === 'no' ? Math.max(0, V.no / 40) : Math.min(1, v.t / 4) * (V.pha === 'lang' ? 0.55 + 0.45 * Math.sin(frames * 0.8) : 0.85);
                        ctx.globalAlpha = a; ctx.strokeStyle = '#E1F5FE'; ctx.lineWidth = V.pha === 'no' ? 3 : 1.6;
                        ctx.beginPath(); ctx.moveTo(v.x1, v.y1); ctx.lineTo(v.x2, v.y2); ctx.stroke();
                    }
                    for (const c of this.suCau || []){
                        c.t++; ctx.globalAlpha = (V.pha === 'no' ? 0.3 : 0.85) * Math.min(1, c.t / 6);
                        ctx.strokeStyle = '#81D4FA'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(c.x, c.y, c.R, 0, 6.28); ctx.stroke();
                    }
                    // manh kinh vo
                    if (V.pha === 'no') for (const m of V.manh){
                        ctx.globalAlpha = Math.max(0, V.no / 40); ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.r);
                        ctx.fillStyle = 'rgba(179,229,252,0.55)'; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(-m.s/2, -m.s/3); ctx.lineTo(m.s/2, -m.s/2); ctx.lineTo(m.s/3, m.s/2); ctx.closePath(); ctx.fill(); ctx.stroke();
                        ctx.restore();
                    }
                    if (V.pha === 'lang'){
                        ctx.globalAlpha = 1; ctx.fillStyle = '#E1F5FE'; ctx.font = 'bold 16px Consolas, monospace'; ctx.textAlign = 'center';
                        ctx.fillText(LT('— PARRY HOẶC LƯỚT ĐÚNG LÚC "CẠCH" —', '— PARRY OR DASH ON THE "CLICK" —'), canvas.width / 2, 120);
                        ctx.textAlign = 'left';
                    }
                    ctx.restore();
                    return;
                }
                if (V.mua){
                    ctx.save();
                    let x0 = ((typeof camX === 'number') ? camX : 0) - 40, y0 = ((typeof camY === 'number') ? camY : 0) - 40;
                    ctx.globalAlpha = V.pha === 'xong' ? 0.2 : 0.32; ctx.fillStyle = '#1A0000'; ctx.fillRect(x0, y0, canvas.width + 80, canvas.height + 80);
                    for (const k of V.kiem){
                        if (k.pha === 'het') continue;
                        if (k.pha === 'treo'){
                            ctx.globalAlpha = V.pha === 'lang' ? 0.5 + 0.4 * Math.sin(frames * 0.8) : 0.35;
                            ctx.strokeStyle = '#FF1744'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 6]);
                            ctx.beginPath(); ctx.moveTo(k.x, k.y); ctx.lineTo(k.tx, k.ty); ctx.stroke(); ctx.setLineDash([]);
                            ctx.globalAlpha = 0.45; ctx.beginPath(); ctx.arc(k.tx, k.ty, 12, 0, 6.28); ctx.stroke();
                        }
                        if (k.pha === 'no'){
                            ctx.globalAlpha = k.t / 14; ctx.fillStyle = '#FF6E40'; ctx.beginPath(); ctx.arc(k.x, k.y, 38 * (1 - k.t / 14) + 8, 0, 6.28); ctx.fill();
                            continue;
                        }
                        // thanh kiem toi: luoi den, vien do rực
                        let a = k.pha === 'bay' ? Math.atan2(k.vy, k.vx) : Math.atan2(k.ty - k.y, k.tx - k.x);
                        ctx.globalAlpha = 1; ctx.save(); ctx.translate(k.x, k.y); ctx.rotate(a);
                        ctx.shadowColor = '#FF3D00'; ctx.shadowBlur = 10;
                        ctx.fillStyle = '#1A0505'; ctx.beginPath(); ctx.moveTo(22, 0); ctx.lineTo(-10, -5); ctx.lineTo(-10, 5); ctx.closePath(); ctx.fill();
                        ctx.strokeStyle = '#FF5722'; ctx.lineWidth = 1.5; ctx.stroke();
                        ctx.fillStyle = '#FFAB40'; ctx.fillRect(-16, -7, 5, 14); ctx.fillStyle = '#5D1010'; ctx.fillRect(-24, -2, 9, 4);
                        ctx.restore();
                    }
                    ctx.restore();
                }
            },
            suTickCung(){
                if (!this.suCung) return;
                for (let i = this.suCung.length - 1; i >= 0; i--) if (--this.suCung[i].t <= 0) this.suCung.splice(i, 1);
            },
            suVe(){
                this.suTickCung();
                this.veDonKet();
                this.suVeBong();
                if (this.suCung) for (let a of this.suCung){
                    let cxS = a.dir < 0 ? a.x - 8 : a.x + 8, cyS = a.y - a.up*0.4;
                    ctx.save(); ctx.globalAlpha = Math.min(1, a.t/(a.max*0.5));
                    ctx.strokeStyle = this.suTen === 'JUDGEMENT CUT END' ? '#81D4FA' : '#FFAB91';
                    ctx.lineWidth = 5; ctx.lineCap = 'round';
                    let mo = 1 - a.t/a.max, bd = 1.0;
                    for (let k = 0; k < 3; k++){
                        let R = Math.max(10, a.reach - k*16) * (0.7 + 0.35*mo);
                        ctx.beginPath();
                        ctx.arc(cxS, cyS, R, a.dir<0?Math.PI-bd:-bd, a.dir<0?Math.PI+bd:bd, false);
                        ctx.stroke();
                    }
                    ctx.globalAlpha *= 0.55; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.arc(cxS, cyS, a.reach*(0.7+0.35*mo), a.dir<0?Math.PI-bd:-bd, a.dir<0?Math.PI+bd:bd, false); ctx.stroke();
                    ctx.restore();
                }
                if (this.suSt === 'don'){
                    let t = this.suT / SDTU_DON;
                    ctx.save(); ctx.globalAlpha = 0.30 * t; ctx.fillStyle = '#000'; ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.globalAlpha = 0.5 + 0.4*Math.sin(frames*0.4);
                    ctx.strokeStyle = this.suTen === 'JUDGEMENT CUT END' ? '#4FC3F7' : '#FF7043';
                    ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 150*(1-t)+26, 0, Math.PI*2); ctx.stroke();
                    ctx.globalAlpha = 1; ctx.fillStyle = '#FFF'; ctx.font = 'bold 22px Consolas, monospace'; ctx.textAlign = 'center';
                    ctx.fillText(this.suTen, canvas.width/2, 74);
                    ctx.font = 'bold 12px Consolas, monospace'; ctx.fillStyle = '#FFCC80';
                    ctx.fillText('GIƠ KHIÊN HOẶC LƯỚT NÉ', canvas.width/2, 94);
                    ctx.textAlign = 'left'; ctx.restore();
                }
                if (this.suPhim) for (let ph of this.suPhim){
                    if (ph.cho !== undefined){
                        let t2 = Math.min(1, Math.max(0, ph.cho)/22), R = ph.R || 56;
                        ctx.save();
                        ctx.globalAlpha = 0.30; ctx.fillStyle = '#4FC3F7';
                        ctx.beginPath(); ctx.arc(ph.x, ph.y, R, 0, Math.PI*2); ctx.fill();
                        ctx.globalAlpha = 0.95; ctx.strokeStyle = '#E1F5FE'; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.arc(ph.x, ph.y, R*(0.25+0.75*(1-t2)), 0, Math.PI*2); ctx.stroke();
                        ctx.restore();
                        continue;
                    }
                    let a = Math.min(1, ph.t/ph.max*1.6);
                    ctx.save(); ctx.globalAlpha = a;
                    if (ph.kiem){
                        ctx.translate(ph.x, ph.y); ctx.rotate(ph.ang + frames*0.2);
                        ctx.strokeStyle = '#FFAB91'; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.moveTo(-22,0); ctx.lineTo(22,0); ctx.stroke();
                        ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 1.5;
                        ctx.beginPath(); ctx.moveTo(-14,-4); ctx.lineTo(-14,4); ctx.stroke();
                    } else {
                        ctx.strokeStyle = '#4FC3F7'; ctx.lineWidth = 3;
                        let R = (ph.R||46) * (0.35 + (1-ph.t/ph.max)*0.75);
                        ctx.beginPath(); ctx.arc(ph.x, ph.y, R, 0, Math.PI*2); ctx.stroke();
                        ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 2;
                        for (let g = 0; g < 3; g++){
                            let aa = g*Math.PI/3 + frames*0.1;
                            ctx.beginPath(); ctx.moveTo(ph.x-Math.cos(aa)*R, ph.y-Math.sin(aa)*R);
                            ctx.lineTo(ph.x+Math.cos(aa)*R, ph.y+Math.sin(aa)*R); ctx.stroke();
                        }
                    }
                    ctx.restore();
                }
                if (this.suYeu > 0){
                    ctx.save(); ctx.globalAlpha = 0.25 + 0.15*Math.sin(frames*0.2);
                    ctx.strokeStyle = '#90A4AE'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 40, 0, Math.PI*2); ctx.stroke();
                    ctx.globalAlpha = 0.9; ctx.fillStyle = '#B0BEC5'; ctx.font = 'bold 9px Consolas, monospace'; ctx.textAlign = 'center';
                    ctx.fillText('KIỆT SỨC', this.cx(), this.y - 30); ctx.textAlign = 'left';
                    ctx.restore();
                }
            }
        };
// BOSS_PART_END s6.SDT_ULT.1

// Nguồn: index.html:98841 · Dùng bởi: DanteBoss, VergilBoss
// BOSS_PART_BEGIN s6.capSdtUlt.1 EDITABLE
(function capSdtUlt(){
            for (const C of [typeof VergilBoss !== 'undefined' ? VergilBoss : null,
                             typeof DanteBoss  !== 'undefined' ? DanteBoss  : null]){
                if (typeof C !== 'function') continue;
                for (const k of Object.keys(SDT_ULT)) C.prototype[k] = SDT_ULT[k];
            }
        })();
// BOSS_PART_END s6.capSdtUlt.1

// Nguồn: index.html:99424 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s6.BOSS_CHUNG.1 EDITABLE
const BOSS_CHUNG = {
            cx(){ return this.x + this.w / 2; },
            cy(){ return this.y + this.h / 2; },
            gap(){ return (dino.x + dino.w / 2) - this.cx(); },
            dir(){ return this.facingLeft ? -1 : 1; },
            faceP(){ this.facingLeft = (dino.x + dino.w / 2) < this.cx(); },
            hurtP(n){
                if (!dino.isShielding()) dino.takeDamage(n);
                else parry();
            }
        };
// BOSS_PART_END s6.BOSS_CHUNG.1

// Nguồn: index.html:99435 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s6.capBoHamChung.1 EDITABLE
(function capBoHamChung(){
            const DS = [
            PteroBoss, QuetzalBoss, TRexBoss, TriceratopsBoss,
            SpinoBoss, GodzillaBoss, CloneBoss, LavaSerpentBoss,
            GreatSerpentBoss, StormEagleBoss, PoisonMothBoss, IndominusBoss,
            GiantSpiderBoss, ForestTitanBoss, UnityCloneBoss, VergilBoss,
            DanteBoss, NeroBoss, WarBoss, DeathBoss,
            ArtoriasBoss, HoGacBoss, ClawCloneBoss, FireCloneBoss, AegisRexBoss,
            SummitDragonBoss, ArcanaRexBoss, TetrisBoss, VoltCloneBoss,
            TriDino, MosaBoss, FlameCoreBoss, FlameLancerBoss,
            EmberWolfBoss, MagmaDragoonBoss, IaiRaptorBoss, SiegeGoliathBoss,
            EchoStalkerBoss, SporeCrownBoss, ScarabLordBoss, ChronoRexBoss, YasuoBoss, Yasuo2Boss, TyrantRexBoss,
            ZeroBoss, MegaManXBoss, GaelBoss, SoulOfCinderBoss, CorruptionBoss, OctopusBoss, PontiffBoss, SpinoLordBoss, TriceratopsLordBoss, PteroLordBoss, MegalodonBoss, ThalassaBoss,
            Effect, FloatingText,
            Projectile, BossProjectile, WindBlade, Obstacle,
            Heart, Pterodactyl, Raptor, ForestShooter,
            LavaDino, SummitBat, Player, TrainingDummy
            , DilophosBoss, MagmorBoss, PillarLordBoss, IceFangBoss, VajraRexBoss, FireDragonBoss, DragonLordBoss, SlashBeastBoss, StoneRocBoss, CliffGolemBoss, MountainGodBoss, GreatApeBoss, PulsarCloneBoss
            ];
            for (const C of DS){
                if (typeof C !== 'function') continue;
                for (const k of Object.keys(BOSS_CHUNG))
                    if (!Object.prototype.hasOwnProperty.call(C.prototype, k))
                        C.prototype[k] = BOSS_CHUNG[k];
            }
        })();
// BOSS_PART_END s6.capBoHamChung.1
