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
import type { CSSProperties } from 'react';
import siteConfig from '@/assets/site-config.json';

interface NavItemConfig {
  name: string;
  url: string;
  envKey?: string;
  desc: string;
  tone?: string;
  /** 由 scripts/resolve-nav-icons.mjs 解析并写回的源站图标地址 */
  icon?: string;
}

interface NavGroupConfig {
  title: string;
  items: NavItemConfig[];
}

const groups: NavGroupConfig[] = siteConfig.navigation;

const username = import.meta.env.VITE_GITHUB_USERNAME;
const email = import.meta.env.VITE_EMAIL;
const envUrls: Record<string, string | undefined> = {
  paste: import.meta.env.VITE_PASTE_URL || undefined,
  github: username ? `https://github.com/${username}` : undefined,
  email: email ? `mailto:${email}` : undefined,
};

/** 首字母 / 首字作标记，favicon 取不到时它就是图标本身，不额外做空状态 */
const markOf = (name: string) => name.trim().charAt(0).toUpperCase();

/** 配置里没有 icon 的新链接（含改了域名的）现推一个 origin 兜底，mailto 直接走首字母 */
const originFallback = (href: string) => {
  try {
    const { protocol, origin } = new URL(href);
    if (!protocol.startsWith('http')) return '';
    return `${origin}/favicon.ico`;
  } catch {
    return '';
  }
};

export const Navigation = () => (
  <section
    className="grid gap-y-[var(--app-space-col)] lg:grid-cols-2 lg:gap-x-12"
    aria-label="快捷入口"
  >
    {groups.map((group) => (
      <div key={group.title} className="flex flex-col gap-3">
        <h2 className="group-title">{group.title}</h2>

        {/* 固定砖宽 + 换行：列数随分组宽度变化，5 个站点就是一行，不会再掉出孤零零的第二排 */}
        <ul className="flex flex-wrap gap-1.5">
          {group.items.map((item) => {
            const href = (item.envKey && envUrls[item.envKey]) || item.url;
            const isMail = href.startsWith('mailto:');
            const icon = item.icon || originFallback(href);

            return (
              <li key={item.name} className="w-[5.75rem]">
                <a
                  className="link-tile"
                  href={href}
                  title={item.desc}
                  style={{ '--brand': item.tone } as CSSProperties}
                  {...(isMail ? {} : { target: '_blank', rel: 'noreferrer' })}
                >
                  <span aria-hidden className="link-badge">
                    <span className="link-mark">{markOf(item.name)}</span>
                    {icon ? (
                      <img
                        src={icon}
                        alt=""
                        width={24}
                        height={24}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                        className="link-icon"
                      />
                    ) : null}
                  </span>
                  <span className="link-name">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    ))}
  </section>
);
