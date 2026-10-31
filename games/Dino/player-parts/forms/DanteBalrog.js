// PLAYER_FILE: DanteBalrog
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DANTE_ATTACK_RATE, Effect, Player, SFX, checkAABB, ctx, danteActive, danteControlAllowed, danteDraw, danteHit, danteKey, danteLabel, danteOn, danteRelease, danteStyleState, danteTick, dashCd, dashVx, dino, doDash, dojoMode, drawUI, dswControl, dswFloor, dswReleaseHolds, dswState, frames, gameOver, gameVictory, keys, paused, playerAttackStep, playerComboBuffer, playerComboCancel, playerComboTrack, playerFinisherControl, sgTargets, shakeTimer, visualEffects
// index.html:107705 · Phạm vi: global
// PLAYER_PART_BEGIN s12.BLR_DAMAGE_SCALE.1 EDITABLE
const BLR_DAMAGE_SCALE = 0.85;
// PLAYER_PART_END s12.BLR_DAMAGE_SCALE.1

// index.html:107706 · Phạm vi: global
// PLAYER_PART_BEGIN s12.BLR_MOVES.1 EDITABLE
const BLR_MOVES = {
 flydragon1:{name:'FLY DRAGON · RUSH PUNCH',T:28,wind:5,cancel:20,end:18,damage:4,pose:'magmaFin',hits:[8],heat:1,fire:true},
 flydragon2:{name:'FLY DRAGON · RISING FINISH',T:30,wind:6,cancel:24,end:20,damage:6,pose:'upper',hits:[9],launch:true,heat:1.5,fire:true},
 // 1. COMBO A CHUẨN BALROG DMC5 (Nhấp J -> J -> J -> J):
 // Nhịp 1: Đấm thẳng 1-2 (Jab & Straight) bước vào
 j1: { name: 'BLOW COMBO · ONE-TWO JAB',   T: 20, wind: 2, cancel: 10, end: 15, damage: 1.5, pose: 'oneTwo',   hits: [3, 8],  advance: 7,  heat: 1 },
 // Nhịp 2: Lắc vai đấm móc sườn (Liver Hook) gom mục tiêu
 j2: { name: 'BLOW COMBO · LIVER HOOK',    T: 20, wind: 3, cancel: 10, end: 15, damage: 2.5, pose: 'bodyHook', hits: [5],     advance: 8,  heat: 1.5 },
 // Nhịp 3: Đấm xoáy ốc + Quay lưng tạt quyền (Corkscrew & Backfist - 2 hits)
 j3: { name: 'BLOW COMBO · CORKSCREW SPIN',T: 24, wind: 3, cancel: 14, end: 19, damage: 2.0, pose: 'corkspin', hits: [5, 11], advance: 9,  heat: 1.5, fire: true },
 // Nhịp 4: Siêu Trọng Quyền nổ lửa đẩy văng (Magma Straight Finisher)
 j4: { name: 'BLOW COMBO · MAGMA STRAIGHT',T: 28, wind: 6, cancel: 18, end: 20, damage: 5.0, pose: 'magmaFin', hits: [8],     advance: 13, push: 15, heat: 2, fire: true },

 // 2. GIỮ J (Hold J): Đấm liên hoàn máy khâu (Light Blow) -> Kết bằng Heavy Jolt
 rjab:  { name: 'LIGHT BLOW · RAPID JAB', T: 24, wind: 0, cancel: 20, end: 23, damage: 0.5, pose: 'rjab', count: 6, heat: 0.45 },
 hjolt: { name: 'HEAVY JOLT',             T: 24, wind: 5, cancel: 16, end: 15, damage: 5,   pose: 'magmaFin', hits: [6], advance: 14, push: 18, heat: 2, fire: true },

 // 3. COMBO B (Nhấp K -> K -> K): Vũ điệu Capoeira
 k1: { name: 'KICK · BREAK SPIRAL I',  T: 24, wind: 3, cancel: 15, end: 19, damage: 2, pose: 'capo', hits: [6, 14], advance: 6, heat: 2 },
 k2: { name: 'KICK · BREAK SPIRAL II', T: 24, wind: 3, cancel: 15, end: 19, damage: 2, pose: 'capo', hits: [6, 14], advance: 7, heat: 2, fire: true },
 k3: { name: 'KICK · AXE HEEL DROP',   T: 28, wind: 7, cancel: 20, end: 18, damage: 5, pose: 'heel', hits: [9],    advance: 9, launch: 'prop', heat: 2, fire: true },

 // 4. ĐÒN LƯỚT & ĐẶC BIỆT (Dash J / J->Jump / Cúi K / Cúi J)
 mdragon: { name: 'MINIMUM DRAGON',       T: 19, wind: 3, cancel: 10, end: 13, damage: 4, pose: 'magmaFin', hits: [5], advance: 13, stunOnly: 28, heat: 2, fire: true },
 updraft: { name: 'UPDRAFT UPPERCUT',     T: 24, wind: 3, cancel: 13, end: 16, damage: 4, pose: 'upper',    hits: [5], launch: true, heat: 2, fire: true },
 fwave:   { name: 'IGNITION SPIRAL WAVE', T: 26, wind: 5, cancel: 16, end: 19, damage: 4, pose: 'waveK',    hits: [6], wave: true, heat: 2, fire: true },
 bantam:  { name: 'BANTAM REVENGE',       T: 26, wind: 0, cancel: 22, end: 22, damage: 0, pose: 'guard',    guard: true },
 bcounter:{ name: 'BANTAM COUNTER',       T: 22, wind: 3, cancel: 14, end: 14, damage: 4, pose: 'magmaFin', hits: [5], advance: 12, push: 14, fire: true },
 rimpact: { name: 'REAL IMPACT',          T: 52, wind: 8, cancel: 46, end: 40, damage: 3, pose: 'rimpact',  fire: true },

 // 5. PYROMANIA (Dash + K liên tục)
 pyro1: { name: 'PYROMANIA · RUSH',    T: 42, wind: 2, cancel: 36, end: 38, damage: 2, pose: 'pyro',      hits: [5, 11, 17, 23, 29, 35], advance: 5, heat: 1, fire: true },
 pyro2: { name: 'PYROMANIA · CYCLONE', T: 24, wind: 3, cancel: 18, end: 18, damage: 4, pose: 'tatsumaki', hits: [6, 14], launch: 'prop', fire: true },
 pyro3: { name: 'PYROMANIA · FINISH',  T: 32, wind: 11,cancel: 26, end: 21, damage: 5, pose: 'sidekick',  hits: [13], advance: 14, push: 24, wall: true, fire: true },

 // 6. TRÊN KHÔNG (Air JJJ & Flint Wheel Air K)
 airj1: { name: 'AIR BLOW · ONE-TWO',   T: 16, wind: 2, cancel: 9,  end: 12, damage: 2, pose: 'oneTwo',   hits: [3, 8], heat: 1 },
 airj2: { name: 'AIR BLOW · HOOK',      T: 16, wind: 2, cancel: 9,  end: 12, damage: 2, pose: 'bodyHook', hits: [5],    heat: 1 },
 airj3: { name: 'AIR DOUBLE HAMMER',    T: 22, wind: 5, cancel: 16, end: 16, damage: 4, pose: 'slam2',    hits: [7],    slam: true, heat: 2, fire: true },
 fwheel:{ name: 'FLINT WHEEL',          T: 30, wind: 3, cancel: 26, end: 26, damage: 1, pose: 'wheel',    fire: true }
};
// PLAYER_PART_END s12.BLR_MOVES.1

