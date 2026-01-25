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
import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { BaiduOutlined, GlobalOutlined, GoogleOutlined, SearchOutlined } from '@ant-design/icons';
import { SearchWrapper } from '@/components/Search/sytle';

export const Search: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [engine, setEngine] = useState('https://www.bing.com/search?q=');

  const handleSearch = () => {
    if (!keyword.trim()) return;
    // 保持你原来的 -CSDN 逻辑
    window.open(`${engine}${encodeURIComponent(keyword.trim())}%20-CSDN`, '_blank');
    setKeyword('');
  };

  return (
    <SearchWrapper>
      <Input
        prefix={
          <Select
            value={engine}
            onChange={(val) => setEngine(val)}
            variant="borderless"
            onClick={(e) => e.stopPropagation()}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            // 宽度调小一点更精致，颜色直接写死你想要的淡紫色
            options={[
              {
                label: (
                  <span className={'select-label'}>
                    <GlobalOutlined className={'icon'} /> 必应
                  </span>
                ),
                value: 'https://www.bing.com/search?q=',
              },
              {
                label: (
                  <span className={'select-label'}>
                    <GoogleOutlined className={'icon'} /> 谷歌
                  </span>
                ),
                value: 'https://www.google.com/search?q=',
              },
              {
                label: (
                  <span className={'select-label'}>
                    <BaiduOutlined className={'icon'} /> 百度
                  </span>
                ),
                value: 'https://www.baidu.com/s?wd=',
              },
            ]}
          />
        }
        suffix={<SearchOutlined className={'icon'} onClick={handleSearch} />}
        placeholder="输入关键词搜索..."
        allowClear
        variant="borderless"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onPressEnter={handleSearch}
      />
    </SearchWrapper>
  );
};
