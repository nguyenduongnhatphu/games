// PLAYER_FILE: VergilForm01
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, SFX, VERGIL_ATTACK_RATE, VG_H, VG_W, WILDS, X_N_DANG, addStyle, allTargets, bosses, camX, canvas, checkAABB, combatStance, currentAmmoType, currentForm, currentPower, danteControlAllowed, danteForm, danteSync, dashVx, dealDamage, dino, dojoMode, dswControl, dswFloor, floatingTexts, frames, gameOver, gameState, gameVictory, keys, paused, phuKien, playerAttackStep, playerComboBuffer, playerComboCancel, playerComboTrack, playerFinisherControl, sgDamage, sgTargets, shakeTimer, startGame, ultCharge, visualEffects, wildernessOn, worldL, worldR, xDatForm, xDongBo, xForm, xFormIdx, xFormOn
// index.html:112456 · Phạm vi: global
// PLAYER_PART_BEGIN s18.VG_FORM_IDX.1 EDITABLE
const VG_FORM_IDX = 10;
// PLAYER_PART_END s18.VG_FORM_IDX.1

// index.html:112457 · Phạm vi: global
// PLAYER_PART_BEGIN s18.VG_CONC_MAX.1 EDITABLE
const VG_CONC_MAX = 300;
// PLAYER_PART_END s18.VG_CONC_MAX.1

// index.html:112458 · Phạm vi: global
// PLAYER_PART_BEGIN s18.VG_SDT_MAX.1 EDITABLE
const VG_SDT_MAX  = 720;
// PLAYER_PART_END s18.VG_SDT_MAX.1

// index.html:112459 · Phạm vi: global
// PLAYER_PART_BEGIN s18.VG_CC_LOCKOUT.1 EDITABLE
const VG_CC_LOCKOUT = 120;
// PLAYER_PART_END s18.VG_CC_LOCKOUT.1

// index.html:112461 · Phạm vi: global
// PLAYER_PART_BEGIN s18.VG_MIRAGE_MODES.1 EDITABLE
const VG_MIRAGE_MODES = [
    { n: 'SHOOTING BLADES', c: '#40C4FF', cost: 0 },
    { n: 'SPIRAL BLADES',   c: '#00E5FF', cost: 20 },
    { n: 'STORM BLADES',    c: '#80D8FF', cost: 25 },
    { n: 'HEAVY RAIN',      c: '#B388FF', cost: 30 }
];
// PLAYER_PART_END s18.VG_MIRAGE_MODES.1

// index.html:112472 · Phạm vi: global
// PLAYER_PART_BEGIN s18.YMT_MOVES.1 EDITABLE
const YMT_MOVES = {
    // 1. YAMATO COMBO A (J -> J -> J -> J): Thuần sát thương & tốc độ, không gây stun khóa cứng
    a1: { name: 'YAMATO COMBO A · IAI DRAW',     T: 18, wind: 3, cancel: 10, end: 13, damage: 2.8, pose: 'iaiSlash',  hits: [4],         advance: 6,  conc: 12 },
    a2: { name: 'YAMATO COMBO A · REVERSE CUT',  T: 18, wind: 3, cancel: 10, end: 13, damage: 2.8, pose: 'revSlash',  hits: [4],         advance: 6,  conc: 12 },
    a3: { name: 'YAMATO COMBO A · SAYA STRIKE',  T: 20, wind: 3, cancel: 12, end: 15, damage: 2.2, pose: 'sayaBash',  hits: [4, 9],      advance: 8,  conc: 15 },
    a4: { name: 'YAMATO COMBO A · VOID CLEAVE',  T: 32, wind: 6, cancel: 22, end: 20, damage: 5.5, pose: 'wideIai',   hits: [8],         advance: 12, conc: 28, sheatheAt: 22 },

    // 2. YAMATO COMBO C (J -> J -> Đợi nhịp -> J): Chém bão táp sát thương thuần
    c_flurry: { name: 'YAMATO COMBO C · MILLENNIUM SLASH', T: 42, wind: 2, cancel: 34, end: 36, damage: 1.1, pose: 'flurry', count: 9, advance: 4, conc: 25 },
    c_finish: { name: 'YAMATO COMBO C · DIMENSION REND',   T: 34, wind: 7, cancel: 24, end: 22, damage: 6.0, pose: 'wideIai', hits: [9], advance: 14, conc: 35, sheatheAt: 24 },

    // 3. UPPER SLASH (Cúi + J): CÓ KHỐNG CHẾ HẤT TUNG (Chịu khóa `ccKey: 'upper'` 2 giây!)
    upper1: { name: 'UPPER SLASH · RISING IAI',    T: 24, wind: 4, cancel: 14, end: 17, damage: 4.2, pose: 'upperIai', hits: [6], ccKey: 'upper', launch: true, advance: 6, conc: 18, sheatheAt: 18 },
    upper2: { name: 'UPPER SLASH II · ASCENSION',  T: 26, wind: 3, cancel: 16, end: 19, damage: 4.5, pose: 'upperIai', hits: [5], ccKey: 'upper', launchWithMe: true, advance: 8, conc: 22 },

    // 4. AERIAL RAVE (Trên không J): Chỉ giữ nhẹ khi mục tiêu đang ở sẵn trên không
    air1:  { name: 'AERIAL RAVE A · SKY DRAW',     T: 17, wind: 3, cancel: 10, end: 13, damage: 2.8, pose: 'iaiSlash', hits: [4], airJuggle: true, conc: 12 },
    air2:  { name: 'AERIAL RAVE A · SKY REVERSE',  T: 17, wind: 3, cancel: 10, end: 13, damage: 2.8, pose: 'revSlash', hits: [4], airJuggle: true, conc: 12 },
    air3:  { name: 'AERIAL RAVE A · MOON CLEAVE',  T: 24, wind: 5, cancel: 16, end: 18, damage: 5.0, pose: 'downIai',  hits: [7], conc: 20, sheatheAt: 18 },
    airb1: { name: 'AERIAL RAVE B · SPIRAL RISE',  T: 22, wind: 3, cancel: 15, end: 18, damage: 2.4, pose: 'spinUp',   hits: [4, 10], airJuggle: true, conc: 18 },
    airb2: { name: 'AERIAL RAVE B · ECLIPSE DROP', T: 26, wind: 5, cancel: 18, end: 20, damage: 5.5, pose: 'downIai',  hits: [7], ccKey: 'slam', slam: true, conc: 24 },

    // 5. KỸ NĂNG NÚT K THUẦN YAMATO (Rapid Slash / Rising Star / Void Slash / Helm Breaker):
    rapid:   { name: 'RAPID SLASH',                 T: 28, wind: 3, cancel: 20, end: 22, damage: 1.5, pose: 'rapid',    hits: [4, 8, 12, 16, 20], advance: 20, crossThrough: true, conc: 22, sheatheAt: 21 },
    rstar:   { name: 'RISING STAR',                 T: 32, wind: 3, cancel: 24, end: 26, damage: 1.8, pose: 'spinUp',   hits: [4, 9, 14, 19], ccKey: 'rstar', launchWithMe: true, advance: 12, conc: 28 },
    vslash:  { name: 'VOID SLASH · SPACE SHATTER',  T: 32, wind: 7, cancel: 22, end: 22, damage: 4.8, pose: 'voidArc',  hits: [9], ccKey: 'void', pullIn: true, slowBubble: true, conc: 25, sheatheAt: 23 },
    helm:    { name: 'AERIAL CLEAVE · HELM BREAKER',T: 26, wind: 4, cancel: 18, end: 20, damage: 5.5, pose: 'helm',     ccKey: 'slam', slam: true, conc: 20, sheatheAt: 19 },

    // 6. JUDGEMENT CUT & PERFECT JUDGEMENT CUT (Tầm xa — Gây sát thương thuần, không khóa cứng vô hạn):
    jcut:    { name: 'JUDGEMENT CUT',               T: 24, wind: 4, cancel: 14, end: 18, damage: 4.5, pose: 'jcutPose', isJCut: true, perfect: false, conc: 20, sheatheAt: 13 },
    pjcut:   { name: 'PERFECT JUDGEMENT CUT!',      T: 20, wind: 2, cancel: 10, end: 15, damage: 7.2, pose: 'jcutPose', isJCut: true, perfect: true,  conc: 35, sheatheAt: 9 },

    // =========================================================================
    // 7. NHÁNH PHÍM O — MIRAGE BLADE MELEE (KẾT HỢP CẬN CHIẾN CÙNG J HOẶC K)
    // =========================================================================
    m_combo1:  { name: 'MIRAGE EDGE · TWIN SLASH I',   T: 18, wind: 3, cancel: 10, end: 14, damage: 3.0, pose: 'mirage1',   hits: [4, 9],       advance: 8,  mirageMelee: true, conc: 14 },
    m_combo2:  { name: 'MIRAGE EDGE · TWIN VORTEX II', T: 20, wind: 3, cancel: 12, end: 16, damage: 3.2, pose: 'mirage2',   hits: [4, 10],      advance: 9,  mirageMelee: true, conc: 16 },
    m_combo3:  { name: 'MIRAGE EDGE · CROSS REND III', T: 26, wind: 5, cancel: 18, end: 20, damage: 5.8, pose: 'mirageFin', hits: [7, 13],      advance: 12, mirageMelee: true, conc: 24, sheatheAt: 20 },
    m_stinger: { name: 'MIRAGE EDGE · DEEP STINGER',   T: 30, wind: 4, cancel: 22, end: 25, damage: 1.6, pose: 'mStinger',  hits: [5, 9, 13, 17, 21], advance: 22, mirageMelee: true, ccKey: 'mstinger', stunOnly: 24, conc: 26 },
    m_round:   { name: 'MIRAGE EDGE · ROUND TRIP',     T: 24, wind: 5, cancel: 15, end: 18, damage: 2.5, pose: 'mirageFin', hits: [7],          mirageMelee: true, spawnRoundTrip: true, conc: 18 },
    m_high:    { name: 'MIRAGE EDGE · SPIRAL LAUNCH',  T: 24, wind: 4, cancel: 14, end: 18, damage: 4.4, pose: 'upperIai',  hits: [6],          mirageMelee: true, ccKey: 'upper', launchWithMe: true, conc: 20 }
};
// PLAYER_PART_END s18.YMT_MOVES.1

