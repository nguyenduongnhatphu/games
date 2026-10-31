// PLAYER_FILE: CUSTOM02
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CUS_BV_ULT, CUS_GB_CH, CUS_HX_BIEN, CUS_HX_NUT, CUS_HX_NUT_TO, CUS_HX_TAN, CUS_NC, CUS_QD_CM, CUS_QD_HOIDAN, CUS_QD_TOC, CUS_TLD_CH, CUS_VIEN_H, CUS_VIEN_W, CUS_VK_ULT, Effect, FloatingText, LT, SFX, _cusNCO, allTargets, canvas, checkAABB, cryoPha, ctx, currentLang, cusAcBat, cusCap, cusCapCua, cusCgBat, cusHieuUng, cusKhoKhung, cusKvBat, cusLap, cusLaserBat, cusMo, cusNCPicker, cusNCTim, cusNapLuu, cusNoBan, cusNoLienTuc, cusOBa, cusPtBat, cusRgBat, cusSH, cusSHHop, cusSHLoi, cusSHNghi, cusStandThu, cusTLNo, cusTLTim, cusTTBat, cusTangPT, cusTen, cusThuNghiem, cusToaBat, cusXaDoc, cusXaTran, dealDamage, dino, doChieuThu, dsTrangThai, floatingTexts, gameState, mouseX, mouseY, pvpTuDoiThu, visualEffects, wrapText
// index.html:63632 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_CUA_SO.1 EDITABLE
const CUS_QD_CUA_SO = 10;
// PLAYER_PART_END s4.CUS_QD_CUA_SO.1

// index.html:63641 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_VET.1 EDITABLE
const CUS_QD_VET = 9;
// PLAYER_PART_END s4.CUS_QD_VET.1

// index.html:63650 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_DAC.1 EDITABLE
const CUS_QD_DAC = 60;
// PLAYER_PART_END s4.CUS_QD_DAC.1

// index.html:63661 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_LAO_SO.1 EDITABLE
const CUS_QD_LAO_SO  = 3;
// PLAYER_PART_END s4.CUS_QD_LAO_SO.1

// index.html:63662 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_LAO_GHE.1 EDITABLE
const CUS_QD_LAO_GHE = 0.25;
// PLAYER_PART_END s4.CUS_QD_LAO_GHE.1

// index.html:63663 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QD_LAO_MIN.1 EDITABLE
const CUS_QD_LAO_MIN = 16;
// PLAYER_PART_END s4.CUS_QD_LAO_MIN.1

// index.html:63664 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQdBat.1 EDITABLE
function cusQdBat(){  return cusCapCua('quydao') > 0; }
// PLAYER_PART_END s4.cusQdBat.1

// index.html:63665 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQdR.1 EDITABLE
function cusQdR(){    return canvas.width * (CUS_QD_CM / 23); }
// PLAYER_PART_END s4.cusQdR.1

// index.html:63666 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQdToc.1 EDITABLE
function cusQdToc(){  return CUS_QD_TOC[cusCapCua('quydao')]    || CUS_QD_TOC[1]; }
// PLAYER_PART_END s4.cusQdToc.1

// index.html:63667 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQdHoi.1 EDITABLE
function cusQdHoi(){  return CUS_QD_HOIDAN[cusCapCua('quydao')] || CUS_QD_HOIDAN[1]; }
// PLAYER_PART_END s4.cusQdHoi.1

// index.html:63692 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_BINH.1 EDITABLE
const CW_BINH    = 600;
// PLAYER_PART_END s4.CW_BINH.1

// index.html:63693 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_NHIP.1 EDITABLE
const CW_NHIP    = 15;
// PLAYER_PART_END s4.CW_NHIP.1

// index.html:63694 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_DMG.1 EDITABLE
const CW_DMG     = 1;
// PLAYER_PART_END s4.CW_DMG.1

// index.html:63695 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_TAM_CM.1 EDITABLE
const CW_TAM_CM  = 4;
// PLAYER_PART_END s4.CW_TAM_CM.1

// index.html:63696 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_GIO_MOI.1 EDITABLE
const CW_GIO_MOI = 120;
// PLAYER_PART_END s4.CW_GIO_MOI.1

// index.html:63697 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_GIO_CM.1 EDITABLE
const CW_GIO_CM  = 1;
// PLAYER_PART_END s4.CW_GIO_CM.1

// index.html:63698 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_CAO.1 EDITABLE
const CW_CAO     = 22;
// PLAYER_PART_END s4.CW_CAO.1

// index.html:63700 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_CUI_SO.1 EDITABLE
const CW_CUI_SO  = 3;
// PLAYER_PART_END s4.CW_CUI_SO.1

// index.html:63701 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_CUI_CUA.1 EDITABLE
const CW_CUI_CUA = 45;
// PLAYER_PART_END s4.CW_CUI_CUA.1

// index.html:63702 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_NAP_TOC.1 EDITABLE
const CW_NAP_TOC = 1;
// PLAYER_PART_END s4.CW_NAP_TOC.1

// index.html:63704 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_RO_VANG.1 EDITABLE
const CW_RO_VANG = 90;
// PLAYER_PART_END s4.CW_RO_VANG.1

// index.html:63705 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_RO_XANH.1 EDITABLE
const CW_RO_XANH = 180;
// PLAYER_PART_END s4.CW_RO_XANH.1

// index.html:63706 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_VANG_NHIP.1 EDITABLE
const CW_VANG_NHIP = 10;
// PLAYER_PART_END s4.CW_VANG_NHIP.1

// index.html:63707 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_VANG_DAI.1 EDITABLE
const CW_VANG_DAI  = 300;
// PLAYER_PART_END s4.CW_VANG_DAI.1

// index.html:63708 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_XANH_CHO.1 EDITABLE
const CW_XANH_CHO  = 120;
// PLAYER_PART_END s4.CW_XANH_CHO.1

// index.html:63709 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_XANH_KHOA.1 EDITABLE
const CW_XANH_KHOA = 120;
// PLAYER_PART_END s4.CW_XANH_KHOA.1

// index.html:63710 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_XANH_DMG.1 EDITABLE
const CW_XANH_DMG  = 18;
// PLAYER_PART_END s4.CW_XANH_DMG.1

// index.html:63715 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_XANH_NANG.1 EDITABLE
const CW_XANH_NANG = 30;
// PLAYER_PART_END s4.CW_XANH_NANG.1

// index.html:63716 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_XANH_LEN.1 EDITABLE
const CW_XANH_LEN  = 18;
// PLAYER_PART_END s4.CW_XANH_LEN.1

// index.html:63723 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_VE_LUOI.1 EDITABLE
const CW_VE_LUOI = 72;
// PLAYER_PART_END s4.CW_VE_LUOI.1

// index.html:63724 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_VE_DAY.1 EDITABLE
const CW_VE_DAY  = 11;
// PLAYER_PART_END s4.CW_VE_DAY.1

// index.html:63725 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_VE_VONG.1 EDITABLE
const CW_VE_VONG = 46;
// PLAYER_PART_END s4.CW_VE_VONG.1

// index.html:63726 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CW_MAU_THAN.1 EDITABLE
const CW_MAU_THAN  = { do: ['#C62828','#EF5350','#8E1B1B'],
                               vang: ['#F9A825','#FFD54F','#B8860B'],
                               xanh: ['#2E7D32','#66BB6A','#1B5E20'] };
// PLAYER_PART_END s4.CW_MAU_THAN.1

// index.html:63729 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCwBat.1 EDITABLE
function cusCwBat(){ return cusCapCua('chainsaw') > 0; }
// PLAYER_PART_END s4.cusCwBat.1

// index.html:63730 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cwCm.1 EDITABLE
function cwCm(){ return canvas.width / 23; }
// PLAYER_PART_END s4.cwCm.1

// index.html:63734 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cwHop.1 EDITABLE
function cwHop(ng){
            let cm = CW_TAM_CM + Math.floor((ng.cwGiu || 0) / CW_GIO_MOI) * CW_GIO_CM;
            let tam = cm * cwCm();
            let d = ng.isFacingLeft ? -1 : 1;
            return { x: (d === 1 ? ng.x + ng.w - 4 : ng.x + 4 - tam), y: ng.y - CW_CAO,
                     w: tam, h: ng.h + CW_CAO * 2, tam: tam, cm: cm, d: d };
        }
