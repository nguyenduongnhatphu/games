// PLAYER_FILE: Registry
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: 
// index.html:48837 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VK.1 EDITABLE
const VK = [];
// PLAYER_PART_END s4.VK.1

// index.html:48838 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.1 EDITABLE
function vkDangKy(id, khoi){ khoi.id = id; VK[id] = khoi; return khoi; }
// PLAYER_PART_END s4.vkDangKy.1

// index.html:48839 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkMoc.1 EDITABLE
function vkMoc(id, moc){ let k = VK[id]; return (k && typeof k[moc] === 'function') ? k[moc] : null; }
// PLAYER_PART_END s4.vkMoc.1
