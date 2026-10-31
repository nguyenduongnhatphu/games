// PLAYER_FILE: Rune_voltdash
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: RUNES
// index.html:83754 · Phạm vi: global
// PLAYER_PART_BEGIN s6.RUNES.push.7 EDITABLE
RUNES.push({ id:'voltdash', name:'LƯỚT SÉT', nameEn:'LIGHTNING DASH', icon:'⚡', cost:1,
            desc:'Tốn 1 ô. MỌI loại đạn: cú lướt đi xa hơn hẳn (36 thay vì 22) và gây 3 sát thương cho kẻ địch bạn lướt xuyên qua. CẦM VOLT thì lướt còn phóng thêm một TIA SÉT từ sau lưng ra trước, xuyên mọi mục tiêu, 3 sát thương nữa. Ghép SIÊU TỐC thì cả hai lên 5. Trong Lightning Form của Volt cả hai lên 6. Với MIDAS, cả J Dash lẫn Dash J đều bắn thêm một chưởng sét giống Volt. Với MJÖLNIR thì nó mở hàng sấm 7cm: hai combo Dash+J và J→Dash giáng 10 cột sét trước mặt, mỗi cột 1 sát thương kèm choáng — rune không tăng tốc hay tầm lướt của Búa, nó là hiệu ứng sạc búa trước cú đập.\n\nVỚI VŨ KHÍ CẬN CHIẾN: rune không sinh thêm tia sét rời nào. Nó chỉ làm hai việc — cộng sát thương, và nhuộm chính nhát chém sang tông điện khiến nhát đó nở to ra 28%. KIẾM — cả hai nhát của chuỗi Lướt Chém đều +2, lưỡi kiếm khí của nhát hai bay 340 thay vì 260. GIÁO — Lướt Đâm và nhát bồi đều +2 và sâu thêm 28%, có một tia chạy dọc thân giáo; Mũi Tên Khí bay lâu hơn, rộng hơn, +2. BÚA — vốn đã có sấm sét, không đụng vào.',
            descEn:'Costs 1 slot. EVERY ammo: the dash travels much farther (36 vs 22) and deals 3 damage to enemies you pass through. WITH VOLT it also fires a piercing BOLT from behind you for another 3. Paired with HYPER SPEED both go to 5; inside Volt Lightning Form both go to 6. With MJOLNIR it unlocks the 7cm thunder row: the Dash+J and J-then-Dash combos drop 10 pillars of lightning in front of you for 1 damage and a stun each — the rune does not change the hammer dash speed or range, it is the charge effect on the hammer before the slam.',
            goiY:'hyperspeed' });
// PLAYER_PART_END s6.RUNES.push.7
