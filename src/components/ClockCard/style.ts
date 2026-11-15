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

export const ClockCardStyled = styled(SurfaceCard)`
  .ant-card-body {
    display: flex;
    flex-direction: column;
  }
`;

export const ClockTime = styled.div`
  font-size: 46px;
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: var(--app-text);
  font-variant-numeric: tabular-nums;

  .seconds {
    margin-left: 6px;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0;
    color: var(--app-text-faint);
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

export const ClockDate = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: var(--app-text-muted);
`;

export const SoftDivider = styled.div`
  height: 1px;
  margin: auto 0 14px;
  background: var(--app-border);
`;
