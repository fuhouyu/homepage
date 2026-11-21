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
import { Icon } from '@/components/Icon';
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

/** 右侧状态栏里的播放面板：封面 + 曲目 + 当前歌词 + 播放控制 */
export const Music = () => {
  const [song, setSong] = useState<Song | null>(null);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [activeLrc, setActiveLrc] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty'>('loading');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const loadSong = useCallback(async () => {
    const api = import.meta.env.VITE_SONG_API;
    if (!api) {
      setStatus('empty');
      return;
    }

    const params = new URLSearchParams({
      server: import.meta.env.VITE_SONG_SERVER || 'netease',
      type: import.meta.env.VITE_SONG_TYPE || 'playlist',
      id: import.meta.env.VITE_SONG_ID || '',
    });

    try {
      const list = await fetchJson<SongResponse[]>(`${api}?${params.toString()}`);
      if (!Array.isArray(list) || list.length === 0) {
        setStatus('empty');
        return;
      }
      const item = list[Math.floor(Math.random() * list.length)];
      setSong({
        title: item.name || '未知曲目',
        artist: item.artist || '未知艺术家',
        url: item.url || '',
        cover: item.pic || '',
      });
      setActiveLrc('');
      setIsPlaying(false);
      setLyrics(item.lrc ? parseLrc(await fetchText(item.lrc)) : []);
      setStatus('ready');
    } catch {
      setStatus('empty');
    }
  }, []);

  useEffect(() => {
    void loadSong();
  }, [loadSong]);

  const handleTimeUpdate = (currentTime: number) => {
    const activeLine = lyrics.find(
      (line, index) =>
        currentTime >= line.time && (!lyrics[index + 1] || currentTime < lyrics[index + 1].time),
    );
    if (activeLine) setActiveLrc(activeLine.text);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !song?.url) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  /* 曲目到达前占好位置，否则播放块会在状态栏里凭空长出来 */
  if (status === 'loading')
    return (
      <section className="flex flex-col gap-2" aria-label="正在播放">
        <h2 className="kicker">正在播放</h2>
        <div className="flex items-center gap-3">
          <span aria-hidden className="skeleton block h-10 w-10 shrink-0 rounded-lg" />
          <span aria-hidden className="flex min-w-0 flex-1 flex-col gap-2">
            <i className="skeleton block h-4 w-28 rounded-sm" />
            <i className="skeleton block h-3 w-20 rounded-sm" />
          </span>
        </div>
        <i aria-hidden className="skeleton block h-3 w-24 rounded-sm" />
      </section>
    );

  if (!song) return null;

  return (
    <section className="flex flex-col gap-2" aria-label={`正在播放 ${song.title} — ${song.artist}`}>
      <audio
        ref={audioRef}
        src={song.url || undefined}
        crossOrigin="anonymous"
        onTimeUpdate={(event) => handleTimeUpdate(event.currentTarget.currentTime)}
        onEnded={() => {
          setActiveLrc('');
          void loadSong();
        }}
      />

      <h2 className="kicker">正在播放</h2>

      <div className="flex items-center gap-3">
        {song.cover ? (
          <img
            src={song.cover}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
            className="h-10 w-10 shrink-0 rounded-lg object-cover shadow-panel"
          />
        ) : (
          <span className="bg-accent-soft text-accent-ink flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
            <Icon name="music" size={20} />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-shadowed truncate text-title text-ink" title={song.title}>
            {song.title}
          </p>
          <p className="text-shadowed truncate text-meta text-muted" title={song.artist}>
            {song.artist}
          </p>
        </div>
      </div>

      {/* 歌词与控件挤成一条：状态栏只有 22rem，纵向每省一行都是版面 */}
      <div className="flex items-center gap-3">
        <p
          className="text-shadowed min-h-6 flex-1 truncate text-meta text-muted"
          title={activeLrc || song.title}
        >
          {activeLrc ? `♪ ${activeLrc}` : isPlaying ? '♪ 纯音乐 / 暂无歌词' : '♪ 待播放'}
        </p>

        <span className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="icon-btn icon-btn-primary"
            onClick={togglePlay}
            disabled={!song.url}
            aria-label={isPlaying ? '暂停' : '播放'}
          >
            <Icon name={isPlaying ? 'pause' : 'play'} size={15} />
          </button>

          <button
            type="button"
            className="icon-btn"
            onClick={() => void loadSong()}
            aria-label="换一首"
          >
            <Icon name="shuffle" size={15} />
          </button>
        </span>
      </div>
    </section>
  );
};
