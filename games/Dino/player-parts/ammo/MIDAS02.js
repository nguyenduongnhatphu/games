// PLAYER_FILE: MIDAS02
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, LT, MIDAS_CHO_ROT, MIDAS_DAM_KHUNG, MIDAS_DAN, MIDAS_DENJIN_CUA, MIDAS_DENJIN_TO, MIDAS_DENJIN_TON, MIDAS_DL_DMG, MIDAS_HADO_XA, MIDAS_HAKI_BV, MIDAS_HAKI_CHAM, MIDAS_HAKI_DAI, MIDAS_HASHO_DAY, MIDAS_KHONG_GIAM, MIDAS_MOC_TOC, MIDAS_NEN, MIDAS_NOVA_CONG, MIDAS_NOVA_NHIP, MIDAS_NX_DMG, MIDAS_NX_IFR, MIDAS_OVERHEAT, MIDAS_ROT_MOC, MIDAS_ROT_TRAN, MIDAS_SHORYU_DMG, MIDAS_SONG_MOC, MIDAS_TT_DMG, MIDAS_ULT_HS, SFX, allTargets, bosses, canvas, checkAABB, ctx, dashVx, dino, dino2, enemies, floatingTexts, frames, gameState, gdCatHop, giaoSong, hasRune, keys, midasBac, midasCua, midasDamThuong, midasDay, midasFx, midasHado, midasHadoDenjinLoLung, midasHakiCham, midasKameTick, midasNut, midasSetDen, midasTTNo, midasVeDamLuot, midasVeFx, midasVeKame, projectiles, setCanApDon, setCanBat, setCanDmg, shakeTimer, ultCharge, visualEffects, vkDangKy, voltTia
// index.html:61117 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasTick.1 EDITABLE
function midasTick(ng){
            if (!ng || ng.ammoType !== MIDAS_DAN) return;
            let M = midasCua(ng);
            if (M.loe > 0) M.loe--;
            if (M.no > 0) M.no--;
            if (M.dam){ M.dam.t++; if (M.dam.t > MIDAS_DAM_KHUNG) M.dam = null; }
            if (M.denjinCd > 0) M.denjinCd--;
            if (M.denjinCua > 0) M.denjinCua--;   // @@HE-MIDAS-DENJIN
            if (M.shoCd > 0) M.shoCd--;
            if (M.jCho > 0){ M.jCho--; if (ng.attackCooldown <= 0 && !M.kame && !M.haki){ M.jCho = 0; midasDamThuong(ng); } }
            if (M.kame){ midasKameTick(ng, M); return; }   // dang trong cutscene thi khong lam gi khac
            if (M.haki){                                   // @@HE-HAKI: dung yen gong, roi dam
                let K = M.haki; K.t++; ng._hakiGong = true;
                ng.x = K.x; ng.dy = 0; if (typeof dashVx !== 'undefined') dashVx = 0;
                ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 20);
                if (K.t === 1){
                    floatingTexts.push(new FloatingText(ng.x - 50, ng.y - 50, LT("HAKI BÁ VƯƠNG!", "CONQUEROR'S HAKI!")));
                    shakeTimer = Math.max(shakeTimer, 30);
                    if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(55, 0.9, 'sawtooth', 0.25, 30); SFX.tone(1800, 0.25, 'square', 0.08, 300); }
                    // Ba Vuong de bep ke yeu: quai nho trong 300px mat 3 mau
                    let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2;
                    for (let e of enemies) if (e && e.hp > 0 && Math.hypot((e.x + (e.w || 0) / 2) - cx, (e.y + (e.h || 0) / 2) - cy) < 300) e.hp -= 3;
                }
                if (K.t === MIDAS_HAKI_BV){
                    floatingTexts.push(new FloatingText(ng.x - 50, ng.y - 50, LT("HAKI VŨ TRANG!", "ARMAMENT HAKI!")));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(140, 0.4, 'square', 0.16, 70);
                }
                if (K.t >= MIDAS_HAKI_DAI){
                    M.haki = null; midasHakiCham = 0; ng._hakiGong = false;
                    ng.isOverheated = false; ng.attackCooldown = 0;
                    midasDam(ng, MIDAS_ULT_HS);
                    if (M.dam) M.dam.haki = true;
                    ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 40);
                    shakeTimer = Math.max(shakeTimer, 36);
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(40, 0.8, 'sawtooth', 0.3, 25);
                }
                return;
            }
            /* DAM LUOT — vua dam thuong xong ma luot thi cu luot mang theo sat thuong suot
               ca doan truot. Moi muc tieu chi an mot lan cho mot cu luot. */
            if (!M.dl && (frames - (M.damT || -999)) <= 24 && Math.abs(dashVx) > 0.1){
                M.dl = { t: 0, hit: new Set() };
                if (typeof setCanBat === 'function' && setCanBat() && typeof voltTia !== 'undefined'){
                    let dS = dashVx > 0 ? 1 : -1;
                    voltTia.push({ x: ng.x + ng.w / 2, y: ng.y + ng.h / 2, dir: dS, t: 0, hit: new Set() });
                    if (typeof setCanApDon === 'function') setCanApDon(ng, 160);
                }
            }
            if (M.dl){
                M.dl.t++;
                let hop = { x: ng.x - 10, y: ng.y - 6, w: ng.w + 20, h: ng.h + 12 };
                if (ng.id === 1 && typeof gdCatHop === 'function') gdCatHop(hop);   // @@HE-GATDAN
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.hp === undefined || o.hp <= 0 || o === ng) continue;
                    let g = o.__goc || o;
                    if (M.dl.hit.has(g) || !checkAABB(hop, o)) continue;
                    M.dl.hit.add(g);
                    o.hp -= MIDAS_DL_DMG + ((typeof setCanDmg === 'function') ? setCanDmg() : 0);
                    if (typeof visualEffects !== 'undefined' && typeof Effect === 'function')
                        visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', false, 16));
                }
                if (M.dl.t > 26 || Math.abs(dashVx) < 0.1) M.dl = null;
            }
            /* THIEN TRUY — dang lao xuong thi cham ai cung an; cham dat thi bung hai lan song. */
            if (M.tt){
                let hop = { x: ng.x - 4, y: ng.y, w: ng.w + 8, h: ng.h + 10 };
                if (ng.id === 1 && typeof gdCatHop === 'function') gdCatHop(hop);   // @@HE-GATDAN
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.hp === undefined || o.hp <= 0 || o === ng) continue;
                    let g = o.__goc || o;
                    if (M.tt.hit.has(g) || !checkAABB(hop, o)) continue;
                    M.tt.hit.add(g); o.hp -= MIDAS_TT_DMG;
                }
                if (ng.grounded){ midasTTNo(ng); M.tt = null; }
            }
            /* NHAY DAP — bon pha: vot len, bay toi tren dau muc tieu, dap xuong, lui ve cho cu. */
            if (M.nx){
                let N = M.nx; N.t++;
                ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 4);
                ng.dy = 0; ng.grounded = false;
                if (N.pha === 0){                       // vot len
                    ng.y -= 16;
                    if (N.t >= 8){ N.pha = 1; N.t = 0; }
                } else if (N.pha === 1){                // bay ngang toi tren dau muc tieu
                    ng.x += (N.tx - ng.x) * 0.34;
                    if (N.t >= 8){ N.pha = 2; N.t = 0; ng.x = N.tx; }
                } else if (N.pha === 2){                // dap xuong
                    ng.y += 22;
                    if (ng.y >= N.ty){
                        ng.y = N.ty;
                        if (N.muc && N.muc.hp > 0) N.muc.hp -= MIDAS_NX_DMG;
                        if (typeof visualEffects !== 'undefined' && typeof Effect === 'function')
                            visualEffects.push(new Effect(ng.x + ng.w/2, ng.y + ng.h, 'explosion', true, 30));
                        shakeTimer = Math.max(shakeTimer, 20);
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(90, 0.2, 'square', 0.3, 40);
                        ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, MIDAS_NX_IFR);
                        // KHONG lui ve cho cu nua: dap xong la o lai ngay do, roi tu roi
                        // xuong dat theo trong luc binh thuong.
                        M.nx = null;
                    }
                }
            }
            if (M.fx) for (let i = M.fx.length - 1; i >= 0; i--){
                M.fx[i].t++;
                if (M.fx[i].t > M.fx[i].tong) M.fx.splice(i, 1);
            }
            // SHORYUKEN nhip 2: ra o khung 12, luc doi thu dang bi hat len.
            if (M.shoryu){
                M.shoryu.t++;
                if (M.shoryu.t === 12){
                    // Nhip 2 duoc noi dai theo Denjin nhung KHONG cong them 5 lan nua —
                    // "+5" la cua CU DON, khong phai cua tung nhip.
                    ng._beginSlash(MIDAS_SHORYU_DMG, 12, M.shoryu.dir,
                                   Math.round(84 * M.shoryu.sc * (M.shoryu.dj ? MIDAS_DENJIN_TO : 1)),
                                   M.shoryu.dj ? 34 : 22, M.shoryu.dj ? 42 : 30, 0);
                    midasFx(ng, 'shoryu', M.shoryu.dj);
                    M.shoryu = null;
                } else if (M.shoryu.t > 40) M.shoryu = null;
            }
            if (M.hasho){
                M.hasho.t++;
                if (M.hasho.t === 8){ midasDay(ng, M.hasho.dj ? 176 : 110, MIDAS_HASHO_DAY * (M.hasho.dj ? 1.5 : 1), false); M.hasho = null; }
                else if (M.hasho.t > 24) M.hasho = null;
            }
            // HADOKEN chi di MIDAS_HADO_XA roi tat. Cat o day vi Projectile khong co san
            // truong gioi han quang duong.
            if (typeof projectiles !== 'undefined')
                for (let i = projectiles.length - 1; i >= 0; i--){
                    let p = projectiles[i];
                    if (p && p.midasHado && Math.abs(p.x - p.midasX0) > (p.midasXa || MIDAS_HADO_XA)) projectiles.splice(i, 1);
                }
            let giuK = !!(keys['KeyK'] || keys['ArrowDown'] === undefined && false);
            giuK = !!keys['KeyK'];
            if (ng.isOverheated) giuK = false;      // dang nghi sau khi xa thi khong tich
            // @@HE-MIDAS-NOVA — mach cong deu, chay bat ke dang giu phim hay khong.
            let _mdNova = (ng.id === 1) && (typeof hasRune === 'function') && hasRune('explshot');
            if (_mdNova){
                M.novaT = (M.novaT || 0) + 1;
                if (M.novaT >= MIDAS_NOVA_NHIP){
                    M.novaT -= MIDAS_NOVA_NHIP;
                    M.dmg += MIDAS_NOVA_CONG;
                    M.loe = Math.max(M.loe || 0, 12);
                    if (typeof floatingTexts !== 'undefined')
                        floatingTexts.push(new FloatingText(ng.x - 14, ng.y - 40, "NOVA +" + MIDAS_NOVA_CONG));
                }
            } else M.novaT = 0;
            if (giuK){
                M.roi = 0; M.tocRoi = 1;
                M.giu++;
                M.dmg += M.toc / 60;
                if (M.giu >= MIDAS_MOC_TOC){ M.toc++; M.giu -= MIDAS_MOC_TOC; }
            } else {
                M.toc = MIDAS_NEN; M.giu = 0;       // nha tay la mat da
                M.roi++;
                // Deo Nova thi so KHONG BAO GIO roi nua — bo qua han nhanh nay.
                if (!_mdNova && M.roi >= MIDAS_CHO_ROT){
                    M.dmg -= M.tocRoi / 60;
                    if ((M.roi - MIDAS_CHO_ROT) % MIDAS_ROT_MOC === 0)
                        M.tocRoi = Math.min(MIDAS_ROT_TRAN, M.tocRoi + 1);
                    if (M.dmg < 0) M.dmg = 0;
                }
            }
        }
