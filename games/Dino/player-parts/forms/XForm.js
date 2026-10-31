// PLAYER_FILE: XForm
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DPR, FloatingText, LT, MMX_GIAP_MAU, MMX_GIAP_TEN, MMX_VK, MMX_VK_TEN, MegaManXBoss, POWERS, SFX, canvas, combatStance, ctx, currentForm, currentLang, currentPower, danteForm, dashVx, deathCineActive, deathCineFrame, deathSkel, dino, floatingTexts, frames, gameOver, gameState, gameVictory, hudChu, keys, kinhTinhThe, paused, wildernessOn, xuongChetParts, xuongParts, xuongVeLoiAt, xuongVeManh
// index.html:85558 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xChoi.1 EDITABLE
let xChoi = null, xNL = 0, xLuu = null;
// PLAYER_PART_END s6.xChoi.1

// index.html:85560 · Phạm vi: global
// PLAYER_PART_BEGIN s6.XNL_TICK.1 EDITABLE
const XNL_TICK = 60;
// PLAYER_PART_END s6.XNL_TICK.1

// index.html:85560 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xNLt.1 EDITABLE
let xNLt = 0;
// PLAYER_PART_END s6.xNLt.1

// index.html:85566 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xForm.1 EDITABLE
let xForm = false, xPowerCu = -1;
// PLAYER_PART_END s6.xForm.1

// index.html:85567 · Phạm vi: global
// PLAYER_PART_BEGIN s6.TryStatement.1 EDITABLE
try { xForm = localStorage.getItem('dino_x_form') === '1'; } catch(e){}
// PLAYER_PART_END s6.TryStatement.1

// index.html:85568 · Phạm vi: global
// PLAYER_PART_BEGIN s6.X_POWER.1 EDITABLE
const X_POWER = POWERS.findIndex(p => p.id === 'x');
// PLAYER_PART_END s6.X_POWER.1

// index.html:85569 · Phạm vi: global
// PLAYER_PART_BEGIN s6.X_N_DANG.1 EDITABLE
const X_N_DANG = 12;
// PLAYER_PART_END s6.X_N_DANG.1

// index.html:85611 · Phạm vi: global
// PLAYER_PART_BEGIN s6.veKinhManh.1 EDITABLE
function veKinhManh(bx, by, cs, br, layers){
            const Y = (v, k) => by + v + cs * k + br, Y2 = (v) => by + v + cs * 13 + br;
            ctx.save(); ctx.lineJoin = 'round';
            ctx.fillStyle = 'rgba(255,255,255,0.16)';                                                         // mat cat sang, moi mat mot sac
            for (const t of [[[8, 16, 11], [22, 24, 9], [20, 35, 5]], [[22, 24, 9], [36, 14, 11], [38, 26, 8]], [[8, 30, 8], [22, 24, 9], [8, 16, 11]]]){
                ctx.beginPath(); ctx.moveTo(bx + t[0][0], Y(t[0][1], t[0][2])); ctx.lineTo(bx + t[1][0], Y(t[1][1], t[1][2])); ctx.lineTo(bx + t[2][0], Y(t[2][1], t[2][2])); ctx.closePath(); ctx.fill();
            }
            ctx.strokeStyle = 'rgba(255,255,255,0.62)'; ctx.lineWidth = 1;                                    // duong ghep manh
            const seg = (a, b) => { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); };
            seg([bx + 8, Y(16, 11)], [bx + 22, Y(24, 9)]); seg([bx + 22, Y(24, 9)], [bx + 36, Y(14, 11)]); seg([bx + 22, Y(24, 9)], [bx + 20, Y(35, 5)]);
            seg([bx + 22, Y(24, 9)], [bx + 8, Y(30, 8)]); seg([bx + 22, Y(24, 9)], [bx + 38, Y(26, 8)]);
            seg([bx + 33, Y2(5)], [bx + 46, Y2(9)]); seg([bx + 46, Y2(9)], [bx + 52, Y2(5)]); seg([bx + 40, Y2(2)], [bx + 46, Y2(9)]);           // dau
            seg([bx + 6, by + 22 + cs * 10 + br], [bx - 8, by + 14 + cs * 12]); seg([bx - 8, by + 17 + cs * 12], [bx - 18, by + 9 + cs * 12]);       // duoi
            seg([bx + 10, by + 30], [bx + 18, by + 44]); seg([bx + 18, by + 30], [bx + 14, by + 44]);                                                 // chan
            ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 1.6;                                   // vet loe sang
            seg([bx + 11, Y(15, 11)], [bx + 17, Y(12, 12)]); seg([bx + 36, Y2(2)], [bx + 42, Y2(1)]);
            if (layers >= 2){ kinhTinhThe(bx + 24, Y(12, 12), 11, 16, 0.15, 1); kinhTinhThe(bx + 12, Y(14, 11), 9, 12, -0.3, 1); kinhTinhThe(bx + 40, Y2(3), 6, 9, 0.5, 1); }
            if (layers >= 1){ kinhTinhThe(bx - 4, by + 15 + cs * 12, 8, 11, -0.9, 1); kinhTinhThe(bx + 31, Y(14, 11), 7, 10, 0.2, 1); }
            ctx.restore();
        }
