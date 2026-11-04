#!/usr/bin/env node
'use strict';

// Non-runtime editing snapshots. All replacements are applied at their original AST ranges.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const acorn=require('../boss-parts/node_modules/acorn');
const argv=process.argv.slice(2),at=argv.indexOf('--root');
const root=at<0?path.resolve(__dirname,'../..'):path.resolve(argv[at+1]);
const args=argv.filter((v,i)=>i!==at&&i!==at+1||at<0);
const sourcePath='games/Dino/index.html',outPath='games/Dino/player-parts';
const abs=p=>path.join(root,p),read=p=>fs.readFileSync(abs(p),'utf8');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const parse=s=>acorn.parse(s,{ecmaVersion:'latest'});
const fail=s=>{throw Error(s);};
const MAX=60*1024;
function walk(n,visit){if(!n||typeof n!=='object')return;if(n.type)visit(n);for(const [k,v]of Object.entries(n)){if(k==='loc')continue;if(Array.isArray(v))v.forEach(c=>walk(c,visit));else if(v&&typeof v==='object')walk(v,visit);}}
function member(n){return n?.type==='Identifier'?n.name:n?.type==='MemberExpression'&&!n.computed?member(n.object)+'.'+n.property.name:'';}
function names(n){if(n.type!=='VariableDeclaration')return n.id?[n.id.name]:[];const out=[];for(const d of n.declarations)walk(d.id,c=>{if(c.type==='Identifier')out.push(c.name);});return out;}
function property(n,key){return n?.type==='ObjectExpression'?n.properties.find(p=>(p.key?.name||p.key?.value)===key)?.value:null;}
const title={forms:'Form người chơi',ammo:'Đạn / vũ khí',runes:'Rune',core:'Player / tích hợp',powers:'Power / phụ kiện'};
function build(html){
    const scripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)];
    parse(scripts.map(s=>s[1]).join('\n;\n'));
    const roots=[],defs=new Map(),records=[],ids=new Map(),contracts=new Set(),runes=new Set(),slots=new Set(),runeInfo={};
    const starts=[0];for(let i=0;i<html.length;i++)if(html[i]==='\n')starts.push(i+1);
    const lineOf=p=>{let a=0,b=starts.length;while(a+1<b){const m=(a+b)>>1;if(starts[m]<=p)a=m;else b=m;}return a+1;};
    for(let script=0;script<scripts.length;script++){
        const s=scripts[script],offset=s.index+s[0].indexOf('>')+1;
        for(const node of parse(s[1]).body){const r={node,script,offset,names:names(node)};roots.push(r);for(const name of r.names)defs.set(name,r);}
    }
    const scriptOf=n=>defs.get(n)?.script;
    for(const n of ['Player','VK','RUNES','apexCreate','DSW_MOVES','YMT_MOVES','IRON_PLAYER_MOVES'])if(!defs.has(n))fail('Thiếu mốc nguồn '+n);
    const add=(r,node,group,scope='',kind='plain',hint='')=>{
        const ns=names(node),expr=node.expression;
        let label=hint||ns[0]||member(expr?.left)||member(expr?.callee)||node.key?.name||node.key?.value||node.type;
        label=String(label).replace(/[^\w.-]/g,'_');const key=`s${r.script}.${scope?scope+'.':''}${label}`,count=(ids.get(key)||0)+1;ids.set(key,count);
        const code=html.slice(r.offset+node.start,r.offset+node.end),id=key+'.'+count;
        if(!code.trim())return;
        const item={id,start:r.offset+node.start,end:r.offset+node.end,line:lineOf(r.offset+node.start),script:r.script,scope,kind,group,names:ns,code,hash:hash(code)};
        records.push(item);for(const name of ns)contracts.add((scope||'global')+':'+name);
        if(kind==='method')contracts.add(scope+':'+label);
        if(member(node.expression?.left).startsWith('Player.prototype.'))contracts.add(member(node.expression.left));
    };
    const emit=(r,node,group,scope='',kind='plain',hint='')=>{
        const code=html.slice(r.offset+node.start,r.offset+node.end);
        if(node.type==='ExpressionStatement'&&member(node.expression?.callee)==='Object.assign'&&member(node.expression.arguments[0])==='Player.prototype'){
            const obj=node.expression.arguments[1];if(obj?.type==='ObjectExpression'){
                for(const p of obj.properties)emit(r,p,group,'Player.prototype','property',p.key?.name||p.key?.value);return;
            }
        }
        if(code.length>MAX){
            if(node.type==='FunctionDeclaration'||node.type==='MethodDefinition'||node.type==='Property'&&node.value?.body?.type==='BlockStatement'){
                const fn=node.type==='FunctionDeclaration'?node:node.value;
                const key=node.id?.name||node.key?.name||node.key?.value||hint||'function';
                for(const child of fn.body.body)emit(r,child,group,[scope,key].filter(Boolean).join('.'),'body');return;
            }
            if(node.type==='IfStatement'){
                emit(r,node.test,group,scope,'expression','condition');
                for(const branch of [node.consequent,node.alternate])if(branch){if(branch.type==='BlockStatement')for(const c of branch.body)emit(r,c,group,scope,'body');else emit(r,branch,group,scope,'body');}return;
            }
            if(node.type==='BlockStatement'){for(const c of node.body)emit(r,c,group,scope,'body');return;}
            if(node.type==='ExpressionStatement'&&['FunctionExpression','ArrowFunctionExpression'].includes(node.expression?.callee?.type)&&node.expression.callee.body?.type==='BlockStatement'){
                for(const c of node.expression.callee.body.body)emit(r,c,group,scope||'IIFE','body');return;
            }
            if(node.type==='ExpressionStatement'&&node.expression?.type==='CallExpression'){
                const callback=node.expression.arguments.find(a=>['FunctionExpression','ArrowFunctionExpression'].includes(a.type)&&a.body?.type==='BlockStatement');
                if(callback){for(const c of callback.body.body)emit(r,c,group,scope||'callback','body');return;}
            }
        }
        add(r,node,group,scope,kind,hint);
    };
    const ammoScript=scriptOf('VK'),apexScript=scriptOf('apexCreate'),danteScript=scriptOf('DSW_MOVES');
    const ammoTags=[...html.matchAll(/\/\* =+ @@VK-([A-Z]+) \(loai dan (\d+)\b/g)].map(m=>({start:m.index,name:m[1],slot:Number(m[2])}));
    if(ammoTags.length<16)fail('Không đủ mốc @@VK để tách vũ khí.');
    const getAmmo=r=>{const pos=r.offset+r.node.start;return [...ammoTags].reverse().find(t=>t.start<pos)?.name||'Registry';};
    const danteBands=[['DSW_MOVES','DanteDSD'],['BLR_DAMAGE_SCALE','DanteBalrog'],['CAV_MOVES','DanteCavaliere'],['KCB_MOVES','DanteKingCerberus']].map(([name,file])=>({start:defs.get(name)?.node.start,file}));
    if(danteBands.some(b=>b.start===undefined))fail('Thiếu vùng vũ khí Dante.');
    const scriptGroups=new Map([
        [scriptOf('SG_DAN'),'ammo/DualGuns'],[scriptOf('EI_MOVES'),'forms/DanteEbonyIvory'],[scriptOf('FAUST_MOVES'),'forms/DanteFaust'],
        [scriptOf('DANTE_STYLES'),'forms/DanteStyles'],[scriptOf('DANTE_SIN_MAX'),'forms/DanteSDT'],[scriptOf('VG_FORM_IDX'),'forms/VergilForm'],
        [scriptOf('IRON_FORM'),'forms/IronhaulForm'],[scriptOf('newPlayerHexVisual'),'core/ShieldVisuals'],[scriptOf('trialPose'),'forms/DinoRender'],
        [scriptOf('channelIsActive'),'core/Channels'],[scriptOf('fallRecoveryUpdateBase'),'core/FallRecovery']
    ]);
    const playerRender=new Set(['drawDinoBody','drawForm','draw','_drawHexShield','drawUltAura','drawUltBeam','drawNovaRing','_slashFx']);
    const playerDefense=new Set(['takeDamage','xuLyChet','isShielding','endUlt']);
    const nativeCore=new Set(['startGame','doDash','handleMoveTap','launchFromPit','followFallRecovery','coBuc','checkCollisions','checkCollisionsPvP','sanhChoUlt','parry','parryDamage','parryGainUlt','Player','drawCustomMenu','drawUI','resetPreview']);
    const basic=/^(DANG_|DEATH_SKEL|deathSkel|dang[A-Z]|xuong|kinh|drawRex|drawDino|formSamples|formAmmo)/;
    const rune=/^(RUNE|RUNES|rune|drawRune|pvpRune|pvpCatRune|pvpTraRune|hasRune$|saveRunes$|setRuneSlot$|dongBoPowerRune$|goRuneDoc|quetRune|comboTenRune|PET_RUNE|_rune|RNAME$|RDESC$)/;
    const power=/^(POWERS|PHU_KIEN|power[A-Z]|mauPhu$|phuKien$|musou|void|wkg|sgt|dt[A-Z]|st[A-Z]|ST_|DT_|MUSOU|VOID)/;
    const runeEffects=/^(rgc|shin|SHIN_|lifesteal|bird|BIRD_|afterimg|afterimages|spawnAfterimage|updateAfterimages|drawAfterimages|crit|CRIT_|VC_|rollCrit|vcBat|charge|overcharge)/;
    const xFirst=defs.get('xChoi')?.node.start,xLast=defs.get('xHudVe')?.node.end;
    for(const r of roots){
        const n=r.node,ns=r.names,first=ns[0]||'',e=n.expression,code=html.slice(r.offset+n.start,r.offset+n.end);
        if(first==='Player'){
            for(const method of n.body.body){const name=method.key.name||method.key.value;
                const group=playerRender.has(name)?'core/PlayerRender':playerDefense.has(name)?'core/PlayerDefense':['update','_updateGoc','constructor','getFormScale'].includes(name)?'core/PlayerMovement':'core/PlayerCombat';
                emit(r,method,group,'Player','method',name);
            }continue;
        }
        if(r.script===ammoScript){
            const tag=getAmmo(r);emit(r,n,'ammo/'+tag);
            walk(n,q=>{if(q.type==='CallExpression'&&member(q.callee)==='vkDangKy'){const a=q.arguments[0];const value=a?.type==='Literal'?a.value:defs.get(a?.name)?.node.declarations?.find(d=>d.id.name===a.name)?.init?.value;if(Number.isInteger(value))slots.add(value);}});continue;
        }
        if(first==='RUNES'&&n.declarations?.[0].init?.type==='ArrayExpression'){
            for(const item of n.declarations[0].init.elements){const id=property(item,'id')?.value;if(!id)fail('Rune thiếu id.');runes.add(id);runeInfo[id]=property(item,'name')?.value||id;emit(r,item,'runes/Rune_'+String(id).replace(/[^\w]/g,'_'),'RUNES','expression',id);}continue;
        }
        if(member(e?.callee)==='RUNES.push'){
            const id=property(e.arguments[0],'id')?.value;if(id){runes.add(id);runeInfo[id]=property(e.arguments[0],'name')?.value||id;emit(r,n,'runes/Rune_'+String(id).replace(/[^\w]/g,'_'));continue;}
        }
        if(r.script===apexScript){
            if(first==='apexCreate'){
                contracts.add('global:apexCreate');
                for(const c of n.body.body){const key=names(c)[0]||'',group=/obelith/i.test(key)?'ApexObelith':/^(ult|ULT|liveUltimate|drawUlt|cinematic|tickMagma|finishMagma|magma|drawMagma)/.test(key)?'ApexUltimates':/^(draw|computeSkeletal|tnNode|getMouth)/.test(key)?'ApexRender':/^(execute|startMelee|releaseMelee|triggerPrimary|startRanged|releaseRanged|hitTarget|damageTargets|tickTail|startTail|jumpAttack|rise$)/.test(key)?'ApexCombat':/^(update|triggerJump|triggerDash|startLedge|applyInput|input|tick$|sync|contact|previous|wallBudget)/.test(key)?'ApexMovement':'ApexCore';
                    emit(r,c,'forms/'+group,'apexCreate','body');
                }
            }else emit(r,n,'forms/ApexIntegration');continue;
        }
        if(r.script===danteScript){
            let group='DanteForm';for(const band of danteBands)if(n.start>=band.start)group=band.file;
            if(['DantePlayerRig','drawDantePlayerBody','drawDantePlayerDtOverlay'].includes(first))group='DanteRender';
            if(/^(player|PLAYER_|DANTE_ATTACK_RATE)/.test(first))group='PlayerComboShared';
            emit(r,n,group==='PlayerComboShared'?'core/'+group:'forms/'+group);continue;
        }
        if(scriptGroups.has(r.script)){emit(r,n,scriptGroups.get(r.script));continue;}
        if(r.script===scriptOf('Player')){emit(r,n,/^(crit|CRIT_|VC_|vcBat|rollCrit)/.test(first)?'runes/CriticalEffects':'core/DamageShared');continue;}
        if(first==='Projectile'||first==='Effect'||first==='FloatingText'||first==='WindBlade'){emit(r,n,'core/ProjectilesAndEffects');continue;}
        if(r.script===scriptOf('currentForm')){
            if(basic.test(first)){emit(r,n,'forms/DinoForms');continue;}
            if(n.start>=xFirst&&n.end<=xLast){emit(r,n,'forms/XForm');continue;}
            if(rune.test(first)){emit(r,n,/^(draw|runePicker|runeThanh|runeView|runeCell|runeLup|RUNE_VIEW|_rune)/.test(first)?'runes/RuneMenu':'runes/RuneSystem');continue;}
            if(runeEffects.test(first)){emit(r,n,'runes/RuneEffects');continue;}
            if(power.test(first)||member(e?.callee)==='POWERS.push'){emit(r,n,'powers/PowersAndAccessories');continue;}
            if(nativeCore.has(first)){emit(r,n,'core/EngineHooks');continue;}
            if(first==='loop'){emit(r,n,'core/GameLoop');continue;}
            if(n.type==='FunctionDeclaration'&&/\bhasRune\s*\(/.test(code)&&!/boss/i.test(first)){emit(r,n,'runes/RuneEffects');continue;}
            if(/^(checkAABB|allTargets|combatStance|currentForm|currentAmmoType|currentPower|currentShieldType|ultCharge|CHARGE_|OC_|PARRY_)/.test(first)){emit(r,n,'core/PlayerState');continue;}
            if(e?.type==='CallExpression'&&/addEventListener$/.test(member(e.callee))&&['keydown','keyup'].includes(e.arguments[0]?.value)){emit(r,n,'core/KeyboardInput');continue;}
            if(!first&&/\b(runeSlots|RUNES)\b/.test(code)&&code.length<3000){emit(r,n,'runes/RuneSystem');continue;}
        }
        if(nativeCore.has(first)){emit(r,n,'core/Customization');continue;}
    }
    if(defs.has('SG_DAN'))slots.add(20);
    for(const r of roots)walk(r.node,n=>{
        if(n.type==='CallExpression'&&member(n.callee)==='Object.assign'&&member(n.arguments[0])==='Player.prototype'&&n.arguments[1]?.type==='ObjectExpression')for(const p of n.arguments[1].properties)if(p.key)contracts.add('Player.prototype:'+String(p.key.name||p.key.value));
    });
    records.sort((a,b)=>a.start-b.start);
    for(let i=1;i<records.length;i++)if(records[i].start<records[i-1].end)fail('Vùng tách bị chồng: '+records[i].id);
    const files=[],contents=new Map(),grouped=new Map();
    for(const r of records){if(!grouped.has(r.group))grouped.set(r.group,[]);grouped.get(r.group).push(r);}
    for(const [group,rs]of grouped){
        const chunks=[];let chunk=[],bytes=0;
        for(const r of rs){const size=Buffer.byteLength(r.code)+180;if(chunk.length&&bytes+size>MAX){chunks.push(chunk);chunk=[];bytes=0;}chunk.push(r);bytes+=size;}if(chunk.length)chunks.push(chunk);
        for(let j=0;j<chunks.length;j++){
            const chunk=chunks[j],base=group.split('/').pop(),suffix=chunks.length>1?String(j+1).padStart(2,'0'):'',name=base+suffix,file=group+suffix+'.js';
            const declared=new Set(chunk.flatMap(r=>r.names)),refs=new Set();
            for(const r of chunk)walk(parseFragment(r.code,r.kind),n=>{if(n.type==='Identifier'&&defs.has(n.name)&&!declared.has(n.name))refs.add(n.name);});
            const header=[`// PLAYER_FILE: ${name}`,`// PLAYER_SNAPSHOT: ${hash(html)}`,`// Nguồn: ${sourcePath}`,'// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.',
                '// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.',
                '// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.',
                '// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.',
                `// Tham chiếu ngoài: ${[...refs].sort().join(', ')}`,''].join('\n');
            const body=chunk.map((r,i)=>{
                const [before,after]=scaffold(r.kind,i);
                return `// index.html:${r.line} · Phạm vi: ${r.scope||'global'}\n${before}// PLAYER_PART_BEGIN ${r.id} EDITABLE\n${r.code}\n// PLAYER_PART_END ${r.id}\n${after}`;
            }).join('\n');
            const content=header+body;parse(content);
            files.push({name,file,group,parts:chunk.map(r=>r.id),hash:hash(content),structureHash:hash(structure(content))});contents.set(file,content);
        }
    }
    const runeUsage={};
    for(const r of roots)walk(r.node,n=>{if(n.type==='CallExpression'&&member(n.callee)==='hasRune'&&typeof n.arguments[0]?.value==='string'){
        const id=n.arguments[0].value,pos=r.offset+n.start,part=records.find(p=>p.start<=pos&&p.end>=r.offset+n.end);
        const file=part?files.find(f=>f.parts.includes(part.id))?.file:null;
        (runeUsage[id]||(runeUsage[id]=new Set())).add(file||'../index.html#L'+lineOf(pos));
    }});
    return {manifest:{version:1,source:sourcePath,sourceHash:hash(html),scripts:scripts.length,runeIds:[...runes].sort(),ammoSlots:[...slots].sort((a,b)=>a-b),contracts:[...contracts].sort(),files,parts:records.map(({code,...r})=>r)},contents,parts:records,runeInfo,runeUsage};
}
function scaffold(kind,i){
    if(kind==='method')return [`class __Part${i} {\n`,'}\n'];
    if(kind==='property')return [`const __Part${i} = {\n`,'};\n'];
    if(kind==='expression')return [`const __Part${i} = (\n`,');\n'];
    if(kind==='body')return [`function __Part${i}(){ while(false){\n`,'}}\n'];
    return ['',''];
}
function parseFragment(code,kind){const [a,b]=scaffold(kind,0);return parse(a+code+'\n'+b);}
const structure=t=>t.replace(/(^\/\/ PLAYER_PART_BEGIN [\w.-]+ EDITABLE\r?\n)[\s\S]*?(\r?\n\/\/ PLAYER_PART_END [\w.-]+\r?$)/gm,'$1$2');
function dirtyFiles(m,except=new Set()){return m.files.filter(f=>!except.has(f.name)&&(!fs.existsSync(abs(outPath+'/'+f.file))||hash(read(outPath+'/'+f.file))!==f.hash)).map(f=>f.file);}
function write(model){
    fs.mkdirSync(abs(outPath),{recursive:true});
    const old=fs.existsSync(abs(outPath+'/manifest.json'))?JSON.parse(read(outPath+'/manifest.json')):null;
    for(const [file,text]of model.contents){fs.mkdirSync(path.dirname(abs(outPath+'/'+file)),{recursive:true});fs.writeFileSync(abs(outPath+'/'+file),text);}
    if(old)for(const f of old.files)if(!model.contents.has(f.file))fs.unlinkSync(abs(outPath+'/'+f.file));
    fs.writeFileSync(abs(outPath+'/manifest.json'),JSON.stringify(model.manifest,null,2)+'\n');
    let catalog='# Các file người chơi, Form, Rune và đạn\n\nTải file JS bằng **Download raw file**. Xem [hướng dẫn gửi AI và ghép lại](README.md). Các file là bản tách để sửa; game vẫn chạy hoàn toàn từ `../index.html`.\n\n';
    for(const [key,label]of Object.entries(title)){
        catalog+='## '+label+'\n\n| File | Dòng | Dung lượng |\n| --- | ---: | ---: |\n';
        for(const f of model.manifest.files.filter(f=>f.file.startsWith(key+'/'))){const t=model.contents.get(f.file);catalog+=`| [${f.name}](${f.file}) | ${t.split('\n').length-1} | ${(Buffer.byteLength(t)/1024).toFixed(1)} KB |\n`;}
        catalog+='\n';
    }
    catalog+='CUSTOM dùng chung lõi với Phi Tiêu (16) và Kiếm Vũ (17); DualGuns là đạn 20. Rune Katana/Swordmaster và Wukong/Trident còn có logic trong DINOSWORD/SPEAR. Các file có số 01/02… là những phần khác nhau của cùng hệ, cần đọc cùng khi sửa xuyên phần.\n';
    fs.writeFileSync(abs(outPath+'/CATALOG.md'),catalog);
    let guide='# Rune: khai báo và logic áp dụng\n\nMỗi `Rune_*.js` chứa khai báo của Rune. Muốn đổi tác dụng, gửi thêm file ở cột **Logic áp dụng**. Các liên kết `index.html:L…` là điểm dùng trong engine/Boss chưa nằm trong một file người chơi riêng. Rune vũ khí còn dùng các file ammo tương ứng; không phải chỉ sửa mô tả là đổi được tác dụng.\n\n| Rune | Khai báo | Logic áp dụng qua hasRune |\n| --- | --- | --- |\n';
    for(const id of model.manifest.runeIds){const f=model.manifest.files.find(f=>f.group==='runes/Rune_'+id.replace(/[^\w]/g,'_'));const uses=[...(model.runeUsage[id]||[])].sort();guide+=`| ${model.runeInfo[id]} (${id}) | [${f.name}](${f.file}) | ${uses.map(file=>`[${file.startsWith('../')?'index.html:L'+file.split('#L')[1]:path.basename(file)}](${file})`).join(' · ')||'Callback nằm trong khai báo; xem thêm RuneSystem.'} |\n`;}
    fs.writeFileSync(abs(outPath+'/RUNE_GUIDE.md'),guide);
}
function validateNext(before,next){
    if(before.scripts!==next.scripts)fail('Không được thêm/xóa thẻ script trong file tách.');
    for(const key of ['contracts','runeIds','ammoSlots'])if(before[key].some(n=>!next[key].includes(n)))fail('Mất/đổi API, id Rune hoặc slot đạn: '+key);
}
function apply(inputs){
    if(!inputs.length)fail('Cần tên file hoặc đường dẫn file AI trả về.');
    const manifest=JSON.parse(read(outPath+'/manifest.json')),html=read(sourcePath);
    if(hash(html)!==manifest.sourceHash)fail('index.html đã thay đổi sau lần tách; cần đối chiếu trước khi ghép.');
    const hasBoss=fs.existsSync(abs('games/Dino/bosses/manifest.json'));
    const boss=hasBoss?require('../boss-parts/index.cjs'):null,bm=hasBoss?JSON.parse(read('games/Dino/bosses/manifest.json')):null;
    const changes=new Map(),selected=new Set(),selectedBoss=new Set();
    for(const input of inputs){
        const own=manifest.files.find(f=>f.name===input||f.file===input),bf=bm?.files.find(f=>f.name===input||f.file===input);
        const filename=own?abs(outPath+'/'+own.file):bf?abs('games/Dino/bosses/'+bf.file):path.resolve(input);
        const text=fs.readFileSync(filename,'utf8').replace(/\r\n/g,'\n');
        const playerName=text.match(/^\/\/ PLAYER_FILE: (\w+)$/m)?.[1],bossName=text.match(/^\/\/ BOSS_FILE: (\w+)$/m)?.[1];
        const isBoss=!playerName&&!!bossName,m=isBoss?bm:manifest,name=playerName||bossName,file=m?.files.find(f=>f.name===name);
        if(!file)fail('Thiếu PLAYER_FILE / BOSS_FILE hợp lệ: '+input);
        const snapshot=text.match(isBoss?/^\/\/ BOSS_SNAPSHOT: ([a-f0-9]+)$/m:/^\/\/ PLAYER_SNAPSHOT: ([a-f0-9]+)$/m)?.[1];
        if(snapshot!==manifest.sourceHash||m.sourceHash!==manifest.sourceHash)fail(name+': bản game cũ; cần đối chiếu trước khi ghép.');
        if(hash((isBoss?boss.structure:structure)(text))!==file.structureHash)fail(name+': có sửa ngoài marker hoặc khung phạm vi.');
        const parts=isBoss?boss.sections(text):[...text.matchAll(/^\/\/ PLAYER_PART_BEGIN ([\w.-]+) EDITABLE\r?\n([\s\S]*?)\r?\n\/\/ PLAYER_PART_END \1\r?$/gm)].map(p=>({id:p[1],code:p[2],mode:'EDITABLE'}));
        if(parts.map(p=>p.id).join('|')!==file.parts.join('|'))fail(name+': thiếu/đổi thứ tự marker.');
        (isBoss?selectedBoss:selected).add(name);parse(text);
        for(const part of parts){
            const original=m.parts.find(p=>p.id===part.id);if(hash(part.code)===original.hash)continue;
            if(isBoss&&(!(original.owner===name||name==='BossShared'&&original.owner==='shared')||part.mode!=='EDITABLE'))fail(name+': vùng READ_ONLY; sửa file dùng chung tương ứng.');
            if(isBoss)parse(part.code);else parseFragment(part.code,original.kind);
            const key=(isBoss?'B:':'P:')+part.id;
            if(changes.has(key)&&changes.get(key).code!==part.code)fail('Hai bản sửa khác nhau ở '+part.id);
            changes.set(key,{...original,code:part.code});
        }
    }
    const dirty=dirtyFiles(manifest,selected);if(dirty.length)fail('Còn file người chơi đang sửa: '+dirty.join(', '));
    if(boss){const dirty=boss.dirtyFiles(bm,selectedBoss);if(dirty.length)fail('Còn file Boss đang sửa: '+dirty.join(', '));}
    if(!changes.size){console.log('Không có thay đổi trong EDITABLE.');return;}
    const edits=[];
    for(const p of [...changes.values()].sort((a,b)=>a.start-b.start)){
        const last=edits.at(-1);if(last&&p.start<last.end){if(p.start===last.start&&p.end===last.end&&p.code===last.code)continue;fail('Hai bản sửa chồng phạm vi; cần đối chiếu '+p.id+' / '+last.id);}edits.push(p);
    }
    let updated=html;
    for(const p of edits.reverse()){if(hash(html.slice(p.start,p.end))!==p.hash)fail('Vị trí nguồn lệch '+p.id);updated=updated.slice(0,p.start)+p.code+updated.slice(p.end);}
    const next=build(updated);validateNext(manifest,next.manifest);
    let bossNext=null;
    if(boss){const old=boss.build(html);bossNext=boss.build(updated);if(old.manifest.files.map(f=>f.name).join('|')!==bossNext.manifest.files.map(f=>f.name).join('|'))fail('Bản sửa làm mất class Boss.');}
    fs.writeFileSync(abs(sourcePath),updated);write(next);if(boss)boss.write(bossNext);
    console.log(`Đã ghép ${edits.length} vùng vào HTML, cập nhật file người chơi và các bản tách Boss hiện có.`);
}
function main(){
    const command=args[0]||'check';
    if(command==='apply')return apply(args.slice(1));
    if(!['export','check'].includes(command))fail('Dùng: node tools/player-parts/index.cjs export | check | apply <TênFile|file.js>... [--root repo]');
    const model=build(read(sourcePath)),manifestPath=outPath+'/manifest.json';
    if(command==='export'){
        if(fs.existsSync(abs(manifestPath))){const dirty=dirtyFiles(JSON.parse(read(manifestPath)));if(dirty.length)fail('Không ghi đè file đang sửa: '+dirty.join(', '));}
        write(model);console.log(`Đã tách ${model.manifest.files.length} file người chơi, ${model.manifest.runeIds.length} Rune. HTML giữ nguyên từng byte.`);
    }else{
        if(JSON.stringify(JSON.parse(read(manifestPath)))!==JSON.stringify(model.manifest))fail('Manifest người chơi chưa đồng bộ với HTML.');
        for(const [file,text]of model.contents)if(read(outPath+'/'+file)!==text)fail('File chưa đồng bộ / đang sửa: '+file);
        console.log(`PASS ${model.manifest.files.length} file người chơi: cú pháp, phạm vi và nguồn khớp hoàn toàn.`);
    }
}
module.exports={build,write,dirtyFiles,validateNext,root,outPath};
if(require.main===module)try{main();}catch(e){console.error(e.message);process.exitCode=1;}
