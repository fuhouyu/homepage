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
import {
  EnvironmentOutlined,
  FileTextOutlined,
  GithubOutlined,
  MailOutlined,
} from '@ant-design/icons';
import {
  Greeting,
  HeroCardStyled,
  HeroDate,
  HeroLayout,
  HeroMain,
  MetaPill,
  MetaRow,
} from './style';
import { DailyQuote } from '@/components/DailyQuote';
import siteConfig from '@/assets/site-config.json';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return '夜深了';
  if (hour < 11) return '早上好';
  if (hour < 14) return '中午好';
  if (hour < 18) return '下午好';
  return '晚上好';
};

export const HeroCard = () => {
  const username = import.meta.env.VITE_GITHUB_USERNAME || import.meta.env.VITE_SITE_NAME || '';
  const city = import.meta.env.VITE_CITY || siteConfig.weather.city;
  const email = import.meta.env.VITE_EMAIL;
  const pasteUrl = import.meta.env.VITE_PASTE_URL || siteConfig.pasteUrl;

  const now = new Date();
  const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][now.getDay()];
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(now).toUpperCase();

  return (
    <HeroCardStyled variant="borderless">
      <HeroLayout>
        <HeroMain>
          <Greeting>
            <span className="dot" />
            {getGreeting()}，欢迎来到 {username || '这里'}
          </Greeting>

          <DailyQuote />

          <MetaRow>
            {city && (
              <MetaPill as="span">
                <EnvironmentOutlined />
                {city}
              </MetaPill>
            )}
            {email && (
              <MetaPill href={`mailto:${email}`}>
                <MailOutlined />
                Email
              </MetaPill>
            )}
            {username && (
              <MetaPill href={`https://github.com/${username}`} target="_blank" rel="noreferrer">
                <GithubOutlined />
                GitHub
              </MetaPill>
            )}
            <MetaPill href={pasteUrl} target="_blank" rel="noreferrer">
              <FileTextOutlined />
              Paste
            </MetaPill>
          </MetaRow>
        </HeroMain>

        <HeroDate>
          <span className="day">{String(now.getDate()).padStart(2, '0')}</span>
          <span className="month">
            {month} · {now.getFullYear()}
          </span>
          <span className="week">{week}</span>
        </HeroDate>
      </HeroLayout>
    </HeroCardStyled>
  );
};
