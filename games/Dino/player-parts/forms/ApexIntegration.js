// PLAYER_FILE: ApexIntegration
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: AI_HOSO, AMMO_CHITIET_EN, AMMO_CHITIET_VI, AMMO_NAMES, AMMO_NHOM, CHARGE_TIERS, Effect, LT, PVP_HS, PVP_SAN, Player, STY_DPS, UNITY_PAL_SRC, ammoColors, apexCreate, apexOn, canvas, combatStance, ctx, currentAmmoType, currentForm, currentPower, currentShieldType, dino, dkNenY, dojoMode, drawCustomMenu, drawLeafPlatform, drawUI, frames, gameOver, gameState, gameVictory, keys, paused, phuKien, platforms, previewDino, projectiles, runeSlots, sgClashTargets, startGame, ultCharge, visualEffects, vkDangKy, worldL, worldR, wrapText, xDatForm
// index.html:101196 · Phạm vi: global
// PLAYER_PART_BEGIN s8.APEX_VARIANT_LABELS.1 EDITABLE
const APEX_VARIANT_LABELS=['EMERALD','MAGMA','CYBER','NEBULA','OBELITH'];
// PLAYER_PART_END s8.APEX_VARIANT_LABELS.1

// index.html:101197 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexColor.1 EDITABLE
let apexColor=0,apexLoadout=null;
// PLAYER_PART_END s8.apexColor.1

// index.html:101198 · Phạm vi: global
// PLAYER_PART_BEGIN s8.TryStatement.1 EDITABLE
try{apexColor=Math.max(0,Math.min(4,+localStorage.getItem('dino_apex_color')||0));}catch(e){}
// PLAYER_PART_END s8.TryStatement.1

// index.html:101199 · Phạm vi: global
// PLAYER_PART_BEGIN s8.APEX_ROLES.1 EDITABLE
const APEX_ROLES=[["ĐÁNH XA: cầu nhỏ +1; tối đa 5 tia phụ; cầu xoáy tổng 18.", "RANGED: small orbs +1; up to 5 subshots; spiral total 18."], ["CẬN CHIẾN: +1 sát thương, +20% tầm; cầu tạo bãi dung nham 1/s, 3s.", "MELEE: +1 damage, +20% reach; orbs leave lava 1/s for 3s."], ["KHỐNG CHẾ: xoay gây choáng 0,1s/hit; hất tung 0,2s; kết nổ đẩy lùi.", "CONTROL: spins stun 0.1s/hit; launch 0.2s; finale knocks back."], ["ĐỘT KÍCH: Dash +2 sát thương, xa +25%; khiên tím chắn đạn phía trước.", "ASSAULT: dash +2 damage, +25% distance; forward projectile shield."]],APEX_ULT_TEXT=[["U: tụ 1,5s, tia 100 sát thương/1s, đẩy sát tường. Kết liễu hóa tro.", "U: charge 1.5s, beam 100 damage/1s; wall push, ash finisher."], ["U: 10s. +2/hit, tầm x1,5; hào quang 5/s, dải dung nham 3/s.", "U: 10s. +2/hit, reach x1.5; aura 5/s, lava trail 3/s."], ["U: hố đen hút địch; 7 nhát x10, bổ cuối 30. Kết liễu chẻ đôi.", "U: black hole pull; 7 cuts x10, final cleave 30. Split finisher."], ["U: biến mất, cắt xuyên toàn màn hình: 100 sát thương. Kết liễu vỡ mảnh.", "U: vanish, screen-wide cuts: 100 damage. Shatter finisher."]];
// PLAYER_PART_END s8.APEX_ROLES.1

// index.html:101200 · Phạm vi: global
// PLAYER_PART_BEGIN s8.APEX_ROLES.push.1 EDITABLE
APEX_ROLES.push(['OBELITH: hai khối chờ leo 5s; bước lên bắt đầu 5s sử dụng, sau đó hồi 10s. Leo lên, đứng 1s để nạp K; K quét ba góc trong 2s, mỗi kẻ địch trúng tia nhận 20 sát thương.','OBELITH: two high shrines wait 5s for a landing; first landing starts 5s of use, then 10s cooldown. Climb up and stand for 1s to empower K; K sweeps three corners over 2s, dealing 20 damage once to each enemy touched.']);
// PLAYER_PART_END s8.APEX_ROLES.push.1

