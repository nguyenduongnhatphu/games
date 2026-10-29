#!/usr/bin/env node
'use strict';

// Editing snapshots only: never add script imports to the standalone game.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const acorn = require('acorn');
const globals = require('acorn-globals');
const rootFlag = process.argv.indexOf('--root');
const root = rootFlag < 0 ? path.resolve(__dirname, '../..') : path.resolve(process.argv[rootFlag + 1]);
const args = process.argv.slice(2).filter((_, i, list) => list[i - 1] !== '--root' && list[i] !== '--root');
const sourcePath = 'games/Dino/index.html';
const outPath = 'games/Dino/bosses';
const absolute = rel => path.join(root, rel);
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const read = rel => fs.readFileSync(absolute(rel), 'utf8');
const parse = code => acorn.parse(code, {ecmaVersion: 'latest', locations: true});
const fail = message => { throw Error(message); };
const structure = text => text.replace(/(^\/\/ BOSS_PART_BEGIN [\w.-]+ (?:EDITABLE|READ_ONLY)\r?\n)[\s\S]*?(\r?\n\/\/ BOSS_PART_END [\w.-]+\r?$)/gm, '$1$2');

function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (node.type) visit(node);
  for (const [key, value] of Object.entries(node)) {
    if (key === 'loc') continue;
    if (Array.isArray(value)) value.forEach(child => walk(child, visit));
    else if (value && typeof value === 'object') walk(value, visit);
  }
}

function declarations(node) {
  if (node.type !== 'VariableDeclaration') return node.id ? [node.id.name] : [];
  const names = [];
  for (const declaration of node.declarations) walk(declaration.id, n => {
    if (n.type === 'Identifier') names.push(n.name);
  });
  return names;
}

function memberName(node) {
  if (node?.type === 'Identifier') return node.name;
  if (node?.type === 'MemberExpression' && !node.computed) return memberName(node.object) + '.' + node.property.name;
  return '';
}

