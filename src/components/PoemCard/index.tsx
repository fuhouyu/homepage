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
import { useCallback, useEffect, useState } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { PoemContainer, PoemContent, PoemFrom, PoemHeader } from './style';

export const PoemCard = () => {
  const [poem, setPoem] = useState({ hitokoto: '正在加载中...', from: '...' });
  const [loading, setLoading] = useState(false);

  const fetchPoem = useCallback(async () => {
    // 防止并发请求
    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch('https://v1.hitokoto.cn');
      const data = await res.json();
      setPoem(data);
    } catch (error) {
      // 错误处理：给用户一个友好的默认值
      setPoem({
        hitokoto: '万物皆有裂痕，那是光照进来的地方。',
        from: '莱昂纳德·科恩',
      });
      console.error(error);
    } finally {
      // 确保在请求彻底完成后再关闭 loading
      setLoading(false);
    }
  }, [loading]);

  // 2. 组件挂载时执行一次
  useEffect(() => {
    fetchPoem().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 仅在 mount 时执行

  return (
    <PoemContainer onClick={fetchPoem} title="点击刷新一言">
      <PoemHeader>
        <span>一言</span>
        <SyncOutlined spin={loading} style={{ fontSize: '12px' }} />
      </PoemHeader>

      <PoemContent $loading={loading}>“{poem.hitokoto}”</PoemContent>

      <PoemFrom>— 「{poem.from || '网络'}」</PoemFrom>
    </PoemContainer>
  );
};