// index.html:101201 · Phạm vi: global
// PLAYER_PART_BEGIN s8.APEX_ULT_TEXT.push.1 EDITABLE
APEX_ULT_TEXT.push(['U: trụ lớn nâng lên, tụ 1,5s rồi xoáy cong lên, bổ thiên thạch vào Boss: 150 sát thương. Không Boss: map chạy bình thường, nảy 3s, 25/lần xuyên (tối đa 150/mục tiêu), bay cong về chân trụ. Kết liễu chẻ đôi.','U: rise on a great pillar, charge for 1.5s, then arc upward and meteor-dive into a boss for 150 damage. Without a boss: the world keeps moving; ricochet for 3s, 25/pass (150 max per target), arc back to the pillar base. Split finisher.']);
// PLAYER_PART_END s8.APEX_ULT_TEXT.push.1

// index.html:101202 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexRoleText.1 EDITABLE
function apexRoleText(){return LT(...APEX_ROLES[apexColor]);}
// PLAYER_PART_END s8.apexRoleText.1

// index.html:101203 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexUltText.1 EDITABLE
function apexUltText(){return LT(...APEX_ULT_TEXT[apexColor]);}
// PLAYER_PART_END s8.apexUltText.1

// index.html:101204 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexSetColor.1 EDITABLE
function apexSetColor(v){const n=APEX_ROLES.length;apexColor=((v%n)+n)%n;localStorage.setItem('dino_apex_color',apexColor);}
// PLAYER_PART_END s8.apexSetColor.1

// index.html:101205 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexActive.1 EDITABLE
function apexActive(n){return apexOn()&&n&&n.id===1&&['normal','boss_rush','test_boss'].includes(gameState)&&!gameOver&&!gameVictory;}
// PLAYER_PART_END s8.apexActive.1

// index.html:101206 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexSync.1 EDITABLE
function apexSync(){
 if(apexOn()){
  if(!apexLoadout)apexLoadout={power:currentPower,ammo:currentAmmoType,accessory:phuKien,stance:combatStance,runes:runeSlots.slice()};
  currentPower=0;currentAmmoType=21;phuKien=0;combatStance=0;runeSlots=[null,null];
 }else if(apexLoadout){const s=apexLoadout;currentPower=s.power;currentAmmoType=s.ammo;phuKien=s.accessory;combatStance=s.stance;runeSlots=s.runes.slice();apexLoadout=null;}
}
// PLAYER_PART_END s8.apexSync.1

// index.html:101212 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexSetFormBase.1 EDITABLE
const apexSetFormBase=xDatForm;
// PLAYER_PART_END s8.apexSetFormBase.1

// index.html:101213 · Phạm vi: global
// PLAYER_PART_BEGIN s8.xDatForm.1 EDITABLE
xDatForm=function(i){if(apexOn()){currentForm=0;apexSync();}apexSetFormBase(i);apexSync();};
// PLAYER_PART_END s8.xDatForm.1

// index.html:101214 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexCustomBase.1 EDITABLE
const apexCustomBase=drawCustomMenu;
// PLAYER_PART_END s8.apexCustomBase.1

