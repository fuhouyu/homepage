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
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Select, type InputRef } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import * as Icons from '@ant-design/icons';
import { SearchCard, SearchHint } from '@/components/Search/sytle';
import siteConfig from '@/assets/site-config.json';

interface SearchEngine {
  name: string;
  icon: string;
  url: string;
  suffix?: string;
}

type IconName = keyof typeof Icons;

const engines: SearchEngine[] = siteConfig.searchEngines;
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);

export const Search: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [engineUrl, setEngineUrl] = useState(engines[0]?.url ?? '');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    const focusInput = () => {
      const input = inputRef.current;
      if (!input) return;
      input.focus();
      input.select();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        Boolean(target?.isContentEditable);

      // macOS 上 Option+/ 的 key 会变成 ÷，必须用 code 判断物理按键
      const isSlash =
        event.code === 'Slash' || event.key === '/' || event.key === '÷' || event.key === '¿';
      const isAltSlash = event.altKey && isSlash;
      const isPlainSlash =
        isSlash && !event.altKey && !event.metaKey && !event.ctrlKey && !isTyping;
      const isCommandK =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && !event.altKey;

      if (isAltSlash || isPlainSlash || isCommandK) {
        event.preventDefault();
        focusInput();
        return;
      }

      if (event.key === 'Escape' && document.activeElement === inputRef.current?.input) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSearch = () => {
    const value = keyword.trim();
    if (!value) return;
    const engine = engines.find((item) => item.url === engineUrl) ?? engines[0];
    if (!engine) return;
    const query = encodeURIComponent(engine.suffix ? `${value} ${engine.suffix}` : value);
    window.open(`${engine.url}${query}`, '_blank', 'noopener,noreferrer');
    setKeyword('');
  };

  return (
    <SearchCard variant="borderless">
      <Input
        ref={inputRef}
        size="large"
        variant="borderless"
        allowClear
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        onPressEnter={handleSearch}
        placeholder="搜索点什么…"
        aria-keyshortcuts="Alt+/ / Meta+K Control+K"
        prefix={
          <Select
            value={engineUrl}
            onChange={setEngineUrl}
            variant="borderless"
            popupMatchSelectWidth={140}
            onClick={(event) => event.stopPropagation()}
            options={engines.map((engine) => {
              const IconComponent =
                (Icons[engine.icon as IconName] as React.ElementType) || Icons.GlobalOutlined;
              return {
                value: engine.url,
                label: (
                  <span className="select-label">
                    <IconComponent className="engine-icon" />
                    {engine.name}
                  </span>
                ),
              };
            })}
          />
        }
        suffix={
          <Button
            type="text"
            shape="circle"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            aria-label="搜索"
          />
        }
      />
      <SearchHint>
        <kbd>{isMac ? '⌥ /' : 'Alt + /'}</kbd>
        <kbd>/</kbd>
        <kbd>{isMac ? '⌘ K' : 'Ctrl K'}</kbd>
        聚焦
      </SearchHint>
    </SearchCard>
  );
};
