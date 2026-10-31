// PLAYER_FILE: RuneEffects01
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: AI_BODY_PAL, AI_NEON_PAL, BUA_TIERS_TAY, CHARGE_TIERS, Effect, FloatingText, GD_DAN, HVBP_NGUOI, HVBP_NGUOI2, HVBP_R0, HVBP_R_MAX, HVBP_R_MM, HVBP_TRAN, HVBP_TRAN_TRUOT, KAT_TIERS, LIFESTEAL_BURST_CAP, LIFESTEAL_NEED, LT, OC_FULL, PET6_GROW, PET6_R0, PET6_RMAX, Projectile, RGC_TAM, RGC_TI, RGC_TRE, SFX, TRD_TIERS, VOLT_TRASH_CAP, WKG_TIERS, addStyle, allTargets, apexOn, bossProjectiles, bosses, canvas, checkAABB, clashHpOf, combatStance, ctx, currentAmmoType, currentForm, damageFromAmmoAny, danteOn, dealDamage, dino, dino2, dragonBat, drawNeonClone, drawPet1, drawPet2, drawPet3, drawPet4, drawPet5, drawPet6, drawPet6Orbs, drawPetShieldBubble, drawPetShot, dtMau, enemies, floatingTexts, frames, gameState, giaoLaCanChien, handleEnemyDeath, hasRune, hitDam, infernoMaxChain, katBat, keys, mapTheme, midasVeDam, novaBlast, parry, parryDamage, perfectParryCd, pet1Cd, pet1GuardAngle, pet1GuardShots, pet1Shots, pet1Tele, pet1X, pet1Y, pet2Cd, pet2Dash, pet2OrbitMines, pet2PendingShots, pet2Shots, pet2Tele, pet2VeDash, pet2VeLua, pet2X, pet2Y, pet3Cd, pet3CooldownReduction, pet3IdleFrames, pet3Tele, pet3X, pet3Y, pet4Cd, pet4Charges, pet4Flash, pet4SpendCd, pet4Tele, pet4X, pet4Y, pet5A, pet5B, pet6Active, pet6Angle, pet6Boost, pet6Rings, pet6TickBoost, pet6TocDo, pet6X, pet6Y, petChargeRing, petFindThreateningProjectile, petFireGuard, petGhiVanToc, petNewSpawn, petNewestEnemy, petPhatHienLao, petPriorityTarget, petSeen, petTeleFlash, petTickGuardShots, petTickShots, previewEnemies, projectiles, pvpDich, pvpNguoi1, pvpVoBoc, shakeTimer, trdBat, visualEffects, voidBat, voltBossTicks, voltTrashTicks, wkgBat, worldL, worldR
// index.html:83830 · Phạm vi: global
// PLAYER_PART_BEGIN s6.shinGuardReset.1 EDITABLE
function shinGuardReset(perfect) {
            if (combatStance !== 2 || !dino) return;    // gio la nang luc GOC cua the, khong can rune
            if (dino.shinGuardCd > 0) return;                 // chong kich hoat lien tuc trong cung mot don
            if (typeof rgcTichTru === 'function') rgcTichTru(perfect || dino.meleeTimer >= 38 || dino.parryWindow > 0);   // @@HE-RGC: do dung nhip = Perfect Parry
            dino.shinGuardCd = 8;
            let full = (combatStance === 2) ? 45 : 30;
            dino.meleeTimer = full;       // TAI KICH HOAT: khien dung nguyen, dem lai tu dau
            dino.shieldCd = 0;            // khong phai cho sac
            dino.parryWindow = 8;         // mo lai cua so Perfect Parry ngay
            perfectParryCd = 0;
            dino.shinFlash = 16;
            visualEffects.push(new Effect(dino.x + dino.w / 2, dino.y + dino.h / 2, 'parry', dino.isFacingLeft));
            floatingTexts.push(new FloatingText(dino.x - 30, dino.y - 40, perfect ? "SHIN GUARD! NẠP LẠI" : "ĐỠ TRÚNG! NẠP LẠI"));
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1180, 0.09, 'triangle', 0.20, 1700);
        }
// PLAYER_PART_END s6.shinGuardReset.1

// index.html:86642 · Phạm vi: global
// PLAYER_PART_BEGIN s6.chanLongBat.1 EDITABLE
function chanLongBat(){
            try { return dragonBat() && typeof hasRune === 'function' && hasRune('chanlong'); }
            catch(e){ return false; }
        }
// PLAYER_PART_END s6.chanLongBat.1

// index.html:87915 · Phạm vi: global
// PLAYER_PART_BEGIN s6.hvBoPhapNo.1 EDITABLE
function hvBoPhapNo(){
            if (typeof hasRune !== 'function' || !hasRune('huvo')) return;
            if (typeof dino === 'undefined' || !dino) return;
            dino._hvLan = (dino._hvLan || 0) + 1;                      // dem so cu luot -> ban kinh
            // Cu luot DAU TIEN dung 1cm chan; tu cu thu hai moi no rong them 1mm mot.
            let R = Math.min(HVBP_R_MAX, HVBP_R0 + HVBP_R_MM * (dino._hvLan - 1));
            let cx = dino.x + dino.w/2, cy = dino.y + dino.h/2;
            // Tim muc tieu TRUOC, vi luat cong stack phu thuoc vao co trung hay khong.
            let dinh = [];
            if (typeof allTargets === 'function') for (let o of allTargets()){
                if (!o || o.hp === undefined || o.hp <= 0 || o.invulnAll || o === dino) continue;
                let nx = Math.max(o.x, Math.min(cx, o.x + (o.w || 20)));
                let ny = Math.max(o.y, Math.min(cy, o.y + (o.h || 20)));
                if (Math.hypot(nx - cx, ny - cy) <= R) dinh.push(o);
            }
            let truoc = dino._hvStack || 0;
            // Luot TRUNG: stack leo tiep, chan o HVBP_TRAN. Luot TRUOT: chan o 3.
            dino._hvStack = dinh.length ? Math.min(HVBP_TRAN, truoc + 1)
                                        : Math.min(HVBP_TRAN_TRUOT, truoc + 1);
            let dmg = dino._hvStack;
            if (dinh.length) dino._hvT = 0;              // co trung -> dong ho tut chay lai tu dau
            for (let o of dinh){
                /* Kieu 'flat', KHONG phai 'ammo'. Luat cua game (dong ngay tren
                   `damageBossFromAmmo`) ghi ro: Chi Mang CHI ap dung cho sat thuong TU DAN,
                   khong ap dung cho melee, parry, block, Body Slam hay cac hieu ung noi tai.
                   Vong no cua Hu Vo Bo Phap la mot cu chan dong quanh nguoi — dung ho hang
                   voi Body Slam (von cung di kieu 'flat'), khong phai mot vien dan.
                   De 'ammo' thi rune CHI MANG o o con lai lam moi cu luot co 25% an DOI DON:
                   do duoc stack 6 ma tru 12 mau. Do la cho "dmg cuc ao" chu khong phai loi
                   tinh stack. Doi sang 'flat' la het. (DON DAU TIEN van an nhu moi nguon sat
                   thuong khac, vi no bam vao chinh o `hp` — giong het Body Slam.) */
                if (typeof dealDamage === 'function') dealDamage(o, dmg, 'flat');
                else o.hp -= dmg;
                if (o.hp <= 0 && o.dead !== undefined) o.dead = true;
            }
            visualEffects.push(new Effect(cx, cy, 'body_slam_shockwave', true, R));
            if (dinh.length){
                shakeTimer = Math.max(shakeTimer, 10);
                floatingTexts.push(new FloatingText(dino.x - 24, dino.y - 36, "HƯ VÔ ×" + dmg));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(320, 0.12, 'sawtooth', 0.22, 1100);
            }
            // @@HE-STYLISH: diem cua HU VO tinh theo sat thuong o styTick
        }
// PLAYER_PART_END s6.hvBoPhapNo.1

