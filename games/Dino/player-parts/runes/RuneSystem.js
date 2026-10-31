// PLAYER_FILE: RuneSystem
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: AMMO_NAMES, FloatingText, KHOA_COMBO, LT, POWERS, RUNES, SFX, apexOn, canvas, combatStance, comboKhoa, currentAmmoType, currentForm, currentLang, currentPower, danteOn, floatingTexts, gameState, ironOn, lhDongBo, runePicker, trdDongBo, vergilOn, wkgDongBo, xBat, xDongBo
// index.html:83696 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeSlots.1 EDITABLE
let runeSlots = [null, null];
// PLAYER_PART_END s6.runeSlots.1

// index.html:83697 · Phạm vi: global
// PLAYER_PART_BEGIN s6.ExpressionStatement.1 EDITABLE
(function(){ try { let sv = JSON.parse(localStorage.getItem('dino_runes') || '[]'); runeSlots = [sv[0]||null, sv[1]||null]; } catch(e){} })();
// PLAYER_PART_END s6.ExpressionStatement.1

// index.html:83700 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeLevelPick.1 EDITABLE
let runeLevelPick = null;
// PLAYER_PART_END s6.runeLevelPick.1

// index.html:83742 · Phạm vi: global
// PLAYER_PART_BEGIN s6.IfStatement.1 EDITABLE
if (Array.isArray(runeSlots) && runeSlots.indexOf('luoihai') >= 0){
            runeSlots = runeSlots.map(v => v === 'luoihai' ? null : v);
            if (!runeSlots[0] && runeSlots[1]) runeSlots = [runeSlots[1], null];
            try { localStorage.setItem('dino_runes', JSON.stringify(runeSlots)); } catch(e){}
        }
// PLAYER_PART_END s6.IfStatement.1

// index.html:83798 · Phạm vi: global
// PLAYER_PART_BEGIN s6.BlockStatement.1 EDITABLE
{ let _r;
          _r = RUNES.find(x => x.id === 'shintrick');  if (_r) _r.onlyPower = 0;
          _r = RUNES.find(x => x.id === 'trienlien');  if (_r) _r.onlyPower = 0; }
// PLAYER_PART_END s6.BlockStatement.1

// index.html:83802 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeOnlyAmmo.1 EDITABLE
function runeOnlyAmmo(id){ let r = RUNES.find(x => x.id === id); return (r && r.onlyAmmo !== undefined) ? r.onlyAmmo : -1; }
// PLAYER_PART_END s6.runeOnlyAmmo.1

// index.html:83803 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeAmmoLabel.1 EDITABLE
function runeAmmoLabel(id){ let r = RUNES.find(x => x.id === id); if (r && Array.isArray(r.onlyAmmoAny)) return r.onlyAmmoAny.map(a => AMMO_NAMES[a]).join(' / '); return AMMO_NAMES[runeOnlyAmmo(id)] || ''; }
// PLAYER_PART_END s6.runeAmmoLabel.1

// index.html:83804 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeOnlyStance.1 EDITABLE
function runeOnlyStance(id){ let r = RUNES.find(x => x.id === id); return (r && r.onlyStance !== undefined) ? r.onlyStance : -1; }
// PLAYER_PART_END s6.runeOnlyStance.1

// index.html:83815 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeOnlyPower.1 EDITABLE
function runeOnlyPower(id){ let r = RUNES.find(x => x.id === id); return (r && r.onlyPower !== undefined) ? r.onlyPower : -1; }
// PLAYER_PART_END s6.runeOnlyPower.1

// index.html:83819 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeLocked.1 EDITABLE
function runeLocked(id){
            if(id==='triplejump'&&currentForm===4)return true;
            if(currentAmmoType===20&&['chanshld','chanshldx','bulletclash'].includes(id))return true;
            if(apexOn())return true;
            let pw = runeOnlyPower(id);
            if (pw >= 0 && currentPower !== pw) return true;          // @@HE-KHOAPOWER
            let a = runeOnlyAmmo(id); if (a >= 0 && currentAmmoType !== a) return true;
            let r = RUNES.find(x => x.id === id);
            if (r && Array.isArray(r.onlyAmmoAny)) return r.onlyAmmoAny.indexOf(currentAmmoType) < 0;
            return false; }
// PLAYER_PART_END s6.runeLocked.1

