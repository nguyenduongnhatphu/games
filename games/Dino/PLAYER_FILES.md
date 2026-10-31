# File Form, Rune và đạn của người chơi

Mở các liên kết dưới đây, chọn file JS rồi bấm **Download raw file** trên GitHub. Bạn có thể gửi file cho AI khác chỉnh sửa, rồi gửi bản đã sửa lại đây để ghép vào game.

Game vẫn chạy bằng một file [index.html](index.html). Các file nhỏ này là bản tách để đọc và sửa; thay riêng chúng chưa làm game thay đổi.

| Bạn muốn sửa | File cần lấy |
| --- | --- |
| Ironhaul | [IronhaulForm01.js](player-parts/forms/IronhaulForm01.js) và [IronhaulForm02.js](player-parts/forms/IronhaulForm02.js) |
| Dante: bộ điều khiển chung | [DanteForm.js](player-parts/forms/DanteForm.js) |
| Dante: Devil Sword Dante | [DanteDSD.js](player-parts/forms/DanteDSD.js) |
| Dante: Balrog / Cavaliere / King Cerberus | [Balrog](player-parts/forms/DanteBalrog.js) · [Cavaliere](player-parts/forms/DanteCavaliere.js) · [King Cerberus](player-parts/forms/DanteKingCerberus.js) |
| Dante: Ebony & Ivory / Faust | [Ebony & Ivory](player-parts/forms/DanteEbonyIvory.js) · [Faust](player-parts/forms/DanteFaust.js) |
| Dante: Style / SDT / ngoại hình | [Styles](player-parts/forms/DanteStyles.js) · [SDT](player-parts/forms/DanteSDT.js) · [Render](player-parts/forms/DanteRender.js) |
| Vergil | [VergilForm01.js](player-parts/forms/VergilForm01.js) và [VergilForm02.js](player-parts/forms/VergilForm02.js) |
| Apex / Obelith | [Core](player-parts/forms/ApexCore.js) · [Combat](player-parts/forms/ApexCombat.js) · [Ultimate](player-parts/forms/ApexUltimates.js) · [Obelith](player-parts/forms/ApexObelith.js); các phần di chuyển, ngoại hình và tích hợp có trong mục lục |
| X | [XForm.js](player-parts/forms/XForm.js) |
| Các form Dino cơ bản | [DinoForms.js](player-parts/forms/DinoForms.js) · [DinoRender.js](player-parts/forms/DinoRender.js) |
| Rune | [Bảng 52 Rune và file chứa tác dụng của từng Rune](player-parts/RUNE_GUIDE.md) |
| Đạn / vũ khí thường | [Mục lục đạn](player-parts/CATALOG.md#đạn--vũ-khí) |
| Di chuyển, phòng thủ, sát thương, phím điều khiển | [Mục lục Player](player-parts/CATALOG.md#player--tích-hợp) |
| Power / phụ kiện | [Mục lục Power](player-parts/CATALOG.md#power--phụ-kiện) |

**[Toàn bộ 146 file nhỏ](player-parts/CATALOG.md)** · **[Hướng dẫn gửi AI](player-parts/README.md)** · **[File Boss](bosses/CATALOG.md)**

Các file có số `01`, `02`… là nhiều phần của cùng hệ. Khi sửa xuyên nhiều phần, gửi đủ các phần liên quan. Với Rune, file `Rune_*.js` chứa khai báo; bảng Rune chỉ thêm nơi xử lý tác dụng thực tế. Nếu chỉnh ngoại hình X hoặc Ironhaul, có thể cần thêm file Boss tương ứng vì dùng chung bộ vẽ.
