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
import { Icon, type IconName } from '@/components/Icon';
import { useAppTheme, type AppMode } from '@/context/AppThemeContext';
import { useToday } from '@/hooks/useNow';
import { dayOfYear, daysInYear, gregorianLine, lunarLine } from '@/utils/date';

const MODES: { value: AppMode; label: string; icon: IconName }[] = [
  { value: 'light', label: '浅色', icon: 'sun' },
  { value: 'dark', label: '暗色', icon: 'moon' },
];

export const LayoutHeader = () => {
  const { mode, setMode, wallpaper, setWallpaper } = useAppTheme();
  const today = useToday();
  const lunar = lunarLine(today);
  const username =
    import.meta.env.VITE_GITHUB_USERNAME || import.meta.env.VITE_SITE_NAME || 'fuhouyu';

  return (
    <header className="page reveal pt-[var(--app-space-head)]">
      {/* 控件从报名那一行挪走：姓名是首屏唯一的主角，设置退到最上面的细条里 */}
      <nav
        aria-label="站点设置"
        className="mb-[var(--app-space-head)] flex flex-wrap items-center justify-end gap-x-4 gap-y-2"
      >
        <span role="group" aria-label="主题" className="seg">
          {MODES.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              className="seg-item"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
            >
              <Icon name={icon} size={12} />
              {label}
            </button>
          ))}
        </span>

        <button
          type="button"
          className="switch"
          aria-pressed={wallpaper}
          onClick={() => setWallpaper(!wallpaper)}
        >
          头版图
          <span aria-hidden className="switch-track">
            <span className="switch-knob" />
          </span>
        </button>

        <a
          className="icon-btn"
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title={`https://github.com/${username}`}
        >
          <Icon name="github" size={15} />
        </a>
      </nav>

      <a href="/" className="nameplate">
        {username}
      </a>

      {/* 报名下压粗规线，日期线再压细规线：报纸头版的三段式收口 */}
      <div aria-hidden className="rule-heavy mt-[var(--app-space-head)]" />

      <div className="dateline mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5">
        <span>{gregorianLine(today)}</span>
        {lunar ? <span>{lunar}</span> : null}
        <span className="num">
          第 {dayOfYear(today)} / {daysInYear(today)} 天
        </span>
      </div>

      <div aria-hidden className="hairline mt-[var(--app-space-head)]" />
    </header>
  );
};