// PLAYER_PART_END s4.midasTick.1

// index.html:61282 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasDam.1 EDITABLE
function midasDam(ng, heSo){
            if (!ng || ng.ammoType !== MIDAS_DAN) return false;
            if (ng.hp <= 0) return false;              // chet roi thi khong dam duoc nua
            if (ng.isOverheated || ng.attackCooldown > 0) return false;
            let M = midasCua(ng);
            let d = Math.max(1, Math.round(M.dmg * (heSo || 1)));
            // CU DAM THUONG KHONG PHAI LA CHIEU CUOI. Chieu cuoi cua MIDAS chinh la mot cu
            // dam, nen no mo mot cua so "dang trong ult"; moi cu dam thuong roi vao cua so do
            // deu bi tinh chung vao tran 33% — ma tran do da bi chinh chieu cuoi tieu het.
            // Do duoc o mau 300: ult an 99, roi dam voi 300 diem tich chi ra 100.
            // Dung thoi gian de phan biet la sai vi song xung kich bay mat ~73 khung. Dung
            // cach nay: he ra don THUONG la dong cua so ult lai.
            if ((heSo || 1) <= 1) ng._ultHan = 0;
            // Truoc day tam = 70 + 6 moi diem, tran 900: danh 30 dmg thi voi duoc 250px,
            // chua bang mot phan tu man hinh. Gio cu dam nao cung di het be ngang man hinh.
            let tam = canvas.width;
            let dir = ng.isFacingLeft ? -1 : 1, sc = ng.getFormScale();
            // Than cu dam: mot hop ngan sat nguoi. CHI dung khi cu dam yeu, chua du suc
            // tao song. Tu moc song tro len thi song xuat phat ngay tai nam dam va tu no
            // lo phan cham mat — neu de ca hai thi dich dung sat mat an DOI sat thuong
            // (do duoc 390 cho mot cu dam 195).
            if (d < MIDAS_SONG_MOC)
                ng._beginSlash(d, 14, dir, Math.round(Math.min(tam, 120) * sc), 20, 20, 0);
            ng.attackCooldown = 26;
            ng.isOverheated = true; ng.overheatTimer = MIDAS_OVERHEAT;
            ng.ammo = 0;
            M.no = 20;
            // Ho so cu dam, de midasVe() dung ra bo hoat anh. Giu ca `d` vi so lop song
            // va do lon deu no theo suc dam.
            // Giu luon THAM CHIEU nguoi choi: truoc day toi chi chup toa do mot lan, nen
            // dam xong ma chay di thi ca cu dam dung im tai cho cu, tay roi khoi nguoi.
            M.dam = { t: 0, d: d, dir: dir, sc: sc, tam: tam, hat: (frames % 997), ng: ng,
                      dat: ng.y + ng.h,
                      x: ng.x + ng.w / 2 + dir * 26, y: ng.y + ng.h * 0.46 };
            // LUC XUNG KICH: tu moc MIDAS_SONG_MOC tro len thi phong mot lan song di xa
            if (d >= MIDAS_SONG_MOC && typeof giaoSong !== 'undefined'){
                // Sinh song o TAM NGUOI, khong phai cach 30px ve phia truoc. O cu ly rat gan
                // (do duoc AI dam o 26-30px) thi diem +30px da nam SAU LUNG doi thu roi, song
                // bay ra xa va cu dam gay dung 0 sat thuong — trong khi don can chien lai bi
                // tat o muc tich >= 30 de tranh cong doi. Ket qua: tich 45 dam sat mat = 0.
                let mui = ng.x + ng.w / 2;
                // TRUOC DAY: t = 0. Luoi bi xoa ngay o nhip dau (`w.t--` roi kiem `w.t <= 0`),
                // nen no khong he BAY: no chi la mot hop kiem tra khong lo mot lan duy nhat,
                // rong r/2 = nua man, va vi the vua voi qua xa ve phia sau lung vua khong
                // toi duoc mep man phia truoc. Cho no song du lau de di het be ngang man
                // hinh (15px moi khung), va thu nho hop cham lai cho ra hinh mot lan song.
                let songT = Math.ceil(canvas.width / 15) + 20;
                giaoSong.push({ chu: ng, chuId: ng.id, x: mui, y: ng.y + ng.h * 0.5, dir: dir,
                                t: songT, t0: songT,
                                r: Math.round(160 * sc), dmg: d, xuyen: 1, kiem: 0,
                                x0: mui, giam: (d < MIDAS_KHONG_GIAM) ? 1 : 0,
                                mau: '#FFC107', midas: 1, hit: new Set() });
            }
            M.dmg = 0; M.toc = MIDAS_NEN; M.giu = 0; M.roi = 0; M.tocRoi = 1;   // xa la mat sach
            shakeTimer = Math.max(shakeTimer, d >= MIDAS_SONG_MOC ? 22 : 10);
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(90, 0.16, 'square', 0.22, 40);
            return true;
        }
