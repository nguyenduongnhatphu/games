// PLAYER_FILE: PowersAndAccessories01
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: BUA_CAO, BUA_TRUOC, DO_VO_VAT, Effect, FloatingText, LT, Projectile, SDT_CONG, SFX, STYLE_RANKS, _dtBoom, _dtProj, _dtSeq, _dtSet, _dtSoDan, activeLightnings, allTargets, bossProjectiles, bosses, camX, camY, canvas, chanLongBat, checkAABB, clNhan, clNhanTat, clNhanTick, clNhanVe, ctx, currentAmmoType, currentForm, currentPower, cutBossProjectiles, dealDamage, deoPhu, dino, dragCau, dragTick, dragVe, dragVeRong, dragonBat, dtLaCanChien, enemies, floatingTexts, frames, gameState, hasRune, hudChu, hudHangDragon, hvBoPhapNo, hvBoPhapTick, katBat, projectiles, score, sdtDangBat, sdtDuDieuKien, sdtKichHoat, shakeTimer, styleRankNow, visualEffects, worldL, worldR
// index.html:83214 · Phạm vi: global
// PLAYER_PART_BEGIN s6.PHU_KIEN.1 EDITABLE
const PHU_KIEN = [
            { id: 'none',   ten: 'KHÔNG',          tenEn: 'NONE' },
            { id: 'kimco',  ten: 'VÒNG KIM CÔ',    tenEn: 'GOLDEN CIRCLET', mo: 'Đỡ đòn thành công để lại phân ảnh. Kẻ địch đi qua thì nổ, 1 sát thương.', moEn: 'A successful parry leaves an afterimage. An enemy that walks through it explodes for 1 damage.' },
            { id: 'mien',   ten: 'VƯƠNG MIỆN',     tenEn: 'CROWN',          mo: 'Điểm chạy bắt đầu từ x3, trần lên x10.', moEn: 'Run score starts at x3 and caps at x10.' },
            { id: 'kabuto', ten: 'MŨ SAMURAI',     tenEn: 'KABUTO',         mo: 'Mũ samurai. +1 máu.', moEn: 'Samurai helmet. +1 HP.' },
            { id: 'giap',   ten: 'GIÁP NGỰC',      tenEn: 'CHEST ARMOR',    mo: 'Giáp ngực. +1 máu.', moEn: 'Chest plate. +1 HP.' },
            { id: 'khan',   ten: 'KHĂN QUÀNG',     tenEn: 'SCARF',          mo: 'Khi lướt, bất tử lâu hơn 2 khung hình.', moEn: 'Dashes stay invincible for 2 more frames.' },
            { id: 'lua',    ten: 'TÊN LỬA',        tenEn: 'ROCKET',         mo: 'Ống tên lửa buộc sau lưng. Dash thì phụt lửa ra sau.', moEn: 'A rocket strapped to the back. Dash and it spits fire behind you.' },
            { id: 'vit',    ten: 'VỊT CAO SU',     tenEn: 'RUBBER DUCK',    mo: 'Rơi hố không mất máu, một lần mỗi 10 giây.', moEn: 'No pit damage, once every 10 seconds.' }
        ];
// PLAYER_PART_END s6.PHU_KIEN.1

// index.html:83224 · Phạm vi: global
// PLAYER_PART_BEGIN s6.phuKien.1 EDITABLE
let phuKien = Math.max(0, Math.min(PHU_KIEN.length - 1, parseInt(localStorage.getItem("dino_phukien")) || 0));
// PLAYER_PART_END s6.phuKien.1

// index.html:83235 · Phạm vi: global
// PLAYER_PART_BEGIN s6.mauPhu.1 EDITABLE
function mauPhu(){ return (deoPhu('giap') || deoPhu('kabuto')) ? 1 : 0; }
// PLAYER_PART_END s6.mauPhu.1

// index.html:85546 · Phạm vi: global
// PLAYER_PART_BEGIN s6.POWERS.1 EDITABLE
const POWERS = [
            { id:'base', ten:'STANCE',  tenEn:'STANCE', mau:'#FF8F00',
              mo:'Ba thế Gunslinger / Trickster / Royal Guard, đổi bằng I / O ngay trong trận. Lướt có khung miễn thương, khiên đỡ đòn và phản đòn.',
              moEn:'Three stances swapped with I / O mid-fight. The dash has invulnerability frames, and the shield blocks and parries.' },
            { id:'void', ten:'VOID',    tenEn:'VOID', mau:'#B388FF',
              mo:'Lướt và nhảy đều thành DỊCH CHUYỂN, đổi lại MẤT khung miễn thương — nó là công cụ định vị chứ không phải nút thoát hiểm. Trên không chỉ dịch chuyển XUỐNG. Khiên hết parry, thành CỔNG KHÔNG GIAN: phản ngược đạn địch, kẻ lao tới thì xuyên qua rồi hiện sau lưng bạn.',
              moEn:'Both dash and jump become TELEPORTS — you vanish here and appear there, leaving nothing behind. In exchange you lose the invulnerability frames, so it is a positioning tool rather than an escape button. You cannot teleport sideways in the air, but holding S and dashing TELEPORTS YOU DOWN to the nearest floor. The shield can no longer parry; it becomes a SPATIAL GATE that reflects enemy bullets back and lets charging enemies pass through and reappear behind you. No stance switching in this Power.' }
            ,
            { id:'dragon', ten:'DRAGON TRIGGER', tenEn:'DRAGON TRIGGER', mau:'#FF5252',
              mo:'Đánh trúng thì tích NỘ. Nộ đầy bấm I hoặc O để biến hình 10 giây: một thực thể rồng hiện ra bên bạn, và nó khác nhau tuỳ vũ khí.\n\nCẦM VŨ KHÍ CẬN CHIẾN (Kiếm, Giáo, Búa) — một PHÂN THÂN bóng lửa nấp sau lưng, chép lại NGUYÊN CHUỖI combo bạn đánh sau một nhịp trễ, cầm đúng cây vũ khí của bạn, 1-2 sát thương mỗi nhát. Mỗi lần ra đòn nó lao vọt lên trước mặt bạn rồi lui về.\n\nCẦM ĐẠN BẮN — một dáng RỒNG mờ to hơn bạn, lượn lơ lửng phía trên và nghiêng mình theo thế bay. Nó không đọc gì từ loại đạn bạn cầm: cứ 1.2 giây phun một quả cầu lửa vào mục tiêu gần nhất, nổ diện rộng 6 sát thương tại điểm chạm. Nhờ vậy nó mạnh ngang nhau ở cả chín loại đạn.\n\nCòn dưới 5 giây, Rồng ngậm lửa nạp 2 giây rồi phun LONG VIÊM PHÁ ĐỊA — một dải lửa kè sát mặt đất quét ngang bản đồ, 8 sát thương khi chạm và để lại vệt cháy thiêu thêm tối đa 8 nữa.\n\nSHIN DRAGON TRIGGER — đang biến hình mà đạt hạng S trở lên thì bấm I hoặc O lần nữa để lên nấc hai. Không reset đồng hồ mà CỘNG THÊM: S +1 giây, SS +2, SSS +3. Trần cũng leo theo hạng: S 10 giây, SS 11, SSS 12. Bạn mọc cánh, mang tạo hình rồng, và mở ra một bộ chiêu riêng KHÔNG đụng gì tới đạn đang cầm: lướt rồi giữ phím tới = LONG KHOAN, bạn hoá thành một mũi khoan đâm xuyên qua địch, lái tự do mọi hướng bằng phím di chuyển và miễn thương suốt cú khoan; mỗi giây đâm 5 sát thương lên từng mục tiêu, không giới hạn số lần, cắm càng lâu càng ăn; thả hết phím thì XOÈ CÁNH, nổ 10 sát thương quanh mình và bạt cả đạn boss. ↓↓ = dậm đất 5 sát thương, miễn thương nhẹ; ↑↑↓ = vọt lên rồi đập xuống 10 sát thương, miễn thương trung bình. Trên không giữ phím nhảy thì LƯỢN xuống chậm. Nộ chiêu cuối hồi cực nhanh, và thoát dạng này hồi 1 HP.',
              moEn:'Landing hits builds RAGE. When it is full press I or O to transform for 10 seconds: a dragon entity joins you, and it differs by weapon. On MELEE a shadow clone replays your entire combo string after a short delay, holding your actual weapon, lunging in front of you on every hit. On RANGED a translucent DRAGON larger than you hovers above, tilted in flight, and spits a fireball every 1.2 seconds at the nearest target for 6 area damage on impact — identical output across all nine ranged ammo. Below 5 seconds left it charges for 2 seconds and breathes a ground-hugging flame sweep for 8, leaving burning ground worth up to 8 more. At rank S or above, press I or O again for SHIN DRAGON TRIGGER: +1/+2/+3 seconds added (cap 10s, or 12s entering at SSS), dragon form with wings, and an ammo-independent moveset — dash and hold forward to become a DRILL that pierces enemies, steers freely in any direction, is invulnerable throughout and stabs each target for 5 damage every second with no hit limit; release every key to FLARE YOUR WINGS, blasting everything around you for 10 and sweeping away boss bullets. Down-down stomps for 5 with light i-frames, up-up-down rises and slams for 10 with medium i-frames, and holding jump in the air makes you glide. Ultimate charges very fast, and leaving the form restores 1 HP. On ranged weapons it fires an energy bolt for 2 damage on a 1 second cooldown — holding a charge makes it STORE shots, up to 3 fired at once. On melee it repeats the move itself for 1 to 2 damage. No stance switching in this Power.' }
            ,
            { id:'x', ten:'X', tenEn:'X', mau:'#42A5F5', runeMo:true,   // chon o muc DANG (xDatForm), khong bam tay o bang Power
              mo:'Hóa thành Mega Man X. Đạn và Rune khóa. 10 máu.\nJ bắn hệ đang cầm. K nạp hệ đó. I / O đổi hệ. Q / E mở bảng chọn giáp và tạm dừng. Giáp hao 1 năng lượng/giây; Ultimate hao 5/giây. Có thể về X thường để ngừng hao và hồi năng lượng.\nUltimate Armor khi còn năng lượng gần như không mất máu, và U (Nova Strike) bấm lại gần như ngay.',
              moEn:'Become Mega Man X. Ammo and Runes are locked. 10 HP. J fires the current weapon, K charges it, I / O swap weapons, Q / E pauses and opens armor selection. Armor drains 1 energy/s, Ultimate 5/s; base X stops the drain and regenerates energy. Ultimate Armor is nearly invincible while powered, and Nova Strike can be fired again almost immediately.' }
        ];
