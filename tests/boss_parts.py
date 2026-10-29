"""Extraction/merge workflow in an isolated copy; the shipped game stays unchanged."""
from pathlib import Path
import hashlib
import json
import re
import shutil
import subprocess
import tempfile

REPO = Path(__file__).resolve().parents[1]
TOOL = REPO / 'tools/boss-parts/index.cjs'
SOURCE = REPO / 'games/Dino/index.html'
PARTS = REPO / 'games/Dino/bosses'
original = SOURCE.read_bytes()
digest = lambda value: hashlib.sha256(value).hexdigest()


def command(root, *args, ok=True):
    result = subprocess.run(['node', str(TOOL), *args, '--root', str(root)], capture_output=True, text=True)
    assert (result.returncode == 0) == ok, result.stdout + result.stderr
    return result.stdout + result.stderr


def edit_part(filename, transform, mode='EDITABLE', label=None):
    text = filename.read_text()
    pattern = re.compile(r'(^// BOSS_PART_BEGIN ([\w.-]+) ' + mode + r'\n)(.*?)(\n// BOSS_PART_END \2$)', re.M | re.S)
    matches = list(pattern.finditer(text))
    match = next(m for m in matches if label is None or label in m[2])
    text = text[:match.start(3)] + transform(match[3]) + text[match.end(3):]
    filename.write_text(text)
    return match[3]


print(command(REPO, 'check').strip())
manifest = json.loads((PARTS / 'manifest.json').read_text())
assert manifest['bossCount'] == 72 and manifest['sourceHash'] == digest(original)
for name, expected in {
    'DanteBoss': ['class DanteBoss', 'Object.assign(DanteBoss.prototype', 'startCloseCombo =', 'runSinDrill ='],
    'VergilBoss': ['class VergilBoss', 'Object.assign(VergilBoss.prototype', 'startAttackerString =', 'syncAttackerDoppelganger='],
    'ArtoriasBoss': ['class ArtoriasBoss', 'ART_BUFF_HP = 30'],
    'ThalassaBoss': ['class ThalassaBoss', 'bbNgap'],
    'HoGacBoss': ['class HoGacBoss', 'HG_P1 = 110'],
    'TriDino': ['class TriDino'],
    'TrainingDummy': ['class TrainingDummy'],
}.items():
    text = (PARTS / (name + '.js')).read_text()
    for token in expected:
        assert token in text, (name, token)

with tempfile.TemporaryDirectory(prefix='dino-boss-parts-') as temporary:
    root = Path(temporary)
    source = root / 'games/Dino/index.html'
    source.parent.mkdir(parents=True)
    source.write_bytes(original)
    shutil.copytree(PARTS, source.parent / 'bosses')
    parts = source.parent / 'bosses'
    artorias = parts / 'ArtoriasBoss.js'
    dante = parts / 'DanteBoss.js'
    shared = parts / 'shared/BossShared.js'

    # Export and a no-op import must be byte-for-byte lossless.
    command(root, 'export')
    assert source.read_bytes() == original
    command(root, 'apply', 'DanteBoss')
    assert source.read_bytes() == original

    # Change one real boss tuning value, not a synthetic stand-in.
    edit_part(artorias, lambda code: code.replace('ART_BUFF_HP = 30', 'ART_BUFF_HP = 31'), label='ART_BUFF_HP')
    command(root, 'export', ok=False)
    assert source.read_bytes() == original and 'ART_BUFF_HP = 31' in artorias.read_text()
    command(root, 'apply', 'ArtoriasBoss')
    expected = original.decode().replace('ART_BUFF_HP = 30', 'ART_BUFF_HP = 31')
    assert source.read_text() == expected
    command(root, 'check')

    # Late prototype overrides merge at their original late location, even when renamed by Gemini.
    stale = dante.read_text()
    incoming = root / 'DanteBoss - Gemini.js'
    incoming.write_text(stale)
    edit_part(incoming, lambda code: code.replace('= true', '= false'), label='meleePriority')
    command(root, 'apply', str(incoming))
    expected = expected.replace('DanteBoss.prototype.meleePriority = true;', 'DanteBoss.prototype.meleePriority = false;')
    assert source.read_text() == expected
    command(root, 'check')

    # Old snapshots, read-only contexts, missing markers and syntax errors never change the game.
    before = source.read_bytes()
    incoming.write_text(stale)
    assert 'bản game cũ' in command(root, 'apply', str(incoming), ok=False)
    incoming.write_text(dante.read_text())
    edit_part(incoming, lambda code: code + '\n// edited shared context', mode='READ_ONLY')
    assert 'READ_ONLY' in command(root, 'apply', str(incoming), ok=False)
    incoming.write_text(dante.read_text() + '\nfunction lostOutsideMarker() {}\n')
    assert 'ngoài marker' in command(root, 'apply', str(incoming), ok=False)
    incoming.write_text(dante.read_text().replace('BOSS_PART_END', 'MISSING_END', 1))
    assert 'marker' in command(root, 'apply', str(incoming), ok=False)
    incoming.write_text(dante.read_text())
    edit_part(incoming, lambda code: 'const = broken;')
    command(root, 'apply', str(incoming), ok=False)
    assert source.read_bytes() == before

    # Batch a private tuning edit and an intentional shared edit; other pending work is protected.
    edit_part(artorias, lambda code: code.replace('ART_BUFF_HP = 31', 'ART_BUFF_HP = 32'), label='ART_BUFF_HP')
    edit_part(shared, lambda code: code.replace('GWAVE_H = 96', 'GWAVE_H = 97'), label='GWAVE_H')
    assert 'đang sửa' in command(root, 'apply', 'ArtoriasBoss', ok=False)
    command(root, 'apply', 'ArtoriasBoss', 'BossShared')
    expected = expected.replace('ART_BUFF_HP = 31', 'ART_BUFF_HP = 32').replace('GWAVE_H = 96', 'GWAVE_H = 97')
    assert source.read_text() == expected
    command(root, 'check')

    # New helper declarations inside an editable region are rediscovered and exported.
    edit_part(artorias, lambda code: 'function artoriasBuffLimit(){return 32;}\n' + code.replace('ART_BUFF_HP = 32', 'ART_BUFF_HP = artoriasBuffLimit()'), label='ART_BUFF_HP')
    command(root, 'apply', 'ArtoriasBoss')
    assert 'function artoriasBuffLimit(){return 32;}' in source.read_text()
    assert 'artoriasBuffLimit' in artorias.read_text()
    command(root, 'check')

    # An independently changed HTML cannot be overwritten by an old set of fragments.
    source.write_text(source.read_text() + '\n<!-- unrelated change -->\n')
    changed = source.read_bytes()
    assert 'index.html đã thay đổi' in command(root, 'apply', 'ArtoriasBoss', ok=False)
    assert source.read_bytes() == changed

assert SOURCE.read_bytes() == original, 'workflow tests modified the shipped HTML'
print('PASS original HTML unchanged; all boss classes/late overrides, lossless export, private/shared batches, helpers, stale/read-only/marker/syntax/conflict guards')