// PLAYER_PART_END s4.cwHop.1

// index.html:63743 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cwDanh.1 EDITABLE
function cwDanh(ng, dmg){
            let hop = cwHop(ng), trung = 0;
            if (ng.id === 1 && typeof doChieuThu === 'function') doChieuThu('cw', hop, dmg, 12);   // @@HE-DOCHIEU
            if (typeof allTargets !== 'function') return 0;
            ng.cusLot = (ng.cusLot || 0) + 1;
            for (let o of allTargets()){
                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                if (!checkAABB(hop, o)) continue;
                let d = cusTangPT(o, dmg);
                if (o._cusLot !== ng.cusLot){ o._cusLot = ng.cusLot; d += cusHieuUng(o, dmg); }
                cusStandThu(o, d, 'cua', ng.id);
                if (typeof dealDamage === 'function') dealDamage(o, d, 'ammo'); else o.hp -= d;
                if (typeof cusCapCua === 'function' && cusCapCua('no') > 0 && typeof cusNoDat === 'function')
                    cusNoDat(o.x + (o.w||20)/2, o.y + (o.h||20)/2);
                visualEffects.push(new Effect(o.x + (o.w||20)/2 + (Math.random()-0.5)*20,
                                              o.y + (o.h||20)/2 + (Math.random()-0.5)*20,
                                              'explosion', true, 9));
                trung++;
            }
            if (trung && typeof SFX !== 'undefined' && SFX.tone) SFX.tone(160, 0.05, 'sawtooth', 0.12, 90);
            return trung;
        }
// PLAYER_PART_END s4.cwDanh.1

// index.html:63768 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cwTimCham.1 EDITABLE
function cwTimCham(ng){
            if (typeof allTargets !== 'function') return null;
            let hop = cwHop(ng);
            for (let o of allTargets()){
                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                if (checkAABB(hop, o)) return o;
            }
            return null;
        }
// PLAYER_PART_END s4.cwTimCham.1

// index.html:63792 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_ULT.1 EDITABLE
const CUS_ULT = [
            { id:'kho', ten:'KHO ĐẠN', tenEn:'AMMO DUMP',
              mo:['50 viên đổ thẳng vào kho trữ. Bắn được cả trong lúc quá nhiệt.',
                  '75 viên.', '100 viên.'],
              moEn:['50 rounds straight into the bank. They fire even while overheated.',
                    '75 rounds.', '100 rounds.'],
              tom:'Bề rộng. Một tràng dài mà quá nhiệt không cắt được.',
              tomEn:'Breadth. One long run that overheat cannot cut short.' },
            { id:'drone', ten:'DRONE', tenEn:'DRONE',
              mo:['1 Drone Laser thường trực — tự có ngay từ đầu mỗi trận, không cần bấm U.',
                  'Bấm U triệu thêm Drone súng máy 60 viên.',
                  'Drone súng máy 100 viên.'],
              moEn:['1 permanent Laser Drone — it is there from the start of every fight, no button needed.',
                    'Press U to call in a 60-round machine-gun drone.',
                    'The machine-gun drone carries 100 rounds.'],
              tom:'Một tay súng thứ hai. Cấp 1 KHÔNG có nút bấm — bạn đổi phím U lấy sát thương chạy nền suốt trận.',
              tomEn:'A second gunner. Level 1 has NO button — you trade the U key for damage that runs all fight.' },
            { id:'tenlua', ten:'TÊN LỬA', tenEn:'MISSILES',
              mo:['4 phát kế tiếp thành tên lửa tự tìm mục tiêu, 10 sát thương + nổ lan.',
                  '15 sát thương.', '20 sát thương.'],
              moEn:['Your next 4 shots become homing missiles, 10 damage each plus a blast.',
                    '15 damage.', '20 damage.'],
              tom:'Bề sâu. Bay chậm, phóng lên rồi bẻ vào mục tiêu; một phát bằng cả băng đạn.',
              tomEn:'Depth. Slow, it climbs then curves into the target; one is worth a magazine.' },
            /* @@HE-CUSBOM — Hans: mờ rồi biến mất, A/D chọn vùng, J thả. 3 quả.
               3 cấp: tâm 25/30/33, bán kính 4/5/6cm, mỗi 1cm trừ 3. Bom to dần, rơi từ trên màn hình. */
            { id:'bom', ten:'THẢ BOM', tenEn:'BOMB DROP',
              mo:['Mờ dần rồi biến mất. A và D đưa vùng thả, J thả một quả. Được 3 quả, rơi từ trên cao. Tâm 25, mỗi 1cm trừ 3, bán kính 4cm. Mé còn 13.',
                  'Mờ dần rồi biến mất. A và D đưa vùng thả, J thả một quả. Được 3 quả, rơi từ trên cao. Tâm 30, mỗi 1cm trừ 3, bán kính 5cm. Mé còn 15. Bom to hơn cấp 1.',
                  'Mờ dần rồi biến mất. A và D đưa vùng thả, J thả một quả. Được 3 quả, rơi từ trên cao. Tâm 33, mỗi 1cm trừ 3, bán kính 6cm. Mé còn 15. Bom to nhất.'],
              moEn:['You fade out. A and D move the drop zone, J drops one bomb. 3 bombs fall from above the screen. 25 at the center, minus 3 per 1cm, 4cm radius. The edge still deals 13.',
                    'You fade out. A and D move the drop zone, J drops one bomb. 3 bombs fall from above the screen. 30 at the center, minus 3 per 1cm, 5cm radius. The edge still deals 15. The bomb is larger.',
                    'You fade out. A and D move the drop zone, J drops one bomb. 3 bombs fall from above the screen. 33 at the center, minus 3 per 1cm, 6cm radius. The edge still deals 15. The bomb is the largest.'],
              tom:'3 cấp: tâm 25/30/33, bán kính 4/5/6cm. Mỗi 1cm trừ 3 nên mé còn 13/15/15. Bom to dần theo cấp và rơi từ trên màn hình.',
              tomEn:'3 levels: center 25/30/33, radius 4/5/6cm. Minus 3 per 1cm, so the edge still deals 13/15/15. The bomb grows with the level and falls from above the screen.' }
        ];
// PLAYER_PART_END s4.CUS_ULT.1

// index.html:63828 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUltTim.1 EDITABLE
function cusUltTim(id){ return CUS_ULT.find(x => x.id === id) || null; }
// PLAYER_PART_END s4.cusUltTim.1

