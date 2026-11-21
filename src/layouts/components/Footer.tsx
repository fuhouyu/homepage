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
import type { DailyImage } from '@/hooks/useDailyImage';
import siteConfig from '@/assets/site-config.json';

export const LayoutFooter = ({ image }: { image: DailyImage | null }) => {
  const year = new Date().getFullYear();
  const username = import.meta.env.VITE_GITHUB_USERNAME || import.meta.env.VITE_SITE_NAME || '';
  const email = import.meta.env.VITE_EMAIL;
  const city = import.meta.env.VITE_CITY;
  const icp = import.meta.env.VITE_ICP;
  const pasteUrl = import.meta.env.VITE_PASTE_URL || siteConfig.pasteUrl;

  const links = [
    icp ? { label: icp, href: 'https://beian.miit.gov.cn/', external: true } : null,
    { label: 'Paste', href: pasteUrl, external: true },
    username ? { label: 'GitHub', href: `https://github.com/${username}`, external: true } : null,
    email ? { label: 'Email', href: `mailto:${email}`, external: false } : null,
  ].filter((link): link is { label: string; href: string; external: boolean } => link !== null);

  const parts = [
    /* 头版照片要署名，图说是它唯一能被追溯的地方：合进页脚这一行，版面上就多让出一整块高度 */
    image?.credit ? `每日一图 ${image.credit}` : '',
    image?.caption ?? '',
    `© ${year}`,
    username,
    city,
  ].filter(Boolean);

  return (
    <footer className="page hairline mt-[var(--app-space-block)] flex flex-col gap-2 pt-3 pb-3 text-meta text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <span className="text-shadowed">{parts.join(' · ')}</span>

      <nav aria-label="页脚链接" className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        {links.map((link) => (
          <a
            key={link.label}
            className="ink-link"
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
};