// PLAYER_PART_END s6.veKinhManh.1

// index.html:85675 · Phạm vi: global
// PLAYER_PART_BEGIN s6.XUONG_BONE.1 EDITABLE
const XUONG_BONE = '#e9e2cf', XUONG_DK = '#b9ae92', XUONG_OUT = '#2b2418';
// PLAYER_PART_END s6.XUONG_BONE.1

// index.html:85770 · Phạm vi: global
// PLAYER_PART_BEGIN s6.veDinoXuong.1 EDITABLE
function veDinoXuong(bx, by, crouch, airborne, ng){
            let chet = !!(deathSkel && deathCineActive && ng && ng.id === 1);
            let dy = crouch ? 7 : 0, parts;
            if (chet){
                deathSkel.bx = bx; deathSkel.by = by;
                const mx=ctx.getTransform();deathSkel.drawMatrix={a:mx.a,b:mx.b,c:mx.c,d:mx.d,e:mx.e,f:mx.f};
                parts = xuongChetParts(xuongParts(bx, by, 0, 0, false, false), bx, by, deathCineFrame);
            } else parts = xuongParts(bx, by, dy, 0, crouch, airborne);
            for (const P of parts) xuongVeManh(P);
            if (!chet) xuongVeLoiAt(bx + 21, by + 22 + dy * 0.8, 0.7 + 0.2 * Math.sin(frames * 0.11));       // Core do luon nam trong nguc
        }
// PLAYER_PART_END s6.veDinoXuong.1

// index.html:85798 · Phạm vi: global
// PLAYER_PART_BEGIN s6.apexOn.1 EDITABLE
function apexOn(){return currentForm===8 && !xForm;}
// PLAYER_PART_END s6.apexOn.1

// index.html:85799 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xFormOn.1 EDITABLE
function xFormOn(){ return xForm || (typeof danteForm!=='undefined'&&danteForm); }
// PLAYER_PART_END s6.xFormOn.1

// index.html:85800 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xFormIdx.1 EDITABLE
function xFormIdx(){ return typeof danteForm!=='undefined'&&danteForm ? 9 : xForm ? 7 : currentForm; }
// PLAYER_PART_END s6.xFormIdx.1

// index.html:85801 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xDang.1 EDITABLE
function xDang(){ return xForm && gameState !== 'pvp'; }
// PLAYER_PART_END s6.xDang.1

// index.html:85802 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xDongBo.1 EDITABLE
function xDongBo(){
            if (typeof POWERS === 'undefined' || X_POWER < 0) return;
            if (xDang()){
                if (currentPower !== X_POWER){ xPowerCu = currentPower; currentPower = X_POWER; }
                combatStance = 0;
            } else if (currentPower === X_POWER){
                currentPower = (xPowerCu >= 0 && xPowerCu !== X_POWER) ? xPowerCu : 0;
                xPowerCu = -1;
            }
        }
// PLAYER_PART_END s6.xDongBo.1