// index.html:112515 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vergilForm.1 EDITABLE
let vergilForm = false, vergilLoadout = null;
// PLAYER_PART_END s18.vergilForm.1

// index.html:112516 · Phạm vi: global
// PLAYER_PART_BEGIN s18.TryStatement.1 EDITABLE
try { vergilForm = localStorage.getItem('dino_vergil_form') === '1'; } catch (e) {}
// PLAYER_PART_END s18.TryStatement.1

// index.html:112518 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vergilOn.1 EDITABLE
function vergilOn() { return vergilForm && gameState !== 'pvp'; }
// PLAYER_PART_END s18.vergilOn.1

// index.html:112519 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vergilActive.1 EDITABLE
function vergilActive(n) { return vergilOn() && ['normal', 'boss_rush', 'test_boss'].includes(gameState) && n === dino && n.hp > 0; }
// PLAYER_PART_END s18.vergilActive.1

// index.html:112522 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vergilSync.1 EDITABLE
function vergilSync() {
    if (vergilOn()) {
        if (!vergilLoadout) vergilLoadout = {power:currentPower,ammo:currentAmmoType,accessory:phuKien,stance:combatStance};
        currentPower=0;currentAmmoType=0;phuKien=0;combatStance=0;
    } else if (vergilLoadout) {
        const s=vergilLoadout;
        currentPower=s.power;currentAmmoType=s.ammo;phuKien=s.accessory;combatStance=s.stance;
        vergilLoadout=null;
    }
}
// PLAYER_PART_END s18.vergilSync.1

// index.html:112532 · Phạm vi: global
// PLAYER_PART_BEGIN s18.setVergilForm.1 EDITABLE
function setVergilForm(enable) {
    vergilForm=!!enable;
    if (vergilForm) {danteForm=false;xForm=false;currentForm=0;danteSync();}
    vergilSync();
    try {localStorage.setItem('dino_vergil_form',vergilForm?'1':'0');} catch(e) {}
}
// PLAYER_PART_END s18.setVergilForm.1

// index.html:112538 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgDatFormBase.1 EDITABLE
const vgDatFormBase=xDatForm;
// PLAYER_PART_END s18.vgDatFormBase.1

// index.html:112539 · Phạm vi: global
// PLAYER_PART_BEGIN s18.xDatForm.1 EDITABLE
xDatForm=function(i) {
    const choose=((i%X_N_DANG)+X_N_DANG)%X_N_DANG;
    setVergilForm(false);
    vgDatFormBase(choose===VG_FORM_IDX?0:choose);
    if(choose===VG_FORM_IDX)setVergilForm(true);
};
// PLAYER_PART_END s18.xDatForm.1

// index.html:112545 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgFormIdxBase.1 EDITABLE
const vgFormIdxBase=xFormIdx,vgFormOnBase=xFormOn,vgSyncBase=xDongBo;
// PLAYER_PART_END s18.vgFormIdxBase.1

// index.html:112546 · Phạm vi: global
// PLAYER_PART_BEGIN s18.xFormIdx.1 EDITABLE
xFormIdx=function(){return vergilForm?VG_FORM_IDX:vgFormIdxBase();};
// PLAYER_PART_END s18.xFormIdx.1

// index.html:112547 · Phạm vi: global
// PLAYER_PART_BEGIN s18.xFormOn.1 EDITABLE
xFormOn=function(){return vergilForm||vgFormOnBase();};
// PLAYER_PART_END s18.xFormOn.1

// index.html:112548 · Phạm vi: global
// PLAYER_PART_BEGIN s18.xDongBo.1 EDITABLE
xDongBo=function(){vgSyncBase();vergilSync();};
// PLAYER_PART_END s18.xDongBo.1

// index.html:112550 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vergilLabel.1 EDITABLE
function vergilLabel(s, col) {
    const ft = new FloatingText(dino.x - 28, dino.y - 34, s);
    if (col) ft.color = col;
    floatingTexts.push(ft);
}
// PLAYER_PART_END s18.vergilLabel.1

// index.html:112561 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgTargetCcMap.1 EDITABLE
const vgTargetCcMap = new WeakMap();
// PLAYER_PART_END s18.vgTargetCcMap.1

// index.html:112563 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgCanApplyCC.1 EDITABLE
function vgCanApplyCC(target, ccKey) {
    if (!target || !ccKey) return false;
    const root = target.__goc || target;
    if (root.invulnAll || root.hp <= 0 || root._beamClashPoint || !danteControlAllowed(root)) return false;
    let record = vgTargetCcMap.get(root);
    if (!record) {
        record = { globalUntil: -100, keys: {} };
        vgTargetCcMap.set(root, record);
    }
    // 1. Nếu cùng một kỹ năng (`ccKey`) vừa khống chế mục tiêu chưa quá 2 giây (120 frames) -> CHẶN!
    if (frames < (record.keys[ccKey] || -100)) {
        return false;
    }
    // 2. Nếu mục tiêu vừa kết thúc chuỗi khống chế trước đó, cho 45 frames miễn nhiễm ngắn để tránh nối vô hạn
    if (frames < record.globalUntil) {
        return false;
    }
    record.keys[ccKey] = frames + VG_CC_LOCKOUT; // Khóa chiêu này trong 2 giây (120f)
    record.globalUntil = frames + 42;            // Khoảng nghỉ ngắn giữa các hiệu ứng khống chế
    return true;
}
// PLAYER_PART_END s18.vgCanApplyCC.1

// index.html:112585 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vergilInit.1 EDITABLE
function vergilInit(n) {
    const feet = n.y + n.h;
    n.form = 0; n.ammoType = 0;
    n.maxHp = n.hp = 10;
    n.w = typeof VG_W !== 'undefined' ? VG_W : 38;
    n.h = typeof VG_H !== 'undefined' ? VG_H : 58;
    n.y = feet - n.h;
    n.vergil = {
        conc: 120,
        sdt: 0,
        regen: 0,
        mirageMode: 0,          // Phím Q/E: Đổi 4 chế độ bắn xa của phím I
        mirageStance: 0,        // Phím O: Kích hoạt trạng thái Mirage Blade Cận Chiến (kết hợp với J/K)
        attack: null,
        queue: [],
        last: '',
        ended: -1000,
        lastDash: -1000,
        airSlow: 0,
        holdJ: 0,
        holdK: 0,
        holdI: 0,
        justWindow: 0,
        jcutChain: 0,
        sheatheSpark: 0,
        guardUntil: -100,
        perfectUntil: -100,
        guardReady: 0,
        markedTarget: null,
        markTimer: 0,
        swords: [],             // Phím I: Kiếm ảo ảnh bắn xa
        roundSword: null,       // Phím O + S + K: Đại kiếm Mirage Edge xoay tại chỗ
        cuts: [],               // Quả cầu không gian Judgement Cut (đã làm trong suốt)
        voidZones: [],          // Vết nứt Void Slash (đã làm trong suốt)
        slashTrail: [],
        mirageTrail: [],        // Vệt kiếm xanh ngọc của thanh Mirage Edge khi bấm O + J/K
        sparks: [],
        ghosts: [],
        dop: null,
        dopHist: [],
        jce: null,
        body: {
            facingLeft: false,
            stage: 1,
            drawn: false,
            mirageWep: false,
            armR: 0,
            armL: 0,
            wing: 0,
            dashV: 0
        }
    };
    if (typeof ultCharge !== 'undefined') ultCharge = (typeof dojoMode !== 'undefined' && dojoMode) ? 100 : 0;
}
// PLAYER_PART_END s18.vergilInit.1

