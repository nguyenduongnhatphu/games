// PLAYER_FILE: DamageShared
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, TD_HS, VK, beamClashReceive, bosses, critChuoi, critNhan, floatingTexts, hasRune, prismDmg, rollCrit, tdSauLung, visualEffects
// index.html:47160 · Phạm vi: global
// PLAYER_PART_BEGIN s3.installFirstStrikeHook.1 EDITABLE
function installFirstStrikeHook(b) {
            if (!b || b._firstStrikeHooked || !Object.prototype.hasOwnProperty.call(b, 'hp')) return;
            /* HINH NOM KHONG AN FIRST STRIKE. Mau cua no la so gia (999.999) va no tu nap
               day lai moi khung, nen 20% mau toi da ra 200.000 — con so do khong co y nghia
               gi ma con lam hong ca bang DPS / DINH / TONG cua chinh cai ban do. */
            if (b.name === "TRAINING DUMMY" || b._beamClashPoint) return;
            b._firstStrikeHooked = true;
            if (typeof b.maxHp !== 'number' || b.maxHp <= 0) b.maxHp = b.hp;
            let _hp = b.hp;
            Object.defineProperty(b, 'hp', {
                configurable: true, enumerable: true,
                get(){ return _hp; },
                set(v){
                    let old = _hp;
                    if (v < old && !b._firstStrikeUsed && hasRune('firststrike') && !b.invulnAll) {
                        let bonus = Math.ceil((b.maxHp || old) * 0.20);
                        _hp = Math.max(0, v - bonus);
                        b._firstStrikeUsed = true;
                        if (typeof floatingTexts !== 'undefined') floatingTexts.push(new FloatingText(b.x + b.w/2 - 25, b.y - 22, 'FIRST STRIKE!'));
                    } else { _hp = v; }
                }
            });
        }
// PLAYER_PART_END s3.installFirstStrikeHook.1

// index.html:47183 · Phạm vi: global
// PLAYER_PART_BEGIN s3.installFirstStrikeHooks.1 EDITABLE
function installFirstStrikeHooks() {
            if (typeof bosses !== 'undefined') bosses.forEach(installFirstStrikeHook);
        }
// PLAYER_PART_END s3.installFirstStrikeHooks.1

// index.html:47201 · Phạm vi: global
// PLAYER_PART_BEGIN s3.dealDamage.1 EDITABLE
function dealDamage(o, amount, kieu, proj, multiplier){
            if (!o || o.invulnAll) return false;
            if (o._beamClashPoint) {
                if (proj?.owner !== undefined && proj.owner !== 1) return false;
                const power=kieu==='prism'&&proj?prismDmg(proj,o)*(multiplier??1):amount;
                return beamClashReceive(o,power);
            }
            // Boss co the DO don: tra ve true = don bi do. Dung cho cac boss co guard pha duoc.
            if (typeof o.anDon === 'function' && o.anDon({amount,kieu,proj,multiplier})) return false;
            if (typeof installFirstStrikeHook === 'function') installFirstStrikeHook(o);
            let dealt = amount, bonus = 0;

            if (kieu === 'prism' && proj){
                let mul = multiplier === undefined ? 1 : multiplier;
                let base = (proj.dmg || 0) * mul;
                let tong = prismDmg(proj, o) * mul;
                bonus = Math.max(0, tong - base);   // phan Khuc Xa: khong an chi mang
                dealt = base;
            }
            // Moi thu XUAT PHAT TU NGUOI CHOI deu co the chi mang neu mang Rune Chi Manh.
            // NGOAI TRU dan tu TRU SUNG cua Rapidfire: tru tu ban lien tuc va dat duoc nhieu
            // cai, cong them chi mang thi manh qua muc.
            if ((kieu === 'ammo' || kieu === 'prism') && !(proj && proj._sentry)){
                let crit = rollCrit();
                o._novaSharedCrit = crit;           // Nova dung chung ket qua roll nay
                if (crit > 1){
                    dealt *= critNhan(crit);   // @@HE-VOCUC
                    if (typeof floatingTexts !== 'undefined')
                        floatingTexts.push(new FloatingText(o.x + o.w/2 - 46, o.y - 28, critChuoi(crit)));
                    visualEffects.push(new Effect(o.x + o.w/2, o.y + o.h/2, 'parry', false));
                }
            }
            if (typeof tdSauLung === 'function' && tdSauLung(o)){ dealt *= TD_HS; bonus *= TD_HS; }   // @@HE-TUDIA: DON SAU LUNG +50%
            o.hp -= dealt + bonus;
            if (o.hp <= 0 && o.dead !== undefined) o.dead = true;
            return true;
        }
