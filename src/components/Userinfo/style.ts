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
import { Avatar, Tag } from 'antd';

// 包装整个 UserInfo 的容器
export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

// 扩展 Avatar 增加边框质感
export const StyledAvatar = styled(Avatar)`
  border: 2px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

// 内容区（名字 + 标签）
export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

// 统一的标签容器
export const TagGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

// 扩展 AntD Tag，移除默认边框并增加毛玻璃感
export const GlassTag = styled(Tag)`
  border: none !important;
  color: #fff !important;
  background: rgba(255, 255, 255, 0.1) !important;
  padding: 2px 10px !important;
  display: flex;
  align-items: center;
  transition: all 0.3s ease !important;

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    transform: translateY(-2px);
  }

  .anticon {
    margin-right: 4px;
  }
`;

export const IconLink = styled.a`
  display: flex;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: #4facfe;
  }
`;

export const GlowText = styled.div`
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  h1 {
    font-size: 3rem;
    font-weight: 800;
    margin: 0;
    letter-spacing: -1px;
  }
`;
