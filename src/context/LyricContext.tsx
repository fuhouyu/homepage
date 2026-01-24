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
import React, { createContext, useContext, useState } from 'react';

interface LyricContextType {
  currentLrc: string;
  setCurrentLrc: (lrc: string) => void;
}

const LyricContext = createContext<LyricContextType | undefined>(undefined);

export const LyricProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLrc, setCurrentLrc] = useState('');

  return (
    <LyricContext.Provider value={{ currentLrc, setCurrentLrc }}>{children}</LyricContext.Provider>
  );
};

export const useLyric = () => {
  const context = useContext(LyricContext);
  if (!context) throw new Error('useLyric must be used within a LyricProvider');
  return context;
};
