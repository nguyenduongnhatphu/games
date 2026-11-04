// PLAYER_FILE: DanteCavaliere
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DANTE_ATTACK_RATE, Effect, Player, SFX, canvas, checkAABB, ctx, danteActive, danteControlAllowed, danteDraw, danteHit, danteKey, danteLabel, danteRelease, danteTick, dashCd, dashVx, dino, doDash, dswControl, frames, gameOver, gameVictory, keys, paused, playerAttackStep, playerComboBuffer, playerComboCancel, playerComboTrack, playerFinisherControl, sgTargets, shakeTimer, visualEffects
// index.html:108582 · Phạm vi: global
// PLAYER_PART_BEGIN s12.CAV_MOVES.1 EDITABLE
const CAV_MOVES = {
 // 1. COMBO A (J -> J -> J): Nghiền cưa đa nhịp gom mục tiêu (có thể rẽ nhánh sang K bất kỳ lúc nào)
 j1: { name: 'CAVALIERE · CROSSED IGNITION', T: 26, wind: 4, cancel: 18, end: 22, damage: 1.0, pose: 'crossSaw', hits: [5, 9, 13, 17], advance: 6, pullIn: true },
 j2: { name: 'CAVALIERE · DUAL GRINDER',     T: 28, wind: 3, cancel: 20, end: 24, damage: 1.0, pose: 'grindSaw', hits: [4, 8, 12, 16, 20], advance: 8, drag: true },
 j3: { name: 'CAVALIERE · HIGHSIDE SLAM',    T: 32, wind: 7, cancel: 24, end: 26, damage: 5.0, pose: 'slamSaw',  hits: [10], advance: 10, push: 14, spark: true },

 // 2. HẤT TUNG & KHÔNG CHIẾN (Cúi + J = Wheelie Jump bay lên cùng địch -> Air J / Air K)
 wheelie:  { name: 'WHEELIE JUMP',           T: 28, wind: 3, cancel: 18, end: 22, damage: 1.5, pose: 'bikeUp',   hits: [4, 9, 14], launchWithMe: true, bikeMode: true },
 airgrind: { name: 'AIR SAW GRINDER',        T: 28, wind: 2, cancel: 21, end: 24, damage: 1.0, pose: 'airSaw',   hits: [3, 7, 11, 15, 19], holdAir: true },
 airslam:  { name: 'MOTORBIKE CRASH SLAM',   T: 30, wind: 4, cancel: 24, end: 26, damage: 5.0, pose: 'bikeSlam', slam: true, bikeMode: true, spark: true },

 // 3. COMBO B — LÁI MÔ-TÔ CÀN QUÉT (K -> K -> K hoặc Dash + K): Ủi kéo lê -> Drift 360 -> Phóng xe nổ
 k1_rush:  { name: 'FULL THROTTLE · RUSH',   T: 30, wind: 3, cancel: 22, end: 26, damage: 1.2, pose: 'bikeRide', hits: [4, 9, 14, 19], bikeMode: true, carry: true },
 k2_drift: { name: 'CROSSLINE · DONUT DRIFT',T: 30, wind: 2, cancel: 22, end: 26, damage: 1.2, pose: 'bikeDrift',hits: [4, 10, 16, 22], bikeMode: true, pullCenter: true, spark: true },
 k3_redline:{name: 'REDLINE · BIKE LAUNCH',  T: 32, wind: 6, cancel: 24, end: 26, damage: 6.0, pose: 'throwBike',hits: [8], launchBike: true, spark: true },

 // 4. DASH + J & CÚI + K (Idling Shield Grind)
 dashsaw:  { name: 'SLIPSTREAM SAW LUNGE',   T: 24, wind: 3, cancel: 16, end: 20, damage: 1.2, pose: 'grindSaw', hits: [4, 9, 14], advance: 14, drag: true },
 idling:   { name: 'IDLING · ELECTRIC GRIND',T: 34, wind: 3, cancel: 26, end: 30, damage: 1.0, pose: 'idling',   hits: [5, 11, 17, 23, 28], pullIn: true, spark: true }
};
// PLAYER_PART_END s12.CAV_MOVES.1

// index.html:108603 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavState.1 EDITABLE
function cavState(p){
 return p.cavaliere || (p.cavaliere = {
  spin: 0,           // Góc quay của bánh răng cưa
  gearSpark: 0,      // Tia điện xanh báo hiệu cửa sổ nối đòn Gearshift
  airSlow: 0,
  queue: [],
  last: '',
  ended: -1000,
  lastDash: -1000,
  thrownBike: null,  // Chiếc mô-tô phóng đi ở đòn kết K3 Redline
  sparks: []         // Tia lửa & tia điện xanh văng ra từ lưỡi cưa
 });
}
// PLAYER_PART_END s12.cavState.1

