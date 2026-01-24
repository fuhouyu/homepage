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
import React from 'react';
import { Flex } from 'antd';
import { GitHubCalendar } from 'react-github-calendar';
import Tilt from 'react-parallax-tilt';

import { CalendarBox, GridContainer, LeftMainCard } from '@/views/Home/style';
import { PoemCard } from '@/components/PoemCard';
import { ClockCard } from '@/components/ClockCard';
import { Userinfo } from '@/components/Userinfo';
import { Search } from '@/components/Search';

export const Home = () => {
  const username = import.meta.env.VITE_GITHUB_USERNAME;
  return (
    <Flex vertical gap={20} align="center" style={{ width: '100%', position: 'relative' }}>
      {/* 搜索区域：限制高度，防止遮挡下方 */}
      <Search />
      <GridContainer>
        {/* 左侧区域：用户信息 + 日历 */}
        <LeftMainCard>
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.01}>
            <Userinfo />
          </Tilt>
          <CalendarBox>
            <GitHubCalendar
              username={username}
              blockSize={11}
              showTotalCount={false}
              showColorLegend={false}
              blockMargin={3}
              fontSize={12}
              colorScheme="dark"
            />
          </CalendarBox>
        </LeftMainCard>

        {/* 右侧区域：时钟 + 一言 */}
        <Flex vertical gap={25}>
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1.03}
            glareEnable={true}
            glareMaxOpacity={0.15}
            glareBorderRadius="20px"
          >
            <ClockCard />
          </Tilt>

          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1.03}
            glareEnable={true}
            glareMaxOpacity={0.15}
            glareBorderRadius="20px"
          >
            <PoemCard />
          </Tilt>
        </Flex>
      </GridContainer>
    </Flex>
  );
};