// PLAYER_PART_END s6.POWERS.1

// index.html:86070 · Phạm vi: global
// PLAYER_PART_BEGIN s6.POWERS.push.1 EDITABLE
POWERS.push({ id:'wukong', ten:'SON WUKONG', tenEn:'SON WUKONG', mau:'#D6A43C', runeMo:true,
            mo:'Chỉ bật khi đeo rune SON WUKONG với GIÁO. Thế đánh khoá ở GUNSLINGER. NHẢY thành LẬP CÔN — cắm gậy xuống đất rồi đứng lên ngọn, ba nấc. LƯỚT khi đang trên gậy thành CÂN ĐẨU VÂN — bay tự do 5 giây. KHIÊN thành XOAY CÔN — quay gậy chặn đạn, càng chặn nhiều thì đòn kết càng nặng.',
            moEn:'Only active with the SON WUKONG rune on the SPEAR. Stance is locked to GUNSLINGER. JUMP becomes PILLAR — plant the staff and stand on its tip, three tiers. DASH while perched becomes the SOMERSAULT CLOUD — 5 seconds of free flight. The SHIELD becomes SPIN — twirl the staff to cut bullets; the more you block, the heavier the finisher.' });
// PLAYER_PART_END s6.POWERS.push.1

// index.html:86075 · Phạm vi: global
// PLAYER_PART_BEGIN s6.POWERS.push.2 EDITABLE
POWERS.push({ id:'musou', ten:'MUSOU', tenEn:'MUSOU', mau:'#FF5252', runeMo:true,
            mo:'Chỉ bật khi đeo rune TRIDENT với GIÁO. Thế đánh khoá ở GUNSLINGER. I: tụ lực 0.2 giây, loé sáng rồi ĐÂM XUYÊN 6 sát thương, bất tử lúc đâm. O: HÀO QUANG ĐỎ — mỗi nấc +1 sát thương cho MỌI đòn. Gây 20 sát thương được 1 nấc, giữ tối đa 3; bấm O nhiều lần thì cộng dồn (tối đa +3), kéo dài 10 giây.',
            moEn:'Only active with the TRIDENT rune on the SPEAR. Stance is locked to GUNSLINGER. I: focus for 0.2s, flash, then a PIERCING THRUST for 6, invulnerable while thrusting. O: RED AURA — every stack adds +1 to EVERY hit. Deal 20 damage to earn a stack, hold up to 3; press O again to stack them (up to +3), lasting 10 seconds.' });
// PLAYER_PART_END s6.POWERS.push.2

// index.html:86080 · Phạm vi: global
// PLAYER_PART_BEGIN s6.POWERS.push.3 EDITABLE
POWERS.push({ id:'death', ten:'DEATH', tenEn:'DEATH', mau:'#AB47BC', runeMo:true,
            mo:'Chỉ bật khi cầm LƯỠI HÁI. Thế đánh khoá ở GUNSLINGER. Đánh trúng thì tích NỘ. Nộ đầy bấm I hoặc O: HIỆN THÂN THẦN CHẾT 10 giây — chém nhanh hơn, thu hồi nhanh hơn, thần chết đi theo, cúi J có thêm nhát của thần chết. Đang hiện thân mà đạt hạng S trở lên thì bấm I/O lần nữa: THẦN CHẾT GIÁNG THẾ — mọi đòn +1 sát thương, tầm x1.3, cộng thêm giờ theo hạng.',
            moEn:'Only active while holding the REAPER SCYTHE. Stance is locked to GUNSLINGER. Hits build RAGE. At full rage press I or O: DEATH MANIFEST for 10 seconds — faster cuts, faster recovery, the Reaper follows you, and crouch J adds a Reaper strike. While manifested at rank S or higher press I/O again: DEATH INCARNATE — +1 damage on every hit, 1.3x reach, extra time by rank.' });
// PLAYER_PART_END s6.POWERS.push.3

// index.html:86095 · Phạm vi: global
// PLAYER_PART_BEGIN s6.DT_DAI.1 EDITABLE
const DT_DAI = 600, DT_NO_MAX = 100, DT_TRE = 14, DT_CD = 60, DT_NAP_MAX = 3;
// PLAYER_PART_END s6.DT_DAI.1

// index.html:86097 · Phạm vi: global
// PLAYER_PART_BEGIN s6.DT_SAU.1 EDITABLE
const DT_SAU = 64, DT_TRUOC = 86;
// PLAYER_PART_END s6.DT_SAU.1

// index.html:86105 · Phạm vi: global
// PLAYER_PART_BEGIN s6.DT_THAN_PAL.1 EDITABLE
const DT_THAN_PAL = { bd:"#2A0710", hd:"#3D0A16", dk:"#150309", lt:"#7A1420", foot:"#140206",
                              spk:"#FF6E40", out:"#FF5722", rim:"#FFAB40", eye:"#FFE0B2", pup:"#FF3D00",
                              aura:null, crest:4 };
// PLAYER_PART_END s6.DT_THAN_PAL.1

// index.html:86110 · Phạm vi: global
// PLAYER_PART_BEGIN s6.DT_THAN_PAL_KAT.1 EDITABLE
const DT_THAN_PAL_KAT = { bd:"#0B1533", hd:"#12204A", dk:"#060B1E", lt:"#1E3A7A", foot:"#050916",
                                  spk:"#4FC3F7", out:"#2979FF", rim:"#82B1FF", eye:"#E1F5FE", pup:"#00B0FF",
                                  aura:null, crest:4 };
// PLAYER_PART_END s6.DT_THAN_PAL_KAT.1

// index.html:86113 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtLaKatana.1 EDITABLE
function dtLaKatana(){ return typeof katBat === 'function' && katBat(currentAmmoType); }
// PLAYER_PART_END s6.dtLaKatana.1

// index.html:86114 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtPalNow.1 EDITABLE
function dtPalNow(){ return dtLaKatana() ? DT_THAN_PAL_KAT : DT_THAN_PAL; }
// PLAYER_PART_END s6.dtPalNow.1

