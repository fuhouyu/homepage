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
import styled, { createGlobalStyle, css } from 'styled-components';

// 基础重置与全局字体
export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  * {
    box-sizing: border-box; 
  }

  /* 定义全局滚动条（可选，为了美观） */
  ::-webkit-scrollbar {
    width: 0.375rem;
    height: 0.375rem;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 0.625rem;
  }
`;

// 基础容器：仅处理全屏背景逻辑
export const MainContainer = styled.div<{ bg: string }>`
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background:
    linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bg}) no-repeat center center/cover;
  display: flex;
  align-items: center;
  transition: background 0.5s ease-in-out; /* 背景切换平滑一点 */
`;

// 毛玻璃
export const GlassEffect = (blur = 10, opacity = 0.2, borderRadius = 0) => css`
  background: rgba(0, 0, 0, ${opacity});
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  border: 1px solid rgba(255, 255, 255, 0.1); /* 可选：增加微弱边框感 */
  border-radius: ${borderRadius}px;
`;
