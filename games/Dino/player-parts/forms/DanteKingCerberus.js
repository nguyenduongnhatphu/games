// PLAYER_FILE: DanteKingCerberus
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DANTE_ATTACK_RATE, Effect, Player, SFX, bossProjectiles, canvas, checkAABB, ctx, danteActive, danteControlAllowed, danteDraw, danteHit, danteKey, danteLabel, danteRelease, danteTick, dashCd, dashVx, dino, doDash, dswControl, dswFloor, frames, gameOver, gameVictory, keys, paused, playerAttackStep, playerComboBuffer, playerComboCancel, playerComboTrack, playerFinisherControl, sgTargets, shakeTimer, visualEffects
// index.html:109195 · Phạm vi: global
// PLAYER_PART_BEGIN s12.KCB_MOVES.1 EDITABLE
const KCB_MOVES = {
 // 1. COMBO A (J -> J -> J -> J): Vụt chéo -> Quét ngang -> Chọc gậy lửa 3 phát -> Bổ đập nổ băng
 j1: { name: 'CERBERUS · ICE WHIP SLASH',   T: 17, wind: 3, cancel: 10, end: 13, damage: 2.0, elem: 'ice',  pose: 'slashDown', hits: [5],          advance: 6, pullIn: true },
 j2: { name: 'CERBERUS · FROST SWEEP',      T: 18, wind: 3, cancel: 11, end: 14, damage: 2.0, elem: 'ice',  pose: 'sweepSide', hits: [5],          advance: 7, pullIn: true },
 j3: { name: 'CERBERUS · TRIPLE STAFFPOKE', T: 24, wind: 2, cancel: 18, end: 21, damage: 1.2, elem: 'fire', pose: 'multiPoke', hits: [4, 10, 16],  advance: 8, drag: true },
 j4: { name: 'CERBERUS · GLACIER SMASH',    T: 28, wind: 7, cancel: 20, end: 22, damage: 5.0, elem: 'ice',  pose: 'boSlam',    hits: [9],          advance: 10, push: 14, iceSpike: true },

 // 2. COMBO B (K -> K -> K): Quất Roi Sét Tầm Xa -> Chống Sào Song Phi -> Đập Nổ Hot Stuff
 k1: { name: 'LONG BARREL · THUNDER WHIP',  T: 22, wind: 4, cancel: 14, end: 18, damage: 3.0, elem: 'bolt', pose: 'whip',      hits: [6],          whipGround: true },
 k2: { name: 'ROCK BACK · POLE VAULT KICK', T: 24, wind: 4, cancel: 16, end: 20, damage: 3.5, elem: 'fire', pose: 'poleVault', hits: [7, 13],      advance: 12, drag: true },
 k3: { name: 'HOT STUFF · MAGMA SLAM',      T: 28, wind: 7, cancel: 20, end: 22, damage: 5.0, elem: 'fire', pose: 'boSlam',    hits: [9],          advance: 10, push: 15, fireWave: true },

 // 3. GIỮ K (Hold K): PERCUSSION & THUNDER CLAP (Đập côn gọi 3 cột thiên lôi)
 clap: { name: 'PERCUSSION · THUNDER CLAP', T: 32, wind: 8, cancel: 24, end: 26, damage: 4.0, elem: 'bolt', pose: 'boSlam',    hits: [10],         thunderStorm: true },

 // 4. CHIÊU CHỌC GẬY & ĐẶC BIỆT (Cúi J = Chọc gậy hất tung / Dash J = Đâm trường côn / Dash K = Revolver / Cúi K = Ice Age)
 Kautilya: { name: 'POLE THRUST · RISING STAFF', T: 24, wind: 4, cancel: 14, end: 18, damage: 4.0, elem: 'fire', pose: 'pokeUp',    hits: [6],     launchWithMe: true },
 pole:     { name: 'FLAME SPEAR · STAFF LUNGE',  T: 22, wind: 3, cancel: 14, end: 18, damage: 3.5, elem: 'fire', pose: 'pokeFront', hits: [5, 11], advance: 16, drag: true },
 revolver: { name: 'REVOLVER · ICE WHEEL',       T: 28, wind: 2, cancel: 22, end: 25, damage: 1.2, elem: 'ice',  pose: 'revolver',  hits: [4, 9, 14, 19, 23], advance: 12, drag: true },
 revslam:  { name: 'CRYSTAL · GLACIER SPIKE',    T: 26, wind: 5, cancel: 18, end: 20, damage: 4.5, elem: 'ice',  pose: 'boSlam',    hits: [7],     launch: true, iceSpike: true },
 iceage:   { name: 'ICE AGE · FROST BARRIER',    T: 32, wind: 2, cancel: 24, end: 28, damage: 1.2, elem: 'ice',  pose: 'iceAge',    hits: [4, 9, 14, 19, 24], shieldIce: true },

 // 5. KHÔNG CHIẾN (Air J = Phóng Sét Giật Kéo Lên / Air K = Múa Tam Khúc Trên Không)
 airwhip:  { name: 'AIR THUNDER GRAPPLE',        T: 22, wind: 3, cancel: 13, end: 18, damage: 3.0, elem: 'bolt', pose: 'airWhip',   hits: [5],     whipAirPull: true },
 airdance: { name: 'AERIAL TRI-SECTION DANCE',   T: 28, wind: 2, cancel: 22, end: 25, damage: 1.2, elem: 'tri',  pose: 'airDance',  hits: [3, 7, 11, 15, 19, 23], holdAir: true }
};
// PLAYER_PART_END s12.KCB_MOVES.1

// index.html:109222 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbState.1 EDITABLE
function kcbState(p){
 return p.cerberus || (p.cerberus = {
  elem: 'ice',
  spin: 0,
  holdK: 0,
  airSlow: 0,
  queue: [],
  last: '',
  ended: -1000,
  lastDash: -1000,
  whipLine: null,
  spikes: [],
  bolts: [],
  sparks: [],
  arcs: []            // Lưu vệt vụt côn & mũi chọc gậy
 });
}
// PLAYER_PART_END s12.kcbState.1

