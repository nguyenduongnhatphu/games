// PLAYER_FILE: IronhaulForm02
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: IRON_FORM, dino, dojoUltBusy, ironForm, ironOn, ironUltBusyBase, xDatForm
// index.html:116194 · Phạm vi: global
// PLAYER_PART_BEGIN s22.dojoUltBusy.1 EDITABLE
dojoUltBusy=function(n){return !!(ironOn()&&n===dino&&n.ironhaul?.attack?.move.ultimate)||ironUltBusyBase(n);};
// PLAYER_PART_END s22.dojoUltBusy.1

// index.html:116195 · Phạm vi: global
// PLAYER_PART_BEGIN s22.IfStatement.1 EDITABLE
if(ironForm)xDatForm(IRON_FORM);
// PLAYER_PART_END s22.IfStatement.1