// index.html:63842 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_CH.1 EDITABLE
const CUS_CH = [
            { id:'quanhiet', xong:true, ten:'QUÁ NHIỆT', tenEn:'MELTDOWN',
              mo:['Giữ K quá mốc thì thân nhiệt bốc lên: nhân ĐÔI mỗi giây tới 8, sau đó +50% mỗi giây. Quầng rộng thêm 0.5cm mỗi nấc.',
                  'Nhân đôi tới 16 rồi mới chậm lại.',
                  'Nhân đôi tới 32 rồi mới chậm lại.'],
              moEn:['Hold K past the threshold and your body heat climbs: it DOUBLES every second up to 8, then +50% a second.',
                    'Doubles up to 16 before slowing.',
                    'Doubles up to 32 before slowing.'],
              tom:'Quầng nhiệt bắt đầu 3cm và RỘNG THÊM 0.5cm mỗi lần nhiệt tăng. Nhả ra thì toả ra TOÀN BẢN ĐỒ. Ăn đòn là ngắt — và nhiệt tự thoát.',
              tomEn:'The heat field starts at 3cm and WIDENS 0.5cm every time the heat climbs. Releasing vents it across the WHOLE MAP. Getting hit breaks it and the heat vents by itself.' },
            { id:'ufo', xong:true, ten:'UFO', tenEn:'UFO',
              mo:['Một UFO hạ xuống, treo cao hơn mục tiêu 5cm và chiếu máy hút: 4 sát thương mỗi giây, chia thành nhiều nhịp nhỏ.',
                  '6 sát thương mỗi giây.',
                  '8 sát thương mỗi giây.'],
              moEn:['A UFO descends, hovers 5cm above the target and runs its tractor beam: 4 damage a second.',
                    '6 damage a second.',
                    '8 damage a second.'],
              tom:'Đánh liên tục từ xa. Mục tiêu chết thì bị bóp méo và hút vào UFO — cứ BẮT ĐỦ 10 con thì hồi 1 máu, hồi chiêu 20 giây.',
              tomEn:'Steady damage from range. A dead target is squashed and sucked up — every 10 CAPTURES heals you 1 HP, on a 20-second cooldown.' },
            /* Module DUY NHAT khong co cap — Hans dat: "no don gian la hai huoc thoi nen
               chon cho vui". Ba o mo ta ghi y het nhau, va the trong bang hien '●' tran
               khong kem so cap (co `khongCap`). */
            { id:'nuke', xong:true, khongCap:true, ten:'BOM NGUYÊN TỬ', tenEn:'NUKE',
              mo:['Đếm ngược 10 giây. Hết giờ thì một con tàu mẹ hạ xuống, mở cửa khoang thả một quả bom nguyên tử và XOÁ SẠCH MÀN HÌNH. Bị ngắt thì không có gì xảy ra.',
                  'Đếm ngược 10 giây. Hết giờ thì một con tàu mẹ hạ xuống, mở cửa khoang thả một quả bom nguyên tử và XOÁ SẠCH MÀN HÌNH. Bị ngắt thì không có gì xảy ra.',
                  'Đếm ngược 10 giây. Hết giờ thì một con tàu mẹ hạ xuống, mở cửa khoang thả một quả bom nguyên tử và XOÁ SẠCH MÀN HÌNH. Bị ngắt thì không có gì xảy ra.'],
              moEn:['A 10-second countdown. When it ends a mothership descends, opens its bay and drops a nuke that CLEARS THE WHOLE SCREEN. Break the channel and nothing happens.',
                    'A 10-second countdown. When it ends a mothership descends, opens its bay and drops a nuke that CLEARS THE WHOLE SCREEN. Break the channel and nothing happens.',
                    'A 10-second countdown. When it ends a mothership descends, opens its bay and drops a nuke that CLEARS THE WHOLE SCREEN. Break the channel and nothing happens.'],
              tom:'KHÔNG CÓ CẤP, không hồi chiêu. Giá nằm ở chỗ phải giữ K trọn 10 giây mà không ăn một đòn nào. Bạn hoá thành máy khoan chui xuống đất để né vụ nổ.',
              tomEn:'NO LEVELS, no cooldown. The price is holding K for the full 10 seconds without taking a single hit. You turn into a drill and dig underground to ride out the blast.' },
            /* @@HE-CUSUZ — khong cap, giong BOM NGUYEN TU: moi con so do Hans dat san. */
            { id:'uzumaki', xong:true, khongCap:true, ten:'UZUMAKI', tenEn:'UZUMAKI',
              mo:['Một vòng xoáy đen hiện giữa màn hình. Đạn đen mờ bò theo 5 cánh xoáy vào tâm trong 5 giây, thêm 2 giây để vào hết. Rồi BUNG: đạn cầu vồng xoắn cực nhanh ra ngoài, 2 sát thương mỗi viên, phun không giới hạn khi còn giữ K.',
                  'Một vòng xoáy đen hiện giữa màn hình. Đạn đen mờ bò theo 5 cánh xoáy vào tâm trong 5 giây, thêm 2 giây để vào hết. Rồi BUNG: đạn cầu vồng xoắn cực nhanh ra ngoài, 2 sát thương mỗi viên, phun không giới hạn khi còn giữ K.',
                  'Một vòng xoáy đen hiện giữa màn hình. Đạn đen mờ bò theo 5 cánh xoáy vào tâm trong 5 giây, thêm 2 giây để vào hết. Rồi BUNG: đạn cầu vồng xoắn cực nhanh ra ngoài, 2 sát thương mỗi viên, phun không giới hạn khi còn giữ K.'],
              moEn:['A black vortex appears mid-screen. Faint dark rounds crawl in along its 5 arms for 5 seconds, 2 more to gather. Then it BURSTS: rainbow rounds spiral out at speed, 2 damage each, pouring out endlessly while you keep holding K.',
                    'A black vortex appears mid-screen. Faint dark rounds crawl in along its 5 arms for 5 seconds, 2 more to gather. Then it BURSTS: rainbow rounds spiral out at speed, 2 damage each, pouring out endlessly while you keep holding K.',
                    'A black vortex appears mid-screen. Faint dark rounds crawl in along its 5 arms for 5 seconds, 2 more to gather. Then it BURSTS: rainbow rounds spiral out at speed, 2 damage each, pouring out endlessly while you keep holding K.'],
              tom:'KHÔNG CÓ CẤP. Tổng cộng ~10 giây giữ K mới bung. Nhả hoặc ăn đòn lúc đang tích = mất trắng; lúc đang phun thì chỉ dừng phun, đạn đã ra vẫn bay tiếp.',
              tomEn:'NO LEVELS. About 10 seconds of holding K before it bursts. Letting go or getting hit while charging wastes it; while pouring, it only stops the flow and the rounds already out keep flying.' },
            /* @@HE-CUSMT — khong cap: moi con so do Hans dat. */
            { id:'muaten', xong:true, khongCap:true, ten:'MƯA TÊN', tenEn:'ARROW RAIN',
              mo:['Giữ K qua mốc: tên từ trên trời rơi xuống, nghiêng chéo một chút, rải khắp màn hình. Giây đầu 4 mũi, mỗi giây sau đợt tên thêm 4 mũi (8, 12, 16…). Từ đợt 20 mũi, mỗi đợt sau đến sớm hơn 0.1 giây (0.9, 0.8… tối thiểu 0.1 giây). Tối đa 80 mũi cùng lúc. Mỗi mũi 2 sát thương. Nhả K hoặc ăn đòn là ngừng phóng, tên đang rơi vẫn rơi tiếp.','Giữ K qua mốc: tên từ trên trời rơi xuống, nghiêng chéo một chút, rải khắp màn hình. Giây đầu 4 mũi, mỗi giây sau đợt tên thêm 4 mũi (8, 12, 16…). Từ đợt 20 mũi, mỗi đợt sau đến sớm hơn 0.1 giây (0.9, 0.8… tối thiểu 0.1 giây). Tối đa 80 mũi cùng lúc. Mỗi mũi 2 sát thương. Nhả K hoặc ăn đòn là ngừng phóng, tên đang rơi vẫn rơi tiếp.','Giữ K qua mốc: tên từ trên trời rơi xuống, nghiêng chéo một chút, rải khắp màn hình. Giây đầu 4 mũi, mỗi giây sau đợt tên thêm 4 mũi (8, 12, 16…). Từ đợt 20 mũi, mỗi đợt sau đến sớm hơn 0.1 giây (0.9, 0.8… tối thiểu 0.1 giây). Tối đa 80 mũi cùng lúc. Mỗi mũi 2 sát thương. Nhả K hoặc ăn đòn là ngừng phóng, tên đang rơi vẫn rơi tiếp.'],
              moEn:['Hold K past the mark: arrows fall from the sky at a slight slant, spread across the screen. 4 in the first second, and each second the volley grows by 4 (8, 12, 16…). From the 20-arrow volley on, each volley comes 0.1s sooner (0.9, 0.8… down to 0.1s). Up to 80 in the air at once. 2 damage per arrow. Release K or take a hit and the volleys stop; arrows already falling keep falling.','Hold K past the mark: arrows fall from the sky at a slight slant, spread across the screen. 4 in the first second, and each second the volley grows by 4 (8, 12, 16…). From the 20-arrow volley on, each volley comes 0.1s sooner (0.9, 0.8… down to 0.1s). Up to 80 in the air at once. 2 damage per arrow. Release K or take a hit and the volleys stop; arrows already falling keep falling.','Hold K past the mark: arrows fall from the sky at a slight slant, spread across the screen. 4 in the first second, and each second the volley grows by 4 (8, 12, 16…). From the 20-arrow volley on, each volley comes 0.1s sooner (0.9, 0.8… down to 0.1s). Up to 80 in the air at once. 2 damage per arrow. Release K or take a hit and the volleys stop; arrows already falling keep falling.'],
              tom:'KHÔNG CÓ CẤP. Phủ cả màn hình chứ không nhắm ai — càng giữ lâu mưa càng dày. Mạnh với bầy quái, và với boss to.',
              tomEn:'NO LEVELS. Covers the whole screen instead of aiming — the longer you hold, the thicker the rain. Strong against swarms and big bosses.' }
        ];