// index.html:86117 · Phạm vi: global
// PLAYER_PART_BEGIN s6.DT_MAU_XANH.1 EDITABLE
const DT_MAU_XANH = { "#FF3D00":"#2979FF", "#FF5722":"#2979FF", "#E64A19":"#1565C0",
                              "#FF6E40":"#4FC3F7", "#FFAB40":"#82B1FF", "#FFE0B2":"#E1F5FE",
                              "#2E0812":"#071026", "#3D0A16":"#12204A", "#7A1420":"#1E3A7A",
                              "#FF8A65":"#81D4FA", "#FFD180":"#B3E5FC", "#BF360C":"#0D47A1" };
// PLAYER_PART_END s6.DT_MAU_XANH.1

// index.html:86121 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtMau.1 EDITABLE
function dtMau(c){ return dtLaKatana() ? (DT_MAU_XANH[c] || c) : c; }
// PLAYER_PART_END s6.dtMau.1

// index.html:86122 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtNo.1 EDITABLE
let dtNo = 0, dtT = 0, dtClone = null, dtCd = 0, dtNap = 0, dtBang = [];
// PLAYER_PART_END s6.dtNo.1

// index.html:86132 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtDoBan.1 EDITABLE
function dtDoBan(){
            let co = false;
            // dan bay: dem SO PHAT, khong dem do dai mang
            if (_dtSoDan > _dtProj) co = true;
            _dtProj = _dtSoDan;
            // NGUON LIEN TUC (luong lua Inferno, laser chum): dang phun/dang ban thi khung
            // nao cung tinh la dang tan cong. Neu chi tinh mot lan luc bat dau thi mot luong
            // lua ba giay chi doi lay MOT vien cua phan than — do 10 giay chi duoc 20 sat
            // thuong trong khi moi loai khac duoc ~56. Cooldown 1 giay cua phan than van la
            // thu chan tran, nen tinh moi khung khong he lam no vuot muc.
            if (dino.fireBreathTimer > 0 || dino.laserActiveTimer > 0) co = true;
            // VOLT — day set
            let nSet = (typeof activeLightnings !== 'undefined') ? activeLightnings.length : 0;
            if (nSet > _dtSet) co = true;
            _dtSet = nSet;
            // BOOMERANG — luoi quay cung khong di qua mang `projectiles`, no o mang rieng.
            let nBoom = dino.boomThrowCount || 0;
            if (nBoom > _dtBoom) co = true;
            _dtBoom = nBoom;
            return co;
        }
// PLAYER_PART_END s6.dtDoBan.1

// index.html:86154 · Phạm vi: global
// PLAYER_PART_BEGIN s6.powerChonTay.1 EDITABLE
function powerChonTay(){ return POWERS.filter(p => !p.runeMo).length; }
// PLAYER_PART_END s6.powerChonTay.1

// index.html:86156 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtCongNo.1 EDITABLE
function dtCongNo(n){ if (dragonBat() && dtT <= 0) dtNo = Math.min(DT_NO_MAX, dtNo + n); }
// PLAYER_PART_END s6.dtCongNo.1

// index.html:86158 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtNhanPhim.1 EDITABLE
function dtNhanPhim(){
            if (!dragonBat()) return false;
            if (sdtDuDieuKien() && sdtKichHoat()) return true;
            return dtKichHoat();
        }
// PLAYER_PART_END s6.dtNhanPhim.1

// index.html:86164 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtChupPose.1 EDITABLE
function dtChupPose(){
            if (currentAmmoType === 5)
                return { kieu:5, kiem: dino.swordPose ? { kind: dino.swordPose.kind, t0: dino.swordPose.t0,
                                                          t: dino.swordPose.t, from: dino.swordPose.from } : null,
                         dir: dino.isFacingLeft ? -1 : 1 };
            if (currentAmmoType === 10 && dino.giaoVK)
                return { kieu:10, ang: dino.giaoVK.ang, ext: dino.giaoVK.ext, dir: dino.isFacingLeft ? -1 : 1 };
            if (currentAmmoType === 11 && dino.buaVK)
                return { kieu:11, ang: dino.buaVK.ang, ext: dino.buaVK.ext, dir: dino.isFacingLeft ? -1 : 1 };
            return null;
        }
// PLAYER_PART_END s6.dtChupPose.1

// index.html:86175 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtKichHoat.1 EDITABLE
function dtKichHoat(){
            if (!dragonBat() || dtT > 0 || dtNo < DT_NO_MAX) return false;
            if (typeof dino === 'undefined' || !dino) return false;
            dtNo = 0; dtT = DT_DAI; dtCd = 0; dtNap = 0; dtBang = [];
            let d = dino.isFacingLeft ? 1 : -1;
            dtClone = { x: dino.x + d * DT_SAU, y: dino.y, w: dino.w, h: dino.h,
                        left: dino.isFacingLeft, t: 0, atk: null, lastSeq: 0, pose: null,
                        tan: 0, hienT: 0 };
            floatingTexts.push(new FloatingText(dino.x - 44, dino.y - 40, "DRAGON TRIGGER!"));
            if (chanLongBat())
                floatingTexts.push(new FloatingText(dino.x - 36, dino.y - 58,
                    dtLaCanChien(currentAmmoType) ? "CHÂN THÂN!" : "CHÂN LONG!"));
            shakeTimer = Math.max(shakeTimer, 22);
            for (let k = 0; k < 10; k++)
                visualEffects.push(new Effect(dino.x + dino.w/2 + (Math.random()-0.5)*70,
                                              dino.y + dino.h/2 + (Math.random()-0.5)*60, 'explosion', true, 20));
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(110, 0.5, 'sawtooth', 0.30, 60); SFX.tone(880, 0.3, 'square', 0.16, 1800); }
            return true;
        }
// PLAYER_PART_END s6.dtKichHoat.1