function build(html) {
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)];
  // The browser shares lexical globals across script tags; check those collisions too.
  parse(scripts.map(s => s[1]).join('\n;\n'));
  const records = [], definitions = new Map(), ids = new Map();
  const lineStarts = [0];
  for (let i = 0; i < html.length; i++) if (html[i] === '\n') lineStarts.push(i + 1);
  const lineOf = offset => {
    let low = 0, high = lineStarts.length;
    while (low + 1 < high) { const middle = (low + high) >> 1; if (lineStarts[middle] <= offset) low = middle; else high = middle; }
    return low + 1;
  };
  for (let script = 0; script < scripts.length; script++) {
    const match = scripts[script], offset = match.index + match[0].indexOf('>') + 1;
    for (const node of parse(match[1]).body) {
      const names = declarations(node), expression = node.expression;
      let label = names[0] || memberName(expression?.left);
      if (!label && expression?.type === 'CallExpression') {
        label = memberName(expression.callee) || expression.callee.id?.name || 'call';
        if (label === 'Object.assign') label += '.' + memberName(expression.arguments[0]);
      }
      label = (label || node.type).replace(/[^A-Za-z0-9_.-]/g, '_');
      const key = `s${script}.${label}`, count = (ids.get(key) || 0) + 1;
      ids.set(key, count);
      const record = {id: `${key}.${count}`, node, names, script, start: offset + node.start, end: offset + node.end};
      record.line = lineOf(record.start);
      record.code = html.slice(record.start, record.end);
      record.hash = hash(record.code);
      records.push(record);
      names.forEach(name => definitions.set(name, record));
    }
  }
  const bosses = records.filter(r => r.node.type === 'ClassDeclaration' && (/Boss$/.test(r.names[0]) || ['TriDino', 'TrainingDummy'].includes(r.names[0])));
  const bossNames = new Set(bosses.map(r => r.names[0]));
  const refs = r => r.refs || (r.refs = globals({type: 'Program', body: [r.node], start: r.node.start, end: r.node.end}).map(g => g.name));
  const owners = new Map();
  const own = (r, boss) => { if (!owners.has(r)) owners.set(r, new Set()); owners.get(r).add(boss); };
  const seed = (r, names) => names.forEach(name => own(r, name));
  bosses.forEach(r => seed(r, r.names));
  const bossScripts = new Set(records.filter(r => r.names.includes('DANTE_BOSS_MELEE') || r.names.includes('VERGIL_BOSS_STRINGS')).map(r => r.script));
  const allowed = r => r.script <= 1 || bossScripts.has(r.script) || r.names.some(n => /^(HG_|SDTU_)/.test(n) || ['SDT_ULT', 'BOSS_CHUNG'].includes(n));
  const prototypeBoss = node => {
    const name = memberName(node).split('.prototype')[0];
    return memberName(node).includes('.prototype') && bossNames.has(name) ? name : null;
  };
  for (const r of records) {
    const expression = r.node.expression;
    let name = prototypeBoss(expression?.left);
    if (expression?.type === 'CallExpression' && memberName(expression.callee) === 'Object.assign') name = prototypeBoss(expression.arguments[0]);
    if (name) own(r, name);
    if (r.node.type === 'VariableDeclaration') for (const d of r.node.declarations) {
      name = prototypeBoss(d.init); if (name) own(r, name);
    }
    // Shared IIFEs install SDT and base methods through a loop variable C.
    if (expression?.type === 'CallExpression' && ['FunctionExpression', 'ArrowFunctionExpression'].includes(expression.callee.type)) {
      let writesPrototype = false;
      walk(expression.callee.body, n => {
        if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' && memberName(n.left.object).endsWith('.prototype')) writesPrototype = true;
      });
      if (writesPrototype) seed(r, refs(r).filter(n => bossNames.has(n)));
    }
  }
  // Follow real free identifiers, so local x/keys/p never pull in unrelated engine code.
  const queue = [...owners].flatMap(([r, names]) => [...names].map(name => [r, name]));
  for (let i = 0; i < queue.length; i++) {
    const [record, boss] = queue[i];
    for (const name of refs(record)) {
      const dep = definitions.get(name);
      if (!dep || bossNames.has(name) || !allowed(dep) || owners.get(dep)?.has(boss)) continue;
      own(dep, boss); queue.push([dep, boss]);
    }
  }
  // Helpers also used by player/engine code are shared even if only one Boss reads them.
  const engineShared = new Set();
  for (const record of records) if (!owners.has(record) && !allowed(record)) {
    for (const name of refs(record)) {
      const dep = definitions.get(name);
      if (dep && owners.has(dep) && !bossNames.has(name)) engineShared.add(dep);
    }
  }
  // Player move data/rendering is useful context for DMC bosses, but remains read-only.
  const referenceAllowed = r => r.names.some(n => /^(DSW_MOVES|BLR_MOVES|CAV_MOVES|KCB_MOVES|YMT_MOVES|dswPose|dswPaint.*|blrPaint.*|cavPaint.*|kcbPaint.*|vgDraw.*|ymtPose|danteDrawSword|danteSwordPose|danteArmJoints|danteDrawSinDrill|danteSinDrillBox|DANTE_SIN_DRILL)$/.test(n));
  const references = new Map();
  for (const boss of bossNames) {
    const pending = [...owners].filter(([, names]) => names.has(boss)).map(([r]) => r), selected = new Set();
    for (let i = 0; i < pending.length; i++) for (const name of refs(pending[i])) {
      const dep = definitions.get(name);
      if (!dep || owners.has(dep) || !referenceAllowed(dep) || selected.has(dep)) continue;
      selected.add(dep); pending.push(dep);
    }
    references.set(boss, selected);
  }
  const selected = new Set([...owners.keys(), ...[...references.values()].flatMap(s => [...s])]);
  const parts = records.filter(r => selected.has(r)).map(r => ({
    id: r.id, start: r.start, end: r.end, line: r.line, script: r.script, hash: r.hash,
    names: r.names, owner: !owners.has(r) ? 'reference' : owners.get(r).size === 1 && !engineShared.has(r) ? [...owners.get(r)][0] : 'shared',
    usedBy: [...(owners.get(r) || [])].sort(), code: r.code
  }));
  const byId = new Map(parts.map(p => [p.id, p]));
  const files = [];
  for (const boss of [...bossNames].sort()) {
    const included = parts.filter(p => p.owner === boss || p.usedBy.includes(boss) || references.get(boss).has(records.find(r => r.id === p.id)));
    const provided = new Set(included.flatMap(p => p.names));
    const external = new Set();
    for (const part of included) for (const name of refs(records.find(r => r.id === part.id))) if (!provided.has(name)) external.add(name);
    files.push({name: boss, file: `${boss}.js`, parts: included.map(p => p.id), external: [...external].sort()});
  }
  files.push({name: 'BossShared', file: 'shared/BossShared.js', parts: parts.filter(p => p.owner === 'shared').map(p => p.id), external: []});
  const contents = new Map();
  for (const file of files) {
    const header = [
      `// BOSS_FILE: ${file.name}`,
      `// BOSS_SNAPSHOT: ${hash(html)}`,
      `// Nguồn game: ${sourcePath}`,
      '// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.',
      '// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.',
      '// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.',
      '// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.',
      '// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.',
      `// Global / tham chiếu ngoài file: ${file.external.join(', ') || '(xem các Boss và API trong README.md)'}`,
      ''
    ].join('\n');
    const bodies = file.parts.map(id => {
      const part = byId.get(id), editable = part.owner === file.name || (file.name === 'BossShared' && part.owner === 'shared');
      return `// Nguồn: index.html:${part.line} · ${part.owner === 'reference' ? 'Ngữ cảnh người chơi' : 'Dùng bởi: ' + part.usedBy.join(', ')}\n// BOSS_PART_BEGIN ${id} ${editable ? 'EDITABLE' : 'READ_ONLY'}\n${part.code}\n// BOSS_PART_END ${id}\n`;
    }).join('\n');
    const content = header + bodies;
    parse(content);
    file.hash = hash(content);
    file.structureHash = hash(structure(content));
    contents.set(file.file, content);
  }
  const manifest = {version: 1, source: sourcePath, sourceHash: hash(html), bossCount: bosses.length, files,
    parts: parts.map(({code, ...part}) => part)};
  return {manifest, contents, parts, scripts: scripts.length};
}

