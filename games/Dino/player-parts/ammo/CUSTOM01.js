// PLAYER_FILE: CUSTOM01
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CW_BINH, KV_DAN, PT_DAN, canvas, currentAmmoType, currentLang, cusAcBat, cusCgBat, cusChTim, cusCwBat, cusKvBat, cusMauMax, cusPtBat, cusQdBat, cusRgBat, hasRune
// index.html:63159 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_BANG.1 EDITABLE
const CUS_BANG     = 6;
// PLAYER_PART_END s4.CUS_BANG.1

// index.html:63160 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TOC.1 EDITABLE
const CUS_TOC      = 6;
// PLAYER_PART_END s4.CUS_TOC.1

// index.html:63161 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_NONG.1 EDITABLE
const CUS_NONG     = 90;
// PLAYER_PART_END s4.CUS_NONG.1

// index.html:63162 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KHO_TRAN.1 EDITABLE
const CUS_KHO_TRAN = 24;
// PLAYER_PART_END s4.CUS_KHO_TRAN.1

// index.html:63163 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KHO_NAP.1 EDITABLE
const CUS_KHO_NAP  = 8;
// PLAYER_PART_END s4.CUS_KHO_NAP.1

// index.html:63164 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_XA_TOC.1 EDITABLE
const CUS_XA_TOC   = 9;
// PLAYER_PART_END s4.CUS_XA_TOC.1

// index.html:63165 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TOCDO.1 EDITABLE
const CUS_TOCDO    = 15;
// PLAYER_PART_END s4.CUS_TOCDO.1

// index.html:63166 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_VIEN_W.1 EDITABLE
const CUS_VIEN_W   = 24, CUS_VIEN_H = 10;
// PLAYER_PART_END s4.CUS_VIEN_W.1

