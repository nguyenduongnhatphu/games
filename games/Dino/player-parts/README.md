# File người chơi để gửi cho AI khác

**[Chọn nhanh theo nhân vật / hệ thống](../PLAYER_FILES.md)** · **[Mục lục đầy đủ](CATALOG.md)** · **[Bảng Rune](RUNE_GUIDE.md)**

Game vẫn chạy độc lập bằng [index.html](../index.html). Thư mục này chứa các bản tách để sửa rồi ghép trở lại đúng vị trí gốc, kể cả phần nằm bên trong class Player, hàm Apex hoặc các bản ghi đè cuối file. Game không tải các file JS này trực tiếp.

## Cách dùng, không cần chạy lệnh

1. Chọn file từ mục lục, bấm **Download raw file** trên GitHub.
2. Gửi file cho AI kèm yêu cầu sửa. Nếu có nhiều phần `01/02…`, gửi các phần liên quan cùng lúc.
3. Yêu cầu AI trả lại toàn bộ file đã sửa và giữ nguyên marker.
4. Gửi các file đã sửa lại cuộc trò chuyện này để ghép, kiểm tra và đẩy lên nhánh riêng. Sau đó dùng bản HTML mới để chơi.

Tải các file cần sửa từ cùng một phiên bản game. Nếu game đã thay đổi từ lúc tải, cần đối chiếu bản sửa trước khi ghép.

## Chọn đúng phần

- `forms/`: cơ chế, di chuyển, đòn đánh, ngoại hình của từng form; Dante được chia theo vũ khí, Style và SDT.
- `ammo/`: hệ đăng ký đạn và từng loại vũ khí, gồm đòn thường, charge, channel, ultimate và các Rune vũ khí có trong phần đó. `CUSTOM` dùng chung lõi Phi Tiêu và Kiếm Vũ; `DualGuns` là Song Súng.
- `runes/`: 52 khai báo Rune, hệ chọn/lưu và các hiệu ứng. **Đổi mô tả không tự đổi tác dụng**: xem [bảng Rune](RUNE_GUIDE.md) để lấy thêm file thực thi. Liên kết về HTML là điểm dùng chưa có file người chơi riêng, thường thuộc engine/Boss.
- `core/`: Player, sát thương, hiệu ứng/đạn cơ bản, bàn phím, vòng lặp và tích hợp menu.
- `powers/`: Power và phụ kiện.

Đây là các phần của cùng engine, không phải module độc lập. Dòng `Tham chiếu ngoài` cho biết một số tên đến từ phần khác. Bộ vẽ X và Ironhaul còn dùng chung với Boss: gửi thêm [MegaManXBoss.js](../bosses/MegaManXBoss.js) hoặc [IronhaulBoss.js](../bosses/IronhaulBoss.js) nếu cần chỉnh bộ vẽ; với helper dùng chung xem [hướng dẫn Boss](../bosses/README.md).

## Mẫu yêu cầu gửi AI

```text
Đây là bản tách của game Dino, không chạy độc lập.
Hãy sửa: [mô tả yêu cầu].

Chỉ sửa code giữa PLAYER_PART_BEGIN ... EDITABLE và PLAYER_PART_END.
Giữ nguyên PLAYER_FILE, PLAYER_SNAPSHOT, marker, tên API và mã ngoài marker.
Các class/hàm/const __Part chỉ là khung cú pháp mô tả phạm vi gốc:
không xóa, đổi tên hay coi chúng là code cần ghép vào game.
Giữ cơ chế tích hợp với engine và các bản ghi đè phía sau.
Nếu thêm helper, đặt bên trong vùng EDITABLE đúng phạm vi của helper.
Đừng đổi tên form, id Rune, slot đạn hoặc bỏ hàm công khai.
Nếu thiếu ngữ cảnh, chỉ rõ tên hàm/file cần thêm.
Trả lại toàn bộ file JS đã sửa, không chỉ đoạn ví dụ.
```

Các khung `__Part` bao quanh phương thức, thuộc tính object, biểu thức hoặc đoạn nằm trong hàm gốc. Công cụ chỉ ghép phần nằm giữa marker về vị trí gốc. Không chép toàn bộ file tách hoặc khung `__Part` vào HTML, không thêm thẻ `script src`.

## Dành cho người ghép code

Bạn tải và gửi file là đủ; các lệnh dưới đây dành cho AI/lập trình viên. Chạy từ thư mục repository, dùng cùng bộ dependency với công cụ Boss:

```bash
npm ci --prefix tools/boss-parts
node tools/player-parts/index.cjs check
node tools/player-parts/index.cjs apply IronhaulForm
node tools/player-parts/index.cjs apply "/đường/dẫn/VergilForm01 - AI.js" "/đường/dẫn/VergilForm02 - AI.js"
```

Sửa nhiều file hoặc cả người chơi lẫn Boss từ cùng snapshot thì ghép một lượt:

```bash
node tools/player-parts/index.cjs apply Rune_hp PlayerMovement
node tools/player-parts/index.cjs apply IronhaulForm IronhaulBoss
```

Lệnh `apply` kiểm tra bản nguồn, marker, khung phạm vi, cú pháp, API/id còn tồn tại và các file khác đang sửa trước khi ghi. Nó từ chối vùng chồng nhau có xung đột, các sửa đổi Boss `READ_ONLY` và snapshot cũ. Cả bộ người chơi lẫn bộ Boss được cập nhật sau khi ghép. Lệnh Boss cũ cũng cập nhật bộ người chơi và từ chối ghi đè các sửa đổi đang chờ.

Sau khi sửa trực tiếp HTML, xuất lại cả hai bộ:

```bash
node tools/player-parts/index.cjs export
node tools/boss-parts/index.cjs export
node tools/player-parts/index.cjs check
node tools/boss-parts/index.cjs check
```

`export` giữ nguyên từng byte HTML, từ chối ghi đè file JS có sửa đổi chưa ghép. Không sửa manifest bằng tay để bỏ qua kiểm tra. Kiểm tra công cụ trong bản sao tạm bằng `python3 tests/player_parts.py` và `python3 tests/boss_parts.py`; các bài này phải giữ nguyên HTML đang phát hành. Kiểm tra cú pháp/nguồn không chứng minh được hành vi chiến đấu: vẫn chạy các bài gameplay phù hợp sau mỗi thay đổi thực tế.
