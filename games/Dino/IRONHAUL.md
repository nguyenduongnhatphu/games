# Ironhaul — Form chơi được

Chọn **CUSTOMIZE → FORM → IRONHAUL** (sau Vergil). Form có 10 HP; robot cao 68 px, xe dài 86 px. Tên Boss hiển thị là **IRONHAUL**.

**Q/E chỉ đổi robot thường và xe tải. Giáp trắng Silver Aegis là chiêu cuối**, cần đủ 100% thanh U. Nó tồn tại 12 giây, tăng sát thương mỗi hit thành **sát thương gốc × 1,5 + 1**, tăng tầm kiếm, bổ sung kiếm khí và các chiêu riêng. Không hồi HP hay sạc thanh U trong dạng này. Q/E không thoát hoặc làm mới thời gian giáp trắng.

| Thao tác | Robot Gunblade | Silver Aegis — chiêu cuối |
| --- | --- | --- |
| J ×5 | Chém xuống → chém lên → song trảm → đâm → đại trảm kết | Kiếm → khiên xoay → kiếm–khiên → Cross Requiem → Sovereign Array |
| Dash → J | Booster Rush: lao chém rồi đâm | Aegis Meteor Lance: húc khiên, đâm và chém hất |
| J → Dash | Recoil Slash: lùi bắn rồi chém | Aegis Orbit: lùi xoay khiên rồi đâm |
| J → Dash → J | Booster Pursuit: lao tới truy kích hai nhát | Nối Aegis Meteor Lance |
| Dash → K | Breach Cannon: hai phát xuyên | Twin Aegis Wheels: hai khiên năng lượng bay rồi quay về |
| K → Dash | Gun Vault: bật né và bắn | Aegis Reversal: nhảy xoay khiên, chém trả |
| K → Dash → K | Nối Breach Cannon | Nối Twin Aegis Wheels |
| J → Nhảy | Sky Ripper: ba nhát trên không | Aegis Ascension: ba nhát và kiếm khí |
| K → Nhảy | Aerial Barrage: giữ độ cao để bắn | Aegis Starfall: kiếm–khiên trên không, quạt kiếm khí |
| Cúi J | Chém hất | Húc khiên |
| Trên không J | Chém → song trảm | Chuỗi chém trên không được cường hóa |
| Trên không Cúi K | Meteor Cleaver: lao xuống, nổ khi chạm nền | Core Nova |
| K | Bắn ba viên | Phi khiên tự thu hồi |
| Giữ K ≥ 0,75 giây rồi nhả | Pháo tam liên | Phi khiên |
| Cúi K | Kiếm hai tay | Core Nova, hồi 6 giây |
| I | Nạp lõi: chuẩn bị 1,2 giây, kiếm +1 sát thương trong 8 giây, hồi 12 giây từ lúc bắt đầu | Core Nova |
| O | Kiếm hai tay, hai nhát nặng | Sovereign Array: khiên, đại kiếm và ba quạt kiếm khí |
| L | Đỡ; Perfect trong 6 khung hình | Perfect trong 8 khung hình, nối phản kích có độ trễ; hồi đỡ nhanh hơn |
| U | Đủ 100% → biến thành Silver Aegis trong 12 giây | Dồn thời gian còn lại vào Aegis Breaker rồi trở về dạng trước |

Các nhánh J/K → Dash cần dùng khi đòn đang diễn ra hoặc trong khoảng nối ngắn sau đòn. Trong Recoil/Gun Vault có thể bấm J/K sau nhịp đầu để nối truy kích. Có một ô đệm lệnh ở cuối đòn; chuỗi kiếm không tự lặp khi giữ J.

**Truck:** giữ J để bắn súng máy; K dùng đại bác, giữ K dùng pháo tam liên; Shift để tông. K → Dash thực hiện Mobile Broadside vừa lướt vừa bắn. Robot và xe giữ chung HP, thanh U, lõi và các viên đạn đã bắn. Khiên trắng vẫn quay về dù thời gian biến hình đã hết.

U lần hai là **Aegis Breaker — Final Discharge**: xoay khiên, hai nhát kiếm lớn rồi nổ lõi. Thời gian trắng còn lại quyết định sức mạnh toàn chuỗi; dùng sớm mạnh hơn. Hết 12 giây hoặc kết thúc đòn này sẽ trở về robot/xe trước lúc biến hình. Trúng đòn có thể ngắt đòn kết sau thời gian miễn thương đầu chiêu. Sát thương thông thường không hủy toàn bộ dạng trắng.

Nhân vật dùng vật lý di chuyển, nhảy đôi, địa hình và bật lên khi rơi vực của Player. Các đòn trên không chỉ giữ độ cao trong thời gian hữu hạn. Đòn kết đẩy/hất quái thường, không khóa cứng Boss. Power/Rune/phụ kiện bị khóa và khôi phục khi chọn Form khác.

## Phát triển tiếp

`index.html` vẫn là bản game độc lập. Module `IRONHAUL PLAYABLE` ở cuối HTML chứa bảng `IRON_PLAYER_MOVES` và controller `iron*`. Form dùng trực tiếp `ironhaulRig`, `ironhaulRobot`, `ironhaulTruck`, `ironhaulWeapons`, `ironhaulCoreFx` của Boss. `ironGeometry` chuyển tọa độ của bộ khớp đã thu nhỏ sang thế giới để kiểm tra kiếm, khiên và đầu nòng thực tế.

`followPose` lưu tư thế cuối đòn; `playerBlend` nối bốn khung hình đầu của mỗi nhát vào tư thế đó. Vệt kiếm và bóng lướt đều xuất phát từ vị trí vũ khí/khớp đã vẽ. `playerReach` làm dài/thu lưỡi kiếm liên tục thay vì bật về chiều dài mặc định. Giữ các trường hỗ trợ Player này khi chỉnh rig dùng chung. Boss vẫn có AI và lịch báo đòn riêng; file nhỏ cho AI là [bosses/IronhaulBoss.js](bosses/IronhaulBoss.js).