// index.html:109239 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbUsing.1 EDITABLE
function kcbUsing(){ return danteActive(dino) && dino.dante && dino.dante.arm === 3; }
// PLAYER_PART_END s12.kcbUsing.1

// index.html:109241 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbStart.1 EDITABLE
function kcbStart(id, extra = {}){
 const n = dino, p = n.dante, c = kcbState(p), m = KCB_MOVES[id];
 if(!m || n.hp <= 0) return;
 const dir = extra.lockDir || (n.isFacingLeft ? -1 : 1);
 p.k = null; p.cd = 0;
 c.elem = m.elem || 'ice';
 p.body.cerb = (c.elem === 'fire' ? 0 : c.elem === 'bolt' ? 1 : 2);
 p.attack = {
  ...m, ...extra, id, cerberus: true, age: 0,
  dir: dir,
  subIdx: 0,
  hit: new Map(), name: m.name, duration: m.T
 };
 playerComboTrack(p,p.attack,'cerberus');
 if(id === 'Kautilya'){
  c.airSlow = 90;
  // Khi bấm Nhảy nối vào Chọc Gậy thì bay theo, còn nếu ấn S+J (Cúi + J) có thể đứng chọc hất lên rồi nhảy sau!
  if(extra.jumpFollow){
   n.dy = -10.2; n.grounded = false; n.canDoubleJump = true; n.jumpCount = 1;
  } else {
   dashVx = dir * 6;
  }
 }
 if(id === 'airwhip' || id === 'airdance'){
  c.airSlow = Math.max(c.airSlow, 45);
  n.dy = Math.min(n.dy, 0.15);
 }
 if(id === 'revolver'){
  if(n.grounded) n.dy = -5.5;
  dashVx = dir * 12;
 }
 if(id === 'pole') dashVx = dir * 15;
 if(!['j1','j2'].includes(id)) danteLabel(m.name);
}
// PLAYER_PART_END s12.kcbStart.1

// index.html:109276 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbCommand.1 EDITABLE
function kcbCommand(cmd){
 const n = dino, p = n.dante, c = kcbState(p), a = p.attack;
 if(a && a.cerberus){
  if(cmd.key === 'K' && a.id === 'revolver' && a.age >= 10){
   a.chainCrystal = true;
   return;
  }
  // Đang Chọc Gậy (Cúi + J = Kautilya) mà bấm Nhảy -> Bay vọt lên không trung đuổi theo kẻ địch vừa bị chọc bay lên!
  if(cmd.key === 'jump' && a.id === 'Kautilya'){
   n.dy = -10.5; n.grounded = false; n.canDoubleJump = true; n.jumpCount = 1; c.airSlow = 90;
   return;
  }
  if(cmd.key === 'jump' && n.grounded && ['j1','j2','j3','k1','pole'].includes(a.id)){
   c.queue = [];
   kcbStart('Kautilya', { lockDir: a.dir, jumpFollow: true });
   return;
  }
  if(cmd.key === 'K' && a.id === 'airwhip' && a.age >= 6){
   c.queue = [];
   kcbStart('airdance', { lockDir: a.dir });
   return;
  }
  if(a.age >= playerComboCancel(a)){
   c.last = a.id; c.ended = frames; p.attack = null;
   kcbDispatch(cmd);
   return;
  }
  playerComboBuffer(c.queue,cmd);
  return;
 }
 kcbDispatch(cmd);
}
// PLAYER_PART_END s12.kcbCommand.1

// index.html:109309 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbDispatch.1 EDITABLE
function kcbDispatch(cmd){
 const n = dino, p = n.dante, c = kcbState(p), recent = frames - c.ended <= 40, last = recent ? c.last : '';
 if(n.isShielding() || p.cd > 0) return;
 if(cmd.force){ kcbStart(cmd.force, cmd); return; }

 if(cmd.key === 'jump'){
  if(['j1','j2','j3','k1','pole','Kautilya'].includes(last)){
   if(last === 'Kautilya'){
    n.dy = -10.5; n.grounded = false; c.airSlow = 90;
   } else {
    kcbStart('Kautilya', { jumpFollow: true });
   }
  }
  return;
 }

 if(cmd.key === 'K'){
  if(!n.grounded){ kcbStart('airdance'); return; }
  if(cmd.down){    kcbStart('iceage');   return; }
  if(cmd.dash){    kcbStart('revolver'); return; }
  if((cmd.charge || 0) >= 35){ kcbStart('clap'); return; }
  kcbStart(last === 'k1' ? 'k2' : last === 'k2' ? 'k3' : 'k1');
  return;
 }

 if(cmd.key === 'J'){
  if(!n.grounded){ kcbStart('airwhip');  return; }
  if(cmd.down){    kcbStart('Kautilya', { jumpFollow: false }); return; } // CÚI + J: Đứng tấn Chọc Gậy Lửa Xiên Lên!
  if(cmd.dash){    kcbStart('pole');     return; }                        // DASH + J: Lướt Chọc Thẳng Trường Côn!
  kcbStart(last === 'j1' ? 'j2' : last === 'j2' ? 'j3' : last === 'j3' ? 'j4' : 'j1');
 }
}
// PLAYER_PART_END s12.kcbDispatch.1

// index.html:109342 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbKeyBase.1 EDITABLE
const kcbKeyBase = danteKey;
// PLAYER_PART_END s12.kcbKeyBase.1