// index.html:63182 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_NC.1 EDITABLE
const CUS_NC = [
            { id:'bangdan', loai:'nl', xong:true,  ten:'BĂNG ĐẠN', tenEn:'MAGAZINE',
              mo:['Băng đạn 9 viên. Kho trữ 27. Xả kho 13 viên/giây.',
                  'Băng đạn 12 viên. Kho trữ 30. Xả kho 15 viên/giây.',
                  'Băng đạn 15 viên. Kho trữ 33. Xả kho 17 viên/giây.'],
              moEn:['9-round magazine. Bank holds 27. Dumps at 13 rounds/sec.',
                    '12-round magazine. Bank holds 30. Dumps at 15 rounds/sec.',
                    '15-round magazine. Bank holds 33. Dumps at 17 rounds/sec.'],
              tom:'KHÔNG đổi tốc bắn, chỉ bắn được lâu hơn. Bán kiểm soát, không bán sát thương.',
              tomEn:'Does NOT change fire rate — you just shoot longer. It sells control, not damage.' },
            { id:'tachtia', loai:'nl', xong:true , ten:'TÁCH TIA', tenEn:'SPLIT SHOT',
              mo:['2 viên, bỏ viên giữa.','3 viên kiểu Prism.','Mục tiêu phía trước gần hơn 1/3 map thì cả 3 viên chụm thành một phát to, sát thương x3.'],
              moEn:['2 rounds, no middle one.','3 rounds, Prism style.','A target ahead within 1/3 of the map makes all 3 converge into one big shot, x3 damage.'],
              tom:'Ép bạn dí sát mặt. Tản rất rộng nên bắn xa là trượt sạch.',
              tomEn:'Forces you up close. The spread is so wide that distance means missing entirely.' },
            { id:'tamxa',   loai:'nl', xong:true , ten:'TẦM XA', tenEn:'LONG SHOT',
              mo:['Xuyên mục tiêu. Bay càng xa viên đạn càng to và càng đau, trần 2.',
                  'Trần 3 — ở tầm tối đa viên đạn to gần gấp đôi.',
                  'Dốc gấp đôi — chạm trần ở nửa quãng đường.'],
              moEn:['Pierces. The farther it flies the bigger and harder it hits, capped at 2.',
                    'Capped at 3 — at full range the round is nearly double size.',
                    'Twice the ramp — hits the cap in half the distance.'],
              tom:'Cực đối nghịch của TÁCH TIA: ép bạn đứng xa. Đạn lớn dần theo quãng đường.',
              tomEn:'The opposite of SPLIT SHOT: it forces distance. The round grows as it travels.' },
            { id:'laser',   loai:'nl', xong:true , ten:'LASER', tenEn:'LASER',
              mo:['Giữ J tụ 1 giây rồi xả MỘT tia quét xuyên bản đồ, 8 sát thương. Hồi chiêu 1 giây.',
                  '10 sát thương.', '12 sát thương.'],
              moEn:['Hold J to focus for 1 second, then release ONE beam across the map for 8 damage. 1 second cooldown.',
                    '10 damage.', '12 damage.'],
              tom:'Đổi cả nhịp bắn lấy một cú. Băng đạn 1, không nóng. Hụt là mất 2 giây.',
              tomEn:'Trades the whole rhythm for one shot. Magazine 1, no overheat. A miss costs 2 seconds.' },
            { id:'toa',     loai:'nl', xong:true , ten:'TỎA', tenEn:'BURST',
              mo:['Đạn xuyên 1 kẻ địch, bay tiếp 3cm rồi mới toả 6 viên ra xung quanh.',
                  'Xuyên 5 kẻ địch — nhưng chỉ bay tiếp 2.5cm.',
                  'Xuyên không giới hạn — chỉ bay tiếp 2cm.'],
              moEn:['The round pierces 1 enemy, flies 3cm further, and only then sprays 6 rounds outward.',
                    'Pierces 5 enemies — but only flies 2.5cm further.',
                    'Pierces without limit — only 2cm further.'],
              tom:'Chùm nổ rơi PHÍA SAU con vừa xuyên — nhánh để ĐI MAP, không phải để hạ boss.',
              tomEn:'The burst lands BEHIND the pierced target — this is the map-clearing branch.' },
            { id:'helix',   loai:'nl', xong:true , ten:'XOẮN SÓNG ĐÔI', tenEn:'HELIX',
              mo:['2 viên xoắn hình sin đối xứng qua trục ngực — phủ dọc rộng gấp đôi.',
                  'Xoắn nhanh hơn; tại ĐIỂM NÚT hai viên giao nhau, hộp va chạm to gấp 1.5.',
                  'ĐIỂM HỘI TỤ — trúng ngay tại điểm nút thì viên đạn xuyên thẳng qua thân đó.'],
              moEn:['2 rounds weaving a sine wave mirrored about your chest — twice the vertical coverage.',
                    'Faster weave; at the NODES where the two cross, the hitbox is 1.5x.',
                    'CONVERGENCE — a hit landed exactly on a node pierces straight through.'],
              tom:'Không rộng hai bên như TÁCH TIA mà rộng LÊN XUỐNG, và không hụt theo cự ly.',
              tomEn:'Not sideways like SPLIT SHOT but UP AND DOWN, and it never falls off with range.' },
            { id:'quydao',  loai:'nl', xong:true , ten:'QUỸ ĐẠO', tenEn:'ORBIT',
              mo:['Đạn không bay đi mà bám vào một vòng tròn cách bạn 4cm rồi xoay ở đó. Chạm gì cũng tan: thân địch, hoặc ĐẠN của địch.',
                  'Vòng xoay nhanh hơn, và băng đạn hồi nhanh hơn rõ rệt.',
                  'Ngôi sao trúng lần đầu chỉ CÙI đi chứ không mất — phải trúng lần thứ hai mới tan. Hai lần 1 sát thương, không phải một lần 2.'],
              moEn:['Rounds never fly away: they latch onto a ring 4cm around you and spin there. Anything they touch pops — enemy bodies, or enemy BULLETS.',
                    'The ring spins faster, and the magazine refills noticeably faster.',
                    'A star that connects only DULLS instead of dying — it takes a second hit to break. Two hits of 1 damage, never one hit of 2.'],
              tom:'Nhánh DUY NHẤT không có tầm bắn. Đổi sạch tầm xa lấy một vòng cưa quanh mình — bù lại mỗi ngôi sao vừa là viên đạn vừa là mảnh khiên. Không quá nhiệt, hồi từng viên một, và tích trữ được vô hạn.',
              tomEn:'The ONLY branch with no range at all. Trades every bit of reach for a saw ring around you — and every star is both a round and a shard of shield. No overheat, one round at a time, and it stockpiles without limit.' },
            { id:'chainsaw', loai:'nl', xong:true, ten:'CHAINSAW', tenEn:'CHAINSAW',
              mo:['Cầm hẳn một cái cưa máy. Băng đạn là 10 GIÂY xăng, giữ J là đốt. KHÔNG tự hồi — phải CÚI 3 lần liên tiếp để đề máy, sau đó máy TỰ đổ xăng (miễn là bạn ngừng cưa). 1 sát thương mỗi 0.25 giây, tầm 4cm trước mặt, và cứ giữ J liên tục 2 giây thì lưỡi cưa gió dài thêm 1cm. Giữ K để rồ cưa: 1.5 giây ra CƯA VÀNG (6 sát thương/giây trong 5 giây), 3 giây ra CƯA XANH (cưa trúng thì đâm xuyên, khoá kẻ địch 2 giây và xả 18 sát thương). Bấm J để dùng. Dùng xong là quá nhiệt ngay.',
                  'Máy khoẻ hơn: thời gian chờ xăng còn MỘT NỬA (đổ xăng nhanh gấp đôi).',
                  'Máy luôn nổ: xăng TỰ HỒI như một loại đạn thường — ngừng cưa 0.5 giây (vừa quá nhiệt thì 1.5 giây) là tự đổ, không cần cúi. Vẫn đổ nhanh gấp đôi.'],
              moEn:['You carry an actual chainsaw. The magazine is 10 SECONDS of fuel and holding J burns it. It never refills on its own — you must CROUCH 3 times in a row to kick the engine over; after that it refuels itself, as long as you stop sawing. 1 damage every 0.25s, 4cm of reach, and every 2 seconds of unbroken sawing the invisible wind blade adds 1cm. Hold K to rev: 1.5s gives the YELLOW saw (6 damage/sec for 5 seconds), 3s gives the GREEN saw (connect and you punch through, pinning the target for 2 seconds and 18 damage). Press J to use it. Using it overheats the saw instantly.',
                    'A stronger engine: the refuelling wait is HALVED (fuel pumps in twice as fast).',
                    'The engine never dies: fuel REGENERATES like ordinary ammo — stop sawing for 0.5s (1.5s after an overheat) and it refills on its own, no crouching. Still twice as fast.'],
              tom:'Nhánh cận chiến thật sự: không viên đạn nào, chỉ một cái hộp ngay trước mặt. Giá của nó là phải đứng sát, và là cái nghi thức cúi xuống đổ xăng giữa trận — tư thế hở nhất trong game (cấp 3 thì khỏi).',
              tomEn:'A true melee branch: no projectile at all, just a box in front of your face. The price is standing that close, and the refuelling ritual — crouching mid-fight is the most exposed you ever are, until level 3 does away with it.' },
            /* @@HE-CUSRG — 2 cap: cap 2 chi rut ngan nac dau (0.6 giay); con lai "cap" cua no la so giay ban dam giu J. */
            { id:'railgun', loai:'nl', xong:true, capMax:2, ten:'RAILGUN', tenEn:'RAILGUN',
              mo:['Giữ J: mỗi 1 giây lên một nấc, nhả J là bắn. Sát thương 6 / 14 / 24 / 36 / 50... tăng mãi không trần. Viên đạn xuyên tất cả, nấc càng cao càng nhanh và cột đạn càng dày. Từ nấc 2 điện rò ra giật kẻ địch ở gần: 3 sát thương/giây. Nhả sớm hơn 1 giây là xịt. Giữ K: ĐIỆN TỪ GIA TỐC — chạy nhanh dần tới ×3 ở 1.5 giây, tự hết ở 3 giây; điện quanh người giật kẻ địch lại gần, và LƯỚT thành lướt sét xuyên qua gây 2→6 sát thương (lướt ở mức 6 thì tốc tụt về ×2, 0.5 giây sau mới lên lại).',
                  'Nấc ĐẦU chỉ cần 0.6 giây (các nấc sau vẫn 1 giây/nấc) — phát 6 sát thương ra nhanh hơn, cả chuỗi nấc cũng sớm hơn 0.4 giây. Đây là cấp cao nhất.',
                  'Nấc ĐẦU chỉ cần 0.6 giây (các nấc sau vẫn 1 giây/nấc) — phát 6 sát thương ra nhanh hơn, cả chuỗi nấc cũng sớm hơn 0.4 giây. Đây là cấp cao nhất.'],
              moEn:['Hold J: one stage per second, release to fire. Damage 6 / 14 / 24 / 36 / 50... climbing without a cap. The round pierces everything; higher stages fly faster and hit a thicker column. From stage 2, leaking current zaps nearby enemies for 3 damage/sec. Release before 1 second and it fizzles. Hold K for ELECTROMAGNETIC ACCELERATION — run speed ramps to ×3 over 1.5s and wears off at 3s; current around you zaps enemies that come close, and your DASH becomes a lightning dash dealing 2→6 as it passes through (a 6-damage dash drops you to ×2 for half a second).',
                    'The FIRST stage needs only 0.6s (later stages still one per second) — the 6-damage shot comes out sooner and the whole ladder arrives 0.4s early. This is the top level.',
                    'The FIRST stage needs only 0.6s (later stages still one per second) — the 6-damage shot comes out sooner and the whole ladder arrives 0.4s early. This is the top level.'],
              tom:'2 cấp. Một đồng xu, một phát bắn. Càng dám giữ lâu giữa trận thì phát đó càng khủng khiếp — và bạn không bắn được gì khác trong lúc giữ.',
              tomEn:'2 levels. One coin, one shot. The longer you dare to hold it mid-fight the more monstrous that shot becomes — and you fire nothing else while you hold.' },
            { id:'khucxa',  loai:'he', xong:true , ten:'KHÚC XẠ', tenEn:'REFRACTION',
              mo:['6 phát trúng cùng mục tiêu → một đòn bùng nổ +1.','4 phát → +2.','3 phát → +3.'],
              moEn:['6 hits on one target → a +1 burst.','4 hits → +2.','3 hits → +3.'],
              tom:'Bùng nổ MỘT LẦN rồi tích lại từ đầu, không cộng vĩnh viễn vào mỗi viên.',
              tomEn:'It bursts ONCE and then rebuilds; it is not a permanent bonus on every round.' },
            /* @@HE-NO2 — Hans: "No thi chac la nang cap OP nhat... gay dmg lien tuc. Neu hop ly thi phai
               giong voi Nova... bo cap 3 cua no di". Bang can bang do ra QUY DAO + NO = 234, manh
               nhat game, va thu lam no OP chinh la "bo thoi gian hoi — no lien tuc". Nen bo HAN
               cai do: no luon hoi 1 giay nhu Nova, cap 2 la ban kinh gap ruoi, va KHONG CO cap 3
               (`capMax:2` — cusCapCua tu kep lai, Route khong tu nang len 3). */
            { id:'no',      loai:'he', xong:true, capMax:2, ten:'NỔ', tenEn:'DETONATE',
              mo:['Viên đạn nổ lan trúng thêm mục tiêu. Vụ nổ gây sát thương sau 1 giây, hồi 1 giây một lần.',
                  'Bán kính nổ gấp rưỡi. Đây là cấp cao nhất.',
                  'Bán kính nổ gấp rưỡi. Đây là cấp cao nhất.'],
              moEn:['The round detonates and catches extra targets. The blast lands after 1 second, once per second.',
                    'Half again the blast radius. This is the top level.',
                    'Half again the blast radius. This is the top level.'],
              tom:'Vụ nổ không cộng sát thương trực tiếp — nó trúng thêm mục tiêu, và cú đánh đó tới sau một giây. COMBO với BĂNG (cần ô thứ ba): vụ nổ trúng mục tiêu đang đóng băng thì VỠ BĂNG, +4 sát thương.',
              tomEn:'The blast adds no direct damage — it catches extra targets, one second later. COMBO with FROST (needs the third slot): a blast on a frozen target SHATTERS it for +4.' },
            { id:'bang',    loai:'he', xong:true , ten:'BĂNG', tenEn:'FROST',
              mo:['10 stack → đóng băng 1 giây.','7 stack.','5 stack, và đòn kế tiếp lên mục tiêu đang băng ×2.'],
              moEn:['10 stacks → 1 second freeze.','7 stacks.','5 stacks, and the next hit on a frozen target is doubled.'],
              tom:'Khống chế thuần.', tomEn:'Pure control.' },
            { id:'supply',  loai:'he', xong:true , ten:'TIẾP TRỢ', tenEn:'SUPPLY DROP',
              mo:['Cứ 12 giây một TRỰC THĂNG thả dù tiếp tế. Nhặt hòm thì K bắn một quả pháo 10 sát thương.',
                  'Bắn trúng còn có 7% rơi thêm HÒM ĐẠN. Trực thăng nhanh hơn (10 giây).',
                  'Pháo thành ĐẠI PHÁO XUYÊN PHÁ, trực thăng 9 giây, và nhặt hòm xoá sạch quá nhiệt.'],
              moEn:['Every 12 seconds a HELICOPTER parachutes a crate in. Pick one up and K fires a 10-damage shell.',
                    'Hits also have a 7% chance to drop a crate. The helicopter comes every 10 seconds.',
                    'The shell becomes a PIERCING HOWITZER, the helicopter every 9 seconds, and crates clear overheat.'],
              tom:'KHOÁ Charge của K. K thành nòng pháo: có hàng mới bắn, nhưng không sinh nhiệt. Giữ K gọi trực thăng sớm hơn.',
              tomEn:'LOCKS the K charge. In exchange K is a heavy cannon: only with a shell, but no heat.' },
            { id:'dot',     loai:'he', xong:true , ten:'ĐỐT', tenEn:'BURN',
              mo:['Đốt trong 3 giây: 1 sát thương mỗi giây, 1 nhịp mỗi giây — tổng 3.',
                  '2 sát thương mỗi giây, 2 nhịp mỗi giây — tổng 6 trong 3 giây.',
                  '3 sát thương mỗi giây, 3 nhịp mỗi giây — tổng 9 trong 3 giây.'],
              moEn:['Burns for 3 seconds: 1 damage a second in 1 tick — 3 total.',
                    '2 damage a second in 2 ticks — 6 over the same 3 seconds.',
                    '3 damage a second in 3 ticks — 9 over the same 3 seconds.'],
              tom:'Vệt đốt luôn dài ĐÚNG 3 giây; lên cấp là đốt MẠNH hơn chứ không phải LÂU hơn. Không cộng dồn — mỗi phát LÀM MỚI vệt đốt. COMBO với TÁCH TIA: trúng mục tiêu đang cháy thì CHỒNG thêm một nhịp, tối đa gấp đôi.',
              tomEn:'The burn always lasts EXACTLY 3 seconds; levels make it HOTTER, not longer. It does not stack — every hit REFRESHES it. COMBO with SPLIT SHOT: hitting a burning target STACKS one more tick, up to double.' },
            /* @@HE-CUSHE3 — ba hieu ung cho loi ban it. Khong cap: con so do Hans dat.
               PHA THE (id cu 'khaicuoc' giu nguyen de lua chon da luu khong mat) va TAM NHAN la
               hai chi so nguoc nhau cua ngu hon trong Am Duong Su — Hans dat ten. */
            { id:'khaicuoc', loai:'he', xong:true, khongCap:true, ten:'PHÁ THẾ', tenEn:'SHATTER',
              mo:['+40% sát thương lên kẻ địch còn TRÊN 60% máu.','+40% sát thương lên kẻ địch còn TRÊN 60% máu.','+40% sát thương lên kẻ địch còn TRÊN 60% máu.'], moEn:['+40% damage against enemies still ABOVE 60% health.','+40% damage against enemies still ABOVE 60% health.','+40% damage against enemies still ABOVE 60% health.'],
              tom:'KHÔNG CÓ CẤP. Tính theo máu mục tiêu chứ không theo số phát — một phát to mở màn đáng giá như mười phát nhỏ.',
              tomEn:'NO LEVELS. Keyed to the target\'s health, not your hit count — a big opening shot is worth as much as ten small ones.' },
            { id:'tamnhan', loai:'he', xong:true, khongCap:true, ten:'TÂM NHÃN', tenEn:'MIND\'S EYE',
              mo:['+40% sát thương lên kẻ địch DƯỚI 50% máu.','+40% sát thương lên kẻ địch DƯỚI 50% máu.','+40% sát thương lên kẻ địch DƯỚI 50% máu.'], moEn:['+40% damage against enemies BELOW 50% health.','+40% damage against enemies BELOW 50% health.','+40% damage against enemies BELOW 50% health.'],
              tom:'KHÔNG CÓ CẤP. Nửa sau trận mới là lúc của nó — hợp với phát kết liễu.',
              tomEn:'NO LEVELS. It comes alive in the second half of the fight — built for the finishing blow.' },
            { id:'stand', loai:'he', xong:true, capMax:2, ten:'STAND', tenEn:'STAND',
              mo:['Một con khủng long mờ lơ lửng sau lưng. Mỗi đòn trúng có tỉ lệ để nó đánh lại Y HỆT đòn đó (cùng sát thương, bắn chéo từ trên xuống): 5% với đòn 1 sát thương, tăng dần tới 60% với đòn 200 sát thương.','CỘNG DỒN: đòn nào Stand không ra tay thì tỉ lệ của đòn đó được cộng vào đòn kế tiếp, tới khi nó ra tay mới về 0. Đòn 60% hụt một lần thì lần thứ hai chắc chắn ra. Đây là cấp cao nhất.','CỘNG DỒN: đòn nào Stand không ra tay thì tỉ lệ của đòn đó được cộng vào đòn kế tiếp, tới khi nó ra tay mới về 0. Đòn 60% hụt một lần thì lần thứ hai chắc chắn ra. Đây là cấp cao nhất.'], moEn:['A faint dinosaur floats behind you. Every hit has a chance for it to repeat THAT EXACT attack (same damage, fired at an angle from above): 5% for a 1-damage hit, rising to 60% for a 200-damage hit.','STACKING: whenever the Stand does not join in, that hit\'s chance carries over onto the next one until it finally strikes, then resets. A 60% hit that misses once is guaranteed on the second. This is the top level.','STACKING: whenever the Stand does not join in, that hit\'s chance carries over onto the next one until it finally strikes, then resets. A 60% hit that misses once is guaranteed on the second. This is the top level.'],
              tom:'Hai cấp. Đòn càng to thì Stand càng hay ra tay — một phát Railgun 200 sát thương có hơn nửa cơ hội được đánh hai lần. Cấp 2 giữ lại tỉ lệ đã hụt cho đòn sau. COMBO với RAILGUN: Stand đánh lại bằng một tia rail XUYÊN, ai nằm trên đường bay cũng ăn nửa sát thương.',
              tomEn:'Two levels. The bigger the blow, the more often the Stand joins in — a 200-damage Railgun shot has better than even odds of landing twice. Level 2 keeps the missed chance for the next hit. COMBO with RAILGUN: the Stand answers with a PIERCING rail, and anyone on its path takes half damage.' },
            /* @@HE-VOCUC — Hans: "Vo cuc kiem cho Module. Tang 50% sat thuong chi mang. Tang 20% chi mang co cong don voi cac loai chi mang khac". */
            { id:'vocuc', loai:'he', xong:true, capMax:2, ten:'VÔ CỰC KIẾM', tenEn:'INFINITY BLADE',
              mo:['+20% tỉ lệ chí mạng (cộng thẳng vào mọi nguồn khác). Không có rune chí mạng: chí mạng gây ×1.5. Có rune: ×2 thành ×2.5, siêu chí mạng ×3 thành ×3.5.','Sát thương chí mạng NHÂN 1.5: không rune thì chí mạng gây ×2; có rune thì ×2 thành ×3, siêu chí mạng ×3 thành ×4.5. Đây là cấp cao nhất.','Sát thương chí mạng NHÂN 1.5: không rune thì chí mạng gây ×2; có rune thì ×2 thành ×3, siêu chí mạng ×3 thành ×4.5. Đây là cấp cao nhất.'], moEn:['+20% critical chance (added straight on top of every other source). Without a crit rune, crits deal ×1.5. With one: ×2 becomes ×2.5, a ×3 super crit becomes ×3.5.','Critical damage is MULTIPLIED by 1.5: without a rune crits deal ×2; with one, ×2 becomes ×3 and a ×3 super crit becomes ×4.5. This is the top level.','Critical damage is MULTIPLIED by 1.5: without a rune crits deal ×2; with one, ×2 becomes ×3 and a ×3 super crit becomes ×4.5. This is the top level.'],
              tom:'Hai cấp. Tự nó đã cho 20% chí mạng; ghép với rune CHÍ MẠNG thì cộng dồn lên 45% ngay từ phát đầu, và cấp 2 đẩy siêu chí mạng lên ×4.5.',
              tomEn:'Two levels. On its own it gives 20% crit; with the CRITICAL STRIKE rune it stacks to 45% from the first shot, and level 2 pushes a super crit to ×4.5.' },
            /* @@HE-CUSKV — module LAI, va khoa luon CHIEU CUOI. */
            /* @@HE-CUSMC — Hans: "Khong hoi dan nhung bang dan ban xong thi cho 1 giay de Reset toan bo.
               Bang dan chi co 4 vien. Vien dan thu 4 gay sat thuong =1+(4% mau cua ke dich). Charge thi
               thay vi tru dan thi no khien cho 1-3 vien truoc do gay dmg bang 1+(2% mau toi da cua ke
               dich) va vien thu 4 la 5% mau toi da. Nang luc nay ban dat ten di". Ten: MAN CUOI —
               vien thu tu la man ha rem. */
            /* @@HE-CUSMC2 — Hans: "sat thuong chia thanh moc hien tai la cap cuoi thi 2 cap duoi la
               phien ban nerf mot chut... cap 2 thi vien thuong khi charge giam xuong 1%. Cap 1 thi
               vien manh la 2% cho ban thuong va charge la 3% con vien thuong khi charge la 1%". */
            { id:'mancuoi', loai:'nl', xong:true, ten:'MÀN CUỐI', tenEn:'FINAL ACT',
              mo:['Băng đạn 4 viên, KHÔNG tự hồi; bắn hết thì chờ 1 giây nạp lại cả băng. Viên 4 gây 1 + 2% máu tối đa. Charge 1 giây nạp cả băng: viên 1-3 gây 1 + 1%, viên 4 gây 1 + 3% máu tối đa.',
                  'Viên 4 gây 1 + 4% máu tối đa. Khi charge: viên 1-3 gây 1 + 1%, viên 4 gây 1 + 5% máu tối đa.',
                  'Khi charge: viên 1-3 gây 1 + 2% máu tối đa (viên 4 vẫn 1 + 5%).'],
              moEn:['4-round magazine that does NOT refill; empty it and the whole mag reloads after 1 second. Round 4 deals 1 + 2% max HP. Charge 1 second to prime the mag: rounds 1-3 deal 1 + 1%, round 4 deals 1 + 3% max HP.',
                    'Round 4 deals 1 + 4% max HP. When primed: rounds 1-3 deal 1 + 1%, round 4 deals 1 + 5% max HP.',
                    'When primed: rounds 1-3 deal 1 + 2% max HP (round 4 stays at 1 + 5%).'],
              tom:'Đếm đạn là tất cả: viên thứ tư là màn hạ rèm. Càng đánh boss máu dày càng lời.',
              tomEn:'Count your shots: the fourth round is the curtain call. The beefier the target, the bigger the payoff.' },
            { id:'kiemvu', loai:'nl', ca:true, xong:false, tach:true, khongCap:true, ten:'KIẾM VŨ', tenEn:'SWORD DANCE',
              mo:['Không có kiếm sẵn: GIỮ K, mỗi 0.5 giây sinh một thanh, không giới hạn. 6 thanh đầu lơ lửng trên lưng, từ thanh thứ 7 trở đi lơ lửng trên cao. Chạm J phóng một thanh (5 sát thương, tự bẻ lái); GIỮ J gộp 1–6 thanh thành một đòn lớn dần. Bị ĐẠN bắn tới thì một thanh trên lưng tự lao ra chặn. Đủ 6 thanh thì cả 6 chụm mũi thành KHIÊN chặn trọn một đòn lao vào người. Ô trống trên lưng được thanh trên cao bay xuống thay sau 1 giây. KHOÁ CHANNEL thành VƯƠNG KHỐ và CHIÊU CUỐI thành VẠN KIẾM QUY TÔNG.','Không có kiếm sẵn: GIỮ K, mỗi 0.5 giây sinh một thanh, không giới hạn. 6 thanh đầu lơ lửng trên lưng, từ thanh thứ 7 trở đi lơ lửng trên cao. Chạm J phóng một thanh (5 sát thương, tự bẻ lái); GIỮ J gộp 1–6 thanh thành một đòn lớn dần. Bị ĐẠN bắn tới thì một thanh trên lưng tự lao ra chặn. Đủ 6 thanh thì cả 6 chụm mũi thành KHIÊN chặn trọn một đòn lao vào người. Ô trống trên lưng được thanh trên cao bay xuống thay sau 1 giây. KHOÁ CHANNEL thành VƯƠNG KHỐ và CHIÊU CUỐI thành VẠN KIẾM QUY TÔNG.','Không có kiếm sẵn: GIỮ K, mỗi 0.5 giây sinh một thanh, không giới hạn. 6 thanh đầu lơ lửng trên lưng, từ thanh thứ 7 trở đi lơ lửng trên cao. Chạm J phóng một thanh (5 sát thương, tự bẻ lái); GIỮ J gộp 1–6 thanh thành một đòn lớn dần. Bị ĐẠN bắn tới thì một thanh trên lưng tự lao ra chặn. Đủ 6 thanh thì cả 6 chụm mũi thành KHIÊN chặn trọn một đòn lao vào người. Ô trống trên lưng được thanh trên cao bay xuống thay sau 1 giây. KHOÁ CHANNEL thành VƯƠNG KHỐ và CHIÊU CUỐI thành VẠN KIẾM QUY TÔNG.'],
              moEn:['No swords to start: HOLD K and one forms every 0.5 seconds, without limit. The first 6 float on your back; the 7th and beyond hover higher up. Tap J to launch one (5 damage, homing); HOLD J to fuse 1–6 into one growing strike. When a BULLET comes at you, a sword on your back flies out to block it. With all 6, they point their tips together into a SHIELD that stops one blow to your body outright. An empty back slot is refilled by a sword from above after 1 second. LOCKS your CHANNEL to GATE OF TREASURE and your ULTIMATE to TEN THOUSAND SWORDS.','No swords to start: HOLD K and one forms every 0.5 seconds, without limit. The first 6 float on your back; the 7th and beyond hover higher up. Tap J to launch one (5 damage, homing); HOLD J to fuse 1–6 into one growing strike. When a BULLET comes at you, a sword on your back flies out to block it. With all 6, they point their tips together into a SHIELD that stops one blow to your body outright. An empty back slot is refilled by a sword from above after 1 second. LOCKS your CHANNEL to GATE OF TREASURE and your ULTIMATE to TEN THOUSAND SWORDS.','No swords to start: HOLD K and one forms every 0.5 seconds, without limit. The first 6 float on your back; the 7th and beyond hover higher up. Tap J to launch one (5 damage, homing); HOLD J to fuse 1–6 into one growing strike. When a BULLET comes at you, a sword on your back flies out to block it. With all 6, they point their tips together into a SHIELD that stops one blow to your body outright. An empty back slot is refilled by a sword from above after 1 second. LOCKS your CHANNEL to GATE OF TREASURE and your ULTIMATE to TEN THOUSAND SWORDS.'],
              tom:'KHÔNG CÓ CẤP. Chiếm cả Năng lực, Hiệu ứng, Channel và Chiêu cuối. Không tích kiếm thì không bắn được, cũng không đỡ được gì — mọi thứ đều phải trả trước bằng thời gian giữ K.',
              tomEn:'NO LEVELS. Takes the Ability, Effect, Channel and Ultimate slots. No stored swords means nothing to shoot and nothing to block — everything is paid for in advance with time spent holding K.' },
            /* @@HE-CUSAC — KHI CONG PHAO: nang luc, khong cap. */
            { id:'khicong', loai:'nl', xong:true, ten:'KHÍ CÔNG PHÁO', tenEn:'AIR CANNON',
              mo:['J: bắn một luồng khí toả ra phía trước, tầm gần ~8cm, 3 sát thương. Băng 1 viên, hồi 1 viên mỗi giây. Kẻ địch dính ở NỬA GẦN của tầm bắn bị PARRY: đẩy lùi và NGẮT hành động; bị đập vào tường thì thêm 3 sát thương. Giữ K 0.75 / 1.5 / 2 / 3 giây rồi nhả: 4 / 5 / 6 / 7 sát thương, đập tường 3 / 4 / 4 / 5, tầm 12cm / 16cm / TOÀN MAP; ở 3 giây thì đẩy lùi cũng TOÀN MAP.',
                  'Đạn của kẻ địch lọt vào VÙNG PARRY của luồng khí bị PHÁ luôn.',
                  'Thay vì phá, luồng khí THỔI NGƯỢC đạn kẻ địch trong vùng parry bay về phía trước, trúng kẻ địch nào thì gây sát thương kẻ đó. Mục tiêu bị đẩy +1 sát thương, đập tường +2. Sạc đủ 3 giây: lực đẩy KHỔNG LỒ, thổi bay qua cả màn hình.'],
              moEn:['J: fires a cone of compressed air, short range ~8cm, 3 damage. 1 round, 1 second to reload. Enemies caught in the NEAR HALF of the blast are PARRIED: knocked back and their action BROKEN; slammed into a wall they take 3 more. Hold K 0.75 / 1.5 / 2 / 3 seconds and release: 4 / 5 / 6 / 7 damage, wall slam 3 / 4 / 4 / 5, range 12cm / 16cm / WHOLE MAP; at 3 seconds the knockback reaches the WHOLE MAP too.',
                    'Enemy projectiles inside the blast\'s PARRY ZONE are DESTROYED.',
                    'Instead of destroying them, the blast BLOWS enemy projectiles in the parry zone back the way it is facing; they damage any enemy they hit. Pushed targets take +1, wall slams +2. Fully charged (3 seconds): an ENORMOUS push that throws them across the whole screen.'],
              tom:'Súng ngắn của đám đông: đứng sát để ngắt đòn và đẩy boss vào tường, sạc lâu để thổi bay cả màn hình. Cấp 2 phá đạn, cấp 3 thổi ngược đạn.',
              tomEn:'A crowd shotgun: stand close to break attacks and pin bosses to the wall, charge long to blow the whole screen away. Level 2 destroys projectiles, level 3 blows them back.' },
            /* @@HE-CUSCG — CUNG co 3 cap: so mui ten toi da tren day 1 / 3 / 5 (cusCgMax). */
            { id:'cung', loai:'nl', xong:true, ten:'CUNG', tenEn:'BOW',
              mo:['Cung bắn VÔ HẠN, không tốn đạn, không quá nhiệt. Giữ J để KÉO, nhả là bắn. Kéo nhẹ rất yếu: nhả trước 0.5 giây thì mũi tên chỉ 1 sát thương, bay ngắn (chạm J là khoảng 5cm) rồi rơi xuống đất. Kéo 0.5 giây: bay hết map, 3 sát thương · 0.75 giây: 4 · 1 giây: 5 và XUYÊN PHÁ (xuyên mọi kẻ địch, cắt vỡ đạn trên đường bay). Mỗi lần bắn chỉ MỘT mũi tên.', 'Bấm K để đặt thêm một mũi tên lên dây (tối đa 3) — cả loạt bắn cùng lúc, toả hẹp hơn Phi Tiêu một chút; bắn xong dây về 1 mũi.', 'Tối đa 5 mũi tên trên dây.'],
              moEn:['The bow fires FOREVER: no ammo, no overheat. Hold J to DRAW, release to loose. A light draw is weak: release before 0.5s and the arrow deals 1 damage, flies short (a tap is about 5cm) and drops. Draw 0.5s: crosses the whole map for 3 damage · 0.75s: 4 · 1s: 5 and PIERCING (goes through every enemy and cuts enemy projectiles on its path). ONE arrow per shot.', 'Press K to nock one more arrow (up to 3) — the whole volley flies at once, fanning slightly tighter than Needles; after the shot the string is back to 1 arrow.', 'Up to 5 arrows on the string.'],
              tom:'Không bao giờ hết đạn, nhưng mỗi phát đáng giá phải KÉO đủ lâu — đứng kéo là đứng yên chịu đòn. Cấp 1 bắn 1 mũi, cấp 2 chồng tới 3 mũi, cấp 3 tới 5 mũi bằng K để một loạt kéo căng quét sạch cả hàng.',
              tomEn:'Never runs dry, but every shot worth firing has to be DRAWN — and drawing means standing still under fire. Level 1 fires 1 arrow, level 2 stacks up to 3 with K, level 3 up to 5 so one full draw sweeps the whole line.' },
            /* @@HE-CUSPT — module LAI: `ca: true` = hien o CA hai hang va khoa CA hai o. */
            { id:'phitieu', loai:'nl', ca:true, xong:false, tach:true, khongCap:true, ten:'PHI TIÊU', tenEn:'NEEDLES',
              mo:['Ném kim mảnh: 1 sát thương, XUYÊN 1 lần. Băng 2 kim, hồi 1 kim mỗi giây — ném cả hai là QUÁ NHIỆT 1.5 giây. Mỗi mũi kim trúng cộng dồn VĨNH VIỄN vào vết CHẢY MÁU: 1 kim = 1 sát thương/giây, 3 kim = 2, 6 kim = 3, 10 kim = 4… tối đa 10/giây (55 kim). Chảy máu kéo dài 3 giây nếu không bị đâm thêm. Giữ K 0.75 / 1.5 / 2.25 / 3 giây rồi nhả: phóng 2 / 4 / 6 / 8 kim hình quạt.','Ném kim mảnh: 1 sát thương, XUYÊN 1 lần. Băng 2 kim, hồi 1 kim mỗi giây — ném cả hai là QUÁ NHIỆT 1.5 giây. Mỗi mũi kim trúng cộng dồn VĨNH VIỄN vào vết CHẢY MÁU: 1 kim = 1 sát thương/giây, 3 kim = 2, 6 kim = 3, 10 kim = 4… tối đa 10/giây (55 kim). Chảy máu kéo dài 3 giây nếu không bị đâm thêm. Giữ K 0.75 / 1.5 / 2.25 / 3 giây rồi nhả: phóng 2 / 4 / 6 / 8 kim hình quạt.','Ném kim mảnh: 1 sát thương, XUYÊN 1 lần. Băng 2 kim, hồi 1 kim mỗi giây — ném cả hai là QUÁ NHIỆT 1.5 giây. Mỗi mũi kim trúng cộng dồn VĨNH VIỄN vào vết CHẢY MÁU: 1 kim = 1 sát thương/giây, 3 kim = 2, 6 kim = 3, 10 kim = 4… tối đa 10/giây (55 kim). Chảy máu kéo dài 3 giây nếu không bị đâm thêm. Giữ K 0.75 / 1.5 / 2.25 / 3 giây rồi nhả: phóng 2 / 4 / 6 / 8 kim hình quạt.'],
              moEn:['Throws a thin needle: 1 damage, PIERCES once. 2 needles, one returns every second — throw both and you OVERHEAT for 1.5 seconds. Every needle that lands adds PERMANENTLY to the BLEED: 1 needle = 1 damage/sec, 3 = 2, 6 = 3, 10 = 4… up to 10/sec (55 needles). The bleed lasts 3 seconds unless the target is pierced again. Hold K 0.75 / 1.5 / 2.25 / 3 seconds and release: a fan of 2 / 4 / 6 / 8 needles.','Throws a thin needle: 1 damage, PIERCES once. 2 needles, one returns every second — throw both and you OVERHEAT for 1.5 seconds. Every needle that lands adds PERMANENTLY to the BLEED: 1 needle = 1 damage/sec, 3 = 2, 6 = 3, 10 = 4… up to 10/sec (55 needles). The bleed lasts 3 seconds unless the target is pierced again. Hold K 0.75 / 1.5 / 2.25 / 3 seconds and release: a fan of 2 / 4 / 6 / 8 needles.','Throws a thin needle: 1 damage, PIERCES once. 2 needles, one returns every second — throw both and you OVERHEAT for 1.5 seconds. Every needle that lands adds PERMANENTLY to the BLEED: 1 needle = 1 damage/sec, 3 = 2, 6 = 3, 10 = 4… up to 10/sec (55 needles). The bleed lasts 3 seconds unless the target is pierced again. Hold K 0.75 / 1.5 / 2.25 / 3 seconds and release: a fan of 2 / 4 / 6 / 8 needles.'],
              tom:'KHÔNG CÓ CẤP. Vừa là năng lực vừa là hiệu ứng — chọn là KHOÁ CẢ HAI Ô. Sát thương thật nằm ở vết chảy máu tích mãi không mất: trận càng dài càng đau.',
              tomEn:'NO LEVELS. Both an ability and an effect — picking it LOCKS BOTH SLOTS. The real damage is the bleed that never resets: the longer the fight, the worse it gets.' },
        ];