// index.html:101215 · Phạm vi: global
// PLAYER_PART_BEGIN s8.drawCustomMenu.1 EDITABLE
drawCustomMenu=function(){apexSync();apexCustomBase();if(apexOn()){
 ctx.save();ctx.fillStyle='#120c06';ctx.fillRect(24,76,276,canvas.height-150);
 ctx.fillStyle='#76e7bd';ctx.font='bold 20px Consolas,monospace';ctx.textAlign='left';ctx.fillText('APEX · 8 HP',40,106);
 ctx.font='12px Consolas,monospace';ctx.fillStyle='#c2d8d0';apexWrap(LT('POWER / RUNE / PHỤ KIỆN: KHÓA\nNăm biến thể có vai trò riêng.\nQ / E: đổi biến thể trong trận\n\nW / Space: nhảy, bật tường\nA / D: chạy, bám tường\nS: cúi / buông mép\nShift: Dash\nJ: cào; giữ: cắn / cưa\nK: tụ đạn · L: khiên\nU: chiêu cuối khi đủ 100%','POWER / RUNES / ACCESSORIES: LOCKED\nFive combat variants.\nQ / E: switch variant in battle\n\nW / Space: jump, wall kick\nA / D: run, wall cling\nS: crouch / release\nShift: dash\nJ: claw; hold: bite / saw\nK: charge · L: shield\nU: ultimate at 100%'),40,136,240,20);ctx.restore();
 // The shared Form preview below draws Apex too.
 ctx.fillStyle='#0a0e14';ctx.fillRect(702,80,272,436);ctx.fillStyle='#76e7bd';ctx.font='bold 28px Consolas,monospace';ctx.textAlign='center';ctx.fillText('APEX',838,235);ctx.font='14px Consolas,monospace';ctx.fillText(LT('RUNE BỊ KHÓA','RUNES LOCKED'),838,272);ctx.textAlign='left';ctx.font='12px Consolas,monospace';ctx.fillStyle='#c2d8d0';apexWrap(apexRoleText()+'\n\n'+apexUltText(),714,305,248,17);
}};
// PLAYER_PART_END s8.drawCustomMenu.1

// index.html:101222 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexWrap.1 EDITABLE
function apexWrap(text,x,y,w,h){for(const line of text.split('\n'))y=wrapText(line,x,y,w,h);return y;}
// PLAYER_PART_END s8.apexWrap.1

// index.html:101223 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexStartBase.1 EDITABLE
const apexStartBase=startGame;
// PLAYER_PART_END s8.apexStartBase.1

// index.html:101224 · Phạm vi: global
// PLAYER_PART_BEGIN s8.startGame.1 EDITABLE
startGame=function(mode){if(mode==='pvp'&&apexOn()){xDatForm(0);}apexSync();apexStartBase(mode);if(apexOn())apexInit(dino);};
// PLAYER_PART_END s8.startGame.1

// index.html:101225 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexInit.1 EDITABLE
function apexInit(n){n.form=0;n.ammoType=21;n.maxHp=n.hp=8;n.w=30.8;n.h=52.8;n.y=dkNenY()-n.h;n.maxAmmo=n.ammo=1;n.apex=apexCreate(n);ultCharge=dojoMode?100:0;}
// PLAYER_PART_END s8.apexInit.1

// index.html:101226 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexUpdateBase.1 EDITABLE
const apexUpdateBase=Player.prototype.update;
// PLAYER_PART_END s8.apexUpdateBase.1

// index.html:101227 · Phạm vi: global
// PLAYER_PART_BEGIN s8.Player.prototype.update.1 EDITABLE
Player.prototype.update=function(){if(apexActive(this)){if(!this.apex)apexInit(this);this.apex.tick();return;}return apexUpdateBase.call(this);};
// PLAYER_PART_END s8.Player.prototype.update.1

// index.html:101228 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexDrawBase.1 EDITABLE
const apexDrawBase=Player.prototype.draw;
// PLAYER_PART_END s8.apexDrawBase.1

// index.html:101229 · Phạm vi: global
// PLAYER_PART_BEGIN s8.Player.prototype.draw.1 EDITABLE
Player.prototype.draw=function(...a){if(apexOn()&&this.id===1&&this.apex){this.apex.draw();return;}return apexDrawBase.apply(this,a);};
// PLAYER_PART_END s8.Player.prototype.draw.1

// index.html:101230 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexPreviewBase.1 EDITABLE
const apexPreviewBase=Player.prototype.drawForm;
// PLAYER_PART_END s8.apexPreviewBase.1

// index.html:101231 · Phạm vi: global
// PLAYER_PART_BEGIN s8.Player.prototype.drawForm.1 EDITABLE
Player.prototype.drawForm=function(...a){if(apexOn()&&this===previewDino){if(!this.apex)this.apex=apexCreate(this);this.apex.preview(a[1],a[2]);return;}return apexPreviewBase.apply(this,a);};
// PLAYER_PART_END s8.Player.prototype.drawForm.1