// index.html:83829 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeStanceOff.1 EDITABLE
function runeStanceOff(id){ let st = runeOnlyStance(id); return st >= 0 && combatStance !== st; }
// PLAYER_PART_END s6.runeStanceOff.1

// index.html:83849 · Phạm vi: global
// PLAYER_PART_BEGIN s6.PET_RUNE_IDS.1 EDITABLE
const PET_RUNE_IDS = new Set(['pet','petx','pet2','pet2x','pet3','pet3x','pet4','pet4x','pet5','pet5x','pet6','pet6x','revive','revivex','instult','instultx','chanshld','chanshldx','critstrike','critstrikex']);
// PLAYER_PART_END s6.PET_RUNE_IDS.1

// index.html:83851 · Phạm vi: global
// PLAYER_PART_BEGIN s6.RNAME.1 EDITABLE
function RNAME(o){ return (currentLang==='en' && o && o.nameEn) ? o.nameEn : (o ? o.name : ''); }
// PLAYER_PART_END s6.RNAME.1

// index.html:83852 · Phạm vi: global
// PLAYER_PART_BEGIN s6.RDESC.1 EDITABLE
function RDESC(o){ return (currentLang==='en' && o && o.descEn) ? o.descEn : (o ? (o.desc||'') : ''); }
// PLAYER_PART_END s6.RDESC.1

// index.html:83860 · Phạm vi: global
// PLAYER_PART_BEGIN s6.RUNE_CAT_OF.1 EDITABLE
const RUNE_CAT_OF = {
            battu:'test',
            hp:'surv', maxgrow:'surv', fullheal:'surv', redbird:'surv', shield:'surv',
            bulletclash:'fight', hover:'fight', triplejump:'fight', bodyslam:'fight', firststrike:'fight', hyperspeed:'fight', headbutt:'fight', afterimg:'auto', vohahan:'surv', tudia:'fight', apsuat:'fight', vanxa:'surv'
        };
// PLAYER_PART_END s6.RUNE_CAT_OF.1

// index.html:83875 · Phạm vi: global
// PLAYER_PART_BEGIN s6.RUNE_DOCQUYEN.1 EDITABLE
const RUNE_DOCQUYEN = new Set(['trienlien','katana','swordmaster','shintrick','huvo','chanlong','cus3o','rgcounter']);
// PLAYER_PART_END s6.RUNE_DOCQUYEN.1

// index.html:83876 · Phạm vi: global
// PLAYER_PART_BEGIN s6.RUNE_CATS.1 EDITABLE
const RUNE_CATS = [
            /* Muc THU NGHIEM dat LEN DAU danh sach — day la cong cu Hans mo ra de xem bo don,
               nen no phai o ngay cho voi tay toi chu khong phai cuoi mot danh sach dai. Nhan da
               ghi ro "KHONG TINH DIEM" nen khong the nham no la mot lua chon choi duoc. */
            { key:'test',  name:'THỬ NGHIỆM — KHÔNG TÍNH ĐIỂM', nameEn:'TEST — SCORE NOT SAVED', col:'#78909C', big:true },
            { key:'surv',  name:'SINH TỒN',  nameEn:'SURVIVAL',  col:'#66BB6A' },
            { key:'fight', name:'CHIẾN ĐẤU', nameEn:'COMBAT',    col:'#29B6F6' },
            { key:'auto',  name:'TỰ ĐỘNG',   nameEn:'AUTOMATIC', col:'#AB47BC' },
            { key:'doc',   name:'ĐỘC QUYỀN — CẦN ĐÚNG ĐẠN / THẾ / POWER', nameEn:'EXCLUSIVE — NEEDS THE RIGHT AMMO / STANCE / POWER', col:'#EF5350', big:true },
            { key:'awak',  name:'THỨC TỈNH — 2 Ô', nameEn:'AWAKENED — 2 SLOTS', col:'#FF8F00', big:true }
        ];
// PLAYER_PART_END s6.RUNE_CATS.1

// index.html:83907 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeScroll.1 EDITABLE
let runeScroll = 0;
// PLAYER_PART_END s6.runeScroll.1

// index.html:83954 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeMerged.1 EDITABLE
function runeMerged(){ return !!runeSlots[0] && runeSlots[0] === runeSlots[1] && runeCost(runeSlots[0]) === 2; }
// PLAYER_PART_END s6.runeMerged.1

// index.html:83958 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeXem.1 EDITABLE
let runeXem = null;
// PLAYER_PART_END s6.runeXem.1

