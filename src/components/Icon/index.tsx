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
import type { ReactNode } from 'react';

export type IconName =
  | 'sun'
  | 'moon'
  | 'cloud'
  | 'cloud-sun'
  | 'cloud-drizzle'
  | 'cloud-rain'
  | 'cloud-snow'
  | 'cloud-lightning'
  | 'fog'
  | 'play'
  | 'pause'
  | 'speaker'
  | 'shuffle'
  | 'external'
  | 'github'
  | 'music'
  | 'image';

/* 统一 24 网格、1.6 描边，跟随 currentColor，不引第三方图标库 */
const STROKE: Partial<Record<IconName, ReactNode>> = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20.9 13.4A8.6 8.6 0 1 1 10.6 3.1a6.8 6.8 0 0 0 10.3 10.3z" />,
  cloud: <path d="M17.5 18.5h-11a4 4 0 0 1-.4-8 6 6 0 0 1 11.4 1.5 3.6 3.6 0 0 1 0 6.5z" />,
  'cloud-sun': (
    <>
      <path d="M12.5 3.5v1.5M8 5.2l1 1M17 5.2l-1 1M6.2 9.5h1.6" />
      <circle cx="12.5" cy="8" r="2.4" />
      <path d="M17 19.5h-8a3.5 3.5 0 0 1-.5-7 5.2 5.2 0 0 1 9.9 1.3 3.2 3.2 0 0 1-1.4 5.7z" />
    </>
  ),
  'cloud-drizzle': (
    <>
      <path d="M17.5 15h-11a4 4 0 0 1-.4-8 6 6 0 0 1 11.4 1.5 3.6 3.6 0 0 1 0 6.5z" />
      <path d="M9 19l-.7 1.6M13 19l-.7 1.6M17 19l-.7 1.6" />
    </>
  ),
  'cloud-rain': (
    <>
      <path d="M17.5 15h-11a4 4 0 0 1-.4-8 6 6 0 0 1 11.4 1.5 3.6 3.6 0 0 1 0 6.5z" />
      <path d="M9 18.5v2.8M12.5 18.5v2.8M16 18.5v2.8" />
    </>
  ),
  'cloud-snow': (
    <>
      <path d="M17.5 15h-11a4 4 0 0 1-.4-8 6 6 0 0 1 11.4 1.5 3.6 3.6 0 0 1 0 6.5z" />
      <path d="M9 19.6h.01M12.5 21.2h.01M16 19.6h.01M12.5 18h.01" />
    </>
  ),
  'cloud-lightning': (
    <>
      <path d="M17.5 15h-11a4 4 0 0 1-.4-8 6 6 0 0 1 11.4 1.5 3.6 3.6 0 0 1 0 6.5z" />
      <path d="M13 17l-2.6 3.4h3L10.8 24" />
    </>
  ),
  fog: <path d="M4 9h16M6.5 12.5h11M4 16h16M7.5 19.5h9" />,
  speaker: (
    <>
      <path d="M4 9.5h3l4.5-3.5v12L7 14.5H4z" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
    </>
  ),
  shuffle: (
    <>
      <path d="M3.5 7.5h3.2c1.4 0 2.2.8 3 2l3 5c.8 1.2 1.6 2 3 2h2.8" />
      <path d="M3.5 16.5h3.2c1.4 0 2.2-.8 3-2l.7-1.2M18 4.5l2.5 3-2.5 3M18 13.5l2.5 3-2.5 3" />
    </>
  ),
  external: (
    <>
      <path d="M13.5 5.5h5v5" />
      <path d="M18.5 5.5l-8 8" />
      <path d="M18 13.5v4a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h4" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6.5l10-2v11" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="15.5" r="2.5" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <circle cx="9" cy="10.5" r="1.6" />
      <path d="M4.5 17l4.6-4.2 3.4 3 2.7-2.3 4.3 3.9" />
    </>
  ),
};

/* play / pause / github 用实心，视觉上更像按钮图标 */
const FILLED: Partial<Record<IconName, ReactNode>> = {
  play: (
    <path d="M7.5 4.8v14.4a.7.7 0 0 0 1.1.6l11.2-7.2a.7.7 0 0 0 0-1.2L8.6 4.2a.7.7 0 0 0-1.1.6z" />
  ),
  pause: <path d="M7 4.5h3.2v15H7zm6.8 0H17v15h-3.2z" />,
  github: (
    <path d="M12 2.2a10 10 0 0 0-3.2 19.5c-.5-.1-.7-.4-.7-.8v-2c-2.6.5-3.2-1.2-3.2-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8 0-.7.3-1.1.6-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.6-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.6 1 1.5 1 2.6 0 3.9-2.3 4.7-4.5 5 .4.3.7 1 .7 2v3c0 .4-.2.7-.7.8A10 10 0 0 0 12 2.2z" />
  ),
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  /** 大尺寸图标需要更细的描边，默认 1.75 只在 14–20px 下成立 */
  strokeWidth?: number;
}

export const Icon = ({ name, size = 14, className, strokeWidth = 1.75 }: IconProps) => {
  const filled = FILLED[name];

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      {filled ?? STROKE[name]}
    </svg>
  );
};

/** Open-Meteo weather_code → 图标分组 */
export const weatherIcon = (code: number): IconName => {
  if (code === 0) return 'sun';
  if (code <= 2) return 'cloud-sun';
  if (code === 3) return 'cloud';
  if (code <= 48) return 'fog';
  if (code <= 57) return 'cloud-drizzle';
  if (code <= 67) return 'cloud-rain';
  if (code <= 77) return 'cloud-snow';
  if (code <= 86) return 'cloud-rain';
  return 'cloud-lightning';
};