// index.html:101232 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexShieldBase.1 EDITABLE
const apexShieldBase=Player.prototype.isShielding;
// PLAYER_PART_END s8.apexShieldBase.1

// index.html:101233 · Phạm vi: global
// PLAYER_PART_BEGIN s8.Player.prototype.isShielding.1 EDITABLE
Player.prototype.isShielding=function(){if(apexOn()&&this.id===1)return !!(this.apex&&this.meleeTimer>0);return apexShieldBase.call(this);};
// PLAYER_PART_END s8.Player.prototype.isShielding.1

// index.html:101234 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexDamageBase.1 EDITABLE
const apexDamageBase=Player.prototype.takeDamage;
// PLAYER_PART_END s8.apexDamageBase.1

// index.html:101235 · Phạm vi: global
// PLAYER_PART_BEGIN s8.Player.prototype.takeDamage.1 EDITABLE
Player.prototype.takeDamage=function(...args){if(this.apex&&this.apex.ultimate())return;if(apexActive(this)&&this.isShielding()){visualEffects.push(new Effect(this.x+this.w/2,this.y+this.h/2,'parry'));return;}return apexDamageBase.apply(this,args);};
// PLAYER_PART_END s8.Player.prototype.takeDamage.1

// index.html:101236 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexUIBase.1 EDITABLE
const apexUIBase=drawUI;
// PLAYER_PART_END s8.apexUIBase.1

// index.html:101237 · Phạm vi: global
// PLAYER_PART_BEGIN s8.drawUI.1 EDITABLE
drawUI=function(){const active=apexOn()&&dino.apex&&['normal','boss_rush','test_boss'].includes(gameState);if(active){ctx.save();ctx.beginPath();ctx.rect(0,0,canvas.width,canvas.height);ctx.rect(0,44,290,132);ctx.clip('evenodd');apexUIBase();ctx.restore();}else apexUIBase();if(active){
 ctx.save();ctx.fillStyle='#101f29';ctx.fillRect(10,48,224,84);ctx.fillStyle=APEX_SKINS[apexColor].energyGlow;ctx.font='bold 14px Consolas,monospace';ctx.textAlign='left';ctx.fillText('APEX · '+APEX_VARIANT_LABELS[apexColor],20,66);ctx.font='11px Consolas,monospace';ctx.textAlign='right';ctx.fillText('Q/E',224,66);ctx.textAlign='left';ctx.fillStyle='#101f29';ctx.fillRect(10,134,224,25);ctx.fillStyle='#293947';ctx.fillRect(20,149,204,4);ctx.fillStyle=APEX_SKINS[apexColor].energyGlow;ctx.fillRect(20,149,204*Math.min(1,ultCharge/100),4);ctx.font='11px Consolas,monospace';ctx.fillText(dino.apex.isLiveUltimate()?'U · OBELITH '+((dino.apex.ultimate().endAt-dino.apex.ultimate().t)/60).toFixed(1)+'s':dino.apex.magmaRemaining()>0?'U · MAGMA '+(dino.apex.magmaRemaining()/60).toFixed(1)+'s':'U · '+(ultCharge>=100?LT('SẴN SÀNG','READY'):Math.floor(ultCharge)+'%'),20,145);
 ctx.fillStyle='#e6fff7';
 const s=dino.apex.state;ctx.font='11px Consolas,monospace';ctx.fillText('DASH '+(s.dashCooldown>0?(s.dashCooldown/60).toFixed(1)+'s':'READY')+' · WALL '+(s.wallCooldown>0?(s.wallCooldown/60).toFixed(1)+'s':((s.wallBudget??120)/60).toFixed(1)+'s'),20,86);
 ctx.save();ctx.beginPath();ctx.rect(18,91,208,20);ctx.clip();ctx.fillText(s.rangedCharging?'K: '+s.rangedChargeSec.toFixed(2)+'s':s.laserActiveSec>0?'LASER':dino.apex.label(),20,105);ctx.restore();
 ctx.fillStyle='#718b96';ctx.fillText(currentShieldType===0?'L: PARRY · '+(dino.shieldCd>0?(dino.shieldCd/60).toFixed(1)+'s':LT('SẴN SÀNG','READY')):'L: '+Math.ceil(dino.shieldEnergy||0)+'%'+(dino.shieldLock?LT(' · ĐANG HỒI',' · RECHARGING'):dino.isShielding()?LT(' · ĐANG ĐỠ',' · GUARDING'):''),20,124);ctx.restore();
}};
// PLAYER_PART_END s8.drawUI.1

