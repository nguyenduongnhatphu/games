# Ironhaul — Form chơi được

Chọn **CUSTOMIZE → FORM → IRONHAUL** (sau Vergil). Form có 10 HP, dùng vật lý di chuyển, nhảy đôi, rơi vực và địa hình của Player. Robot cao 68 px; xe dài 86 px. Boss giữ kích thước và ba giai đoạn chiến đấu hiện có; tên hiển thị là **IRONHAUL**.

| Điều khiển | Gunblade | Silver Aegis | Truck |
| --- | --- | --- | --- |
| J | Combo ba nhát kiếm | Kiếm → xoay khiên → chém kết | Súng máy, có thể giữ |
| Cúi J | Chém hất | Húc khiên | Súng máy |
| Trên không J | Chém | Chém | Súng máy |
| Dash J | Lao chém | Khiên tiên phong → kiếm | Tông bằng Dash |
| K | Bắn ba viên | Phi khiên, tự thu hồi | Đại bác |
| Giữ K ≥ 0,75 giây rồi nhả | Ba quả pháo | Phi khiên | Ba quả pháo |
| Cúi K | Kiếm hai tay | Húc khiên | Đại bác |
| Dash K | Bắn | Xoay khiên → đâm | Đại bác |
| I | Nạp lõi | Nạp lõi | Đổi về robot để nạp |
| O | Kiếm hai tay | Khiên → kiếm | Trọng pháo |
| L | Đỡ, cửa Perfect 6 khung hình | Perfect nối phản kích có độ trễ | Đỡ |
| Q/E | Đổi giữa ba dạng, kể cả khi đang đánh; giữ HP, thanh U và đạn đã bắn | | |
| U | Aegis Breaker: tạm dùng giáp bạc, xoay khiên, chém và nổ lõi rồi về dạng trước | | |

Nạp lõi cần 1,2 giây; hiệu lực 8 giây, hồi 12 giây tính từ lúc bắt đầu. Kiếm được +1 sát thương, đâm kết có kiếm khí. Power, Rune và phụ kiện khóa trong Form và khôi phục khi chọn Form khác. Đòn kết đẩy/hất quái thường; không khóa cứng Boss. Chiêu cuối vẫn cho thế giới chạy và có thể bị ngắt sau thời gian miễn thương đầu chiêu.

## Phát triển tiếp

`index.html` vẫn là bản game độc lập. Module `IRONHAUL PLAYABLE` ở cuối HTML chứa bảng `IRON_PLAYER_MOVES` và controller `iron*`. Phần vẽ dùng trực tiếp **`ironhaulRig`, `ironhaulRobot`, `ironhaulTruck`, `ironhaulWeapons`, `ironhaulCoreFx` của Boss**, không nhân bản mesh hay các khớp. `ironGeometry` chuyển tọa độ của bộ khớp đã thu nhỏ sang thế giới để kiểm tra kiếm, khiên và đầu nòng thực tế.

Boss vẫn có AI riêng, không đọc phím người chơi. Khi nâng vẽ/khớp hoặc hình vũ khí chung, cả Boss lẫn Form đều nhận thay đổi. Khi thêm chiêu, cần thêm lịch ra đòn riêng cho bên chơi và bên Boss, rồi kiểm tra nhịp báo đòn và sát thương của từng bên. File Boss nhỏ cho AI vẫn là [bosses/IronhaulBoss.js](bosses/IronhaulBoss.js).