// index.html:108616 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavUsing.1 EDITABLE
function cavUsing(){ return danteActive(dino) && dino.dante && dino.dante.arm === 2; }
// PLAYER_PART_END s12.cavUsing.1

// index.html:108618 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavStart.1 EDITABLE
function cavStart(id, extra = {}){
 const n = dino, p = n.dante, c = cavState(p), m = CAV_MOVES[id];
 if(!m || n.hp <= 0) return;
 const dir = extra.lockDir || (n.isFacingLeft ? -1 : 1);
 p.k = null; p.cd = 0;
 p.attack = {
  ...m, ...extra, id, cavaliere: true, age: 0,
  dir: dir,
  hit: new Map(), name: m.name, duration: m.T
 };
 playerComboTrack(p,p.attack,'cavaliere');
 if(id === 'wheelie'){
  c.airSlow = 95;
  n.dy = -10.5; n.grounded = false; n.canDoubleJump = true; n.jumpCount = 1;
  dashVx = dir * 6;
 }
 if(id === 'airgrind'){
  c.airSlow = Math.max(c.airSlow, 40);
  n.dy = Math.min(n.dy, 0.2);
 }
 if(id === 'k1_rush')  dashVx = dir * 13;
 if(id === 'dashsaw')  dashVx = dir * 14;
 if(!['j1','j2'].includes(id)) danteLabel(m.name);
}
// PLAYER_PART_END s12.cavStart.1

// index.html:108643 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavCommand.1 EDITABLE
function cavCommand(cmd){
 const n = dino, p = n.dante, c = cavState(p), a = p.attack;
 if(a && a.cavaliere){
  // CƠ CHẾ GEARSHIFT: Đang cưa bằng J1/J2/DashSaw mà bấm K -> Hợp thể thành Mô-tô ủi thẳng luôn!
  if(cmd.key === 'K' && ['j1','j2','dashsaw'].includes(a.id) && a.age >= 8){
   c.queue = [];
   cavStart(cmd.down ? 'idling' : 'k1_rush', { lockDir: a.dir });
   return;
  }
  // Đang cưa J1/J2 mà bấm Cúi+J hoặc Nhảy -> Bốc đầu Wheelie Jump cuốn địch lên trời luôn!
  if((cmd.key === 'jump' || (cmd.key === 'J' && cmd.down)) && n.grounded && ['j1','j2','dashsaw','k1_rush','k2_drift'].includes(a.id)){
   c.queue = [];
   cavStart('wheelie', { lockDir: a.dir });
   return;
  }
  // Ngắt chiêu sớm khi tới cửa sổ Gearshift (`cancel`)
  if(a.age >= playerComboCancel(a)){
   c.last = a.id; c.ended = frames; p.attack = null;
   cavDispatch(cmd);
   return;
  }
  playerComboBuffer(c.queue,cmd);
  return;
 }
 cavDispatch(cmd);
}
// PLAYER_PART_END s12.cavCommand.1

// index.html:108670 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavDispatch.1 EDITABLE
function cavDispatch(cmd){
 const n = dino, p = n.dante, c = cavState(p), recent = frames - c.ended <= 42, last = recent ? c.last : '';
 if(n.isShielding() || p.cd > 0) return;
 if(cmd.force){ cavStart(cmd.force, cmd); return; }

 // 1. Phím Nhảy sau khi cưa -> Bốc đầu Wheelie Jump bay lên cùng kẻ địch
 if(cmd.key === 'jump'){
  if(['j1','j2','dashsaw','k1_rush'].includes(last)) cavStart('wheelie');
  return;
 }

 // 2. Nút K (Chuyên về Hợp thể Mô-tô & Càn quét)
 if(cmd.key === 'K'){
  if(!n.grounded){ cavStart('airslam'); return; } // Trên không + K: Bổ xe mô-tô xuống đất
  if(cmd.down){ cavStart('idling'); return; }     // Cúi + K: Đặt 2 cưa quay chắn trước mặt hút địch
  // Chuỗi Đua Xe Liên Hoàn: K1 (Ủi kéo lê) -> K2 (Drift 360 độ) -> K3 (Redline phóng xe nổ)
  if(last === 'k1_rush'){ cavStart('k2_drift'); return; }
  if(last === 'k2_drift'){ cavStart('k3_redline'); return; }
  cavStart('k1_rush');
  return;
 }

 // 3. Nút J (Chuyên về Song Cưa Máy hạng nặng)
 if(cmd.key === 'J'){
  if(cmd.down && n.grounded){ cavStart('wheelie'); return; } // Cúi + J: Bốc đầu hất tung
  if(!n.grounded){ cavStart('airgrind'); return; }           // Trên không + J: Xoay cưa giữ địch trên không
  if(cmd.dash){ cavStart('dashsaw'); return; }               // Dash + J: Lướt cưa kéo mục tiêu
  // Chuỗi Combo A: J1 (Cưa chéo gom địch) -> J2 (Đẩy cưa nghiền) -> J3 (Đập cưa nổ điện)
  cavStart(last === 'j1' ? 'j2' : last === 'j2' ? 'j3' : 'j1');
 }
}
// PLAYER_PART_END s12.cavDispatch.1

