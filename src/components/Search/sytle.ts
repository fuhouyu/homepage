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
import { SurfaceCard } from '@/styles/style';

export const SearchCard = styled(SurfaceCard)`
  .ant-card-body {
    padding: 6px 10px 6px 14px !important;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ant-input-affix-wrapper {
    background: transparent !important;
    box-shadow: none !important;
    padding: 0;
  }

  .ant-input {
    background: transparent !important;
    color: var(--app-text) !important;
    font-size: 14px;
  }

  .ant-input::placeholder {
    color: var(--app-text-faint) !important;
  }

  .ant-select-selector {
    padding-inline-end: 18px !important;
  }

  .ant-select-selection-item {
    color: var(--app-text-muted);
    font-size: 13px;
  }

  .engine-icon {
    margin-right: 6px;
    color: var(--app-accent);
  }

  .select-label {
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    color: var(--app-text-muted);
  }
`;

export const SearchHint = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: var(--app-text-faint);
  white-space: nowrap;

  kbd {
    display: inline-block;
    min-width: 18px;
    padding: 1px 5px;
    border: 1px solid var(--app-border-strong);
    border-radius: 5px;
    background: var(--app-surface-soft);
    color: var(--app-text-muted);
    font-family: inherit;
    text-align: center;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
