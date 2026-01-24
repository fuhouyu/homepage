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

export const GridContainer = styled.div`
  width: 100%;
  max-width: 75rem;
  /* 初始桌面端高度限制 */
  max-height: 80vh;

  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 1.875rem;
  align-items: start;

  /* 📱 手机端适配 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 变成单列 */
    max-height: none; /* 解除高度限制，允许纵向滚动 */
    overflow-y: auto; /* 允许内容区滚动 */
    padding-bottom: 2rem; /* 给底部留点空间 */
  }
`;

export const LeftMainCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: 100%;
  justify-content: center;
`;

export const CalendarBox = styled.div`
  width: 100%;
  text {
    color: #fff;
  }
`;
