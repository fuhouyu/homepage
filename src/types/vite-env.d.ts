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
interface ImportMetaEnv {
  // 站点 SEO
  readonly VITE_SITE_NAME: string;
  readonly VITE_SITE_KEYWORDS: string;
  readonly VITE_SITE_DES: string;
  readonly VITE_SITE_AUTHOR: string;
  readonly VITE_GITHUB_USERNAME: string;
  readonly VITE_CITY: string;
  readonly VITE_EMAIL: string;

  // 站点入口
  readonly VITE_PASTE_URL: string;

  // 天气
  readonly VITE_WEATHER_API: string;
  readonly VITE_WEATHER_CITY: string;
  readonly VITE_WEATHER_LAT: string;
  readonly VITE_WEATHER_LON: string;
  readonly VITE_WEATHER_TZ: string;

  // 聚合数据源
  readonly VITE_DAILY_QUOTE_API: string;
  readonly VITE_WALLPAPER_API: string;

  // 音乐配置
  readonly VITE_SONG_API: string;
  readonly VITE_SONG_SERVER: string;
  readonly VITE_SONG_TYPE: string;
  readonly VITE_SONG_ID: string;

  // 备案号
  readonly VITE_ICP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