// index.html:85812 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xDatForm.1 EDITABLE
function xDatForm(i){
            i = ((i % X_N_DANG) + X_N_DANG) % X_N_DANG;
            if (i === 7){ xForm = true; currentForm = 0; }
            else { xForm = false; currentForm = i; }
            try { localStorage.setItem('dino_x_form', xForm ? '1' : '0'); localStorage.setItem('dino_current_form', currentForm); } catch(e){}
            xDongBo();
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(xForm ? 880 : 640, 0.06, 'square', 0.14, 1200);
        }
// PLAYER_PART_END s6.xDatForm.1

// index.html:85820 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xHudOn.1 EDITABLE
function xHudOn(){ return xBat() && !!xChoi; }
// PLAYER_PART_END s6.xHudOn.1

// index.html:85821 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xBat.1 EDITABLE
function xBat(){ return typeof POWERS !== 'undefined' && POWERS[currentPower] && POWERS[currentPower].id === 'x'; }
// PLAYER_PART_END s6.xBat.1

// index.html:85831 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xDmgDan.1 EDITABLE
function xDmgDan(o){
            if (!o) return 2;
            if (o.dmg) return o.dmg;                // vien dan tu mang sat thuong rieng (lua nhe, F-Laser...)
            if (o.ten === 'nova') return 22;
            if (o.ten === 'bay') return 6;
            if (o.loai === 'falcon') return 5;
            if (o.loai === 'set' || o.loai === 'bang') return 4;
            const K = { lemon: 2, stock: 4, bi: 2, hoa: 2, goo: 3, da: 2, trang: 2, set: 3, flaser: 4, lua: 3, gai: 3, orb: 2, bang: 3,
                        plasma: 5, wing: 4, gaiS: 5, sac3: 6, wingS: 6, xoaylua: 5, cyclone: 6, gaea: 6 };
            if (o.k === 'sac3' && (o.r || 18) < 16) return 4;
            if (o.k && K[o.k]) return K[o.k];
            return 3;
        }
// PLAYER_PART_END s6.xDmgDan.1

// index.html:85844 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xCong.1 EDITABLE
function xCong(n){ xNL = Math.max(0, Math.min(50, xNL + (n || 1))); }
// PLAYER_PART_END s6.xCong.1

// index.html:85845 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xVao.1 EDITABLE
function xVao(){
            if (xChoi || typeof MegaManXBoss !== 'function' || typeof dino === 'undefined' || !dino) return;
            xChoi = new MegaManXBoss(1);
            xChoi.laChoi = true; xChoi.state = 'danh'; xChoi.aS = 'khong'; xChoi.aT = 0;
            xChoi.invulnAll = true; xChoi.hp = xChoi.maxHp; xChoi.giap = 'thuong'; xChoi.vkChon = 'buster'; xChoi.mau = 'thuong';
            xChoi.y = dino.y; xChoi.x = dino.x; xChoi.grounded = true;
            if (!xLuu) xLuu = { hp: dino.hp, max: dino.maxHp };
            dino.maxHp = 10; dino.hp = 10;
            floatingTexts.push(new FloatingText(dino.x - 20, dino.y - 36, "MEGA MAN X"));
        }
// PLAYER_PART_END s6.xVao.1

// index.html:85855 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xRoi.1 EDITABLE
function xRoi(){
            if (xLuu && typeof dino !== 'undefined' && dino){
                dino.maxHp = xLuu.max; dino.hp = Math.min(dino.hp, dino.maxHp); xLuu = null;
            }
            xChoi = null;xArmorMenu=null;
        }
// PLAYER_PART_END s6.xRoi.1

// index.html:85861 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xDoiVk.1 EDITABLE
function xDoiVk(dir){
            if (!xChoi || xChoi.bien) return;
            let ds = ['buster'].concat(MMX_VK);
            let i = ds.indexOf(xChoi.vkChon || 'buster');
            if (i < 0) i = 0;
            xChoi.vkChon = ds[(i + dir + ds.length) % ds.length];
            xChoi.vk = xChoi.vkChon === 'buster' ? null : xChoi.vkChon;
            xChoi.mau = xChoi.vkChon === 'buster' ? 'thuong' : xChoi.vkChon;
            let ten = xChoi.vkChon === 'buster' ? 'X-BUSTER' : MMX_VK_TEN[xChoi.vkChon];
            floatingTexts.push(new FloatingText(dino.x - 30, dino.y - 34, ten));
        }
