# File Boss để gửi cho AI khác

**Game vẫn chạy bằng một file duy nhất: [index.html](../index.html).** Những file JS ở đây là các bản tách để đọc, sửa rồi ghép trở lại; game không tải chúng trực tiếp.

## Cách dùng — không cần chạy lệnh

1. Mở [danh sách đầy đủ](CATALOG.md), chọn Boss muốn sửa.
2. Trên trang file JS của GitHub, chọn **Download raw file**, rồi gửi file đó cho Gemini hoặc AI bạn dùng.
3. Nhờ AI trả lại **toàn bộ file JS đã sửa**, giữ nguyên các marker.
4. Gửi file đã sửa về cuộc trò chuyện này, nói “Ghép lại Boss này”. Tôi sẽ ghép đúng các phần vào HTML gốc, kiểm tra rồi đẩy lên nhánh riêng.

**Chỉ sửa file JS chưa làm game thay đổi.** Sau khi ghép, tải bản `index.html` mới để chơi như trước.

Một số file hay dùng:

- [Dante](DanteBoss.js)
- [Vergil](VergilBoss.js)
- [Artorias](ArtoriasBoss.js)
- [Thalassa](ThalassaBoss.js)
- [T-Rex](TRexBoss.js) và [Tyrant Rex](TyrantRexBoss.js)
- [Godzilla](GodzillaBoss.js)
- [Toàn bộ Boss](CATALOG.md)

## Trong mỗi file có gì?

File chứa class gốc, các hàm/bảng chiêu liên quan và các phần `Object.assign` / `prototype` ghi đè đang hoạt động, kể cả các phần nằm xa cuối HTML. Các đoạn giữ thứ tự nguồn để thấy phần nào thay thế phần nào. Mỗi đoạn có dòng chỉ vị trí trong HTML.

- **EDITABLE:** phần riêng của Boss, AI được sửa ở giữa hai marker.
- **READ_ONLY:** ngữ cảnh dùng chung với Boss khác hoặc nhân vật người chơi; đã đưa vào để AI hiểu code mà không cần đọc HTML lớn.
- Nếu cần sửa một helper dùng chung, tải thêm [BossShared.js](shared/BossShared.js). Helper này có thể ảnh hưởng nhiều Boss hoặc Form; hãy nói rõ những đối tượng muốn thay đổi. Một số ngữ cảnh người chơi chỉ để tham khảo, không có bản sửa trong `BossShared.js`.

Ví dụ phần thân vẽ T-Rex được dùng chung với Tyrant Rex, còn một số bảng đòn của Dante/Vergil được dùng chung với Form người chơi. Không sao chép các bản READ_ONLY vào game một lần nữa.

Không thêm `<script src="bosses/...">` vào HTML, không chạy riêng các file này, không đổi tên class hoặc bỏ các bản ghi đè phía sau. Chúng phụ thuộc vào engine có sẵn trong game.

## Mẫu yêu cầu gửi AI

```text
Đây là phần Boss trích từ game Dino, không phải chương trình chạy độc lập.
Hãy thực hiện thay đổi sau: [mô tả thay đổi].

Chỉ sửa trong các vùng EDITABLE, giữ các dòng BOSS_FILE, BOSS_SNAPSHOT,
BOSS_PART_BEGIN và BOSS_PART_END. Không sửa READ_ONLY.
Nếu thêm helper, đặt bên trong một vùng EDITABLE.
Giữ tên class, chữ ký các hàm công khai và cơ chế tích hợp với engine.
Đọc cả các prototype override phía sau, vì chúng có thể ghi đè class gốc.
Trả lại toàn bộ file JS đã sửa, không chỉ một đoạn minh họa.
Nếu cần sửa phần READ_ONLY, chỉ rõ tên helper và xin thêm file dùng chung.
```

## Ngữ cảnh engine

Các biến/hàm không khai báo trong file vẫn đến từ HTML gốc. Dòng `Global / tham chiếu ngoài file` liệt kê chúng. Một số API thường gặp:

| API | Vai trò |
|---|---|
| `frames` | Đồng hồ game, 60 bước/giây khi không tạm dừng |
| `canvas`, `ctx` | Kích thước màn hình và Canvas 2D để vẽ |
| `dino` | Người chơi hiện tại; có `x/y/w/h/hp`, khiên và nhận sát thương |
| `bosses`, `enemies`, `bossProjectiles`, `visualEffects` | Các danh sách đối tượng đang hoạt động |
| `BossProjectile`, `Effect`, `FloatingText` | Đạn, hiệu ứng và chữ nổi của engine |
| `checkAABB(a,b)` | Kiểm tra hai hộp va chạm |
| `worldL()`, `worldR()`, `dkNenY()` | Giới hạn thế giới và độ cao nền |
| `SFX`, `parry()` | Âm thanh và xử lý đỡ hoàn hảo |
| `ctx.save()` / `ctx.restore()` | Cân bằng trạng thái Canvas; không để hiệu ứng vẽ lan sang đối tượng khác |

Không thay các API này bằng mock trong bản gửi về. Các tham chiếu tới Boss khác trong ngữ cảnh READ_ONLY không có nghĩa là phải gửi mọi Boss cho AI.

## Công cụ cho người ghép code

Phần này dành cho AI/lập trình viên ghép lại, **bạn không cần chạy**.

Từ thư mục repository:

```bash
npm ci --prefix tools/boss-parts
node tools/boss-parts/index.cjs check
node tools/boss-parts/index.cjs apply DanteBoss
```

Có thể ghép file AI gửi về với tên bất kỳ, miễn giữ header/marker:

```bash
node tools/boss-parts/index.cjs apply "/đường/dẫn/DanteBoss - Gemini.js"
```

Nếu sửa cả Boss và phần dùng chung, ghép cùng lúc:

```bash
node tools/boss-parts/index.cjs apply DanteBoss BossShared
```

Công cụ kiểm tra cú pháp, bản nguồn, vùng chỉ đọc và những file khác đang sửa trước khi ghi; thay đúng các đoạn ở vị trí gốc, rồi cập nhật lại các file tách. Nó không tự chạy hoặc chứng minh được cân bằng/cơ chế game: vẫn cần kiểm tra Boss bằng các bài test phù hợp và chơi thử.

Sau một thay đổi trực tiếp vào HTML, làm mới các bản tách trước khi gửi AI lần sau:

```bash
node tools/boss-parts/index.cjs export
node tools/boss-parts/index.cjs check
```

`export` không sửa HTML và sẽ từ chối ghi đè file tách đang có sửa đổi chưa ghép. File AI trả về từ một snapshot cũ cần được đối chiếu trước khi ghép để giữ các sửa đổi mới hơn. Không sửa `manifest.json` bằng tay.