// PLAYER_PART_END s4.CUS_CH.1

// index.html:63890 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusChTim.1 EDITABLE
function cusChTim(id){ return CUS_CH.find(x => x.id === id) || null; }
// PLAYER_PART_END s4.cusChTim.1

// index.html:63891 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNapLuu.2 EDITABLE
cusNapLuu();
// PLAYER_PART_END s4.cusNapLuu.2

// index.html:63892 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusChCap.1 EDITABLE
function cusChCap(id){
            if (typeof cusKvBat === 'function' && cusKvBat()) return 0;   // @@HE-CUSGB: channel that bi khoa
            if (typeof cusPtBat === 'function' && cusPtBat()) return 0;   // @@HE-CUSTL: Phi Tieu khoa Channel thanh THIEN LA
            if (!id || cusLap.ch !== id) return 0;
            return cusThuNghiem ? 3 : Math.max(0, Math.min(3, cusCap[id] || 0));
        }
// PLAYER_PART_END s4.cusChCap.1

// index.html:63898 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusChBat.1 EDITABLE
function cusChBat(){
            if (typeof cusKvBat === 'function' && cusKvBat()) return true;   // @@HE-CUSGB: KIEM VU ep Channel thanh VUONG KHO
            if (typeof cusPtBat === 'function' && cusPtBat()) return true;   // @@HE-CUSTL: PHI TIEU ep Channel thanh THIEN LA DIA VONG
            return cusLap.ch && cusChCap(cusLap.ch) > 0;
        }
// PLAYER_PART_END s4.cusChBat.1

// index.html:63904 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusChMoc.1 EDITABLE
function cusChMoc(){
            if (typeof cusLaserBat === 'function' && (cusLaserBat() || cusToaBat() || cusTTBat() || cusRgBat() || cusPtBat() || cusKvBat() || cusAcBat() || (typeof cusCgBat === 'function' && cusCgBat()))) return 180;
            return (typeof cusKhoKhung === 'function') ? cusKhoKhung() : 180;
        }
// PLAYER_PART_END s4.cusChMoc.1

// index.html:63908 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QN_MOC.1 EDITABLE
const CUS_QN_MOC  = [0, 8, 16, 32];
// PLAYER_PART_END s4.CUS_QN_MOC.1

// index.html:63909 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QN_CM.1 EDITABLE
const CUS_QN_CM   = 3;
// PLAYER_PART_END s4.CUS_QN_CM.1

// index.html:63910 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QN_NONG.1 EDITABLE
const CUS_QN_NONG = 90;
// PLAYER_PART_END s4.CUS_QN_NONG.1

// index.html:63911 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UFO_DMG.1 EDITABLE
const CUS_UFO_DMG = [0, 4, 6, 8];
// PLAYER_PART_END s4.CUS_UFO_DMG.1

// index.html:63912 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UFO_CAO.1 EDITABLE
const CUS_UFO_CAO = 5;
// PLAYER_PART_END s4.CUS_UFO_CAO.1

// index.html:63913 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UFO_VAO.1 EDITABLE
const CUS_UFO_VAO = 34;
// PLAYER_PART_END s4.CUS_UFO_VAO.1

// index.html:63914 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UFO_NHIP.1 EDITABLE
const CUS_UFO_NHIP = 6;
// PLAYER_PART_END s4.CUS_UFO_NHIP.1

// index.html:63915 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UFO_NHUN.1 EDITABLE
const CUS_UFO_NHUN = 14;
// PLAYER_PART_END s4.CUS_UFO_NHUN.1

// index.html:63916 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UFO_BAT.1 EDITABLE
const CUS_UFO_BAT  = 10;
// PLAYER_PART_END s4.CUS_UFO_BAT.1

// index.html:63917 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UFO_HOICD.1 EDITABLE
const CUS_UFO_HOICD = 1200;
// PLAYER_PART_END s4.CUS_UFO_HOICD.1

// index.html:63918 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_QN_NO.1 EDITABLE
const CUS_QN_NO    = 0.5;
// PLAYER_PART_END s4.CUS_QN_NO.1

// index.html:63919 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUltChon.1 EDITABLE
let cusUltChon = null;
// PLAYER_PART_END s4.cusUltChon.1

// index.html:63920 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUltMoc.1 EDITABLE
let cusUltMoc  = 0;
// PLAYER_PART_END s4.cusUltMoc.1

// index.html:63921 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUltCap.1 EDITABLE
function cusUltCap(){
            if (!cusUltChon) return 0;
            return cusThuNghiem ? 3 : Math.max(0, Math.min(3, cusUltMoc));
        }
// PLAYER_PART_END s4.cusUltCap.1

// index.html:63925 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUltLuu.1 EDITABLE
function cusUltLuu(){ try { localStorage.setItem('dino_cusult', cusUltChon || ''); } catch(e){} }
// PLAYER_PART_END s4.cusUltLuu.1

// index.html:63926 · Phạm vi: global
// PLAYER_PART_BEGIN s4.ExpressionStatement.1 EDITABLE
(function(){ try { let v = localStorage.getItem('dino_cusult');
                           if (v && cusUltTim(v)) cusUltChon = v; } catch(e){} })();
// PLAYER_PART_END s4.ExpressionStatement.1

// index.html:63928 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_ULT_KHO.1 EDITABLE
const CUS_ULT_KHO   = [0, 50, 75, 100];
// PLAYER_PART_END s4.CUS_ULT_KHO.1

// index.html:63929 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_ULT_DRONE.1 EDITABLE
const CUS_ULT_DRONE = [0, 0, 60, 100];
// PLAYER_PART_END s4.CUS_ULT_DRONE.1

// index.html:63930 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TL_SO.1 EDITABLE
const CUS_TL_SO     = 4;
// PLAYER_PART_END s4.CUS_TL_SO.1

// index.html:63931 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TL_DMG.1 EDITABLE
const CUS_TL_DMG    = [0, 10, 15, 20];
// PLAYER_PART_END s4.CUS_TL_DMG.1

// index.html:63932 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TL_TOC.1 EDITABLE
const CUS_TL_TOC    = 7;
// PLAYER_PART_END s4.CUS_TL_TOC.1

// index.html:63933 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TL_TOCMAX.1 EDITABLE
const CUS_TL_TOCMAX = 13;
// PLAYER_PART_END s4.CUS_TL_TOCMAX.1

// index.html:63934 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TL_LEN.1 EDITABLE
const CUS_TL_LEN    = -2.4;
// PLAYER_PART_END s4.CUS_TL_LEN.1

// index.html:63935 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TL_TRONG.1 EDITABLE
const CUS_TL_TRONG  = 0.11;
// PLAYER_PART_END s4.CUS_TL_TRONG.1

// index.html:63936 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TL_BAN.1 EDITABLE
const CUS_TL_BAN    = 112;
// PLAYER_PART_END s4.CUS_TL_BAN.1

// index.html:63937 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TL_THANG.1 EDITABLE
const CUS_TL_THANG  = 8;
// PLAYER_PART_END s4.CUS_TL_THANG.1

// index.html:63938 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TL_BE.1 EDITABLE
const CUS_TL_BE     = 0.17;
// PLAYER_PART_END s4.CUS_TL_BE.1