// PLAYER_PART_END s6.xDoiVk.1

// index.html:85872 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xArmorMenu.1 EDITABLE
let xArmorMenu=null;
// PLAYER_PART_END s6.xArmorMenu.1

// index.html:85873 · Phạm vi: global
// PLAYER_PART_BEGIN s6.X_ARMOR_CHOICES.1 EDITABLE
const X_ARMOR_CHOICES=['fourth','falcon','gaea','ultimate'];
// PLAYER_PART_END s6.X_ARMOR_CHOICES.1

// index.html:85874 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xArmorClose.1 EDITABLE
function xArmorClose(){xArmorMenu=null;for(const k of Object.keys(keys))keys[k]=false;if(xChoi){xChoi._giuK=null;xChoi.sacLv=0;}}
// PLAYER_PART_END s6.xArmorClose.1

// index.html:85875 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xArmorSelect.1 EDITABLE
function xArmorSelect(g){
            const p=xChoi;if(!p)return xArmorClose();const cost=g==='thuong'?0:g==='ultimate'?5:1;
            if(g!==p.giap&&xNL<cost){xArmorMenu.notice=LT('Không đủ năng lượng cho 1 giây.','Not enough energy for one second.');return;}
            xArmorClose();if(g!==p.giap){p.aS='khong';p.aT=0;p.dac=null;p.khoaDi=0;p.vx=p.vy=0;p.batBien(g);}
        }
// PLAYER_PART_END s6.xArmorSelect.1

// index.html:85880 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xArmorOpen.1 EDITABLE
function xArmorOpen(){
            if(!xBat()||!xChoi||xChoi.bien||paused||gameOver||gameVictory)return;
            const bg=document.createElement('canvas');bg.width=canvas.width;bg.height=canvas.height;bg.getContext('2d').drawImage(canvas,0,0);
            xArmorMenu={bg,index:Math.max(0,X_ARMOR_CHOICES.indexOf(xChoi.giap)),notice:'',portraits:X_ARMOR_CHOICES.map(g=>{const p=new MegaManXBoss(1);p.giap=g;p.mau='thuong';p.laChoi=true;p.aS='khong';p.grounded=true;p.vx=0;p.chan=0;return p;})};
            for(const k of Object.keys(keys))keys[k]=false;xChoi._giuK=null;xChoi.sacLv=0;
        }
// PLAYER_PART_END s6.xArmorOpen.1

// index.html:85886 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xArmorKey.1 EDITABLE
function xArmorKey(e){
            e.preventDefault();if(e.repeat)return;
            if(e.code==='Escape')return xArmorClose();if(e.code==='Digit0')return xArmorSelect('thuong');
            const n=['Digit1','Digit2','Digit3','Digit4'].indexOf(e.code);if(n>=0)return xArmorSelect(X_ARMOR_CHOICES[n]);
            if(['KeyQ','ArrowLeft','KeyA'].includes(e.code))xArmorMenu.index=(xArmorMenu.index+3)%4;
            if(['KeyE','ArrowRight','KeyD'].includes(e.code))xArmorMenu.index=(xArmorMenu.index+1)%4;
            if(e.code==='Enter'||e.code==='Space')xArmorSelect(X_ARMOR_CHOICES[xArmorMenu.index]);
        }
// PLAYER_PART_END s6.xArmorKey.1

// index.html:85894 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xArmorRects.1 EDITABLE
function xArmorRects(){const w=Math.min(180,(canvas.width-100)/4),gap=14,left=(canvas.width-(w*4+gap*3))/2,y=canvas.height/2-120;return X_ARMOR_CHOICES.map((g,i)=>({g,x:left+i*(w+gap),y,w,h:230}));}
// PLAYER_PART_END s6.xArmorRects.1

