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

export const HeroCardStyled = styled(SurfaceCard)`
  .ant-card-body {
    padding: 28px 30px;
  }

  @media (max-width: 768px) {
    .ant-card-body {
      padding: 22px 18px;
    }
  }
`;

export const HeroLayout = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 28px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 18px;
  }
`;

export const HeroMain = styled.div`
  min-width: 0;
  flex: 1;
`;

export const Greeting = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--app-accent);

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--app-accent);
  }
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`;

export const MetaPill = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid var(--app-border);
  background: var(--app-surface-soft);
  color: var(--app-text-muted);
  font-size: 12px;
  line-height: 1.4;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;

  .anticon {
    font-size: 12px;
  }

  &:hover {
    color: var(--app-accent);
    border-color: var(--app-accent);
    background: var(--app-accent-soft);
  }
`;

export const HeroDate = styled.div`
  flex-shrink: 0;
  min-width: 128px;
  padding-left: 26px;
  border-left: 1px solid var(--app-border);
  display: flex;
  flex-direction: column;
  gap: 2px;

  .day {
    font-size: 46px;
    line-height: 1;
    font-weight: 600;
    letter-spacing: -0.04em;
    color: var(--app-text);
    font-variant-numeric: tabular-nums;
  }

  .month {
    font-size: 11px;
    letter-spacing: 0.14em;
    color: var(--app-accent);
  }

  .week {
    margin-top: 6px;
    font-size: 12px;
    color: var(--app-text-faint);
  }

  @media (max-width: 640px) {
    flex-direction: row;
    align-items: baseline;
    gap: 10px;
    padding-left: 0;
    border-left: none;
    .day {
      font-size: 30px;
    }
    .week {
      margin-top: 0;
    }
  }
`;