// index.html:87961 · Phạm vi: global
// PLAYER_PART_BEGIN s6.hvBoPhapTick.1 EDITABLE
function hvBoPhapTick(){
            if (typeof dino === 'undefined' || !dino) return;
            if (typeof hasRune !== 'function' || !hasRune('huvo')){ dino._hvT = 0; return; }
            if (!(dino._hvStack > 0)){ dino._hvT = 0; return; }
            dino._hvT = (dino._hvT || 0) + 1;
            if (dino._hvT === HVBP_NGUOI && dino._hvStack > HVBP_TRAN_TRUOT){
                dino._hvStack = HVBP_TRAN_TRUOT;
                floatingTexts.push(new FloatingText(dino.x - 30, dino.y - 38, "HƯ VÔ NGUỘI — ×3"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(300, 0.14, 'sine', 0.14, 150);
            } else if (dino._hvT >= HVBP_NGUOI2 && dino._hvStack > 0){
                dino._hvStack = 0;
                floatingTexts.push(new FloatingText(dino.x - 26, dino.y - 38, "HƯ VÔ TẮT"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(200, 0.16, 'sine', 0.12, 90);
            }
        }
// PLAYER_PART_END s6.hvBoPhapTick.1

// index.html:88018 · Phạm vi: global
// PLAYER_PART_BEGIN s6.hoverAiming.1 EDITABLE
function hoverAiming(){ return typeof dino !== 'undefined' && dino && dino.hoverTimer > 0 && hasRune('hover'); }
// PLAYER_PART_END s6.hoverAiming.1

// index.html:88255 · Phạm vi: global
// PLAYER_PART_BEGIN s6.battuBat.1 EDITABLE
function battuBat(){
            if (typeof gameState !== 'undefined' && gameState === 'pvp') return false;
            return typeof hasRune === 'function' && hasRune('battu');
        }
// PLAYER_PART_END s6.battuBat.1

// index.html:88447 · Phạm vi: global
// PLAYER_PART_BEGIN s6.pet6Gap.1 EDITABLE
function pet6Gap(){ return hasRune('pet6x') ? 40 : 72; }
// PLAYER_PART_END s6.pet6Gap.1

// index.html:88508 · Phạm vi: global
// PLAYER_PART_BEGIN s6.shieldCdNguoiChoi.1 EDITABLE
function shieldCdNguoiChoi(){
            let goc = (combatStance === 2) ? 75 : 90;
            return (typeof hasRune === 'function' && hasRune('pet3x')) ? Math.round(goc * 0.8) : goc;
        }
// PLAYER_PART_END s6.shieldCdNguoiChoi.1

// index.html:88738 · Phạm vi: global
// PLAYER_PART_BEGIN s6.updatePets.1 EDITABLE
function updatePets(){
            if(apexOn())return;
            if (typeof dino === 'undefined' || !dino) return;
            let has1 = hasRune('pet')||hasRune('petx'), l2a = hasRune('petx');
            let has2 = hasRune('pet2')||hasRune('pet2x'), l2b = hasRune('pet2x');
            let has3 = hasRune('pet3')||hasRune('pet3x'), l2c = hasRune('pet3x');
            let has4 = hasRune('pet4')||hasRune('pet4x'), l2d = hasRune('pet4x');
            let has5 = hasRune('pet5')||hasRune('pet5x'), l2e = hasRune('pet5x');
            let has6 = hasRune('pet6')||hasRune('pet6x'), l2f = hasRune('pet6x');
            // theo doi dich MOI xuat hien (cho homing uu tien)
            petNewSpawn = false;
            { let fresh = null; for (let e of enemies) { if (!petSeen.has(e)) fresh = e; } if (fresh) { petNewestEnemy = fresh; petNewSpawn = true; } if (petNewestEnemy && !enemies.includes(petNewestEnemy)) petNewestEnemy = null; petSeen = new Set(enemies); }
            pet1Tele = pet2Tele = pet3Tele = pet4Tele = false;   // reset bao hieu moi frame
            if (has1){
                // C1: 2 attack shots every second.
                // C2: every second creates 5 total shots: 4 attack + 1 defensive orbit shot.
                // Defensive orbit stacks accumulate to 5. Once at 5, the fifth shot is also offensive.
                pet1X=dino.x-34+Math.sin(frames*0.08)*3; pet1Y=dino.y-28+Math.cos(frames*0.06)*4;
                if(pet1Cd>0) pet1Cd--;

                if(pet1Cd<=0){
                    let px=pet1X+12, py=pet1Y+6, best=petPriorityTarget(px,py);

                    if(!l2a){
                        // C1 = exactly 2 offensive shots.
                        if(best){
                            let dx=best.x+best.w/2-px,dy=best.y+best.h/2-py,base=Math.atan2(dy,dx);
                            for(let j=0;j<2;j++){
                                let a=base+(j===0?-0.28:0.28);
                                pet1Shots.push({x:px,y:py,vx:Math.cos(a)*7,vy:Math.sin(a)*7,dmg:1,kind:'homing',age:0,spin:j===0?-0.7:0.7,dive:false,trail:[]});
                            }
                        }
                    }else{
                        // C2: every second creates exactly 3 offensive shots + 1 defensive stack (3 DPS/s, 1 stored guard).
                        if(best){
                            let dx=best.x+best.w/2-px,dy=best.y+best.h/2-py,base=Math.atan2(dy,dx);
                            const spread=[-Math.PI/10,0,Math.PI/10];
                            const spins=[-0.45,0,0.45];
                            for(let j=0;j<3;j++){
                                let a=base+spread[j];
                                pet1Shots.push({x:px,y:py,vx:Math.cos(a)*7,vy:Math.sin(a)*7,dmg:1,kind:'homing',age:0,spin:spins[j],dive:false,trail:[],petFanLock:8});
                            }
                        }
                        let orbitCount=pet1GuardShots.filter(g=>g.orbit).length;
                        if(orbitCount<5){
                            pet1GuardShots.push({x:pet1X+12,y:pet1Y+6,angle:0,r:30,orbit:true,phase:orbitCount*1.2566370614});
                            orbitCount++;
                        }
                        // Reaching five stored guards converts the whole stored volley into an attack.
                        if(orbitCount>=5 && best){
                            let stored=pet1GuardShots.filter(g=>g.orbit).slice(0,5);
                            pet1GuardShots=pet1GuardShots.filter(g=>!g.orbit);
                            for(let g of stored) petFireGuard(g.x,g.y,best,g,'attack');
                        }
                    }

                    
                    pet1Cd=60;
                }

                if(l2a){
                    // One shared angular clock keeps all stored guards evenly spaced and smooth.
                    pet1GuardAngle += 0.045;
                    let orbitShots=pet1GuardShots.filter(g=>g.orbit), orbitCount=orbitShots.length;
                    for(let i=0;i<orbitCount;i++){
                        let g=orbitShots[i];
                        g.angle=pet1GuardAngle + i*(Math.PI*2/orbitCount);
                        g.x=pet1X+12+Math.cos(g.angle)*g.r;
                        g.y=pet1Y+6+Math.sin(g.angle)*g.r;
                    }

                    // Only the real, non-orbit projectile can intercept a boss projectile.
                    let threat=petFindThreateningProjectile();
                    let oi=pet1GuardShots.findIndex(g=>g.orbit), guardBusy=pet1GuardShots.some(g=>!g.orbit);
                    if(threat && oi>=0 && !guardBusy){
                        let g=pet1GuardShots[oi];
                        pet1GuardShots.splice(oi,1);
                        petFireGuard(g.x,g.y,threat,g,'intercept');
                    }

                    // Five stored guards attack together when a target is available.
                    if(orbitCount>=5 && !threat){
                        let target=petPriorityTarget(pet1X+12,pet1Y+6);
                        if(target){
                            let stored=pet1GuardShots.filter(g=>g.orbit).slice(0,5);
                            pet1GuardShots=pet1GuardShots.filter(g=>!g.orbit);
                            for(let g of stored) petFireGuard(g.x,g.y,target,g,'attack');
                        }
                    }
                }else{
                    pet1GuardShots.length=0; pet1GuardAngle=0;
                }

                petTickShots(pet1Shots);
                petTickGuardShots();
            }else{pet1Shots.length=0;pet1GuardShots.length=0;pet1Cd=0;}
            if(has2){
                pet2X=dino.x-34+Math.sin(frames*0.08+2.1)*3;
                pet2Y=dino.y+8+Math.cos(frames*0.06+2.1)*4;
                if(pet2Cd>0)pet2Cd--;

                if(pet2Cd<=0){
                    if(l2b){
                        // ===== C2: DOI HAN LOI CHOI. De bay vut sang ben kia man hinh, BOC LUA,
                        // xuyen qua moi thu tren duong bay (3 sat thuong), dong thoi RAI LUA duoi chan.
                        let huong = (pet2X < (worldL() + worldR())/2) ? 1 : -1;
                        pet2Dash = { x: pet2X, y: 306 - 26, dir: huong, t: 0, daTrung: new Set(), raiCd: 0 };
                        if (typeof SFX!=='undefined' && SFX.tone) SFX.tone(200,0.22,'sawtooth',0.16,90);
                    } else {
                        // ===== C1: ba QUA CAU LUA cau vong di gan/vua/xa, cham dat thi no va DOT MAT DAT.
                        let px=pet2X+12, py=pet2Y+6, huong=dino.isFacingLeft?-1:1;
                        const TAM = [[4.4,-6.8],[8.0,-8.6],[11.6,-10.0]];
                        for(let k=0;k<3;k++)
                            pet2Shots.push({ x:px, y:py, vx:TAM[k][0]*huong, vy:TAM[k][1],
                                             dmg:2, kind:'bay', cauVong:true, to:false });
                        if (typeof SFX!=='undefined' && SFX.tone) SFX.tone(300,0.06,'sawtooth',0.10,180);
                    }
                    pet2OrbitMines.length=0;
                    
                    pet2Cd = l2b ? 210 : 180;   // C1: 3 giay mot loat
                }

                // Fire queued C2 bombs every 0.5s.
                if(l2b && pet2PendingShots.length){
                    for(let q=pet2PendingShots.length-1;q>=0;q--){
                        let item=pet2PendingShots[q];
                        if(item.delay>0){item.delay--;continue;}
                        let px=pet2X+12,py=pet2Y+6,best=petPriorityTarget(px,py);
                        if(best){
                            let dx=best.x+best.w/2-px,dy=best.y+best.h/2-py,base=Math.atan2(dy,dx);
                            pet2Shots.push({x:px,y:py,vx:Math.cos(base)*9.9,vy:Math.sin(base)*9.9,dmg:2,kind:'explode'});
                        }
                        pet2PendingShots.splice(q,1);
                    }
                }

                if(l2b){
                    for(let m of pet2OrbitMines){
                        m.angle+=0.055;
                        m.x=pet2X+12+Math.cos(m.angle)*m.r;
                        m.y=pet2Y+6+Math.sin(m.angle)*m.r;
                    }
                    let best=petPriorityTarget(pet2X+12,pet2Y+6);
                    if(best&&pet2OrbitMines.length){
                        // Target appeared: convert the stored mini-bombs into a 0.5s-spaced volley.
                        while(pet2PendingShots.length<3)
                            pet2PendingShots.push({delay:pet2PendingShots.length*30,offset:0});
                        pet2OrbitMines.length=0;
                    }
                }else{
                    pet2OrbitMines.length=0;
                    pet2PendingShots.length=0;
                }
                petTickShots(pet2Shots);
            }else{
                pet2Shots.length=0;
                pet2OrbitMines.length=0;
                pet2PendingShots.length=0;
                pet2Cd=0;
                
            }
            if(has3){
                let active=dino.petShieldTimer>0, front=dino.isFacingLeft?dino.x-40:dino.x+dino.w+4;
                petGhiVanToc();
                pet3X+=(front-pet3X)*0.3;pet3Y+=((dino.y+2)-pet3Y)*0.3;if(pet3Cd>0)pet3Cd--;
                if(l2c&&pet3Cd<=0&&!active){
                    let threat=petFindThreateningProjectile(), rush=petPhatHienLao();
                    if(threat||rush){dino.petShieldTimer=120;pet3Cd=Math.max(0,480-pet3CooldownReduction);pet3CooldownReduction=0;pet3IdleFrames=0;floatingTexts.push(new FloatingText(dino.x,dino.y-30,rush?'AUTO PARRY!':'AUTO GUARD!'));visualEffects.push(new Effect(front,dino.y+dino.h/2,'parry',dino.isFacingLeft));}
                }
                if(!l2c&&pet3Cd<=0&&!active){dino.petShieldTimer=120;pet3Cd=600;visualEffects.push(new Effect(front,dino.y+dino.h/2,'explosion',true,20));}
                if(l2c&&pet3Cd<=0&&!active){pet3IdleFrames++;if(pet3IdleFrames>=60){pet3IdleFrames-=60;pet3CooldownReduction=Math.min(480,pet3CooldownReduction+30);}}
                if(active){dino.petShieldTimer--;if(dino.petShieldTimer===0){let cx=dino.x+dino.w/2,cy=dino.y+dino.h/2;visualEffects.push(new Effect(cx,cy,'explosion',true,48));for(let o of enemies.concat(bosses)){if(o.invulnAll)continue;if(Math.hypot(o.x+o.w/2-cx,o.y+o.h/2-cy)<112)o.hp-=3;}for(let i=enemies.length-1;i>=0;i--)if(enemies[i].hp<=0){handleEnemyDeath(enemies[i]);enemies.splice(i,1);}}}
            }else{dino.petShieldTimer=0;pet3Cd=0;pet3CooldownReduction=0;pet3IdleFrames=0;}
            if (has4){
                pet4X += ((dino.x + dino.w + 14) - pet4X) * 0.2;
                pet4Y += ((dino.y + 12 + Math.cos(frames*0.05 + 1)*4) - pet4Y) * 0.2;
                if (pet4Flash > 0) pet4Flash--;
                if (pet4SpendCd > 0) pet4SpendCd--;
                if (pet4Cd > 0) pet4Cd--;
                pet4Tele = pet4Cd <= 60 && pet4Cd > 0 && pet4Charges < dino.maxHp;   // nhap nhay 1s truoc khi tich 1 lieu (khong tich khi da day)
                if (pet4Cd <= 0) {
                    if (dino.hp >= dino.maxHp && (dino.runeShield || 0) < 1){   // day mau -> lieu bien thanh LA CHAN (ca C1 lan C2)
                        dino.runeShield = (dino.runeShield || 0) + 1; pet4Flash = 32;
                        floatingTexts.push(new FloatingText(dino.x, dino.y - 34, "LÁ CHẮN!"));
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(660, 0.14, 'sine', 0.18, 1000);
                    } else if (pet4Charges < dino.maxHp) pet4Charges++;
                    pet4Cd = (l2d ? 600 : 720);   // C1 12s / C2 10s (C2 giu nguyen nhu cu)
                }   // TICH lieu hoi (tran = mau toi da)
                // XA lieu tich tru khi mat mau -> hoi lai toan bo so da tich (tung nhip cho de thay, khong bo phi)
                if (pet4Charges > 0 && dino.hp < dino.maxHp && pet4SpendCd <= 0) {
                    dino.hp++; pet4Charges--; pet4SpendCd = 10; pet4Flash = 32;
                    floatingTexts.push(new FloatingText(dino.x, dino.y - 34, "+1 HP"));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880, 0.12, 'sine', 0.16, 1180);
                }
            } else { pet4Charges = 0; }
            // PET 5: C1 = 1 pet every 6s. C2 = 2 C1 pets staggered by 3s: A -> 3s -> B -> 3s -> A.
            function dashPetStep(p,ox,oy){
                p.x+=(ox-p.x)*0.2; p.y+=(oy-p.y)*0.2;
                if(p.dash){
                    let d=p.dash; d.t++; let sp=44; d.x+=d.dir.x*sp; d.y+=d.dir.y*sp; p.x=d.x-8; p.y=d.y-6;
                    let box={x:d.x+d.dir.x*8-26,y:d.y+d.dir.y*8-26,w:52,h:52};
                    for(let o of enemies.concat(bosses)) if(!o.invulnAll&&!d.hit.has(o)&&checkAABB(box,o)){ d.hit.add(o); o.hp-=3; visualEffects.push(new Effect(o.x+o.w/2,o.y+o.h/2,'explosion',true,14)); }
                    if(d.t>30){ if(!d.second) p.dash={dir:{x:-d.dir.x,y:-d.dir.y},t:0,x:d.x,y:d.y,hit:new Set(),second:true}; else p.dash=null; }
                    return;
                }
                if(p.cd>0) p.cd--;
                if(p.cd<=0){ p.cd=180; if(p.charges<2)p.charges++; }
                if(p.charges){
                    let pool=enemies.concat(bosses).filter(o=>!o.invulnAll);
                    if(pool.length){
                        let cx=dino.x+dino.w/2,cy=dino.y+dino.h/2,best={x:1,y:0},bc=-1;
                        for(let ang of [0,Math.PI,-.32,Math.PI+.32,-.6,Math.PI+.6,.32,Math.PI-.32]){
                            let v={x:Math.cos(ang),y:Math.sin(ang)},c=0;
                            for(let o of pool){let ox=o.x+o.w/2-cx,oy=o.y+o.h/2-cy,pr=ox*v.x+oy*v.y;if(pr>10&&Math.abs(ox*(-v.y)+oy*v.x)<50)c++;}
                            if(c>bc){bc=c;best=v;}
                        }
                        p.dash={dir:best,t:0,x:cx-best.x*90,y:cy-best.y*90,hit:new Set(),second:false}; p.charges--;
                    }
                }
            }
            if(has5){
                dashPetStep(pet5A,dino.x-22,dino.y-44+Math.cos(frames*.05)*4);
                if(l2e)dashPetStep(pet5B,dino.x+22,dino.y-44+Math.cos(frames*.05+2)*4);
            }else{pet5A={x:0,y:0,cd:0,dash:null,charges:0};pet5B={x:0,y:0,cd:180,dash:null,charges:0};}
            // PET 6 (6 DAN XOAY): 6 dan xuyen xoay quanh, dan xa dan, 1 dmg/trung
            if (has6){
                pet6X += ((dino.x + dino.w - 6) - pet6X)*0.2; pet6Y += ((dino.y - 44 + Math.cos(frames*0.05+1)*4) - pet6Y)*0.2;
                
                pet6Active = true;                                        // VONG SAO CHAY VINH VIEN — khong can kich hoat
                {
                    pet6TickBoost();
                    let _sp = pet6TocDo();
                    pet6Angle += 0.05 * _sp;
                    let cxp = dino.x + dino.w/2, cyp = dino.y + dino.h/2;
                    let MAXR = l2f ? 7 : 4;                              // C1: 4 vong | C2: 7 vong
                    // vong lon dan ra; vuot tam thi tan
                    for (let i = pet6Rings.length - 1; i >= 0; i--){
                        pet6Rings[i].r += PET6_GROW;
                        if (pet6Rings[i].r > PET6_RMAX) pet6Rings.splice(i, 1);
                    }
                    // du xa thi sinh vong MOI o trong cung
                    let inner = pet6Rings.length ? Math.min(...pet6Rings.map(v => v.r)) : 9999;
                    if (pet6Rings.length < MAXR && inner >= PET6_R0 + pet6Gap())
                        pet6Rings.push({ r: PET6_R0, d: (pet6Rings.length % 2 === 0) ? 1 : -1, ph: Math.random() * 6.28 });
                    if (!pet6Rings.length) pet6Rings.push({ r: PET6_R0, d: 1, ph: 0 });
                    for (let ri = 0; ri < pet6Rings.length; ri++){
                        let rg = pet6Rings[ri], R = rg.r;
                        for (let b = 0; b < 3; b++){ let a = rg.d * pet6Angle + rg.ph + b*(Math.PI*2/3);
                            let bxp = cxp + Math.cos(a)*R, byp = cyp + Math.sin(a)*R;
                            for (let o of allTargets()){ if (o.invulnAll) continue;
                                if (Math.hypot((o.x+(o.w||20)/2)-bxp,(o.y+(o.h||20)/2)-byp) < ((o.w||20)/2+10)){
                                    if (!o._p6) o._p6 = {};
                                    let key = 'r' + ri;
                                    // nhip hoi NGAN LAI theo toc do xoay -> xoay nhanh that su danh nhieu hon
                                    if (frames - (o._p6[key]||0) > Math.max(6, Math.round(24/_sp))){
                                        o._p6[key] = frames; dealDamage(o, 1, 'ammo');
                                        visualEffects.push(new Effect(bxp,byp,'explosion',true,8));
                                    }
                                } } }
                    }
                    for (let ei=enemies.length-1;ei>=0;ei--){ if (enemies[ei].hp<=0){ handleEnemyDeath(enemies[ei]); enemies.splice(ei,1);} }
                }
            } else { pet6Active=false; pet6Boost=0; }
        }
// PLAYER_PART_END s6.updatePets.1

// index.html:89119 · Phạm vi: global
// PLAYER_PART_BEGIN s6.drawPets.1 EDITABLE
function drawPets(){
            if(apexOn())return;
            if (typeof pet2VeLua === 'function'){ pet2VeLua(); pet2VeDash(); }
            if (typeof dino === 'undefined' || !dino) return;
            if (hasRune('pet')||hasRune('petx')) { petChargeRing(pet1X, pet1Y, 1 - pet1Cd/60, "#FFD54F"); if (pet1Tele) petTeleFlash(pet1X, pet1Y, "#FFD54F"); drawPet1(pet1X, pet1Y); }
            if (hasRune('pet2')||hasRune('pet2x')) { petChargeRing(pet2X, pet2Y, 1 - pet2Cd/(hasRune('pet2x')?60:120), "#FF3D00"); if (pet2Tele) petTeleFlash(pet2X, pet2Y, "#FF3D00"); drawPet2(pet2X, pet2Y); }
            if (hasRune('pet3')||hasRune('pet3x')) { petChargeRing(pet3X, pet3Y, 1 - pet3Cd/(hasRune('pet3x')?480:600), "#4FC3F7"); if (pet3Tele) petTeleFlash(pet3X, pet3Y, "#4FC3F7"); drawPet3(pet3X, pet3Y); }
            if (hasRune('pet4')||hasRune('pet4x')) { petChargeRing(pet4X, pet4Y, 1 - pet4Cd/(hasRune('pet4x')?600:720), "#66BB6A"); if (pet4Tele) petTeleFlash(pet4X, pet4Y, "#66BB6A"); drawPet4(pet4X, pet4Y); }
            if (hasRune('pet5')||hasRune('pet5x')) { drawPet5(pet5A.x,pet5A.y); if (hasRune('pet5x')) drawPet5(pet5B.x,pet5B.y); }
            if (hasRune('pet6')||hasRune('pet6x')) { if (pet6Active) drawPet6Orbs(); drawPet6(pet6X, pet6Y); }   // luon bat -> khong co vong nap
            if (dino.petShieldTimer > 0) drawPetShieldBubble();
            for (let sh of pet1Shots) drawPetShot(sh);
            for (let g of pet1GuardShots){
                ctx.save();
                if(g.orbit){
                    // Orbit guard uses the SAME physical size/profile as the normal Bird projectile.
                    // Only the color is changed to red so its defensive role is readable.
                    let a=g.angle||0;
                    ctx.save(); ctx.translate(g.x,g.y); ctx.rotate(a);
                    ctx.shadowColor='#FF2020'; ctx.shadowBlur=8;
                    ctx.fillStyle='rgba(255,30,30,0.16)'; ctx.beginPath(); ctx.arc(0,0,12,0,Math.PI*2); ctx.fill();
                    ctx.fillStyle='#FF3030'; ctx.beginPath(); ctx.moveTo(11,0); ctx.lineTo(-4,-5); ctx.lineTo(-13,0); ctx.lineTo(-4,5); ctx.closePath(); ctx.fill();
                    ctx.fillStyle='#FF6F6F'; ctx.beginPath(); ctx.moveTo(-4,-3); ctx.lineTo(-18,0); ctx.lineTo(-4,3); ctx.closePath(); ctx.fill();
                    ctx.fillStyle='#FFF5F5'; ctx.beginPath(); ctx.arc(6,0,2.8,0,Math.PI*2); ctx.fill();
                    ctx.restore();
                }else{
                    let a=Math.atan2(g.vy||0,g.vx||1); ctx.save(); ctx.translate(g.x,g.y); ctx.rotate(a);
                    for(let k=0;k<4;k++){ let al=(4-k)/4*0.35; ctx.fillStyle=`rgba(255,40,40,${al.toFixed(2)})`; ctx.beginPath(); ctx.arc(-7-k*4,0,3+k*0.8,0,Math.PI*2); ctx.fill(); }
                    ctx.fillStyle='rgba(255,30,30,0.22)';ctx.beginPath();ctx.arc(0,0,13,0,Math.PI*2);ctx.fill();
                    ctx.fillStyle='#FF3030';ctx.beginPath();ctx.moveTo(11,0);ctx.lineTo(-4,-5);ctx.lineTo(-13,0);ctx.lineTo(-4,5);ctx.closePath();ctx.fill();
                    ctx.fillStyle='#FF8A8A';ctx.beginPath();ctx.moveTo(-4,-3);ctx.lineTo(-18,0);ctx.lineTo(-4,3);ctx.closePath();ctx.fill();
                    ctx.fillStyle='#FFFFFF';ctx.beginPath();ctx.arc(6,0,2.7,0,Math.PI*2);ctx.fill(); ctx.restore();
                }
                ctx.restore();
            }
            for (let sh of pet2Shots) { sh.col = "#40C4FF"; drawPetShot(sh); } for (let m of pet2OrbitMines){ctx.save();ctx.globalAlpha=0.92;ctx.fillStyle="rgba(255,87,34,0.22)";ctx.beginPath();ctx.arc(m.x,m.y,9,0,Math.PI*2);ctx.fill();ctx.fillStyle=dtMau("#FF5722");ctx.beginPath();ctx.arc(m.x,m.y,4.5,0,Math.PI*2);ctx.fill();ctx.fillStyle=dtMau("#FFE0B2");ctx.beginPath();ctx.arc(m.x,m.y,1.8,0,Math.PI*2);ctx.fill();ctx.restore();}
        }
// PLAYER_PART_END s6.drawPets.1

// index.html:89844 · Phạm vi: global
// PLAYER_PART_BEGIN s6.afterimages.1 EDITABLE
let afterimages = [];
// PLAYER_PART_END s6.afterimages.1

// index.html:89845 · Phạm vi: global
// PLAYER_PART_BEGIN s6.birdBank.1 EDITABLE
let birdBank = 0, birdSpendCd = 0, birdDmgAcc = 0;
// PLAYER_PART_END s6.birdBank.1

// index.html:89848 · Phạm vi: global
// PLAYER_PART_BEGIN s6.birdCap.1 EDITABLE
function birdCap(){ return hasRune('fullheal') ? 10 : 3; }
// PLAYER_PART_END s6.birdCap.1

// index.html:89849 · Phạm vi: global
// PLAYER_PART_BEGIN s6.coKhoChim.1 EDITABLE
function coKhoChim(){ return hasRune('redbird') || hasRune('fullheal'); }
// PLAYER_PART_END s6.coKhoChim.1

// index.html:89865 · Phạm vi: global
// PLAYER_PART_BEGIN s6.lifestealNeed.1 EDITABLE
function lifestealNeed(){ return LIFESTEAL_NEED[currentAmmoType] || 20; }
// PLAYER_PART_END s6.lifestealNeed.1

// index.html:89870 · Phạm vi: global
// PLAYER_PART_BEGIN s6.tickLifesteal.1 EDITABLE
function tickLifesteal(){
            if (!hasRune('redbird')) return;
            // CHIEU CUOI va CHANNEL KHONG hut mau duoc — ap dung cho MOI loai dan.
            let _noSteal = !dino || dino.ultActive || dino.fireChannel || dino.lightChannel || dino.splitChannel || dino.boomChannel
                        || dino.rapidChannel || dino.pulsarChannel || dino.clawChannel || dino.pulseLaserChannel
                        || dino.laserActiveTimer > 0 || dino.fireReactorTimer > 0;
            let isVolt = (currentAmmoType === 4);
            let dealt = 0, pool = bosses.concat(enemies);
            for (let o of pool){
                if (o._lsPrev === undefined){ o._lsPrev = o.hp; continue; }
                if (o.hp < o._lsPrev) dealt += (o._lsPrev - o.hp);
                o._lsPrev = o.hp;   // luon cap nhat, de dmg bi chan khong bi don lai roi tinh bu sau
            }
            let _gain;
            if (isVolt){ _gain = voltBossTicks + Math.min(voltTrashTicks, VOLT_TRASH_CAP); voltBossTicks = 0; voltTrashTicks = 0; }
            else _gain = Math.min(dealt, LIFESTEAL_BURST_CAP);
            if (_noSteal) return;
            if (_gain > 0){
                birdDmgAcc += _gain;
                let _need = lifestealNeed();
                while (birdDmgAcc >= _need){ birdDmgAcc -= _need;
                    if (birdBank >= birdCap()){ birdDmgAcc = 0; break; }
                    birdBank++;
                    floatingTexts.push(new FloatingText(dino.x + 8, dino.y - 46, "🐦 +1"));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1040, 0.06, 'sine', 0.10, 1300); }
            }
        }
// PLAYER_PART_END s6.tickLifesteal.1

// index.html:89898 · Phạm vi: global
// PLAYER_PART_BEGIN s6.afterimgCd.1 EDITABLE
let afterimgCd = 0;
// PLAYER_PART_END s6.afterimgCd.1

// index.html:89904 · Phạm vi: global
// PLAYER_PART_BEGIN s6.spawnAfterimage.1 EDITABLE
function spawnAfterimage(){
            if(typeof danteOn==='function'&&danteOn())return;
            let rune = hasRune('afterimg'), trick = (combatStance === 1);
            if (!rune && !trick) return;
            if (afterimgCd > 0 || afterimages.length > 0) return;      // chi 1 phan than cung luc
            let special = rune && trick;
            afterimages.push({ x: dino.x, y: dino.y, form: currentForm, facing: dino.isFacingLeft,
                hp: special ? 3 : 1, maxHp: special ? 3 : 1,
                life: special ? 180 : 120,
                shotCd: special ? 30 : -1,          // -1 = KHONG ban
                parry: special ? 1 : 0, special: special, flash: 0 });
            afterimgCd = special ? 300 : 200;
            visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + dino.h/2, 'explosion', true, special ? 14 : 10));
        }
