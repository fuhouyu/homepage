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
import React, { createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export type AppMode = 'light' | 'dark';

export const APP_MODE_STORAGE_KEY = 'fuhouyu-app-mode';
export const WALLPAPER_STORAGE_KEY = 'fuhouyu-wallpaper-on';

/** 视图转场是渐进增强：Chrome / Safari 有，其它浏览器直接落回瞬时切换 */
type TransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

const readStored = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // 隐私模式下 localStorage 不可用，直接回退默认主题
    return null;
  }
};

const writeStored = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // 忽略存储异常
  }
};

interface AppThemeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  wallpaper: boolean;
  setWallpaper: (on: boolean) => void;
}

const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<AppMode>(() =>
    readStored(APP_MODE_STORAGE_KEY) === 'dark' ? 'dark' : 'light',
  );
  // 头版图默认打开：照片是这套版面的主体，只有明确关掉过才是关
  const [wallpaper, setWallpaper] = useState(() => readStored(WALLPAPER_STORAGE_KEY) !== 'off');

  /* 三套底是整页换色，一帧切完会像闪了一下。视图转场负责交叉淡入，
     但它要求 DOM 在回调里同步改完，所以状态更新走 flushSync。 */
  const setMode = (next: AppMode) => {
    const doc = document as TransitionDocument;
    const apply = () => {
      document.documentElement.dataset.theme = next;
      writeStored(APP_MODE_STORAGE_KEY, next);
      flushSync(() => setModeState(next));
    };
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (doc.startViewTransition && !reduced) doc.startViewTransition(apply);
    else apply();
  };

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    writeStored(APP_MODE_STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    writeStored(WALLPAPER_STORAGE_KEY, wallpaper ? 'on' : 'off');
  }, [wallpaper]);

  return (
    <AppThemeContext.Provider value={{ mode, setMode, wallpaper, setWallpaper }}>
      {children}
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context) throw new Error('useAppTheme must be used within an AppThemeProvider');
  return context;
};
