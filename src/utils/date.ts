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

/** 农历日的读法：初一…初十 / 十一…十九 / 二十 / 廿一…廿九 / 三十 */
const LUNAR_DAY_NAMES = [
  '初一',
  '初二',
  '初三',
  '初四',
  '初五',
  '初六',
  '初七',
  '初八',
  '初九',
  '初十',
  '十一',
  '十二',
  '十三',
  '十四',
  '十五',
  '十六',
  '十七',
  '十八',
  '十九',
  '二十',
  '廿一',
  '廿二',
  '廿三',
  '廿四',
  '廿五',
  '廿六',
  '廿七',
  '廿八',
  '廿九',
  '三十',
];

export const gregorianLine = (date: Date) =>
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);

/** 农历依赖浏览器 ICU 的 chinese 日历，拿不到就整段省略，不显示半截数据 */
export const lunarLine = (date: Date) => {
  try {
    const month = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { month: 'long' }).format(date);
    const day = Number.parseInt(
      new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { day: 'numeric' })
        .format(date)
        .replace(/\D/g, ''),
      10,
    );
    if (!Number.isInteger(day) || day < 1 || day > LUNAR_DAY_NAMES.length) return '';
    return `农历${month}${LUNAR_DAY_NAMES[day - 1]}`;
  } catch {
    return '';
  }
};

/** 一年中的第几天：既用于按天固定每日一言，也用于日期线的「第 N / M 天」 */
export const dayOfYear = (date: Date = new Date()) => {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((today - start) / 86400000);
};

export const daysInYear = (date: Date = new Date()) =>
  dayOfYear(new Date(date.getFullYear(), 11, 31));

/** 今天已经过去了多少，0–1 */
export const dayProgress = (date: Date) =>
  (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) / 86400;

/** 今年已经过去了多少，0–1：和「今天」共用同一条进度语言 */
export const yearProgress = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 1).getTime();
  const end = new Date(date.getFullYear() + 1, 0, 1).getTime();
  return Math.min(1, Math.max(0, (date.getTime() - start) / (end - start)));
};

export const getGreeting = (date: Date = new Date()) => {
  const hour = date.getHours();
  if (hour < 6) return '夜深了';
  if (hour < 11) return '早上好';
  if (hour < 14) return '中午好';
  if (hour < 18) return '下午好';
  return '晚上好';
};