// index.html:112640 · Phạm vi: global
// PLAYER_PART_BEGIN s18.IfStatement.1 EDITABLE
if (typeof startGame === 'function') {
    const vgStartBase = startGame;
    startGame = function(mode) {
        if (mode === 'pvp' && vergilForm) xDatForm(0);
        vergilSync();
        vgStartBase(mode);
        if (vergilOn()) vergilInit(dino);
    };
}
// PLAYER_PART_END s18.IfStatement.1

// index.html:112650 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgConcLevel.1 EDITABLE
function vgConcLevel(v) {
    return v.conc >= 250 ? 2 : (v.conc >= 100 ? 1 : 0);
}
// PLAYER_PART_END s18.vgConcLevel.1

// index.html:112654 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgAddConc.1 EDITABLE
function vgAddConc(v, amount) {
    v.conc = Math.max(0, Math.min(VG_CONC_MAX, v.conc + amount));
}
// PLAYER_PART_END s18.vgAddConc.1

// index.html:112658 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgAddGhost.1 EDITABLE
function vgAddGhost(n, v) {
    v.ghosts.push({
        x: n.x, y: n.y, left: n.isFacingLeft,
        drawn: v.body.drawn, armR: v.body.armR, armL: v.body.armL,
        sdt: v.sdt > 0, t: 12, max: 12
    });
    if (v.ghosts.length > 8) v.ghosts.shift();
}
// PLAYER_PART_END s18.vgAddGhost.1

// index.html:112667 · Phạm vi: global
// PLAYER_PART_BEGIN s18.v_markedValid.1 EDITABLE
function v_markedValid(v) {
    return v && v.markedTarget && !v.markedTarget._beamClashPoint && v.markedTarget.hp > 0 && v.markTimer > 0;
}
// PLAYER_PART_END s18.v_markedValid.1

// index.html:112671 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgFindTarget.1 EDITABLE
function vgFindTarget(n, dir, maxDist = 720, physical = false) {
    const cx = n.x + n.w / 2, cy = n.y + n.h / 2;
    const all = (typeof sgTargets === 'function' ? sgTargets(n) : (typeof allTargets === 'function' ? allTargets() : bosses))
        .filter(o => o && o.hp > 0 && !o.invulnAll && (!physical || !o._beamClashPoint) && Math.hypot(o.x+(o.w||40)/2-cx,o.y+(o.h||50)/2-cy)<=maxDist);
    if (v_markedValid(n.vergil) && all.includes(n.vergil.markedTarget)) return n.vergil.markedTarget;
    const front = all.filter(o => ((o.x + (o.w || 40) / 2) - cx) * dir >= -32 && Math.hypot((o.x + (o.w || 40) / 2) - cx, (o.y + (o.h || 50) / 2) - cy) <= maxDist);
    const pool = front.length ? front : all;
    pool.sort((a, b) => Math.hypot((a.x + (a.w || 40) / 2) - cx, (a.y + (a.h || 50) / 2) - cy) - Math.hypot((b.x + (b.w || 40) / 2) - cx, (b.y + (b.h || 50) / 2) - cy));
    return pool[0] || null;
}
// PLAYER_PART_END s18.vgFindTarget.1

// index.html:112682 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgControl.1 EDITABLE
function vgControl(o,opt){return dswControl(o,opt,dino.vergil);}
// PLAYER_PART_END s18.vgControl.1

// index.html:112684 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgDealDamage.1 EDITABLE
function vgDealDamage(v, target, baseDmg, tag = 'yamato') {
    const lv = vgConcLevel(v);
    const mult = (1 + lv * 0.18) * (v.sdt > 0 ? 1.35 : 1);
    const finalDmg = baseDmg * mult;
    let dealt = 0;
    if (typeof sgDamage === 'function') {
        dealt = sgDamage(dino, target, finalDmg, tag);
    } else if (typeof dealDamage === 'function') {
        dealt = dealDamage(target, finalDmg);
    } else if (target && typeof target.takeDamage === 'function') {
        const before = target.hp;
        target.takeDamage(finalDmg);
        dealt = Math.max(0, before - target.hp);
    }
    if (dealt > 0 && !target._beamClashPoint) {
        vgAddConc(v, tag === 'mirage' ? 4 : 10);
        if (v.sdt <= 0 && !v.jce && typeof ultCharge !== 'undefined') {
            ultCharge = Math.min(100, ultCharge + dealt * 0.85);
        }
        if (typeof addStyle === 'function') addStyle(tag === 'pjcut' ? 22 : 12, tag);
    }
    return dealt;
}
// PLAYER_PART_END s18.vgDealDamage.1

// index.html:112711 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgPerformTrick.1 EDITABLE
function vgPerformTrick(n, v, mode) {
    const dir = n.isFacingLeft ? -1 : 1;
    vgAddGhost(n, v);

    let nx = n.x, ny = n.y;
    const target = vgFindTarget(n, dir, 680, true);

    if (mode === 'down') {
        const backDir = target ? (target.x + (target.w || 40) / 2 > n.x + n.w / 2 ? -1 : 1) : -dir;
        nx = n.x + backDir * 155;
        ny = typeof dswFloor === 'function' ? dswFloor(nx, n.y + n.h) - n.h : n.y;
        n.dy = 0;
        vergilLabel('TRICK DOWN');
    } else if (mode === 'up') {
        if (target) {
            const side = (target.x + (target.w || 40) / 2 > n.x + n.w / 2) ? -1 : 1;
            nx = target.x + (target.w || 40) / 2 + side * 42 - n.w / 2;
            ny = Math.max(wildernessOn() ? WILDS.top : 36, target.y - 44);
        } else {
            nx = n.x + dir * 48;
            ny = Math.max(wildernessOn() ? WILDS.top : 36, n.y - 105);
        }
        n.dy = -3.5; n.grounded = false;
        v.airSlow = 45;
        vergilLabel('TRICK UP');
    } else {
        if (target) {
            const tcx = target.x + (target.w || 40) / 2;
            const gap = Math.abs(tcx - (n.x + n.w / 2));
            const crossBehind = gap < 110;
            const side = crossBehind ? (tcx >= n.x + n.w / 2 ? 1 : -1) : (tcx >= n.x + n.w / 2 ? -1 : 1);
            nx = tcx + side * 52 - n.w / 2;
            ny = Math.max(wildernessOn() ? WILDS.top : 36, (target.y + (target.h || 50)) - n.h);
            if (!target.grounded) { n.dy = -2.5; n.grounded = false; v.airSlow = 45; }
        } else {
            nx = n.x + dir * 165;
        }
        vergilLabel('DARK SLAYER TRICK');
    }

    const minX = typeof worldL === 'function' ? worldL() + 8 : 12;
    const maxX = (typeof worldR === 'function' ? worldR() : canvas.width) - n.w - 8;
    n.x = Math.max(minX, Math.min(maxX, nx));
    n.y = Math.max(wildernessOn() ? WILDS.top : -100, ny);
    if (typeof dashVx !== 'undefined') dashVx = 0;

    if (target) {
        n.isFacingLeft = (target.x + (target.w || 40) / 2) < (n.x + n.w / 2);
        v.body.facingLeft = n.isFacingLeft;
    }

    n.invincible = true;
    n.invTimer = Math.max(n.invTimer || 0, 12);
    vgAddGhost(n, v);
    vgAddConc(v, 10);
    if (typeof visualEffects !== 'undefined') {
        visualEffects.push(new Effect(n.x + n.w / 2, n.y + n.h / 2, 'parry', false));
    }
    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1380, 0.06, 'sine', 0.10, 420);
}
// PLAYER_PART_END s18.vgPerformTrick.1

