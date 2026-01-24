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
import styled from 'styled-components';

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  /* 极致毛玻璃：背景更透，模糊更深 */
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 0 16px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  width: 100%;
  max-width: 400px; /* 平时缩窄，显得精致 */
  height: 40px;
  margin: 0 auto;
  pointer-events: auto;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    max-width: 440px;
  }

  &:focus-within {
    background: rgba(255, 255, 255, 0.15);
    border-color: #00f2fe;
    max-width: 600px; /* 只有输入时才变长 */
    box-shadow: 0 8px 32px rgba(0, 242, 254, 0.15);
  }

  .ant-input-affix-wrapper {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;

    input {
      color: #fff !important;
      font-size: 14px;
      letter-spacing: 0.5px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.3) !important;
        transition: opacity 0.3s;
      }
    }

    /* 搜索图标稍微调小，显得精致 */
    .ant-input-prefix {
      color: rgba(255, 255, 255, 0.5);
      font-size: 16px;
      margin-right: 10px;
    }

    /* 清除图标 */
    .ant-input-clear-icon {
      color: rgba(255, 255, 255, 0.3) !important;
      &:hover {
        color: #fff !important;
      }
    }
  }
`;
