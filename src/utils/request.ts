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

const withTimeout = (timeout: number) =>
  typeof AbortSignal.timeout === 'function'
    ? AbortSignal.timeout(timeout)
    : (() => {
        const controller = new AbortController();
        window.setTimeout(() => controller.abort(), timeout);
        return controller.signal;
      })();

export const fetchJson = async <T>(url: string, timeout = DEFAULT_TIMEOUT): Promise<T> => {
  const response = await fetch(url, { signal: withTimeout(timeout) });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return (await response.json()) as T;
};

export const fetchText = async (url: string, timeout = DEFAULT_TIMEOUT): Promise<string> => {
  const response = await fetch(url, { signal: withTimeout(timeout) });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.text();
};