// index.html:63962 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNCHang.1 EDITABLE
function cusNCHang(){
            return [
                { key:'nl',  ten: LT("NĂNG LỰC","CAPABILITY"),               mau:"#4FC3F7",
                  ds: CUS_NC.filter(x => x.loai === 'nl' && x.xong) },
                { key:'he',  ten: LT("HIỆU ỨNG","EFFECT"),                   mau:"#CE93D8",
                  ds: CUS_NC.filter(x => (x.loai === 'he' || x.ca) && x.xong) },   // @@HE-CUSPT: module lai hien o ca hai hang
                { key:'ch',  ten: LT("CHANNEL — giữ K qua mốc","CHANNEL — hold K past the mark"), mau:"#FFB74D",
                  ds: (typeof cusKvBat === 'function' && cusKvBat()) ? [CUS_GB_CH]
                      : (typeof cusPtBat === 'function' && cusPtBat()) ? [CUS_TLD_CH] : CUS_CH.filter(x => x.xong) },   // @@HE-CUSGB / @@HE-CUSTL: bi khoa
                { key:'ult', ten: LT("CHIÊU CUỐI [U]","ULTIMATE [U]"),       mau:"#FF8A65",
                  ds: (typeof cusKvBat === 'function' && cusKvBat()) ? [CUS_VK_ULT]
                      : (typeof cusPtBat === 'function' && cusPtBat()) ? [CUS_BV_ULT] : CUS_ULT.slice() }   // @@HE-CUSKV / @@HE-CUSTL: bi khoa
            ];
        }
// PLAYER_PART_END s4.cusNCHang.1

// index.html:63976 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusModTen.1 EDITABLE
function cusModTen(it){ return (currentLang === 'en' && it.tenEn) ? it.tenEn : it.ten; }
// PLAYER_PART_END s4.cusModTen.1

// index.html:63977 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusModCap.1 EDITABLE
function cusModCap(hang, it){
            if (hang === 'ult') return (cusUltChon === it.id) ? cusUltCap() : 0;
            if (hang === 'ch')  return cusChCap(it.id);
            return cusCapCua(it.id);
        }
// PLAYER_PART_END s4.cusModCap.1

// index.html:63982 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusModLap.1 EDITABLE
function cusModLap(hang, it){
            if (hang === 'ult') return it.id === 'vankiem' || it.id === 'baovu' || cusUltChon === it.id;
            if (hang === 'ch')  return it.id === 'vuongkho' || it.id === 'thienla' || cusLap.ch === it.id;
            return (cusLap[hang] === it.id) || (cusLap.x === it.id && cusOBa())
                || ((hang === 'nl' || hang === 'he') && cusLap[hang + '2'] === it.id && cusSH());   // @@HE-SONGHE
        }
// PLAYER_PART_END s4.cusModLap.1

// index.html:63988 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusModMo.1 EDITABLE
function cusModMo(hang, it, cap){
            let m = (currentLang === 'en' && it.moEn) ? it.moEn : it.mo;
            return (m && m[Math.max(0, Math.min(2, cap - 1))]) || '';
        }
// PLAYER_PART_END s4.cusModMo.1

// index.html:63992 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusModTom.1 EDITABLE
function cusModTom(it){ return (currentLang === 'en' && it.tomEn) ? it.tomEn : (it.tom || ''); }
// PLAYER_PART_END s4.cusModTom.1

// index.html:63999 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNCCuon.1 EDITABLE
let cusNCCuon = { nl: 0, he: 0, ch: 0, ult: 0 };
// PLAYER_PART_END s4.cusNCCuon.1

// index.html:64000 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNCLayout.1 EDITABLE
function cusNCLayout(){
            const PX = 24, PW = canvas.width - PX*2;
            const L = PX + 16, AV = PW - 32;
            const TT = 62, TIEU = 15, GY = 7, CH = 28, GC = 4, SB = 9, MOI = 5;
            const CW = (AV - 12 - SB - (MOI - 1) * 6) / MOI;
            let hang = cusNCHang();
            /* Moi bang CAO BANG DUNG NOI DUNG cua no, va CA HOP THOAI cung chi cao bang dung
               tong noi dung roi can giua man hinh. Ban truoc chia deu chieu cao cho bon bang
               nen bang CHANNEL co hai the van cao bang bang NANG LUC sau the; ban sau do thi
               bang vua khit nhung phan thua don het xuong dai chi tiet, thanh mot o trong to
               tuong o duoi. Chi khi tong noi dung vuot man hinh moi ha tran xuong — luc do
               bang nao dai hon tran se co thanh cuon cua no. */
            for (let h of hang)
                h.caoND = Math.max(1, Math.ceil(h.ds.length / MOI)) * (CH + GC) - GC + 10;
            const KHUNG = 72 + hang.length * (TIEU + GY) + 8 + TT + 12;   // phan co dinh
            let choMax = canvas.height - 24 - KHUNG;
            let tran = 1000;
            let tong = () => hang.reduce((a, h) => a + Math.min(h.caoND, tran), 0);
            while (tran > 42 && tong() > choMax) tran -= 2;
            const PH = Math.min(canvas.height - 24, KHUNG + tong());
            const PY = Math.round((canvas.height - PH) / 2);
            let dau = PY + 72;
            let o = [], y = dau;
            for (let h of hang){
                let hb = Math.min(h.caoND, tran);
                h.ty = y; h.bx = L; h.by = y + TIEU; h.bw = AV; h.bh = hb; h.sb = SB;
                h.max = Math.max(0, h.caoND - hb);
                cusNCCuon[h.key] = Math.max(0, Math.min(h.max, cusNCCuon[h.key] || 0));
                h.ds.forEach((it, i) => {
                    let r = Math.floor(i / MOI), c = i % MOI;
                    o.push({ it: it, hang: h.key, box: h, w: CW, h: CH,
                             x: L + 6 + c * (CW + 6),
                             y: h.by + 6 + r * (CH + GC) - cusNCCuon[h.key] });
                });
                y += TIEU + hb + GY;
            }
            let ct = { x: L, y: y + 2, w: AV, h: Math.max(TT, (PY + PH - 10) - (y + 2)) };
            return { PX, PY, PW, PH, L, AV, hang, o, ct,
                     X: { x: PX + PW - 36, y: PY + 10, w: 24, h: 24 } };
        }
// PLAYER_PART_END s4.cusNCLayout.1

// index.html:64040 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNCHienThe.1 EDITABLE
function cusNCHienThe(c){   // the co nam trong khung cua no khong (da cuon ra ngoai thi khong)
            return c.y >= c.box.by + 1 && c.y + c.h <= c.box.by + c.box.bh - 1;
        }
// PLAYER_PART_END s4.cusNCHienThe.1

