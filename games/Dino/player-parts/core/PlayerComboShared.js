// PLAYER_FILE: PlayerComboShared
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, danteBossWindows, danteIsBoss, dswControl, frames, shakeTimer, visualEffects
// index.html:106563 · Phạm vi: global
// PLAYER_PART_BEGIN s12.DANTE_ATTACK_RATE.1 EDITABLE
const DANTE_ATTACK_RATE=.8, VERGIL_ATTACK_RATE=.65;
// PLAYER_PART_END s12.DANTE_ATTACK_RATE.1

// index.html:106564 · Phạm vi: global
// PLAYER_PART_BEGIN s12.playerAttackStep.1 EDITABLE
function playerAttackStep(a,rate){
 a._lastCombatTick=frames;
 a._attackClock=(a._attackClock??1-rate)+rate;
 if(a._attackClock<1-1e-9)return false;
 a._attackClock-=1;return true;
}
// PLAYER_PART_END s12.playerAttackStep.1

// index.html:106570 · Phạm vi: global
// PLAYER_PART_BEGIN s12.playerComboCancel.1 EDITABLE
function playerComboCancel(a){
 const end=a.end??a.cancel??a.T??a.duration;
 return Math.max(a.cancel??end,Math.min((a.T??a.duration)-1,end+3));
}
// PLAYER_PART_END s12.playerComboCancel.1

// index.html:106575 · Phạm vi: global
// PLAYER_PART_BEGIN s12.playerComboBuffer.1 EDITABLE
function playerComboBuffer(queue,cmd){queue.splice(0,queue.length,cmd);}
// PLAYER_PART_END s12.playerComboBuffer.1

// index.html:106578 · Phạm vi: global
// PLAYER_PART_BEGIN s12.PLAYER_FINISH_ROUTES.1 EDITABLE
const PLAYER_FINISH_ROUTES={
 dsd:[['a1','a2','a3'],['a1','bspin','bstab','thrust'],['air1','air2','air3','air4'],['dhit','ddown','dup','dcross','dspin','dstab','dwave1','dwave2','dfinish']],
 balrog:[['j1','j2','j3','j4'],['k1','k2','k3'],['pyro1','pyro2','pyro3'],['airj1','airj2','airj3'],['a1','a2','retreat_round','flydragon1','flydragon2']],
 cavaliere:[['j1','j2','j3'],['k1_rush','k2_drift','k3_redline']],
 cerberus:[['j1','j2','j3','j4'],['k1','k2','k3']],
 faust:[['slash','slash','upper']],
 vergil:[['a1','a2','a3','a4'],['a1','a2','c_flurry','c_finish'],['air1','air2','air3'],['air1','air2','airb1','airb2'],['m_combo1','m_combo2','m_combo3']]
};
// PLAYER_PART_END s12.PLAYER_FINISH_ROUTES.1

// index.html:106586 · Phạm vi: global
// PLAYER_PART_BEGIN s12.playerComboTrack.1 EDITABLE
function playerComboTrack(p,a,weapon){
 const prev=p._comboMove,T=prev?.T??prev?.duration,cancel=prev?.faust?16:(prev?.cancel??prev?.end??T);
 const relay=weapon==='balrog'&&prev?._comboWeapon==='dsd'&&prev.id==='retreat_round'&&a.id==='flydragon1';
 const linked=prev&&(prev._comboWeapon===weapon||relay)&&frames-(prev._lastCombatTick??-1000)<=45&&prev.age>=Math.min(cancel,T-1);
 a._comboWeapon=weapon;a._comboPath=[...(linked?prev._comboPath:[]),a.id].slice(-10);
 a._comboFinish=PLAYER_FINISH_ROUTES[weapon].some(route=>route.length<=a._comboPath.length&&route.every((id,i)=>a._comboPath[a._comboPath.length-route.length+i]===id));
 p._comboMove=a;
}
// PLAYER_PART_END s12.playerComboTrack.1

// index.html:106594 · Phạm vi: global
// PLAYER_PART_BEGIN s12.playerFinisherControl.1 EDITABLE
function playerFinisherControl(n,p,a,target,opt={}){
 const o=target?.__goc||target;
 if(!a?._comboFinish||!o||o.hp<=0||o.invulnAll||o._beamClashPoint)return false;
 if(a.hits&&opt.pulse!==undefined&&opt.pulse!==a.hits.length-1)return false;
 if(a._finishHits?.has(o))return true; // Never renew the impulse/stun on later contacts.
 const boss=danteIsBoss(o),window=boss?danteBossWindows.get(o):null;
 if(boss&&frames<(window?.finishReady??-1000))return false;
 (a._finishHits||(a._finishHits=new WeakSet())).add(o);
 if(boss)danteBossWindows.set(o,{...window,until:frames+12,ready:Math.max(window?.ready||0,frames+132),finishReady:frames+60});
 const push=Math.max(24,Math.abs(opt.push||a.push||0))*(a.dir||1)*(boss?0.6:1);
 const launch=!boss&&(opt.launch??a.launch),slam=!boss&&(opt.slam??a.slam);
 const c=dswControl(o,{push,wall:!!(opt.wall||a.wall),launch,slam},p);
 if(!c)return false;
 c.hold=false;if(!launch)c.targetY=null;
 if(boss){c.air=false;c.slam=false;c.vy=0;c.stun=12;}
 visualEffects.push(new Effect(o.x+(o.w||40)/2,o.y+(o.h||48)/2,'explosion',push<0,42));
 shakeTimer=Math.max(shakeTimer,12);
 return true;
}
// PLAYER_PART_END s12.playerFinisherControl.1
