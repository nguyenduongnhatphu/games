// PLAYER_FILE: Rune_shintrick
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: RUNES
// index.html:83758 · Phạm vi: global
// PLAYER_PART_BEGIN s6.RUNES.push.8 EDITABLE
RUNES.push({ id:'shintrick', name:'SHIN TRICKSTER', nameEn:'SHIN TRICKSTER', icon:'🎯', cost:2, ammoRune:true, onlyStance:1,
            desc:'Tốn 2 ô. ĐỘC QUYỀN TRICKSTER. Bắn thường KHÔNG giới hạn: không tốn đạn, không bao giờ quá nhiệt, và mở khoá đòn Charge ngay trong thế Trickster. '
                 +'LƯỚT thành 3 charge: giữ lại ít nhất một thì hồi rất nhanh, xài cạn cả ba thì khoá 2 giây. '
                 +'Lướt đâm vào kẻ địch = MUSTANG — đạp đầu bật lên, miễn sát thương lao vào, gây 2 dmg và trả lại một charge (nối được nhưng nảy thấp dần). '
                 +'Trên không giữ hướng là tự lướt; cú lướt đầu mỗi lần rời mặt đất miễn phí. Bấm nhảy khi đang bay là lướt VỌT LÊN, bấm xuống là lướt SÀ XUỐNG — cả hai đều miễn phí nhưng KHÔNG có miễn thương. CHIÊU CUỐI RIÊNG — QUICKSILVER: DỪNG THỜI GIAN 8 giây. Kẻ địch và mọi đòn của chúng gần như bất động, riêng bạn chạy bình thường với 6 charge lướt. Lướt xuyên địch = Mustang 4 dmg và để lại một VẾT CẮT KHÔNG GIAN (tối đa 8). Bắn thì đạn bay một đoạn rồi TREO LƠ LỬNG giữa không trung — tha hồ dựng thế. Hết giờ (hoặc bấm U lần nữa) Dino lao qua toàn bộ vết cắt, mỗi vết nổ thành nhát chém 5 dmg, rồi thời gian chạy lại và toàn bộ dao treo bay tới cùng một lúc. Từ 5 vết trở lên thành PERFECT QUICKSILVER: chém 6 dmg và hồi 1 máu.',
            descEn:'Costs 2 slots. TRICKSTER ONLY. Unlimited basic fire, no overheat, Charge unlocked in Trickster. Dash becomes 3 charges (fast regen if you keep one, 2s lockout if you spend all). Dashing into an enemy performs MUSTANG: kick off their head, ignore contact damage, deal 2 damage and refund a charge (chainable with diminishing height). In the air, holding a direction auto-dashes; the first air dash after leaving the ground is free. Press jump while airborne to rise-dash, hold down to dive-dash: both free, but no i-frames. Unique ultimate QUICKSILVER: TIME STOP for 8s — enemies and their attacks are near-frozen while you move freely with 6 dash charges. Bullets you fire travel briefly then hang in mid-air, all releasing at once when time resumes. Mustang deals 4 and always refunds while leaving a SPACE CUT. On expiry (or press U again) you streak through every cut, each bursting for 5 damage. Five or more cuts upgrades to PERFECT QUICKSILVER: 6 damage per cut and heal 1 HP.' });
// PLAYER_PART_END s6.RUNES.push.8