// index.html:107747 · Phạm vi: global
// PLAYER_PART_BEGIN s12.BLR_PYRO.1 EDITABLE
const BLR_PYRO = ['pyro1', 'pyro2', 'pyro3'];
// PLAYER_PART_END s12.BLR_PYRO.1

// index.html:107749 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrState.1 EDITABLE
function blrState(p){
 return p.balrog || (p.balrog = {
  heat: 0,
  ignite: 0,
  holdJ: 0,
  stanceT: 0,        // Giữ tư thế võ sĩ Boxing giữa các nhịp đấm để không bị đứt mạch combo
  hitstop: 0,        // Độ khựng lực đấm (Hitstop) giúp cảm nhận rõ từng cú đấm trúng đích
  queue: [],
  last: '',
  ended: -1000,
  lastDash: -1000,
  airSlow: 0,
  waves: [],
  sparks: [],
  punchArcs: [],
  pillar: null
 });
}
// PLAYER_PART_END s12.blrState.1

// index.html:107767 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrUsing.1 EDITABLE
function blrUsing(){ return danteActive(dino) && dino.dante && dino.dante.arm === 1; }
// PLAYER_PART_END s12.blrUsing.1

// index.html:107769 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrAddHeat.1 EDITABLE
function blrAddHeat(p, b, amount){
 if(b.ignite > 0) return;
 b.heat = Math.min(10, b.heat + amount);
 if(b.heat >= 10){
  b.heat = 0;
  b.ignite = 600;
  danteLabel('BALROG: IGNITION!');
  visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + dino.h/2, 'explosion', true, 68));
  shakeTimer = Math.max(shakeTimer, 16);
  if(SFX.bossExplode) SFX.bossExplode();
  const cx = dino.x + dino.w/2, cy = dino.y + dino.h/2;
  for(const o of sgTargets(dino)){
   if(Math.hypot((o.x + (o.w||40)/2) - cx, (o.y + (o.h||50)/2) - cy) < 88){
    danteHit(p, o, 1);
    dswControl(o, { push: ((o.x + (o.w||40)/2) < cx ? -1 : 1) * 7 });
   }
  }
 }
}
// PLAYER_PART_END s12.blrAddHeat.1

// index.html:107790 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrSpawnFireWave.1 EDITABLE
function blrSpawnFireWave(n, p, b, dir){
 const cx = n.x + n.w/2, cy = n.y + n.h/2;
 const dmg = 4 * BLR_DAMAGE_SCALE + (b.ignite > 0 ? 1 : 0) + (p.dt > 0 ? 2 : 0);
 // 1. Đưa vào hệ thống sóng `b.waves` vẽ cột lửa lớn cày mặt sàn
 b.waves.push({
  x: cx + dir * 24,
  y: n.y + n.h,
  dir: dir,
  t: 0,
  hit: new Set(),
  damage: dmg
 });
 // 2. Đồng thời đẩy 1 luồng sóng lửa vào `p.rounds` gốc của Dante để đảm bảo hiển thị & va chạm chuẩn
 p.rounds.push({
  x: cx + dir * 26,
  y: cy + 4,
  vx: dir * 11.5,
  vy: 0,
  r: 26,
  kind: 'drive',
  arm: 1,
  damage: 0, // The ground flame already applies this move's damage once.
  life: 50,
  age: 0,
  hit: new Set(),
  dir: dir
 });
 visualEffects.push(new Effect(cx + dir * 28, n.y + n.h - 10, 'explosion', true, 32));
 shakeTimer = Math.max(shakeTimer, 14);
 if(SFX.bossSkill) SFX.bossSkill();
}
// PLAYER_PART_END s12.blrSpawnFireWave.1

// index.html:107822 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrStart.1 EDITABLE
function blrStart(id, extra = {}){
 const n = dino, p = n.dante, b = blrState(p), m = BLR_MOVES[id];
 if(!m || n.hp <= 0) return;
 const dir = extra.lockDir || (n.isFacingLeft ? -1 : 1);
 p.k = null; p.cd = 0;
 b.stanceT = 42; // Duy trì thế thủ Boxing sau mỗi đòn
 p.attack = {
  ...m, ...extra, id, balrog: true, age: 0,
  dir: dir,
   subStep: 0,
  hit: new Map(), name: m.name, duration: m.T
 };
 playerComboTrack(p,p.attack,'balrog');
 if(id === 'rjab') dashVx = 0;
 if(id === 'updraft'){
  b.airSlow = 95;
  n.dy = -9.6; n.grounded = false; n.canDoubleJump = true; n.jumpCount = 1;
 }
 if(id === 'fwheel'){ b.airSlow = 0; p.attack.airWait = 0; }
 if(id === 'mdragon') dashVx = dir * 13;
 if(id === 'pyro1')   dashVx = dir * 10;
 // Nếu là Cúi + K (fwave) -> Phóng sóng lửa ngay ở frame mở màn để không bao giờ bị ngắt mất sóng!
 if(id === 'fwave'){
  blrSpawnFireWave(n, p, b, dir);
 }
 if(!['j1','j2','j3','k1','airj1','airj2'].includes(id)) danteLabel(m.name);
}
// PLAYER_PART_END s12.blrStart.1

// index.html:107850 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteBalrogRelay.1 EDITABLE
function danteBalrogRelay(){
 const n=dino,p=n.dante,s=dswState(p);
 dswReleaseHolds(s);s.queue=[];s.last='';s.airSlow=0;
 const styles=danteStyleState(p);styles.swords=[];
 p.arm=1;p.k=null;p.cd=0;p.swapInput=null;p.swapReady=0;
 p.body._swordLean=p.body._swordLunge=0;p.body._swordTurn=1;
 blrStart('flydragon1');
 p.attack.relayTarget=sgTargets(n).filter(o=>!o._beamClashPoint&&o.hp>0&&!o.invulnAll&&(o.x+o.w/2-n.x-n.w/2)*p.attack.dir>=-20).sort((a,b)=>Math.abs(a.x-n.x)-Math.abs(b.x-n.x))[0]||null;
}
// PLAYER_PART_END s12.danteBalrogRelay.1