// PLAYER_PART_END s4.midasDam.1

// index.html:61342 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeNamDam.1 EDITABLE
function midasVeNamDam(A, tien, mo){
            if (A.haki) return midasVeNamDamHaki(A, tien, mo, A.haki === true ? 1 : A.haki);   // @@HE-HAKI
            let sc = A.sc, dir = A.dir;
            let x = A.x + dir * tien, y = A.y;
            let R = 15 * sc;                       // ban kinh nam dam
            ctx.save();
            ctx.translate(x, y); ctx.scale(dir, 1);
            ctx.globalAlpha = mo;
            // canh tay
            ctx.fillStyle = '#8D6E63'; ctx.strokeStyle = '#3E2723'; ctx.lineWidth = 2 * sc;
            ctx.beginPath();
            ctx.moveTo(-R * 2.6, -R * 0.52); ctx.lineTo(-R * 0.2, -R * 0.66);
            ctx.lineTo(-R * 0.2,  R * 0.66); ctx.lineTo(-R * 2.6,  R * 0.52);
            ctx.closePath(); ctx.fill(); ctx.stroke();
            // co tay
            ctx.fillStyle = '#FFB300';
            ctx.fillRect(-R * 1.15, -R * 0.72, R * 0.5, R * 1.44);
            // ban tay nam
            ctx.fillStyle = '#A1887F'; ctx.strokeStyle = '#3E2723';
            ctx.beginPath();
            ctx.moveTo(-R * 0.35, -R * 0.95);
            ctx.lineTo( R * 0.62, -R * 0.86);
            ctx.quadraticCurveTo(R * 1.12, 0, R * 0.62, R * 0.86);
            ctx.lineTo(-R * 0.35,  R * 0.95);
            ctx.closePath(); ctx.fill(); ctx.stroke();
            // bon dot ngon tay
            ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 1.4 * sc;
            for (let i = 0; i < 4; i++){
                let yy = -R * 0.62 + i * R * 0.42;
                ctx.beginPath(); ctx.moveTo(R * 0.10, yy); ctx.lineTo(R * 0.74, yy - R * 0.04); ctx.stroke();
            }
            // vien sang phia truoc nam dam
            ctx.globalAlpha = mo * 0.9; ctx.strokeStyle = '#FFF8E1'; ctx.lineWidth = 2.4 * sc;
            ctx.beginPath(); ctx.moveTo(R * 0.66, -R * 0.9); ctx.quadraticCurveTo(R * 1.2, 0, R * 0.66, R * 0.9);
            ctx.stroke();
            ctx.restore(); ctx.globalAlpha = 1;
        }
// PLAYER_PART_END s4.midasVeNamDam.1