// index.html:109343 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteKey.5 EDITABLE
danteKey = function(code, repeat){
 if(!kcbUsing()) return kcbKeyBase(code, repeat);
 const p = dino.dante, c = kcbState(p), a = p.attack;
 if(['KeyJ','KeyK'].includes(code)){
  keys[code] = true;
  if(repeat || paused || gameOver || gameVictory) return true;
  p.k = null;
  const isDown = !!(keys.KeyS || keys.ArrowDown);
  const cmd = {
   key: code === 'KeyJ' ? 'J' : 'K',
   down: isDown,
   air: !dino.grounded,
   dash: !isDown && (frames - c.lastDash <= 22)
  };
  kcbCommand(cmd);
  return true;
 }
 if(['Space','KeyW','ArrowUp'].includes(code) && !repeat && !paused){
  const inCombo = (a && ['j1','j2','j3','k1','pole','Kautilya'].includes(a.id));
  const afterCombo = (!a && ['j1','j2','j3','k1','pole','Kautilya'].includes(c.last) && frames - c.ended <= 36);
  if(dino.grounded && (inCombo || afterCombo)){
   keys[code] = false;
   kcbCommand({ key: 'jump' });
   return true;
  }
 }
 if(code === 'KeyL' && !repeat){
  p.attack = null; c.queue = []; c.airSlow = 0; c.whipLine = null;
 }
 return kcbKeyBase(code, repeat);
};
// PLAYER_PART_END s12.danteKey.5

// index.html:109375 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbReleaseBase.1 EDITABLE
const kcbReleaseBase = danteRelease;
// PLAYER_PART_END s12.kcbReleaseBase.1

// index.html:109376 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteRelease.5 EDITABLE
danteRelease = function(){
 if(kcbUsing()) return;
 return kcbReleaseBase();
};
// PLAYER_PART_END s12.danteRelease.5

// index.html:109381 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbDashBase.1 EDITABLE
const kcbDashBase = doDash;
// PLAYER_PART_END s12.kcbDashBase.1

// index.html:109382 · Phạm vi: global
// PLAYER_PART_BEGIN s12.doDash.4 EDITABLE
doDash = function(...args){
 const before = dashCd;
 kcbDashBase(...args);
 if(kcbUsing() && dashCd > before){
  const c = kcbState(dino.dante);
  c.lastDash = frames;
 }
};
// PLAYER_PART_END s12.doDash.4

// index.html:109391 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbDamageBase.1 EDITABLE
const kcbDamageBase = Player.prototype.takeDamage;
// PLAYER_PART_END s12.kcbDamageBase.1

// index.html:109392 · Phạm vi: global
// PLAYER_PART_BEGIN s12.Player.prototype.takeDamage.4 EDITABLE
Player.prototype.takeDamage = function(...args){
 if(kcbUsing() && this === dino && this.dante?.attack?.id === 'iceage'){
  visualEffects.push(new Effect(this.x + this.w/2, this.y + 24, 'parry', this.isFacingLeft));
  if(SFX.tone) SFX.tone(1500, 0.04, 'sine', 0.1, 900);
  return 0;
 }
 return kcbDamageBase.apply(this, args);
};
// PLAYER_PART_END s12.Player.prototype.takeDamage.4

// index.html:109401 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbStrike.1 EDITABLE
function kcbStrike(n, p, c, a, pulse){
 const dtBonus = p.dt > 0 ? 1.5 : 0;
 const dmg = a.damage + (a.hits && a.hits.length > 1 ? dtBonus * 0.45 : dtBonus);
 const cx = n.x + n.w/2, cy = n.y + n.h/2;

 // 1. ROI SÉT TẦM XA (Air J & Ground K1)
 if(a.whipAirPull || a.whipGround){
  const maxRange = 235;
  const targets = sgTargets(n).filter(o => {
   if(!o || o.hp <= 0) return false;
   const ox = o.x + (o.w||40)/2, oy = o.y + (o.h||50)/2;
   const dx = (ox - cx) * a.dir;
   return dx >= -24 && dx <= maxRange && Math.abs(oy - cy) <= 190;
  }).sort((o1, o2) => Math.hypot((o1.x - cx), (o1.y - cy)) - Math.hypot((o2.x - cx), (o2.y - cy)));

  const target = targets[0];
  let endX = cx + a.dir * 185, endY = cy + (a.whipAirPull ? 45 : 0);

  if(target){
   const ox = target.x + (target.w||40)/2, oy = target.y + (target.h||50)/2;
   endX = ox; endY = oy;
   if(danteHit(p, target, dmg)){
    visualEffects.push(new Effect(ox, oy, 'lightning_shock', true, 32));
    if(danteControlAllowed(target)){
    if(a.whipAirPull){
     const ctrl = dswControl(target, { hold: true });
     if(ctrl){
      ctrl.air = true; ctrl.hold = false;
      ctrl.targetY = Math.max(36, n.y - 6);
      ctrl.vy = -10.5;
      ctrl.stun = Math.max(ctrl.stun, 44);
      target.grounded = false;
     }
     const pullX = cx + a.dir * 54 - (target.w||40)/2;
     target.x += (pullX - target.x) * 0.68;
     target.y += (Math.max(36, n.y - 6) - target.y) * 0.55;
     n.dy = -3.5; c.airSlow = Math.max(c.airSlow, 65);
    } else {
     const ctrl = dswControl(target, {});
     if(ctrl){ ctrl.stun = Math.max(ctrl.stun, 28); ctrl.vx = 0; }
     const pullX = cx + a.dir * 62 - (target.w||40)/2;
     target.x += (pullX - target.x) * 0.55;
    }
   }
   }
  }
  c.whipLine = { x1: cx + a.dir * 14, y1: cy - 4, x2: endX, y2: endY, t: 10, max: 10 };
  if(SFX.tone) SFX.tone(920, 0.07, 'sawtooth', 0.16, 420);
  return;
 }

 // 2. CÁC ĐÒN VỤT CÔN, CHỌC GẬY & BÃO BĂNG
 const is360 = ['airDance','iceAge','revolver'].includes(a.pose);
 const reach = ['multiPoke','pokeFront','pokeUp','boSlam'].includes(a.pose) ? 122 : (is360 ? 96 : 98);
 const box = {
  x: is360 ? (cx - reach) : (a.dir < 0 ? n.x - reach + 10 : n.x + n.w - 10),
  y: n.y - (is360 || a.launchWithMe ? 48 : 12),
  w: is360 ? reach * 2 : reach,
  h: n.h + (is360 || a.launchWithMe ? 68 : 24)
 };

 if(a.shieldIce && typeof bossProjectiles !== 'undefined'){
  for(let i = bossProjectiles.length - 1; i >= 0; i--){
   const bp = bossProjectiles[i];
   if(bp && checkAABB(box, bp)){
    visualEffects.push(new Effect(bp.x, bp.y, 'parry', false));
    bossProjectiles.splice(i, 1);
   }
  }
 }

 for(const o of sgTargets(n)){
  const root = o.__goc || o;
  if(a.hit.get(root) === pulse) continue;
  if(!checkAABB(box, o)) continue;
  const dealt = danteHit(p, o, dmg);
  if(!dealt) continue;
  a.hit.set(root, pulse);

  const ox = o.x + (o.w||40)/2, oy = o.y + (o.h||50)/2;
  for(let s = 0; s < 3; s++){
   c.sparks.push({
    x: ox + (Math.random()-0.5)*22,
    y: oy + (Math.random()-0.5)*22,
    vx: (Math.random()-0.5)*6,
    vy: -1.5 - Math.random()*4,
    col: a.elem === 'fire' ? '#FF6D00' : (a.elem === 'bolt' ? '#FFEA00' : (s % 2 ? '#00E5FF' : '#E040FB')),
    t: 9, max: 9
   });
  }

  if(playerFinisherControl(n,p,a,o,{pulse}))continue;
  if(!danteControlAllowed(root))continue;
  if(a.holdAir){
   const ctrl = dswControl(o, { hold: true });
   if(ctrl){
    ctrl.air = true;
    ctrl.targetY = n.y + n.h/2 - (o.h||48)/2 - 6;
    ctrl.vy = 0;
    ctrl.stun = Math.max(ctrl.stun, 24);
   }
   const idealX = cx + a.dir * 48 - (o.w||40)/2;
   o.x += (idealX - o.x) * 0.45;
  }
  else if(a.launchWithMe){
   // CÚI + J (Chọc Gậy Hất Tung): Đẩy vọt kẻ địch lên không trung theo mũi gậy!
   const ctrl = dswControl(o, { launch: true });
   if(ctrl){
    ctrl.targetY = Math.max(38, n.y - 75);
    ctrl.vy = -10.0;
    ctrl.stun = Math.max(ctrl.stun, 42);
   }
   const idealX = cx + a.dir * 56 - (o.w||40)/2;
   o.x += (idealX - o.x) * 0.45;
  }
  else if(a.pullIn){
   const ctrl = dswControl(o, {});
   if(ctrl){ ctrl.stun = Math.max(ctrl.stun, 20); ctrl.vx = 0; }
   const idealX = cx + a.dir * 54 - (o.w||40)/2;
   o.x += (idealX - o.x) * 0.40;
  }
  else if(a.drag){
   const ctrl = dswControl(o, {});
   if(ctrl){ ctrl.stun = Math.max(ctrl.stun, 22); ctrl.vx = 0; }
   const frontX = cx + a.dir * 64 - (o.w||40)/2;
   o.x += (frontX - o.x) * 0.52;
  }
  else {
   dswControl(o, {
    launch: a.launch,
    push: (a.push || 0) * a.dir
   });
  }
 }
}
// PLAYER_PART_END s12.kcbStrike.1

