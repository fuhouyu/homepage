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
import { Layout } from 'antd';
import { GlassEffect } from '@/styles/style';

const { Content } = Layout;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const reverseRotate = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

interface LayoutProps {
  $bg?: string;
}

export const StyledLayout = styled(Layout)<LayoutProps>`
  /* 强制锁定宽高为视口大小 */
  width: 100vw;
  height: 100vh;
  /* 严禁出现滚动条 */
  overflow: hidden;

  background-image: ${(props) => (props.$bg ? `url(${props.$bg})` : 'none')};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.8s ease-in-out;
`;

export const MainLayout = styled(Layout)`
  /* 占据 Header 和 Footer 之外的所有高度 */
  flex: 1;
  background: transparent;
  overflow: hidden;
`;

// 基础 UI 组件
export const GlassCard = styled.div`
  ${GlassEffect(10, 0.5, 12)}
  padding: 1.25rem;
  color: #fff;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px); /* 向上微动比单纯放大更有质感 */
  }
`;

export const StyledContent = styled(Content)`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  box-sizing: border-box;

  /* 📱 手机端取消垂直居中，改为从顶部开始排，并允许滚动 */
  @media (max-width: 768px) {
    align-items: flex-start;
    overflow-y: auto;
    padding: 1rem;
  }
`;

export const LoadingScreen = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* 深灰色背景，比纯黑更有质感 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: all 0.8s cubic-bezier(0.65, 0, 0.35, 1);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};

  /* 背景点阵装饰 */
  background: #121212 radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0);
  background-size: 30px 30px;

  .loader-container {
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 外层虚线圆环 */

  .outer-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px dashed rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    animation: ${rotate} 10s linear infinite;
  }

  /* 中层实线缺口圆环 */

  .middle-ring {
    position: absolute;
    width: 80%;
    height: 80%;
    border: 3px solid transparent;
    border-top: 3px solid rgba(255, 255, 255, 0.8);
    border-left: 3px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    animation: ${reverseRotate} 2s cubic-bezier(0.53, 0.21, 0.29, 0.67) infinite;
  }

  /* 内层快速旋转圆点/线条 */

  .inner-ring {
    position: absolute;
    width: 50%;
    height: 50%;
    border: 2px solid transparent;
    border-bottom: 2px solid #4facfe; /* 科技蓝点缀 */
    border-radius: 50%;
    filter: drop-shadow(0 0 5px #4facfe);
    animation: ${rotate} 1s linear infinite;
  }

  .text-area {
    margin-top: 40px;
    text-align: center;
    animation: ${fadeIn} 1s ease-out forwards;
  }

  .main-title {
    font-size: 1.5rem;
    font-weight: 300;
    color: #fff;
    letter-spacing: 6px;
    margin-bottom: 8px;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  }

  .sub-title {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`;