// index.html:61381 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeNamDamHaki.1 EDITABLE
function midasVeNamDamHaki(A, tien, mo, k){
            let sc = A.sc, dir = A.dir, x = A.x + dir * tien, y = A.y, R = 15 * sc;
            ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1); ctx.globalAlpha = mo;
            const tay = (den) => {
                ctx.fillStyle = den ? '#0B0B0D' : '#8D6E63'; ctx.strokeStyle = den ? '#000' : '#3E2723'; ctx.lineWidth = 2 * sc;
                ctx.beginPath(); ctx.moveTo(-R * 2.6, -R * 0.52); ctx.lineTo(-R * 0.2, -R * 0.66); ctx.lineTo(-R * 0.2, R * 0.66); ctx.lineTo(-R * 2.6, R * 0.52); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.fillStyle = den ? '#1a1a1f' : '#A1887F';
                ctx.beginPath(); ctx.moveTo(-R * 0.35, -R * 0.95); ctx.lineTo(R * 0.62, -R * 0.86); ctx.quadraticCurveTo(R * 1.12, 0, R * 0.62, R * 0.86); ctx.lineTo(-R * 0.35, R * 0.95); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.strokeStyle = den ? '#3a3a44' : '#5D4037'; ctx.lineWidth = 1.4 * sc;
                for (let i = 0; i < 4; i++){ let yy = -R * 0.62 + i * R * 0.42; ctx.beginPath(); ctx.moveTo(R * 0.10, yy); ctx.lineTo(R * 0.74, yy - R * 0.04); ctx.stroke(); }
            };
            tay(false);
            // lop den lan tu co tay (-R*2.6) toi dau nam dam (R*1.2)
            let bien = -R * 2.6 + (R * 3.9) * k;
            ctx.save(); ctx.beginPath(); ctx.rect(-R * 3, -R * 1.5, bien + R * 3, R * 3); ctx.clip(); tay(true);
            // vet sang bong truot qua
            let sx = -R * 2.4 + ((frames * 1.6) % (R * 4.4));
            let g = ctx.createLinearGradient(sx - R * 0.5, 0, sx + R * 0.5, 0);
            g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(220,220,255,0.75)'); g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = g; ctx.fillRect(-R * 3, -R * 1, R * 4.4, R * 0.45);
            ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(-R * 2.5, -R * 0.5, R * 2.2, R * 0.12);   // anh bong co dinh
            ctx.restore();
            // mep lan: vien do nhe
            if (k < 1){ ctx.strokeStyle = 'rgba(255,23,68,0.8)'; ctx.lineWidth = 2 * sc; ctx.beginPath(); ctx.moveTo(bien, -R); ctx.lineTo(bien, R); ctx.stroke(); }
            else { ctx.globalAlpha = mo * 0.9; ctx.strokeStyle = '#FF1744'; ctx.lineWidth = 2 * sc; ctx.beginPath(); ctx.moveTo(R * 0.66, -R * 0.9); ctx.quadraticCurveTo(R * 1.2, 0, R * 0.66, R * 0.9); ctx.stroke(); }
            ctx.restore(); ctx.globalAlpha = 1;
        }
// PLAYER_PART_END s4.midasVeNamDamHaki.1

// index.html:61410 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeSac.1 EDITABLE
function midasVeSac(ng, M){
            let d = M.dmg; if (d < 1) return;
            let sc = ng.getFormScale();
            let cx = ng.x + ng.w / 2, chan = ng.y + ng.h, cy = ng.y + ng.h / 2;
            let manh = Math.min(1, d / 60);
            let cao = (26 + 150 * manh) * sc;
            let rong = (16 + 26 * manh) * sc;
            ctx.save();
            // quang sang bao quanh nguoi
            let g = ctx.createRadialGradient(cx, cy, 2, cx, cy, Math.max(2, rong * 1.7));
            g.addColorStop(0, 'rgba(255,248,225,' + (0.10 + 0.30 * manh) + ')');
            g.addColorStop(0.55, 'rgba(255,193,7,' + (0.08 + 0.22 * manh) + ')');
            g.addColorStop(1, 'rgba(255,143,0,0)');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(cx, cy, Math.max(2, rong * 1.7), 0, Math.PI * 2); ctx.fill();
            // cac luoi lua vut len
            let so = 5 + Math.round(manh * 12);
            for (let i = 0; i < so; i++){
                let pha = (frames * (0.055 + 0.05 * manh) + i * 0.83) % 1;
                let lech = Math.sin(i * 2.4 + frames * 0.09) * rong;
                let h = cao * (0.35 + 0.65 * (1 - pha)) * (0.5 + 0.5 * ((i * 37) % 10) / 10);
                let bx = cx + lech * (0.5 + 0.5 * pha);
                let by = chan - pha * cao * 0.75;
                ctx.globalAlpha = (0.30 + 0.45 * manh) * (1 - pha);
                ctx.fillStyle = i % 3 === 0 ? '#FFFDE7' : (i % 3 === 1 ? '#FFD54F' : '#FFA000');
                ctx.beginPath();
                ctx.moveTo(bx, by);
                ctx.quadraticCurveTo(bx - 4 * sc, by - h * 0.55, bx, by - h);
                ctx.quadraticCurveTo(bx + 4 * sc, by - h * 0.55, bx, by);
                ctx.closePath(); ctx.fill();
            }
            // dom bay len
            ctx.globalAlpha = 0.5 + 0.4 * manh; ctx.fillStyle = '#FFF8E1';
            for (let i = 0; i < 3 + Math.round(manh * 7); i++){
                let pha = (frames * 0.03 + i * 0.29) % 1;
                let bx = cx + Math.sin(i * 3.1 + frames * 0.05) * rong * 1.2;
                let by = chan - pha * cao * 1.15;
                let r = (1.2 + 1.8 * (1 - pha)) * sc;
                ctx.beginPath(); ctx.arc(bx, by, Math.max(0.5, r), 0, Math.PI * 2); ctx.fill();
            }
            // CON SO sat thuong dang tich, tren dau
            let sy = ng.y - 26 - Math.min(22, manh * 26);
            let chuoi = String(Math.round(d));
            let co = 18 + Math.round(manh * 16);
            ctx.globalAlpha = 1;
            ctx.font = 'bold ' + co + 'px Consolas, monospace';
            ctx.textAlign = 'center';
            ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,0.85)';
            ctx.strokeText(chuoi, cx, sy);
            let g2 = ctx.createLinearGradient(0, sy - co, 0, sy);
            g2.addColorStop(0, '#FFFDE7'); g2.addColorStop(1, '#FF8F00');
            ctx.fillStyle = g2; ctx.fillText(chuoi, cx, sy);
            ctx.font = 'bold 9px Consolas, monospace'; ctx.fillStyle = '#FFE082';
            ctx.fillText('MIDAS', cx, sy - co + 2);
            ctx.textAlign = 'left';
            ctx.restore(); ctx.globalAlpha = 1;
        }
// PLAYER_PART_END s4.midasVeSac.1

