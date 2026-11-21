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
import { useToday } from '@/hooks/useNow';

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

interface Cell {
  day: number;
  current: boolean;
}

/** 以周一开头的整月网格，首尾用邻月补满整周，和纸质月历一致 */
const monthGrid = (date: Date): Cell[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lead = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: Cell[] = [];

  for (let i = 0; i < lead; i += 1) {
    cells.push({ day: new Date(year, month, 0).getDate() - lead + i + 1, current: false });
  }
  for (let i = 1; i <= days; i += 1) cells.push({ day: i, current: true });
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - lead - days + 1, current: false });
  }
  return cells;
};

/** 本月月历：零网络请求，却把「今天在哪一周」一眼说清 */
export const Calendar = () => {
  const today = useToday();
  const cells = monthGrid(today);

  return (
    <section
      className="flex flex-col gap-2"
      aria-label={`${today.getFullYear()} 年 ${today.getMonth() + 1} 月日历`}
    >
      <h2 className="kicker">
        {today.getFullYear()} 年 {today.getMonth() + 1} 月
      </h2>

      <div className="cal">
        {WEEKDAYS.map((label) => (
          <span key={label} className="cal-head">
            {label}
          </span>
        ))}
        {cells.map((cell, index) => {
          const isToday = cell.current && cell.day === today.getDate();
          return (
            <span
              key={index}
              className="cal-cell"
              data-out={cell.current ? undefined : ''}
              data-today={isToday ? '' : undefined}
            >
              {cell.day}
            </span>
          );
        })}
      </div>
    </section>
  );
};