// index.html:101244 · Phạm vi: global
// PLAYER_PART_BEGIN s8.vkDangKy.1 EDITABLE
vkDangKy(21,{ten:'CLAWS',theLuc:1,khongHoiDan:true,khongSac(){return true;},banJ(){},batUltRieng(){if(dino.apex)dino.apex.ultStart();}});
// PLAYER_PART_END s8.vkDangKy.1

// index.html:101245 · Phạm vi: global
// PLAYER_PART_BEGIN s8.AMMO_NAMES.push.1 EDITABLE
AMMO_NAMES.push('CLAWS');
// PLAYER_PART_END s8.AMMO_NAMES.push.1

// index.html:101245 · Phạm vi: global
// PLAYER_PART_BEGIN s8.ammoColors.push.1 EDITABLE
ammoColors.push('#4ade80');
// PLAYER_PART_END s8.ammoColors.push.1

// index.html:101245 · Phạm vi: global
// PLAYER_PART_BEGIN s8.AMMO_NHOM.push.1 EDITABLE
AMMO_NHOM.push(-1);
// PLAYER_PART_END s8.AMMO_NHOM.push.1

// index.html:101245 · Phạm vi: global
// PLAYER_PART_BEGIN s8.UNITY_PAL_SRC.push.1 EDITABLE
UNITY_PAL_SRC.push({c:'#4ade80',d:'#14532d'});
// PLAYER_PART_END s8.UNITY_PAL_SRC.push.1

// index.html:101245 · Phạm vi: global
// PLAYER_PART_BEGIN s8.STY_DPS.push.1 EDITABLE
STY_DPS.push(8);
// PLAYER_PART_END s8.STY_DPS.push.1

// index.html:101245 · Phạm vi: global
// PLAYER_PART_BEGIN s8.PVP_HS.push.1 EDITABLE
PVP_HS.push(1);
// PLAYER_PART_END s8.PVP_HS.push.1

// index.html:101245 · Phạm vi: global
// PLAYER_PART_BEGIN s8.PVP_SAN.push.1 EDITABLE
PVP_SAN.push(0);
// PLAYER_PART_END s8.PVP_SAN.push.1

// index.html:101245 · Phạm vi: global
// PLAYER_PART_BEGIN s8.AI_HOSO.push.1 EDITABLE
AI_HOSO.push({dai:[30,100],ep:true,sac:1,xa:false,moc:[30]});
// PLAYER_PART_END s8.AI_HOSO.push.1

// index.html:101245 · Phạm vi: global
// PLAYER_PART_BEGIN s8.CHARGE_TIERS.push.1 EDITABLE
CHARGE_TIERS.push([[30,'#4ade80'],[90,'#e879f9'],[120,'#fff']]);
// PLAYER_PART_END s8.CHARGE_TIERS.push.1

