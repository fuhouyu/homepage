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
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const MusicSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid var(--app-border);
  border-radius: 12px;
  background: var(--app-surface-soft);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--app-border-strong);
  }
`;

export const MiniAlbum = styled.div<{ $isPlaying: boolean }>`
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--app-accent-soft);
  color: var(--app-accent);
  font-size: 15px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    animation: ${rotate} 12s linear infinite;
    animation-play-state: ${(props) => (props.$isPlaying ? 'running' : 'paused')};
  }
`;

export const SongInfo = styled.div`
  flex: 1;
  min-width: 0;

  .title {
    font-size: 13px;
    font-weight: 500;
    color: var(--app-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist {
    margin-top: 2px;
    font-size: 11px;
    color: var(--app-text-faint);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const MusicActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  color: var(--app-text-muted);
`;