// PLAYER_PART_END s6.spawnAfterimage.1

// index.html:89918 · Phạm vi: global
// PLAYER_PART_BEGIN s6.updateAfterimages.1 EDITABLE
function updateAfterimages(){
            if (typeof dino==='undefined'||!dino) return;
            if (afterimgCd > 0) afterimgCd--;
            for (let i=afterimages.length-1;i>=0;i--){ let a=afterimages[i];
                a.life--; if (a.flash>0) a.flash--;
                // DAN DICH bay trung tan anh -> tan anh chiu thay nguoi choi
                for (let bi=bossProjectiles.length-1; bi>=0; bi--){ let bp=bossProjectiles[bi];
                    if (bp.x < a.x + dino.w && bp.x + (bp.w||16) > a.x && bp.y < a.y + dino.h && bp.y + (bp.h||16) > a.y){
                        a.hp -= (bp.dmg || 1); a.flash = 8;
                        visualEffects.push(new Effect(a.x + dino.w/2, a.y + dino.h/2, 'parry'));
                        bossProjectiles.splice(bi, 1);
                    } }
                // BAN 1 phat moi giay (1 dmg) — chi phan than DAC BIET moi ban
                if (a.shotCd < 0) { /* phan than co ban: khong tan cong */ }
                else if (a.shotCd>0) a.shotCd--;
                else {
                    let cx=a.x+20, cy=a.y+18, tgt=null, bd=1e9;
                    for (let e of enemies.concat(bosses)){ if (e.invulnAll) continue; let dx=(e.x+e.w/2)-cx, dy=(e.y+e.h/2)-cy, d=dx*dx+dy*dy; if (d<bd){bd=d;tgt=e;} }
                    let dir = tgt ? (((tgt.x+tgt.w/2) < cx) ? -1 : 1) : (a.facing ? -1 : 1);
                    projectiles.push(new Projectile(cx + dir*16, cy, 1, 0, 0, 0, dir, 1));
                    visualEffects.push(new Effect(cx + dir*16, cy, 'explosion', true, 6));
                    if (typeof SFX!=='undefined'&&SFX.shoot) SFX.shoot(0);
                    a.shotCd = 60;
                }
                if (a.hp <= 0 || a.life <= 0){
                    visualEffects.push(new Effect(a.x + dino.w/2, a.y + dino.h/2, 'explosion', true, 22));
                    afterimages.splice(i,1);
                }
            }
        }