// index.html:108703 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavKeyBase.1 EDITABLE
const cavKeyBase = danteKey;
// PLAYER_PART_END s12.cavKeyBase.1

// index.html:108704 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteKey.4 EDITABLE
danteKey = function(code, repeat){
 if(!cavUsing()) return cavKeyBase(code, repeat);
 const p = dino.dante, c = cavState(p), a = p.attack;
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
  cavCommand(cmd);
  return true;
 }
 if(['Space','KeyW','ArrowUp'].includes(code) && !repeat && !paused){
  const inSaw = (a && ['j1','j2','dashsaw','k1_rush'].includes(a.id));
  const afterSaw = (!a && ['j1','j2','dashsaw','k1_rush'].includes(c.last) && frames - c.ended <= 36);
  if(dino.grounded && (inSaw || afterSaw)){
   keys[code] = false;
   cavCommand({ key: 'jump' });
   return true;
  }
 }
 if(code === 'KeyL' && !repeat){
  p.attack = null; c.queue = []; c.airSlow = 0;
 }
 return cavKeyBase(code, repeat);
};
// PLAYER_PART_END s12.danteKey.4

// index.html:108736 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavReleaseBase.1 EDITABLE
const cavReleaseBase = danteRelease;
// PLAYER_PART_END s12.cavReleaseBase.1

// index.html:108737 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteRelease.4 EDITABLE
danteRelease = function(){
 if(cavUsing()) return;
 return cavReleaseBase();
};
// PLAYER_PART_END s12.danteRelease.4

// index.html:108742 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavDashBase.1 EDITABLE
const cavDashBase = doDash;
// PLAYER_PART_END s12.cavDashBase.1

// index.html:108743 · Phạm vi: global
// PLAYER_PART_BEGIN s12.doDash.3 EDITABLE
doDash = function(...args){
 const before = dashCd;
 cavDashBase(...args);
 if(cavUsing() && dashCd > before){
  const c = cavState(dino.dante);
  c.lastDash = frames;
 }
};
// PLAYER_PART_END s12.doDash.3

