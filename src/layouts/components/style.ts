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
import { Footer } from 'antd/es/layout/layout';
import styled, { keyframes } from 'styled-components';
import { GlassEffect } from '@/styles/style';
import { Layout } from 'antd';

// 头
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.4); }
  70% { box-shadow: 0 0 0 0.375rem rgba(0, 255, 136, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); }
`;

const lyricFadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StyledHeader = styled(Layout.Header)`
  height: 3rem;
  ${GlassEffect(12, 0.25)}
  color: #fff;
`;

export const StatusDot = styled.div`
  width: 0.375rem;
  height: 0.375rem;
  background: #00ff88;
  border-radius: 50%;
  margin-right: 0.5rem;
  animation: ${pulse} 2s infinite;
`;

export const LyricText = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: #00f2fe;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: ${lyricFadeIn} 0.5s ease-out;
`;

// 脚
export const StyledFooter = styled(Footer)`
  ${GlassEffect(12, 0.25)}
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  align-items: center;
  justify-content: center;

  height: 3.125rem;
  flex-shrink: 0;
  padding: 0 3.125rem;

  color: rgba(255, 255, 255, 0.85);
  font-size: 0.875rem;
  z-index: 100;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 0.9375rem 1.25rem;
    gap: 0.5rem;
    justify-content: center;
  }

  a {
    color: #fff;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.8;
      color: #00f2fe;
    }
  }
`;