// index.html:61474 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeDam.1 EDITABLE
function midasVeDam(ng, M){
            let A = M.dam; if (!A) return;
            let T = A.t / MIDAS_DAM_KHUNG; if (T > 1) return;
            // bam theo nguoi choi: neu con di chuyen thi ca cu dam di theo
            if (A.ng){ A.x = A.ng.x + A.ng.w / 2 + A.dir * 26;
                       A.y = A.ng.y + A.ng.h * 0.46;
                       A.dat = A.ng.y + A.ng.h; }
            let manh = Math.min(1, A.d / MIDAS_SONG_MOC);
            let dat  = A.dat, dir = A.dir, sc = A.sc;
            let xa   = Math.min(A.tam, 190 + A.d * 13) * sc;
            let e    = 1 - Math.pow(1 - T, 2.2);
            let mo   = Math.pow(1 - T, 1.45);
            let L    = xa * e;
            // nhieu co dinh theo hat giong, de vet nut khong nhay lung tung tung khung
            const ng_ = (k) => { let v = Math.sin((k + 1) * 12.9898 + A.hat) * 43758.5453; return v - Math.floor(v); };

            ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';

            // ---- 1. VET NUT: mat dat bi che doi, mo rong dan ve phia truoc ----
            {
                let doan = Math.max(6, Math.round(L / 26));
                let rong = (3 + 9 * manh) * sc;
                ctx.globalAlpha = mo * 0.9;
                ctx.fillStyle = '#1A1206';
                ctx.beginPath();
                ctx.moveTo(A.x, dat);
                for (let k = 0; k <= doan; k++){                 // mep tren
                    let q = k / doan, px = A.x + dir * L * q;
                    ctx.lineTo(px, dat - rong * (1 - q) * (0.5 + ng_(k)));
                }
                for (let k = doan; k >= 0; k--){                 // mep duoi, quay nguoc lai
                    let q = k / doan, px = A.x + dir * L * q;
                    ctx.lineTo(px, dat + rong * (1 - q) * (0.5 + ng_(k + 40)));
                }
                ctx.closePath(); ctx.fill();
                ctx.globalAlpha = mo * 0.8;
                ctx.strokeStyle = '#FFB300'; ctx.lineWidth = Math.max(1, 1.6 * sc);
                ctx.stroke();
                // vai nhanh nut re ra hai ben
                ctx.globalAlpha = mo * 0.5;
                ctx.strokeStyle = '#8D6E63'; ctx.lineWidth = Math.max(1, 1.2 * sc);
                for (let k = 1; k < doan; k += 2){
                    let q = k / doan, px = A.x + dir * L * q;
                    let dy = (ng_(k + 90) - 0.5) * 2, dai = (6 + 16 * manh) * (1 - q) * sc;
                    ctx.beginPath(); ctx.moveTo(px, dat);
                    ctx.lineTo(px + dir * dai * 0.5, dat + dy * dai); ctx.stroke();
                }
            }

            // ---- 2. VACH TOC DO: cac net ngang keo dai, dac dan ve phia truoc ----
            // Day moi la thu lam cho no ra chat truyen tranh. Thieu no thi cac vong song
            // chi la hinh hoc; co no thi ca khoi khong khi trong nhu dang bi xe ra.
            {
                let so = 10 + Math.round(manh * 22);
                ctx.globalAlpha = mo * 0.5;
                ctx.strokeStyle = A.haki ? '#1a0006' : '#FFFDE7';
                for (let k = 0; k < so; k++){
                    let n1 = ng_(k + 300), n2 = ng_(k + 400);
                    let h  = n1 * n1;                            // dam ve phia mat dat
                    // Truoc day dai vach cao toi (30 + 200*manh) trong khi be ngang thi
                    // rat dai — nhin ra mot mang keo len tren, lech han so voi phan duoi.
                    // Ha tran xuong va don ve gan mat dat cho can voi be ngang.
                    let y  = dat - h * (22 + 118 * manh) * sc;
                    let x0 = A.x + dir * (n2 * L * 0.55);
                    let d1 = (40 + 190 * manh) * (0.35 + 0.65 * ng_(k + 500)) * sc;
                    ctx.lineWidth = Math.max(1, (1 + 1.6 * (1 - n1)) * sc);
                    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + dir * d1, y); ctx.stroke();
                }
            }
            // ---- 3. MAT SONG: vom khong lo dung tren mat dat, PHONG TO DAN khi ra xa ----
            {
                let so = Math.max(2, Math.min(5, 2 + Math.floor(A.d / 10)));
                for (let k = 0; k < so; k++){
                    let tk = e - k * 0.085;
                    if (tk <= 0) continue;
                    let dk = tk * xa;                            // da di duoc bao xa
                    let q  = Math.min(1, dk / Math.max(1, xa));
                    // Truoc day cao nhat moi (16 + 52*manh)*(0.35..1) — nhin ra mot day
                    // vom nho lup xup. Anime thi luoi gio phai TO, va no phinh ra rat manh
                    // theo quang duong: bat dau chi bang nguoi, ra xa thi cao gap nhieu lan.
                    let cao = (34 + 200 * manh) * (0.18 + 1.05 * q) * sc;
                    // Vom cao 250 ma chi rong 60 thi ra hinh cai cong hep vut len, phan tren
                    // vong han ra khoi phan duoi — do la cho "hoi cao so voi ben duoi".
                    // Noi be ngang ra cho ty le gan mot lat gio nam ngang.
                    let beo = (28 + 95 * manh) * (0.35 + 0.85 * q) * sc;
                    ctx.globalAlpha = mo * (1 - tk * 0.45) * (k === 0 ? 1 : 0.8 - k * 0.11);
                    ctx.lineWidth = Math.max(1, (9 - k * 1.1) * (1 - tk * 0.4) * sc);
                    ctx.strokeStyle = A.haki ? (k === 0 ? '#050505' : (k === 1 ? '#B71C1C' : '#1a0006')) : (k === 0 ? '#FFFDE7' : (k === 1 ? '#FFF3C4' : '#FFE082'));
                    if (A.haki){ ctx.shadowColor = '#FF1744'; ctx.shadowBlur = 12; } else ctx.shadowBlur = 0;
                    ctx.beginPath();
                    // Trong canvas truc y huong XUONG, nen cung PI -> 0 la nua DUOI mat dat:
                    // vom song moc nguoc xuong long dat. Nua TREN la PI -> 2PI.
                    ctx.ellipse(A.x + dir * dk, dat, Math.max(1, beo), Math.max(1, cao), 0, Math.PI, Math.PI * 2);
                    ctx.stroke();
                }
            }

            // ---- 3. BUI DA bat len tu vet nut ----
            {
                let so = 4 + Math.round(manh * 10);
                ctx.globalAlpha = mo * 0.75; ctx.strokeStyle = '#D7CCC8';
                for (let k = 0; k < so; k++){
                    let q = ng_(k + 150), px = A.x + dir * L * q;
                    let cao = (10 + 34 * manh) * (0.3 + 0.7 * ng_(k + 200)) * e * sc;
                    ctx.lineWidth = Math.max(1, 2 * sc);
                    ctx.beginPath(); ctx.moveTo(px, dat);
                    ctx.lineTo(px + dir * cao * 0.35, dat - cao); ctx.stroke();
                }
            }

            ctx.shadowBlur = 0;
            // @@HE-HAKI: SET DEN chay doc duong dam + toa quanh nam dam
            if (A.haki){
                let so = 6;
                for (let k = 0; k < so; k++){
                    let hat = Math.floor(A.t / 3) * 17 + k * 29, q0 = ng_(k + 700) * 0.8, q1 = q0 + 0.12 + ng_(k + 800) * 0.2;
                    let y0 = A.y - 60 * sc + ng_(k + 900) * 120 * sc;
                    midasSetDen(A.x + dir * L * q0, y0, A.x + dir * L * q1, y0 + (ng_(k + 950) - 0.5) * 80 * sc, hat, 2.5 * sc, mo);
                }
                if (A.t < 20) for (let k = 0; k < 5; k++){ let a = k * 1.26 + A.t * 0.3, hat = A.t * 5 + k;
                    midasSetDen(A.x, A.y, A.x + Math.cos(a) * 70 * sc, A.y + Math.sin(a) * 70 * sc, hat, 2 * sc, 1 - A.t / 20); }
            }
            // ---- 4. loi sang nho o nam dam, chi vai khung dau ----
            if (A.t < 7){
                let q = 1 - A.t / 7, R0 = (7 + 15 * manh) * q * sc;
                let g = ctx.createRadialGradient(A.x, A.y, 0, A.x, A.y, Math.max(1, R0));
                g.addColorStop(0, A.haki ? 'rgba(0,0,0,' + (0.9 * q) + ')' : 'rgba(255,255,255,' + (0.9 * q) + ')');
                g.addColorStop(1, A.haki ? 'rgba(213,0,0,0)' : 'rgba(255,179,0,0)');
                ctx.globalAlpha = 1; ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(A.x, A.y, Math.max(1, R0), 0, Math.PI * 2); ctx.fill();
            }
            // ---- 5. NAM DAM thoc ra, chi trong nua dau hoat anh ----
            {
                // Vuon HAN ra truoc mat chu khong dung ngang than: bat dau da o mep nguoi
                // va thoc them mot doan bang 1,5-3 lan be ngang than.
                let tp = Math.min(1, A.t / 16);
                let tp2 = 1 - Math.pow(1 - tp, 3);            // bat ra nhanh roi giu
                let tien = 20 * sc + tp2 * Math.min(150, 62 + A.d * 2.2) * sc;
                let moD = A.t < 16 ? 1 : Math.max(0, 1 - (A.t - 16) / 12);
                if (moD > 0) midasVeNamDam(A, tien, moD);
            }
            ctx.restore(); ctx.globalAlpha = 1;
        }