// index.html:108753 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavStrike.1 EDITABLE
function cavStrike(n, p, c, a, pulse){
 const dtBonus = p.dt > 0 ? 1.5 : 0;
 const dmg = a.damage + (a.hits && a.hits.length > 1 ? dtBonus * 0.4 : dtBonus);
 const cx = n.x + n.w/2, cy = n.y + n.h/2;
 const isAround = (a.pose === 'bikeDrift' || a.pose === 'airSaw');
 const reach = isAround ? 105 : 108;
 const box = {
  x: isAround ? (cx - reach) : (a.dir < 0 ? n.x - reach + 10 : n.x + n.w - 10),
  y: n.y - (a.launchWithMe || a.holdAir ? 36 : 14),
  w: isAround ? reach * 2 : reach,
  h: n.h + (a.launchWithMe || a.holdAir ? 56 : 26)
 };

 for(const o of sgTargets(n)){
  const root = o.__goc || o;
  if(a.hit.get(root) === pulse) continue;
  if(!checkAABB(box, o)) continue;
  const dealt = danteHit(p, o, dmg);
  if(!dealt) continue;
  a.hit.set(root, pulse);

  const ox = o.x + (o.w||40)/2, oy = o.y + (o.h||50)/2;
  // Tia lửa đỏ & tia sét xanh tóe ra từ bánh răng cưa
  for(let s = 0; s < 3; s++){
   c.sparks.push({
    x: ox + (Math.random()-0.5)*24,
    y: oy + (Math.random()-0.5)*24,
    vx: (Math.random()-0.5)*7,
    vy: -2 - Math.random()*5,
    elec: s === 0 || a.spark,
    t: 9, max: 9
   });
  }

  if(!a.launchBike&&playerFinisherControl(n,p,a,o,{pulse}))continue;
  if(!danteControlAllowed(root))continue;
  // 1. WHEELIE JUMP: Cuốn kẻ địch bay lên trời cùng độ cao với chiếc xe của Dante!
  if(a.launchWithMe){
   const ctrl = dswControl(o, { launch: true });
   if(ctrl){
    ctrl.targetY = Math.max(40, n.y - 10);
    ctrl.vy = Math.min(ctrl.vy, -8.5);
    ctrl.stun = Math.max(ctrl.stun, 42);
   }
   const idealX = cx + a.dir * 54 - (o.w||40)/2;
   o.x += (idealX - o.x) * 0.45;
  }
  // 2. AIR SAW GRINDER: Treo kẻ địch lơ lửng ngay trong bánh răng cưa trên không
  else if(a.holdAir){
   const ctrl = dswControl(o, { hold: true });
   if(ctrl){
    ctrl.targetY = n.y + n.h/2 - (o.h||48)/2 - 6;
    ctrl.stun = Math.max(ctrl.stun, 20);
   }
   const idealX = cx + a.dir * 52 - (o.w||40)/2;
   o.x += (idealX - o.x) * 0.35;
  }
  // 3. GOM VÀO TÂM CƯA (J1 / Idling / Donut Drift): Hút kẻ địch vào đúng điểm ngọt trước mặt
  else if(a.pullIn || a.pullCenter){
   const ctrl = dswControl(o, {});
   if(ctrl){ ctrl.stun = Math.max(ctrl.stun, 22); ctrl.vx = 0; }
   const targetX = a.pullCenter ? (cx + a.dir * 36 - (o.w||40)/2) : (cx + a.dir * 58 - (o.w||40)/2);
   o.x += (targetX - o.x) * 0.42;
  }
  // 4. KÉO LÊ THEO XE / CƯA (J2 / DashSaw / K1 Rush): Đẩy kẻ địch trượt đi cùng tốc độ với Dante!
  else if(a.drag || a.carry){
   const ctrl = dswControl(o, {});
   if(ctrl){ ctrl.stun = Math.max(ctrl.stun, 22); ctrl.vx = 0; }
   const frontX = cx + a.dir * 62 - (o.w||40)/2;
   o.x += (frontX - o.x) * 0.55;
  }
  // 5. Đòn kết đẩy văng hoặc bổ sầm xuống sàn
  else {
   dswControl(o, {
    slam: a.slam,
    push: (a.push || 0) * a.dir
   });
  }
 }
 shakeTimer = Math.max(shakeTimer, a.damage >= 4 ? 14 : 4);
}
// PLAYER_PART_END s12.cavStrike.1

// index.html:108835 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavFinish.1 EDITABLE
function cavFinish(p, c, a){
 p.attack = null; c.last = a.id; c.ended = frames;
 if(c.queue.length) cavDispatch(c.queue.shift());
}
// PLAYER_PART_END s12.cavFinish.1