// index.html:109537 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbFinish.1 EDITABLE
function kcbFinish(p, c, a){
 p.attack = null; c.last = a.id; c.ended = frames;
 if(a.id === 'revolver' && (a.chainCrystal || keys.KeyK)){
  kcbStart('revslam', { lockDir: a.dir });
  return;
 }
 if(c.queue.length) kcbDispatch(c.queue.shift());
}
// PLAYER_PART_END s12.kcbFinish.1

// index.html:109546 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbTick.1 EDITABLE
function kcbTick(n, p){
 const c = kcbState(p);
 c.spin += 0.52;
 if(c.airSlow > 0) c.airSlow--;
 if(n.grounded && !p.attack) c.airSlow = 0;
 if(c.whipLine && --c.whipLine.t <= 0) c.whipLine = null;

 if(p.arm === 3 && keys.KeyK && n.grounded && !keys.KeyS && !keys.ArrowDown){
  c.holdK++;
  if(c.holdK >= 24 && (!p.attack || p.attack.id === 'k1')){
   kcbStart('clap');
  }
 } else {
  c.holdK = 0;
 }

 const a = p.attack;
 if(a&&a.cerberus&&playerAttackStep(a,DANTE_ATTACK_RATE)){
  a.age++;
  if(c.queue.length > 0 && a.age >= playerComboCancel(a)){
   const nextCmd = c.queue.shift();
   c.last = a.id; c.ended = frames; p.attack = null;
   kcbDispatch(nextCmd);
   return;
  }

  if(a.id === 'airwhip' || a.id === 'airdance'){
   n.dy = Math.min(n.dy, 0.15);
  }
  if((a.id === 'revolver' || a.id === 'pole') && a.age >= a.wind && a.age <= a.end){
   n.x = Math.max(12, Math.min(canvas.width - n.w - 12, n.x + a.dir * 4.2));
  }

  if(a.hits){
   const idx = a.hits.indexOf(a.age);
   if(idx >= 0){
    a.subIdx = idx;
    if(a.advance && idx === 0 && n.grounded) dashVx = a.dir * a.advance;
    kcbStrike(n, p, c, a, idx);

    // Sinh vệt vụt côn / mũi chọc gậy tương ứng với động tác
    if(['slashDown','sweepSide','multiPoke','pokeFront','pokeUp','boSlam'].includes(a.pose)){
     c.arcs.push({
      pose: a.pose,
      dir: a.dir,
      sub: idx,
      t: 9, max: 9
     });
    }

    if(a.iceSpike && idx === 0){
     const floorY = dswFloor(n.x + n.w/2, n.y + n.h);
     for(let k = 1; k <= 3; k++){
      c.spikes.push({
       x: n.x + n.w/2 + a.dir * (38 + k * 34),
       y: floorY,
       h: 58 + k * 14,
       wait: k * 3,
       t: 22, max: 22,
       hit: new Set(),
       damage: 2 + (p.dt > 0 ? 1 : 0)
      });
     }
     shakeTimer = Math.max(shakeTimer, 14);
    }

    if(a.thunderStorm && idx === 0){
     const floorY = dswFloor(n.x + n.w/2, n.y + n.h);
     for(let k = 1; k <= 3; k++){
      c.bolts.push({
       x: n.x + n.w/2 + a.dir * (48 + k * 62),
       y: floorY,
       wait: k * 5,
       t: 18, max: 18,
       hit: new Set(),
       damage: 3 + (p.dt > 0 ? 1 : 0)
      });
     }
     shakeTimer = Math.max(shakeTimer, 18);
     if(SFX.bossExplode) SFX.bossExplode();
    }

    if(a.fireWave && idx === 0){
     visualEffects.push(new Effect(n.x + n.w/2 + a.dir * 56, n.y + n.h - 12, 'explosion', true, 54));
     shakeTimer = Math.max(shakeTimer, 16);
    }

    if(SFX.tone) SFX.tone(a.elem === 'bolt' ? 780 : (a.elem === 'fire' ? 190 : 520), 0.05, 'triangle', 0.12, 220);
   }
  }

  if(p.attack && a.age >= a.T) kcbFinish(p, c, a);
 }

 if(!p.attack && c.queue.length) kcbDispatch(c.queue.shift());

 // Cập nhật Cọc Băng Crystal
 for(const spk of c.spikes){
  if(spk.wait > 0){ spk.wait--; continue; }
  spk.t--;
  const box = { x: spk.x - 16, y: spk.y - spk.h, w: 32, h: spk.h };
  for(const o of sgTargets(n)){
   const id = o.__goc || o;
   if(!spk.hit.has(id) && checkAABB(box, o)){
    spk.hit.add(id);
    danteHit(p, o, spk.damage);
    dswControl(o, { launch: 'prop' });
   }
  }
 }
 c.spikes = c.spikes.filter(spk => spk.t > 0);

 // Cập nhật Cột Sét Percussion
 for(const b of c.bolts){
  if(b.wait > 0){ b.wait--; continue; }
  b.t--;
  const box = { x: b.x - 20, y: b.y - 220, w: 40, h: 220 };
  for(const o of sgTargets(n)){
   const id = o.__goc || o;
   if(!b.hit.has(id) && checkAABB(box, o)){
    b.hit.add(id);
    danteHit(p, o, b.damage);
    const ctrl = dswControl(o, {});
    if(ctrl){ ctrl.stun = Math.max(ctrl.stun, 38); ctrl.vx = 0; }
   }
  }
 }
 c.bolts = c.bolts.filter(b => b.t > 0);

 for(const sp of c.sparks){ sp.x += sp.vx; sp.y += sp.vy; }
 c.sparks = c.sparks.filter(sp => --sp.t > 0);
 c.arcs = (c.arcs || []).filter(ar => --ar.t > 0);

 // Tư thế cơ thể Dante theo đúng động tác (Chọc gậy / Chống sào / Vụt côn)
 if(p.arm === 3){
  p.body._swordCustom = true;
  if(a && a.cerberus){
   const pr = Math.max(0, Math.min(1, (a.age - a.wind) / Math.max(1, a.end - a.wind)));
   p.body._swordTurn = ['airDance','iceAge'].includes(a.pose) ? Math.cos((a.age / a.T) * Math.PI * 2) : 1;
   if(a.pose === 'pokeUp'){
    // Cúi + J (Chọc gậy lên): Hạ thấp người lấy đà rồi ưỡn ngực đâm gậy chéo lên trời!
    p.body._swordLean = a.age <= a.wind ? 0.25 : -0.22 * Math.sin(pr * Math.PI);
    p.body._swordLunge = 10 * Math.sin(pr * Math.PI);
   } else if(a.pose === 'pokeFront' || a.pose === 'multiPoke'){
    // Đâm ngang trường côn: Nghiêng người chồm về trước
    p.body._swordLean = 0.28;
    p.body._swordLunge = 12;
   } else if(a.pose === 'poleVault'){
    // Chống sào tung người đá song phi
    p.body._swordLean = -0.38 * Math.sin(pr * Math.PI);
    p.body._swordLunge = 14 * Math.sin(pr * Math.PI);
   } else {
    p.body._swordLean = 0.18;
    p.body._swordLunge = 6;
   }
   p.body.facingLeft = a.dir < 0;
  } else {
   p.body._swordLean = 0; p.body._swordLunge = 0; p.body._swordTurn = 1;
  }
 }
}
// PLAYER_PART_END s12.kcbTick.1