// index.html:112776 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgFireRangedMirage.1 EDITABLE
function vgFireRangedMirage(n, v, forceMode = null) {
    const mode = forceMode !== null ? forceMode : v.mirageMode;
    const dir = n.isFacingLeft ? -1 : 1;
    const cx = n.x + n.w / 2, cy = n.y + n.h / 2;
    const target = vgFindTarget(n, dir, 750);

    // [0] SHOOTING BLADES: Bắn kiếm tầm xa thuần sát thương + găm dấu ấn Grim Trick
    if (mode === 0) {
        const side = (v.swords.length % 2 === 0) ? -1 : 1;
        const sx = cx - dir * 14, sy = n.y + 12 + side * 10;
        const tx = target ? (target.x + (target.w || 40) / 2) : (cx + dir * 320);
        const ty = target ? (target.y + (target.h || 50) / 2) : (cy - 4);
        const ang = Math.atan2(ty - sy, tx - sx);
        v.swords.push({
            mode: 'shoot', x: sx, y: sy,
            vx: Math.cos(ang) * 19, vy: Math.sin(ang) * 19,
            ang, t: 0, wait: 2, life: 48,
            damage: 1.6, hit: new Set(), markOnHit: true
        });
        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1520, 0.04, 'triangle', 0.07, 920);
        return;
    }

    // [1] SPIRAL BLADES: 6 kiếm xoay quanh người gây sát thương tầm gần (không khóa cứng)
    if (mode === 1) {
        if (v.conc < 20 && v.sdt <= 0) { vergilLabel('NEED CONCENTRATION!'); return; }
        if (v.sdt <= 0) vgAddConc(v, -20);
        v.swords = v.swords.filter(s => s.mode !== 'spiral');
        for (let k = 0; k < 6; k++) {
            v.swords.push({
                mode: 'spiral', x: cx, y: cy,
                ang: (k / 6) * Math.PI * 2, r: 58,
                t: 0, life: 220, damage: 1.2, hitCd: new Map()
            });
        }
        vergilLabel('SPIRAL BLADES');
        if (typeof SFX !== 'undefined' && SFX.bossSkill) SFX.bossSkill();
        return;
    }

    // [2] STORM BLADES: 6 kiếm vây quanh mục tiêu rồi đâm xuyên tâm (chỉ gây sát thương, bỏ launch liên tục)
    if (mode === 2) {
        if (v.conc < 25 && v.sdt <= 0) { vergilLabel('NEED CONCENTRATION!'); return; }
        if (v.sdt <= 0) vgAddConc(v, -25);
        const tx = target ? (target.x + (target.w || 40) / 2) : (cx + dir * 180);
        const ty = target ? (target.y + (target.h || 50) / 2) : cy;
        for (let k = 0; k < 6; k++) {
            const a = (k / 6) * Math.PI * 2;
            v.swords.push({
                mode: 'storm',
                tx, ty, target,
                x: tx + Math.cos(a) * 84, y: ty + Math.sin(a) * 84,
                ang: a + Math.PI, r: 84,
                t: 0, wait: 16, life: 40,
                damage: 1.7, hit: new Set()
            });
        }
        vergilLabel('STORM BLADES');
        if (typeof SFX !== 'undefined' && SFX.bossSkill) SFX.bossSkill();
        return;
    }

    // [3] HEAVY RAIN BLADES: Mưa kiếm từ trên cao (Có ghim ngắn nhưng chịu khóa 2 giây `ccKey: 'rain'`)
    if (mode === 3) {
        if (v.conc < 30 && v.sdt <= 0) { vergilLabel('NEED CONCENTRATION!'); return; }
        if (v.sdt <= 0) vgAddConc(v, -30);
        const baseX = target ? (target.x + (target.w || 40) / 2) : (cx + dir * 170);
        const topY = Math.max(24, (target ? target.y : n.y) - 135);
        for (let k = -3; k <= 3; k++) {
            v.swords.push({
                mode: 'rain',
                x: baseX + k * 24, y: topY - Math.abs(k) * 8,
                vx: 0, vy: 17, ang: Math.PI / 2,
                t: 0, wait: 10 + Math.abs(k) * 3, life: 55,
                damage: 1.5, hit: new Set(), pinTarget: true
            });
        }
        vergilLabel('HEAVY RAIN BLADES');
        if (typeof SFX !== 'undefined' && SFX.bossSkill) SFX.bossSkill();
    }
}
// PLAYER_PART_END s18.vgFireRangedMirage.1

// index.html:112861 · Phạm vi: global
// PLAYER_PART_BEGIN s18.ymtStart.1 EDITABLE
function ymtStart(id, extra = {}) {
    const n = dino, v = n.vergil, m = YMT_MOVES[id];
    if (!m || n.hp <= 0) return;
    const dir = extra.lockDir || (n.isFacingLeft ? -1 : 1);
    n.isFacingLeft = dir < 0;
    v.body.facingLeft = n.isFacingLeft;

    v.attack = {
        ...m, ...extra, id,
        age: 0, dir,
        hit: new Map(),
        sheathed: false
    };
    playerComboTrack(v,v.attack,'vergil');
    v.slashTrail = [];
    v.mirageTrail = [];
    v.justWindow = 0;

    if (id === 'upper2' || id === 'rstar' || id === 'airb1' || id === 'm_high') {
        n.dy = id === 'rstar' ? -10.5 : -9.5;
        n.grounded = false;
        v.airSlow = 70;
    }
    if (id === 'air1' || id === 'air2' || id === 'jcut' || id === 'pjcut') {
        if (!n.grounded) {
            n.dy = Math.min(n.dy, 0.25);
            v.airSlow = Math.max(v.airSlow, 35);
        }
    }
    if (id === 'rapid' || id === 'rstar' || id === 'm_stinger') {
        if (typeof dashVx !== 'undefined') dashVx = dir * (id === 'm_stinger' ? 21 : (id === 'rapid' ? 19 : 13));
    }

    // Nếu là đòn ném kiếm xoay Mirage Edge Round Trip (O + S + K)
    if (m.spawnRoundTrip) {
        const target = vgFindTarget(n, dir, 600);
        v.roundSword = {
            x: n.x + n.w / 2 + dir * 32,
            y: n.y + 24,
            tx: target ? (target.x + (target.w || 40) / 2) : (n.x + n.w / 2 + dir * 165),
            ty: target ? (target.y + (target.h || 50) / 2) : (n.y + 26),
            target,
            t: 0, life: 135, hitCd: new Map()
        };
    }

    // Nếu là Judgement Cut / Perfect Judgement Cut -> Quả cầu không gian tại mục tiêu (Trong suốt, chỉ gây sát thương)
    if (m.isJCut) {
        const lv = vgConcLevel(v);
        const target = vgFindTarget(n, dir, 760);
        const jx = target ? (target.x + (target.w || 40) / 2) : (n.x + n.w / 2 + dir * 185);
        const jy = target ? (target.y + (target.h || 50) / 2) : (n.y + n.h / 2 - 6);
        const rad = (m.perfect ? 72 : 54) + lv * 8;

        v.cuts.push({
            x: jx, y: jy, r: rad,
            t: m.perfect ? 7 : 12,
            warn: m.perfect ? 7 : 12,
            boom: 0, maxBoom: 16,
            perfect: m.perfect,
            damage: m.damage
        });

        if (m.perfect && (lv >= 2 || v.sdt > 0)) {
            for (const s of [-1, 1]) {
                v.cuts.push({
                    x: jx + s * 62, y: jy - 12, r: rad * 0.68,
                    t: 11 + (s > 0 ? 4 : 0), warn: 12,
                    boom: 0, maxBoom: 14,
                    perfect: true,
                    damage: m.damage * 0.42
                });
            }
        }
        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(m.perfect ? 1950 : 1550, 0.09, 'sine', 0.14, 520);
    }

    if (!['a1', 'a2', 'air1', 'air2', 'm_combo1'].includes(id)) {
        vergilLabel(m.name);
    }

    // Ghi lịch sử cho Doppelganger (trễ 16 frame để nhịp đánh tách bạch với người chơi)
    if (v.dop) {
        v.dopHist.push({ frame: frames + 16, type: 'move', id, dir });
    }
}
// PLAYER_PART_END s18.ymtStart.1

