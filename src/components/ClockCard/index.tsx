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
import React, { useEffect, useState } from 'react';
import { ClockContainer, Divider, TimeSection } from './style';
import { Music } from '@/components/Music';

export const ClockCard = ({
  onTimeUpdate,
  onSongChange,
}: {
  onTimeUpdate?: (time: number) => void;
  onSongChange?: (lrcUrl: string) => void;
}) => {
  const [time, setTime] = useState(new Date());

  // 时钟逻辑
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <ClockContainer>
      <TimeSection>
        <div className="date">
          {time
            .toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
            .replace(/\//g, '年')
            .replace(/月(\d{2})$/, '月$1日')}
          {' ' + ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][time.getDay()]}
        </div>
        <div className="time">
          {time.toLocaleTimeString('zh-CN', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </div>
      </TimeSection>
      <Divider />
      <Music onSongChange={onSongChange} onTimeUpdate={onTimeUpdate} />
    </ClockContainer>
  );
};