// PLAYER_PART_END s4.CUS_NC.1

// index.html:63366 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNCTim.1 EDITABLE
function cusNCTim(id){ return CUS_NC.find(x => x.id === id) || null; }
// PLAYER_PART_END s4.cusNCTim.1

// index.html:63367 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCap.1 EDITABLE
let cusCap = {};
// PLAYER_PART_END s4.cusCap.1

// index.html:63371 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusLap.1 EDITABLE
let cusLap = { nl: null, he: null, x: null, ch: null, nl2: null, he2: null };
// PLAYER_PART_END s4.cusLap.1

// index.html:63374 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusThuNghiem.1 EDITABLE
let cusThuNghiem = true;
// PLAYER_PART_END s4.cusThuNghiem.1

// index.html:63375 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusOBa.1 EDITABLE
function cusOBa(){ return typeof hasRune === 'function' && hasRune('cus3o'); }
// PLAYER_PART_END s4.cusOBa.1

// index.html:63381 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_SH_DAN.1 EDITABLE
const CUS_SH_DAN = { bangdan: 1, tachtia: 1, tamxa: 1, toa: 1, helix: 1, quydao: 1, mancuoi: 1 };
// PLAYER_PART_END s4.CUS_SH_DAN.1

// index.html:63382 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_SH_VK.1 EDITABLE
const CUS_SH_VK  = { railgun: ['tachtia', 'toa'], laser: ['tachtia', 'toa'], cung: ['tachtia', 'toa'] };
// PLAYER_PART_END s4.CUS_SH_VK.1

