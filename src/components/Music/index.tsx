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
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLyric } from '@/context/LyricContext';
import { AnyObject } from 'antd/es/_util/type';
import { MiniAlbum, MusicSection } from '@/components/Music/style';

// 解析 LRC 文本的工具函数
const parseLrc = (lrcStr: string) => {
  const lines = lrcStr.split('\n');
  return lines
    .map((line) => {
      const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
      if (match) {
        return {
          time: parseInt(match[1]) * 60 + parseFloat(match[2]),
          text: match[3].trim(),
        };
      }
      return null;
    })
    .filter((item) => item !== null) as { time: number; text: string }[];
};

interface MusicProps {
  onTimeUpdate?: (time: number) => void;
  onSongChange?: (lrcUrl: string) => void;
}

export const Music = ({ onTimeUpdate, onSongChange }: MusicProps) => {
  const { setCurrentLrc } = useLyric();
  const [song, setSong] = useState<AnyObject>();
  const [lyrics, setLyrics] = useState<{ time: number; text: string }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 获取歌词文本的具体逻辑
  const handleLyricsFetch = useCallback(async (lrcUrl: string) => {
    if (!lrcUrl) return;
    try {
      const res = await fetch(lrcUrl);
      const data = await res.text();
      const parsed = parseLrc(data);
      setLyrics(parsed);
    } catch (e) {
      console.error('获取歌词失败', e);
      setLyrics([]);
    }
  }, []);

  // 获取歌曲列表并随机选择
  const fetchMusic = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SONG_API}?server=${import.meta.env.VITE_SONG_SERVER}&type=${import.meta.env.VITE_SONG_TYPE}&id=${import.meta.env.VITE_SONG_ID}`,
      );
      const list = await res.json();
      if (Array.isArray(list) && list.length > 0) {
        const item = list[Math.floor(Math.random() * list.length)];
        setSong({
          id: item.id,
          title: item.name,
          artist: item.artist,
          url: item.url,
          cover: item.pic,
        });

        // 处理歌词 URL
        if (item.lrc) {
          await handleLyricsFetch(item.lrc);
        }

        setIsPlaying(false);
        if (onSongChange) onSongChange(item.lrc);
      }
    } catch (e) {
      console.error('音乐加载失败', e);
    }
  }, [onSongChange, handleLyricsFetch]);

  useEffect(() => {
    fetchMusic().then();
  }, [fetchMusic]);

  // 音频进度监听
  const handleAudioTimeUpdate = (currentTime: number) => {
    onTimeUpdate?.(currentTime);

    // 寻找当前时间对应的歌词行
    const activeLine = lyrics.find((line, index) => {
      const nextLine = lyrics[index + 1];
      return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
    });

    if (activeLine) {
      setCurrentLrc(activeLine.text);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current || !song?.url) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  return (
    <MusicSection onClick={togglePlay}>
      <audio
        ref={audioRef}
        src={song?.url || null}
        crossOrigin="anonymous"
        onTimeUpdate={(e) => handleAudioTimeUpdate(e.currentTarget.currentTime)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentLrc('');
          fetchMusic().then();
        }}
      />
      <MiniAlbum $isPlaying={isPlaying}>
        {song?.cover && <img src={song.cover} alt="cover" />}
      </MiniAlbum>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#fff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {song?.title || '正在加载...'}
        </div>
        <div style={{ fontSize: '0.7rem', opacity: 0.6, color: '#fff' }}>{song?.artist}</div>
      </div>
      <div style={{ fontSize: '20px', opacity: 0.8, color: '#fff' }}>
        {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
      </div>
    </MusicSection>
  );
};
