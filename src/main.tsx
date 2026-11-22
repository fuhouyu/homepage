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
import { createRoot } from 'react-dom/client';
import '@/styles/tokens.css';
import { bootNeeded } from '@/components/Boot';
import { App } from '@/App';

/* 渲染前先把挂起标记立好：晚一帧，头版的落位就会在遮罩底下演完 */
if (bootNeeded()) document.documentElement.dataset.booting = '';

createRoot(document.getElementById('root')!).render(<App />);
