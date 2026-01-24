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
import React from 'react';
import { StyledFooter } from '@/layouts/components/style';

export const LayoutFooter = () => {
  const currentYear = new Date().getFullYear();
  const username = import.meta.env.VITE_GITHUB_USERNAME;

  return (
    <StyledFooter>
      <div>
        © {currentYear} <strong>{username}</strong>. All Rights Reserved.
      </div>
      <div style={{ display: 'flex', gap: '15px', opacity: 0.6 }}>
        {import.meta.env.VITE_ICP && (
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#fff' }}
          >
            {import.meta.env.VITE_ICP}
          </a>
        )}
        <span>Designed by React & AntD</span>
      </div>
    </StyledFooter>
  );
};
