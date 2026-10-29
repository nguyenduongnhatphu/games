# Dino boss editing snapshots

- `index.html` remains the authoritative, standalone game. Do not add runtime imports of `bosses/*.js`.
- `bosses/README.md` explains the editable Boss snapshots and the workflow for files returned by other AIs. Preserve their markers and read-only context.
- After changing `index.html`, refresh the snapshots with `node tools/boss-parts/index.cjs export` and run `node tools/boss-parts/index.cjs check`, from the repository root. If dependencies are missing, use `npm ci --prefix tools/boss-parts`.
- Use `node tools/boss-parts/index.cjs apply <BossName|file.js>...` to merge current snapshots. Do not bypass stale-source or pending-edit checks by overwriting files; compare and reconcile changes first.
- The merge tool checks syntax and source consistency. Also run gameplay checks appropriate to the edited Boss; snapshot generation alone does not validate combat behavior.
- `python3 tests/boss_parts.py` tests export/import in a temporary copy and must leave the shipped HTML unchanged.
