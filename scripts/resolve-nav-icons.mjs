/*
 * Copyright 2026-present fuhouyu.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * 把导航磁贴的图标解析成源站自己的 favicon，写回 src/assets/site-config.json。
 *
 * 浏览器里做不到这件事：跨域读不到对方 HTML，只能赌 /favicon.ico，赌不中就落到首字母。
 * 本地跑一次就能按 <link rel="icon"> 拿到真实地址，运行时零探测、零失败。
 *
 *   node scripts/resolve-nav-icons.mjs         # 写回配置
 *   node scripts/resolve-nav-icons.mjs --check # 只报告，不改文件（CI 可用）
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CONFIG_PATH = path.resolve(import.meta.dirname, '../src/assets/site-config.json');
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const IMAGE_TYPES = /^image\//;

const fetchWithTimeout = (url, options = {}) =>
  fetch(url, { ...options, signal: AbortSignal.timeout(15000) });

/** 取 HTML 里声明的图标：rel 含 icon 的 link，apple-touch-icon 也认 */
const parseIconLinks = (html, base) => {
  const links = [];
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    const rel = /rel\s*=\s*["']?([^"'\s>]+)/i.exec(tag)?.[1] ?? '';
    if (!/icon/i.test(rel)) continue;
    const href = /href\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
    if (!href || href.startsWith('data:')) continue;
    const sizes = /sizes\s*=\s*["']?(\d+)x\d+/i.exec(tag)?.[1];
    let absolute;
    try {
      absolute = new URL(href, base).href;
    } catch {
      continue;
    }
    links.push({ url: absolute, sizes: sizes ? Number(sizes) : 0 });
  }
  /* 大图标优先：矢量 svg 排在最前，位图按 sizes 从大到小，180 的 touch icon 太糊 */
  return links.sort((a, b) => {
    const svg = (u) => (u.endsWith('.svg') ? 1 : 0);
    return svg(b.url) - svg(a.url) || Math.min(b.sizes, 192) - Math.min(a.sizes, 192);
  });
};

/* 前 16 字节能认出真图：CF 挑战页、SPA 兜底页都会以 200 + text/html 冒充 favicon.ico */
const MAGIC = [
  [0x89, 0x50, 0x4e, 0x47], // png
  [0xff, 0xd8, 0xff], // jpeg
  [0x47, 0x49, 0x46], // gif
  [0x00, 0x00, 0x01, 0x00], // ico
  [0x52, 0x49, 0x46, 0x46], // webp (RIFF....WEBP)
];

const isImageBytes = (buffer) => {
  const head = buffer.subarray(0, 4);
  const text = new TextDecoder().decode(buffer.subarray(0, 256));
  return (
    MAGIC.some((bytes) => bytes.every((byte, index) => head[index] === byte)) ||
    /<svg[\s>]/i.test(text)
  );
};

const isUsable = async (url) => {
  try {
    const response = await fetchWithTimeout(url, { headers: { 'User-Agent': UA } });
    if (!response.ok) return false;
    const buffer = new Uint8Array(await response.arrayBuffer());
    if (buffer.length < 256) return false;
    return IMAGE_TYPES.test(response.headers.get('content-type') ?? '') || isImageBytes(buffer);
  } catch {
    return false;
  }
};

const resolveIcon = async (item) => {
  /* 配置里手写的 icon 优先，脚本只负责验证它今天还取不取得到 */
  if (item.icon) {
    return (await isUsable(item.icon))
      ? { icon: item.icon, note: '配置内手写' }
      : { icon: '', note: `手写地址已失效：${item.icon}` };
  }
  let origin;
  try {
    origin = new URL(item.url);
  } catch {
    return { icon: '', note: '非 http(s)，走首字母' };
  }
  if (origin.protocol !== 'https:' && origin.protocol !== 'http:') {
    return { icon: '', note: `${origin.protocol} 无图标可取` };
  }

  const candidates = [];
  try {
    const html = await (await fetchWithTimeout(item.url, { headers: { 'User-Agent': UA } })).text();
    candidates.push(...parseIconLinks(html, item.url).map((link) => link.url));
  } catch {
    /* 站点可能只允许浏览器访问（dash.cloudflare.com 会 302 到登录页），继续赌常规路径 */
  }
  candidates.push(`${origin.origin}/favicon.ico`, `${origin.origin}/favicon.png`);

  for (const url of [...new Set(candidates)]) {
    if (await isUsable(url)) return { icon: url, note: new URL(url).pathname };
  }
  return { icon: '', note: '源站取不到，运行时回首字母' };
};

const checkOnly = process.argv.includes('--check');
const config = JSON.parse(await readFile(CONFIG_PATH, 'utf8'));
const rows = [];

for (const group of config.navigation) {
  for (const item of group.items) {
    const { icon, note } = await resolveIcon(item);
    if (!checkOnly) {
      if (icon) item.icon = icon;
      else delete item.icon;
    }
    rows.push(`${group.title.padEnd(4)} ${item.name.padEnd(12)} ${icon || '—'}  (${note})`);
  }
}

console.log(rows.join('\n'));

if (checkOnly) {
  console.log('\n--check：未写入配置文件');
} else {
  await writeFile(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
  console.log(`\n已写回 ${path.relative(process.cwd(), CONFIG_PATH)}`);
}
