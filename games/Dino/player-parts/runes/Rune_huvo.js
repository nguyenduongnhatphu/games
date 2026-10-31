// PLAYER_FILE: Rune_huvo
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: RUNES
// index.html:83764 · Phạm vi: global
// PLAYER_PART_BEGIN s6.RUNES.push.10 EDITABLE
RUNES.push({ id:'huvo', name:'HƯ VÔ BỘ PHÁP', nameEn:'VOID STEP', icon:'🌀', cost:1, onlyPower:1,
              desc:'Tốn 1 ô. CẦN POWER VOID. Mỗi cú DỊCH CHUYỂN bằng lướt nổ một vòng sát thương quanh người, bán kính 1cm.\n\nMỗi lần lướt cộng thêm 1 sát thương, trần 10. Nhưng lướt TRƯỢT — không chạm ai — thì chỉ cộng tới 3 rồi dừng. Chỉ lướt TRÚNG người mới leo tiếp được lên 10.\n\nKHÔNG lướt trúng ai trong 6 giây thì số tụt về mốc 3. Thêm 6 giây nữa vẫn không trúng thì tắt hẳn về 0. Giữ được con số hay không là ở chỗ có dám bám sát hay không.\n\nBán kính nở thêm 1mm mỗi lần lướt, tối đa gấp đôi (2cm).\n\nVoid vốn không có khung miễn thương: dịch chuyển là công cụ định vị chứ không phải nút thoát hiểm. Rune này lấy đúng chỗ khó đó làm giá — muốn con số leo lên thì phải lao thẳng vào mặt kẻ địch, không được chớp ra xa. Nhảy vẫn chỉ là di chuyển, không tính.',
              descEn:'Costs 1 slot. NEEDS POWER VOID. Every dash TELEPORT detonates a damage ring around you with a 1cm radius.\n\nEach dash adds 1 damage, capped at 10. But a dash that MISSES — touching nobody — only climbs to 3 and stops there; only dashes that LAND carry you past that toward 10.\n\nGo 6 seconds without landing a dash and the number falls back to 3. Another 6 seconds without one and it switches off entirely. Keeping the number is a matter of staying in their face.\n\nThe radius widens by 1mm per dash, up to double (2cm).\n\nVoid has no invulnerability frames: the teleport is a positioning tool, not an escape button. This rune charges you exactly that price — to make the number climb you must dive straight into the enemy instead of blinking away. Jumping is still just movement and does not count.' });
// PLAYER_PART_END s6.RUNES.push.10
