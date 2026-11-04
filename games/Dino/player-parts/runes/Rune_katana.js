// PLAYER_FILE: Rune_katana
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: RUNES
// index.html:83722 · Phạm vi: global
// PLAYER_PART_BEGIN s6.RUNES.push.2 EDITABLE
RUNES.push({ id:'katana', name:'KATANA',           nameEn:'KATANA',               icon:'🗡', cost:2, ammoRune:true, onlyAmmo:5,
              desc:'Tốn 2 ô. CHỈ dùng được với DINOSWORD. Thay trọn bộ đòn của Kiếm.\n\nJ TRỞ THÀNH PHÍM CHARGE — Battousai. Giữ 0.25→1.25 giây: một nhát chém đơn, ngang, rất nhanh; chạm J là 3 sát thương; giữ thì càng lâu tầm càng dài thêm 1cm (120→158px) và sát thương lên 4→6. Giữ 1.25→1.75 giây: chém một nhát ngang rồi thu kiếm, sau đó vô vàn nhát chém nổ quanh người. Từ 2 giây trở đi charge dừng lại ở đó — thả ra là VOID SLASH: một nhát ngang khiến kẻ địch gần như bất động 2 giây, đủ để bạn chém thoải mái.\n\nDASH + J = RAPID SLASH, chém liên tục dọc đường lướt. DASH + J + J = chém hất tung; cả bạn lẫn kẻ địch rơi chậm lại 2 giây, riêng kẻ địch bị khống chế — đủ thời gian một chuỗi trên không.\n\nCÚI + J = Judgement Cut nhỏ, 2 sát thương, spam thoải mái.\n\nNĂM MỐC PHÍM K: Stinger (lướt ngắn rồi đâm) · Drive (hai vầng trăng xanh) · Round Trip (ném kiếm xoay tại chỗ địch, 1 sát thương mỗi nửa giây, tổng 10) · Deep Stinger (xoáy như mũi khoan đâm xuyên, lái được, 3 giây) · Judgement Cut End (lướt tới, cắt cả một vùng rộng, 10 sát thương, miễn thương suốt đòn).\n\nCHANNEL: kiếm triệu ra tự xoay quanh người, tối đa 5 cây, mỗi cây chạm địch 1 sát thương; thả phím thì cả bầy phóng vào mục tiêu gần nhất.\n\nCHIÊU CUỐI BỊ KHOÁ cho tới khi đạt hạng Style S.',
              descEn:'Costs 2 slots. DINOSWORD only. J becomes a charge key (Battousai); K gets Vergil\'s five tiers; Channel orbits summoned swords; Ultimate locked until rank S' },
            { id:'revivex',  name:'HỒI SINH • C2',    nameEn:'REVIVE • C2',          icon:'✝',  cost:2, desc:'Tốn 2 ô. Chết → hồi ĐẦY máu + nổ 20 dmg toàn màn, đập VỠ màn đen thành mảnh', descEn:'Costs 2 slots. Die → FULL heal + 20 dmg screen-wide blast, SHATTER the black screen' });
// PLAYER_PART_END s6.RUNES.push.2
