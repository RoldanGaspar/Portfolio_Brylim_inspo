#!/usr/bin/env node
// Static health check for the portfolio. No dependencies — Node 18+.
// Usage (from repo root):  node .agents/skills/verify-locally/scripts/check.mjs
// Exit code 1 if any ERROR is found; WARNs are informational.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const rel = p => path.relative(ROOT, p).replaceAll('\\', '/');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = p => fs.existsSync(path.join(ROOT, p));

const errors = [];
const warns = [];
const err = m => errors.push(m);
const warn = m => warns.push(m);

// ---------- 1. index.html local references ----------
const html = read('index.html');
const localRefs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map(m => m[1])
    .filter(u => !/^(https?:|mailto:|#|data:)/.test(u));
for (const ref of localRefs) {
    if (!exists(ref)) err(`index.html references missing file: ${ref}`);
}
const scriptOrder = [...html.matchAll(/<script\s+src="([^"]+)"/g)]
    .map(m => m[1])
    .filter(u => !/^https?:/.test(u));

// ---------- 2. JS syntax + no ES module syntax ----------
const topLevelFns = new Map();
for (const file of scriptOrder) {
    if (!exists(file)) continue;
    const code = read(file);
    try {
        new vm.Script(code, { filename: file });
    } catch (e) {
        err(`Syntax error in ${file}: ${e.message}`);
    }
    if (/^\s*(import\s.+from\s|import\s*['"]|export\s)/m.test(code)) {
        err(`${file} uses import/export — this project uses classic scripts (see .agents/rules/architecture.md)`);
    }
    for (const m of code.matchAll(/^(?:async\s+)?function\s+(\w+)\s*\(/gm)) {
        const name = m[1];
        if (topLevelFns.has(name)) {
            err(`Global name collision: function ${name}() in ${file} and ${topLevelFns.get(name)}`);
        } else {
            topLevelFns.set(name, file);
        }
    }
}

// ---------- 3. CSS @imports ----------
const scannedCss = new Set();
const scanCssImports = (relPath) => {
    if (scannedCss.has(relPath)) return;
    scannedCss.add(relPath);
    if (!exists(relPath)) {
        err(`Missing CSS file: ${relPath}`);
        return;
    }
    const cssContent = read(relPath);
    const dir = path.dirname(relPath);
    for (const m of cssContent.matchAll(/@import\s+['"]([^'"]+)['"]/g)) {
        const target = path.join(dir, m[1]);
        if (!exists(target)) err(`${relPath} imports missing file: ${m[1]}`);
        else scanCssImports(target);
    }
};
scanCssImports('src/css/main.css');

// ---------- 4. Router render functions exist & routeMeta coverage ----------
const routerSrc = read('src/js/router.js');
const renderFns = new Set([...routerSrc.matchAll(/\b(render[A-Z]\w*)\b/g)].map(m => m[1]));
for (const fn of renderFns) {
    if (!topLevelFns.has(fn)) err(`router.js uses ${fn}() but no script in index.html defines it`);
}
const routesBlock = routerSrc.match(/const\s+routes\s*=\s*\{([\s\S]*?)\};/)?.[1] || '';
const routeKeys = [...new Set([...routesBlock.matchAll(/'(#\/[\w-]*)'\s*:/g)].map(m => m[1]))];

const metaBlock = routerSrc.match(/const\s+routeMeta\s*=\s*\{([\s\S]*?)\};/)?.[1] || '';
const metaKeys = new Set([...metaBlock.matchAll(/'(#\/[\w-]*)'\s*:/g)].map(m => m[1]));

for (const r of routeKeys) {
    if (r && !metaKeys.has(r)) warn(`Route "${r}" is missing routeMeta in router.js (inherits fallback Home metadata)`);
}
const navLinks = [...html.matchAll(/class="sidebar-nav"[\s\S]*?<\/nav>/g)].join('');
for (const m of navLinks.matchAll(/href="(#\/[\w-]+)"/g)) {
    if (!routeKeys.includes(m[1])) warn(`Sidebar link ${m[1]} has no route in router.js (falls back to Home)`);
}

// ---------- 5. Data validation ----------
let data;
try {
    const ctx = { window: {} };
    vm.createContext(ctx);
    vm.runInContext(read('src/js/data.js'), ctx, { filename: 'src/js/data.js' });
    data = ctx.window.portfolioData;
    if (!data) err('src/js/data.js did not define window.portfolioData');
} catch (e) {
    err(`Could not evaluate src/js/data.js: ${e.message}`);
}

const requireFields = (list, name, fields) => {
    (list || []).forEach((item, i) => {
        for (const f of fields) {
            if (item[f] === undefined || item[f] === null || item[f] === '') {
                err(`portfolioData.${name}[${i}] (${item.id || item.title || '?'}) missing "${f}"`);
            }
        }
    });
};
const uniqueIds = (list, name) => {
    const seen = new Set();
    (list || []).forEach(item => {
        if (seen.has(item.id)) err(`Duplicate id "${item.id}" in portfolioData.${name}`);
        seen.add(item.id);
    });
};

if (data) {
    requireFields(data.projects, 'projects',
        ['id', 'title', 'badge', 'subtitle', 'iconText', 'iconBg', 'tagline', 'desc', 'problem', 'solution', 'highlights', 'techStack', 'stats', 'downloadUrl', 'mockupBg']);
    (data.projects || []).forEach(p => {
        for (const k of ['rank', 'downloads', 'rating']) {
            if (!p.stats || !p.stats[k]) err(`project "${p.id}" stats missing "${k}"`);
        }
    });
    uniqueIds(data.projects, 'projects');

    requireFields(data.shop, 'shop', ['id', 'title', 'price', 'desc']);
    uniqueIds(data.shop, 'shop');

    requireFields(data.blog, 'blog', ['id', 'title', 'preview', 'date', 'readTime', 'image']);
    uniqueIds(data.blog, 'blog');

    requireFields(data.netacadCertsList, 'netacadCertsList',
        ['title', 'issuer', 'date', 'description', 'badgeUrl', 'credlyUrl', 'certificateImage', 'skills']);
    (data.netacadCertsList || []).forEach(c => {
        if (c.certificateImage && !exists(c.certificateImage)) {
            err(`Certificate image not found: ${c.certificateImage} (${c.title})`);
        }
        if (c.certificateImage) {
            const pdf = c.certificateImage.replace('assets/certificates/', 'assets/certificates/pdf/').replace(/\.png$/i, '.pdf');
            if (!exists(pdf)) warn(`No PDF for "${c.title}" (expected ${pdf})`);
        }
    });

    requireFields(data.recsList, 'recsList', ['author', 'role', 'text', 'initials']);

    if (data.experienceList && !scriptOrder.some(f => f.includes('views/') && read(f).includes('experienceList'))) {
        warn('portfolioData.experienceList is defined but not rendered by any view (see DATA_SCHEMA duplication map)');
    }

    // ---------- 6. Cross-file sync: project ids ----------
    const projectIds = new Set((data.projects || []).map(p => p.id));
    const homeSrc = read('src/js/views/home.js');
    const homeFeaturedIds = [...homeSrc.matchAll(/portfolioData\.projects\.find\(p\s*=>\s*p\.id\s*===\s*['"]([^'"]+)['"]\)/g)].map(m => m[1]);
    for (const hId of homeFeaturedIds) {
        if (!projectIds.has(hId)) err(`src/js/views/home.js explicitly references project "${hId}", but it is missing in data.js`);
    }

    for (const file of ['src/js/views/home.js', 'src/js/utils/command-palette.js']) {
        const src = read(file);
        const isDynamicProjects = /portfolioData\??\.projects/.test(src);
        const referenced = new Set([...src.matchAll(/#\/projects\/([\w-]+)/g)].map(m => m[1]));
        for (const id of referenced) {
            if (!projectIds.has(id)) err(`${file} links to #/projects/${id} but no such project in data.js`);
        }
        if (!isDynamicProjects) {
            for (const id of projectIds) {
                if (!referenced.has(id)) warn(`Project "${id}" is not referenced in ${file} (out of sync?)`);
            }
        }
    }
}

// ---------- 7. Placeholders & TODOs ----------
const scanFiles = ['index.html', ...scriptOrder.filter(exists)];
let hashLinks = 0, todos = [];
for (const f of scanFiles) {
    const src = read(f);
    hashLinks += (src.match(/href="#"/g) || []).length + (src.match(/(?:downloadUrl|verifyUrl):\s*"#"/g) || []).length;
    for (const m of src.matchAll(/TODO\(roldan\)[^"'`\n]*/g)) todos.push(`${f}: ${m[0]}`);
}
if (hashLinks) warn(`${hashLinks} placeholder links ("#") remain — see KNOWN_ISSUES.md`);
todos.forEach(t => warn(`Content TODO → ${t}`));

// ---------- Report ----------
const line = '─'.repeat(60);
console.log(line);
console.log(`Portfolio check · ${scriptOrder.length} scripts · ${topLevelFns.size} global functions`);
console.log(line);
errors.forEach(e => console.log(`✖ ERROR  ${e}`));
warns.forEach(w => console.log(`⚠ WARN   ${w}`));
if (!errors.length && !warns.length) console.log('✔ All checks passed');
console.log(line);
console.log(`${errors.length} error(s), ${warns.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
