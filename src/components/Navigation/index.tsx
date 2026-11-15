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
import React from 'react';
import * as Icons from '@ant-design/icons';
import { SectionLabel } from '@/styles/style';
import {
  NavCardStyled,
  NavGroup,
  NavGroupHead,
  NavIcon,
  NavItem,
  NavItems,
  NavText,
} from './style';
import siteConfig from '@/assets/site-config.json';

interface NavItemConfig {
  name: string;
  url: string;
  envKey?: string;
  icon: string;
  desc: string;
  tone: string;
}

interface NavGroupConfig {
  title: string;
  items: NavItemConfig[];
}

type IconName = keyof typeof Icons;

const groups: NavGroupConfig[] = siteConfig.navigation;

const username = import.meta.env.VITE_GITHUB_USERNAME;
const email = import.meta.env.VITE_EMAIL;
const envUrls: Record<string, string | undefined> = {
  paste: import.meta.env.VITE_PASTE_URL || undefined,
  github: username ? `https://github.com/${username}` : undefined,
  email: email ? `mailto:${email}` : undefined,
};

export const NavigationCard: React.FC = () => (
  <NavCardStyled variant="borderless">
    <SectionLabel>快捷入口 · LINKS</SectionLabel>

    {groups.map((group) => (
      <NavGroup key={group.title}>
        <NavGroupHead>
          <span className="title">{group.title}</span>
          <span className="count">{String(group.items.length).padStart(2, '0')}</span>
        </NavGroupHead>
        <NavItems>
          {group.items.map((item) => {
            const IconComponent =
              (Icons[item.icon as IconName] as React.ElementType) || Icons.GlobalOutlined;
            const href = (item.envKey && envUrls[item.envKey]) || item.url;
            const isMail = href.startsWith('mailto:');

            return (
              <NavItem
                key={`${group.title}-${item.name}`}
                href={href}
                target={isMail ? undefined : '_blank'}
                rel={isMail ? undefined : 'noreferrer'}
                aria-label={`${item.name} · ${item.desc}`}
              >
                <NavIcon $tone={item.tone}>
                  <IconComponent />
                </NavIcon>
                <NavText>
                  <span className="name">{item.name}</span>
                  <span className="desc">{item.desc}</span>
                </NavText>
              </NavItem>
            );
          })}
        </NavItems>
      </NavGroup>
    ))}
  </NavCardStyled>
);