// PLAYER_PART_END s4.midasVeDam.1

// index.html:61619 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeHaki.1 EDITABLE
function midasVeHaki(ng, M){
            let K = M.haki, t = K.t, cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2, sc = ng.getFormScale(), dir = ng.isFacingLeft ? -1 : 1;
            ctx.save();
            // hao quang toi quanh nguoi
            let g = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120);
            g.addColorStop(0, 'rgba(0,0,0,0.15)'); g.addColorStop(0.35, 'rgba(0,0,0,0.35)'); g.addColorStop(0.7, 'rgba(60,0,12,0.3)'); g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 120, 0, 6.28); ctx.fill();
            // BA VUONG: vong ap luc lan ra
            for (let k = 0; k < 3; k++){ let q = ((t * 3 + k * 20) % 60) / 60;
                ctx.globalAlpha = (1 - q) * 0.7; ctx.strokeStyle = k % 2 ? '#D50000' : '#111'; ctx.lineWidth = 4 * (1 - q) + 1;
                ctx.beginPath(); ctx.arc(cx, cy, 30 + q * 260, 0, 6.28); ctx.stroke(); }
            ctx.globalAlpha = 1;
            // SET DEN toa ra — nhieu o dau, van con lach tach suot canh
            let soSet = t < MIDAS_HAKI_BV ? 8 : 4;
            for (let k = 0; k < soSet; k++){
                let hat = Math.floor(frames / 3) * 7 + k * 13, a = (k / soSet) * 6.28 + Math.sin(hat) * 0.4;
                let r0 = 22, r1 = t < MIDAS_HAKI_BV ? 90 + (hat % 5) * 30 : 50 + (hat % 3) * 14;
                midasSetDen(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0, cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, hat, 2.5, 0.9);
            }
            // VU TRANG: nam dam keo ve sau, den bong lan dan tu co tay ra
            let vt = Math.max(0, Math.min(1, (t - MIDAS_HAKI_BV) / (MIDAS_HAKI_DAI - MIDAS_HAKI_BV - 6)));
            let A = { x: cx + dir * ng.w * 1.15, y: cy - 6, dir: dir, sc: sc * 0.85, haki: vt };   // nam dam gio TRUOC nguc, khong che than
            midasVeNamDam(A, 6 * sc, 1);
            if (vt > 0.95){ let fx = cx + dir * (ng.w * 1.15 + 18 * sc), fy = cy - 6;
                for (let k = 0; k < 3; k++){ let hat = Math.floor(frames / 2) * 5 + k * 11, a = hat * 0.9;
                    midasSetDen(fx, fy, fx + Math.cos(a) * 34, fy + Math.sin(a) * 34, hat, 1.6, 0.85); } }
            ctx.restore();
        }
// PLAYER_PART_END s4.midasVeHaki.1

// index.html:61650 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeTay.1 EDITABLE
function midasVeTay(ng, M){
            if (M.dam || M.kame || M.haki) return;
            let sc = (typeof ng.getFormScale === 'function') ? ng.getFormScale() : 1;
            let dir = ng.isFacingLeft ? -1 : 1, cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2;
            let ban = { phai: false, trai: false };
            if (M.fx) for (let f of M.fx) if (f.ng === ng && f.t < f.tong){
                if (f.kieu === 'dat' || f.kieu === 'shoryu' || f.kieu === 'xa' || f.kieu === 'hasho' || f.kieu === 'hado') ban.phai = true;
                else if (f.kieu === 'thuong' || f.kieu === 'thuong3') ban[f.tay || 'phai'] = true;
            }
            if (M.tt){                       // THIEN TRUY: nam dam chia thang xuong suot doan lao
                let px = cx + dir * 8 * sc, py = cy + 20 * sc;
                ctx.save(); ctx.translate(px, py); ctx.rotate(Math.PI / 2); ctx.translate(-px, -py);
                midasVeNamDam({ x: px, y: py, sc, dir: 1 }, 0, 1);
                ctx.restore();
                ban.phai = true;
            }
            let nhun = ng.grounded ? Math.sin(frames * 0.12) * 1.2 : 0;
            if (!ban.trai){ ctx.save(); ctx.globalAlpha = 0.8; midasVeNamDam({ x: cx, y: cy + 6 + nhun, sc: sc * 0.62, dir }, 12 * sc, 0.8); ctx.restore(); }
            if (!ban.phai) midasVeNamDam({ x: cx, y: cy + 2 - nhun, sc: sc * 0.66, dir }, 18 * sc, 1);
        }
