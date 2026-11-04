# Đại Cổ Thụ — bản thử Platform

Mở `index.html`, chọn **CHƠI CHIẾN DỊCH → ĐẠI CỔ THỤ**. Chọn nhân vật ở Customize trước khi vào. Game vẫn chỉ cần một file HTML, không cần cài thêm gì.

Bản đồ rộng 12.000 px, từ độ cao -2.500 đến 650. Xuất phát ở giữa dưới gốc cây; đi trái vào đầm lầy, đi phải lên núi. Có 133 mảnh địa hình, đường lên tán cây, bậc núi, thang dây, cành đung đưa và các đường phụ cho nhân vật bám vách. Camera theo cả ngang lẫn dọc; địa hình không cuộn tự động.

- **A / D, ← / →:** di chuyển, quay mặt theo hướng đi.
- **Space:** nhảy; vẫn giữ các lần nhảy và kỹ năng riêng của nhân vật.
- **W / ↑:** giữ để bám và leo thang dây ở đoạn thấp của cây. Thả để đứng trên thang; **S / ↓** để leo xuống. **Space** nhảy khỏi thang, **A / D** buông thang. Phần tán cao cần nhảy qua cành.
- **Tab:** mở/đóng bản đồ. Có thể bấm bản đồ nhỏ bằng chuột/chạm.
- **H:** quay về điểm nghỉ gần nhất đã chạm. Không dùng trong chiêu cuối. Điểm nghỉ mới hồi 2 HP một lần trong lượt chơi.
- **J / K / L / Shift / U / Q / E:** giữ cách dùng của từng nhân vật.

Dino, X, Apex, Dante và Vergil đều có đường nhảy lên đỉnh núi và vương miện cây. Apex có thể tận dụng thân cây, vách đá và mép cành để bám, bật tường và leo tắt. Các bệ mỏng của bản đồ cho mọi nhân vật nhảy xuyên từ dưới lên; cột thân cây/vách núi vẫn là khối đặc.

Có ba loại địch mẫu: lính cận chiến, kẻ phục kích trong đầm và sinh vật bay quấy rối. Địch đánh có báo hiệu, không sinh vô hạn; vùng gốc cây đủ an toàn để làm quen di chuyển. Nội dung này là bản thử đường đi và giao chiến, chưa phải chiến dịch hoàn chỉnh.

Bốn sân boss đã đánh dấu trên bản đồ: Vòng Rễ Cổ, Lòng Đầm Lặng, Vương Miện Cây, Đỉnh Đá Gió. Hiện để trống; boss sẽ được tích hợp ở bước sau. Sáu điểm nghỉ chỉ lưu trong lượt chơi hiện tại. Khởi động lại sẽ về gốc cây.

## Chỉnh sửa và kiểm tra

Nguồn nằm trong `index.html`, tìm `ĐẠI CỔ THỤ: a static world`. `setupWilderness()` tạo địa hình/địch/điểm nghỉ; `drawWilderness()` vẽ cảnh; `wildernessTick()` và bộ nối Player xử lý tương tác. Các chỗ nối vào game nằm ở menu Campaign, `startGame`, `spawnEntities`, camera, va chạm cột và giới hạn đạn.

Sau khi sửa HTML, đồng bộ lại Boss snapshots theo `AGENTS.md`. Kiểm tra bằng trình duyệt:

```sh
DINO_TEST_URL=http://127.0.0.1:8009 python3 tests/wilderness_map.py
```

Bài kiểm tra dùng Chromium/Playwright; URL trỏ tới server phục vụ thư mục gốc repository. Bao gồm đường nhảy bằng input thật của năm nhóm nhân vật, bám vách Apex, thang dây, rơi/hồi vị trí, checkpoint, giao chiến trên cao, camera, đạn và việc rời bản đồ về Campaign thường.