// index.html:86194 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtTick.1 EDITABLE
function dtTick(){
            if (!dragonBat()) { dtT = 0; dtClone = null; clNhanTat(); if (typeof dino !== 'undefined' && dino) dino._dtDon = null; return; }
            if (typeof dino === 'undefined' || !dino) return;
            if (dtCd > 0) dtCd--;
            if (dtT <= 0){
                dtClone = null; if (clNhan) clNhanTat();
                // Ngoai DT thanh NO cung phai dung CHUNG bo do — neu khong thi ba loai dan kia
                // vua khong trieu duoc phan than, vua len no cham hon moi loai con lai.
                if (dtDoBan()) dtCongNo(2);
                let _don = dino._dtDon;
                if (_don && _don.seq !== _dtSeq){ _dtSeq = _don.seq; dtCongNo(3); }
                else if (dino.slashAtk && dino.slashAtk.seq !== _dtSeq){ _dtSeq = dino.slashAtk.seq; dtCongNo(3); }
                if (_don) dino._dtDon = null;
                return;
            }
            dtT--;
            if (dtT === 0){
                if (dtClone) visualEffects.push(new Effect(dtClone.x + dino.w/2, dtClone.y + dino.h/2, 'explosion', true, 30));
                    dtClone = null; dtBang = []; clNhanTat();
                dragCau.length = 0;   // dai lua va vet chay VAN chay tiep cho het
                floatingTexts.push(new FloatingText(dino.x - 30, dino.y - 34, "HẾT DRAGON"));
                return;
            }
            let c = dtClone; if (!c) return;
            c.t++; if (c.hienT < 20) c.hienT++;
            // ===== HAI DANG PHAN THAN =====
            // CAN CHIEN (Kiem/Giao/Bua): giu co che CHEP DON — do dac 4 nhip bam khac nhau
            // deu cho +45~75%, tuc no von da phang san.
            // TAM XA: bo han co che chep. Ly do do duoc: san luong cua phan than khi do bi
            // buoc vao cach TUNG loai dan sinh dan, ma moi loai lai sinh mot kieu — Boomerang
            // dem luc NEM chu khong phai luc bay ve, Pulsar ban ra la xoa ngay, Inferno khong
            // co vien dan nao ca. Cu vá tung loai thi lai lech kieu khac. Nen doi han sang
            // mot DANG RONG tu ban theo chu ky co dinh: khong doc gi tu loai dan nua thi
            // khong con gi de lech.
            if (!dtLaCanChien(currentAmmoType)){ clNhanTat(); dragTick(c); return; }
            // @@HE-RONGDT — DOI SANG VU KHI CAN CHIEN GIUA LUC RONG DANG NAP LUA.
            // Chi xay ra khi deo UNITY: bam Q/E giua lan bien hinh thi hien than doi ngay tu
            // RONG sang PHAN THAN NGUOI. Do duoc: dong ho nap dung yen o 104 khung va khong
            // bao gio chay tiep, vi dragTick chi chay o dan tam xa — quay lai dan ban thi no
            // tiep tuc dem tu 104, ma luc do thuong khong con du gio, nen don ket bien mat
            // khong mot loi bao. Gio doi sang can chien la HUY cu nap, va con duoi 5 giay thi
            // no tu nap lai tu dau khi ban quay ve dan ban. Da khac lua roi thi thoi.
            if (c.nap > 0 || c.daKet){ c.nap = 0; c.daKet = 0; }

            // ===== BANG GHI: moi khung ghi lai TOAN BO trang thai danh cua nguoi choi =====
            // Ghi ca don danh (slashAtk day du) lan tu the vu khi lan phat ban. Nho vay mot
            // chuoi combo 5 nhat se thanh 5 ban ghi lien tiep, va phan than dien lai DU CA 5
            // thay vi chi mot cu choc roi thoi nhu ban truoc.
            // @@HE-CHANLONG — RUNE CHAN LONG: phan than BO HAN co che chep don. No khong
            // doi nguoi choi bam nua ma tu di tim ke dich va tu ra don theo nhip rieng.
            if (chanLongBat()){ if (dino) dino._dtDon = null; clNhanTick(c); return; }
            clNhanTat();
            {
            let ban = dtDoBan();
            let don = dino._dtDon;
            let A = don ? null : dino.slashAtk;
            dtBang.push({
                x: dino.x, y: dino.y, left: dino.isFacingLeft, tren: !dino.grounded,
                pose: dtChupPose(), ban: ban,
                seq: don ? don.seq : (A ? A.seq : 0),
                atk: don ? don.atk : (A ? { dir:A.dir, reach:A.reach, hTop:A.hTop, hBot:A.hBot, spin:A.spin,
                           goc:A.goc, tam:A.tam, t:A.t0 || A.t, base:A.base, fx:A.fx } : null)
            });
            if (don) dino._dtDon = null;
            if (dtBang.length > DT_TRE){
                let f = dtBang.shift();
                c.left = f.left; c.pose = f.pose; c.tren = f.tren;
                let d = f.left ? -1 : 1;
                // DANG DANH -> lao vot len TRUOC MAT nguoi choi. RANH -> lui lai nap sau lung.
                let danh = c.tan > 0;
                let dich = danh ? (f.x + d * DT_TRUOC) : (f.x - d * DT_SAU);
                let k = danh ? 0.40 : 0.15;
                c.x += (dich - c.x) * k;
                c.y += ((f.y - 5) - c.y) * (danh ? 0.46 : 0.18);
                if (f.seq && f.seq !== c.lastSeq){ c.lastSeq = f.seq; dtRaDonCan(c, f.atk); }
                if (f.ban) dtBanXa(c);
            }
            }
            if (c.tan > 0) c.tan--;

            // ===== VUNG DANH CUA PHAN THAN — chay dong ho RIENG, dung do dai that cua don =====
            if (c.atk){
                let a = c.atk, sr = dtVungDanh(c, a);
                if (sr){
                    let mot = (o, isBoss) => {
                        if (!o || o.hp === undefined || o.hp <= 0 || (isBoss && o.invulnAll)) return;
                        if (a.hit.has(o) || !checkAABB(sr, o)) return;
                        a.hit.add(o);
                        if (typeof dealDamage === 'function') dealDamage(o, a.dmg, 'ammo'); else o.hp -= a.dmg;
                        visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 16));
                        if (gameState !== 'pvp') score += 1;
                    };
                    if (typeof allTargets === 'function') allTargets().forEach(o => mot(o, bosses.indexOf(o) >= 0));
                    if (typeof cutBossProjectiles === 'function' && a.base >= 3) cutBossProjectiles(sr);
                }
                a.t--; if (a.t <= 0) c.atk = null;
            }
        }
// PLAYER_PART_END s6.dtTick.1

// index.html:86293 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtVungDanh.1 EDITABLE
function dtVungDanh(c, a){
            let cx = c.x + dino.w/2, cy = c.y + dino.h/2;
            if (a.goc !== undefined && a.tam !== undefined){
                let tx = cx + Math.cos(a.goc) * a.tam, ty = cy + Math.sin(a.goc) * a.tam;
                return { x: Math.min(cx,tx)-20, y: Math.min(cy,ty)-22,
                         w: Math.abs(tx-cx)+40, h: Math.abs(ty-cy)+44 };
            }
            if (a.spin) return { x: cx - a.spin, y: cy - a.spin, w: a.spin*2, h: a.spin*2 };
            let R = Math.max(8, a.reach || 60);
            return a.dir === 1 ? { x: c.x + dino.w - 5, y: c.y - a.hTop, w: R, h: dino.h + a.hTop + a.hBot }
                               : { x: c.x + 5 - R,      y: c.y - a.hTop, w: R, h: dino.h + a.hTop + a.hBot };
        }
// PLAYER_PART_END s6.dtVungDanh.1

// index.html:86306 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtRaDonCan.1 EDITABLE
function dtRaDonCan(c, a){
            if (!a) return;
            c.tan = Math.max(c.tan, (a.t || 12) + 10);
            // Hoat anh vet chem Y HET nguoi choi nhung mang mau phan than (tint 'dragon')
            if (a.fx){
                try {
                    let e = new Effect(c.x + dino.w/2, c.y + dino.h/2, a.fx.kind, a.fx.isLeft, a.fx.R);
                    e.follow = c; e.tint = 'dragon';
                    visualEffects.push(e);
                } catch(err){}
            }
            // dmg: don thuong 1, don dac biet 2 (goc tu 3 dmg tro len = don dac biet)
            c.atk = Object.assign({}, a, { dmg: (a.base >= 3 ? 2 : 1), hit: new Set(), t: a.t || 12 });
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(400, 0.06, 'square', 0.11, 760);
        }
// PLAYER_PART_END s6.dtRaDonCan.1

// index.html:86322 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtBanXa.1 EDITABLE
function dtBanXa(c){
            if (dtCd > 0){ dtNap = Math.min(DT_NAP_MAX, dtNap + 1); return; }
            let so = Math.max(1, dtNap || 1); dtNap = 0; dtCd = DT_CD;
            let dir = c.left ? -1 : 1, cx = c.x + dino.w/2, cy = c.y + dino.h/2;
            for (let k = 0; k < so; k++){
                try {
                    let pr = new Projectile(cx, cy + (k - (so-1)/2) * 13, 2, 0, 0, 0, dir, 1);
                    pr.speed = Math.abs(pr.speed || 14) * dir; pr.vy = 0;
                    pr._dt = 1;
                    projectiles.push(pr);
                } catch(e){}
            }
            _dtProj = _dtSoDan;
            c.tan = Math.max(c.tan, 10);
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1050, 0.08, 'square', 0.15, 1900);
        }
// PLAYER_PART_END s6.dtBanXa.1