// index.html:64043 · Phạm vi: global
// PLAYER_PART_BEGIN s4.drawCusNCPicker.1 EDITABLE
function drawCusNCPicker(){
            if (!cusNCPicker) return;
            let L = cusNCLayout(); _cusNCO = L.o;
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.93)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(10,16,22,0.98)"; ctx.fillRect(L.PX, L.PY, L.PW, L.PH);
            ctx.strokeStyle = "#90A4AE"; ctx.lineWidth = 2;
            ctx.strokeRect(L.PX + 0.5, L.PY + 0.5, L.PW - 1, L.PH - 1);
            ctx.textAlign = "left";
            ctx.fillStyle = "#B0BEC5"; ctx.font = "bold 18px Consolas, monospace";
            ctx.fillText(LT("NÂNG CẤP CUSTOM", "CUSTOM UPGRADES"), L.L, L.PY + 28);
            ctx.fillStyle = "#78909C"; ctx.font = "11px Consolas, monospace";
            ctx.fillText((typeof cusSH === 'function' && cusSH())
                         ? LT("SONG HỆ: Năng lực và Hiệu ứng lắp HAI · bấm lại để tháo · rê chuột xem chi tiết",
                              "DUAL CORE: two Abilities and two Effects · click again to unequip · hover for details")
                         : LT("Mỗi bảng lắp MỘT · bấm lại để tháo · rê chuột xem chi tiết · lăn chuột để cuộn",
                            "One per panel · click again to unequip · hover for details · scroll to see more"),
                         L.L, L.PY + 46);
            ctx.textAlign = "right"; ctx.font = "bold 11px Consolas, monospace";
            if (cusSH()){
                ctx.fillStyle = "#FFD54F";
                let _l = LT("2 năng lực gộp một phát + 2 hiệu ứng", "2 abilities in one shot + 2 effects");
                ctx.fillText(LT("◆ SONG HỆ: ", "◆ DUAL CORE: ") + _l, L.PX + L.PW - 44, L.PY + 28);
            } else if (cusOBa()){
                ctx.fillStyle = "#FFD54F";
                ctx.fillText(LT("◆ Ô THỨ BA: ", "◆ THIRD SLOT: ")
                             + (cusLap.x ? cusTen(cusNCTim(cusLap.x)) : LT("trống","empty")), L.PX + L.PW - 44, L.PY + 28);
            } else {
                ctx.fillStyle = "#546E7A";
                ctx.fillText(LT("Ô thứ ba: cần rune Ô THỨ BA", "Third slot: needs the THIRD SLOT rune"), L.PX + L.PW - 44, L.PY + 28);
            }
            if (cusThuNghiem){
                ctx.fillStyle = "#FFB74D"; ctx.font = "bold 10px Consolas, monospace";
                ctx.fillText(LT("● CHẾ ĐỘ THỬ — tất cả chạy CẤP 3", "● TEST MODE — everything at LEVEL 3"),
                             L.PX + L.PW - 44, L.PY + 46);
            }
            ctx.textAlign = "left";
            let hx = mouseX >= L.X.x && mouseX <= L.X.x + L.X.w && mouseY >= L.X.y && mouseY <= L.X.y + L.X.h;
            ctx.fillStyle = hx ? "rgba(255,82,82,0.35)" : "rgba(255,255,255,0.08)";
            ctx.fillRect(L.X.x, L.X.y, L.X.w, L.X.h);
            ctx.strokeStyle = hx ? "#FF5252" : "rgba(255,255,255,0.45)"; ctx.lineWidth = 2;
            ctx.strokeRect(L.X.x + 0.5, L.X.y + 0.5, L.X.w - 1, L.X.h - 1);
            ctx.beginPath(); ctx.moveTo(L.X.x + 7, L.X.y + 7); ctx.lineTo(L.X.x + 17, L.X.y + 17);
            ctx.moveTo(L.X.x + 17, L.X.y + 7); ctx.lineTo(L.X.x + 7, L.X.y + 17); ctx.stroke();
            // ---- bon khung ----
            for (let h of L.hang){
                ctx.fillStyle = h.mau; ctx.font = "bold 11px Consolas, monospace";
                ctx.fillText(h.ten, h.bx + 2, h.ty + 11);
                ctx.fillStyle = "rgba(255,255,255,0.025)"; ctx.fillRect(h.bx, h.by, h.bw, h.bh);
                ctx.strokeStyle = "rgba(255,255,255,0.14)"; ctx.lineWidth = 1;
                ctx.strokeRect(h.bx + 0.5, h.by + 0.5, h.bw - 1, h.bh - 1);
                if (h.max > 0){
                    let tx = h.bx + h.bw - h.sb - 3, tw = h.sb - 2;
                    ctx.fillStyle = "rgba(255,255,255,0.07)";
                    ctx.fillRect(tx, h.by + 3, tw, h.bh - 6);
                    let tl = Math.max(16, (h.bh - 6) * (h.bh / h.caoND));
                    let tp = (h.bh - 6 - tl) * (cusNCCuon[h.key] / h.max);
                    ctx.fillStyle = h.mau;
                    ctx.fillRect(tx, h.by + 3 + tp, tw, tl);
                }
            }
            // ---- cac the ----
            let ro = null;
            for (let c of L.o){
                if (!cusNCHienThe(c)) continue;
                let h = c.box;
                let lap = cusModLap(c.hang, c.it), cap = cusModCap(c.hang, c.it);
                let hov = mouseX >= c.x && mouseX <= c.x + c.w && mouseY >= c.y && mouseY <= c.y + c.h;
                if (hov) ro = c;
                let oba = (c.hang === 'nl' || c.hang === 'he') && ((cusLap.x === c.it.id && cusOBa()) || (cusLap[c.hang + '2'] === c.it.id && cusSH()));
                let _nghi = lap && c.hang === 'nl' && c.it.id === cusSHNghi();      // @@HE-SONGHE: loi dang nghi
                ctx.fillStyle = lap ? "rgba(38,50,56,0.95)" : (hov ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.035)");
                ctx.fillRect(c.x, c.y, c.w, c.h);
                ctx.strokeStyle = lap ? h.mau : (hov ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.10)");
                ctx.lineWidth = lap ? 2 : 1;
                ctx.strokeRect(c.x + 0.5, c.y + 0.5, c.w - 1, c.h - 1);
                if (lap){ ctx.fillStyle = h.mau; ctx.fillRect(c.x + 1, c.y + 1, 3, c.h - 2); }
                // TEN + CAP tren CUNG MOT DONG
                // module KHONG CO CAP thi hien dau tron tran, khong kem so — neu khong no
                // se doi '●3' va nguoi choi tuong no nang cap duoc.
                let nhan = lap ? (_nghi ? LT("NGHỈ", "IDLE") : (c.it.khongCap ? "●" : (oba ? ("◆" + cap) : ("●" + cap)))) : "";
                ctx.font = "bold 10px Consolas, monospace";
                let wn = nhan ? ctx.measureText(nhan).width + 8 : 0;
                if (nhan){
                    ctx.fillStyle = "#FFD54F"; ctx.textAlign = "right";
                    ctx.fillText(nhan, c.x + c.w - 7, c.y + 18); ctx.textAlign = "left";
                }
                ctx.fillStyle = lap ? "#FFFFFF" : (hov ? "#ECEFF1" : "#90A4AE");
                ctx.font = "bold 12px Consolas, monospace";
                ctx.save(); ctx.beginPath(); ctx.rect(c.x + 8, c.y, c.w - 14 - wn, c.h); ctx.clip();
                ctx.fillText(cusModTen(c.it), c.x + 9, c.y + 18);
                ctx.restore();
            }
            // ---- dai chi tiet ----
            let T = L.ct;
            ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.fillRect(T.x, T.y, T.w, T.h);
            ctx.strokeStyle = "rgba(255,255,255,0.14)"; ctx.lineWidth = 1;
            ctx.strokeRect(T.x + 0.5, T.y + 0.5, T.w - 1, T.h - 1);
            ctx.save(); ctx.beginPath(); ctx.rect(T.x + 8, T.y + 3, T.w - 16, T.h - 6); ctx.clip();
            if (typeof cusSHLoi !== 'undefined' && cusSHLoi && cusSHLoi.t > 0 && !ro){
                cusSHLoi.t--;
                ctx.fillStyle = "#FF8A80"; ctx.font = "bold 12px Consolas, monospace";
                let _ta = cusNCTim(cusSHLoi.a), _tb = cusNCTim(cusSHLoi.b);
                wrapText(LT("SONG HỆ: ", "DUAL CORE: ") + (_ta ? cusTen(_ta) : '?') + " + " + (_tb ? cusTen(_tb) : '?')
                         + LT(" không gộp được vào một phát. Vũ khí (Railgun / Laser / Cung) chỉ gộp với TÁCH TIA hoặc TỎA; Cưa Máy và Khí Công Pháo không gộp được; các nhánh đạn thường gộp với nhau tự do.",
                              " cannot share one shot. Weapons (Railgun / Laser / Bow) only combine with SPLIT SHOT or BURST; Chainsaw and Ki Cannon combine with nothing; plain-round branches combine freely."),
                         T.x + 10, T.y + 18, T.w - 20, 14);
            } else if (ro){
                let lap = cusModLap(ro.hang, ro.it), cap = cusModCap(ro.hang, ro.it);
                ctx.fillStyle = ro.box.mau; ctx.font = "bold 12px Consolas, monospace";
                ctx.fillText(cusModTen(ro.it) + (lap ? (LT("  ·  CẤP ","  ·  LV ") + cap) : ""), T.x + 10, T.y + 16);
                ctx.fillStyle = "#CFD8DC"; ctx.font = "11px Consolas, monospace";
                let mo3 = cusModMo(ro.hang, ro.it, lap ? cap : 3);
                wrapText(cusModTom(ro.it) + (mo3 ? ("   " + LT("CẤP ","LV ") + (lap ? cap : 3) + ": " + mo3) : ""),
                         T.x + 10, T.y + 31, T.w - 20, 13);
            } else {
                ctx.fillStyle = "#78909C"; ctx.font = "11px Consolas, monospace";
                let ds = [];
                for (let h of L.hang){
                    let ten = "—";
                    let _ts = []; for (let it of h.ds) if (cusModLap(h.key, it)) _ts.push(cusModTen(it));
                    if (_ts.length) ten = _ts.join(" + ");
                    ds.push(h.ten.split(" —")[0] + ": " + ten);
                }
                if (cusOBa() && cusLap.x) ds.push(LT("Ô BA: ","SLOT 3: ") + cusTen(cusNCTim(cusLap.x)));
                wrapText(LT("Đang lắp — ","Equipped — ") + ds.join("   ·   "), T.x + 10, T.y + 18, T.w - 20, 14);
            }
            ctx.restore();
            ctx.restore();
        }