// index.html:108840 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavTick.1 EDITABLE
function cavTick(n, p){
 const c = cavState(p);
 c.spin += (p.attack && p.attack.cavaliere) ? 0.65 : 0.22;
 if(c.airSlow > 0) c.airSlow--;
 if(n.grounded && !p.attack) c.airSlow = 0;

 const a = p.attack;
 if(a&&a.cavaliere&&playerAttackStep(a,DANTE_ATTACK_RATE)){
  a.age++;
  // Báo hiệu tia điện xanh khi vào cửa sổ Gearshift (có thể bấm J hoặc K nối chiêu ngay)
  c.gearSpark = (a.age >= playerComboCancel(a) - 2 && a.age <= playerComboCancel(a) + 2) ? 6 : Math.max(0, c.gearSpark - 1);

  if(c.queue.length > 0 && a.age >= playerComboCancel(a)){
   const nextCmd = c.queue.shift();
   c.last = a.id; c.ended = frames; p.attack = null;
   cavDispatch(nextCmd);
   return;
  }

  // Duy trì lướt tiến mượt mà khi đang ủi xe hoặc đẩy cưa
  if(a.id === 'k1_rush' && a.age >= a.wind && a.age <= a.end && n.grounded){
   n.x = Math.max(12, Math.min(canvas.width - n.w - 12, n.x + a.dir * 6));
  }
  if((a.id === 'j2' || a.id === 'dashsaw') && a.age >= a.wind && a.age <= a.end && n.grounded){
   n.x = Math.max(12, Math.min(canvas.width - n.w - 12, n.x + a.dir * 3));
  }
  if(a.id === 'airgrind'){
   n.dy = Math.min(n.dy, 0.25);
  }

  // 1. AIR SLAM (Trên không + K: Cắm đầu xe mô-tô xuống đất)
  if(a.id === 'airslam'){
   n.dy = 15; dashVx = a.dir * 8;
   if(n.grounded && a.age > 3){
    cavStrike(n, p, c, a, 0);
    visualEffects.push(new Effect(n.x + n.w/2, n.y + n.h, 'explosion', true, 52));
    shakeTimer = Math.max(shakeTimer, 22);
    if(SFX.bossExplode) SFX.bossExplode();
    cavFinish(p, c, a);
    return;
   }
  }
  // 2. K3 REDLINE (Phóng chiếc mô-tô không người lái lao thẳng về phía trước phát nổ)
  else if(a.launchBike && a.age === a.wind + 2){
   cavStrike(n, p, c, a, 0);
   c.thrownBike = {
    attack:a,
    x: n.x + n.w/2 + a.dir * 36,
    y: n.y + n.h,
    dir: a.dir,
    vx: a.dir * 15,
    t: 0,
    hit: new Set(),
    damage: 6 + (p.dt > 0 ? 2 : 0)
   };
   shakeTimer = Math.max(shakeTimer, 18);
   if(SFX.bossExplode) SFX.bossExplode();
  }
  // 3. Tất cả các đòn cưa & ủi xe đa nhịp
  else if(a.hits){
   const idx = a.hits.indexOf(a.age);
   if(idx >= 0){
    if(a.advance && idx === 0 && n.grounded) dashVx = a.dir * a.advance;
    cavStrike(n, p, c, a, idx);
    if(SFX.tone) SFX.tone(140 + (idx % 3) * 35, 0.05, 'sawtooth', 0.14, 95);
   }
  }

  if(p.attack && a.age >= a.T) cavFinish(p, c, a);
 }

 if(!p.attack && c.queue.length) cavDispatch(c.queue.shift());

 // Cập nhật chiếc Mô-tô phóng đi ở đòn kết K3 Redline
 if(c.thrownBike){
  const tb = c.thrownBike;
  tb.x += tb.vx; tb.t++;
  const box = { x: tb.x - 48, y: tb.y - 54, w: 96, h: 54 };
  for(const o of sgTargets(n)){
   const id = o.__goc || o;
   if(!tb.hit.has(id) && checkAABB(box, o)){
    tb.hit.add(id);
    danteHit(p, o, tb.damage);
    if(!playerFinisherControl(n,p,tb.attack,o,{push:tb.dir*22,wall:true}))dswControl(o, { push: tb.dir * 22, wall: true });
    visualEffects.push(new Effect(tb.x, tb.y - 24, 'explosion', true, 46));
    shakeTimer = Math.max(shakeTimer, 20);
   }
  }
  if(tb.t > 38 || tb.x < -60 || tb.x > canvas.width + 60) c.thrownBike = null;
 }

 // Cập nhật tia lửa & điện
 for(const sp of c.sparks){ sp.x += sp.vx; sp.y += sp.vy; sp.vy += 0.35; }
 c.sparks = c.sparks.filter(sp => --sp.t > 0);

 // Cập nhật tư thế thân người Dante khi cầm Cavaliere
 if(p.arm === 2){
  p.body._swordCustom = true;
  if(a && a.cavaliere){
   p.body._swordTurn = (a.pose === 'bikeDrift') ? Math.cos((a.age / a.T) * Math.PI * 2) : 1;
   p.body._swordLean = (a.pose === 'bikeUp') ? -0.35 : (a.bikeMode ? 0.28 : 0.18);
   p.body._swordLunge = a.bikeMode ? 6 : 8;
   p.body.facingLeft = a.dir < 0;
  } else {
   p.body._swordLean = 0; p.body._swordLunge = 0; p.body._swordTurn = 1;
  }
 }
}
// PLAYER_PART_END s12.cavTick.1