// index.html:87463 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtVe.1 EDITABLE
function dtVe(){
            if (!dragonBat()) return;
            // THANH NO
            // Thanh NO dat NGAY DUOI thanh chieu cuoi (120,95,120x11) va dung chung le trai
            // /be ngang voi no, thay vi moc rieng mot cho o goc trai.
            // @@HE-DRAGON — THANH NO phai ve o TOA DO MAN HINH.
            // dtVe() duoc goi SAU ctx.translate(-camX,-camY), tuc dang o he toa do THE GIOI.
            // Vi the thanh nay truoc gio troi tu do theo camera — camY = -160 nen no tut han
            // xuong gan day man hinh, "moc rieng mot cho" dung nhu vay. Go camera ra trong
            // dung doan ve thanh, phan ve phan than/rong o duoi van giu he the gioi.
            ctx.save(); ctx.translate(camX, camY);
            let dtHudY = hudHangDragon();
            if (dtT <= 0 && dtNo > 0){
                let x = 120, y = dtHudY, w = 120, h = 9;
                ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(x, y, w, h);
                ctx.fillStyle = dtNo >= DT_NO_MAX ? '#FF5252' : '#8D6E63';
                ctx.fillRect(x, y, w * (dtNo / DT_NO_MAX), h);
                ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
                ctx.font = 'bold 9px Consolas, monospace'; ctx.textAlign = 'left';
                hudChu(dtNo >= DT_NO_MAX ? LT('NỘ ĐẦY — I/O', 'RAGE — I/O') : LT('NỘ', 'RAGE'), 20, y + 7,
                       dtNo >= DT_NO_MAX ? '#FFAB91' : '#D7CCC8');
            }
            if (dtT > 0){
                let x = 120, y = dtHudY, w = 120, h = 9;
                ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(x, y, w, h);
                ctx.fillStyle = '#FF5252'; ctx.fillRect(x, y, w * (dtT / DT_DAI), h);
                ctx.font = 'bold 9px Consolas, monospace'; ctx.textAlign = 'left';
                let _shin = (typeof sdtDangBat === 'function' && sdtDangBat());
                hudChu((_shin ? 'SHIN' : 'DRAGON') + ' ' + (dtT / 60).toFixed(1) + 's', 20, y + 7, '#FFAB91');
                if (!_shin && typeof sdtDuDieuKien === 'function' && sdtDuDieuKien()){
                    hudChu(LT('▲ ' + STYLE_RANKS[styleRankNow()] + ' — I/O LÊN SHIN +'
                                  + (SDT_CONG[styleRankNow()] / 60) + 's',
                                  '▲ ' + STYLE_RANKS[styleRankNow()] + ' — I/O FOR SHIN +'
                                  + (SDT_CONG[styleRankNow()] / 60) + 's'), 246, y + 7, '#FFE082');
                }
            }
            ctx.restore();   // het phan HUD -> tra ve he toa do THE GIOI
            // dragVe() TUNG NAM TRONG KHOI HUD O TREN. Khoi do co ctx.translate(camX, camY)
            // de ve may thanh NO/DRAGON theo toa do MAN HINH. Cau lua va dai lua bi keo theo
            // vao do, nen chung duoc VE o he man hinh trong khi VI TRI THAT van o he the
            // gioi — camY = -160 thi hinh hien len cao hon cho that 160px. Sat thuong van
            // dung vi phan tinh khong lien quan gi den phep dich nay. Dua ra ngoai.
            dragVe();                       // cau lua / dai lua ton tai doc lap voi phan than
            if (!dtClone) return;
            let c = dtClone;
            if (!dtLaCanChien(currentAmmoType)){ dragVeRong(c); return; }
            if (clNhan){ clNhanVe(); return; }
            let fade = Math.min(1, c.hienT / 14) * Math.min(1, dtT / 20);
            let cx = c.x + dino.w/2, cy = c.y + dino.h/2;
            let d = c.left ? -1 : 1;
            let legAnim = c.tren ? 4 : ((frames % 12 < 6) ? 4 : 0);

            // NGAN SACH VE MOI KHUNG (ban truoc: 12 luot drawForm + shadowBlur khap noi):
            //   1 luot drawForm  +  2 canh  +  vai net rong  +  2 luot vu khi nho.
            // KHONG con shadowBlur o dau ca — do moi la thu lam tut FPS chu khong phai so
            // luot ve: moi lan dat shadowBlur la canvas phai chay them mot lan lam mo.

            // 1) CANH DOI — ve SAU than
            dtVeCanh(cx, cy, d, fade, c.tan > 0);
            // 2) THAN — mot luot duy nhat, mo mo. Vien lua nam san trong bang mau.
            let _sp = dino.swordPose;
            if (c.pose && c.pose.kieu === 5) dino.swordPose = c.pose.kiem;
            ctx.save();
            // @@HE-CHANLONG — HIEN CHAN THAN: khong con la cai bong chep lai nguoi choi nua
            // nen ve gan nhu dac, va co mot quang lua vong quanh cho de phan biet.
            let _cl = chanLongBat();
            if (_cl){
                ctx.save();
                ctx.globalAlpha = (0.20 + Math.sin(frames * 0.10) * 0.06) * fade;
                ctx.fillStyle = dtMau("#FF6E40");
                ctx.beginPath(); ctx.ellipse(cx, cy, 40, 34, 0, 0, Math.PI*2); ctx.fill();
                ctx.globalAlpha = 0.72 * fade;
                ctx.strokeStyle = dtMau("#FFAB40"); ctx.lineWidth = 2;
                ctx.beginPath(); ctx.ellipse(cx, cy, 36 + Math.sin(frames*0.13)*3, 30, 0, 0, Math.PI*2); ctx.stroke();
                ctx.restore();
            }
            ctx.globalAlpha = (_cl ? 0.97 : 0.62) * fade;
            try { dino.drawForm(false, c.x, c.y, legAnim, currentForm, c.left, dtPalNow()); } catch(e){}
            ctx.restore();
            dino.swordPose = _sp;
            // 3) NET RONG — sung, song lung gai, rau rong, chop duoi mui giao.
            //    May thu nay moi la cai keo hinh tu KHUNG LONG sang RONG; rieng doi RAU
            //    la thu doc ra "rong" nhanh nhat ma chi ton hai net ve.
            dtVeNetRong(c, d, fade);
            // 4) VU KHI THAT (giao / bua) — nguyen ban, chi khac VIEN NEON.
            dtVeVuKhi(c, fade);
            // 5) dong ho song
            ctx.save();
            ctx.globalAlpha = 0.75 * fade; ctx.strokeStyle = dtMau("#FF6E40"); ctx.lineWidth = 2.4;
            ctx.beginPath(); ctx.arc(cx, c.y - 16, 8, -Math.PI/2, -Math.PI/2 + Math.PI*2*(dtT/DT_DAI));
            ctx.stroke(); ctx.restore();
            ctx.globalAlpha = 1;
        }
// PLAYER_PART_END s6.dtVe.1

// index.html:87558 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtVeNetRong.1 EDITABLE
function dtVeNetRong(c, d, fade){
            let br = Math.sin(frames * 0.09) * 0.7;
            ctx.save();
            ctx.translate(c.x + dino.w/2, c.y); ctx.scale(d, 1); ctx.translate(-dino.w/2, 0);
            ctx.globalAlpha = 0.85 * fade;
            ctx.lineCap = 'round'; ctx.lineJoin = 'round';

            // --- SUNG: hai cai cong ve sau, moc tu gay ---
            ctx.strokeStyle = dtMau("#FFAB40"); ctx.lineWidth = 2.6;
            for (let k = 0; k < 2; k++){
                let oy = k * 3.5;
                ctx.beginPath();
                ctx.moveTo(37, 3 + br + oy);
                ctx.quadraticCurveTo(28, -6 + br + oy, 17, -8 + br + oy * 1.4);
                ctx.stroke();
            }
            // --- SONG LUNG GAI: hang gai tam giac chay tu gay xuong duoi lung ---
            ctx.fillStyle = dtMau("#FF6E40");
            for (let i = 0; i < 5; i++){
                let u = i / 4;
                let gx = 33 - u * 26, gy = 7 + u * 13 + br * (1 - u);
                let hh = 6.5 - u * 3;
                ctx.beginPath();
                ctx.moveTo(gx + 3, gy); ctx.lineTo(gx, gy - hh); ctx.lineTo(gx - 3, gy);
                ctx.closePath(); ctx.fill();
            }
            // --- RAU RONG: hai soi dai bay ve sau tu mom ---
            ctx.strokeStyle = "#FFCC80"; ctx.lineWidth = 1.5;
            let song = Math.sin(frames * 0.13) * 3;
            for (let k = 0; k < 2; k++){
                let oy = 9 + k * 3;
                ctx.beginPath();
                ctx.moveTo(50, oy + br);
                ctx.quadraticCurveTo(38, oy - 5 + song, 24, oy + 2 - song);
                ctx.stroke();
            }
            // --- CHOP DUOI hinh mui giao ---
            ctx.fillStyle = dtMau("#FF6E40");
            let dv = Math.sin(frames * 0.11) * 2.5;
            ctx.beginPath();
            ctx.moveTo(2, 26 + dv); ctx.lineTo(-11, 20 + dv * 1.6); ctx.lineTo(-6, 27 + dv * 1.4);
            ctx.lineTo(-11, 33 + dv * 1.6); ctx.closePath(); ctx.fill();
            // --- HOI LUA thoat ra tu mom ---
            ctx.fillStyle = "#FF8A50";
            for (let i = 0; i < 2; i++){
                let ph = (frames * 0.09 + i * 0.5) % 1;
                ctx.globalAlpha = 0.55 * (1 - ph) * fade;
                ctx.beginPath(); ctx.arc(53 + ph * 13, 10 - ph * 8 + br, 1.6 + ph * 2.6, 0, Math.PI*2); ctx.fill();
            }
            ctx.restore(); ctx.globalAlpha = 1;
        }
