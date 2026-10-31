"""Player/ammo/rune snapshots: lossless source ranges and guarded mixed Boss imports."""
from pathlib import Path
import hashlib
import json
import re
import shutil
import subprocess
import tempfile

REPO=Path(__file__).resolve().parents[1]
SOURCE=REPO/'games/Dino/index.html'
TOOL=REPO/'tools/player-parts/index.cjs'
BOSS=REPO/'tools/boss-parts/index.cjs'
original=SOURCE.read_bytes()
digest=lambda b:hashlib.sha256(b).hexdigest()

def command(root,*args,ok=True,boss=False):
    result=subprocess.run(['node',str(BOSS if boss else TOOL),*args,'--root',str(root)],capture_output=True,text=True)
    assert (result.returncode==0)==ok,result.stdout+result.stderr
    return result.stdout+result.stderr

def edit(file,label,change,prefix='PLAYER'):
    text=file.read_text()
    pattern=re.compile(r'(^// '+prefix+r'_PART_BEGIN ([\w.-]+) (?:EDITABLE|READ_ONLY)\n)(.*?)(\n// '+prefix+r'_PART_END \2$)',re.M|re.S)
    match=next(m for m in pattern.finditer(text) if label in m[2])
    before=match[3];after=change(before);assert after!=before,(file,label)
    file.write_text(text[:match.start(3)]+after+text[match.end(3):])
    return before,after

print(command(REPO,'check').strip())
m=json.loads((REPO/'games/Dino/player-parts/manifest.json').read_text())
assert m['sourceHash']==digest(original) and len(m['runeIds'])==52
assert m['ammoSlots']==list(range(21))
assert len(m['files'])>=100
for f in m['files']:
    assert (REPO/'games/Dino/player-parts'/f['file']).stat().st_size<70*1024,f['file']
for file,tokens in {
    'forms/IronhaulForm.js':['IRON_PLAYER_MOVES','ironSilverStart','skyripper','ironKey'],
    'forms/ApexObelith.js':['apexCreate','tickObelith','fireObelithBeam'],
    'forms/DanteDSD.js':['DSW_MOVES','dswStrike'],
    'forms/DanteSDT.js':['danteJudgement','danteSinFire'],
    'core/PlayerMovement.js':['_updateGoc','class __Part'],
    'runes/Rune_hp.js':["id:'hp'"],
    'ammo/Registry.js':['vkDangKy'],
}.items():
    content=(REPO/'games/Dino/player-parts'/file).read_text()
    for token in tokens:assert token in content,(file,token)