// PLAYER_PART_END s4.midasVeTay.1

// index.html:61670 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVe.1 EDITABLE
function midasVe(ng){
            if (!ng || ng.ammoType !== MIDAS_DAN) return;
            let M = midasCua(ng), bac = midasBac(ng);
            let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2;
            /* @@HE-MIDAS-DENJIN — cua so 2 giay dang mo: vong dien quanh nguoi, kem dong
               ho dem nguoc. Vong XANH = con du 5 stack, ra don Denjin duoc. Vong XAM =
               het gio hoac khong du stack, don se ra ban thuong. */
            if ((M.denjinCua || 0) > 0){
                let _dp = M.denjinCua / MIDAS_DENJIN_CUA;
                let _du = (M.dmg || 0) >= MIDAS_DENJIN_TON;
                ctx.save();
                ctx.globalAlpha = 0.35 + 0.35 * Math.abs(Math.sin(frames * 0.35));
                ctx.strokeStyle = _du ? "#40C4FF" : "#546E7A"; ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.arc(cx, cy, 34 + 8 * (1 - _dp), 0, Math.PI * 2); ctx.stroke();
                ctx.lineWidth = 1.5;
                for (let _i = 0; _i < 5; _i++){
                    let _a = (frames * 0.12 + _i * 1.257) % (Math.PI * 2);
                    ctx.beginPath();
                    ctx.moveTo(cx + Math.cos(_a) * 30, cy + Math.sin(_a) * 30);
                    ctx.lineTo(cx + Math.cos(_a) * 43, cy + Math.sin(_a) * 43);
                    ctx.stroke();
                }
                ctx.globalAlpha = 0.92;
                ctx.fillStyle = _du ? "#80D8FF" : "#78909C";
                ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                // dat cao han len: cy-46 dung ngay cho con so thanh tich dang hien
                ctx.fillText("DENJIN " + (M.denjinCua / 60).toFixed(1) + "s", cx, cy - 66);
                ctx.textAlign = "left";
                ctx.restore();
            }
            if (M.haki){ midasVeHaki(ng, M); return; }      // @@HE-HAKI
            if (M.dam) midasVeDam(ng, M);
            else midasVeSac(ng, M);          // chua dam thi dang tich -> hao quang + con so
            if (M.kame) midasVeKame(ng, M);
            if (M.dl)   midasVeDamLuot(ng, M);
            midasVeTay(ng, M);               // GANG TAY VANG luon deo tren hai tay
            midasVeFx(ng, M);                // @@HE-MIDAS-VE: nam dam + vet xe gio cua bo don moi
            // vien chuong Hadoken tu ve trong Projectile.draw(), khong goi o day nua
            if (M.no > 0){
                let k = M.no / 20;
                ctx.save(); ctx.globalAlpha = k * 0.8;
                ctx.strokeStyle = '#FFD54F'; ctx.lineWidth = 5 * k;
                ctx.beginPath(); ctx.arc(cx, cy, 40 + (1 - k) * 70, 0, Math.PI * 2); ctx.stroke();
                ctx.restore();
            }
            if (bac <= 0 && M.loe <= 0) return;
            let nhip = 0.5 + 0.5 * Math.sin(frames * (0.10 + bac * 0.05));
            let R = (26 + bac * 10) * ng.getFormScale();
            ctx.save();
            ctx.globalAlpha = (0.10 + bac * 0.13) * (0.6 + 0.4 * nhip) + (M.loe > 0 ? 0.3 : 0);
            let g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R);
            g.addColorStop(0, '#FFF8E1'); g.addColorStop(0.5, '#FFC107'); g.addColorStop(1, 'rgba(255,193,7,0)');
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
            if (bac >= 3){                       // du giet: them vong vien
                ctx.globalAlpha = 0.55 * nhip; ctx.strokeStyle = '#FFECB3'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(cx, cy, R * 1.15, 0, Math.PI * 2); ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.midasVe.1

// index.html:61731 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVang.1 EDITABLE
function midasVang(nan, tu){
            if (!nan) return;
            nan._bayXa = { vx: (nan.x + nan.w/2 < (tu ? tu.x + tu.w/2 : 0) ? -1 : 1) * 34, vy: -13, t: 0 };
        }
// PLAYER_PART_END s4.midasVang.1

// index.html:61739 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasDayTick.1 EDITABLE
function midasDayTick(){
            let ds = [];
            if (typeof bosses !== 'undefined') ds = ds.concat(bosses);
            if (typeof enemies !== 'undefined') ds = ds.concat(enemies);
            if (gameState === 'pvp'){ if (typeof dino !== 'undefined' && dino) ds.push(dino);
                                      if (typeof dino2 !== 'undefined' && dino2) ds.push(dino2); }
            for (let o of ds){
                if (!o || !o._mdDay) continue;
                let D = o._mdDay; D.t++;
                /* Cu day chi an tren NGUOI CHOI (do duoc 58px). BOSS thi ghim vi tri bang
                   may trang thai cua rieng no: do duoc x len 841.8 roi bi keo phat ve dung
                   840.0 va nam im, ke ca khi da thu doi ca `baseX`. Muon boss that su bi day
                   thi phai treo phan dieu khien vi tri cua no vai khung — do la doi hanh vi
                   boss nen chua lam, xem D10. */
                if (D.vx){ o.x += D.vx; D.vx *= 0.82; }
                if (D.vy){
                    o.y += D.vy; D.vy += 0.9;
                    if (o.y >= D.y0){ o.y = D.y0; D.vy = 0; }
                }
                // CHUA ROI XUONG THI CHUA DUOC BO. Truoc day cat o khung 30, ma cu hat
                // vy=-15 phai mat ~34 khung moi cham dat — nen muc tieu bi bo lung tren
                // khong: do duoc boss dung o y=224 trong khi mat dat la 270.
                if (!D.vy && (D.t > 30 || Math.abs(D.vx) < 0.4)) o._mdDay = null;
            }
        }
// PLAYER_PART_END s4.midasDayTick.1

// index.html:61765 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasTickVangTatCa.1 EDITABLE
function midasTickVangTatCa(){
            midasDayTick();
            if (typeof bosses !== 'undefined')
                for (let o of bosses) if (o && o._bayXa) midasTickVang(o);
            if (typeof enemies !== 'undefined')
                for (let o of enemies) if (o && o._bayXa) midasTickVang(o);
        }
// PLAYER_PART_END s4.midasTickVangTatCa.1

// index.html:61773 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasTickVang.1 EDITABLE
function midasTickVang(ng){
            if (!ng || !ng._bayXa) return;
            let B = ng._bayXa; B.t++;
            ng.x += B.vx; ng.y += B.vy; B.vy += 0.35;
            // Cham mep man hinh: khong phai bien mat lang le, ma DAM VO khung hinh.
            if (!B.daNut){
                let cx = ng.x + (ng.w || 20) / 2;
                if (cx < 6 || cx > canvas.width - 6){
                    B.daNut = 1;
                    midasNut = { x: cx < 6 ? 0 : canvas.width,
                                 y: Math.max(20, Math.min(canvas.height - 20, ng.y + (ng.h || 20) / 2)),
                                 ben: cx < 6 ? -1 : 1, t: 0, hat: (frames % 811) };
                    shakeTimer = Math.max(shakeTimer, 30);
                    if (typeof SFX !== 'undefined' && SFX.glassBreak) SFX.glassBreak();
                }
            }
            if (B.t > 120) ng._bayXa = null;
        }
// PLAYER_PART_END s4.midasTickVang.1

// index.html:61793 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeNut.1 EDITABLE
function midasVeNut(){
            let N = midasNut; if (!N) return;
            N.t++;
            const DAI = 110;
            if (N.t > DAI){ midasNut = null; return; }
            let T = N.t / DAI;
            let bung = Math.min(1, N.t / 12);                 // 12 khung dau la no ra
            let mo = T < 0.72 ? 1 : (1 - (T - 0.72) / 0.28);
            const ng_ = (k) => { let v = Math.sin((k + 1) * 78.233 + N.hat) * 43758.5453; return v - Math.floor(v); };
            ctx.save();
            // quang sang tai diem cham
            ctx.globalAlpha = mo * (1 - T) * 0.9;
            let g = ctx.createRadialGradient(N.x, N.y, 0, N.x, N.y, 90);
            g.addColorStop(0, 'rgba(255,255,255,0.85)');
            g.addColorStop(1, 'rgba(255,193,7,0)');
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(N.x, N.y, 90, 0, Math.PI * 2); ctx.fill();
            // cac nhanh nut
            let so = 11;
            for (let k = 0; k < so; k++){
                // toa ve phia TRONG man hinh, quat rong khoang 150 do
                let a = (-N.ben) * (ng_(k) * 2.6 - 1.3) + (N.ben < 0 ? 0 : Math.PI);
                let dai = (150 + ng_(k + 30) * 330) * bung;
                ctx.globalAlpha = mo * (0.55 + 0.4 * ng_(k + 60));
                ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1 + 2.6 * ng_(k + 90);
                ctx.beginPath(); ctx.moveTo(N.x, N.y);
                let x = N.x, y = N.y, doan = 5;
                for (let i = 1; i <= doan; i++){
                    let b = a + (ng_(k * 7 + i) - 0.5) * 0.55;   // gap khuc
                    x += Math.cos(b) * dai / doan; y += Math.sin(b) * dai / doan;
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
                // vien toi ben trong vet nut cho co chieu sau
                ctx.globalAlpha = mo * 0.35; ctx.strokeStyle = '#0D1117';
                ctx.lineWidth = Math.max(1, ctx.lineWidth * 0.5);
                ctx.stroke();
            }
            // may manh kinh vo bat ra
            ctx.globalAlpha = mo * 0.8;
            for (let k = 0; k < 9; k++){
                let a = (-N.ben) * (ng_(k + 200) * 2.2 - 1.1) + (N.ben < 0 ? 0 : Math.PI);
                let r = bung * (40 + ng_(k + 230) * 190) + T * 60;
                let cx2 = N.x + Math.cos(a) * r, cy2 = N.y + Math.sin(a) * r;
                let sz = 4 + ng_(k + 260) * 11;
                ctx.fillStyle = k % 2 ? 'rgba(255,255,255,0.75)' : 'rgba(207,216,220,0.6)';
                ctx.beginPath();
                ctx.moveTo(cx2, cy2 - sz);
                ctx.lineTo(cx2 + sz * 0.8, cy2 + sz * 0.4);
                ctx.lineTo(cx2 - sz * 0.5, cy2 + sz);
                ctx.closePath(); ctx.fill();
            }
            ctx.restore(); ctx.globalAlpha = 1;
        }
// PLAYER_PART_END s4.midasVeNut.1

// index.html:61847 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.14 EDITABLE
vkDangKy(12, {
            ten: 'MIDAS',
            // @@HE-LOLUNG2 — rune LO LUNG: nha K giua khong (xem hoverMidCharge)
            hoverSac(half){ if (typeof midasHadoDenjinLoLung === 'function') midasHadoDenjinLoLung(this); },
            // MIDAS khong co MOC charge nao ca — giu K chi la tich so, va so do da
            // hien sang ro tren dau kem hao quang. Them vong charge vao chi lam roi mat.
            anVongSac(){ return true; },
            // @@HE-MIDAS: xa toan bo x10 — di TRUOC ca cong PvP / Trickster / ultActive cua dong co
            batUltRieng(){
                if ((typeof ultCharge === 'undefined' ? 0 : ultCharge) < 100) return;
                // @@HE-MIDAS: cua so ULT cua MIDAS phai NGAN, khong dung 420 khung nhu
                // cac loai khac. Ly do: chieu cuoi cua MIDAS chinh la MOT cu dam. Neu de
                // cua so 7 giay thi MOI cu dam thuong trong 7 giay sau do cung bi tinh
                // chung vao tran 33% cua ult — ma tran do da bi chieu cuoi tieu het. Do
                // duoc o mau 300: ult an 99, roi dam voi 300 diem tich chi ra 100.
                // 90 khung du cho song xung kich bay het be ngang man hinh (~73 khung).
                if (gameState === 'pvp'){ this._ultLan = (this._ultLan || 0) + 1; this._ultHan = frames + 90; }
                this.isOverheated = false; this.attackCooldown = 0;
                /* @@HE-HAKI — Hans: "chieu cuoi cua Midas gio co hieu ung tua cham truoc khi dam. Nam dam mau
                   den bong, hieu ung sam set mau den. Co ban la Haki Vu Trang + Haki Ba Vuong ket hop".
                   PvE: GONG 40 nhip (~1.3 giay that, the gioi chay NUA toc) roi moi dam. PvP giu dam ngay
                   — canh tua cham lam dung ca doi thu la khong cong bang. */
                if (gameState !== 'pvp' && this.id === 1){
                    let _M = midasCua(this);
                    _M.haki = { t: 0, x: this.x, y: this.y };
                    this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 140);
                    midasHakiCham = MIDAS_HAKI_CHAM;
                    ultCharge = 0;
                    return;
                }
                midasDam(this, MIDAS_ULT_HS);
                ultCharge = 0;
                return;
            }
        });
// PLAYER_PART_END s4.vkDangKy.14