// index.html:63383 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusSH.1 EDITABLE
function cusSH(){ return typeof hasRune === 'function' && hasRune('cussh'); }
// PLAYER_PART_END s4.cusSH.1

// index.html:63384 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusSHHop.1 EDITABLE
function cusSHHop(a, b){
            if (!a || !b || a === b) return true;
            if (CUS_SH_DAN[a] && CUS_SH_DAN[b]) return true;
            if (CUS_SH_VK[a]) return CUS_SH_VK[a].indexOf(b) >= 0;
            if (CUS_SH_VK[b]) return CUS_SH_VK[b].indexOf(a) >= 0;
            return false;
        }
// PLAYER_PART_END s4.cusSHHop.1

// index.html:63392 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusSHGop.1 EDITABLE
function cusSHGop(){ return cusSH() && !!cusLap.nl && !!cusLap.nl2; }
// PLAYER_PART_END s4.cusSHGop.1

// index.html:63393 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusSHHaiLoi.1 EDITABLE
function cusSHHaiLoi(){ return false; }
// PLAYER_PART_END s4.cusSHHaiLoi.1

// index.html:63394 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusSHNghi.1 EDITABLE
function cusSHNghi(){ return null; }
// PLAYER_PART_END s4.cusSHNghi.1

// index.html:63396 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_LAP_PT.1 EDITABLE
const CUS_LAP_PT = { nl: 'phitieu', he: 'phitieu', x: null, ch: null };
// PLAYER_PART_END s4.CUS_LAP_PT.1