// index.html:107860 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrCommand.1 EDITABLE
function blrCommand(cmd){
 const n = dino, p = n.dante, b = blrState(p), a = p.attack;
 if(a && a.balrog){
  if(cmd.key === 'jump' && n.grounded && ['j1','j2','j3','mdragon'].includes(a.id)){
   b.queue = [];
   blrStart('updraft', { lockDir: a.dir });
   return;
  }
  if(cmd.key === 'K' && cmd.down && n.grounded && a.id !== 'fwave'){
   b.queue = [];
   blrStart('fwave', { lockDir: a.dir });
   return;
  }
  if(cmd.key === 'K' && BLR_PYRO.includes(a.id)){
   a.continue = Math.min(4, (a.continue || 0) + 1);
   return;
  }
  if(a.age >= playerComboCancel(a)){
   b.last = a.id; b.ended = frames; p.attack = null;
   blrDispatch(cmd);
   return;
  }
  playerComboBuffer(b.queue,cmd);
  return;
 }
 blrDispatch(cmd);
}
// PLAYER_PART_END s12.blrCommand.1

// index.html:107888 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrDispatch.1 EDITABLE
function blrDispatch(cmd){
 const n = dino, p = n.dante, b = blrState(p), recent = frames - b.ended <= 42, last = recent ? b.last : '';
 if(n.isShielding() || p.cd > 0) return;
 if(cmd.force){ blrStart(cmd.force, cmd); return; }

 if(cmd.key === 'jump'){
  if(['j1','j2','j3','mdragon'].includes(last)){
   blrStart('updraft');
  }
  return;
 }

 if(cmd.key === 'K'){
  if(last==='flydragon1'){blrStart('flydragon2');return;}
  if(!n.grounded){ blrStart('fwheel'); return; }
  if(cmd.down){ blrStart('fwave'); return; } // Cúi + K ưu tiên tuyệt đối cho Sóng Lửa!
  if(cmd.dash){ blrStart('pyro1', { continue: 0 }); return; }
  blrStart(last === 'k1' ? 'k2' : last === 'k2' ? 'k3' : 'k1');
  return;
 }

 if(cmd.key === 'J'){
  if(cmd.down && n.grounded){
   blrStart(b.ignite > 0 ? 'rimpact' : 'bantam');
   return;
  }
  if(!n.grounded){
   blrStart(last === 'airj1' ? 'airj2' : last === 'airj2' ? 'airj3' : 'airj1');
   return;
  }
  if(cmd.dash){
   blrStart('mdragon');
   return;
  }
  // Chuỗi Combo A 4 nhịp nối liền mạch: j1 (One-Two) -> j2 (Liver Hook) -> j3 (Corkscrew Spin) -> j4 (Magma Straight)
  blrStart(last === 'j1' ? 'j2' : last === 'j2' ? 'j3' : last === 'j3' ? 'j4' : 'j1');
 }
}
// PLAYER_PART_END s12.blrDispatch.1

// index.html:107927 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrKeyBase.1 EDITABLE
const blrKeyBase = danteKey;
// PLAYER_PART_END s12.blrKeyBase.1

// index.html:107928 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteKey.3 EDITABLE
danteKey = function(code, repeat){
 if(!blrUsing()) return blrKeyBase(code, repeat);
 const p = dino.dante, b = blrState(p), a = p.attack;
 if(['KeyJ','KeyK'].includes(code)){
  keys[code] = true;
  if(repeat || paused || gameOver || gameVictory) return true;
  p.k = null; // Chặn bộ đếm giữ K mặc định của súng/kiếm để không bị gọi đè danteRelease()
  const isDown = !!(keys.KeyS || keys.ArrowDown);
  const cmd = {
   key: code === 'KeyJ' ? 'J' : 'K',
   down: isDown,
   air: !dino.grounded,
   dash: !isDown && (frames - b.lastDash <= 22)
  };
  blrCommand(cmd);
  return true;
 }
 if(['Space','KeyW','ArrowUp'].includes(code) && !repeat && !paused){
  const inPunch = (a && ['j1','j2','j3','mdragon'].includes(a.id));
  const afterPunch = (!a && ['j1','j2','j3','mdragon'].includes(b.last) && frames - b.ended <= 36);
  if(dino.grounded && (inPunch || afterPunch)){
   keys[code] = false;
   blrCommand({ key: 'jump' });
   return true;
  }
 }
 if(code === 'KeyL' && !repeat){
  p.attack = null; b.queue = []; b.airSlow = 0;
 }
 return blrKeyBase(code, repeat);
};
// PLAYER_PART_END s12.danteKey.3

// index.html:107961 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrReleaseBase.1 EDITABLE
const blrReleaseBase = danteRelease;
// PLAYER_PART_END s12.blrReleaseBase.1

// index.html:107962 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteRelease.3 EDITABLE
danteRelease = function(){
 if(blrUsing()) return;
 return blrReleaseBase();
};
// PLAYER_PART_END s12.danteRelease.3

// index.html:107967 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrDashBase.1 EDITABLE
const blrDashBase = doDash;
// PLAYER_PART_END s12.blrDashBase.1

// index.html:107968 · Phạm vi: global
// PLAYER_PART_BEGIN s12.doDash.2 EDITABLE
doDash = function(...args){
 const before = dashCd;
 blrDashBase(...args);
 if(blrUsing() && dashCd > before){
  const b = blrState(dino.dante);
  b.lastDash = frames;
 }
};
// PLAYER_PART_END s12.doDash.2

// index.html:107977 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrDamageBase.1 EDITABLE
const blrDamageBase = Player.prototype.takeDamage;
// PLAYER_PART_END s12.blrDamageBase.1

// index.html:107978 · Phạm vi: global
// PLAYER_PART_BEGIN s12.Player.prototype.takeDamage.3 EDITABLE
Player.prototype.takeDamage = function(...args){
 if(blrUsing() && this === dino && this.dante?.attack?.id === 'bantam'){
  const p = this.dante, b = blrState(p);
  visualEffects.push(new Effect(this.x + this.w/2, this.y + 24, 'parry', this.isFacingLeft));
  if(SFX.tone) SFX.tone(1400, 0.06, 'square', 0.14, 700);
  blrAddHeat(p, b, 10);
  blrStart('bcounter');
  return 0;
 }
 return blrDamageBase.apply(this, args);
};
// PLAYER_PART_END s12.Player.prototype.takeDamage.3

// index.html:107991 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrSpawnPunchArc.1 EDITABLE
function blrSpawnPunchArc(b, a, hitIndex){
 let arcType = a.pose;
 if(a.pose === 'oneTwo')   arcType = (hitIndex === 0) ? 'jabL' : 'crossR';
 if(a.pose === 'corkspin') arcType = (hitIndex === 0) ? 'upper' : 'spinBack';
 b.punchArcs.push({
  type: arcType,
  dir: a.dir,
  fire: b.ignite > 0 || a.fire,
  t: 10, max: 10
 });
}
// PLAYER_PART_END s12.blrSpawnPunchArc.1

