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

export const CornerLink = styled.a`
  &:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
  @keyframes octocat-wave {
    0%,
    100% {
      transform: rotate(0);
    }
    20%,
    60% {
      transform: rotate(-25deg);
    }
    40%,
    80% {
      transform: rotate(10deg);
    }
  }
  @media (max-width: 500px) {
    &:hover .octo-arm {
      animation: none;
    }
    .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
  }
`;

export const SvgWrapper = styled.svg`
  fill: #151513;
  color: #fff;
  position: absolute;
  top: 0;
  border: 0;
  right: 0;
  z-index: 1024;
  /* 适配移动端：如果是手机访问，可以适当缩小尺寸 */
  @media (max-width: 500px) {
    width: 60px;
    height: 60px;
  }
`;