// index.html:101246 · Phạm vi: global
// PLAYER_PART_BEGIN s8.AMMO_CHITIET_VI.push.1 EDITABLE
AMMO_CHITIET_VI.push(['#CLAWS — DÀNH RIÊNG CHO APEX','-Chọn DẠNG APEX để dùng. 8 HP, khóa Power, Rune và phụ kiện; mục phụ kiện chuyển thành năm biến thể có vai trò và chiêu cuối riêng.','-J: cào 2/2/2/6. J → Nhảy: xoay đuôi ngược lên, 4 sát thương một lần và hất tung; Nhảy → J: chém không trung 2. Giữ J: cắn 6; trên không cưa lưng 4 mỗi 0.25s. Cúi J: kẹp 4 rồi cắn 6.','-Dash (Shift hoặc nhấn đôi A/D): 3 mỗi mục tiêu. Dash → J: xoay hai vòng 5 + 7. J → Dash: xoay tử thần ngay, 4 khi xuyên qua, lặp sau 0,25s. Nhảy kết xoay đuôi hất tung; bấm J trong lúc xoay để kết nổ 6; không tự nổ khi hết đòn.','-K: nhấp dưới 0,25s gây 1; đạn charge nhỏ gây 2. Từ 1,5s: cầu xoáy chạm gây 5, bám gây 1 mỗi 0,2s, tổng tối đa 15. Từ 2s: Laser 1 mỗi 10 frame (6/s), kéo dài 2s. Tia phụ 2 mỗi viên.','-Xanh: cầu nhỏ +1, 5 tia phụ tối đa; cầu xoáy 6 + 2 mỗi nhịp, tối đa 18. Các màu khác tối đa 3 tia phụ.','-Magma: cận chiến +1 sát thương, tầm +20%; cầu năng lượng để lại dung nham 1/s trong 3s. Cyber: xoay khống chế 0,1s mỗi hit; hất tung 0,2s; kết nổ đẩy lùi. Nebula: Dash +2 sát thương, xa +25%, khiên tím chắn đạn phía trước.','-Obelith: hai trụ chờ leo tối đa 5s; lần đầu bước lên bắt đầu 5s sử dụng, rồi hồi 10s; nghỉ bám tường 3s hồi 1s bám. Đứng trên trụ 1s, K quét từ góc dưới cùng phía trụ qua góc dưới đối diện lên góc trên đối diện trong 2s, gây 20 sát thương/mục tiêu; rời trụ sẽ mất nạp. U: trụ nâng lên, tụ 1,5s, có Boss thì xoáy lên và bổ thiên thạch gây 150; không Boss thì map tiếp tục di chuyển và sinh quái; nảy giữa các cạnh 3s, 25/lần xuyên (cách 0,4s, tối đa 150/mục tiêu), bay cong về chân trụ; kết liễu chẻ đôi.','-U (100%): Xanh tụ 1,5s rồi tia 10 mỗi 0,1s trong 1s (100). Magma cường hóa 10s: +2 mỗi hit, tầm x1,5, hào quang 5/s, đường dung nham 3/s. Stalker: 7 x 10 + chém cuối 30. Nebula: cắt toàn màn hình 100. Ba dạng Xanh/Stalker/Nebula khóa hành động trong cinematic.']);
// PLAYER_PART_END s8.AMMO_CHITIET_VI.push.1

// index.html:101247 · Phạm vi: global
// PLAYER_PART_BEGIN s8.AMMO_CHITIET_EN.push.1 EDITABLE
AMMO_CHITIET_EN.push(['#CLAWS — APEX ONLY','-Select APEX form. 8 HP. Power, Runes and accessories locked; colors select distinct combat specialties.','-J claws 2/2/2/6; J → Jump: reverse tail somersault, 4 damage and launch; Jump → J: aerial slash 2; hold bite 6 or air saw 4 per .25s. Crouch J clamp 4 then bite 6.','-Dash 3 per target; Dash J 5+7; J Dash starts death roll immediately, 4 per crossing (0.25s rehit); Jump launches with a tail spin; press J during the roll for a 6-damage finale. No automatic finale.','-Obelith: shrines wait up to 5s for a landing, then allow 5s of use from the first landing. After use or no landing, cooldown is 10s. Rest from climbing for 3s to restore 1s of wall grip. Stand atop for 1s; K sweeps from the near lower corner through the far lower corner to the far upper corner in 2s, dealing 20 damage once per target. Leaving loses charge. U rises on a great pillar, charges for 1.5s and arcs upward then meteor-dives for 150 damage against a boss. Without a boss, the world and spawns keep running; ricochets for 3s, dealing 25 per pass (0.4s rehit, 150 max per target), then arcs back to the retracted pillar. Lethal hits split enemies.','-K tap under 0.25s: 1; charged small shot: 2. 1.5s orb: impact 5, sticks for 1 per 0.2s up to 15 total. 2s laser: 1 per 10 frames (6/s) for 2s. Subshots 2 each. U: Emerald 1.5s charge + 100 beam damage over 1s; Magma 10s buff (+2/hit, +50% reach, aura 5/s, ground trail 3/s); Stalker 7x10+30; Nebula screen-wide 100. The three non-Magma ultimates are cinematics.']);
// PLAYER_PART_END s8.AMMO_CHITIET_EN.push.1

