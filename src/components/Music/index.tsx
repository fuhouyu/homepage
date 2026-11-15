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
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Tooltip } from 'antd';
import {
  CustomerServiceOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';
import { MiniAlbum, MusicActions, MusicSection, SongInfo } from '@/components/Music/style';
import { useLyric } from '@/context/LyricContext';
import { fetchJson, fetchText } from '@/utils/request';

interface SongResponse {
  name?: string;
  artist?: string;
  url?: string;
  pic?: string;
  lrc?: string;
}

interface Song {
  title: string;
  artist: string;
  url: string;
  cover: string;
}

interface LyricLine {
  time: number;
  text: string;
}

const parseLrc = (lrc: string): LyricLine[] =>
  lrc
    .split('\n')
    .map((line) => {
      const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
      if (!match) return null;
      return {
        time: parseInt(match[1], 10) * 60 + parseFloat(match[2]),
        text: match[3].trim(),
      };
    })
    .filter((line): line is LyricLine => line !== null);

export const Music = () => {
  const { setCurrentLrc } = useLyric();
  const [song, setSong] = useState<Song | null>(null);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const loadLyrics = useCallback(async (url?: string) => {
    if (!url) {
      setLyrics([]);
      return;
    }
    try {
      setLyrics(parseLrc(await fetchText(url)));
    } catch {
      setLyrics([]);
    }
  }, []);

  const loadSong = useCallback(async () => {
    const api = import.meta.env.VITE_SONG_API;
    if (!api) return;

    const params = new URLSearchParams({
      server: import.meta.env.VITE_SONG_SERVER || 'netease',
      type: import.meta.env.VITE_SONG_TYPE || 'playlist',
      id: import.meta.env.VITE_SONG_ID || '',
    });

    try {
      const list = await fetchJson<SongResponse[]>(`${api}?${params.toString()}`);
      if (!Array.isArray(list) || list.length === 0) return;
      const item = list[Math.floor(Math.random() * list.length)];
      setSong({
        title: item.name || '未知曲目',
        artist: item.artist || '未知艺术家',
        url: item.url || '',
        cover: item.pic || '',
      });
      setIsPlaying(false);
      setCurrentLrc('');
      await loadLyrics(item.lrc);
    } catch {
      setSong(null);
    }
  }, [loadLyrics, setCurrentLrc]);

  useEffect(() => {
    void loadSong();
  }, [loadSong]);

  const handleTimeUpdate = (currentTime: number) => {
    const activeLine = lyrics.find(
      (line, index) =>
        currentTime >= line.time && (!lyrics[index + 1] || currentTime < lyrics[index + 1].time),
    );
    if (activeLine) setCurrentLrc(activeLine.text);
  };

  const togglePlay = () => {
    if (!audioRef.current || !song?.url) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      void audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <MusicSection>
      <audio
        ref={audioRef}
        src={song?.url || undefined}
        crossOrigin="anonymous"
        onTimeUpdate={(event) => handleTimeUpdate(event.currentTarget.currentTime)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentLrc('');
          void loadSong();
        }}
      />
      <MiniAlbum $isPlaying={isPlaying}>
        {song?.cover ? <img src={song.cover} alt="cover" /> : <CustomerServiceOutlined />}
      </MiniAlbum>

      <SongInfo>
        <div className="title">{song?.title || '音乐未配置'}</div>
        <div className="artist">{song?.artist || '在 .env 中设置 VITE_SONG_* 即可启用'}</div>
      </SongInfo>

      <MusicActions>
        <Tooltip title="换一首" arrow={false}>
          <Button
            type="text"
            size="small"
            icon={<StepForwardOutlined />}
            onClick={() => void loadSong()}
            aria-label="换一首"
          />
        </Tooltip>
        <Button
          type="text"
          size="small"
          icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={togglePlay}
          disabled={!song?.url}
          aria-label={isPlaying ? '暂停' : '播放'}
        />
      </MusicActions>
    </MusicSection>
  );
};
