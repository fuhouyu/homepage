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
import { Avatar, Segmented, Tooltip } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { Brand, HeaderActions, HeaderShell, LyricSlot, LyricText } from './style';
import { useLyric } from '@/context/LyricContext';
import { useAppTheme } from '@/context/AppThemeContext';
import type { AppMode } from '@/styles/theme';

const formatToday = () =>
  new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' }).format(
    new Date(),
  );

export const LayoutHeader = () => {
  const { currentLrc } = useLyric();
  const { mode, setMode } = useAppTheme();
  const username = import.meta.env.VITE_GITHUB_USERNAME || import.meta.env.VITE_SITE_NAME || 'home';

  return (
    <HeaderShell>
      <Brand>
        <Avatar
          shape="square"
          size={34}
          style={{
            background: 'var(--app-accent)',
            color: '#fff',
            fontSize: 15,
            fontWeight: 600,
            borderRadius: 10,
          }}
        >
          {(username || 'h').charAt(0).toUpperCase()}
        </Avatar>
        <div>
          <div className="brand-name">{username}</div>
          <div className="brand-sub">PERSONAL START</div>
        </div>
      </Brand>

      <LyricSlot>{currentLrc && <LyricText key={currentLrc}>{currentLrc}</LyricText>}</LyricSlot>

      <HeaderActions>
        <span className="today">{formatToday()}</span>
        <Segmented<AppMode>
          size="small"
          value={mode}
          onChange={(value) => setMode(value)}
          options={[
            { label: '浅色', value: 'light' },
            { label: '暗色', value: 'dark' },
            { label: '壁纸', value: 'scene' },
          ]}
        />
        {username && (
          <Tooltip title="GitHub" arrow={false}>
            <a
              className="icon-link"
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GithubOutlined />
            </a>
          </Tooltip>
        )}
      </HeaderActions>
    </HeaderShell>
  );
};
