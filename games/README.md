# 🎮 Hans Games — trang web đăng game HTML

Trang web tĩnh 100%, không cần backend, không cần database. Chỉ có HTML/CSS/JS thuần nên chạy thẳng trên GitHub Pages miễn phí.

```
my-games/
├── index.html      ← trang chủ: lưới game, tìm kiếm, lọc, dark mode
├── play.html       ← trang chơi game (mỗi game 1 link riêng)
├── style.css       ← toàn bộ giao diện
├── games.json      ← ★ FILE DUY NHẤT BẠN CẦN SỬA khi thêm game
├── .nojekyll       ← bắt buộc cho GitHub Pages
└── games/
    └── catch-the-box/
        └── index.html   ← game demo (chơi thử được ngay)
```

---

## Phần 1 — Đưa lên mạng (GitHub Pages)

Làm 1 lần duy nhất, khoảng 5 phút.

1. Vào [github.com/new](https://github.com/new), tạo repo tên **`my-games`**, để **Public**, không tick thêm gì.
2. Ở màn hình tiếp theo bấm **uploading an existing file**.
3. Kéo **toàn bộ nội dung bên trong** thư mục `my-games` (file `index.html`, `play.html`, `style.css`, `games.json`, `.nojekyll` và thư mục `games/`) thả vào trang → bấm **Commit changes**.

   > ⚠️ Kéo *nội dung bên trong*, đừng kéo cả thư mục `my-games` vào — nếu không link sẽ thành `.../my-games/my-games/`.

4. Vào tab **Settings → Pages**. Mục *Source* chọn **Deploy from a branch**, Branch chọn **main** + thư mục **/ (root)** → **Save**.
5. Chờ 1–2 phút, web sẽ chạy tại:

   ```
   https://<tên-github-của-bạn>.github.io/my-games/
   ```

Từ lần sau, mỗi khi bạn upload/sửa file trên repo, web tự cập nhật sau ~1 phút.

**Nếu bạn quen dùng Git:**

```bash
cd my-games
git init && git add . && git commit -m "init"
git branch -M main
git remote add origin https://github.com/<username>/my-games.git
git push -u origin main
```

---

## Phần 2 — Thêm một game HTML mới

Đây là phần bạn làm thường xuyên. Chỉ 3 bước.

### Bước 1 — Bỏ game vào thư mục `games/`

Tạo một thư mục con, đặt tên **không dấu, không khoảng trắng**, và **file chính phải tên `index.html`**:

```
games/
└── ten-game-cua-ban/
    └── index.html
```

- **Game của bạn chỉ có 1 file HTML duy nhất?** → Hoàn hảo, đổi tên nó thành `index.html` và bỏ vào thư mục đó.
- **Game có nhiều file** (`style.css`, `game.js`, `sprite.png`, âm thanh…)? → Bỏ hết vào cùng thư mục đó, giữ nguyên cấu trúc. Game của bạn tham chiếu file bằng **đường dẫn tương đối** (`<script src="game.js">`, `<img src="sprite.png">`) nên sẽ chạy y hệt như khi mở offline.
- **Game export từ Unity / Godot / Construct / GDevelop?** → Bỏ nguyên folder build (đã có sẵn `index.html`) vào là được.

### Bước 2 — Thêm một khối vào `games.json`

Mở `games.json`, thêm một object mới vào mảng `games`. Nhớ **dấu phẩy `,`** ngăn cách giữa các game:

```json
{
  "id": "ten-game-cua-ban",
  "title": "Tên Game Của Bạn",
  "description": "Mô tả ngắn 1–2 câu, hiện ở thẻ game.",
  "category": "Arcade",
  "tags": ["puzzle", "2 người chơi"],
  "path": "games/ten-game-cua-ban/index.html",
  "thumbnail": "",
  "emoji": "🚀",
  "color": "#ff5c8a",
  "controls": "WASD để di chuyển, Space để bắn",
  "date": "2026-07-27"
}
```

| Trường | Bắt buộc | Ý nghĩa |
|---|---|---|
| `id` | ✅ | Định danh duy nhất, cũng là link chia sẻ: `play.html?id=ten-game-cua-ban` |
| `title` | ✅ | Tên hiển thị |
| `path` | ✅ | Đường dẫn tới file HTML của game |
| `description` | | Mô tả ngắn |
| `category` | | Tự động sinh nút lọc ở trang chủ |
| `tags` | | Dùng cho ô tìm kiếm, hiện 3 tag đầu trên thẻ |
| `thumbnail` | | Ảnh bìa, ví dụ `games/ten-game/cover.png`. Để trống `""` thì dùng emoji + màu |
| `emoji` / `color` | | Ảnh bìa dự phòng khi không có `thumbnail` |
| `controls` | | Hướng dẫn phím, hiện dưới khung game |

### Bước 3 — Upload lại lên GitHub

Kéo thư mục game mới + file `games.json` đã sửa lên repo (hoặc `git push`). Xong.

> 💡 **Mẹo:** nếu game mới không hiện ra, gần như chắc chắn là `games.json` sai cú pháp — thường là thiếu hoặc thừa dấu phẩy. Dán nội dung file vào [jsonlint.com](https://jsonlint.com) để kiểm tra trong 5 giây.

---

## Phần 3 — Chia sẻ

Mỗi game có link riêng, gửi thẳng cho bạn bè là chơi được ngay, không cần cài gì:

```
https://<username>.github.io/my-games/play.html?id=catch-the-box
```

Nút **🔗 Chia sẻ** trên trang chơi sẽ tự copy link vào clipboard (trên điện thoại thì mở luôn menu chia sẻ của hệ điều hành).

**Ảnh preview khi share lên Facebook/Zalo/Discord:** thêm một file ảnh tên `og-image.png` (kích thước 1200×630) vào thư mục gốc — mọi link chia sẻ sẽ dùng ảnh đó. Vì trang web là tĩnh, tất cả game dùng chung một ảnh preview; muốn mỗi game có ảnh riêng thì cần build script sinh từng trang, nói mình nếu bạn cần.

---

## Chạy thử ở máy trước khi upload

Đừng mở `index.html` bằng cách double-click — trình duyệt chặn `fetch()` trên giao thức `file://` nên `games.json` sẽ không đọc được. Hãy chạy một local server:

```bash
cd my-games
python -m http.server 8000
```

Rồi mở http://localhost:8000 . (Có Node thì dùng `npx serve` cũng được.)

---

## Câu hỏi thường gặp

**Game bàn phím không ăn phím?** → Bấm chuột một cái vào khung game để nó nhận focus. Trang đã tự xử lý việc này khi click.

**Game bị cắt / méo?** → Khung game có tỉ lệ 16:10. Trong CSS, sửa `.stage { aspect-ratio: 16/10 }` sang tỉ lệ game của bạn (ví dụ `3/4` cho game dọc), hoặc dùng nút toàn màn hình.

**Muốn đổi tên trang, màu chủ đạo?** → Tên/slogan sửa trong `games.json` phần `"site"`. Màu sửa biến `--accent` ở đầu `style.css`.

**Dùng domain riêng?** → Settings → Pages → Custom domain, rồi trỏ CNAME ở nhà cung cấp domain.

**Game nặng vài trăm MB?** → GitHub Pages giới hạn repo 1GB và mỗi file 100MB. Game HTML thường rất nhẹ nên hiếm khi chạm giới hạn.