// index.html:108003 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrStrike.1 EDITABLE
function blrStrike(n, p, b, a, pulse, customDmg = null, customOpt = {}){
 const ignBonus = (b.ignite > 0 ? 1 : 0) + (p.dt > 0 ? 2 : 0);
 const dmg = (customDmg !== null ? customDmg : a.damage) * BLR_DAMAGE_SCALE + ignBonus;
 const reach = a.pose === 'capo' || a.pose === 'tatsumaki' ? 92 : (a.id === 'rimpact' || a.pose === 'magmaFin' ? 98 : 88);
 const box = {
  x: (a.pose === 'capo' || a.pose === 'tatsumaki') ? (n.x + n.w/2 - reach) : (a.dir < 0 ? n.x - reach + 8 : n.x + n.w - 8),
  y: n.y - (a.launch || a.id === 'rimpact' ? 42 : 10),
  w: (a.pose === 'capo' || a.pose === 'tatsumaki') ? reach * 2 : reach,
  h: n.h + (a.launch || a.id === 'rimpact' ? 56 : 20)
 };

 let hitAny = false;
 for(const o of sgTargets(n)){
  const root = o.__goc || o;
  if(a.hit.get(root) === pulse) continue;
  if(!checkAABB(box, o)) continue;
  const dealt = danteHit(p, o, dmg);
  if(!dealt) continue;
  a.hit.set(root, pulse);
  hitAny = true;

  if(a.heat) blrAddHeat(p, b, a.heat);

  const ox = o.x + (o.w||40)/2, oy = o.y + (o.h||50)/2;
  visualEffects.push(new Effect(ox, oy, (b.ignite > 0 || a.fire) ? 'explosion' : 'parry', a.dir < 0, a.pose === 'magmaFin' || a.id === 'rimpact' ? 38 : 20));

  if(playerFinisherControl(n,p,a,o,{pulse}))continue;
  if(!danteControlAllowed(root))continue;
  const held = root._dswControl;
  if(a.stunOnly){
   const ctrl = dswControl(o, {});
   if(ctrl){ ctrl.stun = Math.max(ctrl.stun, a.stunOnly); ctrl.vx = 0; }
  } else {
   dswControl(o, {
    launch: customOpt.launch !== undefined ? customOpt.launch : a.launch,
    extra: !!(held && held.air) && !a.launch && !a.slam,
    hold: customOpt.hold || false,
    slam: a.slam,
    push: (customOpt.push !== undefined ? customOpt.push : (a.push || 0)) * a.dir,
    wall: a.wall
   });
   // GOM MỤC TIÊU TRONG COMBO A (j1, j2, j3): Hút kẻ địch về đúng tầm đấm trước mặt Dante để chuỗi JJJJ nối khít 100%!
   if(['j1','j2','j3'].includes(a.id) && root._dswControl){
    root._dswControl.stun = Math.max(root._dswControl.stun, 20);
    const idealX = (n.x + n.w/2) + a.dir * 46 - (o.w||40)/2;
    o.x += (idealX - o.x) * 0.38;
   }
  }

  if(a.launch === true) b.airSlow = Math.max(b.airSlow, 90);
  if(a.id === 'rjab' && root._dswControl){
   root._dswControl.stun = Math.max(root._dswControl.stun, 10);
   if(Math.abs(ox - (n.x + n.w/2)) < 62) o.x += a.dir * 2.0;
  }
  if(a.id === 'pyro1' && root._dswControl){
   root._dswControl.stun = Math.max(root._dswControl.stun, 14);
   o.x += a.dir * 5;
  }
 }
 // Tạo độ khựng lực đấm (Hitstop) và rung nhẹ màn hình khi đấm trúng
 if(hitAny && ['j1','j2','j3','j4','hjolt','mdragon'].includes(a.id)){
  b.hitstop = (a.id === 'j4' || a.id === 'hjolt') ? 3 : 1;
  shakeTimer = Math.max(shakeTimer, (a.id === 'j4' || a.id === 'hjolt') ? 12 : 4);
 }
}
// PLAYER_PART_END s12.blrStrike.1

// index.html:108069 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrFinish.1 EDITABLE
function blrFinish(p, b, a){
 p.attack = null; b.last = a.id; b.ended = frames; b.stanceT = 36;
 if(a.id === 'rjab'){
  if(keys.KeyJ && dino.grounded){
   blrStart('rjab', { loops: (a.loops || 0) + 1, lockDir: a.dir });
   return;
  }
  if(b.ignite > 0){
   blrStart('hjolt', { lockDir: a.dir });
   return;
  }
 }
 const pi = BLR_PYRO.indexOf(a.id);
 if(pi >= 0 && pi < BLR_PYRO.length - 1 && (a.continue || keys.KeyK)){
  blrStart(BLR_PYRO[pi + 1], { continue: Math.max(0, (a.continue || 0) - 1), lockDir: a.dir });
  return;
 }
 if(b.queue.length) blrDispatch(b.queue.shift());
}
// PLAYER_PART_END s12.blrFinish.1

