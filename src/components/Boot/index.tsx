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

export const BOOT_STORAGE_KEY = 'fuhouyu-booted';

/** 装配线画完 → 遮罩抬起 → 卸载。加起来不到一秒，再长就是在挡内容 */
const HOLD = 620;
const LIFT = 360;

const canBoot = () => {
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem(BOOT_STORAGE_KEY) !== '1';
  } catch {
    /* 隐私模式读不到 sessionStorage：那就每次都别播，宁可少一段动画也不要拦路 */
    return false;
  }
};

/** 渲染前就要问一次：main.tsx 据此挂 data-booting，把 .reveal 的落位压到遮罩抬起之后 */
export const bootNeeded = canBoot;

export const Boot = () => {
  const [phase, setPhase] = useState<'hold' | 'lift' | 'gone'>(() => (canBoot() ? 'hold' : 'gone'));

  useEffect(() => {
    if (phase === 'gone') {
      delete document.documentElement.dataset.booting;
      return;
    }
    /* 遮罩开始抬起就放行落位：内容在薄雾后面升起来，而不是等遮罩走完后凭空出现 */
    const lift = setTimeout(() => {
      delete document.documentElement.dataset.booting;
      setPhase('lift');
    }, HOLD);
    const done = setTimeout(() => {
      try {
        sessionStorage.setItem(BOOT_STORAGE_KEY, '1');
      } catch {
        /* 存不下也只是下次多播一遍 */
      }
      setPhase('gone');
    }, HOLD + LIFT);
    return () => {
      clearTimeout(lift);
      clearTimeout(done);
    };
  }, [phase]);

  if (phase === 'gone') return null;

  return (
    <div
      className="boot"
      data-phase={phase}
      role="status"
      aria-live="polite"
      aria-label="正在装配版面"
    >
      <span aria-hidden className="boot-scan" />
      <div className="boot-inner">
        <p className="boot-mark">fuhouyu</p>
        <span aria-hidden className="boot-rule" />
        <p className="boot-note">
          版面装配中
          <span aria-hidden className="boot-caret" />
        </p>
      </div>
    </div>
  );
};
