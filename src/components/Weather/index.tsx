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
import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { CardTitle, SectionLabel } from '@/styles/style';
import {
  MetricRow,
  WeatherCardStyled,
  WeatherDesc,
  WeatherFallback,
  WeatherIconBox,
  WeatherTemp,
  WeatherTop,
} from './style';
import siteConfig from '@/assets/site-config.json';
import { fetchJson } from '@/utils/request';

interface OpenMeteoResponse {
  current?: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily?: {
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
  };
}

interface WeatherState {
  temperature: number;
  apparent: number;
  humidity: number;
  wind: number;
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

const getWeatherKind = (code: number) => {
  if (code <= 1) return 'clear';
  if (code === 2 || code === 3 || code === 45 || code === 48) return 'cloud';
  if (code >= 95) return 'thunder';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  return 'cloud';
};

const WeatherIcon = ({ code }: { code: number }) => {
  const kind = getWeatherKind(code);
  const sun = (
    <g>
      <circle cx="26" cy="25" r="8" fill="var(--app-accent)" opacity="0.9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="26"
          y1="10"
          x2="26"
          y2="14"
          stroke="var(--app-accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          transform={`rotate(${angle} 26 25)`}
        />
      ))}
    </g>
  );
  const cloud = (
    <path
      d="M16 43 a9 9 0 0 1 2-17 a12 12 0 0 1 23 2 a9 9 0 0 1 5 17 z"
      fill="var(--app-surface-soft)"
      stroke="var(--app-accent)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  );

  return (
    <svg viewBox="0 0 64 64" width="62" height="62" role="img" aria-label="天气图标">
      {kind === 'clear' && sun}
      {kind === 'cloud' && (
        <>
          {code <= 3 && <g opacity="0.55">{sun}</g>}
          {cloud}
        </>
      )}
      {kind === 'rain' && (
        <>
          {cloud}
          <path
            d="M23 48 l-3 7 M33 48 l-3 7 M43 48 l-3 7"
            stroke="var(--app-accent)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      )}
      {kind === 'snow' && (
        <>
          {cloud}
          <g fill="var(--app-accent)">
            <circle cx="22" cy="52" r="1.8" />
            <circle cx="33" cy="54" r="1.8" />
            <circle cx="44" cy="52" r="1.8" />
          </g>
        </>
      )}
      {kind === 'thunder' && (
        <>
          {cloud}
          <path
            d="M34 46 l-7 9 h6 l-3 7"
            fill="none"
            stroke="var(--app-accent)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {code === 45 || code === 48 ? (
        <path
          d="M18 50 H48 M22 55 H44"
          stroke="var(--app-accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.7"
        />
      ) : null}
    </svg>
  );
};

export const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherState | null>(null);
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
      current:
        'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min',
      timezone,
      forecast_days: '1',
    });

    fetchJson<OpenMeteoResponse>(`${api}?${params.toString()}`)
      .then((data) => {
        if (cancelled || !data.current) {
          if (!cancelled) setFailed(true);
          return;
        }
        const current = data.current;
        setWeather({
          temperature: current.temperature_2m,
          apparent: current.apparent_temperature,
          humidity: current.relative_humidity_2m,
          wind: current.wind_speed_10m,
          code: current.weather_code,
          max: data.daily?.temperature_2m_max?.[0] ?? current.temperature_2m,
          min: data.daily?.temperature_2m_min?.[0] ?? current.temperature_2m,
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [api, latitude, longitude, timezone]);

  const round = (value: number) => Math.round(value);

  return (
    <WeatherCardStyled variant="borderless">
      <CardTitle>
        <SectionLabel>天气 · WEATHER</SectionLabel>
        <span style={{ fontSize: 11, color: 'var(--app-text-faint)' }}>{city}</span>
      </CardTitle>

      {weather ? (
        <>
          <WeatherTop>
            <WeatherTemp>
              {round(weather.temperature)}
              <span className="unit">°</span>
            </WeatherTemp>
            <WeatherIconBox>
              <WeatherIcon code={weather.code} />
            </WeatherIconBox>
          </WeatherTop>
          <WeatherDesc>
            {WEATHER_TEXT[weather.code] ?? '未知天气'} · 体感 {round(weather.apparent)}°
          </WeatherDesc>
          <MetricRow>
            <div className="metric">
              <div className="metric-label">湿度</div>
              <div className="metric-value">{round(weather.humidity)}%</div>
            </div>
            <div className="metric">
              <div className="metric-label">风速</div>
              <div className="metric-value">{round(weather.wind)} km/h</div>
            </div>
            <div className="metric">
              <div className="metric-label">今日</div>
              <div className="metric-value">
                {round(weather.max)}° / {round(weather.min)}°
              </div>
            </div>
          </MetricRow>
        </>
      ) : failed ? (
        <WeatherFallback>天气暂时不可用，稍后再看看</WeatherFallback>
      ) : (
        <WeatherFallback>
          <Skeleton active paragraph={{ rows: 2 }} title={false} style={{ width: '100%' }} />
        </WeatherFallback>
      )}
    </WeatherCardStyled>
  );
};