// index.html:108089 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrTick.1 EDITABLE
function blrTick(n, p){
 const b = blrState(p);
 if(b.ignite > 0) b.ignite--;
 if(b.airSlow > 0) b.airSlow--;
 if(b.stanceT > 0) b.stanceT--;
 if(n.grounded && !p.attack) b.airSlow = 0;
 if(b.pillar && --b.pillar.t <= 0) b.pillar = null;

 // GIỮ J (>= 20 frame) -> Đấm liên hoàn máy khâu Rapid Jab
 if(p.arm === 1 && keys.KeyJ && n.grounded && !keys.KeyS && !keys.ArrowDown){
  b.holdJ++;
  if(b.holdJ >= 20 && (!p.attack || ['j1','j2'].includes(p.attack.id))){
   blrStart('rjab', { loops: 0 });
  }
 } else {
  b.holdJ = 0;
 }

 const a = p.attack;
 if(a&&a.balrog&&playerAttackStep(a,DANTE_ATTACK_RATE)){
  // Nếu đang có Hitstop (khựng lực đấm 1-2 frame khi trúng thịt) -> Giữ nguyên frame đấm cho có lực!
  if(b.hitstop > 0){
   b.hitstop--;
   return;
  }
  const prev = a.age; a.age++;
  if(a.id==='flydragon1'){
   const target=a.relayTarget?.hp>0?a.relayTarget:null;
   const close=target&&(target.x+target.w/2-n.x-n.w/2)*a.dir<=68;
   if(a.age<=a.wind+1)dashVx=close?0:a.dir*13;
   else if(a.age<=a.hits[0])dashVx=0;
  }

  // Nối đòn sau nhịp thu tay, không cắt mất phần kết của cú đánh.
  if(b.queue.length > 0 && a.age >= playerComboCancel(a) && a.id !== 'rjab'){
   const nextCmd = b.queue.shift();
   b.last = a.id; b.ended = frames; p.attack = null;
   blrDispatch(nextCmd);
   return;
  }

  // 1. REAL IMPACT
  if(a.id === 'rimpact'){
   if(a.age === 10){
    dashVx = a.dir * 8;
    blrStrike(n, p, b, a, 0, 3, { hold: true });
    if(SFX.tone) SFX.tone(180, 0.15, 'sawtooth', 0.2, 90);
   }
   if(a.age === 30){
    n.dy = -13.5; n.grounded = false; b.airSlow = 55;
    b.pillar = { x: n.x + n.w/2 + a.dir * 38, t: 24, max: 24 };
    blrStrike(n, p, b, a, 1, 4, { launch: true });
    shakeTimer = Math.max(shakeTimer, 26);
    if(SFX.bossExplode) SFX.bossExplode();
   }
   if(a.age === 40){
    blrStrike(n, p, b, a, 2, 8, { launch: true });
   }
  }
  // 2. FLINT WHEEL
  else if(a.id === 'fwheel'){
   n.dy = 12; dashVx = a.dir * 10;
   if(a.age % 7 === 0) blrStrike(n, p, b, a, Math.floor(a.age / 7), 1, { hold: true });
   if(n.grounded && a.age > 4){
    blrStrike(n, p, b, a, 99, 4, { push: 12 });
    visualEffects.push(new Effect(n.x + n.w/2, n.y + n.h, 'explosion', true, 32));
    shakeTimer = Math.max(shakeTimer, 12);
    blrFinish(p, b, a);
    return;
   }
  }
  // 3. RAPID JAB (Giữ J)
  else if(a.count){
   const k = Math.floor((a.age - 1) * a.count / a.T);
   const old = Math.floor((prev - 1) * a.count / a.T);
   if(k >= 0 && k < a.count && k !== old){
    blrStrike(n, p, b, a, k);
    b.sparks.push({
     x: n.x + n.w/2 + a.dir * (24 + (k % 2) * 10),
     y: n.y + 16 + (k % 3) * 8,
     dir: a.dir,
     r: 16 + (b.ignite > 0 ? 6 : 0),
     fire: b.ignite > 0,
     t: 6, max: 6
    });
    if(SFX.tone) SFX.tone(320 + (k % 3) * 60, 0.03, 'triangle', 0.08, 180);
   }
   if(!keys.KeyJ && a.age > 8){
    blrFinish(p, b, a);
    return;
   }
  }
  // 4. TẤT CẢ CÁC ĐÒN COMBO A, COMBO B, PYROMANIA & SPECIAL (Xử lý qua mảng `hits`)
  else if(a.hits){
   const idx = a.hits.indexOf(a.age);
   if(idx >= 0){
    a.subStep = idx;
    if(a.advance && n.grounded) dashVx = a.dir * (idx === 0 ? a.advance : a.advance * 0.65);
    if(a.id === 'pyro1') dashVx = a.dir * 7;
    if(a.id === 'pyro2' && idx === 0){ n.dy = -9; n.grounded = false; }
    blrSpawnPunchArc(b, a, idx);
    blrStrike(n, p, b, a, idx);
    b.sparks.push({
     x: n.x + n.w/2 + a.dir * 34,
     y: n.y + (a.pose === 'upper' ? 10 : 22),
     dir: a.dir,
     r: a.damage >= 4 ? 28 : 19,
     fire: b.ignite > 0 || a.fire,
     t: 8, max: 8
    });
    if(SFX.tone) SFX.tone(a.damage >= 4 ? 150 : (250 + idx * 55), 0.06, 'sawtooth', 0.14, 110);
   }
  }

  if(p.attack && a.age >= a.T) blrFinish(p, b, a);
 }

 if(!p.attack && b.queue.length) blrDispatch(b.queue.shift());

 // Cập nhật Sóng Lửa chạy dọc sàn
 for(const w of b.waves){
  w.x += w.dir * 11.5; w.t++;
  const fy = dswFloor(w.x, n.y + n.h);
  w.y = fy;
  const box = { x: w.x - 26, y: fy - 80, w: 52, h: 80 };
  for(const o of sgTargets(n)){
   const id = o.__goc || o;
   if(!w.hit.has(id) && checkAABB(box, o)){
    if(danteHit(p, o, w.damage)){
     w.hit.add(id);
     dswControl(o, { launch: 'prop' });
    }
   }
  }
 }
 b.waves = b.waves.filter(w => w.t < 55);
 b.sparks = b.sparks.filter(sp => --sp.t > 0);
 b.punchArcs = (b.punchArcs || []).filter(pa => --pa.t > 0);

 // Cập nhật tư thế cơ thể Dante (Chuyển động vai, xoay hông Boxing mượt mà)
 if(p.arm === 1){
  p.body._swordCustom = true;
  if(a && a.balrog){
   const pr = Math.max(0, Math.min(1, a.age / Math.max(1, a.end)));
   if(['capo','tatsumaki','corkspin'].includes(a.pose)){
    p.body._swordTurn = (a.pose === 'corkspin' && a.age < 9) ? 1 : Math.cos(pr * Math.PI * 2);
    p.body._swordLean = a.pose === 'capo' ? 0.35 : 0.22;
    p.body._swordLunge = 8;
   } else if(a.pose === 'bodyHook'){
    // Lắc vai hạ thấp người tạt quyền vào sườn
    p.body._swordLean = 0.30 * Math.sin(pr * Math.PI);
    p.body._swordLunge = 9 * Math.sin(pr * Math.PI);
    p.body._swordTurn = 1;
   } else if(a.pose === 'magmaFin'){
    // Chồm hết cỡ về trước tung Siêu Trọng Quyền
    p.body._swordLean = 0.36; p.body._swordLunge = 13; p.body._swordTurn = 1;
   } else if(['upper','rimpact'].includes(a.pose)){
    p.body._swordLean = -0.22 * pr; p.body._swordLunge = 7; p.body._swordTurn = 1;
   } else {
    p.body._swordLean = 0.20; p.body._swordLunge = 7; p.body._swordTurn = 1;
   }
   p.body.facingLeft = a.dir < 0;
  } else if(b.stanceT > 0){
   // Giữ thế thủ Boxing nhấp nhô (Weave) giữa các nhịp bấm J!
   p.body._swordLean = 0.12 + Math.sin(frames * 0.35) * 0.04;
   p.body._swordLunge = 4;
   p.body._swordTurn = 1;
  } else {
   p.body._swordLean = 0; p.body._swordLunge = 0; p.body._swordTurn = 1;
  }
 }
}
// PLAYER_PART_END s12.blrTick.1

