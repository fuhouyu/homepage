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
import { Icon } from '@/components/Icon';
import siteConfig from '@/assets/site-config.json';
import quoteBank from '@/assets/daily-quotes.json';
import { fetchJson } from '@/utils/request';
import { dayOfYear } from '@/utils/date';

interface Quote {
  text: string;
  from: string;
  tag: string;
}

/** Hitokoto 一言接口的分类，便于直接把 VITE_DAILY_QUOTE_API 指向 v1.hitokoto.cn */
const HITOKOTO_TYPE: Record<string, string> = {
  a: '动画',
  b: '漫画',
  c: '游戏',
  d: '文学',
  e: '原创',
  f: '网络',
  g: '其他',
  h: '影视',
  i: '诗词',
  j: '网易云',
  k: '哲学',
  l: '抖机灵',
};

const QUOTE_FIELDS: (keyof Quote)[] = ['text', 'from', 'tag'];

const isQuote = (value: unknown): value is Quote => {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return QUOTE_FIELDS.every((field) => typeof item[field] === 'string');
};

/** 兼容单条一言接口：{ hitokoto, from, from_who, type } */
const fromHitokoto = (data: unknown): Quote | null => {
  if (!data || typeof data !== 'object') return null;
  const item = data as Record<string, unknown>;
  if (typeof item.hitokoto !== 'string' || !item.hitokoto) return null;
  const from =
    typeof item.from_who === 'string' && item.from_who
      ? item.from_who
      : typeof item.from === 'string'
        ? item.from
        : '';
  const type = typeof item.type === 'string' ? item.type : '';
  return { text: item.hitokoto, from, tag: HITOKOTO_TYPE[type] ?? '' };
};

/** 兼容句库接口：数组或 { quotes: [...] } */
const resolveList = (data: unknown): unknown => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object' && 'quotes' in data) {
    return (data as { quotes?: unknown }).quotes;
  }
  return undefined;
};

const localQuotes = quoteBank.quotes.filter(isQuote);
const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

export const Hero = () => {
  const [offset, setOffset] = useState(0);
  const [remote, setRemote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_DAILY_QUOTE_API || siteConfig.dailyQuote.api;

  useEffect(() => {
    if (!api) return;
    let cancelled = false;
    setLoading(true);

    fetchJson<unknown>(api)
      .then((data) => {
        const single = fromHitokoto(data);
        if (single) {
          if (!cancelled) setRemote(single);
          return;
        }
        const list = resolveList(data);
        if (!Array.isArray(list)) return;
        const valid = list.filter(isQuote);
        if (valid.length && !cancelled) {
          setRemote(valid[(dayOfYear() + offset) % valid.length]);
        }
      })
      .catch(() => {
        // 外部接口不可用时继续使用内置句库
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [api, offset]);

  const fallback = localQuotes.length
    ? localQuotes[(dayOfYear() + offset) % localQuotes.length]
    : undefined;
  const current = remote ?? fallback;

  const speak = () => {
    if (!canSpeak || !current) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(current.text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  if (!current) return null;

  return (
    <section className="flex flex-col gap-3.5 md:gap-4">
      {/* 控制按钮跟着栏标走，不与句末署名隔着一整块版面 */}
      <div className="flex items-center justify-between gap-6">
        <h2 className="kicker">每日一言</h2>
        <div className="flex items-center gap-1.5">
          <button type="button" className="text-btn" onClick={speak} disabled={!canSpeak}>
            <Icon name="speaker" size={13} />
            朗读
          </button>
          <button
            type="button"
            className="text-btn"
            onClick={() => setOffset((value) => value + 1)}
            disabled={loading}
          >
            <Icon name="shuffle" size={13} />
            换一条
          </button>
        </div>
      </div>

      <blockquote className="quote">“{current.text}”</blockquote>

      <p className="text-shadowed flex flex-wrap items-center gap-x-3 gap-y-1.5 text-meta text-muted">
        <span aria-hidden className="bg-rule h-px w-10 shrink-0" />
        <span>{current.from || '佚名'}</span>
        {current.tag ? <span className="text-faint">· {current.tag}</span> : null}
      </p>
    </section>
  );
};