// index.html:112948 · Phạm vi: global
// PLAYER_PART_BEGIN s18.ymtPose.1 EDITABLE
function ymtPose(n, v, a, age) {
    const dir = a ? a.dir : (n.isFacingLeft ? -1 : 1);
    const ox = n.x + n.w / 2, oy = n.y;
    let sayaX = -10, sayaY = 28, sayaAng = -0.38;
    let hx = -6, hy = 25, angle = -0.38, len = 82, flat = 1, drawn = false, mirageBlade = false;
    // Tọa độ tay trái cầm Mirage Edge khi kích hoạt O + J/K
    let mhx = -12, mhy = 22, mAngle = 0.55;

    if (!a) {
        const breath = Math.sin(frames * 0.06) * 1.0;
        sayaY += breath; hy += breath;
        drawn = false;
        mirageBlade = v.mirageStance > 0;
        if (mirageBlade) { mhx = -14; mhy = 20 + breath; mAngle = 2.35; }
    } else {
        const pr = Math.max(0, Math.min(1, (age - a.wind) / Math.max(1, a.end - a.wind)));
        const ease = 1 - Math.pow(1 - pr, 3);
        drawn = age >= a.wind && !a.sheathed;
        mirageBlade = !!a.mirageMelee || v.mirageStance > 0;

        switch (a.pose) {
            case 'iaiSlash':
                if (age < a.wind) {
                    drawn = false; hx = -8; hy = 26;
                } else {
                    angle = 2.15 - 3.65 * ease;
                    hx = -4 + 22 * Math.sin(ease * Math.PI * 0.85);
                    hy = 25 - 8 * ease;
                    flat = 0.52;
                }
                break;

            case 'revSlash':
                angle = -1.65 + 3.45 * ease;
                hx = 18 - 14 * ease;
                hy = 20 + 8 * ease;
                flat = 0.48;
                break;

            case 'sayaBash':
                if (age < 7) {
                    drawn = false; sayaX = 16; sayaY = 22; sayaAng = 0.15;
                } else {
                    drawn = true;
                    angle = -2.4 + 4.2 * ease;
                    hx = 16; hy = 22; flat = 0.42;
                }
                break;

            case 'wideIai':
            case 'voidArc':
                if (age < a.wind) {
                    drawn = false; hx = -10; hy = 26;
                } else if (age <= a.end) {
                    angle = 2.35 - 4.5 * ease;
                    hx = 20 * Math.sin(ease * Math.PI * 0.75);
                    hy = 22;
                    len = 96; flat = 0.38;
                } else {
                    drawn = !a.sheathed;
                    angle = -0.38; hx = -6; hy = 25;
                }
                break;

            case 'upperIai':
                angle = 1.85 - 3.75 * ease;
                hx = 14 * Math.sin(ease * Math.PI);
                hy = 34 - 22 * ease;
                len = 88;
                if (mirageBlade) { mAngle = 2.1 - 3.9 * ease; mhx = 18 * Math.sin(ease * Math.PI); mhy = 30 - 20 * ease; }
                break;

            case 'downIai':
            case 'helm':
                angle = -2.35 + 3.55 * ease;
                hx = 14; hy = 14 + 18 * ease;
                len = 88;
                break;

            case 'flurry': {
                const spd = age * 1.45;
                angle = Math.sin(spd) * 1.35;
                hx = 16 + Math.cos(spd * 1.3) * 8;
                hy = 22 + Math.sin(spd * 0.9) * 6;
                len = 88; flat = 0.55;
                break;
            }

            case 'rapid':
                angle = Math.sin(age * 1.2) * 1.1;
                hx = 18; hy = 24; len = 90; flat = 0.45;
                break;

            case 'spinUp':
                angle = -2.2 + Math.PI * 2 * 2 * ease;
                hx = 12 * Math.cos(angle);
                hy = 20 + 6 * Math.sin(angle);
                len = 86; flat = 0.45;
                break;

            case 'jcutPose':
                drawn = age >= a.wind && age <= a.wind + 3;
                angle = -0.25; hx = -4; hy = 24; len = 84;
                break;

            // --- CÁC POSE SONG KIẾM YAMATO + MIRAGE EDGE (NHÁNH PHÍM O) ---
            case 'mirage1':
                angle = -2.2 + 3.8 * ease;
                hx = 14 * Math.sin(ease * Math.PI); hy = 20;
                mAngle = 2.2 - 3.8 * ease;
                mhx = 18 * Math.sin(ease * Math.PI); mhy = 24;
                flat = 0.48;
                break;

            case 'mirage2':
                angle = -2.5 + Math.PI * 2 * ease;
                mAngle = angle + Math.PI;
                hx = 14 * Math.cos(angle); hy = 22;
                mhx = 14 * Math.cos(mAngle); mhy = 24;
                flat = 0.42;
                break;

            case 'mirageFin':
                angle = -2.4 + 4.1 * ease;
                mAngle = 2.4 - 4.1 * ease;
                hx = 20 * Math.sin(ease * Math.PI); hy = 20;
                mhx = 20 * Math.sin(ease * Math.PI); mhy = 26;
                len = 92; flat = 0.40;
                break;

            case 'mStinger': { // Deep Stinger: 2 thanh kiếm chụm mũi xoay khoan về phía trước!
                const spin = age * 0.95;
                angle = Math.sin(spin) * 0.18;
                mAngle = -Math.sin(spin) * 0.18;
                hx = 22; hy = 22 + Math.cos(spin) * 4;
                mhx = 24; mhy = 22 - Math.cos(spin) * 4;
                len = 96; flat = 0.65;
                break;
            }
        }
    }

    const wx = ox + dir * hx, wy = oy + hy;
    const mwx = ox + dir * mhx, mwy = oy + mhy;
    return {
        x: wx, y: wy,
        tx: wx + dir * Math.cos(angle) * len,
        ty: wy + Math.sin(angle) * len * flat,
        mx: mwx, my: mwy,
        mtx: mwx + dir * Math.cos(mAngle) * (len * 0.96),
        mty: mwy + Math.sin(mAngle) * (len * 0.96) * flat,
        mAngle,
        sayaX: ox + dir * sayaX, sayaY: oy + sayaY, sayaAng,
        angle, len, flat, dir, drawn, mirageBlade
    };
}
// PLAYER_PART_END s18.ymtPose.1

// index.html:113106 · Phạm vi: global
// PLAYER_PART_BEGIN s18.ymtStrike.1 EDITABLE
function ymtStrike(n, v, a, pulse) {
    const lv = vgConcLevel(v);
    const cx = n.x + n.w / 2, cy = n.y + n.h / 2;
    const reach = (a.pose === 'wideIai' || a.pose === 'voidArc' || a.pose === 'mStinger' ? 116 : (a.pose === 'flurry' || a.pose === 'rapid' || a.mirageMelee ? 104 : 94)) + lv * 10;
    const isAround = a.pose === 'spinUp' || a.pose === 'rapid' || a.pose === 'mirage2';

    const box = {
        x: isAround ? (cx - reach * 0.85) : (a.dir < 0 ? n.x - reach + 8 : n.x + n.w - 8),
        y: n.y - (a.launch || a.launchWithMe || a.pose === 'upperIai' ? 44 : 14),
        w: isAround ? reach * 1.7 : reach,
        h: n.h + (a.launch || a.launchWithMe || a.pose === 'upperIai' ? 60 : 28)
    };

    if (a.slowBubble && pulse === 0) {
        v.voidZones.push({
            x: cx + a.dir * 68, y: cy - 4,
            r: 58 + lv * 6, t: 75, max: 75
        });
        if (typeof SFX !== 'undefined' && SFX.bossSkill) SFX.bossSkill();
    }

    const targets = typeof sgTargets === 'function' ? sgTargets(n) : (typeof allTargets === 'function' ? allTargets() : bosses);
    for (const o of targets) {
        if (!o || o.hp <= 0) continue;
        const root = o.__goc || o;
        if (a.hit.get(root) === pulse) continue;
        if (!checkAABB(box, o)) continue;

        const dealt = vgDealDamage(v, o, a.damage, a.mirageMelee ? 'mirage_melee' : 'yamato');
        if (!dealt) continue;
        a.hit.set(root, pulse);

        v.markedTarget = root;
        v.markTimer = 240;

        const ox = o.x + (o.w || 40) / 2, oy = o.y + (o.h || 50) / 2;
        for (let s = 0; s < 2; s++) {
            v.sparks.push({
                x: ox + (Math.random() - 0.5) * 18,
                y: oy + (Math.random() - 0.5) * 18,
                ang: (Math.random() - 0.5) * 1.8,
                len: 34 + Math.random() * 20,
                t: 7, max: 7
            });
        }

        if(playerFinisherControl(n,v,a,o,{pulse}))continue;

        // CHỈ ÁP DỤNG KHỐNG CHẾ NẾU CHIÊU ĐÓ CÓ `ccKey` VÀ QUA ĐƯỢC BỘ KIỂM TRA KHÓA 2 GIÂY!
        if (typeof dswControl === 'function') {
            if (a.ccKey && vgCanApplyCC(root, a.ccKey)) {
                if (a.launchWithMe) {
                    const ctrl = vgControl(o, { launch: true });
                    if (ctrl) {
                        ctrl.targetY = Math.max(38, n.y - 12);
                        ctrl.vy = -9.4;
                        ctrl.stun = Math.max(ctrl.stun, 32);
                    }
                } else if (a.pullIn) {
                    const ctrl = vgControl(o, {});
                    if (ctrl) { ctrl.stun = Math.max(ctrl.stun, 30); ctrl.vx = 0; }
                    if(ctrl)o.x += ((cx + a.dir * 58 - (o.w || 40) / 2) - o.x) * 0.45;
                } else if (a.stunOnly) {
                    const ctrl = vgControl(o, {});
                    if (ctrl) { ctrl.stun = Math.max(ctrl.stun, a.stunOnly); ctrl.vx = 0; }
                } else {
                    vgControl(o, {
                        launch: a.launch,
                        slam: a.slam
                    });
                }
            }
            // Nếu mục tiêu ĐANG ở sẵn trên không (do mới bị hất tung hợp lệ), cho phép Aerial Rave giữ nhẹ trên không tối đa 2 nhịp
            else if (a.airJuggle && !root.grounded && root._dswControl && root._dswControl.air) {
                root._dswControl.vy = Math.min(root._dswControl.vy, -0.6);
            }
        }
    }
    if (typeof shakeTimer !== 'undefined') shakeTimer = Math.max(shakeTimer, a.damage >= 5 ? 10 : 3);
}
// PLAYER_PART_END s18.ymtStrike.1