// PLAYER_PART_END s4.drawCusNCPicker.1

// index.html:64173 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNCBam.1 EDITABLE
function cusNCBam(mx, my){
            for (let c of _cusNCO){
                if (!cusNCHienThe(c)) continue;      // the da cuon ra ngoai khung thi khong bam duoc
                if (mx >= c.x && mx <= c.x + c.w && my >= c.y && my <= c.y + c.h) return c;
            }
            return null;
        }
// PLAYER_PART_END s4.cusNCBam.1

// index.html:64185 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMoTaDan.1 EDITABLE
function cusMoTaDan(){
            let ds = [];
            for (let it of [cusNCTim(cusLap.nl), cusNCTim(cusLap.he), (cusOBa() ? cusNCTim(cusLap.x) : null),
                            (cusSH() ? cusNCTim(cusLap.nl2) : null), (cusSH() ? cusNCTim(cusLap.he2) : null)])
                if (it) ds.push("▸ " + cusTen(it) + " — " + cusMo(it, cusCapCua(it.id)));
            if (cusLap.ch){
                let C = cusChTim(cusLap.ch);
                if (C) ds.push("▸ CHANNEL " + (currentLang === 'en' ? C.tenEn : C.ten)
                               + " — " + ((currentLang === 'en' ? C.moEn : C.mo)[Math.max(0, cusChCap(C.id) - 1)] || ''));
            }
            if (cusUltChon){
                let U = cusUltTim(cusUltChon);
                if (U) ds.push("▸ " + LT("CHIÊU CUỐI ", "ULT ") + (currentLang === 'en' ? U.tenEn : U.ten)
                               + " — " + ((currentLang === 'en' ? U.moEn : U.mo)[Math.max(0, cusUltCap() - 1)] || ''));
            }
            if (!ds.length)
                return LT("Khẩu chưa xong — yếu nhất bảng, và đó là chủ ý. 6 viên mỗi giây, cạn băng 6 viên là quá nhiệt ngay. Giữ K trữ đạn vào một kho riêng; xả kho thì bắn nhanh gấp rưỡi và không sợ nóng. Mọi thứ phức tạp trên khẩu này về sau đều là thứ chính bạn lắp vào.",
                          "The unfinished gun — the weakest in the roster, by design. Six rounds a second, and emptying its six-round magazine overheats it on the spot. Holding K banks rounds into a separate store that fires half again as fast and ignores heat. Everything complex on this gun later is something you installed yourself.");
            return ds.join("   ");
        }
// PLAYER_PART_END s4.cusMoTaDan.1

// index.html:64209 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusLapBam.1 EDITABLE
function cusLapBam(it, loai){
            /* @@HE-CUSPT — module LAI (`ca`) khoa CA HAI o NANG LUC + HIEU UNG. */
            let _laLai = id => { let m = id && cusNCTim(id); return !!(m && m.ca); };
            if (it.ca){
                if (cusLap.nl === it.id || cusLap.he === it.id){ cusLap.nl = null; cusLap.he = null; return false; }
                cusLap.nl = it.id; cusLap.he = it.id; if (cusLap.x === it.id) cusLap.x = null; return true;
            }
            if ((loai === 'nl' || loai === 'he') && (_laLai(cusLap.nl) || _laLai(cusLap.he))){ cusLap.nl = null; cusLap.he = null; }
            if (cusLap.x === it.id && cusOBa()){ cusLap.x = null; return false; }
            // @@HE-SONGHE — o thu hai cung loai
            let _o2 = (loai === 'nl' || loai === 'he') ? loai + '2' : null;
            if (_o2 && cusLap[_o2] === it.id && cusSH()){ cusLap[_o2] = null; return false; }
            if (cusLap[loai] === it.id){ cusLap[loai] = null; if (_o2 && cusSH() && cusLap[_o2]){ cusLap[loai] = cusLap[_o2]; cusLap[_o2] = null; } return false; }
            if (!cusLap[loai]){ cusLap[loai] = it.id; return true; }
            if (_o2 && cusSH() && !cusLap[_o2]){
                // @@HE-SONGHE: hai nang luc phai GOP duoc vao mot phat
                if (loai === 'nl' && !cusSHHop(cusLap.nl, it.id)){
                    if (typeof dino !== 'undefined' && dino) floatingTexts.push(new FloatingText(dino.x - 60, dino.y - 40, LT("KHÔNG GỘP ĐƯỢC", "CAN'T COMBINE")));
                    cusSHLoi = { a: cusLap.nl, b: it.id, t: 150 };
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(150, 0.12, 'square', 0.16, 90);
                    return false;
                }
                cusLap[_o2] = it.id; return true;
            }
            if (cusOBa() && !cusLap.x){ cusLap.x = it.id; return true; }
            cusLap[loai] = it.id; return true;
        }
// PLAYER_PART_END s4.cusLapBam.1

// index.html:64249 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUSNO_CHO.1 EDITABLE
const CUSNO_CHO = 60, CUSNO_HOI = 60, CUSNO_DMG = 1;
// PLAYER_PART_END s4.CUSNO_CHO.1

// index.html:64250 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_COMBO_VOBANG.1 EDITABLE
const CUS_COMBO_VOBANG = 4;
// PLAYER_PART_END s4.CUS_COMBO_VOBANG.1

// index.html:64252 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNoBom.1 EDITABLE
let cusNoBom = [], cusNoCd = 0;
// PLAYER_PART_END s4.cusNoBom.1

// index.html:64253 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNoDat.1 EDITABLE
function cusNoDat(x, y){
            if (typeof cusNoLienTuc !== 'function') return;
            if (!cusNoLienTuc()){ if (cusNoCd > 0) return; cusNoCd = CUSNO_HOI; }
            cusNoBom.push({ x: x, y: y, r: cusNoBan(), t: CUSNO_CHO });
        }
// PLAYER_PART_END s4.cusNoDat.1