// PLAYER_PART_END s6.updateAfterimages.1

// index.html:90261 · Phạm vi: global
// PLAYER_PART_BEGIN s6.drawAfterimages.1 EDITABLE
function drawAfterimages(){
            if (typeof dino==='undefined'||!dino) return;
            for (let a of afterimages){
                let al = (a.life < 30) ? 0.45*(a.life/30) : (a.flash>0 ? 0.85 : 0.5);
                drawNeonClone(a.x, a.y, 0, a.form, a.facing, AI_BODY_PAL, AI_NEON_PAL, "#00B0FF", al, al * 0.62);
                // vien hut aggro + thanh mau tan anh
                ctx.save();
                ctx.strokeStyle = a.flash>0 ? "#FF5252" : "rgba(129,212,250,0.75)"; ctx.lineWidth = 2;
                ctx.setLineDash([5,5]); ctx.strokeRect(a.x-3, a.y-3, dino.w+6, dino.h+6); ctx.setLineDash([]);
                let _mh = a.maxHp || 3;
                for (let k=0;k<_mh;k++){ ctx.fillStyle = (k < a.hp) ? "#4FC3F7" : "rgba(255,255,255,0.18)";
                    ctx.beginPath(); ctx.arc(a.x + dino.w/2 - (_mh-1)*7 + k*14, a.y - 12, 4, 0, 6.28); ctx.fill(); }
                if (a.parry > 0){ ctx.fillStyle = "#FFD54F"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("PARRY", a.x + dino.w/2, a.y - 20); ctx.textAlign = "left"; }
                ctx.restore();
                if (a.shotCd < 8){ let dir=a.facing?-1:1; ctx.save(); ctx.globalAlpha=0.7; ctx.fillStyle="#4FC3F7"; ctx.beginPath(); ctx.arc(a.x+20+dir*18, a.y+18, 4, 0, 6.28); ctx.fill(); ctx.restore(); }
            }
        }