// index.html:63397 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_LAP_KV.1 EDITABLE
const CUS_LAP_KV = { nl: 'kiemvu', he: 'kiemvu', x: null, ch: null };
// PLAYER_PART_END s4.CUS_LAP_KV.1

// index.html:63398 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TACH.1 EDITABLE
const CUS_TACH = { phitieu: 1, kiemvu: 1 };
// PLAYER_PART_END s4.CUS_TACH.1

// index.html:63399 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNguoiDang.1 EDITABLE
let cusNguoiDang = null;
// PLAYER_PART_END s4.cusNguoiDang.1

// index.html:63400 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusLapDung.1 EDITABLE
function cusLapDung(){
            let a = (cusNguoiDang && cusNguoiDang.ammoType !== undefined) ? cusNguoiDang.ammoType
                  : (typeof currentAmmoType !== 'undefined' ? currentAmmoType : -1);
            if (a === PT_DAN) return CUS_LAP_PT;
            if (a === KV_DAN) return CUS_LAP_KV;
            return cusLap;
        }
// PLAYER_PART_END s4.cusLapDung.1

// index.html:63407 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCapCua.1 EDITABLE
function cusCapCua(id){
            let L = cusLapDung();
            if (L !== cusLap) return (L.nl === id || L.he === id) ? 3 : 0;   // loai dan rieng: khong cap, luon du
            if (CUS_TACH[id]) return 0;                                       // Custom khong con hai module nay
            let co = (cusLap.nl === id) || (cusLap.he === id) || (cusLap.x === id && cusOBa())
                  || ((cusLap.nl2 === id || cusLap.he2 === id) && cusSH());          // @@HE-SONGHE
            if (!co) return 0;
            return Math.min(cusCapToiDa(id), cusThuNghiem ? 3 : Math.max(0, Math.min(3, cusCap[id] || 0)));
        }
