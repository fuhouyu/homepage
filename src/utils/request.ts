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

const DEFAULT_TIMEOUT = 6000;

/* 在途请求数：首屏三四个接口各自到达的时间差很多，版面需要一个统一的「还在跑」信号 */
let pending = 0;
const listeners = new Set<() => void>();
const settle = () => {
  pending = Math.max(0, pending - 1);
  listeners.forEach((notify) => notify());
};
const start = () => {
  pending += 1;
  listeners.forEach((notify) => notify());
};

export const getNetworkPending = () => pending;

export const subscribeNetwork = (notify: () => void) => {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
};

const request = async (url: string, signal: AbortSignal): Promise<Response> => {
  start();
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response;
  } finally {
    settle();
  }
};

const withTimeout = (timeout: number) =>
  typeof AbortSignal.timeout === 'function'
    ? AbortSignal.timeout(timeout)
    : (() => {
        const controller = new AbortController();
        window.setTimeout(() => controller.abort(), timeout);
        return controller.signal;
      })();

export const fetchJson = async <T>(url: string, timeout = DEFAULT_TIMEOUT): Promise<T> => {
  const response = await request(url, withTimeout(timeout));
  return (await response.json()) as T;
};

export const fetchText = async (url: string, timeout = DEFAULT_TIMEOUT): Promise<string> => {
  const response = await request(url, withTimeout(timeout));
  return response.text();
};
