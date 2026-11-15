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

export const WeatherCardStyled = styled(SurfaceCard)`
  .ant-card-body {
    display: flex;
    flex-direction: column;
  }
`;

export const WeatherTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const WeatherTemp = styled.div`
  font-size: 46px;
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: var(--app-text);
  font-variant-numeric: tabular-nums;

  .unit {
    margin-left: 2px;
    font-size: 18px;
    font-weight: 400;
    color: var(--app-text-faint);
    vertical-align: super;
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

export const WeatherIconBox = styled.div`
  width: 62px;
  height: 62px;
  flex-shrink: 0;
  color: var(--app-accent);
`;

export const WeatherDesc = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: var(--app-text-muted);
`;

export const MetricRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: auto;
  padding-top: 18px;

  .metric {
    padding: 10px 8px;
    border-radius: 10px;
    background: var(--app-surface-soft);
    text-align: center;
    min-width: 0;
  }

  .metric-label {
    font-size: 11px;
    color: var(--app-text-faint);
  }

  .metric-value {
    margin-top: 4px;
    font-size: 13px;
    font-weight: 500;
    color: var(--app-text);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
`;

export const WeatherFallback = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 96px;
  font-size: 12px;
  color: var(--app-text-faint);
`;
