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
import { Icon, weatherIcon } from '@/components/Icon';
import siteConfig from '@/assets/site-config.json';
import { fetchJson } from '@/utils/request';

interface OpenMeteoResponse {
  current?: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
  };
  daily?: {
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
  };
}

interface WeatherBrief {
  temperature: number;
  feels: number;
  code: number;
  max: number;
  min: number;
}

const WEATHER_TEXT: Record<number, string> = {
  0: '晴朗',
  1: '晴间多云',
  2: '多云',
  3: '阴天',
  45: '有雾',
  48: '雾凇',
  51: '小毛毛雨',
  53: '毛毛雨',
  55: '大毛毛雨',
  56: '冻毛毛雨',
  57: '强冻毛毛雨',
  61: '小雨',
  63: '中雨',
  65: '大雨',
  66: '冻雨',
  67: '强冻雨',
  71: '小雪',
  73: '中雪',
  75: '大雪',
  77: '雪粒',
  80: '小阵雨',
  81: '阵雨',
  82: '强阵雨',
  85: '小阵雪',
  86: '强阵雪',
  95: '雷雨',
  96: '雷雨伴冰雹',
  99: '强雷雨伴冰雹',
};

export const Weather = () => {
  const [weather, setWeather] = useState<WeatherBrief | null>(null);
  const [failed, setFailed] = useState(false);

  const city =
    import.meta.env.VITE_WEATHER_CITY || import.meta.env.VITE_CITY || siteConfig.weather.city;
  const latitude = Number(import.meta.env.VITE_WEATHER_LAT) || siteConfig.weather.latitude;
  const longitude = Number(import.meta.env.VITE_WEATHER_LON) || siteConfig.weather.longitude;
  const timezone = import.meta.env.VITE_WEATHER_TZ || siteConfig.weather.timezone;
  const api = import.meta.env.VITE_WEATHER_API || siteConfig.apis.weather;

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      current: 'temperature_2m,apparent_temperature,weather_code',
      daily: 'temperature_2m_max,temperature_2m_min',
      timezone,
      forecast_days: '1',
    });

    fetchJson<OpenMeteoResponse>(`${api}?${params.toString()}`)
      .then((data) => {
        if (cancelled) return;
        if (!data.current) {
          setFailed(true);
          return;
        }
        const current = data.current;
        setWeather({
          temperature: Math.round(current.temperature_2m),
          feels: Math.round(current.apparent_temperature),
          code: current.weather_code,
          max: Math.round(data.daily?.temperature_2m_max?.[0] ?? current.temperature_2m),
          min: Math.round(data.daily?.temperature_2m_min?.[0] ?? current.temperature_2m),
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [api, latitude, longitude, timezone]);

  const condition = weather ? (WEATHER_TEXT[weather.code] ?? '未知天气') : '';
  const detail = weather
    ? `${city} ${weather.temperature}° ${condition}，体感 ${weather.feels}°，今日 ${weather.max}°/${weather.min}°`
    : failed
      ? `${city} 天气暂时不可用`
      : `${city} 天气加载中`;

  return (
    <section className="flex flex-col gap-1" aria-label={detail}>
      <h2 className="kicker">
        {city} · {weather ? condition : failed ? '天气不可用' : '加载中'}
      </h2>

      <div className="flex items-center gap-3">
        <Icon
          name={weather ? weatherIcon(weather.code) : 'cloud'}
          size={34}
          strokeWidth={1.5}
          className="text-accent-ink shrink-0"
        />
        {weather ? (
          <p className="text-figure num text-shadowed font-light text-ink">
            {weather.temperature}°
          </p>
        ) : failed ? (
          <p className="text-figure num text-shadowed font-light text-faint">—</p>
        ) : (
          <i aria-hidden className="skeleton block h-8 w-16 rounded-sm" />
        )}
      </div>

      {weather ? (
        <p className="text-shadowed text-meta text-muted" title={detail}>
          今日 {weather.max}°/{weather.min}° · 体感 {weather.feels}°
        </p>
      ) : failed ? null : (
        <i aria-hidden className="skeleton block h-3 w-36 rounded-sm" />
      )}
    </section>
  );
};
