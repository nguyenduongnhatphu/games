// PLAYER_FILE: FallRecovery
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Player, followFallRecovery
// index.html:115159 · Phạm vi: global
// PLAYER_PART_BEGIN s20.fallRecoveryUpdateBase.1 EDITABLE
const fallRecoveryUpdateBase=Player.prototype.update;
// PLAYER_PART_END s20.fallRecoveryUpdateBase.1

// index.html:115160 · Phạm vi: global
// PLAYER_PART_BEGIN s20.Player.prototype.update.1 EDITABLE
Player.prototype.update=function(...args){followFallRecovery(this);return fallRecoveryUpdateBase.apply(this,args);};
// PLAYER_PART_END s20.Player.prototype.update.1
