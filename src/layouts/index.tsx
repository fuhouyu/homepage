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
import { useEffect } from 'react';
import { LoadingBar } from '@/components/LoadingBar';
import { LayoutFooter } from '@/layouts/components/Footer';
import { LayoutHeader } from '@/layouts/components/Header';
import { useAppTheme } from '@/context/AppThemeContext';
import { useDailyImage } from '@/hooks/useDailyImage';
import { Home } from '@/views/Home';

export const LayoutMain = () => {
  const { wallpaper } = useAppTheme();
  const image = useDailyImage(wallpaper);

  /* 「背景」打开即进入图版，不等图片到达：文字颜色在首帧就定死成白色，
     照片到达后只淡入，不会出现整页文字从墨色翻成白色的跳变。
     接口失败时留在深色底上，仍然是一套完整可读的夜版。 */
  useEffect(() => {
    const root = document.documentElement;
    if (wallpaper) root.dataset.ground = 'photo';
    else delete root.dataset.ground;
  }, [wallpaper]);

  return (
    <div className="relative flex min-h-dvh flex-col">
      <div aria-hidden className="ground fixed inset-0 z-0">
        {image ? (
          <>
            <div
              className="ground-photo absolute inset-0"
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <div className="ground-scrim absolute inset-0" />
          </>
        ) : null}
      </div>

      <LoadingBar />

      {/* 版面是一张居中的纸：内容不足一屏时上下留等量空白，
          超过一屏时 auto 外边距自动归零，不会出现顶部裁切。 */}
      <div className="relative z-10 my-auto flex w-full flex-col">
        <LayoutHeader />
        <main className="page">
          <Home />
        </main>
        <LayoutFooter image={image} />
      </div>
    </div>
  );
};