// index.html:83959 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeXemScroll.1 EDITABLE
let runeXemScroll = 0, runeXemMax = 0;
// PLAYER_PART_END s6.runeXemScroll.1

// index.html:83960 · Phạm vi: global
// PLAYER_PART_BEGIN s6.RUNE_LUP.1 EDITABLE
const RUNE_LUP = 20;
// PLAYER_PART_END s6.RUNE_LUP.1

// index.html:83969 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeTomHay.1 EDITABLE
function runeTomHay(r){
            if (!r) return '';
            let t = RUNE_TOM[r.id];
            if (t) return LT(t.vi, t.en);
            return runeTomTat(RDESC(r));
        }
// PLAYER_PART_END s6.runeTomHay.1

// index.html:83980 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeKhoaTom.1 EDITABLE
function runeKhoaTom(id){
            let r = RUNES.find(x => x.id === id);
            if (r && r.onlyPower !== undefined && typeof POWERS !== 'undefined' && POWERS[r.onlyPower]){
                let pn = currentLang === 'en' ? POWERS[r.onlyPower].tenEn : POWERS[r.onlyPower].ten;
                return 'POWER ' + pn + (r.onlyAmmo !== undefined ? ' + ' + AMMO_NAMES[r.onlyAmmo] : '');
            }
            return runeAmmoLabel(id);
        }
// PLAYER_PART_END s6.runeKhoaTom.1

// index.html:83989 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeDongKhoa.1 EDITABLE
function runeDongKhoa(r){
            if (!r) return '';
            if(currentAmmoType===20&&['chanshld','chanshldx','bulletclash'].includes(r.id))return LT('KHÔNG DÙNG VỚI SONG SÚNG','UNAVAILABLE FOR DUAL GUNS');
            // Power dat TRUOC loai dan: no la dieu kien nang hon (Tam Luan vua doc quyen
            // Rapidfire vua doi Power CO BAN, va cai chan truoc la Power).
            if (r.onlyPower !== undefined && typeof POWERS !== 'undefined' && POWERS[r.onlyPower]){
                let _pn = currentLang === 'en' ? POWERS[r.onlyPower].tenEn : POWERS[r.onlyPower].ten;
                let _kem = r.onlyAmmo !== undefined ? (' + ' + AMMO_NAMES[r.onlyAmmo]) : '';
                return LT('CẦN POWER ', 'NEEDS POWER ') + _pn + _kem;
            }
            if (r.onlyAmmo !== undefined) return LT('ĐỘC QUYỀN ', 'ONLY ') + AMMO_NAMES[r.onlyAmmo];
            if (Array.isArray(r.onlyAmmoAny)) return LT('CHỈ DÙNG VỚI ', 'ONLY WITH ') + r.onlyAmmoAny.map(a => AMMO_NAMES[a]).join(' / ');
            // Rune khong KHOA nguoi choi o mot the — no chi NGU khi ban roi the do. Chu
            // 'DOC QUYEN' truoc day khien nguoi choi tuong minh bi ghim lai, khong dung.
            if (r.onlyStance !== undefined) return LT('CHỈ CHẠY Ở THẾ ', 'ACTIVE ONLY IN ') + ['GUNSLINGER','TRICKSTER','ROYAL GUARD'][r.onlyStance];
            return '';
        }
// PLAYER_PART_END s6.runeDongKhoa.1

// index.html:84008 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeTomTat.1 EDITABLE
function runeTomTat(t){
            let d = String(t || '').replace(/\n/g, ' ').trim();
            d = d.replace(/^T\u1ed1n\s*\d+\s*\u00f4\.\s*/i, '');          // "Ton 2 o."
            d = d.replace(/^Costs?\s*\d+\s*slots?\.\s*/i, '');
            d = d.replace(/^\u0110\u1ed8C QUY\u1ec0N [A-Z0-9 ]+\.\s*/, '');  // "DOC QUYEN RAPIDFIRE."
            d = d.replace(/^[A-Z0-9 ]+ ONLY\.\s*/, '');
            let cham = d.indexOf('. ');
            if (cham > 10 && cham < 62) d = d.slice(0, cham + 1);
            if (d.length > 46) d = d.slice(0, 45) + '\u2026';
            return d;
        }
// PLAYER_PART_END s6.runeTomTat.1

// index.html:84020 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeTachDoan.1 EDITABLE
function runeTachDoan(t){
            return String(t || '').split('. ').map(x => x.trim()).filter(x => x.length);
        }