// index.html:85895 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xArmorClick.1 EDITABLE
function xArmorClick(e){const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*canvas.width/r.width,y=(e.clientY-r.top)*canvas.height/r.height;for(const b of xArmorRects())if(x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h)return xArmorSelect(b.g);if(x>=canvas.width/2-150&&x<=canvas.width/2+150&&y>=canvas.height/2+135&&y<=canvas.height/2+175)xArmorSelect('thuong');}
// PLAYER_PART_END s6.xArmorClick.1

// index.html:85896 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xArmorDraw.1 EDITABLE
function xArmorDraw(){
            const m=xArmorMenu;if(!m)return;ctx.save();ctx.setTransform(DPR,0,0,DPR,0,0);ctx.drawImage(m.bg,0,0);ctx.fillStyle='rgba(3,9,23,.88)';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.textAlign='center';ctx.font='bold 24px Consolas';ctx.fillStyle='#cdeeff';ctx.fillText(LT('CHỌN GIÁP X','SELECT X ARMOR'),canvas.width/2,canvas.height/2-166);ctx.font='13px Consolas';ctx.fillStyle='#91a9c3';ctx.fillText(LT('ĐÃ TẠM DỪNG · Năng lượng ','PAUSED · Energy ')+xNL+'/50',canvas.width/2,canvas.height/2-139);
            xArmorRects().forEach((b,i)=>{const active=m.index===i,col=MMX_GIAP_MAU[b.g],cost=b.g==='ultimate'?5:1;ctx.fillStyle=active?'#1c3048':'#101b2d';ctx.fillRect(b.x,b.y,b.w,b.h);ctx.strokeStyle=active?col:'#34455e';ctx.lineWidth=active?3:1;ctx.strokeRect(b.x,b.y,b.w,b.h);ctx.save();ctx.beginPath();ctx.rect(b.x+5,b.y+5,b.w-10,160);ctx.clip();ctx.translate(b.x+b.w/2-30,b.y+28);ctx.scale(1.6,1.6);m.portraits[i].veThan(0,0,1,{});ctx.restore();ctx.font='bold 13px Consolas';ctx.fillStyle=col;ctx.fillText((i+1)+' · '+b.g.toUpperCase(),b.x+b.w/2,b.y+177);ctx.font='12px Consolas';ctx.fillStyle=xNL>=cost?'#dbe6f4':'#e77f83';ctx.fillText(cost+LT(' năng lượng / giây',' energy / second'),b.x+b.w/2,b.y+199);if(xChoi.giap===b.g){ctx.fillStyle='#91edb3';ctx.fillText(LT('ĐANG DÙNG','EQUIPPED'),b.x+b.w/2,b.y+218);}});
            ctx.fillStyle='#193b53';ctx.fillRect(canvas.width/2-150,canvas.height/2+135,300,40);ctx.fillStyle='#9ee2ff';ctx.font='bold 14px Consolas';ctx.fillText(LT('0 · VỀ X THƯỜNG — KHÔNG HAO','0 · BASE X — NO DRAIN'),canvas.width/2,canvas.height/2+160);ctx.font='12px Consolas';ctx.fillStyle='#a5b9d0';ctx.fillText(m.notice||LT('Q/E hoặc ←/→ chọn · Enter xác nhận · Esc đóng · Có thể nhấp chuột','Q/E or arrows select · Enter confirm · Esc close · Click a card'),canvas.width/2,canvas.height/2+205);ctx.restore();
        }
// PLAYER_PART_END s6.xArmorDraw.1

// index.html:85901 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xDoiGiap.1 EDITABLE
function xDoiGiap(dir){xArmorOpen();}
// PLAYER_PART_END s6.xDoiGiap.1

// index.html:85902 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xBan.1 EDITABLE
function xBan(){
            let p = xChoi;
            if (!p || p.aS !== 'khong' || p.bien || p.dac) return;
            if ((p.vkChon || 'buster') === 'buster'){
                if(p.giap==='gaea'){if(p._gaeaShotCd>0)return;p.face();let q=p.vec(10,0);p.ban('gaea',q.vx,q.vy,15,{di:0,dmg:2,maxRange:165,gaeaTap:true});p._gaeaShotCd=6;return;}
                if (Math.abs(typeof dashVx !== 'undefined' ? dashVx : 0) > 0.5) p.batDon('luotban');
                else p.batDon('lemon');
                return;
            }
            p.vk = p.vkChon;
            p.batDon('vk');
        }
