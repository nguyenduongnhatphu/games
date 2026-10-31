// PLAYER_FILE: FallRecovery
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Player, followFallRecovery
// index.html:115155 · Phạm vi: global
// PLAYER_PART_BEGIN s20.fallRecoveryUpdateBase.1 EDITABLE
const fallRecoveryUpdateBase=Player.prototype.update;
// PLAYER_PART_END s20.fallRecoveryUpdateBase.1

// index.html:115156 · Phạm vi: global
// PLAYER_PART_BEGIN s20.Player.prototype.update.1 EDITABLE
Player.prototype.update=function(...args){followFallRecovery(this);return fallRecoveryUpdateBase.apply(this,args);};
// PLAYER_PART_END s20.Player.prototype.update.1