// PLAYER_PART_END s6.dtVeNetRong.1

// index.html:87615 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtVeCanh.1 EDITABLE
function dtVeCanh(cx, cy, d, fade, dangLao){
            let vay = Math.sin(frames * 0.15);
            let mo = dangLao ? 1.22 : (0.92 + vay * 0.10);   // do xoe
            ctx.save();
            ctx.translate(cx + d * 5, cy - 17); ctx.scale(-d * mo, mo);   // canh moc tu BA VAI
            ctx.globalAlpha = 0.5 * fade;
            for (let k = -1; k <= 1; k += 2){
                ctx.save();
                ctx.rotate(-0.16 + k * 0.26 + vay * 0.09 * k);
                // xuong: vai(0,0) -> khuyu(26,-36) -> ba ngon toe ra. Khuyu duoc keo CAO han
                // va ba ngon deu nam tren duong ngang cua vai, nen canh vuon LEN chu khong
                // xoa ngang ra sau nhu vay ca.
                const KH = [26, -36];
                const NGON = [[68, -56], [74, -24], [58, 4]];
                // mang canh: noi cac dau ngon bang cung KHOET VAO (mep sau hinh vay)
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(KH[0], KH[1]);
                ctx.lineTo(NGON[0][0], NGON[0][1]);
                for (let i = 1; i < 3; i++){
                    let a = NGON[i-1], b = NGON[i];
                    let mx = (a[0] + b[0]) / 2 - 9, my = (a[1] + b[1]) / 2 - 5;
                    ctx.quadraticCurveTo(mx, my, b[0], b[1]);
                }
                ctx.quadraticCurveTo(26, -4, 0, 3);
                ctx.closePath();
                ctx.fillStyle = "rgba(58,6,14,0.88)"; ctx.fill();
                // ngon xuong: net thang tu khuyu ra tung dau ngon
                ctx.strokeStyle = "rgba(255,110,64,0.9)"; ctx.lineWidth = 1.8; ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(0, 0); ctx.lineTo(KH[0], KH[1]);
                for (let i = 0; i < 3; i++){ ctx.moveTo(KH[0], KH[1]); ctx.lineTo(NGON[i][0], NGON[i][1]); }
                ctx.stroke();
                // vuot o dau ngon tren cung
                ctx.beginPath(); ctx.moveTo(NGON[0][0], NGON[0][1]); ctx.lineTo(NGON[0][0] + 6, NGON[0][1] - 4); ctx.stroke();
                ctx.restore();
            }
            ctx.restore(); ctx.globalAlpha = 1;
        }
// PLAYER_PART_END s6.dtVeCanh.1

// index.html:87656 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dtVeVuKhi.1 EDITABLE
function dtVeVuKhi(c, fade){
            let PZ = c.pose;
            if (!PZ || (PZ.kieu !== 10 && PZ.kieu !== 11)) return;
            let _px = dino.x, _py = dino.y, _pf = dino.isFacingLeft;
            dino.x = c.x; dino.y = c.y; dino.isFacingLeft = (PZ.dir < 0);
            let sc = dino.getFormScale(), dir = PZ.dir;
            // Diem goc va truc cua cay vu khi — lay dung cong thuc ma ban than ham ve dung,
            // nen duong neon khong the lech khoi cay vu khi.
            let ox, oy, L0, L1;
            if (PZ.kieu === 10){
                ox = c.x + dino.w/2 + dir * (12 + PZ.ext * sc);
                oy = c.y + dino.h * 0.52;
                let L = 118 * sc; L0 = -L * 0.34; L1 = L * 0.66 + 40;
            } else {
                ox = c.x + dino.w/2 + dir * (BUA_TRUOC + PZ.ext * sc);
                oy = c.y + dino.h * 0.24 - BUA_CAO;
                L0 = -34 * sc; L1 = 30 * sc;
            }
            let ca = Math.cos(PZ.ang), sa = Math.sin(PZ.ang);
            const tren = (t) => [ox + dir * ca * t, oy + sa * t];
            // 1) cay vu khi THAT
            ctx.save(); ctx.globalAlpha = 0.9 * fade;
            try {
                if (PZ.kieu === 11 && typeof dino.buaVeThan === 'function') dino.buaVeThan(dir, PZ);
                else if (PZ.kieu === 10 && typeof dino.giaoVeThan === 'function')
                    dino.giaoVeThan(ox, oy, PZ.ang, dir, 118 * sc, 1);
            } catch(e){}
            ctx.restore();
            // 2) VIEN NEON — mot net lua chay doc truc vu khi, cong mot cham sang o dau.
            //    Day la thu phan biet vu khi phan than voi vu khi that, va no chi ton
            //    dung mot net ve.
            let A = tren(L0), B = tren(L1);
            ctx.save();
            ctx.globalAlpha = 0.85 * fade; ctx.lineCap = 'round';
            ctx.strokeStyle = "rgba(255,87,34,0.55)"; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
            ctx.strokeStyle = "#FFCC80"; ctx.lineWidth = 1.6;
            ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
            ctx.fillStyle = dtMau("#FFAB40");
            ctx.beginPath(); ctx.arc(B[0], B[1], PZ.kieu === 11 ? 7 : 4, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
            dino.x = _px; dino.y = _py; dino.isFacingLeft = _pf;
            ctx.globalAlpha = 1;
        }
// PLAYER_PART_END s6.dtVeVuKhi.1

// index.html:87700 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidBat.1 EDITABLE
function voidBat(){ return currentPower === 1; }
// PLAYER_PART_END s6.voidBat.1

// index.html:87708 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidPhan.1 EDITABLE
let voidPhan = [];
// PLAYER_PART_END s6.voidPhan.1

// index.html:87711 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidDmgQuy.1 EDITABLE
function voidDmgQuy(g){
            if (!g) return 1;
            const K = {
                lemon: 1, stock: 1, bi: 1, hoa: 1,
                goo: 2, da: 2, trang: 2, set: 2, flaser: 2, lua: 2, gai: 2, orb: 2, bang: 2,
                plasma: 3, wing: 3, gaiS: 3,
                sac3: 4, wingS: 4, xoaylua: 4,
                cyclone: 5, gaea: 5
            };
            if (g.k && K[g.k]) return K[g.k];
            let w = g.w || ((g.r || 8) * 2), h = g.h || w, lon = Math.max(w, h);
            if (lon >= 90) return 5;
            if (lon >= 44 || (g.r || 0) >= 20) return 4;
            if (g.isPiercing || g.isWave || lon >= 30) return 3;
            if ((g.dmg || 1) >= 2 || lon >= 22) return 2;
            return 1;
        }
// PLAYER_PART_END s6.voidDmgQuy.1

// index.html:87728 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidNhamBoss.1 EDITABLE
function voidNhamBoss(x, y, sp){
            let best = null, bd = 1e9;
            if (typeof bosses !== 'undefined'){
                for (let o of bosses){
                    if (!o || o.dying || !(o.hp > 0)) continue;
                    let d = Math.hypot((o.x + (o.w || 40) / 2) - x, (o.y + (o.h || 40) / 2) - y);
                    if (d < bd){ bd = d; best = o; }
                }
            }
            let toc = Math.max(8, Math.min(20, sp || 12));
            if (!best){
                let dir = (typeof dino !== 'undefined' && dino && dino.isFacingLeft) ? -1 : 1;
                return { vx: dir * toc, vy: 0 };
            }
            let tx = best.x + (best.w || 40) / 2, ty = best.y + (best.h || 40) / 2;
            let dx = tx - x, dy = ty - y, d = Math.hypot(dx, dy) || 1;
            return { vx: dx / d * toc, vy: dy / d * toc };
        }
// PLAYER_PART_END s6.voidNhamBoss.1

// index.html:87746 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidPhanRa.1 EDITABLE
function voidPhanRa(x, y, goc, ve){
            let dmg = voidDmgQuy(goc);
            let sp = Math.hypot((goc && goc.vx) || 0, (goc && goc.vy) || 0);
            let nh = voidNhamBoss(x, y, sp);
            let bp = null;
            if (goc && typeof goc.draw === 'function'){
                bp = goc;
            } else if (goc && ve){
                let r = goc.r || 8;
                bp = { x: x - r, y: y - r, w: r * 2, h: r * 2, vx: 0, vy: 0,
                       dmg: dmg, isPiercing: !!goc.isPiercing, r: r,
                       draw(){
                           let c = Object.assign({}, goc, { x: this.x + r, y: this.y + r, vx: this.vx, vy: this.vy });
                           try { ve(c); } catch(e){}
                       } };
            } else if (goc && typeof Projectile === 'function'){
                try {
                    let pr = new Projectile(x, y, dmg, 0, nh.vy, 0, nh.vx < 0 ? -1 : 1, 1);
                    pr.speed = nh.vx; pr.vy = nh.vy; pr.dmg = dmg;
                    projectiles.push(pr);
                } catch(e){}
                visualEffects.push(new Effect(x, y, 'parry', nh.vx > 0));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1500, 0.05, 'square', 0.12, 2400);
                return;
            } else return;
            bp.vx = nh.vx; bp.vy = nh.vy; bp.dmg = dmg;
            voidPhan.push({ bp: bp, dmg: dmg, trung: new Set(), t: 0 });
            visualEffects.push(new Effect(x, y, 'parry', nh.vx > 0));
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1500, 0.05, 'square', 0.12, 2400);
        }