// index.html:108262 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrTickBase.1 EDITABLE
const blrTickBase = danteTick;
// PLAYER_PART_END s12.blrTickBase.1

// index.html:108263 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteTick.3 EDITABLE
danteTick = function(){
 blrTickBase();
 if(danteActive(dino) && dino.dante){
  const p = dino.dante;
  if(p.arm === 1 || p.balrog) blrTick(dino, p);
 }
};
// PLAYER_PART_END s12.danteTick.3

// index.html:108271 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrUpdateBase.1 EDITABLE
const blrUpdateBase = Player.prototype.update;
// PLAYER_PART_END s12.blrUpdateBase.1

// index.html:108272 · Phạm vi: global
// PLAYER_PART_BEGIN s12.Player.prototype.update.2 EDITABLE
Player.prototype.update = function(...args){
 if(!blrUsing() || this !== dino) return blrUpdateBase.apply(this, args);
 const b = blrState(this.dante), a = this.dante.attack;
 if(b.airSlow > 0 && !this.grounded && (!a || a.id !== 'fwheel')) this.dy = Math.min(this.dy, 0.78);
 return blrUpdateBase.apply(this, args);
};
// PLAYER_PART_END s12.Player.prototype.update.2

// index.html:108282 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrPaintFistArm.1 EDITABLE
function blrPaintFistArm(sx, sy, fx, fy, dir, ignited, isPunching = false){
 const dx = fx - sx, dy = fy - sy;
 const ex = sx + dx * 0.42 - dir * 5, ey = sy + dy * 0.42 + 6;
 const fistR = isPunching ? 10.5 : 7.0;
 ctx.save();
 ctx.lineCap = 'round'; ctx.lineJoin = 'round';
 ctx.strokeStyle = '#8E1414'; ctx.lineWidth = 8.5;
 ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
 ctx.shadowColor = '#FF6D00'; ctx.shadowBlur = isPunching ? 24 : (ignited ? 16 : 6);
 ctx.strokeStyle = '#263238'; ctx.lineWidth = isPunching ? 11.5 : 9.5;
 ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(fx, fy); ctx.stroke();
 ctx.strokeStyle = (ignited || isPunching) ? '#FFEA00' : '#FF6D00';
 ctx.lineWidth = isPunching ? 4.8 : 3.4;
 ctx.beginPath(); ctx.moveTo(ex + dx * 0.1, ey + dy * 0.1); ctx.lineTo(fx, fy); ctx.stroke();
 ctx.fillStyle = (ignited || isPunching) ? '#FF6D00' : '#37474F';
 ctx.beginPath(); ctx.arc(fx, fy, fistR, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = '#FFF8E1';
 ctx.beginPath(); ctx.arc(fx + dir * 2.5, fy - 1, fistR * 0.45, 0, Math.PI * 2); ctx.fill();
 ctx.restore();
}
// PLAYER_PART_END s12.blrPaintFistArm.1

// index.html:108303 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrDraw.1 EDITABLE
function blrDraw(n){
 const p = n.dante, b = blrState(p), a = p.attack;
 const cx = n.x + n.w/2, cy = n.y + n.h/2, dir = (a && a.balrog) ? a.dir : (n.isFacingLeft ? -1 : 1);
 const ign = b.ignite > 0;
 ctx.save();

 // 1. Vẽ Cột Lửa Địa Ngục của REAL IMPACT
 if(b.pillar){
  const k = b.pillar.t / b.pillar.max, px = b.pillar.x;
  ctx.save();
  ctx.globalAlpha = 0.88 * k;
  const pg = ctx.createLinearGradient(px - 44, 0, px + 44, 0);
  pg.addColorStop(0, 'rgba(255, 61, 0, 0)');
  pg.addColorStop(0.5, '#FF6D00');
  pg.addColorStop(1, 'rgba(255, 61, 0, 0)');
  ctx.fillStyle = pg;
  ctx.fillRect(px - 44, n.y - 130, 88, 210);
  ctx.fillStyle = '#FFF8E1';
  ctx.fillRect(px - 14 * k, n.y - 120, 28 * k, 200);
  ctx.restore();
 }

 // 2. Vẽ Cột Sóng Lửa chạy dọc sàn (Break Spiral Wave - Cúi + K)
 for(const w of b.waves){
  const fy = w.y || (n.y + n.h);
  ctx.save();
  ctx.translate(w.x, fy);
  ctx.scale(-w.dir, 1); // Flip flame silhouette only; velocity and hitbox keep their direction.
  ctx.shadowColor = '#FF3D00'; ctx.shadowBlur = 20;
  ctx.fillStyle = '#FF3D00';
  ctx.beginPath();
  ctx.moveTo(-24, 0); ctx.quadraticCurveTo(0, -64, 28, -84);
  ctx.quadraticCurveTo(16, -38, 24, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#FFEA00';
  ctx.beginPath();
  ctx.moveTo(-10, 0); ctx.quadraticCurveTo(6, -46, 20, -64);
  ctx.quadraticCurveTo(12, -26, 16, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(-2, 0); ctx.lineTo(12, -42); ctx.lineTo(10, 0); ctx.closePath(); ctx.fill();
  ctx.restore();
 }

 // 3. VẼ VỆT NẮM ĐẤM LỬA CHO TỪNG NHỊP CỦA COMBO A (1-2 Jab, Liver Hook, Corkscrew, Magma Finisher)
 for(const pa of b.punchArcs || []){
  const k = pa.t / pa.max;
  ctx.save();
  ctx.translate(cx, cy - 4);
  ctx.scale(pa.dir, 1);
  ctx.globalAlpha = k * 0.92;
  ctx.shadowColor = '#FF6D00'; ctx.shadowBlur = 18;
  const colOuter = pa.fire ? '#FF3D00' : '#FF9100';
  const colInner = '#FFF8E1';

  if(pa.type === 'jabL' || pa.type === 'crossR' || pa.type === 'magmaFin'){
   // Đấm thẳng 1-2 và Siêu Trọng Quyền: Luồng kình lực ngang + Quầng nổ ở đầu nắm đấm
   const reach = (pa.type === 'magmaFin' ? 84 : (pa.type === 'crossR' ? 66 : 54)) * (1.15 - 0.15 * k);
   const yOff = (pa.type === 'jabL') ? -6 : (pa.type === 'crossR' ? 3 : 0);
   const thick = (pa.type === 'magmaFin') ? 18 : 11;
   const grad = ctx.createLinearGradient(8, yOff, reach, yOff);
   grad.addColorStop(0, 'rgba(255, 109, 0, 0)');
   grad.addColorStop(0.55, colOuter);
   grad.addColorStop(1, colInner);
   ctx.fillStyle = grad;
   ctx.beginPath();
   ctx.moveTo(8, yOff - thick * k); ctx.lineTo(reach, yOff - 5 * k);
   ctx.arc(reach, yOff, (thick + 2) * k, -Math.PI/2, Math.PI/2);
   ctx.lineTo(8, yOff + thick * k); ctx.closePath(); ctx.fill();

   // Vòng nén khí (Shock Ring) quanh cổ tay khi tung Siêu Trọng Quyền j4
   if(pa.type === 'magmaFin'){
    ctx.strokeStyle = '#FFEA00'; ctx.lineWidth = 3 * k;
    ctx.beginPath(); ctx.ellipse(38, 0, 7, 26 * k, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(62, 0, 5, 18 * k, 0, 0, Math.PI * 2); ctx.stroke();
   }
  }
  else if(pa.type === 'bodyHook' || pa.type === 'spinBack'){
   // Đấm móc sườn (Liver Hook) & Đấm xoay lưng: Vòng cung lửa rộng quét ngang hông/ngực
   const rad = pa.type === 'spinBack' ? 72 : 60;
   const yOff = pa.type === 'bodyHook' ? 8 : -4;
   ctx.strokeStyle = colOuter; ctx.lineWidth = 15 * k; ctx.lineCap = 'round';
   ctx.beginPath(); ctx.ellipse(10, yOff, rad, 24, 0, -1.25, 1.15); ctx.stroke();
   ctx.strokeStyle = colInner; ctx.lineWidth = 5.5 * k;
   ctx.beginPath(); ctx.ellipse(10, yOff, rad, 24, 0, -0.95, 0.95); ctx.stroke();
  }
  else if(pa.type === 'upper'){
   // Đấm móc xoáy ốc từ dưới lên (Corkscrew Upper & Updraft)
   ctx.strokeStyle = colOuter; ctx.lineWidth = 16 * k; ctx.lineCap = 'round';
   ctx.beginPath(); ctx.arc(16, 6, 50, 1.15, -1.45, true); ctx.stroke();
   ctx.strokeStyle = colInner; ctx.lineWidth = 6 * k;
   ctx.beginPath(); ctx.arc(16, 6, 50, 0.95, -1.25, true); ctx.stroke();
  }
  else if(pa.type === 'slam2'){
   ctx.strokeStyle = colOuter; ctx.lineWidth = 16 * k; ctx.lineCap = 'round';
   ctx.beginPath(); ctx.arc(14, -4, 52, -1.3, 1.2, false); ctx.stroke();
   ctx.strokeStyle = colInner; ctx.lineWidth = 6 * k;
   ctx.beginPath(); ctx.arc(14, -4, 52, -1.1, 1.0, false); ctx.stroke();
  }
  ctx.restore();
 }

 // 4. Vẽ hiệu ứng Bánh Xe Lửa & Cước Xoáy
 if(a && a.balrog){
  if(a.pose === 'wheel'){
   ctx.save();
   ctx.translate(cx, cy);
   ctx.rotate(a.age * 0.65 * dir);
   ctx.shadowColor = '#FF6D00'; ctx.shadowBlur = 20;
   ctx.strokeStyle = '#FF3D00'; ctx.lineWidth = 10;
   ctx.beginPath(); ctx.arc(0, 0, 34, 0, Math.PI * 1.65); ctx.stroke();
   ctx.strokeStyle = '#FFEA00'; ctx.lineWidth = 4;
   ctx.beginPath(); ctx.arc(0, 0, 28, 0.4, Math.PI * 1.4); ctx.stroke();
   ctx.restore();
  }
  else if(['capo','tatsumaki','heel','pyro','sidekick','waveK'].includes(a.pose) && a.age >= a.wind){
   ctx.save();
   ctx.translate(cx, cy + (a.pose === 'capo' || a.pose === 'waveK' ? 14 : -2));
   ctx.scale(dir, 1);
   ctx.shadowColor = '#FF6D00'; ctx.shadowBlur = 16;
   ctx.strokeStyle = ign || a.fire ? '#FF6D00' : '#FFB74D';
   ctx.lineWidth = 11; ctx.lineCap = 'round';
   ctx.beginPath();
   if(a.pose === 'heel'){
    ctx.arc(10, 0, 52, -1.5, 0.9);
   } else if(a.pose === 'sidekick'){
    ctx.moveTo(0, 0); ctx.lineTo(68, -4);
   } else {
    ctx.ellipse(0, 0, 68, 22, 0, -0.4, Math.PI * 1.35);
   }
   ctx.stroke();
   ctx.strokeStyle = '#FFF8E1'; ctx.lineWidth = 3.5; ctx.stroke();
   ctx.restore();
  }
 }

 // 5. VẼ ĐÔI GĂNG TAY GIÁP LỬA BALROG IK (Có thế thủ Boxing nhấp nhô & Đấm 1-2 luân phiên)
 if(p.arm === 1){
  // Mặc định khi ở trong Boxing Stance: Hai nắm đấm giơ cao ngang cằm che mặt đúng chuẩn võ sĩ!
  const weave = Math.sin(frames * 0.32) * 2.5;
  let rx = cx + dir * 15, ry = n.y + (b.stanceT > 0 ? 15 + weave : 23);
  let lx = cx + dir * (b.stanceT > 0 ? 21 : -7), ly = n.y + (b.stanceT > 0 ? 17 - weave : 25);
  let rPunch = false, lPunch = false;

  if(a && a.balrog){
   const pr = Math.max(0, Math.min(1, (a.age - a.wind) / Math.max(1, a.end - a.wind)));
   const punch = Math.sin(pr * Math.PI);
   switch(a.pose){
    case 'oneTwo': // Nhịp 1: Đấm Trái (Jab) rồi phóng Phải (Cross) nối liền nhau!
     if(a.age < 7){
      const p1 = Math.sin(Math.min(1, a.age / 6) * Math.PI);
      lx = cx + dir * (16 + 34 * p1); ly = n.y + 17; lPunch = p1 > 0.2;
      rx = cx + dir * 12; ry = n.y + 19;
     } else {
      const p2 = Math.sin(Math.min(1, (a.age - 6) / 8) * Math.PI);
      rx = cx + dir * (14 + 40 * p2); ry = n.y + 19; rPunch = p2 > 0.2;
      lx = cx + dir * 10; ly = n.y + 21;
     }
     break;
    case 'bodyHook': // Nhịp 2: Hạ thấp vai tạt Đấm Móc Sườn (Liver Hook)
     rx = cx + dir * (10 + 42 * punch); ry = n.y + 27 - 6 * punch; rPunch = punch > 0.2;
     lx = cx + dir * 14; ly = n.y + 16;
     break;
    case 'corkspin': // Nhịp 3: Móc xoáy ốc từ dưới lên rồi xoay lưng tạt quyền
     if(a.age < 9){
      const p1 = Math.min(1, a.age / 8);
      lx = cx + dir * (16 + 22 * Math.sin(p1 * Math.PI)); ly = n.y + 34 - 28 * p1; lPunch = true;
      rx = cx + dir * 10; ry = n.y + 22;
     } else {
      const p2 = Math.sin(Math.min(1, (a.age - 8) / 9) * Math.PI);
      rx = cx + dir * (14 + 44 * p2); ry = n.y + 18; rPunch = true;
      lx = cx - dir * 8; ly = n.y + 24;
     }
     break;
    case 'magmaFin': // Nhịp 4: Siêu Trọng Quyền (Thu nắm đấm về hông nạp lửa rồi đấm thẳng cực đại!)
     if(a.age <= a.wind){
      rx = cx - dir * 10; ry = n.y + 24; rPunch = true;
      lx = cx + dir * 20; ly = n.y + 17;
     } else {
      rx = cx + dir * (12 + 48 * punch); ry = n.y + 19; rPunch = true;
      lx = cx - dir * 12; ly = n.y + 24;
     }
     break;
    case 'upper':
    case 'rimpact':
     rx = cx + dir * (16 + 18 * punch); ry = n.y + 36 - 48 * pr; rPunch = true;
     lx = cx + dir * 8; ly = n.y + 24;
     break;
    case 'rjab': {
     const alt = Math.sin(a.age * 1.55);
     rx = cx + dir * (22 + 24 * Math.max(0, alt));  ry = n.y + 19 + Math.cos(a.age * 1.9) * 5;
     lx = cx + dir * (22 + 24 * Math.max(0, -alt)); ly = n.y + 23 - Math.cos(a.age * 1.9) * 5;
     rPunch = alt > 0; lPunch = alt < 0;
     for(let g = 0; g < 3; g++){
      const gx = cx + dir * (34 + ((a.age * 9 + g * 17) % 32));
      const gy = n.y + 14 + ((a.age * 5 + g * 11) % 22);
      ctx.fillStyle = ign ? 'rgba(255, 109, 0, 0.55)' : 'rgba(207, 216, 220, 0.45)';
      ctx.beginPath(); ctx.arc(gx, gy, 7.5, 0, Math.PI * 2); ctx.fill();
     }
     break;
    }
    case 'guard':
     rx = cx + dir * 16; ry = n.y + 14;
     lx = cx + dir * 20; ly = n.y + 17;
     ctx.save();
     ctx.strokeStyle = '#FFAB00'; ctx.lineWidth = 3;
     ctx.beginPath(); ctx.arc(cx + dir * 18, n.y + 22, 26, -1.1, 1.1); ctx.stroke();
     ctx.restore();
     break;
    case 'slam2':
     rx = cx + dir * (14 + 26 * punch); ry = n.y + 10 + 30 * pr; rPunch = true;
     lx = cx + dir * (10 + 26 * punch); ly = n.y + 13 + 30 * pr; lPunch = true;
     break;
   }
  }
  blrPaintFistArm(cx - dir * 6, n.y + 20, lx, ly, dir, ign, lPunch);
  blrPaintFistArm(cx + dir * 8, n.y + 20, rx, ry, dir, ign, rPunch);

  if(ign && frames % 2 === 0){
   ctx.fillStyle = frames % 4 === 0 ? '#FFEA00' : '#FF3D00';
   ctx.beginPath();
   ctx.arc(rx + (Math.random()-0.5)*10, ry - Math.random()*10, 3.2, 0, Math.PI * 2);
   ctx.arc(cx + (Math.random()-0.5)*18, n.y + n.h - 4 - Math.random()*8, 3.2, 0, Math.PI * 2);
   ctx.fill();
  }
 }

 // 6. Vẽ tia xung kích nắm đấm lửa
 for(const sp of b.sparks){
  const k = sp.t / sp.max;
  ctx.save();
  ctx.globalAlpha = k;
  ctx.translate(sp.x, sp.y);
  ctx.scale(sp.dir, 1);
  ctx.shadowColor = '#FF6D00'; ctx.shadowBlur = 16;
  ctx.strokeStyle = sp.fire ? '#FF6D00' : '#ECEFF1';
  ctx.lineWidth = 5.5 * k;
  ctx.beginPath(); ctx.arc(0, 0, sp.r * (1.25 - 0.25 * k), -1.05, 1.05); ctx.stroke();
  ctx.fillStyle = '#FFF8E1';
  ctx.beginPath();
  ctx.moveTo(sp.r + 10, 0); ctx.lineTo(sp.r - 6, -7 * k); ctx.lineTo(sp.r - 6, 7 * k);
  ctx.closePath(); ctx.fill();
  ctx.restore();
 }

 ctx.restore();
}
// PLAYER_PART_END s12.blrDraw.1

// index.html:108550 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrDrawBase.1 EDITABLE
const blrDrawBase = danteDraw;
// PLAYER_PART_END s12.blrDrawBase.1

// index.html:108551 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteDraw.3 EDITABLE
danteDraw = function(n){
 const p = n.dante;
 if(p && p.arm === 1) p.body._swordCustom = true;
 blrDrawBase(n);
 if(p && (p.arm === 1 || p.balrog)) blrDraw(n);
};
// PLAYER_PART_END s12.danteDraw.3

// index.html:108559 · Phạm vi: global
// PLAYER_PART_BEGIN s12.blrUIBase.1 EDITABLE
const blrUIBase = drawUI;
// PLAYER_PART_END s12.blrUIBase.1

// index.html:108560 · Phạm vi: global
// PLAYER_PART_BEGIN s12.drawUI.2 EDITABLE
drawUI = function(){
 blrUIBase();
 if(!danteOn() || !dino || !dino.dante || dino.dante.arm !== 1) return;
 const b = blrState(dino.dante);
 ctx.save();
 if(dojoMode) ctx.translate(0, 15);
 const ratio = b.ignite > 0 ? (b.ignite / 600) : (b.heat / 10);
 ctx.fillStyle = '#3E1C14';
 ctx.fillRect(20, 172, 250, 7);
 ctx.fillStyle = b.ignite > 0 ? (frames % 8 < 4 ? '#FFEA00' : '#FF3D00') : '#FF9100';
 ctx.fillRect(20, 172, 250 * Math.max(0, Math.min(1, ratio)), 7);
 ctx.font = 'bold 10px Consolas';
 ctx.fillStyle = '#FFD54F';
 ctx.fillText(b.ignite > 0 ? ('🔥 IGNITION ACTIVE: ' + (b.ignite / 60).toFixed(1) + 's (CÚI+J: REAL IMPACT)') : ('IGNITION HEAT: ' + Math.floor(b.heat) + ' / 10 (GIỮ J: ĐẤM LIÊN HOÀN)'), 20, 188);
 ctx.restore();
};
// PLAYER_PART_END s12.drawUI.2
