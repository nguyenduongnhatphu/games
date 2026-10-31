// PLAYER_FILE: Channels
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Player, cusChNgat, hasRune, lh
// index.html:106208 · Phạm vi: global
// PLAYER_PART_BEGIN s11.channelIsActive.1 EDITABLE
function channelIsActive(n){return !!(n&&(n.wsChannel||n.giaoChan||n.buaChan||n.clawChannel||n.cryoChannel||n.rapidChannel||n.pulseLaserChannel||n.fireChannel||n.lightChannel||n.splitChannel||n.pulsarChannel||n.boomChannel||n.cusCh||n.apex&&n.apex.state.apexChannel||n.id===1&&typeof lh!=='undefined'&&lh&&lh.ch));}
// PLAYER_PART_END s11.channelIsActive.1

// index.html:106209 · Phạm vi: global
// PLAYER_PART_BEGIN s11.channelShieldLocked.1 EDITABLE
function channelShieldLocked(n){return channelIsActive(n)&&!(hasRune('chanshld')||hasRune('chanshldx'));}
// PLAYER_PART_END s11.channelShieldLocked.1

// index.html:106210 · Phạm vi: global
// PLAYER_PART_BEGIN s11.channelDamageOriginal.1 EDITABLE
const channelDamageOriginal=Player.prototype.takeDamage;
// PLAYER_PART_END s11.channelDamageOriginal.1

// index.html:106211 · Phạm vi: global
// PLAYER_PART_BEGIN s11.Player.prototype.takeDamage.1 EDITABLE
Player.prototype.takeDamage=function(...args){const active=channelIsActive(this),hp=this.hp,armor=this.kinhLop;const result=channelDamageOriginal.apply(this,args);if(active&&(this.hp<hp||this.kinhLop<armor)){this.ngatMoiChannel();this.wsChannel=false;this.wsChanT=0;this.giaoChan=null;this.buaChan=null;if(this.id===1&&typeof lh!=='undefined'&&lh)lh.ch=null;if(this.apex){const s=this.apex.state;s.apexChannel=false;s.rangedCharging=false;s.rangedChargeSec=0;s.laserActiveSec=0;}if(this.id===1&&typeof cusChNgat==='function')cusChNgat(this);}return result;};
// PLAYER_PART_END s11.Player.prototype.takeDamage.1

// index.html:106212 · Phạm vi: global
// PLAYER_PART_BEGIN s11.channelShieldOriginal.1 EDITABLE
const channelShieldOriginal=Player.prototype.isShielding;
// PLAYER_PART_END s11.channelShieldOriginal.1

// index.html:106213 · Phạm vi: global
// PLAYER_PART_BEGIN s11.Player.prototype.isShielding.1 EDITABLE
Player.prototype.isShielding=function(){if(channelShieldLocked(this))return false;return channelShieldOriginal.call(this);};
// PLAYER_PART_END s11.Player.prototype.isShielding.1