// PLAYER_PART_END s6.runeTachDoan.1

// index.html:84034 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeCost.1 EDITABLE
function runeCost(id){ let r = RUNES.find(x => x.id === id); return (r && r.cost) ? r.cost : 1; }
// PLAYER_PART_END s6.runeCost.1

// index.html:84035 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeIcon.1 EDITABLE
function runeIcon(id){ let r = RUNES.find(x => x.id === id); return r ? r.icon : ''; }
// PLAYER_PART_END s6.runeIcon.1

// index.html:84276 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dongBoPowerRune.1 EDITABLE
function dongBoPowerRune(){
            if (typeof wkgDongBo === 'function') wkgDongBo();
            if (typeof trdDongBo === 'function') trdDongBo();
            if (typeof lhDongBo === 'function') lhDongBo();
            if (typeof xDongBo === 'function') xDongBo();
        }
// PLAYER_PART_END s6.dongBoPowerRune.1

// index.html:84282 · Phạm vi: global
// PLAYER_PART_BEGIN s6.goRuneDocQuyenLech.1 EDITABLE
function goRuneDocQuyenLech(){
            let doi = false;
            for (let i = 0; i < 2; i++){
                let id = runeSlots[i];
                if (id && runeOnlyAmmo(id) >= 0 && runeOnlyAmmo(id) !== currentAmmoType){ runeSlots[i] = null; doi = true; }
            }
            if (doi){ saveRunes(); dongBoPowerRune(); }
        }
// PLAYER_PART_END s6.goRuneDocQuyenLech.1

// index.html:84310 · Phạm vi: global
// PLAYER_PART_BEGIN s6.RUNE_TOM.1 EDITABLE
const RUNE_TOM = {
            trienlien: { vi:'Thay đổi mạnh về lối chơi của Rapidfire. Ba thế đã chứa trọn bộ kỹ năng lẫn chiêu cuối, nên chiêu cuối và khiên tay bị khoá. Sử dụng các Stance đang có như những năng lực khác nhau và phải thay đổi Stance liên tục để tận dụng tối đa khả năng của Rune.',
                         en:'A hard rewrite of how Rapidfire plays. The three stances already hold the full kit including the ultimate, so the ultimate and the hand shield are locked. Each stance becomes a different ability, and you must keep rotating stances to get anything out of it.' },
            unity:      { vi:'Mang ba loại đạn cùng lúc và đổi giữa trận bằng Q / E. Đổi lại, chiêu cuối riêng của từng loại bị khoá và thay bằng một đòn Hợp Nhất chung mang đặc tính của cả ba hệ.',
                          en:'Carry three ammo types and swap mid-fight with Q / E. In exchange each ammo loses its own Ultimate, replaced by one shared Fusion strike carrying all three traits.' },
            swordmaster:{ vi:'Nâng toàn bộ bộ kiếm DinoSword lên một bậc: tầm chém xa hơn, lướt có phòng thủ, và mỗi đòn ra thành hai nhát.',
                          en:'Upgrades the whole DinoSword kit: longer reach, defensive dashes, and every strike comes out twice.' },
            shintrick:  { vi:'Biến thế Trickster thành lối chơi cơ động tuyệt đối: bắn thường vô hạn, ba lần lướt liên tiếp, và một chiêu cuối dừng thời gian.',
                          en:'Turns Trickster into pure mobility: unlimited normal fire, three chained dashes, and a time-stop ultimate.' },
            explshot:   { vi:'Mọi loại đạn đều nổ lan và để lại dấu ấn phát nổ lần hai. Càng bắn trải rộng thì càng rải bom khắp bản đồ.',
                          en:'Every ammo splashes and leaves a mark that detonates again. Spreading your shots carpets the map in blasts.' }
        };
// PLAYER_PART_END s6.RUNE_TOM.1

// index.html:85519 · Phạm vi: global
// PLAYER_PART_BEGIN s6.comboTenRune.1 EDITABLE
function comboTenRune(id){ let r = RUNES.find(x => x.id === id); return r ? RNAME(r) : id; }
// PLAYER_PART_END s6.comboTenRune.1