// index.html:101249 · Phạm vi: global
// PLAYER_PART_BEGIN s8.IfStatement.1 EDITABLE
if(apexOn())apexSync();
// PLAYER_PART_END s8.IfStatement.1

// index.html:101250 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexInput.1 EDITABLE
function apexInput(){return keys;}
// PLAYER_PART_END s8.apexInput.1

// index.html:101251 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexInputEvent.1 EDITABLE
function apexInputEvent(code,down){
 if(!dino.apex||paused)return;
 if(down&&(code==='KeyQ'||code==='KeyE')){dino.apex.changeVariant(code==='KeyE'?1:-1);return;}
 dino.apex.events.push({code,down});
}
// PLAYER_PART_END s8.apexInputEvent.1

// index.html:101256 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexNativePlatforms.1 EDITABLE
function apexNativePlatforms(){return platforms;}
// PLAYER_PART_END s8.apexNativePlatforms.1

// index.html:101257 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexLaunch.1 EDITABLE
function apexLaunch(target){
 const o=target.__goc||target;if(!o||o.hp<=0||o.invulnAll||o._beamClashPoint)return;
 if(o._apexLift){o._apexLift.vy=-9;o._apexLift.t=0;return;}
 if(typeof o.update!=='function'){o.dy=-9;if('grounded' in o)o.grounded=false;return;}
 const old=o.update,lift={floor:o.y,vy:-9,t:0,grounded:o.grounded};o._apexLift=lift;
 o.update=function(...args){
  if(this.hp<=0||this.dying){this._apexLift=null;this.update=old;return old.apply(this,args);}
  lift.t++;lift.vy+=.48;this.y+=lift.vy;this.dy=lift.vy;if('grounded' in this)this.grounded=false;
  if(this.y>=lift.floor&&lift.vy>=0||lift.t>=60){this.y=lift.floor;this.dy=0;if(lift.grounded!==undefined)this.grounded=lift.grounded;this._apexLift=null;this.update=old;}
 };
}
// PLAYER_PART_END s8.apexLaunch.1

// index.html:101268 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexDrawObelith.1 EDITABLE
function apexDrawObelith(x,y,w,h,ttl,color='#6ee7e6'){
 ctx.save();ctx.translate(x,y);const warn=ttl!==null&&ttl<40,c=warn?'#ffbd6b':color,cut=Math.min(w*.14,h*.25);
 ctx.fillStyle='#182633';ctx.strokeStyle='#517382';ctx.lineWidth=2;
 ctx.beginPath();ctx.moveTo(cut,0);ctx.lineTo(w-cut,0);ctx.lineTo(w,cut);ctx.lineTo(w,h-cut);ctx.lineTo(w-cut,h);ctx.lineTo(cut,h);ctx.lineTo(0,h-cut);ctx.lineTo(0,cut);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.fillStyle='#344d60';ctx.beginPath();ctx.moveTo(cut,0);ctx.lineTo(w-cut,0);ctx.lineTo(w,cut);ctx.lineTo(0,cut);ctx.closePath();ctx.fill();
 ctx.fillStyle='#0b1522';ctx.beginPath();ctx.moveTo(w*.72,cut);ctx.lineTo(w,cut);ctx.lineTo(w,h-cut);ctx.lineTo(w-cut,h);ctx.lineTo(w*.72,h);ctx.closePath();ctx.fill();
 ctx.strokeStyle=c;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cut+3,cut+3);ctx.lineTo(w-cut-3,cut+3);ctx.moveTo(w*.5,h*.27);ctx.lineTo(w*.58,h*.47);ctx.lineTo(w*.5,h*.7);ctx.lineTo(w*.42,h*.47);ctx.closePath();ctx.moveTo(w*.5,h*.7);ctx.lineTo(w*.5,h*.86);ctx.stroke();
 ctx.globalAlpha=.25+.15*Math.sin(frames*.07);ctx.fillStyle=c;ctx.fillRect(w*.22,h+5,w*.56,3);ctx.globalAlpha=1;
 if(ttl!==null){ctx.fillStyle=c;ctx.fillRect(cut,-6,(w-2*cut)*Math.max(0,ttl)/120,3);}ctx.restore();
}
// PLAYER_PART_END s8.apexDrawObelith.1