// index.html:108949 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavTickBase.1 EDITABLE
const cavTickBase = danteTick;
// PLAYER_PART_END s12.cavTickBase.1

// index.html:108950 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteTick.4 EDITABLE
danteTick = function(){
 cavTickBase();
 if(danteActive(dino) && dino.dante){
  const p = dino.dante;
  if(p.arm === 2 || p.cavaliere) cavTick(dino, p);
 }
};
// PLAYER_PART_END s12.danteTick.4

// index.html:108958 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavUpdateBase.1 EDITABLE
const cavUpdateBase = Player.prototype.update;
// PLAYER_PART_END s12.cavUpdateBase.1

// index.html:108959 · Phạm vi: global
// PLAYER_PART_BEGIN s12.Player.prototype.update.3 EDITABLE
Player.prototype.update = function(...args){
 if(!cavUsing() || this !== dino) return cavUpdateBase.apply(this, args);
 const c = cavState(this.dante), a = this.dante.attack;
 if(c.airSlow > 0 && !this.grounded && (!a || a.id !== 'airslam')) this.dy = Math.min(this.dy, 0.72);
 return cavUpdateBase.apply(this, args);
};
// PLAYER_PART_END s12.Player.prototype.update.3

// index.html:108971 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavPaintGiantSaw.1 EDITABLE
function cavPaintGiantSaw(x, y, angle, spin, dir, sparkGlow = false){
 ctx.save();
 ctx.translate(x, y);
 ctx.scale(dir, 1);
 ctx.rotate(angle);

 // Khung sườn xe & Phuộc thủy lực hạng nặng (dài 52px, bản rộng 16px)
 ctx.fillStyle = '#263238';
 ctx.beginPath();
 ctx.moveTo(-10, -8); ctx.lineTo(36, -11);
 ctx.lineTo(42, 7);   ctx.lineTo(-10, 8);
 ctx.closePath(); ctx.fill();

 // Ốp giáp bạc & Ống xả đôi phát sáng cam
 ctx.fillStyle = '#78909C';
 ctx.fillRect(-4, -6, 30, 5);
 ctx.fillStyle = sparkGlow ? '#00E5FF' : '#FF6D00';
 ctx.fillRect(2, 1, 24, 4);

 // BÁNH XE RĂNG CƯA KHỔNG LỒ Ở ĐẦU MÚT (Bán kính R = 19px, đường kính 38px + 10 đại răng cưa!)
 const wx = 38, wy = 0, R = 19;
 ctx.save();
 ctx.translate(wx, wy);
 ctx.rotate(spin);

 // Hào quang điện xanh / lửa cam quanh bánh răng cưa
 ctx.shadowColor = sparkGlow ? '#00E5FF' : '#FF3D00';
 ctx.shadowBlur = 14;

 // 10 Lưỡi răng cưa thép sắc lẹm phóng đại
 ctx.fillStyle = '#ECEFF1';
 for(let k = 0; k < 10; k++){
  ctx.save();
  ctx.rotate(k * Math.PI / 5);
  ctx.beginPath();
  ctx.moveTo(-4.5, -R + 2);
  ctx.lineTo(0, -R - 8.5); // Mũi răng cưa vươn ra tới bán kính 27.5px!
  ctx.lineTo(5.5, -R + 2);
  ctx.closePath(); ctx.fill();
  ctx.restore();
 }

 // Lốp mô-tô đen dày & Vành mâm kim loại
 ctx.fillStyle = '#1C262B';
 ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill();
 ctx.strokeStyle = sparkGlow ? '#00E5FF' : '#40C4FF';
 ctx.lineWidth = 2.8;
 ctx.beginPath(); ctx.arc(0, 0, R - 4.5, 0, Math.PI * 2); ctx.stroke();

 // Nan hoa chữ X & Trục tâm bánh xe rực lửa
 ctx.strokeStyle = '#B0BEC5'; ctx.lineWidth = 3;
 for(let k = 0; k < 4; k++){
  const a2 = k * Math.PI / 2;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a2)*(R-5), Math.sin(a2)*(R-5)); ctx.stroke();
 }
 ctx.fillStyle = '#FF3D00';
 ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill();
 ctx.restore();

 // Tay cầm bọc giáp cho Dante nắm
 ctx.fillStyle = '#1C1C24';
 ctx.beginPath(); ctx.arc(0, 0, 5.5, 0, Math.PI * 2); ctx.fill();
 ctx.restore();
}
// PLAYER_PART_END s12.cavPaintGiantSaw.1