// index.html:113188 · Phạm vi: global
// PLAYER_PART_BEGIN s18.ymtDispatch.1 EDITABLE
function ymtDispatch(cmd) {
    const n = dino, v = n.vergil;
    if (v.jce || frames < v.guardUntil) return;
    const recent = frames - v.ended <= 38;
    const last = recent ? v.last : '';
    const pauseBeat = recent && (frames - v.ended >= 11);

    // 1. Nối chuỗi PERFECT JUDGEMENT CUT liên hoàn (tối đa 3 lần ở Concentration Lv2)
    if (cmd.key === 'J' && v.justWindow > 0 && v.jcutChain < (vgConcLevel(v) >= 2 || v.sdt > 0 ? 3 : 1)) {
        v.jcutChain++;
        ymtStart('pjcut');
        return;
    }
    v.jcutChain = 0;

    // =========================================================================
    // 2. NẾU ĐANG BẬT THẾ MIRAGE BLADE STANCE (PHÍM O) -> DÙNG COMBO CẬN CHIẾN MIRAGE EDGE!
    // =========================================================================
    if (v.mirageStance > 0 || cmd.mirageForce) {
        v.mirageStance = Math.max(v.mirageStance, 180); // Duy trì thế Song Kiếm thêm 3 giây khi đang đánh
        if (cmd.key === 'K') {
            if (!n.grounded) { ymtStart('helm'); return; }
            if (cmd.down) { ymtStart('m_round'); return; }   // O -> S + K: Phóng kiếm xoay Round Trip
            ymtStart('m_stinger');                           // O -> K: Khoan song kiếm Deep Stinger
            return;
        }
        if (cmd.key === 'J') {
            if (!n.grounded) {
                ymtStart(last === 'air1' ? 'air2' : (last === 'air2' ? 'airb2' : 'air1'));
                return;
            }
            if (cmd.down) { ymtStart('m_high'); return; }    // O -> S + J: Hất tung Spiral Launch
            if (cmd.dash) { ymtStart('m_stinger'); return; }
            if (last === 'm_combo1') { ymtStart('m_combo2'); return; }
            if (last === 'm_combo2') { ymtStart('m_combo3'); return; }
            ymtStart('m_combo1');
            return;
        }
    }

    // =========================================================================
    // 3. NHÁNH THUẦN YAMATO MẶC ĐỊNH
    // =========================================================================
    if (cmd.key === 'K') {
        if (!n.grounded) { ymtStart('helm'); return; }
        if (cmd.down) { ymtStart('vslash'); return; }
        if (cmd.up || (cmd.charge && cmd.charge >= 18)) { ymtStart('rstar'); return; }
        ymtStart('rapid');
        return;
    }

    if (cmd.key === 'J') {
        if (!n.grounded) {
            if (last === 'air1') { ymtStart('air2'); return; }
            if (last === 'air2') { ymtStart(pauseBeat ? 'airb1' : 'air3'); return; }
            if (last === 'airb1') { ymtStart('airb2'); return; }
            ymtStart('air1');
            return;
        }
        if (cmd.down) {
            ymtStart(last === 'upper1' ? 'upper2' : 'upper1');
            return;
        }
        if (cmd.dash) { ymtStart('rapid'); return; }
        if (last === 'a1') { ymtStart('a2'); return; }
        if (last === 'a2') { ymtStart(pauseBeat ? 'c_flurry' : 'a3'); return; }
        if (last === 'c_flurry') { ymtStart('c_finish'); return; }
        if (last === 'a3') { ymtStart('a4'); return; }
        ymtStart('a1');
    }
}
// PLAYER_PART_END s18.ymtDispatch.1

// index.html:113260 · Phạm vi: global
// PLAYER_PART_BEGIN s18.ymtCommand.1 EDITABLE
function ymtCommand(cmd) {
    const n = dino, v = n.vergil, a = v.attack;
    if (a) {
        if (a.id === 'rapid' && cmd.key === 'K' && a.age >= 8 && vgConcLevel(v) >= 1) {
            v.queue = [];
            ymtStart('rstar', { lockDir: a.dir });
            return;
        }
        if (a.id === 'upper1' && cmd.key === 'J' && a.age >= 8) {
            v.queue = [];
            ymtStart('upper2', { lockDir: a.dir });
            return;
        }
        // Đang chém Yamato thường mà bấm O rồi bấm J/K -> Nối mượt sang Song Kiếm Mirage Edge!
        if (cmd.key === 'J' && v.justWindow > 0 && v.jcutChain < (vgConcLevel(v) >= 2 || v.sdt > 0 ? 3 : 1)) {
            v.queue = [];
            v.jcutChain++;
            ymtStart('pjcut', { lockDir: a.dir });
            return;
        }
        if (a.age >= playerComboCancel(a)) {
            v.last = a.id; v.ended = frames; v.attack = null;
            ymtDispatch(cmd);
            return;
        }
        playerComboBuffer(v.queue,cmd);
        return;
    }
    ymtDispatch(cmd);
}
// PLAYER_PART_END s18.ymtCommand.1

// index.html:113294 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgTriggerJCE.1 EDITABLE
function vgTriggerJCE(n, v) {
    if (v.jce) return false;
    v.attack = null; v.queue = [];
    v.sdt = Math.max(0, v.sdt - 280);
    v.conc = 0;
    if (typeof ultCharge !== 'undefined') ultCharge = 0;

    // Đưa Vergil đáp chuẩn xuống mặt sàn trước khi rút kiếm mở lãnh địa JCE
    const floorY = typeof dswFloor === 'function' ? dswFloor(n.x + n.w / 2, n.y + n.h) : 320;
    n.y = floorY - n.h;
    n.dy = 0;
    n.grounded = true;

    v.jce = {
        age: 0,
        homeX: n.x, homeY: n.y,
        floorY,
        slashes: []
    };
    vergilLabel('JUDGEMENT CUT END!', '#80D8FF');
    if (typeof shakeTimer !== 'undefined') shakeTimer = Math.max(shakeTimer, 28);
    if (typeof SFX !== 'undefined' && SFX.bossEntry) SFX.bossEntry();
    return true;
}
// PLAYER_PART_END s18.vgTriggerJCE.1