// PLAYER_PART_END s6.drawAfterimages.1

// index.html:90348 · Phạm vi: global
// PLAYER_PART_BEGIN s6.updateBulletClash.1 EDITABLE
function updateBulletClash(){
            if (gameState === 'pvp') return;
            // DAU TRUONG UNITY: luon cho ban vo dan boss du khong gan rune Pha Dan.
            // DAN THUONG (co danh dau 'frail', vi du dan sung Ebony & Ivory cua Dante):
            // luon ban vo duoc, khong can rune — dung lore.
            let chiFrail = (!hasRune('bulletclash') && mapTheme !== 'unity');
            // GOM MOI LOAI DAN: bossProjectiles chung + dan RIENG cua tung boss
            let targets = [];
            for (let bp of bossProjectiles){
                if (chiFrail && !bp.frail) continue;
                targets.push({ o: bp, box: { x: bp.x, y: bp.y, w: bp.w || 16, h: bp.h || 16 },
                    pierce: !!bp.isPiercing,
                    kill: function(){ let k = bossProjectiles.indexOf(bp); if (k >= 0) bossProjectiles.splice(k, 1); } });
            }
            if (!chiFrail) for (let b of bosses){ if (typeof b.clashTargets === 'function'){ let ex = b.clashTargets(); for (let t of ex) targets.push(t); } }
            if (!targets.length) return;

            for (let pi = projectiles.length - 1; pi >= 0; pi--){
                let proj = projectiles[pi]; if (!proj) continue;
                if (proj.sgMerged) continue;   // fusion has its own <3 HP rule
                let pPierce = (proj.type === 2 || (proj.pierceCount || 0) > 0);
                for (let t of targets){
                    let o = t.o; if (!o || o._clashDead) continue;
                    if (!checkAABB(proj, t.box)) continue;
                    let ex = t.box.x + t.box.w/2, ey = t.box.y + t.box.h/2;
                    if (pPierce){   // DAN XUYEN pha sach moi thu tren duong bay, chi dan xuyen dich moi chan lai
                        o._clashDead = true; t.kill();
                        visualEffects.push(new Effect(ex, ey, 'explosion', true, 8));
                        if (t.pierce){ projectiles.splice(pi, 1); break; }
                    } else {
                        let hp = (o.clashHp !== undefined) ? o.clashHp : (o.clashHp = (t.hp !== undefined ? t.hp : clashHpOf(o)));
                        let dealt = Math.min(proj.dmg, hp);
                        o.clashHp = hp - proj.dmg;
                        proj.dmg -= dealt;
                        if (o.clashHp <= 0){
                            o._clashDead = true; t.kill();
                            visualEffects.push(new Effect(ex, ey, 'explosion', true, 8));
                            if (proj.infernoMax) infernoMaxChain(ex, ey, o);
                        }
                        else visualEffects.push(new Effect(ex, ey, 'explosion', true, 5));   // moi vo mot phan
                        if (proj.dmg <= 0){ projectiles.splice(pi, 1); break; }
                    }
                }
            }
        }