// PLAYER_PART_END s3.dealDamage.1

// index.html:47239 · Phạm vi: global
// PLAYER_PART_BEGIN s3.damageBossWithFirstStrike.1 EDITABLE
function damageBossWithFirstStrike(b, amount){ return dealDamage(b, amount, 'flat'); }
// PLAYER_PART_END s3.damageBossWithFirstStrike.1

// index.html:47250 · Phạm vi: global
// PLAYER_PART_BEGIN s3.CRIT3_GOC.1 EDITABLE
const CRIT3_GOC = 0.25;
// PLAYER_PART_END s3.CRIT3_GOC.1

// index.html:47305 · Phạm vi: global
// PLAYER_PART_BEGIN s3.damageBossFromAmmo.1 EDITABLE
function damageBossFromAmmo(b, amount){ return dealDamage(b, amount, 'ammo'); }
// PLAYER_PART_END s3.damageBossFromAmmo.1

// index.html:47309 · Phạm vi: global
// PLAYER_PART_BEGIN s3.damageFromAmmoAny.1 EDITABLE
function damageFromAmmoAny(o, amount){ if (!o) return false; return dealDamage(o, amount, 'ammo'); }
// PLAYER_PART_END s3.damageFromAmmoAny.1

// index.html:47311 · Phạm vi: global
// PLAYER_PART_BEGIN s3.damagePrismBossWithRunes.1 EDITABLE
function damagePrismBossWithRunes(b, proj, multiplier = 1){ return dealDamage(b, 0, 'prism', proj, multiplier); }
// PLAYER_PART_END s3.damagePrismBossWithRunes.1

// index.html:47313 · Phạm vi: global
// PLAYER_PART_BEGIN s3.CUS_DAN.1 EDITABLE
const CUS_DAN      = 14;
// PLAYER_PART_END s3.CUS_DAN.1

// index.html:47317 · Phạm vi: global
// PLAYER_PART_BEGIN s3.PT_DAN.1 EDITABLE
const PT_DAN = 16, KV_DAN = 17;
// PLAYER_PART_END s3.PT_DAN.1

// index.html:47321 · Phạm vi: global
// PLAYER_PART_BEGIN s3.LH_DAN.1 EDITABLE
const LH_DAN = 18;
// PLAYER_PART_END s3.LH_DAN.1

// index.html:47322 · Phạm vi: global
// PLAYER_PART_BEGIN s3.DK_DAN.1 EDITABLE
const DK_DAN = 19;
// PLAYER_PART_END s3.DK_DAN.1

// index.html:47323 · Phạm vi: global
// PLAYER_PART_BEGIN s3.laCusDan.1 EDITABLE
function laCusDan(a){ return a === CUS_DAN || a === PT_DAN || a === KV_DAN; }
// PLAYER_PART_END s3.laCusDan.1

// index.html:47326 · Phạm vi: global
// PLAYER_PART_BEGIN s3.ammoToiDa.1 EDITABLE
function ammoToiDa(a){
            if (typeof VK !== 'undefined' && VK[a] && VK[a].theLuc) return typeof VK[a].theLuc === 'function' ? VK[a].theLuc() : VK[a].theLuc;   // @@KHOI-VK
            return 6;
        }
// PLAYER_PART_END s3.ammoToiDa.1

// index.html:47334 · Phạm vi: global
// PLAYER_PART_BEGIN s3.jkKep.1 EDITABLE
function jkKep(a){
            if (typeof VK !== 'undefined' && VK[a] && VK[a].jkKep) return VK[a].jkKep();   // @@KHOI-VK
            return false;
        }
// PLAYER_PART_END s3.jkKep.1