// index.html:109708 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbTickBase.1 EDITABLE
const kcbTickBase = danteTick;
// PLAYER_PART_END s12.kcbTickBase.1

// index.html:109709 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteTick.5 EDITABLE
danteTick = function(){
 kcbTickBase();
 if(danteActive(dino) && dino.dante){
  const p = dino.dante;
  if(p.arm === 3 || p.cerberus) kcbTick(dino, p);
 }
};
// PLAYER_PART_END s12.danteTick.5

// index.html:109717 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbUpdateBase.1 EDITABLE
const kcbUpdateBase = Player.prototype.update;
// PLAYER_PART_END s12.kcbUpdateBase.1

// index.html:109718 · Phạm vi: global
// PLAYER_PART_BEGIN s12.Player.prototype.update.4 EDITABLE
Player.prototype.update = function(...args){
 if(!kcbUsing() || this !== dino) return kcbUpdateBase.apply(this, args);
 const c = kcbState(this.dante), a = this.dante.attack;
 if(c.airSlow > 0 && !this.grounded) this.dy = Math.min(this.dy, 0.65);
 return kcbUpdateBase.apply(this, args);
};
// PLAYER_PART_END s12.Player.prototype.update.4

// index.html:109730 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbPaintBoStaff.1 EDITABLE
function kcbPaintBoStaff(len, glowCol = '#FF6D00'){
 ctx.save();
 ctx.shadowColor = glowCol; ctx.shadowBlur = 16;
 // Thân gậy sắt đen dài
 ctx.fillStyle = '#263238';
 ctx.fillRect(-len * 0.35, -3.5, len, 7);
 // Đai kim loại khắc dọc thân gậy
 ctx.fillStyle = '#90A4AE';
 ctx.fillRect(-len * 0.1, -4, 6, 8);
 ctx.fillRect(len * 0.25, -4, 6, 8);
 // Hai đầu gậy bọc lõi dung nham rực lửa
 ctx.fillStyle = glowCol;
 ctx.fillRect(-len * 0.38, -5.5, 22, 11);
 ctx.fillRect(len * 0.65 - 18, -5.5, 26, 11);
 ctx.fillStyle = '#FFF8E1';
 ctx.fillRect(-len * 0.35, -2.5, 14, 5);
 ctx.fillRect(len * 0.65 - 14, -2.5, 18, 5);
 ctx.restore();
}
// PLAYER_PART_END s12.kcbPaintBoStaff.1