// index.html:64258 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNoTick.1 EDITABLE
function cusNoTick(){
            if (cusNoCd > 0) cusNoCd--;
            for (let i = cusNoBom.length - 1; i >= 0; i--){
                let b = cusNoBom[i]; b.t--;
                if (b.t > 0) continue;
                visualEffects.push(new Effect(b.x, b.y, 'explosion', true, Math.round(b.r * 0.5)));
                if (gameState !== 'pvp' && typeof allTargets === 'function'){
                    let r = { x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 };
                    for (let o of allTargets()){
                        if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                        if (!checkAABB(r, o)) continue;
                        // COMBO BANG + NO: vu no dap vo muc tieu dang dong bang (+4, het bang).
                        let _d = CUSNO_DMG + ((cusCapCua('bang') > 0 && typeof cryoPha === 'function') ? cryoPha(o, CUS_COMBO_VOBANG) : 0);
                        if (typeof dealDamage === 'function') dealDamage(o, _d, 'ammo');
                        else o.hp -= _d;
                    }
                }
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(190, 0.05, 'sawtooth', 0.09, 80);
                cusNoBom.splice(i, 1);
            }
            // @@HE-CUSNC — nhip DOT. Quet muc tieu thay vi giu mot danh sach rieng: vet dot
            // song tren chinh muc tieu nen no tu bien mat khi muc tieu chet, khong con rac.
            if (typeof allTargets === 'function') for (let o of ((typeof dsTrangThai === 'function') ? dsTrangThai() : allTargets())){   // @@HE-P2KHOA
                let D = o && o._cusDot;
                if (!D || !(D.n > 0)) continue;
                if (o.hp === undefined || o.hp <= 0 || o.invulnAll){ o._cusDot = null; continue; }
                if (--D.t > 0) continue;
                D.t = D.nhip; D.n--;
                /* @@HE-CUSDOT — BO luat "giu du 4 giay thi gap doi". Hans chot: sau khi ba
                   cap thanh 3 / 6 / 9 sat thuong thi suc dot da du, khong can them mot lop
                   thuong nua. Giu lai thi cap 3 an tiep len 6 dmg/giay va ĐỐT mot minh
                   chiem ~65% tong sat thuong — cai sung chi con de cham lua. */
                if (typeof pvpTuDoiThu === 'function') pvpTuDoiThu(o, () => { if (typeof dealDamage === 'function') dealDamage(o, 1, 'ammo'); else o.hp -= 1; });   // @@HE-P2KHOA
                else if (typeof dealDamage === 'function') dealDamage(o, 1, 'ammo'); else o.hp -= 1;
                visualEffects.push(new Effect(o.x + (o.w||20)/2 + (Math.random()-0.5)*16,
                                              o.y + (o.h||20)/2 + (Math.random()-0.5)*16,
                                              'explosion', true, 10));
                if (D.n <= 0) o._cusDot = null;
            }
        }
// PLAYER_PART_END s4.cusNoTick.1

// index.html:64302 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusDanBuoc.1 EDITABLE
function cusDanBuoc(p){
            /* @@HE-CUSTOA — vien toa chi bay 3cm roi tat. Khong co truong "tuoi tho" san
               trong `Projectile` nen day no ra ngoai the gioi cho vong lap tu don, dung cach
               da dung cho ten lua cham dat. */
            /* @@HE-CUSHX — duong bay xoan. Ghi DE toa do y moi khung thay vi cong vao `vy`:
               cong don thi sai so troi dan va sau vai giay hai vien khong con doi xung. */
            if (p && p._cusHx){
                p._cusHxT = (p._cusHxT || 0) + 1;
                if (p._cusHxVy) p._cusHxY0 += p._cusHxVy;    // @@HE-SONGHE: truc xoan nghieng theo tach tia
                let _hc = cusCapCua('helix') || 1;
                let _hs = Math.sin(p._cusHxT * CUS_HX_TAN[_hc] + p._cusHxPha);
                p.y = p._cusHxY0 + _hs * CUS_HX_BIEN;
                let _nut = Math.abs(_hs) < CUS_HX_NUT;
                p._cusHxNut = _nut ? 1 : 0;
                let _to = (_nut && _hc >= 2) ? CUS_HX_NUT_TO : 1;
                p.w = p._cusHxW0 * _to; p.h = p._cusHxH0 * _to;
                // Cap 3 — DIEM HOI TU: cham dung luc dang o nut thi xuyen thang qua than do
                if (_nut && _hc >= 3) p.pierceCount = Math.max(p.pierceCount || 0, 1);
                if (!p._cusXa) return;
                p._cusW0 = p.w; p._cusH0 = p.h;               // @@HE-SONGHE: XOAN + TAM XA — lon dan tren nen kich thuoc cua nut
            }
            if (p && p._cusToaCon){
                p._cusToaDi = (p._cusToaDi || 0) + Math.hypot(p.speed || 0, p.vy || 0);
                if (p._cusToaDi > (p._cusToaTam || 130)) p.y = 99999;
                return;
            }
            /* @@HE-CUSULT — TEN LUA roi theo cung. Trong luc cong o day chu khong o
               `Projectile.update` de khong dung vao duong bay cua moi loai dan khac.
               Cham dat thi no ngay — neu de no bay tiep xuong duoi man hinh thi ban hut
               mot phat ten lua se khong co gi xay ra ca, nhin nhu dan bi nuot. */
            if (p && p.cusTL){
                /* TU TIM MUC TIEU. Ban dau ten lua chi bay theo mot duong cong co dinh —
                   Hans dung: mot qua ten lua ma khong ngam ai thi chi la vien dan cham.
                   Cach lam: CUS_TL_THANG khung dau van bay thang theo huong ban ra (de con
                   thay no PHONG LEN), sau do moi bat dau be ve muc tieu, va toc do tang dan
                   nen duong bay ra hinh chu S chu khong phai mot duong thang buon te.
                   Muc tieu chot MOT LAN: doi muc tieu giua chung thi qua ten lua se lac lu
                   theo con nao gan hon o tung khung. */
                p._cusTLT = (p._cusTLT || 0) + 1;
                let m = p._cusTLMuc;
                if (m && (m.hp === undefined || m.hp <= 0 || m.invulnAll)) m = p._cusTLMuc = null;
                if (!m && p._cusTLT <= 2) m = p._cusTLMuc = cusTLTim(p);
                if (m && p._cusTLT > CUS_TL_THANG){
                    let cx = p.x + p.w/2, cy = p.y + p.h/2;
                    let gx = (m.x + (m.w||20)/2) - cx, gy = (m.y + (m.h||20)/2) - cy;
                    let gd = Math.hypot(gx, gy) || 1;
                    let toc = Math.min(CUS_TL_TOCMAX, (Math.hypot(p.speed || 0, p.vy || 0) || CUS_TL_TOC) + 0.14);
                    p.speed += (gx / gd * toc - p.speed) * CUS_TL_BE;
                    p.vy     = (p.vy || 0) + ((gy / gd * toc - (p.vy || 0)) * CUS_TL_BE) + CUS_TL_TRONG * 0.35;
                } else {
                    p.vy = (p.vy || 0) + CUS_TL_TRONG;
                }
                if (!p._cusTLXong && p.y + p.h >= 320){
                    p._cusTLXong = 1;
                    cusTLNo(p.x + p.w/2, 316, p.dmg, p.hitIds);
                    p.y = 99999;                      // day ra ngoai de vong lap tu don
                }
                return;
            }
            if (!p || !p._cusXa) return;
            p._cusDi = (p._cusDi || 0) + Math.abs(p.speed || 0);
            let tran = cusXaTran();
            p.dmg = 1 + Math.max(0, Math.min(tran - 1, p._cusDi / cusXaDoc()));
            /* VIEN DAN TO DAN THEO QUANG DUONG — dung tinh than cua Pulsar: bay cang xa
               thi vien dan cang lon va cang dau, nhin la biet ngay no dang o muc nao. */
            let _u = Math.max(0, Math.min(1, p._cusDi / (cusXaDoc() * (cusXaTran() - 1))));
            p.w = (p._cusW0 || CUS_VIEN_W) * (1 + 1.1 * _u);
            p.h = (p._cusH0 || CUS_VIEN_H) * (1 + 1.1 * _u);
            p._cusU = _u;
            /* DA BO HAN HIEU UNG NAY VACH.
               Ban dau cap 2 cho vien dan nay lai tu vach ba lan. Hai van de: mot la no
               nay THANG nguoc lai chu khong toa nhieu huong nhu Prism, nen chi la mot cach
               danh them mot cach vo hinh; hai la de no danh lai cung mot muc tieu thi
               sat thuong vot len 33.6 moi giay. Ca hai deu la sat thuong ao. Cap 2 gio chi
               con nang tran sat thuong len 3. */
        }
// PLAYER_PART_END s4.cusDanBuoc.1

// index.html:64389 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_HE_TANG.1 EDITABLE
const CUS_HE_TANG = 0.4;
// PLAYER_PART_END s4.CUS_HE_TANG.1