// index.html:113322 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vergilTick.1 EDITABLE
function vergilTick() {
    if (!vergilActive(dino)) return;
    if (!dino.vergil) vergilInit(dino);
    if (paused || gameOver || gameVictory) return;

    const n = dino, v = n.vergil;
    if (v.markTimer > 0) v.markTimer--;
    if (v.justWindow > 0) v.justWindow--;
    if (v.sheatheSpark > 0) v.sheatheSpark--;
    if (v.airSlow > 0) v.airSlow--;
    if (v.mirageStance > 0) v.mirageStance--;
    if (n.grounded && !v.attack) v.airSlow = 0;

    const movingFast = Math.abs(n.x - (v.lastX ?? n.x)) > 3.8 && !v.attack;
    if (!v.attack && !v.jce) {
        if (!movingFast && n.grounded) vgAddConc(v, 0.45);
    }

    if (v.sdt > 0 && !v.jce) {
        v.sdt--;
        if (typeof ultCharge !== 'undefined') ultCharge = 0;
        v.body.wing += 0.12;
        if (++v.regen >= 120) {
            v.regen = 0;
            n.hp = Math.min(n.maxHp, n.hp + 1);
        }
        if (v.sdt <= 0) {
            v.dop = null; v.dopHist = [];
        }
    }

    // CẬP NHẬT JUDGEMENT CUT END (Đường cắt bám chuẩn độ cao mặt đất & tâm mục tiêu!)
    const targets = typeof sgTargets === 'function' ? sgTargets(n) : (typeof allTargets === 'function' ? allTargets() : bosses);
    if (v.jce) {
        const j = v.jce;
        j.age++;
        n.invincible = true; n.invTimer = Math.max(n.invTimer || 0, 4);
        n.dy = 0; if (typeof dashVx !== 'undefined') dashVx = 0;
        n.x = j.homeX; n.y = j.homeY;

        if (j.age < 20) {
            v.body.drawn = false;
            v.sheatheSpark = 6;
        } else if (j.age < 88) {
            if (j.age % 3 === 0) {
                // Lấy tâm của các mục tiêu trên sân (hoặc vùng mặt đất quanh Vergil) để đường kiếm cắt chuẩn xác, KHÔNG bay chệch lên trời!
                const alive = targets.filter(o => o && o.hp > 0);
                const pick = alive.length ? alive[(j.age / 3 | 0) % alive.length] : null;
                const cx = pick ? (pick.x + (pick.w || 40) / 2 + (Math.random() - 0.5) * 90) : (camX + 100 + Math.random() * (canvas.width - 200));
                const cy = pick ? (pick.y + (pick.h || 50) / 2 + (Math.random() - 0.5) * 45) : (j.floorY - 45 + (Math.random() - 0.5) * 55);
                const ang = (Math.random() - 0.5) * 1.35;
                const span = 180 + Math.random() * 80;
                j.slashes.push({
                    x1: cx - Math.cos(ang) * span, y1: cy - Math.sin(ang) * span,
                    x2: cx + Math.cos(ang) * span, y2: cy + Math.sin(ang) * span,
                    t: 20, max: 20
                });
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1150 + (j.age % 7) * 110, 0.03, 'sine', 0.05, 600);
            }
        } else if (j.age === 88) {
            v.sheatheSpark = 18;
            for (const o of targets) {
                if (o && o.hp > 0) {
                    vgDealDamage(v, o, 42, 'jce');
                    if (typeof visualEffects !== 'undefined') {
                        visualEffects.push(new Effect(o.x + (o.w || 40) / 2, o.y + (o.h || 50) / 2, 'parry', false));
                    }
                }
            }
            if (typeof shakeTimer !== 'undefined') shakeTimer = Math.max(shakeTimer, 40);
            if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
        }
        j.slashes = j.slashes.filter(s => --s.t > 0);
        if (j.age >= 112) {
            v.jce = null;
            if(v.sdt<=0){v.dop=null;v.dopHist=[];}
        }
        return;
    }

    // Nạp giữ J -> Just Judgement Cut
    if (keys.KeyJ && !keys.KeyS && !keys.ArrowDown) {
        v.holdJ++;
        if (v.holdJ === 26) {
            v.sheatheSpark = 12;
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1750, 0.05, 'sine', 0.09, 1200);
        }
    } else if (v.holdJ > 0) {
        const held = v.holdJ;
        v.holdJ = 0;
        if (held >= 22) {
            const isPerfect = held >= 24 && held <= 38;
            v.attack = null; v.queue = [];
            ymtStart(isPerfect ? 'pjcut' : 'jcut');
        }
    }

    if(keys.KeyK){
        v.holdK++;
        if(v.holdK===18&&v.attack?.id==='rapid')ymtCommand({key:'K',charge:v.holdK,air:!n.grounded,down:false,up:true});
    }else v.holdK=0;

    // Giữ nút I (28 frame) -> Bắn 6 thanh Blistering Blades tầm xa
    if (keys.KeyI) {
        v.holdI++;
        if (v.holdI === 28) {
            const dir = n.isFacingLeft ? -1 : 1;
            const target = vgFindTarget(n, dir, 750);
            for (let k = 0; k < 6; k++) {
                const sx = n.x + n.w / 2 - dir * 10, sy = n.y - 8 + k * 9;
                const tx = target ? (target.x + (target.w || 40) / 2) : (sx + dir * 320);
                const ty = target ? (target.y + (target.h || 50) / 2) : sy;
                const ang = Math.atan2(ty - sy, tx - sx);
                v.swords.push({
                    mode: 'shoot', x: sx, y: sy,
                    vx: Math.cos(ang) * 19, vy: Math.sin(ang) * 19,
                    ang, t: 0, wait: 4 + k * 3, life: 52,
                    damage: 1.4, hit: new Set(), markOnHit: true
                });
            }
            vergilLabel('BLISTERING BLADES');
        }
    } else {
        v.holdI = 0;
    }

    // CẬP NHẬT ĐÒN TẤN CÔNG HIỆN TẠI
    const a = v.attack;
    if (a && playerAttackStep(a,VERGIL_ATTACK_RATE)) {
        const prevAge = a.age;
        a.age++;

        if (v.queue.length > 0 && a.age >= playerComboCancel(a)) {
            const nextCmd = v.queue.shift();
            v.last = a.id; v.ended = frames; v.attack = null;
            ymtDispatch(nextCmd);
            return;
        }

        if (a.advance && a.age === a.wind + 1 && n.grounded) {
            if (typeof dashVx !== 'undefined') dashVx = a.dir * a.advance;
        }
        if ((a.id === 'rapid' || a.id === 'm_stinger') && a.age >= a.wind && a.age <= a.end) {
            const minX = typeof worldL === 'function' ? worldL() + 8 : 12;
            const maxX = (typeof worldR === 'function' ? worldR() : canvas.width) - n.w - 8;
            n.x = Math.max(minX, Math.min(maxX, n.x + a.dir * (a.id === 'm_stinger' ? 6.2 : 7.5)));
            if (a.age % 3 === 0) vgAddGhost(n, v);
        }

        if (a.id === 'helm') {
            n.dy = 17;
            if (n.grounded && a.age > 3) {
                ymtStrike(n, v, a, 0);
                if (typeof visualEffects !== 'undefined') {
                    visualEffects.push(new Effect(n.x + n.w / 2, n.y + n.h, 'explosion', true, 36));
                }
                if (typeof shakeTimer !== 'undefined') shakeTimer = Math.max(shakeTimer, 14);
                v.sheatheSpark = 10;
                v.justWindow = 12;
                v.last = a.id; v.ended = frames; v.attack = null;
                return;
            }
        } else if (a.count) {
            const k = Math.floor((a.age - a.wind - 1) * a.count / Math.max(1, a.end - a.wind));
            const oldK = Math.floor((prevAge - a.wind - 1) * a.count / Math.max(1, a.end - a.wind));
            if (k >= 0 && k < a.count && k !== oldK) {
                ymtStrike(n, v, a, k);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(950 + (k % 4) * 90, 0.03, 'sine', 0.07, 500);
            }
        } else if (a.hits) {
            const idx = a.hits.indexOf(a.age);
            if (idx >= 0) {
                ymtStrike(n, v, a, idx);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(680 + idx * 80, 0.04, 'triangle', 0.09, 320);
            }
        }

        if (a.sheatheAt && a.age === a.sheatheAt) {
            a.sheathed = true;
            v.sheatheSpark = 12;
            v.justWindow = 12;
            vgAddConc(v, a.conc || 15);
            if (v.sdt <= 0 && typeof ultCharge !== 'undefined') {
                ultCharge = Math.min(100, ultCharge + 3.5);
            }
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1820, 0.05, 'sine', 0.08, 1400);
        }

        const pose = ymtPose(n, v, a, a.age);
        if (pose.drawn && !a.isJCut && a.age >= a.wind && a.age <= a.end) {
            for (let s = 1; s <= 3; s++) {
                const subPose = ymtPose(n, v, a, a.age - 1 + s / 3);
                v.slashTrail.push({ ...subPose, t: 7, max: 7 });
                if (a.mirageMelee) {
                    v.mirageTrail.push({ x: subPose.mx, y: subPose.my, tx: subPose.mtx, ty: subPose.mty, t: 7, max: 7 });
                }
            }
            if (v.slashTrail.length > 22) v.slashTrail.splice(0, v.slashTrail.length - 22);
            if (v.mirageTrail.length > 22) v.mirageTrail.splice(0, v.mirageTrail.length - 22);
        }

        if (a.age >= a.T) {
            v.last = a.id; v.ended = frames; v.attack = null;
            if (v.queue.length) ymtDispatch(v.queue.shift());
        }
    }

    // CẬP NHẬT ĐẠI KIẾM XOAY MIRAGE EDGE ROUND TRIP (O + S + K)
    if (v.roundSword) {
        const rs = v.roundSword;
        rs.t++; rs.life--;
        if (rs.target && rs.target.hp > 0) {
            rs.tx = rs.target.x + (rs.target.w || 40) / 2;
            rs.ty = rs.target.y + (rs.target.h || 50) / 2;
        }
        rs.x += (rs.tx - rs.x) * 0.18;
        rs.y += (rs.ty - rs.y) * 0.18;
        for (const o of targets) {
            if (!o || o.hp <= 0) continue;
            const root = o.__goc || o;
            if ((rs.hitCd.get(root) || 0) > frames) continue;
            if (checkAABB({ x: rs.x - 42, y: rs.y - 42, w: 84, h: 84 }, o)) {
                rs.hitCd.set(root, frames + 16);
                vgDealDamage(v, o, 1.4, 'mirage_melee');
            }
        }
        if (rs.life <= 0) v.roundSword = null;
    }

    // CẬP NHẬT QUẢ CẦU KHÔNG GIAN JUDGEMENT CUT (BỎ STUN VÔ HẠN, CHỈ SÁT THƯƠNG THUẦN!)
    for (let i = v.cuts.length - 1; i >= 0; i--) {
        const c = v.cuts[i];
        if (c.t > 0) {
            c.t--;
            if (c.t === 0) {
                c.boom = c.maxBoom;
                for (const o of targets) {
                    if (!o || o.hp <= 0) continue;
                    const ox = o.x + (o.w || 40) / 2, oy = o.y + (o.h || 50) / 2;
                    if (Math.hypot(ox - c.x, oy - c.y) <= c.r + (o.w || 40) * 0.45) {
                        vgDealDamage(v, o, c.damage, c.perfect ? 'pjcut' : 'jcut');
                    }
                }
                if (typeof shakeTimer !== 'undefined') shakeTimer = Math.max(shakeTimer, c.perfect ? 14 : 8);
                if (typeof SFX !== 'undefined' && SFX.bossSkill) SFX.bossSkill();
            }
        } else {
            c.boom--;
            if (c.boom <= 0) v.cuts.splice(i, 1);
        }
    }

    // CẬP NHẬT VẾT NỨT VOID SLASH (Chỉ làm giảm nhẹ vận tốc di chuyển của địch thay vì khóa cứng AI!)
    for (let i = v.voidZones.length - 1; i >= 0; i--) {
        const vz = v.voidZones[i];
        vz.t--;
        for (const o of targets) {
            if (!o || o.hp <= 0) continue;
            const ox = o.x + (o.w || 40) / 2, oy = o.y + (o.h || 50) / 2;
            if (Math.hypot(ox - vz.x, oy - vz.y) <= vz.r) {
                if (typeof o.dashV === 'number') o.dashV *= 0.7;
            }
        }
        if (vz.t <= 0) v.voidZones.splice(i, 1);
    }

    // CẬP NHẬT KIẾM ẢO ẢNH PHÍM I (Chỉ Heavy Rain mới có ghim và chịu khóa 2 giây `vgCanApplyCC`)
    for (let i = v.swords.length - 1; i >= 0; i--) {
        const s = v.swords[i];
        s.t++; s.life--;

        if (s.mode === 'spiral') {
            s.ang += 0.14;
            s.x = n.x + n.w / 2 + Math.cos(s.ang) * s.r;
            s.y = n.y + n.h / 2 + Math.sin(s.ang) * s.r * 0.72;
            for (const o of targets) {
                if (!o || o.hp <= 0) continue;
                const root = o.__goc || o;
                if ((s.hitCd.get(root) || 0) > frames) continue;
                if (checkAABB({ x: s.x - 14, y: s.y - 14, w: 28, h: 28 }, o)) {
                    s.hitCd.set(root, frames + 18);
                    vgDealDamage(v, o, s.damage, 'mirage');
                }
            }
        } else if (s.mode === 'storm') {
            if (s.target && s.target.hp > 0) {
                s.tx = s.target.x + (s.target.w || 40) / 2;
                s.ty = s.target.y + (s.target.h || 50) / 2;
            }
            if (s.t < s.wait) {
                s.ang += 0.12;
                s.x = s.tx + Math.cos(s.ang) * s.r;
                s.y = s.ty + Math.sin(s.ang) * s.r;
            } else {
                const dx = s.tx - s.x, dy = s.ty - s.y, dist = Math.hypot(dx, dy);
                if (dist > 8) {
                    s.x += (dx / dist) * 18;
                    s.y += (dy / dist) * 18;
                    s.ang = Math.atan2(dy, dx);
                }
                for (const o of targets) {
                    const root = o.__goc || o;
                    if (!s.hit.has(root) && checkAABB({ x: s.x - 16, y: s.y - 16, w: 32, h: 32 }, o)) {
                        s.hit.add(root);
                        vgDealDamage(v, o, s.damage, 'mirage');
                    }
                }
            }
        } else {
            if (s.t >= (s.wait || 0)) {
                s.x += s.vx; s.y += s.vy;
                for (const o of targets) {
                    const root = o.__goc || o;
                    if (!s.hit.has(root) && checkAABB({ x: s.x - 14, y: s.y - 14, w: 28, h: 28 }, o)) {
                        s.hit.add(root);
                        vgDealDamage(v, o, s.damage, 'mirage');
                        if (s.markOnHit) {
                            v.markedTarget = root;
                            v.markTimer = 300;
                        }
                        // Heavy Rain chỉ ghim mục tiêu nếu chưa bị khóa 2 giây!
                        if (s.pinTarget && typeof dswControl === 'function' && vgCanApplyCC(root, 'rain')) {
                            const ctrl = vgControl(o, {});
                            if (ctrl) { ctrl.stun = Math.max(ctrl.stun, 26); ctrl.vx = 0; }
                        }
                        s.life = 0;
                        break;
                    }
                }
            }
        }
        if (s.life <= 0) v.swords.splice(i, 1);
    }

    // FIX VỊ TRÍ DOPPELGANGER: Đứng tách xa hẳn khỏi người chơi (cách 82px phía sau, hoặc kẹp sườn bên kia mục tiêu!)
    if (v.dop) {
        const dir = n.isFacingLeft ? -1 : 1;
        const nearEnemy = vgFindTarget(n, dir, 260, true);
        let wantX, wantY;
        if (nearEnemy && v.dop.attack) {
            // Khi đang chém phụ họa và có mục tiêu gần -> Phân thân lướt ra phía đối diện mục tiêu để đánh gọng kìm!
            const ecx = nearEnemy.x + (nearEnemy.w || 40) / 2;
            const playerOnLeft = (n.x + n.w / 2) < ecx;
            wantX = ecx + (playerOnLeft ? 64 : -64 - n.w);
            wantY = nearEnemy.y + (nearEnemy.h || 50) - n.h - 6;
            v.dop.facingLeft = playerOnLeft;
        } else {
            // Khi di chuyển bình thường -> Đứng lùi hẳn về sau 82px và lơ lửng cao hơn 16px, tuyệt đối không đè lên người chơi!
            wantX = n.x - dir * 82;
            wantY = n.y - 16 + Math.sin(frames * 0.08) * 4;
            v.dop.facingLeft = n.isFacingLeft;
        }
        const minX = typeof worldL === 'function' ? worldL() + 8 : 12;
        const maxX = (typeof worldR === 'function' ? worldR() : canvas.width) - n.w - 8;
        wantX = Math.max(minX, Math.min(maxX, wantX));

        v.dop.x += (wantX - v.dop.x) * 0.18;
        v.dop.y += (wantY - v.dop.y) * 0.18;

        for (let i = v.dopHist.length - 1; i >= 0; i--) {
            const ev = v.dopHist[i];
            if (frames >= ev.frame) {
                v.dopHist.splice(i, 1);
                const m = YMT_MOVES[ev.id];
                if (m) {
                    v.dop.attack = { ...m, id: ev.id, dir: v.dop.facingLeft ? -1 : 1, age: 0 };
                    const dDir = v.dop.facingLeft ? -1 : 1;
                    const reach = 104;
                    const box = {
                        x: dDir < 0 ? v.dop.x - reach : v.dop.x + n.w,
                        y: v.dop.y - 20, w: reach, h: n.h + 36
                    };
                    for (const o of targets) {
                        if (o && o.hp > 0 && checkAABB(box, o)) {
                            vgDealDamage(v, o, m.damage * 0.42, 'doppelganger');
                        }
                    }
                }
            }
        }
        if (v.dop.attack) {
            if(playerAttackStep(v.dop.attack,VERGIL_ATTACK_RATE))v.dop.attack.age++;
            if (v.dop.attack.age >= v.dop.attack.T) v.dop.attack = null;
        }
    }

    v.slashTrail = v.slashTrail.filter(st => --st.t > 0);
    v.mirageTrail = v.mirageTrail.filter(mt => --mt.t > 0);
    v.sparks = v.sparks.filter(sp => --sp.t > 0);
    v.ghosts = v.ghosts.filter(g => --g.t > 0);

    const curPose = ymtPose(n, v, v.attack, v.attack ? v.attack.age : 0);
    v.body.facingLeft = n.isFacingLeft;
    v.body.stage = v.sdt > 0 ? 3 : 1;
    v.body.drawn = curPose.drawn;
    v.body.mirageWep = false;
    v.body.armR = curPose.drawn ? (curPose.angle - 0.5) : 0.15;
    v.body.armL = frames < v.guardUntil ? -1.1 : (curPose.mirageBlade ? (curPose.mAngle - 0.4) : -0.25);
    v.body.dashV = typeof dashVx !== 'undefined' ? dashVx : 0;
    v.lastX = n.x;
}
// PLAYER_PART_END s18.vergilTick.1