// index.html:101278 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexLeafDrawBase.1 EDITABLE
const apexLeafDrawBase=drawLeafPlatform;
// PLAYER_PART_END s8.apexLeafDrawBase.1

// index.html:101279 · Phạm vi: global
// PLAYER_PART_BEGIN s8.drawLeafPlatform.1 EDITABLE
drawLeafPlatform=apexLeafDrawBase;
// PLAYER_PART_END s8.drawLeafPlatform.1

// index.html:101281 · Phạm vi: global
// PLAYER_PART_BEGIN s8.APEX_SKINS.1 EDITABLE
const APEX_SKINS = [
            {
                name: 'Bio-Plasma Emerald',
                primary: '#16a34a',
                secondary: '#14532d',
                armor: '#052e16',
                belly: '#bbf7d0',
                jawInterior: '#be123c',
                eye: '#fde047',
                energyCore: '#ecfccb',
                energyGlow: '#4ade80',
                energyArc: '#22d3ee'
            },
            {
                name: 'Magma Core Behemoth',
                primary: '#451a03',
                secondary: '#270e02',
                armor: '#1c1917',
                belly: '#fed7aa',
                jawInterior: '#ea580c',
                eye: '#38bdf8',
                energyCore: '#fef08a',
                energyGlow: '#f97316',
                energyArc: '#ef4444'
            },
            {
                name: 'Cyber Void Stalker',
                primary: '#1e293b',
                secondary: '#0f172a',
                armor: '#020617',
                belly: '#cbd5e1',
                jawInterior: '#0284c7',
                eye: '#f43f5e',
                energyCore: '#e0f2fe',
                energyGlow: '#38bdf8',
                energyArc: '#818cf8'
            },
            {
                name: 'Void Nebula Rex',
                primary: '#4c1d95',
                secondary: '#2e1065',
                armor: '#1e1b4b',
                belly: '#f5d0fe',
                jawInterior: '#db2777',
                eye: '#a3e635',
                energyCore: '#fae8ff',
                energyGlow: '#e879f9',
                energyArc: '#f43f5e'
            },
            {
                name: 'Obelith Sentinel',
                primary: '#1a202b', secondary: '#0d131e', armor: '#080d16',
                belly: '#283344', jawInterior: '#250b14', eye: '#ff2638',
                energyCore: '#d5efff', energyGlow: '#349cff', energyArc: '#1765ff'
            }
        ];
// PLAYER_PART_END s8.APEX_SKINS.1

// index.html:101340 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexControl.1 EDITABLE
function apexControl(target,ticks,push=0){
 const o=target.__goc||target;if(!o||o.hp<=0||o.invulnAll||o._beamClashPoint)return;
 if(o._apexControl){o._apexControl.t=Math.max(o._apexControl.t,ticks);o._apexControl.push=push||o._apexControl.push;return;}
 if(typeof o.update!=='function')return;
 const old=o.update,c={t:ticks,push};o._apexControl=c;
 o.update=function(...args){if(this.hp<=0||this.dying||c.t<=0){this.update=old;this._apexControl=null;return old.apply(this,args);}c.t--;if(c.push){this.x=Math.max(worldL(),Math.min(worldR()-this.w,this.x+c.push));c.push*=.8;}};
}
// PLAYER_PART_END s8.apexControl.1

// index.html:101347 · Phạm vi: global
// PLAYER_PART_BEGIN s8.apexHostileRounds.1 EDITABLE
function apexHostileRounds(owner){
 const out=sgClashTargets();
 if(gameState==='pvp')for(const p of projectiles)if(p.owner!==owner.id)out.push({o:p,box:p,kill(){const i=projectiles.indexOf(p);if(i>=0)projectiles.splice(i,1);}});
 return out;
}
// PLAYER_PART_END s8.apexHostileRounds.1
