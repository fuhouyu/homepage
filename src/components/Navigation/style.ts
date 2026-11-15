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

export const NavCardStyled = styled(SurfaceCard)`
  .ant-card-body {
    padding: 22px 24px;
  }

  @media (max-width: 768px) {
    .ant-card-body {
      padding: 18px 16px;
    }
  }
`;

export const NavGroup = styled.div`
  & + & {
    margin-top: 18px;
    padding-top: 16px;
    border-top: 1px solid var(--app-border);
  }
`;

export const NavGroupHead = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;

  .title {
    font-size: 12px;
    font-weight: 500;
    color: var(--app-text-muted);
  }

  .count {
    font-size: 10px;
    letter-spacing: 0.04em;
    color: var(--app-text-faint);
    font-variant-numeric: tabular-nums;
  }
`;

export const NavItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
`;

export const NavItem = styled.a`
  flex: 1 1 calc((100% - 48px) / 5);
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--app-border);
  border-radius: 12px;
  background: var(--app-surface-soft);
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: var(--app-accent);
    background: var(--app-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--app-accent);
    outline-offset: 2px;
  }

  @media (max-width: 1024px) {
    flex-basis: calc((100% - 24px) / 3);
  }

  @media (max-width: 768px) {
    flex-basis: calc((100% - 12px) / 2);
    max-width: calc((100% - 12px) / 2);
    gap: 8px;
    padding: 9px 8px;
  }
`;

export const NavIcon = styled.span<{ $tone: string }>`
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 16px;
  color: ${(props) => props.$tone};
  background: color-mix(in srgb, ${(props) => props.$tone} 14%, transparent);

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
`;

export const NavText = styled.span`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  .name {
    font-size: 13px;
    font-weight: 500;
    color: var(--app-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .desc {
    font-size: 11px;
    color: var(--app-text-faint);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