with tempfile.TemporaryDirectory(prefix='dino-player-parts-') as temporary:
    root=Path(temporary);source=root/'games/Dino/index.html';source.parent.mkdir(parents=True);source.write_bytes(original)
    shutil.copytree(REPO/'games/Dino/player-parts',source.parent/'player-parts')
    shutil.copytree(REPO/'games/Dino/bosses',source.parent/'bosses')
    parts=source.parent/'player-parts';bosses=source.parent/'bosses'
    command(root,'export');assert source.read_bytes()==original
    command(root,'apply','IronhaulForm');assert source.read_bytes()==original
    print('PASS lossless export and no-op import')

    # Object expression embedded in the native RUNES array: write only its original span.
    stale=(parts/'forms/IronhaulForm.js').read_text()
    hp=parts/'runes/Rune_hp.js'
    before,after=edit(hp,'.hp.',lambda s:s.replace("name:'+4 MÁU'","name:'+5 MÁU'"))
    command(root,'export',ok=False)
    command(root,'apply','Rune_hp')
    expected=original.decode().replace(before,after,1);assert source.read_text()==expected
    command(root,'check');command(root,'check',boss=True)

    # Scoped local closure and a class method remain in their original scope.
    before,after=edit(parts/'forms/ApexCore.js','apexCreate.SCALE.',lambda s:s.replace('0.55','0.56').replace('.55','.56'))
    command(root,'apply','ApexCore');expected=expected.replace(before,after,1);assert source.read_text()==expected
    before,after=edit(parts/'core/PlayerMovement.js','Player.constructor.',lambda s:s.replace('this.bulletDmg = 1;','this.bulletDmg = 1.1;'))
    command(root,'apply','PlayerMovement');expected=expected.replace(before,after,1);assert source.read_text()==expected

    # New top-level helpers can be inserted inside a normal editable declaration.
    incoming=root/'IronhaulForm - Gemini.js';incoming.write_text((parts/'forms/IronhaulForm.js').read_text())
    before,after=edit(incoming,'.IRON_PLAYER_MOVES.',lambda s:'function ironPartsProbe(){return 1;}\n'+s)
    command(root,'apply',str(incoming));expected=expected.replace(before,after,1);assert source.read_text()==expected
    assert 'ironPartsProbe' in (parts/'forms/IronhaulForm.js').read_text()
    print('PASS Rune object, Apex closure, Player class method and added helper round trips')

    unchanged=source.read_bytes()
    incoming.write_text(stale);assert 'bản game cũ' in command(root,'apply',str(incoming),ok=False)
    current=(parts/'forms/IronhaulForm.js').read_text()
    incoming.write_text(current+'\nfunction lostOutside(){}\n');assert 'ngoài marker' in command(root,'apply',str(incoming),ok=False)
    incoming.write_text(current.replace('PLAYER_PART_END','MISSING',1));command(root,'apply',str(incoming),ok=False)
    incoming.write_text(current);edit(incoming,'.ironOn.',lambda s:'const = broken;');command(root,'apply',str(incoming),ok=False)
    incoming.write_text(current);edit(incoming,'.ironOn.',lambda s:s.replace('function ironOn(', 'function renamedIronOn('));assert 'API' in command(root,'apply',str(incoming),ok=False)
    assert source.read_bytes()==unchanged

    # Scaffolds are protected, even though the extracted method itself is editable.
    method=root/'PlayerMovement - AI.js';method.write_text((parts/'core/PlayerMovement.js').read_text().replace('class __Part','class Changed',1))
    assert 'ngoài marker' in command(root,'apply',str(method),ok=False)
    print('PASS stale source, marker, scaffold, syntax and API identity guards')

    # Mixed changes from the same snapshot can be committed together; neither tool discards the other.
    art=bosses/'ArtoriasBoss.js'
    before_b,after_b=edit(art,'ART_BUFF_HP',lambda s:s.replace('ART_BUFF_HP = 30','ART_BUFF_HP = 31'),prefix='BOSS')
    before_p,after_p=edit(hp,'.hp.',lambda s:s.replace("name:'+5 MÁU'","name:'+4 MÁU'"))
    assert 'người chơi đang sửa' in command(root,'apply','ArtoriasBoss',boss=True,ok=False)
    assert 'Boss đang sửa' in command(root,'apply','Rune_hp',ok=False)
    command(root,'apply','Rune_hp','ArtoriasBoss')
    expected=expected.replace(before_b,after_b,1).replace(before_p,after_p,1);assert source.read_text()==expected
    command(root,'check');command(root,'check',boss=True)

    # The original Boss command also refreshes all player snapshots.
    before,after=edit(art,'ART_BUFF_HP',lambda s:s.replace('ART_BUFF_HP = 31','ART_BUFF_HP = 32'),prefix='BOSS')
    command(root,'apply','ArtoriasBoss',boss=True);expected=expected.replace(before,after,1);assert source.read_text()==expected
    command(root,'check');command(root,'check',boss=True)
    print('PASS pending cross-collection edits, mixed transaction and bidirectional snapshot refresh')

    # A newer HTML can never be overwritten by fragments from an earlier revision.
    source.write_text(source.read_text()+'\n<!-- independent update -->\n');before=source.read_bytes()
    assert 'index.html đã thay đổi' in command(root,'apply','IronhaulForm',ok=False)
    assert source.read_bytes()==before

assert SOURCE.read_bytes()==original,'tests changed the shipped game'
print('PASS shipped HTML unchanged; forms, 52 Runes, 21 ammo slots and guarded scoped merges')
