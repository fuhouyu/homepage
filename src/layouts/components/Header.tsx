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
import { StatusDot, StyledHeader } from '@/layouts/components/style';
import { CloudOutlined, CustomerServiceOutlined, EnvironmentOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { AnyObject } from 'antd/es/_util/type';
import { Flex } from 'antd';
import { useLyric } from '@/context/LyricContext';

export const LayoutHeader = () => {
  const { currentLrc } = useLyric();
  const [weatherInfo, setWeatherInfo] = useState<AnyObject>();
  const getSystemData = useCallback(async () => {
    try {
      // 替换为 https 协议的接口
      const ipRes = await fetch('https://ipapi.co/json/');
      const ipData = await ipRes.json();

      // ipapi.co 不返回 status: 'success'，通常直接判断是否有 city 或 latitude
      if (ipData && ipData.latitude) {
        const { latitude, longitude, city } = ipData;

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
        );
        const weatherData = await weatherRes.json();

        const weatherMap: Record<number, string> = {
          0: '晴朗',
          1: '晴间多云',
          2: '多云',
          3: '阴天',
          45: '雾',
          61: '小雨',
          71: '小雪',
          95: '雷阵雨',
        };

        setWeatherInfo({
          city: city || '未知城市',
          temp: Math.round(weatherData.current_weather.temperature),
          text: weatherMap[weatherData.current_weather.weathercode] || '晴朗',
        });
      }
    } catch (e) {
      console.error('获取系统数据失败:', e);
    }
  }, []);

  useEffect(() => {
    getSystemData().then();
  }, [getSystemData]);

  return (
    <StyledHeader>
      <Flex align="center" justify="space-between" style={{ height: '100%', width: '98%' }}>
        {/* 左侧：固定宽度或自适应 */}
        <Flex align="center" gap={12} style={{ flexShrink: 0 }}>
          <StatusDot />
          <span style={{ fontWeight: 700, fontSize: '13px' }}>SYSTEM ONLINE</span>
        </Flex>

        {/* 中间：自动占满并居中 */}
        <Flex
          flex={1}
          justify="center"
          align="center"
          style={{ overflow: 'hidden', padding: '0 20px' }}
        >
          {currentLrc && (
            <Flex gap={15}>
              <CustomerServiceOutlined className="lyric-icon" />
              <span className="lyric-text" key={currentLrc}>
                {currentLrc}
              </span>
            </Flex>
          )}
        </Flex>

        {/* 右侧：天气与链接 */}
        <Flex align="center" gap={20} style={{ flexShrink: 0 }}>
          {weatherInfo && (
            <Flex gap={15} style={{ opacity: 0.9 }}>
              <Flex align="center" gap={4}>
                <EnvironmentOutlined />
                <span>{weatherInfo.city}</span>
              </Flex>
              <Flex align="center" gap={4}>
                <CloudOutlined />
                <span>
                  {weatherInfo.text} {weatherInfo.temp}°C
                </span>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </StyledHeader>
  );
};
