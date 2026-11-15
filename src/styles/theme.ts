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
import { theme, type ThemeConfig } from 'antd';

export type AppMode = 'light' | 'dark' | 'scene';

export const APP_MODE_STORAGE_KEY = 'fuhouyu-app-mode';

export const getAntdTheme = (mode: AppMode): ThemeConfig => {
  const isDark = mode === 'dark';

  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#2F7A63',
      colorInfo: '#2F7A63',
      colorSuccess: '#2F7A63',
      colorText: isDark ? '#EDEEEB' : '#1D211E',
      colorTextSecondary: isDark ? 'rgba(237,238,235,0.66)' : '#616A63',
      colorTextTertiary: isDark ? 'rgba(237,238,235,0.45)' : '#8B948C',
      colorBgContainer: isDark ? '#1B1F1C' : '#FFFFFF',
      colorBgElevated: isDark ? '#222723' : '#FFFFFF',
      colorBgLayout: 'transparent',
      colorBorder: isDark ? 'rgba(255,255,255,0.12)' : '#E4E8E2',
      colorBorderSecondary: isDark ? 'rgba(255,255,255,0.08)' : '#EEF1EC',
      borderRadius: 12,
      borderRadiusLG: 16,
      fontSize: 14,
      controlHeight: 36,
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    },
    components: {
      Card: {
        paddingLG: 20,
      },
      Segmented: {
        itemSelectedBg: isDark ? '#2C342E' : '#FFFFFF',
      },
      Input: {
        activeShadow: 'none',
      },
      Select: {
        optionSelectedBg: isDark ? '#2C342E' : '#EDF4EF',
      },
    },
  };
};
