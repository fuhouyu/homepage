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
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { GlobalStyle } from '@/styles/style';
import { LayoutMain } from '@/layouts';
import { AppThemeProvider } from '@/context/AppThemeContext';
import { APP_MODE_STORAGE_KEY, getAntdTheme, type AppMode } from '@/styles/theme';

const readInitialMode = (): AppMode => {
  try {
    const saved = window.localStorage.getItem(APP_MODE_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'scene') return saved;
  } catch {
    // 隐私模式下 localStorage 不可用，直接回退默认主题
  }
  return 'light';
};

export const App = () => {
  const [mode, setMode] = useState<AppMode>(readInitialMode);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    try {
      window.localStorage.setItem(APP_MODE_STORAGE_KEY, mode);
    } catch {
      // 忽略存储异常
    }
  }, [mode]);

  return (
    <ConfigProvider locale={zhCN} theme={getAntdTheme(mode)}>
      <AppThemeProvider mode={mode} setMode={setMode}>
        <GlobalStyle />
        <LayoutMain />
      </AppThemeProvider>
    </ConfigProvider>
  );
};
