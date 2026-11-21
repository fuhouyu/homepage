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
import { fetchJson } from '@/utils/request';
import siteConfig from '@/assets/site-config.json';

interface WallpaperResponse {
  url?: string;
  copyright?: string;
}

export interface DailyImage {
  url: string;
  /** 「正在潜水的座头鲸，挪威北部…」——图片说明 */
  caption: string;
  /** 「(© Espen Bergersen/Minden Pictures)」——摄影署名 */
  credit: string;
}

/**
 * Bing 的 copyright 把说明和署名拼在一个字段里，署名从 「(©」 起。
 * 拆开后说明进图注、署名进页脚，两处都不用整串。
 */
const splitCopyright = (raw = '') => {
  const index = raw.search(/\(©/);
  if (index < 0) return { caption: raw.trim(), credit: '' };
  return {
    caption: raw
      .slice(0, index)
      .replace(/[，,·\s]+$/, '')
      .trim(),
    // 页脚已经有「© 年份」，署名只留摄影者，避免出现两个版权符号
    credit: raw
      .slice(index)
      .replace(/[()（）©]/g, '')
      .trim(),
  };
};

/**
 * 每日一图。图片先解码成功才对外可见，避免出现半张图；
 * 接口或图片失败时保持空串，版面继续用纯色底，首屏不依赖这个请求。
 */
export const useDailyImage = (enabled: boolean) => {
  const [image, setImage] = useState<DailyImage | null>(null);

  useEffect(() => {
    if (!enabled || image) return;

    let cancelled = false;
    const api = import.meta.env.VITE_WALLPAPER_API || siteConfig.apis.wallpaper;

    // 背景图不在首屏关键路径上，接口偶发十几秒才响应，给比默认更宽的预算
    fetchJson<WallpaperResponse>(api, 20000)
      .then((data) => {
        if (!data?.url) return;
        const { url } = data;
        const { caption, credit } = splitCopyright(data.copyright);
        const probe = new Image();
        probe.onload = () => {
          if (!cancelled) setImage({ url, caption, credit });
        };
        probe.src = url;
      })
      .catch(() => {
        // 接口失败时保持纯色底
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, image]);

  return image;
};