// PLAYER_PART_END s6.xBan.1

// index.html:85914 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xNhaK.1 EDITABLE
function xNhaK(){
            let p = xChoi;
            if (!p) return;
            let giu = p._giuK===null||p._giuK===undefined?0:frames-p._giuK;
            p._giuK = null;
            if (p.aS === 'khong') p.sacLv = 0;
            if (p.aS !== 'khong' || p.bien || p.dac || giu < (p.giap==='gaea'?4:10)) return;
            let lv = p.giap==='gaea'?(giu<8?1:giu<12?2:3):(giu<24?1:giu<48?2:3);
            if (p.giap === 'ultimate' && dino && !dino.grounded){ p.batDon('soul'); return; }
            if (p.giap === 'ultimate' && (keys['KeyS'] || keys['ArrowDown'])){ p.batDon('frost'); return; }
            if (p.giap === 'ultimate' && Math.abs(typeof dashVx !== 'undefined' ? dashVx : 0) > 0.5){ p.batDon('cyclone'); return; }
            if ((p.vkChon || 'buster') === 'buster'){
                if (p.giap === 'fourth' || p.giap === 'ultimate'){ p.batDon('plasma'); return; }
                if (p.giap === 'falcon'){ p.batDon('falconBan'); return; }
                if (p.giap === 'gaea'){if(lv<3){p.face();let q=p.vec(10,0);p.ban('gaea',q.vx,q.vy,lv===2?20:17,{di:0,dmg:lv===2?10:5,maxRange:155});}else p.batDon('gaeaBan');return;}
                p.face();
                if (lv >= 3){ let q = p.vec(10, 0); p.ban('sac3', q.vx, q.vy, 18, { xuyen: 1, dmg: 22 }); }          // nap day: XUYEN moi ke dich
                else if (lv === 2){ let q = p.vec(11, 0); p.ban('sac3', q.vx, q.vy, 12, { dmg: 10 }); }
                else { let q = p.vec(12, 0); p.ban('lemon', q.vx, q.vy, 8, { dmg: 3 }); }
                return;
            }
            if (lv < 2) return;
            p.vk = p.vkChon;
            p.batDon('vkS');
        }
// PLAYER_PART_END s6.xNhaK.1

// index.html:85939 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xUlt.1 EDITABLE
function xUlt(){
            let p = xChoi;
            if (!p || p.bien || p.aS !== 'khong' || p.dac) return;
            if (p.giap === 'thuong'){ floatingTexts.push(new FloatingText(dino.x - 40, dino.y - 34, "KHÔNG CÓ CHIÊU CUỐI")); return; }
            if (p.giap === 'fourth'){ if ((p.cd.stock || 0) > 0) return; p.batDon('stock'); return; }
            if (p.giap === 'falcon'){ if (p.gigaDa) return; p.batDon('falconGiga'); return; }
            if (p.giap === 'gaea'){ if (p.gigaDa) return; p.batDon('gaeaGiga'); return; }
            if ((p.cd.nova || 0) > 0) return;
            p.batDon('nova');
        }
// PLAYER_PART_END s6.xUlt.1

// index.html:85949 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xAnPhim.1 EDITABLE
function xAnPhim(code, lap){
            if (!xBat() || !xChoi) return false;
            if (['KeyJ', 'KeyK', 'KeyQ', 'KeyE', 'KeyI', 'KeyO', 'KeyU'].indexOf(code) < 0) return false;
            keys[code] = true;
            if (lap) return true;
            if (code === 'KeyJ') xBan();
            else if (code === 'KeyK') xChoi._giuK = frames;
            else if (code === 'KeyQ') xDoiGiap(-1);
            else if (code === 'KeyE') xDoiGiap(1);
            else if (code === 'KeyI') xDoiVk(-1);
            else if (code === 'KeyO') xDoiVk(1);
            else if (code === 'KeyU') xUlt();
            return true;
        }