// PLAYER_PART_END s4.cusCapCua.1

// index.html:63417 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCapToiDa.1 EDITABLE
function cusCapToiDa(id){
            if (!cusCapToiDa.m){ cusCapToiDa.m = {}; for (let n of CUS_NC) if (n.capMax) cusCapToiDa.m[n.id] = n.capMax; }
            return cusCapToiDa.m[id] || 3;
        }
// PLAYER_PART_END s4.cusCapToiDa.1

// index.html:63421 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNCPicker.1 EDITABLE
let cusNCPicker = null;
// PLAYER_PART_END s4.cusNCPicker.1

// index.html:63422 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusSHLoi.1 EDITABLE
let cusSHLoi = null;
// PLAYER_PART_END s4.cusSHLoi.1

// index.html:63423 · Phạm vi: global
// PLAYER_PART_BEGIN s4._cusNCBtn.1 EDITABLE
let _cusNCBtn = null, _cusNCO = [];
// PLAYER_PART_END s4._cusNCBtn.1

// index.html:63424 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTen.1 EDITABLE
function cusTen(o){ return (currentLang === 'en' && o && o.tenEn) ? o.tenEn : (o ? o.ten : '—'); }
// PLAYER_PART_END s4.cusTen.1

// index.html:63425 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMo.1 EDITABLE
function cusMo(o, cap){ let m = (currentLang === 'en' && o && o.moEn) ? o.moEn : (o ? o.mo : null);
                                return (m && m[Math.max(0, Math.min(2, cap - 1))]) || ''; }
// PLAYER_PART_END s4.cusMo.1

