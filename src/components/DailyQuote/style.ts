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

export const QuoteWrap = styled.div`
  max-width: 720px;
  margin-top: 16px;
`;

export const QuoteTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
`;

export const QuoteActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const QuoteText = styled.div`
  display: flex;
  align-items: center;
  min-height: 66px;
  margin-top: 10px;
  padding-left: 14px;
  border-left: 2px solid var(--app-accent);
  font-family: Georgia, 'Songti SC', 'Noto Serif SC', 'STSong', serif;
  font-size: 22px;
  line-height: 1.8;
  letter-spacing: 0.01em;
  color: var(--app-text);

  @media (max-width: 768px) {
    font-size: 18px;
    min-height: 56px;
  }
`;

export const QuoteFooter = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;

  .from {
    font-size: 12px;
    color: var(--app-text-faint);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tag {
    margin: 0;
    color: var(--app-accent);
    background: var(--app-accent-soft);
    border-color: transparent;
    font-size: 11px;
    line-height: 18px;
  }
`;
