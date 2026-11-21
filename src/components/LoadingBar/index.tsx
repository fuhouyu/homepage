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
import { useSyncExternalStore } from 'react';
import { getNetworkPending, subscribeNetwork } from '@/utils/request';

/**
 * 报头上方一道跑动的套色细线：每日一图可能要十几秒，没有它这段等待就像页面卡死。
 * 不抢版面、不挡内容，请求清空后自己收掉。
 */
export const LoadingBar = () => {
  const busy = useSyncExternalStore(subscribeNetwork, getNetworkPending, () => 0) > 0;

  return (
    <div aria-hidden className="loadbar" data-busy={busy || undefined}>
      <i />
    </div>
  );
};
