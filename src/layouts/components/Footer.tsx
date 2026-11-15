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
import { FooterShell } from '@/layouts/components/style';
import siteConfig from '@/assets/site-config.json';

export const LayoutFooter = () => {
  const year = new Date().getFullYear();
  const username = import.meta.env.VITE_GITHUB_USERNAME || import.meta.env.VITE_SITE_NAME || '';
  const email = import.meta.env.VITE_EMAIL;
  const city = import.meta.env.VITE_CITY;
  const icp = import.meta.env.VITE_ICP;
  const pasteUrl = import.meta.env.VITE_PASTE_URL || siteConfig.pasteUrl;

  return (
    <FooterShell>
      <span>
        © {year} {username}
        {city ? ` · ${city}` : ''}
      </span>
      <div className="footer-links">
        {icp && (
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
            {icp}
          </a>
        )}
        <a href={pasteUrl} target="_blank" rel="noreferrer">
          Paste
        </a>
        {username && (
          <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
        {email && <a href={`mailto:${email}`}>Email</a>}
        <span>React · Ant Design</span>
      </div>
    </FooterShell>
  );
};
