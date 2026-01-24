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
import { LoadingScreen, MainLayout, StyledContent, StyledLayout } from './style';
import React, { useEffect, useState } from 'react';
import { LayoutFooter } from '@/layouts/components/Footer';
import { LayoutHeader } from '@/layouts/components/Header';
import { LyricProvider } from '@/context/LyricContext';
import { Home } from '@/views/Home';

export const LayoutMain = () => {
  const [bgUrl, setBgUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 创建一个至少执行 1500ms 的 Promise
    const timerPromise = new Promise((resolve) => setTimeout(resolve, 1000));

    // 获取 Bing 背景图的 Promise
    const fetchPromise = fetch('https://bing.biturl.top/?resolution=1920&format=json&index=0')
      .then((res) => res.json())
      .then((data) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = data.url;
          img.onload = () => {
            setBgUrl(data.url);
            resolve(data.url);
          };
        });
      });

    // 只有当图片加载完 且 1.5秒定时器结束后，才关闭 Loading
    Promise.all([fetchPromise, timerPromise]).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <LoadingScreen $isVisible={isLoading}>
        <div className="loader-container">
          <div className="outer-ring" />
          <div className="middle-ring" />
          <div className="inner-ring" />
        </div>

        <div className="text-area">
          <div className="main-title">{import.meta.env.VITE_GITHUB_USERNAME} 的主页</div>
          <div className="sub-title">加载中...</div>
        </div>
      </LoadingScreen>

      <LyricProvider>
        {bgUrl && (
          <StyledLayout $bg={bgUrl}>
            <LayoutHeader />

            <MainLayout>
              <StyledContent>
                <Home />
              </StyledContent>
            </MainLayout>

            <LayoutFooter />
          </StyledLayout>
        )}
      </LyricProvider>
    </>
  );
};