// PLAYER_PART_END s6.updateBulletClash.1

// index.html:90400 · Phạm vi: global
// PLAYER_PART_BEGIN s6.voltDashDmg.1 EDITABLE
function voltDashDmg(){
            if (dino && dino.lightningFormTimer > 0) return 6;   // dang trong Ult Volt
            if (typeof hasRune === 'function' && hasRune('hyperspeed')) return 5;
            return 3;
        }
// PLAYER_PART_END s6.voltDashDmg.1

// index.html:91509 · Phạm vi: global
// PLAYER_PART_BEGIN s6.novaCo.1 EDITABLE
function novaCo(ng){ return gameState !== 'pvp' && typeof hasRune === 'function' && hasRune('explshot') && (!ng || ng.id === 1); }
// PLAYER_PART_END s6.novaCo.1

// index.html:91623 · Phạm vi: global
// PLAYER_PART_BEGIN s6.calculateLightningChains.1 EDITABLE
function calculateLightningChains(startX, startY, count, totalTargets, ownerId = 1) {
            let chains = [];
            let targetHits = new Map(); 

            for (let i = 0; i < count; i++) {
                let currentX = startX;
                let currentY = startY;
                let targetsHit = 0;
                let chain = [{x: startX, y: startY}];
                let hitSet = new Set(); 

                while (targetsHit < totalTargets) {
                    let nearest = null;
                    let minDist = 2000; 

                    // LUU Y: bien nay TRUNG TEN voi ham allTargets() toan cuc va che mat no.
                    // Doi ten de tranh nham, va dung ham chung -> chuoi set giat duoc ca
                    // quan trieu hoi cua boss lan quan che do Defense.
                    let dsMucTieu = [];
                    if (gameState === 'pvp') {
                        // Truoc day: `ownerId === 1 ? [dino2] : [dino]` — lay THANG doi tuong
                        // nguoi choi, khong qua lop vo PvP. Nghia la set cua Volt bo qua toan
                        // bo he so can bang: day he so len 8.00 ma sat thuong do duoc van dung
                        // 20, khong nhuc nhich. Va voi P2 thi `dino` la chinh no (bien toan cuc
                        // da bi trao) nen no tu giat minh.
                        let _dv = (typeof pvpDich === 'function')
                                  ? pvpDich(ownerId === 1 ? pvpNguoi1() : dino2)
                                  : (ownerId === 1 ? dino2 : dino);
                        dsMucTieu = _dv ? [pvpVoBoc(_dv)] : [];
                    } else if (gameState === 'custom_menu') {
                        dsMucTieu = [...previewEnemies]; // Trong customizer chỉ giật quái preview
                    } else {
                        dsMucTieu = allTargets();
                    }
                    
                    dsMucTieu.forEach(t => {
                        if (!hitSet.has(t)) { 
                            let dx = (t.x + t.w/2) - currentX;
                            let dy = (t.y + t.h/2) - currentY;
                            let dist = Math.sqrt(dx*dx + dy*dy);
                            if (dist < minDist) {
                                minDist = dist;
                                nearest = t;
                            }
                        }
                    });

                    if (nearest) {
                        hitSet.add(nearest);
                        let hitCount = (targetHits.get(nearest) || 0) + 1;
                        targetHits.set(nearest, hitCount);
                        
                        if (gameState === 'pvp') {
                            if (nearest.isShielding()) {
                                let sScale = nearest.getFormScale();
                                let sX = nearest.isFacingLeft ? nearest.x - 15*sScale : nearest.x + (nearest.isCrouching ? 48*sScale : 42*sScale);
                                visualEffects.push(new Effect(sX, nearest.y + 10, 'parry', false));
                            } else {
                                nearest.takeDamage(3);   // di qua vo boc -> chiu he so PvP 
                            }
                        } else if (gameState === 'custom_menu') {
                            nearest.hp -= 3; // quai Preview
                        } else {
                            if (nearest.name === "AEGIS REX") {
                                if (nearest.invulnAll) { visualEffects.push(new Effect(nearest.x + nearest.w/2, nearest.y, 'parry', false)); }
                                else if (nearest.shieldBrokenTimer > 0) { damageFromAmmoAny(nearest, 3); }
                                else { nearest.hitShield(count >= 3 ? 6 : (count >= 2 ? 5 : 1), nearest.x + nearest.w/2, nearest.y + nearest.h/2); }
                            } else { damageFromAmmoAny(nearest, 3); }   // CHI MANG cho chuoi tia set
                            // HUT MAU: VOLT dem theo TICK chu khong theo dmg.
                            // Boss = 3 tick moi lan tia giat (charge 3 tia -> 9 tick); quai thuong = 1 tick.
                            if (hasRune('redbird')){ if (bosses.includes(nearest)) voltBossTicks += 3; else voltTrashTicks += 1; }
                        }

                        visualEffects.push(new Effect(nearest.x + nearest.w/2, nearest.y + nearest.h/2, 'lightning_shock', true));

                        // AWAKENED: NOVA — MOI tia set deu tao NO SET (khong can da muc tieu).
                        // KHONG cong them lan dmg nao len muc tieu bi giat: chi lan ra muc tieu xung quanh.
                        let _novaOk = hasRune('explshot') && gameState !== 'pvp' && gameState !== 'custom_menu'
                                      && !nearest.invulnAll;
                        if (_novaOk) {
                            visualEffects.push(new Effect(nearest.x + nearest.w/2, nearest.y + nearest.h/2, 'lightning_burst', true, bosses.includes(nearest) ? 0.75 : 0.5));
                            novaBlast(nearest.x + nearest.w/2, nearest.y + nearest.h/2, 40, 1, hitSet, 0, 'lightning_shock');
                        } else if (hitCount >= 2) {
                            let isBoss = bosses.includes(nearest);
                            let burstScale = isBoss ? 0.75 : 0.5;
                            visualEffects.push(new Effect(nearest.x + nearest.w/2, nearest.y + nearest.h/2, 'lightning_burst', true, burstScale));
                        }
                        
                        let nx = nearest.x + nearest.w/2;
                        let ny = nearest.y + nearest.h/2;
                        let midX = (currentX + nx) / 2;
                        let midY = (currentY + ny) / 2 + (Math.random() - 0.5) * 80; 
                        
                        chain.push({x: midX, y: midY});
                        chain.push({x: nx, y: ny});
                        
                        currentX = nx;
                        currentY = ny;
                        targetsHit++;
                    } else {
                        chain.push({
                            x: currentX + (ownerId === 1 ? canvas.width : -canvas.width),
                            y: currentY + (Math.random() - 0.5) * 150
                        });
                        break;
                    }
                }
                chains.push(chain);
            }
            return chains;
        }