// PLAYER_PART_END s6.xAnPhim.1

// index.html:85963 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xTick.1 EDITABLE
function xTick(){
            if (!xBat() || typeof dino === 'undefined' || !dino){ if (xChoi || xLuu) xRoi(); return; }
            if (!xChoi) xVao();
            let p = xChoi;
            if (!p) return;
            let khoa = !!(p.bien || p.dac || p.aS === 'falconGiga' || p.aS === 'gaeaGiga');
            if (!khoa){
                p.x = dino.x + (dino.w - p.w) / 2;
                p.y = dino.y + dino.h - p.h;
                p.grounded = !!dino.grounded;
                p.facingLeft = !!dino.isFacingLeft;
                if (dino.grounded) p.baseY = p.y;
                p.vx = (keys['KeyA'] || keys['ArrowLeft']) ? -3 : (keys['KeyD'] || keys['ArrowRight']) ? 3 : 0;
                if (p.giap === 'thuong' && p.aS === 'khong' && dino.grounded && Math.abs(typeof dashVx !== 'undefined' ? dashVx : 0) > 2
                    && (!wildernessOn() && (dino.x < 18 || dino.x > canvas.width - dino.w - 18)) && (p._tuongCd || 0) <= 0){
                    p._tuongCd = 80;
                    p.batDac('tuong', { pha: 0, ben: dino.x < canvas.width / 2 ? -1 : 1 });
                    khoa = true;
                }
                if (p.giap === 'falcon' && !dino.grounded && Math.abs(typeof dashVx !== 'undefined' ? dashVx : 0) > 2 && p.aS === 'khong' && (p._bayCd || 0) <= 0){
                    p._bayCd = 70;
                    p.batDac('bay', { pha: 0 }); khoa = true;
                }
                if ((p.giap === 'fourth' || p.giap === 'ultimate') && !dino.grounded && (keys['Space'] || keys['KeyW'] || keys['ArrowUp']) && p.aS === 'khong' && (dino.dy || 0) >= 0){
                    p.batDac('hover', { pha: 1, t: 0 }); khoa = true;
                }
            }
            if ((p._tuongCd || 0) > 0) p._tuongCd--;
            if ((p._bayCd || 0) > 0) p._bayCd--;
            if(p.giap!=='thuong'&&!p.bien){
                p._energyTick=(p._energyTick||0)+1;if(p._energyTick>=60){p._energyTick=0;xNL=Math.max(0,xNL-(p.giap==='ultimate'?5:1));}
                if(xNL<=0){p.aS='khong';p.dac=null;p.khoaDi=0;p.batBien('thuong');}
            }
            if((p._gaeaShotCd||0)>0)p._gaeaShotCd--;
            if(p.giap==='gaea'&&keys.KeyJ&&!keys.KeyK)xBan();
            if (keys['KeyK'] && Number.isFinite(p._giuK) && p.aS === 'khong'){
                let g = frames - p._giuK;
                p.sacLv=p.giap==='gaea'?(g<8?1:g<12?2:3):(g<16?1:g<36?2:3);
            }
            p.laChoi = true;
            if(p.giap==='thuong'&&!p.bien){if(++xNLt>=XNL_TICK){xNLt=0;xCong(1);}}
            p.update();
            if (khoa || p.dac || p.bien || p.aS === 'falconGiga'){
                dino.x = p.x + (p.w - dino.w) / 2;
                dino.y = p.y + p.h - dino.h;
                dino.dy = p.vy || 0;
                dino.grounded = !!p.grounded;
            }
            dino._xAn = true;
        }
// PLAYER_PART_END s6.xTick.1

// index.html:86013 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xVe.1 EDITABLE
function xVe(){
            if (!xBat() || !xChoi) return;
            try { xChoi.draw(); } catch(e){}
            // nang luong / giap / thoi gian da chuyen len HUD (xHudVe, xHudVuKhi) — khong con chu tren dau nguoi choi
        }
// PLAYER_PART_END s6.xVe.1

