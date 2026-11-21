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
import { Hero } from '@/components/Hero';
import { Navigation } from '@/components/Navigation';
import { Clock } from '@/components/Clock';
import { Calendar } from '@/components/Calendar';
import { Weather } from '@/components/Weather';
import { Music } from '@/components/Music';

/** 版面自上而下依次落位的节奏 */
const rise = (delay: number) => ({ '--rise-delay': `${delay}ms` }) as CSSProperties;

export const Home = () => (
  <div className="flex flex-col gap-[var(--app-space-block)]">
    {/* 纵向气口一律走 --app-space-*：这几档都带 svh 上限，矮屏上先收留白，正文不跟着缩 */}
    {/* 头版：左栏是时间—引言两段主叙事，右栏是天气、月历与播放三条旁注 */}
    <div className="grid gap-[var(--app-space-col)] lg:grid-cols-[minmax(0,1fr)_var(--app-rail)] lg:gap-[var(--app-gap)]">
      <div className="reveal flex flex-col gap-[var(--app-space-col)]" style={rise(80)}>
        <Clock />
        <Hero />
      </div>

      <aside
        aria-label="今日状态"
        className="reveal border-rule mt-1 flex flex-row flex-wrap gap-x-8 gap-y-[var(--app-space-col)] sm:mt-0 lg:flex-col lg:border-l lg:pl-10"
        style={rise(160)}
      >
        <Weather />
        <Calendar />
        <Music />
      </aside>
    </div>

    <div className="reveal" style={rise(240)}>
      <Navigation />
    </div>
  </div>
);
