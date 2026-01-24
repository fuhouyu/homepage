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
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { SearchWrapper } from '@/components/Search/sytle';

export const Search: React.FC = () => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    if (!keyword.trim()) return;
    window.open(
      `https://www.bing.com/search?q=${encodeURIComponent(keyword.trim())}%20-CSDN`,
      '_blank',
    );
    setKeyword('');
  };

  return (
    <SearchWrapper>
      <Input
        prefix={<SearchOutlined onClick={handleSearch} />}
        placeholder="必应搜索..."
        allowClear
        variant="borderless"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onPressEnter={handleSearch}
      />
    </SearchWrapper>
  );
};