// index.html:109037 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavPaintFullBike.1 EDITABLE
function cavPaintFullBike(bx, by, dir, spin, tilt = 0, driftScale = 1){
 ctx.save();
 ctx.translate(bx, by - 22);
 ctx.scale(dir * driftScale, 1);
 ctx.rotate(tilt);

 // Luồng lửa phản lực phụt ra từ ống xả đôi phía sau
 ctx.save();
 ctx.shadowColor = '#FF3D00'; ctx.shadowBlur = 18;
 ctx.fillStyle = frames % 4 < 2 ? '#FF3D00' : '#FFEA00';
 ctx.beginPath();
 ctx.moveTo(-36, -6); ctx.lineTo(-78 - Math.random()*18, -12); ctx.lineTo(-36, 2);
 ctx.closePath(); ctx.fill();
 ctx.restore();

 // Hai Bánh Xe Răng Cưa Khổng Lồ Trước & Sau (R = 22px, tổng chiều dài xe ~105px!)
 for(const s2 of [-1, 1]){
  const wx = s2 * 32, wy = 4, R = 22;
  ctx.save();
  ctx.translate(wx, wy);
  ctx.rotate(spin);
  ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 14;
  ctx.fillStyle = '#ECEFF1';
  for(let k = 0; k < 10; k++){
   ctx.save(); ctx.rotate(k * Math.PI / 5);
   ctx.beginPath(); ctx.moveTo(-5, -R + 2); ctx.lineTo(0, -R - 8); ctx.lineTo(5.5, -R + 2); ctx.closePath(); ctx.fill();
   ctx.restore();
  }
  ctx.fillStyle = '#1C262B';
  ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(0, 0, R - 5, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#FF3D00';
  ctx.beginPath(); ctx.arc(0, 0, 5.5, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
 }

 // Khung sườn mô-tô bọc thép, Bình xăng đầu quỷ & Đèn pha chữ X xanh sáng rực
 ctx.fillStyle = '#263238';
 ctx.beginPath();
 ctx.moveTo(-36, -4); ctx.lineTo(-14, -22); ctx.lineTo(26, -24);
 ctx.lineTo(38, 2);   ctx.lineTo(-32, 6);
 ctx.closePath(); ctx.fill();

 ctx.fillStyle = '#78909C';
 ctx.beginPath();
 ctx.moveTo(-10, -20); ctx.lineTo(22, -22); ctx.lineTo(14, -8); ctx.lineTo(-14, -8);
 ctx.closePath(); ctx.fill();

 // Ống xả lửa cam dọc thân máy
 ctx.fillStyle = '#FF6D00';
 ctx.fillRect(-28, -4, 42, 5);

 // Tay lái & Đầu đèn pha ánh sáng xanh Cavaliere
 ctx.strokeStyle = '#CFD8DC'; ctx.lineWidth = 4.5; ctx.lineCap = 'round';
 ctx.beginPath(); ctx.moveTo(18, -20); ctx.lineTo(28, -36); ctx.stroke();
 ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 16;
 ctx.fillStyle = '#00E5FF';
 ctx.beginPath(); ctx.moveTo(26, -26); ctx.lineTo(42, -20); ctx.lineTo(28, -12); ctx.closePath(); ctx.fill();

 ctx.restore();
}
// PLAYER_PART_END s12.cavPaintFullBike.1

// index.html:109100 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavDraw.1 EDITABLE
function cavDraw(n){
 const p = n.dante, c = cavState(p), a = p.attack;
 const cx = n.x + n.w/2, cy = n.y + n.h/2, dir = (a && a.cavaliere) ? a.dir : (n.isFacingLeft ? -1 : 1);
 const glow = c.gearSpark > 0 || (p.dt > 0);
 ctx.save();

 // 1. Vẽ chiếc Mô-tô phóng đi ở đòn kết K3 Redline
 if(c.thrownBike){
  cavPaintFullBike(c.thrownBike.x, c.thrownBike.y, c.thrownBike.dir, c.spin * 1.4, -0.12, 1);
 }

 // 2. Khi đang cầm Cavaliere (arm === 2)
 if(p.arm === 2){
  // A. Đang ở chế độ Hợp Thể Lái Mô-tô (Rush / Drift / Wheelie Jump / Air Slam)
  if(a && a.cavaliere && a.bikeMode){
   const tilt = (a.pose === 'bikeUp') ? -0.52 : (a.pose === 'bikeSlam' ? 0.65 : 0);
   const driftScale = (a.pose === 'bikeDrift') ? (Math.cos((a.age / a.T) * Math.PI * 2) || 0.2) : 1;
   cavPaintFullBike(cx, n.y + n.h, dir, c.spin, tilt, driftScale);

   // Vòng lốc xoáy điện từ mặt đất khi đang xoay Donut Drift (K2)
   if(a.pose === 'bikeDrift'){
    ctx.save();
    ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 4;
    ctx.globalAlpha = 0.65;
    ctx.beginPath(); ctx.ellipse(cx, n.y + n.h - 6, 86, 16, 0, c.spin, c.spin + 4.5); ctx.stroke();
    ctx.restore();
   }
  }
  // B. Chế độ Cầm Cặp Cưa Máy Khổng Lồ Trên 2 Tay (Dual Giant Saws)
  else {
   let angL = 0.45, angR = 0.25;
   let offLX = -10, offLY = 20, offRX = 10, offRY = 22;

   if(a && a.cavaliere){
    const pr = Math.max(0, Math.min(1, (a.age - a.wind) / Math.max(1, a.end - a.wind)));
    const swing = Math.sin(pr * Math.PI);
    switch(a.pose){
     case 'crossSaw': // J1: Đập chéo 2 đại cưa hình chữ X trước ngực
      angL = -0.75 + 1.35 * swing; offLX = 6 + 14 * swing; offLY = 16;
      angR = 0.75 - 1.35 * swing;  offRX = 12 + 16 * swing; offRY = 24;
      break;
     case 'grindSaw': // J2 & DashSaw: Đẩy 2 bánh cưa khổng lồ song song cày phía trước
      angL = -0.12 + Math.sin(a.age * 0.8) * 0.08; offLX = 18; offLY = 16;
      angR = 0.12 - Math.sin(a.age * 0.8) * 0.08;  offRX = 24; offRY = 26;
      break;
     case 'slamSaw': // J3: Giơ cao 2 cưa lên trời rồi đập sầm xuống đất
      if(a.age < 10){
       angL = -1.65; angR = -1.5; offLY = 10; offRY = 12;
      } else {
       angL = 0.42; angR = 0.52; offLX = 18; offRX = 24; offLY = 26; offRY = 28;
      }
      break;
     case 'airSaw': // Trên không + J: Xoay 2 cưa máy quanh thân trên không
      angL = a.age * 0.45; angR = a.age * 0.45 + Math.PI;
      offLX = 0; offRX = 0; offLY = 22; offRY = 22;
      break;
     case 'idling': // Cúi + K: Dựng đứng 2 bánh cưa khổng lồ quay tít làm khiên điện trước mặt
      angL = -0.45; offLX = 20; offLY = 18;
      angR = 0.35;  offRX = 26; offRY = 28;
      break;
    }
   }

   // Vẽ Cưa Tay Trái (Phía sau thân) -> Vẽ Cưa Tay Phải (Phía trước thân)
   cavPaintGiantSaw(cx + dir * offLX, n.y + offLY, angL, c.spin, dir, glow);
   cavPaintGiantSaw(cx + dir * offRX, n.y + offRY, angR, c.spin, dir, glow);
  }
 }

 // 3. Vẽ tia lửa cam & tia điện xanh văng ra khi cưa nghiền mục tiêu
 for(const sp of c.sparks){
  const k = sp.t / sp.max;
  ctx.save();
  ctx.globalAlpha = k;
  ctx.strokeStyle = sp.elec ? '#00E5FF' : '#FFAB00';
  ctx.lineWidth = sp.elec ? 3 : 2.2;
  ctx.beginPath();
  ctx.moveTo(sp.x, sp.y);
  ctx.lineTo(sp.x - sp.vx * 2.2, sp.y - sp.vy * 2.2);
  ctx.stroke();
  ctx.restore();
 }

 ctx.restore();
}
// PLAYER_PART_END s12.cavDraw.1

// index.html:109186 · Phạm vi: global
// PLAYER_PART_BEGIN s12.cavDrawBase.1 EDITABLE
const cavDrawBase = danteDraw;
// PLAYER_PART_END s12.cavDrawBase.1

// index.html:109187 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteDraw.4 EDITABLE
danteDraw = function(n){
 const p = n.dante;
 if(p && p.arm === 2) p.body._swordCustom = true;
 cavDrawBase(n);
 if(p && (p.arm === 2 || p.cavaliere)) cavDraw(n);
};
// PLAYER_PART_END s12.danteDraw.4
