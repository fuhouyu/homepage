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

export const ClockContainer = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 20px;
`;

export const TimeSection = styled.div`
  text-align: center;

  .date {
    font-size: 0.9rem;
    opacity: 0.7;
    letter-spacing: 1px;
  }

  .time {
    font-size: 3rem;
    font-weight: bold;
    font-family: 'monospace';
    margin-top: 5px;
  }
`;

// 分割线
export const Divider = styled.div`
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
`;
