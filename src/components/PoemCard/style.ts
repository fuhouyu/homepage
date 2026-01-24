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
import { GlassCard } from '@/layouts/style';

export const PoemContainer = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  cursor: pointer;
  position: relative;
  min-height: 150px; /* 给一个最小高度，防止内容加载时卡片跳动 */
`;

export const PoemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  opacity: 0.6;
  font-size: 0.8rem;
  font-weight: bold;
`;

export const PoemContent = styled.div<{ $loading: boolean }>`
  font-size: 1rem;
  line-height: 1.6;
  font-style: italic;
  min-height: 3em;
  transition: opacity 0.3s;
  opacity: ${(props) => (props.$loading ? 0.5 : 1)};
`;

export const PoemFrom = styled.div`
  text-align: right;
  margin-top: 10px;
  font-size: 0.8rem;
  opacity: 0.7;
`;
