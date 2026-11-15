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
import { useEffect, useState } from 'react';
import { Backdrop, MainLayout, PageShell, StyledContent, StyledLayout } from './style';
import { LayoutFooter } from '@/layouts/components/Footer';
import { LayoutHeader } from '@/layouts/components/Header';
import { LyricProvider } from '@/context/LyricContext';
import { useAppTheme } from '@/context/AppThemeContext';
import { Home } from '@/views/Home';
import { fetchJson } from '@/utils/request';
import siteConfig from '@/assets/site-config.json';

interface WallpaperResponse {
  url?: string;
}

export const LayoutMain = () => {
  const { mode } = useAppTheme();
  const [wallpaper, setWallpaper] = useState('');

  useEffect(() => {
    if (mode !== 'scene' || wallpaper) return;

    let cancelled = false;
    const api = import.meta.env.VITE_WALLPAPER_API || siteConfig.apis.wallpaper;

    fetchJson<WallpaperResponse>(api)
      .then((data) => {
        if (!data?.url) return;
        const image = new Image();
        image.onload = () => {
          if (!cancelled) setWallpaper(data.url as string);
        };
        image.src = data.url;
      })
      .catch(() => {
        // 壁纸接口失败时保持纯色背景，首屏不依赖任何外部请求
      });

    return () => {
      cancelled = true;
    };
  }, [mode, wallpaper]);

  return (
    <PageShell>
      <Backdrop $url={wallpaper} $visible={mode === 'scene' && Boolean(wallpaper)} />
      <LyricProvider>
        <StyledLayout>
          <LayoutHeader />
          <MainLayout>
            <StyledContent>
              <Home />
            </StyledContent>
          </MainLayout>
          <LayoutFooter />
        </StyledLayout>
      </LyricProvider>
    </PageShell>
  );
};
