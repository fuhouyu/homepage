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

/** 时钟每秒重绘，定时器只持有在这里 */
export const useNow = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return now;
};

/** 日期线一天才变一次，不必跟着秒级渲染走 */
export const useToday = () => {
  const [today, setToday] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => {
      setToday((prev) => {
        const next = new Date();
        return next.getDate() === prev.getDate() ? prev : next;
      });
    }, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return today;
};