function dirtyFiles(manifest, except = new Set()) {
  return manifest.files.filter(f => !except.has(f.name) && (!fs.existsSync(absolute(`${outPath}/${f.file}`)) || hash(read(`${outPath}/${f.file}`)) !== f.hash)).map(f => f.file);
}

function write(model) {
  for (const [file, content] of model.contents) {
    fs.mkdirSync(path.dirname(absolute(`${outPath}/${file}`)), {recursive: true});
    fs.writeFileSync(absolute(`${outPath}/${file}`), content);
  }
  fs.writeFileSync(absolute(`${outPath}/manifest.json`), JSON.stringify(model.manifest, null, 2) + '\n');
  const rows = model.manifest.files.filter(f => f.name !== 'BossShared').map(f => {
    const text = model.contents.get(f.file), lines = text.split('\n').length - 1;
    return `| [${f.name}](${f.file}) | ${lines} | ${(Buffer.byteLength(text) / 1024).toFixed(1)} KB |`;
  });
  fs.writeFileSync(absolute(`${outPath}/CATALOG.md`), '# Các file Boss\n\nTải file `.js` cần sửa bằng **Download raw file** trên GitHub. Xem [hướng dẫn gửi AI và ghép lại](README.md).\n\n| Boss / đối tượng tập luyện | Số dòng | Dung lượng |\n|---|---:|---:|\n' + rows.join('\n') + '\n\n[Phần dùng chung](shared/BossShared.js) chỉ cần gửi thêm khi AI cần sửa một vùng READ_ONLY dùng chung.\n');
}

function sections(text) {
  const found = [...text.matchAll(/^\/\/ BOSS_PART_BEGIN ([\w.-]+) (EDITABLE|READ_ONLY)\r?\n([\s\S]*?)\r?\n\/\/ BOSS_PART_END \1\r?$/gm)];
  return found.map(m => ({id: m[1], mode: m[2], code: m[3].replace(/\r\n/g, '\n'), match: m[0]}));
}