// PLAYER_PART_END s6.calculateLightningChains.1

// index.html:93828 · Phạm vi: global
// PLAYER_PART_BEGIN s6.slamCanBat.1 EDITABLE
function slamCanBat(){
            return typeof hasRune === 'function' && hasRune('bodyslam')
                && typeof giaoLaCanChien === 'function' && giaoLaCanChien(currentAmmoType);
        }
// PLAYER_PART_END s6.slamCanBat.1

// index.html:93842 · Phạm vi: global
// PLAYER_PART_BEGIN s6.slamLaoBat.1 EDITABLE
function slamLaoBat(ng){
            if (!ng || typeof dino === 'undefined' || ng !== dino || ng.grounded) return false;
            if (typeof hasRune !== 'function' || !hasRune('bodyslam')) return false;
            if (typeof voidBat === 'function' && voidBat()) return false;
            if (ng.bodySlamActive) return false;
            ng.bodySlamActive = true; ng.bodySlamArmed = true;
            ng.bodySlamJumpCount = Math.max(2, ng.jumpCount || 0);
            ng.hoverTimer = 0; ng.hoverArmed = false;
            ng._slamLao = 1;
            return true;
        }
// PLAYER_PART_END s6.slamLaoBat.1

// index.html:93864 · Phạm vi: global
// PLAYER_PART_BEGIN s6.setCanBat.1 EDITABLE
function setCanBat(){
            return typeof hasRune === 'function' && hasRune('voltdash')
                && typeof giaoLaCanChien === 'function' && giaoLaCanChien(currentAmmoType);
        }
// PLAYER_PART_END s6.setCanBat.1

// index.html:94529 · Phạm vi: global
// PLAYER_PART_BEGIN s6.chargeMoc.1 EDITABLE
function chargeMoc(ammo){
            const R = chargeVongMax(ammo);
            const T = chargeTiersCua(ammo) || [];
            let ra = T.map(t => t[0] / R);
            ra.push(1);                       // moc cuoi vong = vao CHANNEL
            return ra;
        }
// PLAYER_PART_END s6.chargeMoc.1

// index.html:94538 · Phạm vi: global
// PLAYER_PART_BEGIN s6.chargeTick.1 EDITABLE
function chargeTick(o, ammo){
            let t = Math.max(0, Math.min(1, (o.aKeyHeldTime || 0) / chargeVongMax(ammo)));
            let n = 0; for (let m of chargeMoc(ammo)) if (t >= m) n++;
            if (o._mocTruoc === undefined) o._mocTruoc = 0;
            if (n > o._mocTruoc){
                o._mocTruoc = n;
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900 + n*220, 0.05, 'square', 0.16, 1600);
                if (o.id === 1) floatingTexts.push(new FloatingText(o.x - 10, o.y - 34, 'NẤC ' + n));
                o.chgBurst = 10;
            }
            if (t <= 0.01) o._mocTruoc = 0;
        }
// PLAYER_PART_END s6.chargeTick.1

// index.html:94556 · Phạm vi: global
// PLAYER_PART_BEGIN s6.chargeTiersCua.1 EDITABLE
function chargeTiersCua(ammo){
            if (ammo === 10 && typeof trdBat === 'function' && trdBat()) return TRD_TIERS;   // @@HE-TRIDENT
            if (ammo === 10 && typeof wkgBat === 'function' && wkgBat()) return WKG_TIERS;
            if (ammo === 5 && typeof katBat === 'function' && katBat(5)) return KAT_TIERS;
            if (ammo === 11 && typeof dino !== 'undefined' && dino && dino.buaBay && typeof BUA_TIERS_TAY !== 'undefined') return BUA_TIERS_TAY;   // @@HE-BUA2: mat bua -> moc nem set
            return CHARGE_TIERS[ammo];
        }
// PLAYER_PART_END s6.chargeTiersCua.1

// index.html:94563 · Phạm vi: global
// PLAYER_PART_BEGIN s6.chargeVongMax.1 EDITABLE
function chargeVongMax(ammo){ return ammo === 13 ? 185 : 180; }
// PLAYER_PART_END s6.chargeVongMax.1

// index.html:94564 · Phạm vi: global
// PLAYER_PART_BEGIN s6.chargeRingColor.1 EDITABLE
function chargeRingColor(ammo, held) {
            let T = chargeTiersCua(ammo) || CHARGE_TIERS[0], col = "#00E5FF";
            for (let t of T) if (held >= t[0]) col = t[1];
            return col;
        }
// PLAYER_PART_END s6.chargeRingColor.1

// index.html:94573 · Phạm vi: global
// PLAYER_PART_BEGIN s6.overchargeT.1 EDITABLE
function overchargeT(held, maxF) { return Math.max(0, Math.min(1, (held - maxF) / Math.max(1, OC_FULL - maxF))); }
// PLAYER_PART_END s6.overchargeT.1

