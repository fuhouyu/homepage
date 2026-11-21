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
import { useNow } from '@/hooks/useNow';
import { dayProgress, getGreeting, yearProgress } from '@/utils/date';

/**
 * 整页的第一视觉锚点：细体大字时钟，不装进任何面板。
 * 秒数缩到 0.4em 并走套色，既保住「到秒」的信息，又不让八位数字抢掉字形。
 */
export const Clock = () => {
  const now = useNow();
  const percent = Math.round(dayProgress(now) * 100);
  const yearPercent = Math.round(yearProgress(now) * 100);
  const hhmm = new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);

  return (
    <section className="flex flex-col gap-3">
      <p className="kicker">{getGreeting(now)}</p>

      <time dateTime={now.toISOString()} className="hero-clock">
        {hhmm}
        <span className="hero-clock-seconds">:{String(now.getSeconds()).padStart(2, '0')}</span>
      </time>

      <div className="flex max-w-[26rem] flex-col gap-2">
        <div className="flex items-center gap-3">
          <div
            className="progress flex-1"
            role="progressbar"
            aria-label="今天已经过去"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <i aria-hidden style={{ width: `${percent}%` }} />
          </div>
          <span className="num text-shadowed shrink-0 text-micro text-faint">今天 {percent}%</span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="progress flex-1"
            role="progressbar"
            aria-label="今年已经过去"
            aria-valuenow={yearPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <i aria-hidden style={{ width: `${yearPercent}%` }} />
          </div>
          <span className="num text-shadowed shrink-0 text-micro text-faint">
            全年 {yearPercent}%
          </span>
        </div>
      </div>
    </section>
  );
};
