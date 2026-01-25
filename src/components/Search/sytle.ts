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
  padding: 0 0.5rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  width: 100%;
  height: 2.5rem;
  position: relative;
  overflow: visible !important;
  z-index: 100;

  .ant-select-dropdown {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .ant-select-item-option-selected {
    background-color: #180e0d !important;
  }

  .icon {
    color: #fff !important;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #d8b4fe !important; /* 悬停时变为淡紫色 */
      transform: scale(1.1); /* 增加一点缩放动画 */
    }

    &:active {
      transform: scale(0.9);
    }
  }

  & .search-select-popup {
    background-color: #0f0e12 !important; /* 强制设为深色 */
    border: 1px solid rgba(216, 180, 254, 0.3) !important;

    /* 覆盖 antd 默认的白色背景 */

    .ant-select-content {
      background-color: #0f0e12 !important;
    }

    .ant-select-item {
      background-color: transparent !important;
      color: #fff !important; /* 选项文字改为白色保证清晰 */

      &:hover {
        background: rgba(216, 180, 254, 0.1) !important;
      }
    }

    .ant-select-item-option-selected {
      background: rgba(216, 180, 254, 0.2) !important;
      color: #d8b4fe !important;
    }
  }

  .ant-select-selection-item .anticon {
    margin-right: 8px;
    font-size: 16px;
  }

  .select-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #fff;
  }
`;
