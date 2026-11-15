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
import styled, { createGlobalStyle } from 'styled-components';
import { Card } from 'antd';

export const GlobalStyle = createGlobalStyle`
  :root,
  html[data-theme='light'] {
    --app-bg: #F4F6F2;
    --app-surface: #FFFFFF;
    --app-surface-soft: #F8FAF7;
    --app-border: #E4E8E2;
    --app-border-strong: #CFD8CE;
    --app-text: #1D211E;
    --app-text-muted: #626C64;
    --app-text-faint: #98A199;
    --app-accent: #2F7A63;
    --app-accent-soft: #E8F2EC;
    --app-grid: rgba(38, 62, 46, 0.018);
    --app-shadow: 0 1px 2px rgba(24, 38, 28, 0.04);
    --app-hover: #F6F9F5;
  }

  html[data-theme='dark'] {
    --app-bg: #121512;
    --app-surface: #1B1F1C;
    --app-surface-soft: #232823;
    --app-border: rgba(255, 255, 255, 0.10);
    --app-border-strong: rgba(255, 255, 255, 0.22);
    --app-text: #EDEEEB;
    --app-text-muted: rgba(237, 238, 235, 0.64);
    --app-text-faint: rgba(237, 238, 235, 0.42);
    --app-accent: #6FC2A0;
    --app-accent-soft: rgba(111, 194, 160, 0.14);
    --app-grid: rgba(255, 255, 255, 0.025);
    --app-shadow: 0 1px 2px rgba(0, 0, 0, 0.24);
    --app-hover: #242A25;
  }

  html[data-theme='scene'] {
    --app-bg: #EDF1EC;
    --app-surface: rgba(255, 255, 255, 0.86);
    --app-surface-soft: rgba(255, 255, 255, 0.70);
    --app-border: rgba(255, 255, 255, 0.78);
    --app-border-strong: rgba(255, 255, 255, 0.95);
    --app-text: #1D211E;
    --app-text-muted: #5C665E;
    --app-text-faint: #89928A;
    --app-accent: #2F7A63;
    --app-accent-soft: #E3F0E8;
    --app-grid: transparent;
    --app-shadow: 0 8px 28px rgba(24, 38, 28, 0.10);
    --app-hover: rgba(255, 255, 255, 0.94);
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    min-height: 100%;
  }

  body {
    color: var(--app-text);
    background-color: var(--app-bg);
    background-image:
      linear-gradient(var(--app-grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--app-grid) 1px, transparent 1px);
    background-size: 32px 32px;
    background-attachment: fixed;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
      'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  * { box-sizing: border-box; }

  ::selection { background: var(--app-accent-soft); }

  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-thumb {
    background: var(--app-border-strong);
    border-radius: 8px;
  }

  a { color: inherit; text-decoration: none; }
`;

export const SurfaceCard = styled(Card)`
  height: 100%;
  background: var(--app-surface) !important;
  border: 1px solid var(--app-border) !important;
  border-radius: 16px !important;
  box-shadow: var(--app-shadow) !important;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  .ant-card-body {
    padding: 20px;
    height: 100%;
  }

  &:hover {
    border-color: var(--app-border-strong) !important;
  }

  @media (max-width: 768px) {
    .ant-card-body {
      padding: 16px;
    }
  }
`;

/** 兼容历史组件引用，视觉上统一到新的 SurfaceCard */
export const GlassCard = SurfaceCard;

export const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--app-text-faint);
`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;