// index.html:95183 · Phạm vi: global
// PLAYER_PART_BEGIN s6.gdBat.1 EDITABLE
function gdBat(){
            return gameState !== 'pvp' && typeof hasRune === 'function' && hasRune('bulletclash')
                && GD_DAN.indexOf(currentAmmoType) >= 0;
        }
// PLAYER_PART_END s6.gdBat.1

// index.html:95217 · Phạm vi: global
// PLAYER_PART_BEGIN s6.gdVaCham.1 EDITABLE
function gdVaCham(hop, luc, xuyen){
            if (gameState === 'pvp' || typeof hasRune !== 'function' || !hasRune('bulletclash') || !(luc > 0)) return luc;
            let ds = [];
            for (let bp of bossProjectiles) ds.push({ o: bp, box: { x: bp.x, y: bp.y, w: bp.w || 16, h: bp.h || 16 }, pierce: !!bp.isPiercing,
                kill: function(){ let k = bossProjectiles.indexOf(bp); if (k >= 0) bossProjectiles.splice(k, 1); } });
            for (let b of bosses) if (b && typeof b.clashTargets === 'function'){ try { for (let t of (b.clashTargets() || [])) ds.push(t); } catch(e){} }
            for (let t of ds){
                let o = t.o; if (!o || o._clashDead || !t.box || !checkAABB(hop, t.box)) continue;
                let ex = t.box.x + t.box.w / 2, ey = t.box.y + t.box.h / 2;
                if (xuyen){
                    o._clashDead = true; if (t.kill) t.kill();
                    visualEffects.push(new Effect(ex, ey, 'explosion', true, 8));
                    if (t.pierce) return 0;
                    continue;
                }
                let hp = (o.clashHp !== undefined) ? o.clashHp : (o.clashHp = (t.hp !== undefined ? t.hp : clashHpOf(o)));
                let dealt = Math.min(luc, hp);
                o.clashHp = hp - luc; luc -= dealt;
                if (o.clashHp <= 0){ o._clashDead = true; if (t.kill) t.kill(); visualEffects.push(new Effect(ex, ey, 'explosion', true, 8)); }
                else visualEffects.push(new Effect(ex, ey, 'explosion', true, 5));
                if (luc <= 0) return 0;
            }
            return luc;
        }
// PLAYER_PART_END s6.gdVaCham.1

// index.html:95384 · Phạm vi: global
// PLAYER_PART_BEGIN s6.asBat.1 EDITABLE
function asBat(){ return typeof hasRune === 'function' && hasRune('apsuat') && gameState !== 'pvp'; }
// PLAYER_PART_END s6.asBat.1

// index.html:95426 · Phạm vi: global
// PLAYER_PART_BEGIN s6.vxBat.1 EDITABLE
function vxBat(){ return typeof hasRune === 'function' && hasRune('vanxa') && gameState !== 'pvp'; }
// PLAYER_PART_END s6.vxBat.1

// index.html:95477 · Phạm vi: global
// PLAYER_PART_BEGIN s6.rgcKho.1 EDITABLE
let rgcKho = 0, rgcDam = null, rgcJCu = false;
// PLAYER_PART_END s6.rgcKho.1

// index.html:95478 · Phạm vi: global
// PLAYER_PART_BEGIN s6.rgcBat.1 EDITABLE
function rgcBat(){ return typeof hasRune === 'function' && hasRune('rgcounter') && gameState !== 'pvp'; }
// PLAYER_PART_END s6.rgcBat.1

// index.html:95480 · Phạm vi: global
// PLAYER_PART_BEGIN s6.rgcTichTru.1 EDITABLE
function rgcTichTru(hh){
            if (!hh || !rgcBat() || typeof dino === 'undefined' || !dino) return;
            let tgt = null, bd = 1e9;
            for (const o of [].concat(bosses, enemies)){
                if (!o || o.dying || o.invulnAll) continue;
                let d = Math.hypot((o.x + (o.w || 20) / 2) - dino.x, (o.y + (o.h || 20) / 2) - dino.y);
                if (d < bd){ bd = d; tgt = o; }
            }
            if (!tgt) return;
            let v = Math.max(1, Math.round(parryDamage(tgt, true) * RGC_TI));
            rgcKho += v;
            floatingTexts.push(new FloatingText(dino.x - 10, dino.y - 56, "⚜ +" + v));
        }
// PLAYER_PART_END s6.rgcTichTru.1

// index.html:95493 · Phạm vi: global
// PLAYER_PART_BEGIN s6.rgcTick.1 EDITABLE
function rgcTick(){
            let j = !!keys['KeyJ'], canh = j && !rgcJCu; rgcJCu = j;
            if (rgcDam){
                let A = rgcDam; A.t++;
                if (A.t === RGC_TRE){
                    let d = A.d, dir = A.dir, sc = A.sc, cx = dino.x + dino.w / 2;
                    let hop = { x: dir > 0 ? cx : cx - RGC_TAM * sc, y: dino.y - 20, w: RGC_TAM * sc, h: dino.h + 40 };
                    let trung = 0;
                    for (const o of [].concat(bosses, enemies)){
                        if (!o || o.dying || o.invulnAll || o.hp === undefined || o.hp <= 0 || !checkAABB(hop, o)) continue;
                        if (typeof dealDamage === 'function') dealDamage(o, d, 'flat'); else o.hp -= d;
                        trung++;
                        if (typeof hitDam === 'function') hitDam(o.x + (o.w || 20) / 2, A.y, dir, true, [255, 213, 79]);
                        if (o.actionTimer !== undefined) o.actionTimer = Math.max(o.actionTimer, 30);
                    }
                    if (trung){ floatingTexts.push(new FloatingText(cx - 40, dino.y - 44, "COUNTER! -" + d)); shakeTimer = Math.max(shakeTimer, 18); addStyle(20, 'parry');
                                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(70, 0.4, 'square', 0.3, 35); SFX.tone(1600, 0.12, 'sawtooth', 0.14, 600); } }
                    else { floatingTexts.push(new FloatingText(cx - 16, dino.y - 40, LT("HỤT", "MISS"))); if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(160, 0.12, 'square', 0.12, 110); }
                }
                if (A.t > 58) rgcDam = null;
            }
            if (!rgcBat() || combatStance !== 2 || !dino || dino.tank) return;
            if (canh && rgcKho > 0 && (!rgcDam || rgcDam.t > 24) && !dino.jcState){
                let dir = dino.isFacingLeft ? -1 : 1, sc = dino.getFormScale();
                rgcDam = { t: 0, d: rgcKho, dir, sc, tam: RGC_TAM, hat: frames % 997, ng: dino, dat: dino.y + dino.h,
                           x: dino.x + dino.w / 2 + dir * 26, y: dino.y + dino.h * 0.46 };
                rgcKho = 0;
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(90, 0.16, 'square', 0.22, 40);
            }
        }
// PLAYER_PART_END s6.rgcTick.1

// index.html:95524 · Phạm vi: global
// PLAYER_PART_BEGIN s6.rgcVe.1 EDITABLE
function rgcVe(){
            if (rgcDam && typeof midasVeDam === 'function'){ try { midasVeDam(dino, { dam: rgcDam }); } catch(e){} }
            if (rgcKho > 0 && rgcBat() && combatStance === 2 && dino){
                ctx.save(); ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                let s = "⚜ " + rgcKho, x = dino.x + dino.w / 2, y = dino.y - 12 + Math.sin(frames * 0.15) * 1.5;
                ctx.strokeStyle = "#3E2723"; ctx.lineWidth = 3; ctx.strokeText(s, x, y);
                ctx.fillStyle = "#FFD54F"; ctx.fillText(s, x, y); ctx.restore();
            }
        }
// PLAYER_PART_END s6.rgcVe.1

// index.html:95548 · Phạm vi: global
// PLAYER_PART_BEGIN s6.tdBat.1 EDITABLE
function tdBat(){ return typeof hasRune === 'function' && hasRune('tudia') && gameState !== 'pvp' && typeof dino !== 'undefined' && !!dino; }
// PLAYER_PART_END s6.tdBat.1

// index.html:95657 · Phạm vi: global
// PLAYER_PART_BEGIN s6.vhhBat.1 EDITABLE
function vhhBat(){ return typeof hasRune === 'function' && hasRune('vohahan') && gameState !== 'pvp'
                                   && typeof dino !== 'undefined' && !!dino; }
// PLAYER_PART_END s6.vhhBat.1