// index.html:109750 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbDraw.1 EDITABLE
function kcbDraw(n){
 const p = n.dante, c = kcbState(p), a = p.attack;
 const cx = n.x + n.w/2, cy = n.y + n.h/2, dir = (a && a.cerberus) ? a.dir : (n.isFacingLeft ? -1 : 1);
 ctx.save();

 // 1. Vẽ Cọc Băng Crystal mọc từ sàn
 for(const spk of c.spikes){
  if(spk.wait > 0) continue;
  const k = spk.t / spk.max, h = spk.h * Math.min(1, (spk.max - spk.t + 3) / 5);
  ctx.save();
  ctx.globalAlpha = k;
  ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 16;
  ctx.fillStyle = '#00B0FF';
  ctx.beginPath();
  ctx.moveTo(spk.x - 15, spk.y); ctx.lineTo(spk.x, spk.y - h); ctx.lineTo(spk.x + 15, spk.y);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#E0F7FA';
  ctx.beginPath();
  ctx.moveTo(spk.x - 6, spk.y); ctx.lineTo(spk.x, spk.y - h * 0.9); ctx.lineTo(spk.x + 6, spk.y);
  ctx.closePath(); ctx.fill();
  ctx.restore();
 }

 // 2. Vẽ Cột Thiên Lôi Percussion giáng xuống
 for(const b of c.bolts){
  if(b.wait > 0){
   ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = '#FFEA00';
   ctx.beginPath(); ctx.ellipse(b.x, b.y - 2, 22, 5, 0, 0, Math.PI * 2); ctx.fill();
   ctx.restore();
   continue;
  }
  const k = b.t / b.max;
  ctx.save();
  ctx.globalAlpha = k;
  ctx.shadowColor = '#E040FB'; ctx.shadowBlur = 22;
  ctx.strokeStyle = '#E040FB'; ctx.lineWidth = 14 * k; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(b.x, b.y - 230);
  ctx.lineTo(b.x - 12, b.y - 150);
  ctx.lineTo(b.x + 10, b.y - 75);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.strokeStyle = '#FFFDE7'; ctx.lineWidth = 5 * k;
  ctx.stroke();
  ctx.restore();
 }

 // 3. Vẽ Roi Sét Tầm Xa (Air J Phóng Sét Kéo Địch & Ground K1)
 if(c.whipLine){
  const wl = c.whipLine, k = wl.t / wl.max;
  ctx.save();
  ctx.globalAlpha = k;
  ctx.shadowColor = '#FFEA00'; ctx.shadowBlur = 18;
  for(let layer = 0; layer < 2; layer++){
   ctx.strokeStyle = layer === 0 ? '#E040FB' : '#FFFDE7';
   ctx.lineWidth = (layer === 0 ? 7 : 2.8) * k;
   ctx.lineCap = 'round'; ctx.lineJoin = 'round';
   ctx.beginPath();
   ctx.moveTo(wl.x1, wl.y1);
   const segs = 7;
   for(let i = 1; i < segs; i++){
    const u = i / segs;
    const jx = (Math.random() - 0.5) * 18;
    const jy = (Math.random() - 0.5) * 18;
    ctx.lineTo(wl.x1 + (wl.x2 - wl.x1) * u + jx, wl.y1 + (wl.y2 - wl.y1) * u + jy);
   }
   ctx.lineTo(wl.x2, wl.y2);
   ctx.stroke();
  }
  ctx.fillStyle = '#FFEA00';
  ctx.beginPath(); ctx.arc(wl.x2, wl.y2, 11 * k, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
 }

 // 4. VẼ VỆT VỤT CÔN & LUỒNG LỬA CHỌC GẬY (Đảm bảo nhìn rõ từng đòn không trùng lặp)
 for(const ar of c.arcs || []){
  const k = ar.t / ar.max;
  ctx.save();
  ctx.translate(cx, cy - 2);
  ctx.scale(ar.dir, 1);
  ctx.globalAlpha = k * 0.9;

  if(ar.pose === 'slashDown'){
   // J1: Vệt vụt côn băng chéo từ trên xuống
   ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 16;
   ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 14 * k; ctx.lineCap = 'round';
   ctx.beginPath(); ctx.arc(12, -2, 68, -1.35, 0.95); ctx.stroke();
   ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 4.5 * k;
   ctx.beginPath(); ctx.arc(12, -2, 68, -1.1, 0.8); ctx.stroke();
  }
  else if(ar.pose === 'sweepSide'){
   // J2: Vệt quét côn băng ngang tầm ngực (Elip dẹt)
   ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 16;
   ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 14 * k; ctx.lineCap = 'round';
   ctx.beginPath(); ctx.ellipse(14, 2, 78, 22, 0, -1.2, 1.2); ctx.stroke();
   ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 4.5 * k;
   ctx.beginPath(); ctx.ellipse(14, 2, 78, 22, 0, -0.9, 0.9); ctx.stroke();
  }
  else if(ar.pose === 'pokeUp'){
   // CÚI + J (Chọc Gậy Hất Tung): Mũi thương lửa phóng xiên chéo 45 độ từ dưới đất lên trời!
   ctx.shadowColor = '#FF3D00'; ctx.shadowBlur = 20;
   ctx.save();
   ctx.translate(14, 12);
   ctx.rotate(-0.78); // Góc xiên chéo 45 độ lên trên
   const grad = ctx.createLinearGradient(0, 0, 115, 0);
   grad.addColorStop(0, 'rgba(255, 61, 0, 0)');
   grad.addColorStop(0.5, '#FF6D00');
   grad.addColorStop(1, '#FFF8E1');
   ctx.fillStyle = grad;
   ctx.beginPath();
   ctx.moveTo(10, -14 * k); ctx.lineTo(118, 0); ctx.lineTo(10, 14 * k);
   ctx.closePath(); ctx.fill();
   // Vòng sóng xung kích quanh thân gậy khi chọc lên
   ctx.strokeStyle = '#FFEA00'; ctx.lineWidth = 3 * k;
   ctx.beginPath(); ctx.ellipse(58, 0, 6, 22 * k, 0, 0, Math.PI * 2); ctx.stroke();
   ctx.restore();
  }
  else if(ar.pose === 'multiPoke' || ar.pose === 'pokeFront'){
   // J3 & Dash+J: Mũi giáo lửa chọc thẳng về phía trước (Tịnh tiến dọc trục gậy!)
   ctx.shadowColor = '#FF3D00'; ctx.shadowBlur = 18;
   const yOff = (ar.pose === 'multiPoke') ? (ar.sub - 1) * 7 : 0;
   const reach = ar.pose === 'pokeFront' ? 120 : 104;
   const grad = ctx.createLinearGradient(12, yOff, reach, yOff);
   grad.addColorStop(0, 'rgba(255, 61, 0, 0)');
   grad.addColorStop(0.55, '#FF3D00');
   grad.addColorStop(1, '#FFF8E1');
   ctx.fillStyle = grad;
   ctx.beginPath();
   ctx.moveTo(12, yOff - 12 * k); ctx.lineTo(reach, yOff); ctx.lineTo(12, yOff + 12 * k);
   ctx.closePath(); ctx.fill();
  }
  else if(ar.pose === 'boSlam'){
   // J4 / K3 / Clap: Vệt bổ đập trường côn từ đỉnh đầu xuống sàn
   ctx.shadowColor = '#FF6D00'; ctx.shadowBlur = 18;
   ctx.strokeStyle = '#FF6D00'; ctx.lineWidth = 15 * k; ctx.lineCap = 'round';
   ctx.beginPath(); ctx.arc(16, 4, 82, -1.45, 0.45); ctx.stroke();
   ctx.strokeStyle = '#FFF8E1'; ctx.lineWidth = 5 * k;
   ctx.beginPath(); ctx.arc(16, 4, 82, -1.2, 0.35); ctx.stroke();
  }
  ctx.restore();
 }

 // 5. VẼ VŨ KHÍ KING CERBERUS TRÊN TAY DANTE THEO ĐÚNG POSE
 if(p.arm === 3){
  const hx = cx + dir * 14, hy = n.y + 22;

  // A. CHỈ XOAY VÒNG KHI DÙNG: Air K (Múa Tam Khúc Trên Không), Cúi + K (Bão Băng Ice Age), Dash + K (Bánh Xe Revolver)
  if(a && a.cerberus && ['airDance','iceAge','revolver'].includes(a.pose)){
   ctx.save();
   ctx.translate(cx + (a.pose === 'revolver' ? dir * 12 : 0), cy);
   const rad = a.pose === 'iceAge' ? 68 : (a.pose === 'airDance' ? 64 : 56);
   const cols = a.pose === 'iceAge' || a.pose === 'revolver'
    ? ['#00E5FF', '#80D8FF', '#FFFFFF']
    : ['#00E5FF', '#FF6D00', '#E040FB'];

   if(a.pose === 'iceAge'){
    ctx.fillStyle = 'rgba(0, 229, 255, 0.22)';
    ctx.beginPath(); ctx.arc(0, 0, rad + 8, 0, Math.PI * 2); ctx.fill();
   }

   for(let k = 0; k < 3; k++){
    const ang = c.spin * (a.pose === 'revolver' ? 1.5 : 1.2) + k * (Math.PI * 2 / 3);
    const col = cols[k];
    ctx.save();
    ctx.shadowColor = col; ctx.shadowBlur = 16;
    ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, 0, rad - k * 4, ang - 1.3, ang); ctx.stroke();
    const tx = Math.cos(ang) * (rad - k * 4), ty = Math.sin(ang) * (rad - k * 4);
    ctx.strokeStyle = '#ECEFF1'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(tx, ty); ctx.stroke();
    ctx.translate(tx, ty); ctx.rotate(ang + Math.PI / 2);
    ctx.fillStyle = '#263238'; ctx.fillRect(-14, -4, 28, 8);
    ctx.fillStyle = col;       ctx.fillRect(-12, -2.5, 24, 5);
    ctx.restore();
   }
   ctx.restore();
  }
  // B. CÚI + J (CHỌC GẬY XIÊN LÊN - pokeUp) & J3 / DASH + J (CHỌC GẬY NGANG - multiPoke / pokeFront)
  else if(a && a.cerberus && ['pokeUp','pokeFront','multiPoke'].includes(a.pose)){
   const pr = Math.max(0, Math.min(1, (a.age - a.wind) / Math.max(1, a.end - a.wind)));
   let thrust = 0, pitch = 0;
   if(a.pose === 'pokeUp'){
    // Thu gậy về hông rồi ĐÂM THẲNG DỌC THEO GÓC XIÊN -45 ĐỘ LÊN TRỜI!
    pitch = -0.78;
    thrust = (a.age <= a.wind) ? -18 : 48 * Math.sin(pr * Math.PI * 0.85);
   } else if(a.pose === 'pokeFront'){
    pitch = 0;
    thrust = (a.age <= a.wind) ? -14 : 46 * Math.sin(pr * Math.PI * 0.85);
   } else {
    // J3: Chọc liên hoàn 3 nhịp ở 3 góc hơi chếch nhau
    const subPhase = ((a.age - a.wind) % 6) / 6;
    pitch = (a.subIdx - 1) * 0.14;
    thrust = 38 * Math.sin(subPhase * Math.PI);
   }
   ctx.save();
   ctx.translate(hx, hy + 4);
   ctx.scale(dir, 1);
   ctx.rotate(pitch);
   ctx.translate(thrust, 0); // Dịch chuyển thanh gậy tịnh tiến dọc theo hướng đâm!
   kcbPaintBoStaff(118, '#FF6D00');
   ctx.restore();
  }
  // C. K2 (CHỐNG SÀO ĐÁ SONG PHI - poleVault): Cây gậy cắm thẳng đứng xuống đất làm trụ cho Dante bật đá!
  else if(a && a.cerberus && a.pose === 'poleVault'){
   ctx.save();
   ctx.translate(cx + dir * 26, n.y + n.h - 46);
   ctx.rotate(Math.PI / 2 + dir * 0.12); // Gậy cắm dọc xuống sàn
   kcbPaintBoStaff(104, '#FF6D00');
   ctx.restore();
  }
  // D. J4 / K3 / CLAP (BỔ ĐẬP TRƯỜNG CÔN TỪ ĐỈNH ĐẦU XUỐNG ĐẤT - boSlam)
  else if(a && a.cerberus && a.pose === 'boSlam'){
   const pr = Math.max(0, Math.min(1, (a.age - a.wind) / Math.max(1, a.end - a.wind)));
   const slamAng = (a.age <= a.wind) ? -2.15 : (-2.15 + 2.65 * Math.min(1, pr * 1.8));
   const col = a.elem === 'bolt' ? '#E040FB' : (a.elem === 'ice' ? '#00E5FF' : '#FF6D00');
   ctx.save();
   ctx.translate(hx, hy);
   ctx.scale(dir, 1);
   ctx.rotate(slamAng);
   kcbPaintBoStaff(116, col);
   ctx.restore();
  }
  // E. J1 & J2 (VỤT CÔN BĂNG CHÉO XUỐNG & QUÉT NGANG - slashDown / sweepSide)
  else if(a && a.cerberus && ['slashDown','sweepSide'].includes(a.pose)){
   const pr = Math.max(0, Math.min(1, (a.age - a.wind) / Math.max(1, a.end - a.wind)));
   const swingAng = a.pose === 'slashDown' ? (-1.9 + 2.8 * pr) : (1.3 - 2.5 * pr);
   ctx.save();
   ctx.translate(hx, hy);
   ctx.scale(dir, 1);
   ctx.rotate(swingAng);
   // Vẽ khúc côn cầm tay + dây xích văng khúc côn thứ 2 vươn xa theo lực vụt!
   ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 14;
   ctx.fillStyle = '#263238'; ctx.fillRect(0, -3.5, 28, 7);
   ctx.fillStyle = '#00E5FF'; ctx.fillRect(4, -2, 22, 4);
   ctx.strokeStyle = '#ECEFF1'; ctx.lineWidth = 2.5;
   ctx.beginPath(); ctx.moveTo(28, 0); ctx.lineTo(54, 4); ctx.stroke();
   ctx.translate(54, 4); ctx.rotate(0.25);
   ctx.fillStyle = '#263238'; ctx.fillRect(0, -4, 34, 8);
   ctx.fillStyle = '#00E5FF'; ctx.fillRect(3, -2.5, 28, 5);
   ctx.restore();
  }
  // F. Trạng thái Cầm Côn Tam Khúc 3 Nhánh Mặc Định (Idle / Walking)
  else {
   ctx.save();
   ctx.translate(hx, hy);
   ctx.scale(dir, 1);
   ctx.rotate(0.35);
   ctx.fillStyle = '#263238'; ctx.fillRect(-3, -22, 6, 26);
   ctx.fillStyle = '#00E5FF'; ctx.fillRect(-1.5, -20, 3, 20);
   const cols = ['#00E5FF', '#FF6D00', '#E040FB'];
   for(let k = 0; k < 2; k++){
    const sw = Math.sin(frames * 0.22 + k * 2.1) * 0.35 + (k === 0 ? 0.5 : -0.5);
    const sx = Math.sin(sw) * 26, sy = -22 + Math.cos(sw) * 26;
    ctx.strokeStyle = '#CFD8DC'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, -22); ctx.lineTo(sx, sy); ctx.stroke();
    ctx.save();
    ctx.translate(sx, sy); ctx.rotate(sw);
    ctx.shadowColor = cols[k + 1]; ctx.shadowBlur = 10;
    ctx.fillStyle = '#263238'; ctx.fillRect(-3.5, 0, 7, 24);
    ctx.fillStyle = cols[k + 1]; ctx.fillRect(-2, 2, 4, 20);
    ctx.restore();
   }
   ctx.restore();
  }
 }

 // 6. Vẽ hạt nguyên tố Băng - Lửa - Điện
 for(const sp of c.sparks){
  const k = sp.t / sp.max;
  ctx.save();
  ctx.globalAlpha = k;
  ctx.fillStyle = sp.col;
  ctx.shadowColor = sp.col; ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.arc(sp.x, sp.y, 4 * k, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
 }

 ctx.restore();
}
// PLAYER_PART_END s12.kcbDraw.1

// index.html:110030 · Phạm vi: global
// PLAYER_PART_BEGIN s12.kcbDrawBase.1 EDITABLE
const kcbDrawBase = danteDraw;
// PLAYER_PART_END s12.kcbDrawBase.1

// index.html:110031 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteDraw.5 EDITABLE
danteDraw = function(n){
 const p = n.dante;
 if(p && p.arm === 3) p.body._swordCustom = true;
 kcbDrawBase(n);
 if(p && (p.arm === 3 || p.cerberus)) kcbDraw(n);
};
// PLAYER_PART_END s12.danteDraw.5
