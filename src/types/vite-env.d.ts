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
  // github 用户名
  readonly VITE_GITHUB_USERNAME: string;
  // 城市
  readonly VITE_CITY: string;
  // email
  readonly VITE_EMAIL: string;
  // 歌曲配置
  readonly VITE_SONG_API: string;
  // 数据源
  readonly VITE_SONG_SERVER: string;
  // 歌曲类型
  readonly VITE_SONG_TYPE: string;
  // 歌曲id
  readonly VITE_SONG_ID: string;
  // 备案号
  readonly VITE_ICP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
