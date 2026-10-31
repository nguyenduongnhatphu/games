# Rune: khai báo và logic áp dụng

Mỗi `Rune_*.js` chứa khai báo của Rune. Muốn đổi tác dụng, gửi thêm file ở cột **Logic áp dụng**. Các liên kết `index.html:L…` là điểm dùng trong engine/Boss chưa nằm trong một file người chơi riêng. Rune vũ khí còn dùng các file ammo tương ứng; không phải chỉ sửa mô tả là đổi được tác dụng.

| Rune | Khai báo | Logic áp dụng qua hasRune |
| --- | --- | --- |
| TÀN ẢNH (afterimg) | [Rune_afterimg](runes/Rune_afterimg.js) | [Customization.js](core/Customization.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| HOÁN CHUYỂN ÁP SUẤT (apsuat) | [Rune_apsuat](runes/Rune_apsuat.js) | [RuneEffects01.js](runes/RuneEffects01.js) |
| BẤT TỬ • THỬ NGHIỆM (battu) | [Rune_battu](runes/Rune_battu.js) | [RuneEffects01.js](runes/RuneEffects01.js) |
| BERSERKER (berserk) | [Rune_berserk](runes/Rune_berserk.js) | [index.html:L80665](../index.html#L80665) · [DAIKIEM01.js](ammo/DAIKIEM01.js) · [DAIKIEM05.js](ammo/DAIKIEM05.js) |
| BODY SLAM (bodyslam) | [Rune_bodyslam](runes/Rune_bodyslam.js) | [PlayerMovement.js](core/PlayerMovement.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| VA CHẠM ĐẠN (bulletclash) | [Rune_bulletclash](runes/Rune_bulletclash.js) | [DINOSWORD03.js](ammo/DINOSWORD03.js) · [PlayerCombat.js](core/PlayerCombat.js) · [PlayerRender.js](core/PlayerRender.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| CHÂN LONG (chanlong) | [Rune_chanlong](runes/Rune_chanlong.js) | [RuneEffects01.js](runes/RuneEffects01.js) |
| KHIÊN KHI CHANNEL • C1 (chanshld) | [Rune_chanshld](runes/Rune_chanshld.js) | [CUSTOM07.js](ammo/CUSTOM07.js) · [Channels.js](core/Channels.js) · [KeyboardInput.js](core/KeyboardInput.js) |
| KHIÊN KHI CHANNEL • C2 (chanshldx) | [Rune_chanshldx](runes/Rune_chanshldx.js) | [CUSTOM07.js](ammo/CUSTOM07.js) · [Channels.js](core/Channels.js) · [GameLoop02.js](core/GameLoop02.js) · [KeyboardInput.js](core/KeyboardInput.js) · [PlayerMovement.js](core/PlayerMovement.js) |
| 💥 CHÍ MẠNG (critstrike) | [Rune_critstrike](runes/Rune_critstrike.js) | [CriticalEffects.js](runes/CriticalEffects.js) |
| 💥 CHÍ MẠNG • C2 (critstrikex) | [Rune_critstrikex](runes/Rune_critstrikex.js) | [PlayerDefense.js](core/PlayerDefense.js) · [CriticalEffects.js](runes/CriticalEffects.js) |
| Ô THỨ BA (cus3o) | [Rune_cus3o](runes/Rune_cus3o.js) | [CUSTOM01.js](ammo/CUSTOM01.js) |
| SONG HỆ • THỬ NGHIỆM (cussh) | [Rune_cussh](runes/Rune_cussh.js) | [CUSTOM01.js](ammo/CUSTOM01.js) |
| AWAKENED: NOVA (explshot) | [Rune_explshot](runes/Rune_explshot.js) | [BOOMERANG.js](ammo/BOOMERANG.js) · [DAIKIEM01.js](ammo/DAIKIEM01.js) · [DINOSWORD01.js](ammo/DINOSWORD01.js) · [DINOSWORD03.js](ammo/DINOSWORD03.js) · [INFERNO.js](ammo/INFERNO.js) · [MIDAS02.js](ammo/MIDAS02.js) · [MJOLNIR01.js](ammo/MJOLNIR01.js) · [SPEAR04.js](ammo/SPEAR04.js) · [SPEAR05.js](ammo/SPEAR05.js) · [VENOM02.js](ammo/VENOM02.js) · [EngineHooks.js](core/EngineHooks.js) · [PlayerCombat.js](core/PlayerCombat.js) · [PlayerRender.js](core/PlayerRender.js) · [CriticalEffects.js](runes/CriticalEffects.js) · [RuneEffects01.js](runes/RuneEffects01.js) · [RuneEffects02.js](runes/RuneEffects02.js) |
| ĐÒN ĐẦU TIÊN (firststrike) | [Rune_firststrike](runes/Rune_firststrike.js) | [index.html:L34605](../index.html#L34605) · [index.html:L35156](../index.html#L35156) · [DamageShared.js](core/DamageShared.js) |
| HỒI ĐẦY KHI HẠ BOSS (fullheal) | [Rune_fullheal](runes/Rune_fullheal.js) | [index.html:L97883](../index.html#L97883) · [RuneEffects01.js](runes/RuneEffects01.js) |
| HÚC ĐẦU (headbutt) | [Rune_headbutt](runes/Rune_headbutt.js) | [EngineHooks.js](core/EngineHooks.js) · [GameLoop02.js](core/GameLoop02.js) |
| LƠ LỬNG (hover) | [Rune_hover](runes/Rune_hover.js) | [PlayerMovement.js](core/PlayerMovement.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| +4 MÁU (hp) | [Rune_hp](runes/Rune_hp.js) | [index.html:L81564](../index.html#L81564) · [index.html:L97874](../index.html#L97874) · [index.html:L97877](../index.html#L97877) · [PlayerMovement.js](core/PlayerMovement.js) |
| HƯ VÔ BỘ PHÁP (huvo) | [Rune_huvo](runes/Rune_huvo.js) | [RuneEffects01.js](runes/RuneEffects01.js) |
| SIÊU TỐC (hyperspeed) | [Rune_hyperspeed](runes/Rune_hyperspeed.js) | [DualGuns01.js](ammo/DualGuns01.js) · [PULSAR.js](ammo/PULSAR.js) · [KeyboardInput.js](core/KeyboardInput.js) · [PlayerMovement.js](core/PlayerMovement.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| CHIÊU CUỐI TỨC THÌ • C1 (instult) | [Rune_instult](runes/Rune_instult.js) | [EngineHooks.js](core/EngineHooks.js) |
| CHIÊU CUỐI TỨC THÌ • C2 (instultx) | [Rune_instultx](runes/Rune_instultx.js) | [EngineHooks.js](core/EngineHooks.js) · [GameLoop01.js](core/GameLoop01.js) |
| KATANA (katana) | [Rune_katana](runes/Rune_katana.js) | [DINOSWORD01.js](ammo/DINOSWORD01.js) |
| DIỆT BOSS +1 MÁU (maxgrow) | [Rune_maxgrow](runes/Rune_maxgrow.js) | [index.html:L97874](../index.html#L97874) |
| ĐỆ CHIM • C1 (pet) | [Rune_pet](runes/Rune_pet.js) | [GameLoop02.js](core/GameLoop02.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| ĐỆ NỔ • C1 (pet2) | [Rune_pet2](runes/Rune_pet2.js) | [GameLoop02.js](core/GameLoop02.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| ĐỆ NỔ • C2 (pet2x) | [Rune_pet2x](runes/Rune_pet2x.js) | [GameLoop02.js](core/GameLoop02.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| ĐỆ KHIÊN • C1 (pet3) | [Rune_pet3](runes/Rune_pet3.js) | [GameLoop02.js](core/GameLoop02.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| ĐỆ KHIÊN • C2 (pet3x) | [Rune_pet3x](runes/Rune_pet3x.js) | [GameLoop02.js](core/GameLoop02.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| ĐỆ HỒI MÁU • C1 (pet4) | [Rune_pet4](runes/Rune_pet4.js) | [GameLoop02.js](core/GameLoop02.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| ĐỆ HỒI MÁU • C2 (pet4x) | [Rune_pet4x](runes/Rune_pet4x.js) | [GameLoop02.js](core/GameLoop02.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| ĐỆ LƯỚT CHÉM • C1 (pet5) | [Rune_pet5](runes/Rune_pet5.js) | [GameLoop02.js](core/GameLoop02.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| ĐỆ LƯỚT CHÉM • C2 (pet5x) | [Rune_pet5x](runes/Rune_pet5x.js) | [GameLoop02.js](core/GameLoop02.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| ĐỆ SAO XOAY • C1 (pet6) | [Rune_pet6](runes/Rune_pet6.js) | [GameLoop02.js](core/GameLoop02.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| ĐỆ SAO XOAY • C2 (pet6x) | [Rune_pet6x](runes/Rune_pet6x.js) | [GameLoop02.js](core/GameLoop02.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| ĐỆ CHIM • C2 (petx) | [Rune_petx](runes/Rune_petx.js) | [GameLoop02.js](core/GameLoop02.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| HÚT MÁU (redbird) | [Rune_redbird](runes/Rune_redbird.js) | [index.html:L44863](../index.html#L44863) · [index.html:L44908](../index.html#L44908) · [index.html:L44956](../index.html#L44956) · [index.html:L46811](../index.html#L46811) · [Customization.js](core/Customization.js) · [RuneEffects01.js](runes/RuneEffects01.js) · [RuneEffects02.js](runes/RuneEffects02.js) |
| HỒI SINH • C1 (revive) | [Rune_revive](runes/Rune_revive.js) | [PlayerDefense.js](core/PlayerDefense.js) |
| ROYAL GUARD COUNTER (rgcounter) | [Rune_rgcounter](runes/Rune_rgcounter.js) | [index.html:L80789](../index.html#L80789) · [RuneEffects01.js](runes/RuneEffects01.js) |
| LÁ CHẮN TÁI TẠO (shield) | [Rune_shield](runes/Rune_shield.js) | [Customization.js](core/Customization.js) · [GameLoop02.js](core/GameLoop02.js) |
| SHIN TRICKSTER (shintrick) | [Rune_shintrick](runes/Rune_shintrick.js) | [Customization.js](core/Customization.js) · [PlayerCombat.js](core/PlayerCombat.js) · [PlayerMovement.js](core/PlayerMovement.js) · [PowersAndAccessories01.js](powers/PowersAndAccessories01.js) |
| SWORDMASTER (swordmaster) | [Rune_swordmaster](runes/Rune_swordmaster.js) | [DINOSWORD01.js](ammo/DINOSWORD01.js) · [DINOSWORD02.js](ammo/DINOSWORD02.js) · [DINOSWORD03.js](ammo/DINOSWORD03.js) · [EngineHooks.js](core/EngineHooks.js) · [PlayerCombat.js](core/PlayerCombat.js) · [PlayerRender.js](core/PlayerRender.js) · [CriticalEffects.js](runes/CriticalEffects.js) |
| TRIDENT (trident) | [Rune_trident](runes/Rune_trident.js) | [SPEAR03.js](ammo/SPEAR03.js) |
| TAM LUÂN (trienlien) | [Rune_trienlien](runes/Rune_trienlien.js) | [RAPIDFIRE.js](ammo/RAPIDFIRE.js) · [KeyboardInput.js](core/KeyboardInput.js) · [PlayerDefense.js](core/PlayerDefense.js) · [PlayerMovement.js](core/PlayerMovement.js) |
| NHẢY BA (triplejump) | [Rune_triplejump](runes/Rune_triplejump.js) | [KeyboardInput.js](core/KeyboardInput.js) · [PlayerMovement.js](core/PlayerMovement.js) |
| TỬ ĐỊA CẢNH GIỚI (tudia) | [Rune_tudia](runes/Rune_tudia.js) | [RuneEffects01.js](runes/RuneEffects01.js) |
| UNITY (unity) | [Rune_unity](runes/Rune_unity.js) | [index.html:L77646](../index.html#L77646) |
| VAN XẢ KHẨN CẤP (vanxa) | [Rune_vanxa](runes/Rune_vanxa.js) | [RuneEffects01.js](runes/RuneEffects01.js) |
| VÔ HẠ HẠN (vohahan) | [Rune_vohahan](runes/Rune_vohahan.js) | [RuneEffects01.js](runes/RuneEffects01.js) |
| LƯỚT SÉT (voltdash) | [Rune_voltdash](runes/Rune_voltdash.js) | [MJOLNIR01.js](ammo/MJOLNIR01.js) · [VOLT.js](ammo/VOLT.js) · [EngineHooks.js](core/EngineHooks.js) · [PlayerMovement.js](core/PlayerMovement.js) · [RuneEffects01.js](runes/RuneEffects01.js) |
| SON WUKONG (wukong) | [Rune_wukong](runes/Rune_wukong.js) | [SPEAR01.js](ammo/SPEAR01.js) |