function apply(inputs) {
  if (!inputs.length) fail('Cần tên Boss hoặc đường dẫn file JS đã sửa.');
  const manifest = JSON.parse(read(`${outPath}/manifest.json`)), html = read(sourcePath);
  if (hash(html) !== manifest.sourceHash) fail('index.html đã thay đổi sau lần tách. Cần đối chiếu bản cũ/mới trước khi ghép; không ghi đè bản game mới hơn.');
  const changes = new Map(), selected = new Set();
  for (const input of inputs) {
    const local = manifest.files.find(f => f.name === input || f.file === input);
    const filename = local ? absolute(`${outPath}/${local.file}`) : path.resolve(input);
    const text = fs.readFileSync(filename, 'utf8').replace(/\r\n/g, '\n');
    const name = text.match(/^\/\/ BOSS_FILE: (\w+)$/m)?.[1];
    const file = manifest.files.find(f => f.name === name);
    if (!file) fail(`File không có BOSS_FILE hợp lệ: ${input}`);
    if (text.match(/^\/\/ BOSS_SNAPSHOT: ([a-f0-9]+)$/m)?.[1] !== manifest.sourceHash) fail(`${name}: file được tách từ bản game cũ. Cần đối chiếu thay đổi trước khi ghép.`);
    selected.add(name);
    const parts = sections(text);
    if (parts.map(p => p.id).join('|') !== file.parts.join('|')) fail(`${name}: thiếu, đổi thứ tự hoặc đổi tên marker.`);
    // Code outside markers must not be silently discarded.
    if (hash(structure(text)) !== file.structureHash) fail(`${name}: có sửa ngoài marker. Hãy đặt helper mới trong vùng EDITABLE.`);
    for (const part of parts) {
      const original = manifest.parts.find(p => p.id === part.id);
      const editable = original.owner === name || (name === 'BossShared' && original.owner === 'shared');
      if (hash(part.code) === original.hash) continue;
      if (!editable || part.mode !== 'EDITABLE') fail(`${name}: vùng ${part.id} là READ_ONLY; sửa file dùng chung tương ứng.`);
      if (changes.has(part.id) && changes.get(part.id) !== part.code) fail(`Hai file sửa khác nhau ở ${part.id}.`);
      parse(part.code);
      changes.set(part.id, part.code);
    }
  }
  const dirty = dirtyFiles(manifest, selected);
  if (dirty.length) fail('Còn file tách khác đang sửa: ' + dirty.join(', ') + '. Hãy apply chúng cùng lúc.');
  if (!changes.size) { console.log('Không có thay đổi trong vùng EDITABLE.'); return; }
  let updated = html;
  const replacements = manifest.parts.filter(p => changes.has(p.id)).sort((a, b) => b.start - a.start);
  for (const part of replacements) {
    if (hash(html.slice(part.start, part.end)) !== part.hash) fail(`Vị trí nguồn đã lệch: ${part.id}`);
    updated = updated.slice(0, part.start) + changes.get(part.id) + updated.slice(part.end);
  }
  const next = build(updated);
  if (next.scripts !== build(html).scripts || next.manifest.files.map(f => f.name).join('|') !== manifest.files.map(f => f.name).join('|')) fail('Bản sửa làm đổi số script hoặc mất class Boss.');
  fs.writeFileSync(absolute(sourcePath), updated);
  write(next);
  console.log(`Đã ghép ${changes.size} vùng vào ${sourcePath} và cập nhật toàn bộ file tách.`);
}


try {
  const command = args[0] || 'check';
  if (command === 'apply') apply(args.slice(1));
  else if (command === 'export' || command === 'check') {
    const model = build(read(sourcePath));
    const manifestPath = `${outPath}/manifest.json`;
    if (command === 'export') {
      if (fs.existsSync(absolute(manifestPath))) {
        const dirty = dirtyFiles(JSON.parse(read(manifestPath)));
        if (dirty.length) fail('Không ghi đè các file đang sửa: ' + dirty.join(', ') + '. Hãy apply trước.');
      }
      write(model);
      console.log(`Đã tách ${model.manifest.bossCount} Boss/đối tượng tập luyện. File HTML giữ nguyên từng byte.`);
    } else {
      if (JSON.stringify(JSON.parse(read(manifestPath))) !== JSON.stringify(model.manifest)) fail('Manifest chưa đồng bộ với index.html.');
      for (const [file, expected] of model.contents) if (read(`${outPath}/${file}`) !== expected) fail(`File chưa đồng bộ hoặc đang sửa: ${file}`);
      console.log(`PASS ${model.manifest.bossCount} file Boss + shared: class, helpers, prototype overrides, cú pháp và nguồn khớp hoàn toàn.`);
    }
  } else fail('Dùng: node tools/boss-parts/index.cjs export | check | apply <BossName|file.js>... [--root thư_mục_repo]');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
