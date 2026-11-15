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
import { Layout } from 'antd';

const { Content } = Layout;

export const PageShell = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Backdrop = styled.div<{ $url?: string; $visible: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-color: var(--app-bg);
  background-image: ${(props) =>
    props.$url && props.$visible
      ? `linear-gradient(rgba(247, 249, 246, 0.52), rgba(247, 249, 246, 0.68)), url(${props.$url})`
      : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.6s ease;
`;

export const StyledLayout = styled(Layout)`
  position: relative;
  z-index: 1;
  flex: 1;
  background: transparent !important;
`;

export const MainLayout = styled(Layout)`
  background: transparent !important;
`;

export const StyledContent = styled(Content)`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 20px 24px 40px;
  background: transparent !important;

  @media (max-width: 768px) {
    padding: 12px 14px 32px;
  }
`;