// index.html:86018 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xTenVk.1 EDITABLE
function xTenVk(){ return (xChoi && (xChoi.vkChon || 'buster') !== 'buster') ? MMX_VK_TEN[xChoi.vkChon] : 'X-BUSTER'; }
// PLAYER_PART_END s6.xTenVk.1

// index.html:86020 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xHudVuKhi.1 EDITABLE
function xHudVuKhi(){
            if (!xChoi) return;
            ctx.save(); ctx.textAlign = 'left';
            ctx.font = "bold 15px Consolas, monospace"; hudChu(LT("VŨ KHÍ", "WEAPON"), 20, 65);
            ctx.font = "bold 14px Consolas, monospace"; hudChu(xTenVk(), 100, 65, "#4FC3F7");
            ctx.restore();
        }
// PLAYER_PART_END s6.xHudVuKhi.1

// index.html:86028 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xHudVe.1 EDITABLE
function xHudVe(ry){
            let p = xChoi; if (!p) return ry;
            const en = currentLang === 'en', f = frames % 24 < 12, san = xNL >= 50;
            ctx.save(); ctx.textAlign = 'left';
            // --- NANG LUONG: 5 vach, moi vach 10 ---
            ctx.font = "bold 11px Consolas, monospace"; hudChu(en ? "ENERGY" : "NĂNG LƯỢNG", 20, ry + 9);
            ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(120, ry, 120, 9);
            ctx.fillStyle = san ? (f ? "#FFD54F" : "#FFB300") : "#42A5F5"; ctx.fillRect(120, ry, 120 * Math.min(50, xNL) / 50, 9);
            ctx.strokeStyle = "rgba(0,0,0,0.55)"; ctx.lineWidth = 1;
            for (let k = 1; k < 5; k++){ ctx.beginPath(); ctx.moveTo(120 + k * 24, ry); ctx.lineTo(120 + k * 24, ry + 9); ctx.stroke(); }
            ctx.strokeStyle = "black"; ctx.strokeRect(120, ry, 120, 9);
            ctx.fillStyle = san ? "#FF6F00" : "#0D47A1"; ctx.font = "bold 9px Consolas, monospace"; ctx.fillText(xNL + "/50", 246, ry + 8);
            ry += 18;
            // --- GIAP + THOI GIAN CON LAI ---
            let g = p.bien ? p.bien.g : p.giap;
            let ten = g === 'thuong' ? (en ? "NO ARMOR" : "GIÁP: THƯỜNG") : ((en ? "ARMOR " : "GIÁP ") + (MMX_GIAP_TEN[g] || '').replace('X — ', '').replace(' ARMOR', ''));
            ctx.font = "bold 11px Consolas, monospace"; hudChu(ten, 20, ry + 9, g === 'ultimate' ? "#FFD54F" : "#FFFFFF");
            ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(120, ry, 120, 9);
            let frac = p.bien ? 1 : (g !== 'thuong' ? Math.max(0, Math.min(1, xNL / 50)) : 0);
            ctx.fillStyle = g === 'ultimate' ? "#FFD54F" : (g === 'falcon' ? "#FFB74D" : (g === 'gaea' ? "#81C784" : "#64B5F6"));
            if (p.bien && f) ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(120, ry, 120 * frac, 9);
            ctx.strokeStyle = "black"; ctx.strokeRect(120, ry, 120, 9);
            ctx.fillStyle = "#37474F"; ctx.font = "bold 9px Consolas, monospace";
            ctx.fillText(p.bien ? (en ? "SWAP" : "ĐỔI") : (g !== 'thuong' ? (xNL/(g==='ultimate'?5:1)).toFixed(1)+'s' : '—'), 246, ry + 8);
            ry += 18;
            // --- goi y vao thang Ultimate ---
            if (!p.bien){
                ctx.font = "bold 11px Consolas, monospace";
                hudChu(en ? "Q / E: SELECT ARMOR" : "Q / E: CHỌN GIÁP", 20, ry + 9, f ? "#FFD54F" : "#FF8F00");
                ry += 18;
            }
            ctx.restore();
            return ry;
        }
// PLAYER_PART_END s6.xHudVe.1