// PLAYER_PART_END s6.voidPhanRa.1

// index.html:87776 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidPhanTick.1 EDITABLE
function voidPhanTick(){
            if (!voidPhan.length) return;
            let ds = (typeof allTargets === 'function') ? allTargets() : [];
            for (let i = voidPhan.length - 1; i >= 0; i--){
                let P = voidPhan[i], bp = P.bp;
                P.t++;
                bp.x += bp.vx || 0; bp.y += bp.vy || 0;
                let het = false;
                for (let o of ds){
                    if (!o || o === dino || P.trung.has(o) || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (!checkAABB(bp, o)) continue;
                    P.trung.add(o);
                    if (typeof dealDamage === 'function') dealDamage(o, P.dmg, 'flat'); else o.hp -= P.dmg;
                    visualEffects.push(new Effect(bp.x + (bp.w || 0) / 2, bp.y + (bp.h || 0) / 2, 'explosion', true, 14));
                    if (!bp.isPiercing){ het = true; break; }
                }
                let ngoai = bp.x < -240 || bp.y < -320 || bp.y > 860;
                if (typeof worldR === 'function') ngoai = ngoai || bp.x > worldR() + 160 || bp.x < worldL() - 160;
                else ngoai = ngoai || bp.x > canvas.width + 240;
                if (het || P.t > 210 || ngoai) voidPhan.splice(i, 1);
            }
            for (let P of voidPhan){ try { if (typeof P.bp.draw === 'function') P.bp.draw(); } catch(e){} }
        }
// PLAYER_PART_END s6.voidPhanTick.1

// index.html:87799 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidCongTick.1 EDITABLE
function voidCongTick(){
            if (!voidBat() || typeof dino === 'undefined' || !dino || !dino.isShielding()) return;
            let dir = dino.isFacingLeft ? -1 : 1;
            let cx = dino.x + dino.w/2 + dir * 24, cy = dino.y + dino.h/2;
            const RW = 46, RH = 62;
            let L = cx - RW, R2 = cx + RW, T = cy - RH, B = cy + RH;
            // --- PHAN DAN: dan dich cham cong thi bay nguoc lai thanh dan cua nguoi choi ---
            if (typeof bossProjectiles !== 'undefined') for (let i = bossProjectiles.length - 1; i >= 0; i--){
                let bp = bossProjectiles[i];
                let bx = bp.x + (bp.w || 0)/2, by = bp.y + (bp.h || 0)/2;
                if (bx < L || bx > R2 || by < T || by > B) continue;
                bossProjectiles.splice(i, 1);
                voidPhanRa(bx, by, bp);
            }
            voidQuetDanRieng(L, R2, T, B);
            // --- XUYEN QUA: ke dich lao vao cong thi hien ra SAU LUNG va danh tiep ---
            let ds = [];
            if (typeof bosses !== 'undefined') for (let o of bosses) ds.push(o);
            if (typeof enemies !== 'undefined') for (let o of enemies) ds.push(o);
            for (let o of ds){
                if (!o || o.dying || o.hp === undefined || o.hp <= 0) continue;
                if ((o._voidCd || 0) > 0){ o._voidCd--; continue; }
                if (!checkAABB(dino, o)) continue;
                let bw = o.w || 40;
                o.x = (dir > 0) ? (dino.x - bw - 12) : (dino.x + dino.w + 12);
                o._voidCd = 50;
                visualEffects.push(new Effect(dino.x + dino.w/2, cy, 'parry', dir < 0));
                floatingTexts.push(new FloatingText(dino.x - 20, dino.y - 34, "XUYÊN QUA!"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(240, 0.14, 'sine', 0.18, 900);
            }
        }
// PLAYER_PART_END s6.voidCongTick.1

// index.html:87830 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidDiemDan.1 EDITABLE
function voidDiemDan(o){
            if (!o || o.dead || typeof o.x !== 'number') return null;
            let y = o.y;
            if (o.k === 'goo') y = 311;
            else if (o.k === 'wingS') y = 271;
            else if (o.k === 'xoaylua') y = 287;
            else if (o.k === 'cyclone') y = 291;
            if (typeof y !== 'number') return null;
            return { x: o.x, y: y };
        }
// PLAYER_PART_END s6.voidDiemDan.1

// index.html:87840 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidQuetDanRieng.1 EDITABLE
function voidQuetDanRieng(L, R, T, B){
            if (typeof bosses === 'undefined') return;
            const trong = (x, y) => x >= L && x <= R && y >= T && y <= B;
            for (const b of bosses){
                if (!b || b.dying) continue;
                for (const key of ['dan', 'orbs', 'shards', 'rocks']){
                    let ar = b[key];
                    if (!Array.isArray(ar) || !ar.length) continue;
                    for (let i = ar.length - 1; i >= 0; i--){
                        let p = voidDiemDan(ar[i]);
                        if (!p || !trong(p.x, p.y)) continue;
                        let goc = ar[i];
                        ar.splice(i, 1);
                        voidPhanRa(p.x, p.y, goc, (typeof b.veDan === 'function') ? function(bb){ b.veDan(bb); } : null);
                    }
                }
                if (Array.isArray(b.roi)){
                    for (let i = b.roi.length - 1; i >= 0; i--){
                        let q = b.roi[i];
                        if (!q || typeof q.x !== 'number' || typeof q.y !== 'number') continue;
                        if (q.cho !== undefined && (q.t || 0) < q.cho) continue;
                        let y = q.y + (q.h || 0) / 2;
                        if (!trong(q.x, y)) continue;
                        b.roi.splice(i, 1);
                        voidPhanRa(q.x, y, q, (typeof b.veDan === 'function') ? function(bb){ b.veDan(bb); } : null);
                    }
                }
                if (typeof DO_VO_VAT === 'undefined') continue;
                for (const key in DO_VO_VAT){
                    let ar = b[key];
                    if (!Array.isArray(ar) || !ar.length) continue;
                    let C = DO_VO_VAT[key];
                    for (let j = ar.length - 1; j >= 0; j--){
                        let g = ar[j];
                        if (!g || g.dead || typeof g.x !== 'number' || typeof g.y !== 'number') continue;
                        if (C.dk && !C.dk(g)) continue;
                        if (!trong(g.x, g.y)) continue;
                        g.dead = true; if (g.hp !== undefined) g.hp = 0; g.life = 0;
                        ar.splice(j, 1);
                        voidPhanRa(g.x, g.y);
                    }
                }
            }
        }
// PLAYER_PART_END s6.voidQuetDanRieng.1

// index.html:87884 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidVeCong.1 EDITABLE
function voidVeCong(){
            if (!voidBat() || typeof dino === 'undefined' || !dino || !dino.isShielding()) return;
            let dir = dino.isFacingLeft ? -1 : 1;
            let cx = dino.x + dino.w/2 + dir * 24, cy = dino.y + dino.h/2;
            ctx.save();
            ctx.translate(cx, cy); ctx.scale(dir, 1);
            let p = (frames % 40) / 40;
            for (let k = 0; k < 3; k++){
                let q = (p + k / 3) % 1;
                ctx.globalAlpha = 0.55 * (1 - q);
                ctx.strokeStyle = '#B388FF'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.ellipse(0, 0, 14 + 26 * q, 34 + 34 * q, 0, 0, Math.PI * 2); ctx.stroke();
            }
            ctx.globalAlpha = 0.85;
            ctx.strokeStyle = '#EDE7F6'; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.ellipse(0, 0, 16, 44, 0, 0, Math.PI * 2); ctx.stroke();
            ctx.globalAlpha = 0.22; ctx.fillStyle = '#4A148C';
            ctx.beginPath(); ctx.ellipse(0, 0, 16, 44, 0, 0, Math.PI * 2); ctx.fill();
            ctx.restore(); ctx.globalAlpha = 1;
        }
// PLAYER_PART_END s6.voidVeCong.1

// index.html:87905 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidChanParry.1 EDITABLE
function voidChanParry(){ return typeof voidBat === 'function' && voidBat(); }
// PLAYER_PART_END s6.voidChanParry.1

// index.html:87907 · Phạm vi: global
// PLAYER_PART_BEGIN s6.VOID_KHUNG.1 EDITABLE
const VOID_KHUNG = 7;
// PLAYER_PART_END s6.VOID_KHUNG.1

// index.html:87908 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidVet.1 EDITABLE
let voidVet = [];
// PLAYER_PART_END s6.voidVet.1

// index.html:87909 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidTeleBatDau.1 EDITABLE
function voidTeleBatDau(tx, ty, laLuot){
            if (typeof dino === 'undefined' || !dino || dino._voidTe) return false;
            // `laLuot` = cu dich chuyen nay den tu DASH. Nhay cung la dich chuyen o Void,
            // nhung Hu Vo Bo Phap chi tinh cu LUOT — nhay van la di chuyen thuan tuy.
            dino._voidTe = { cho: VOID_KHUNG, tx, ty, luot: !!laLuot };
            voidVet.push({ x: dino.x + dino.w/2, y: dino.y + dino.h/2, t: VOID_KHUNG + 6, T: VOID_KHUNG + 6, di: 1 });
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1500, 0.07, 'sine', 0.13, 520);
            return true;
        }
// PLAYER_PART_END s6.voidTeleBatDau.1

// index.html:87980 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidTeleTick.1 EDITABLE
function voidTeleTick(){
            hvBoPhapTick();
            for (let i = voidVet.length - 1; i >= 0; i--) if (--voidVet[i].t <= 0) voidVet.splice(i, 1);
            if (typeof dino !== 'undefined' && dino && dino._voidLuotDu > 0) dino._voidLuotDu--;
            if (typeof allTargets === 'function') allTargets().forEach(o => { if (o && o._stCd > 0) o._stCd--; });
            let V = (typeof dino !== 'undefined' && dino) ? dino._voidTe : null;
            if (!V) return;
            dino.dy = 0;                                  // dung im trong luc chuan bi
            if (--V.cho > 0) return;
            dino.x = V.tx; dino.y = V.ty; dino.dy = 0;
            if (V.luot) hvBoPhapNo();                    // @@HE-HUVO
            dino._voidLuotDu = 22;   // cua so 'vua chop xong' — thay cho dieu kien dang luot
            voidVet.push({ x: dino.x + dino.w/2, y: dino.y + dino.h/2, t: 17, T: 17, di: 0 });
            dino._voidTe = null;
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880, 0.09, 'sine', 0.17, 2700);
        }
// PLAYER_PART_END s6.voidTeleTick.1

// index.html:87996 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voidVeVet.1 EDITABLE
function voidVeVet(){
            for (const v of voidVet){
                let u = 1 - v.t / v.T;
                ctx.save(); ctx.translate(v.x, v.y);
                // di = 1: vong RUT VAO o cho cu | di = 0: vong BUNG RA o cho moi
                let r = v.di ? (52 * (1 - u) + 6) : (8 + 56 * u);
                ctx.globalAlpha = v.di ? (0.30 + 0.60 * (1 - u)) : Math.max(0, 0.90 * (1 - u));
                ctx.strokeStyle = '#B388FF'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
                ctx.strokeStyle = '#EDE7F6'; ctx.lineWidth = 1.6;
                ctx.beginPath(); ctx.arc(0, 0, r * 0.60, 0, Math.PI * 2); ctx.stroke();
                ctx.globalAlpha *= 0.85;
                ctx.fillStyle = 'rgba(74,20,140,0.30)';
                ctx.beginPath(); ctx.arc(0, 0, r * 0.60, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = 'rgba(209,196,233,0.9)'; ctx.lineWidth = 2.4; ctx.lineCap = 'round';
                for (let k = 0; k < 6; k++){
                    let a = k * (Math.PI / 3) + (v.di ? -u : u) * 1.5;
                    let r1 = v.di ? r * 1.55 : r * 0.45, r2 = v.di ? r * 0.65 : r * 1.30;
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
                    ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
                    ctx.stroke();
                }
                ctx.restore(); ctx.globalAlpha = 1;
            }
        }
// PLAYER_PART_END s6.voidVeVet.1

// index.html:89971 · Phạm vi: global
// PLAYER_PART_BEGIN s6.DT_CHISO.1 EDITABLE
const DT_CHISO = [
            { k:'hp',  ten:'MÁU',        tenEn:'HP'     },
            { k:'atk', ten:'SÁT THƯƠNG', tenEn:'DAMAGE' },
            { k:'def', ten:'PHÒNG THỦ',  tenEn:'DEFENSE'},
            { k:'spd', ten:'TỐC ĐỘ',     tenEn:'SPEED'  }
        ];
// PLAYER_PART_END s6.DT_CHISO.1

// index.html:89977 · Phạm vi: global
// PLAYER_PART_BEGIN s6.DT_MIN.1 EDITABLE
const DT_MIN = 0, DT_MAX = 300, DT_BUOC = 10;
// PLAYER_PART_END s6.DT_MIN.1

// index.html:90510 · Phạm vi: global
// PLAYER_PART_BEGIN s6.ST_MAX.1 EDITABLE
const ST_MAX = 3;
// PLAYER_PART_END s6.ST_MAX.1

// index.html:90511 · Phạm vi: global
// PLAYER_PART_BEGIN s6.ST_HOI.1 EDITABLE
const ST_HOI = 26;
// PLAYER_PART_END s6.ST_HOI.1

// index.html:90512 · Phạm vi: global
// PLAYER_PART_BEGIN s6.ST_KHOA.1 EDITABLE
const ST_KHOA = 120;
// PLAYER_PART_END s6.ST_KHOA.1

// index.html:90513 · Phạm vi: global
// PLAYER_PART_BEGIN s6.ST_NHIP.1 EDITABLE
const ST_NHIP = 14;
// PLAYER_PART_END s6.ST_NHIP.1

// index.html:90514 · Phạm vi: global
// PLAYER_PART_BEGIN s6.ST_NAY.1 EDITABLE
const ST_NAY = [14.5, 11.5, 8.5, 5.5];
// PLAYER_PART_END s6.ST_NAY.1

// index.html:90515 · Phạm vi: global
// PLAYER_PART_BEGIN s6.ST_MUS_HO.1 EDITABLE
const ST_MUS_HO = 3;
// PLAYER_PART_END s6.ST_MUS_HO.1

// index.html:90516 · Phạm vi: global
// PLAYER_PART_BEGIN s6.ST_MUS_CD.1 EDITABLE
const ST_MUS_CD = 14;
// PLAYER_PART_END s6.ST_MUS_CD.1

// index.html:90517 · Phạm vi: global
// PLAYER_PART_BEGIN s6.stCharge.1 EDITABLE
let stCharge = ST_MAX, stHoi = 0, stKhoa = 0, stFreeAir = true, stNay = 0, stXuongT = 0, stMusCd = 0;
// PLAYER_PART_END s6.stCharge.1

// index.html:90518 · Phạm vi: global
// PLAYER_PART_BEGIN s6.stBat.1 EDITABLE
function stBat(){ return typeof hasRune === 'function' && hasRune('shintrick'); }
// PLAYER_PART_END s6.stBat.1

// index.html:90663 · Phạm vi: global
// PLAYER_PART_BEGIN s6.stReset.1 EDITABLE
function stReset(){ stCharge = ST_MAX; stHoi = 0; stKhoa = 0; stFreeAir = true; stNay = 0; stXuongT = 0; stMusCd = 0; }
// PLAYER_PART_END s6.stReset.1