// index.html:85520 · Phạm vi: global
// PLAYER_PART_BEGIN s6.setRuneSlot.1 EDITABLE
function setRuneSlot(id){
            let oi = runePicker === 0 ? 1 : 0, other = runeSlots[oi];
            { let kh = comboKhoa(id, runePicker);
              if (kh){
                floatingTexts.push(new FloatingText(canvas.width/2 - 120, 96,
                    LT('KHÔNG DÙNG CHUNG VỚI ' + comboTenRune(kh.doiThu),
                       'CANNOT COMBO WITH ' + comboTenRune(kh.doiThu))));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(180, 0.14, 'square', 0.16, 120);
                return;
              } }
            if (id && runeCost(id) === 2) { runeSlots = [id, id]; }
            else if (id && id === other && runeCost(id) === 1) { /* trung o kia -> bo qua */ }
            else { if (other && runeCost(other) === 2) runeSlots[oi] = null; runeSlots[runePicker] = id; }
            saveRunes();
        }
// PLAYER_PART_END s6.setRuneSlot.1

// index.html:88117 · Phạm vi: global
// PLAYER_PART_BEGIN s6.hasRune.1 EDITABLE
function hasRune(id){
            if(apexOn() || (typeof danteOn==='function'&&danteOn()) || (typeof vergilOn==='function'&&vergilOn()) || (typeof ironOn==='function'&&ironOn()))return false;
            if (typeof xBat === 'function' && xBat()) return false;
            if (runeSlots[0] !== id && runeSlots[1] !== id) return false;
            if (runeLocked(id)) return false;
            return !runeStanceOff(id);
        }
// PLAYER_PART_END s6.hasRune.1

// index.html:88274 · Phạm vi: global
// PLAYER_PART_BEGIN s6.saveRunes.1 EDITABLE
function saveRunes(){ try { localStorage.setItem('dino_runes', JSON.stringify(runeSlots)); } catch(e){} }
// PLAYER_PART_END s6.saveRunes.1

// index.html:88278 · Phạm vi: global
// PLAYER_PART_BEGIN s6.quetRuneBatHopPhap.1 EDITABLE
function quetRuneBatHopPhap(baoTin){
            let thao = [];
            // sai loai dan
            for (let i = 0; i < 2; i++){
                let id = runeSlots[i];
                if (id && typeof runeLocked === 'function' && runeLocked(id)){ thao.push(id); runeSlots[i] = null; }
            }
            // ky combo: giu rune o o 1, thao rune o o 2
            for (let nh of KHOA_COMBO){
                let a0 = runeSlots[0], b0 = runeSlots[1];
                if (a0 && b0 && a0 !== b0 && nh.ids.indexOf(a0) >= 0 && nh.ids.indexOf(b0) >= 0){
                    thao.push(b0); runeSlots[1] = null;
                }
            }
            if (thao.length){
                saveRunes();
                if (baoTin && typeof floatingTexts !== 'undefined' && typeof FloatingText === 'function')
                    for (let k = 0; k < thao.length; k++)
                        floatingTexts.push(new FloatingText(canvas.width/2 - 130, 120 + k*22,
                            LT('ĐÃ THÁO: ' + comboTenRune(thao[k]), 'UNEQUIPPED: ' + comboTenRune(thao[k]))));
            }
            return thao;
        }
// PLAYER_PART_END s6.quetRuneBatHopPhap.1

// index.html:92493 · Phạm vi: global
// PLAYER_PART_BEGIN s6.pvpRuneCat.1 EDITABLE
let pvpRuneCat = null;
// PLAYER_PART_END s6.pvpRuneCat.1

// index.html:92500 · Phạm vi: global
// PLAYER_PART_BEGIN s6.pvpCatRune.1 EDITABLE
function pvpCatRune(){
            if (pvpRuneCat) return;
            pvpRuneCat = [runeSlots[0], runeSlots[1]];
            runeSlots = [null, null];
        }
// PLAYER_PART_END s6.pvpCatRune.1

// index.html:92506 · Phạm vi: global
// PLAYER_PART_BEGIN s6.pvpTraRune.1 EDITABLE
function pvpTraRune(){
            if (!pvpRuneCat) return;
            runeSlots = [pvpRuneCat[0], pvpRuneCat[1]];
            pvpRuneCat = null;
        }
// PLAYER_PART_END s6.pvpTraRune.1

// index.html:92515 · Phạm vi: global
// PLAYER_PART_BEGIN s6.pvpRuneCanh.1 EDITABLE
function pvpRuneCanh(){
            if (gameState !== 'pvp' && gameState !== 'pvp_setup') pvpTraRune();
        }
// PLAYER_PART_END s6.pvpRuneCanh.1
