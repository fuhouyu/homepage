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
import styled, { keyframes } from 'styled-components';

const lyricFadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const HeaderShell = styled.header`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 20px 24px 8px;
  display: flex;
  align-items: center;
  gap: 18px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 14px 14px 6px;
    gap: 10px;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  .brand-name {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.2;
    color: var(--app-text);
  }

  .brand-sub {
    font-size: 11px;
    line-height: 1.4;
    color: var(--app-text-faint);
    letter-spacing: 0.04em;
  }
`;

export const LyricSlot = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LyricText = styled.span`
  font-size: 12px;
  color: var(--app-text-faint);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: ${lyricFadeIn} 0.45s ease-out;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  flex-shrink: 0;

  .today {
    font-size: 12px;
    color: var(--app-text-muted);
    white-space: nowrap;
  }

  .icon-link {
    width: 30px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: var(--app-text-muted);
    font-size: 16px;
    transition:
      color 0.2s ease,
      background 0.2s ease;

    &:hover {
      color: var(--app-accent);
      background: var(--app-accent-soft);
    }
  }

  @media (max-width: 768px) {
    .today {
      display: none;
    }
  }
`;

export const FooterShell = styled.footer`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 12px 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  font-size: 12px;
  color: var(--app-text-faint);

  .footer-links {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  a {
    transition: color 0.2s ease;
    &:hover {
      color: var(--app-accent);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 14px 24px;
    .footer-links {
      gap: 12px;
    }
  }
`;
