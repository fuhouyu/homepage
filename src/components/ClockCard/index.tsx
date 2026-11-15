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
import { useEffect, useState } from 'react';
import { CardTitle, SectionLabel } from '@/styles/style';
import { ClockCardStyled, ClockDate, ClockTime, SoftDivider } from './style';
import { Music } from '@/components/Music';

const formatDate = (date: Date) =>
  `${new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)} · ${['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]}`;

export const ClockCard = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const hourMinute = now.toLocaleTimeString('zh-CN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return (
    <ClockCardStyled variant="borderless">
      <CardTitle>
        <SectionLabel>时间 · CLOCK</SectionLabel>
        <span style={{ fontSize: 11, color: 'var(--app-text-faint)' }}>本地</span>
      </CardTitle>

      <ClockTime>
        {hourMinute}
        <span className="seconds">:{seconds}</span>
      </ClockTime>
      <ClockDate>{formatDate(now)}</ClockDate>

      <SoftDivider />
      <Music />
    </ClockCardStyled>
  );
};
