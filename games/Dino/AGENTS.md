# Dino editing snapshots

- `index.html` remains the authoritative, standalone game. Do not add runtime imports of `bosses/*.js` or `player-parts/**/*.js`.
- `bosses/README.md` explains the editable Boss snapshots and the workflow for files returned by other AIs. Preserve their markers and read-only context.
- `PLAYER_FILES.md` and `player-parts/README.md` explain the player/form/ammo/Rune snapshots. Preserve their markers and immutable `__Part` syntax scaffolds; only inner editable spans return to the source scope. Rune declarations and effects may be in different files; consult `player-parts/RUNE_GUIDE.md`.
- After changing `index.html`, run both `node tools/boss-parts/index.cjs export` and `node tools/player-parts/index.cjs export`, then run both tools with `check`, from the repository root. If dependencies are missing, use `npm ci --prefix tools/boss-parts`.
- Use `node tools/boss-parts/index.cjs apply <BossName|file.js>...` to merge current snapshots. Do not bypass stale-source or pending-edit checks by overwriting files; compare and reconcile changes first.
- Use `node tools/player-parts/index.cjs apply <Name|file.js>...` for player files or mixed player/Boss edits from the same snapshot in one transaction. Both importers refresh both snapshot collections and protect pending edits in the other collection.
- The merge tool checks syntax and source consistency. Also run gameplay checks appropriate to the edited Boss; snapshot generation alone does not validate combat behavior.
- `python3 tests/boss_parts.py` tests export/import in a temporary copy and must leave the shipped HTML unchanged.
- `python3 tests/player_parts.py` tests scoped player/Rune imports, mixed Boss imports and bidirectional snapshot refresh in a temporary copy. It must leave the shipped HTML unchanged.