// index.html:63427 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusLuu.1 EDITABLE
function cusLuu(){ try { localStorage.setItem('dino_cusnc', JSON.stringify(cusLap)); } catch(e){} }
// PLAYER_PART_END s4.cusLuu.1

// index.html:63432 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNapLuu.1 EDITABLE
function cusNapLuu(){ try { let v = JSON.parse(localStorage.getItem('dino_cusnc') || 'null');
                           if (v && typeof v === 'object'){
                               let a = cusNCTim(v.nl), b = cusNCTim(v.he), c = cusNCTim(v.x), d = cusChTim(v.ch);
                               cusLap = { nl: (a && a.loai === 'nl' && a.xong) ? v.nl : null,
                                          he: (b && (b.loai === 'he' || b.ca) && b.xong) ? v.he : null,
                                          x:  (c && c.xong) ? v.x : null,
                                          ch: (d && d.xong) ? v.ch : null,
                                          nl2: (cusNCTim(v.nl2) && cusNCTim(v.nl2).loai === 'nl' && !cusNCTim(v.nl2).ca && cusNCTim(v.nl2).xong && v.nl2 !== v.nl && cusSHHop(v.nl, v.nl2)) ? v.nl2 : null,
                                          he2: (cusNCTim(v.he2) && cusNCTim(v.he2).loai === 'he' && !cusNCTim(v.he2).ca && cusNCTim(v.he2).xong && v.he2 !== v.he) ? v.he2 : null };
                           } } catch(e){} }
// PLAYER_PART_END s4.cusNapLuu.1

// index.html:63444 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_MC_BANG.1 EDITABLE
const CUS_MC_BANG = 4, CUS_MC_NAP = 60, CUS_MC_SAC = 60;
// PLAYER_PART_END s4.CUS_MC_BANG.1

// index.html:63446 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_MC_TI.1 EDITABLE
const CUS_MC_TI = { 1: { t4: 0.02, s13: 0.01, s4: 0.03 }, 2: { t4: 0.04, s13: 0.01, s4: 0.05 }, 3: { t4: 0.04, s13: 0.02, s4: 0.05 } };
// PLAYER_PART_END s4.CUS_MC_TI.1

// index.html:63447 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMcBat.1 EDITABLE
function cusMcBat(){ return typeof cusCapCua === 'function' && cusCapCua('mancuoi') > 0; }
// PLAYER_PART_END s4.cusMcBat.1

// index.html:63448 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMcDmg.1 EDITABLE
function cusMcDmg(proj, o){
            let M = proj.cusMc, maxH = (typeof cusMauMax === 'function') ? cusMauMax(o) : (o.maxHp || o.hp || 0);
            let T = CUS_MC_TI[Math.max(1, Math.min(3, cusCapCua('mancuoi') || 1))];   // @@HE-CUSMC2
            if (M.sac) return 1 + Math.round(maxH * (M.thu >= 4 ? T.s4 : T.s13));
            if (M.thu >= 4) return 1 + Math.round(maxH * T.t4);   // Hans: "tinh theo tat ca la 1 + % mau toi da"
            return proj.dmg;
        }
// PLAYER_PART_END s4.cusMcDmg.1

// index.html:63455 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBangDan.1 EDITABLE
function cusBangDan(){
            if (cusMcBat()) return CUS_MC_BANG;        // @@HE-CUSMC
            if (cusLaserBat()) return CUS_LZ_DAN;      // @@HE-CUSLZ
            if (typeof cusRgBat === 'function' && cusRgBat()) return 1;   // @@HE-CUSRG
            if (typeof cusPtBat === 'function' && cusPtBat()) return 2;   // @@HE-CUSPT
            if (typeof cusAcBat === 'function' && cusAcBat()) return 1;   // @@HE-CUSAC
            if (typeof cusCgBat === 'function' && cusCgBat()) return 1;   // @@HE-CUSCG: cung ban vo han, chi hien mot o
            if (typeof cusKvBat === 'function' && cusKvBat()) return 1;   // @@HE-CUSKV
            if (cusToaBat())   return CUS_TOA_DAN;     // @@HE-CUSTOA
            if (cusQdBat())    return CUS_QD_DAN;      // @@HE-CUSQD
            if (cusCwBat())    return Math.round(CW_BINH / 60);   // @@HE-CUSCW: 10 o = 10 giay
            return [6, 9, 12, 15][cusCapCua('bangdan')];
        }
// PLAYER_PART_END s4.cusBangDan.1

// index.html:63468 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusXaToc.1 EDITABLE
function cusXaToc(){   return [9, 13, 15, 17][cusCapCua('bangdan')]; }
// PLAYER_PART_END s4.cusXaToc.1

// index.html:63475 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKhoTran.1 EDITABLE
function cusKhoTran(){  return CUS_KHO_TRAN + 3 * cusCapCua('bangdan'); }
// PLAYER_PART_END s4.cusKhoTran.1

// index.html:63476 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKhoKhung.1 EDITABLE
function cusKhoKhung(){ return Math.round(cusKhoTran() / CUS_KHO_NAP * 60); }
// PLAYER_PART_END s4.cusKhoKhung.1

// index.html:63478 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNoBan.1 EDITABLE
function cusNoBan(){ let c = cusCapCua('no'); return c >= 2 ? 60 : 40; }
// PLAYER_PART_END s4.cusNoBan.1

// index.html:63479 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNoLienTuc.1 EDITABLE
function cusNoLienTuc(){ return false; }
// PLAYER_PART_END s4.cusNoLienTuc.1

// index.html:63485 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TACH_GOC.1 EDITABLE
const CUS_TACH_GOC = 0.105;
// PLAYER_PART_END s4.CUS_TACH_GOC.1

// index.html:63487 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusXaDoc.1 EDITABLE
function cusXaDoc(){ return Math.max(1, canvas.width * (6/23)) / (cusCapCua('tamxa') >= 3 ? 2 : 1); }
// PLAYER_PART_END s4.cusXaDoc.1

// index.html:63488 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusXaTran.1 EDITABLE
function cusXaTran(){ let c = cusCapCua('tamxa'); return c <= 0 ? 1 : (c >= 2 ? 3 : 2); }
// PLAYER_PART_END s4.cusXaTran.1

// index.html:63490 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKXMoc.1 EDITABLE
function cusKXMoc(){  return [0, 6, 4, 3][cusCapCua('khucxa')]; }
// PLAYER_PART_END s4.cusKXMoc.1

// index.html:63491 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKXCong.1 EDITABLE
function cusKXCong(){ return [0, 1, 2, 3][cusCapCua('khucxa')]; }
// PLAYER_PART_END s4.cusKXCong.1

// index.html:63493 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBangMoc.1 EDITABLE
function cusBangMoc(){ return [0, 10, 7, 5][cusCapCua('bang')]; }
// PLAYER_PART_END s4.cusBangMoc.1

// index.html:63504 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusDotNhip.1 EDITABLE
function cusDotNhip(){ return Math.round(60 / Math.max(1, cusCapCua('dot'))); }
// PLAYER_PART_END s4.cusDotNhip.1

// index.html:63505 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusDotSo.1 EDITABLE
function cusDotSo(){   return 3 * Math.max(1, cusCapCua('dot')); }
// PLAYER_PART_END s4.cusDotSo.1

// index.html:63511 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_LZ_DMG.1 EDITABLE
const CUS_LZ_DMG   = [0, 8, 10, 12];
// PLAYER_PART_END s4.CUS_LZ_DMG.1

// index.html:63512 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_LZ_TU.1 EDITABLE
const CUS_LZ_TU    = 60;
// PLAYER_PART_END s4.CUS_LZ_TU.1

// index.html:63513 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_LZ_HOI.1 EDITABLE
const CUS_LZ_HOI   = 60;
// PLAYER_PART_END s4.CUS_LZ_HOI.1

// index.html:63514 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_LZ_CAO.1 EDITABLE
const CUS_LZ_CAO    = 26;
// PLAYER_PART_END s4.CUS_LZ_CAO.1

// index.html:63515 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_LZ_DAN.1 EDITABLE
const CUS_LZ_DAN    = 1;
// PLAYER_PART_END s4.CUS_LZ_DAN.1

// index.html:63516 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_LZ_HOIDAN.1 EDITABLE
const CUS_LZ_HOIDAN = 30;
// PLAYER_PART_END s4.CUS_LZ_HOIDAN.1

// index.html:63517 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_LZ_KNAP.1 EDITABLE
const CUS_LZ_KNAP   = 100;
// PLAYER_PART_END s4.CUS_LZ_KNAP.1

// index.html:63518 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_LZ_KMAX.1 EDITABLE
const CUS_LZ_KMAX   = 3;
// PLAYER_PART_END s4.CUS_LZ_KMAX.1

// index.html:63519 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_LZ_KHOANG.1 EDITABLE
const CUS_LZ_KHOANG = 12;
// PLAYER_PART_END s4.CUS_LZ_KHOANG.1

// index.html:63520 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TOA_XUYEN.1 EDITABLE
const CUS_TOA_XUYEN = [0, 1, 5, 999];
// PLAYER_PART_END s4.CUS_TOA_XUYEN.1

// index.html:63521 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TOA_SO.1 EDITABLE
const CUS_TOA_SO    = 6;
// PLAYER_PART_END s4.CUS_TOA_SO.1

// index.html:63522 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TOA_CM.1 EDITABLE
const CUS_TOA_CM    = 3;
// PLAYER_PART_END s4.CUS_TOA_CM.1

// index.html:63526 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TOA_CM_CAP.1 EDITABLE
const CUS_TOA_CM_CAP = [3, 3, 2.5, 2];
// PLAYER_PART_END s4.CUS_TOA_CM_CAP.1

// index.html:63527 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TOA_DAN.1 EDITABLE
const CUS_TOA_DAN   = 2;
// PLAYER_PART_END s4.CUS_TOA_DAN.1

// index.html:63528 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TOA_CHARGE.1 EDITABLE
const CUS_TOA_CHARGE= [10, 14, 18];
// PLAYER_PART_END s4.CUS_TOA_CHARGE.1

// index.html:63529 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TOA_TOC.1 EDITABLE
const CUS_TOA_TOC   = 11;
// PLAYER_PART_END s4.CUS_TOA_TOC.1

// index.html:63540 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_HX_BIEN.1 EDITABLE
const CUS_HX_BIEN    = 26;
// PLAYER_PART_END s4.CUS_HX_BIEN.1

// index.html:63541 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_HX_TAN.1 EDITABLE
const CUS_HX_TAN     = [0, 0.14, 0.20, 0.20];
// PLAYER_PART_END s4.CUS_HX_TAN.1

// index.html:63542 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_HX_NUT.1 EDITABLE
const CUS_HX_NUT     = 0.20;
// PLAYER_PART_END s4.CUS_HX_NUT.1

// index.html:63543 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_HX_NUT_TO.1 EDITABLE
const CUS_HX_NUT_TO  = 1.5;
// PLAYER_PART_END s4.CUS_HX_NUT_TO.1

// index.html:63550 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TT_ROI.1 EDITABLE
const CUS_TT_ROI   = [0, 0, 0.07, 0.10];
// PLAYER_PART_END s4.CUS_TT_ROI.1

// index.html:63551 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TT_TRUC.1 EDITABLE
const CUS_TT_TRUC  = [0, 720, 600, 540];
// PLAYER_PART_END s4.CUS_TT_TRUC.1

// index.html:63552 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TT_DMG.1 EDITABLE
const CUS_TT_DMG   = 10;
// PLAYER_PART_END s4.CUS_TT_DMG.1

// index.html:63553 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TT_BAN.1 EDITABLE
const CUS_TT_BAN   = 74;
// PLAYER_PART_END s4.CUS_TT_BAN.1

// index.html:63554 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TT_TRAN.1 EDITABLE
const CUS_TT_TRAN  = 2;
// PLAYER_PART_END s4.CUS_TT_TRAN.1

// index.html:63555 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TT_HOMW.1 EDITABLE
const CUS_TT_HOMW  = 22, CUS_TT_HOMH = 18;
// PLAYER_PART_END s4.CUS_TT_HOMW.1

// index.html:63559 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMauDan.1 EDITABLE
function cusMauDan(){
            if (typeof cusCapCua !== 'function') return ["#90A4AE", "#ECEFF1", "#B0BEC5"];
            if (cusCapCua('no')     > 0) return ["#FF7043", "#FFCCBC", "#FF5722"];
            if (cusCapCua('dot')    > 0) return ["#FFA726", "#FFE082", "#FF6D00"];
            if (cusCapCua('bang')   > 0) return ["#4FC3F7", "#E1F5FE", "#29B6F6"];
            if (cusCapCua('khucxa') > 0) return ["#BA68C8", "#F3E5F5", "#AB47BC"];
            if (cusCapCua('supply') > 0) return ["#9CCC65", "#F1F8E9", "#7CB342"];
            if (cusCapCua('khaicuoc') > 0) return ["#EF5350", "#FFEBEE", "#E53935"];   // @@HE-CUSHE3
            if (cusCapCua('tamnhan')  > 0) return ["#26C6DA", "#E0F7FA", "#00ACC1"];
            if (cusCapCua('stand')    > 0) return ["#B39DDB", "#EDE7F6", "#7E57C2"];
            if (cusCapCua('vocuc')    > 0) return ["#FFD740", "#FFF8E1", "#FFAB00"];   // @@HE-VOCUC
            if (cusCapCua('phitieu')  > 0) return ["#CFD8DC", "#FFFFFF", "#C62828"];
            if (cusCapCua('kiemvu')   > 0) return ["#80DEEA", "#FFFFFF", "#26C6DA"];
            return ["#90A4AE", "#ECEFF1", "#B0BEC5"];
        }
// PLAYER_PART_END s4.cusMauDan.1

// index.html:63574 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusLaserBat.1 EDITABLE
function cusLaserBat(){ return cusCapCua('laser') > 0; }
// PLAYER_PART_END s4.cusLaserBat.1

// index.html:63575 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusHelixBat.1 EDITABLE
function cusHelixBat(){ return cusCapCua('helix') > 0; }
// PLAYER_PART_END s4.cusHelixBat.1

// index.html:63576 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTTBat.1 EDITABLE
function cusTTBat(){    return cusCapCua('supply') > 0; }
// PLAYER_PART_END s4.cusTTBat.1

// index.html:63577 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusToaBat.1 EDITABLE
function cusToaBat(){   return cusCapCua('toa')   > 0; }
// PLAYER_PART_END s4.cusToaBat.1

// index.html:63603 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_CM.1 EDITABLE
const CUS_QD_CM     = 4;
// PLAYER_PART_END s4.CUS_QD_CM.1

// index.html:63604 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_TOC.1 EDITABLE
const CUS_QD_TOC    = [0, 0.085, 0.125, 0.125];
// PLAYER_PART_END s4.CUS_QD_TOC.1

// index.html:63605 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_GHE.1 EDITABLE
const CUS_QD_GHE    = 0.16;
// PLAYER_PART_END s4.CUS_QD_GHE.1

// index.html:63614 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_DAN.1 EDITABLE
const CUS_QD_DAN    = 4;
// PLAYER_PART_END s4.CUS_QD_DAN.1

// index.html:63619 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_TOCBAN.1 EDITABLE
const CUS_QD_TOCBAN = 4;
// PLAYER_PART_END s4.CUS_QD_TOCBAN.1

// index.html:63627 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_HOIDAN.1 EDITABLE
const CUS_QD_HOIDAN = [0, 20, 15, 15];
// PLAYER_PART_END s4.CUS_QD_HOIDAN.1

// index.html:63633 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_KHOA.1 EDITABLE
const CUS_QD_KHOA   = 8;
// PLAYER_PART_END s4.CUS_QD_KHOA.1

// index.html:63634 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_R.1 EDITABLE
const CUS_QD_R      = 13;
// PLAYER_PART_END s4.CUS_QD_R.1

// index.html:63635 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_RCUI.1 EDITABLE
const CUS_QD_RCUI   = 9;
// PLAYER_PART_END s4.CUS_QD_RCUI.1
