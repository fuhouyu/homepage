# fuhouyu.com

基于 **React 19 + Vite + Ant Design 6 + styled-components** 的个人聚合主页。

定位是聚合式起始页：时间、天气、每日一言、搜索、快捷入口、音乐都在一屏内，不放项目、不写博客、不放个人自述。文案、句库、链接、接口地址全部通过配置或环境变量注入，代码里没有硬编码。

**🚀 [演示地址](https://fuhouyu.com)**

---

## 页面结构

| 区块 | 内容 |
| :--- | :--- |
| Hero | 问候语、每日一言（句子 / 出处 / 分类 / 朗读 / 换一条）、城市 / 邮箱 / GitHub / Paste 入口、当天日期 |
| 搜索 | 必应 / 谷歌 / 百度 / DuckDuckGo，`Alt + /`、`/`、`⌘/Ctrl + K` 聚焦，`Esc` 失焦 |
| 时间 | 本地时钟 + 日期 + 音乐播放器（歌词滚动到顶栏） |
| 天气 | Open-Meteo：实时温度、体感、湿度、风速、今日高低温、天气图标 |
| 快捷入口 | 「我的 / 常去」两组共 8 个，桌面每行最多 5 个，平板 3 个，手机 2 个 |
| 页头 / 页脚 | 日期、主题切换、歌词、备案、Paste / GitHub / Email |

右上角可切换 **浅色 / 暗色 / 壁纸** 三种模式。壁纸异步加载且失败自动降级，首屏不依赖任何外部接口；所有请求都有超时与兜底。

### 每日一言

默认读取 `src/assets/daily-quotes.json`（30 句，可自行增删），按「一年中的第几天」取值，所以**同一天刷新始终是同一句**；点右上角按钮可临时换一条。朗读使用浏览器内置 `speechSynthesis`，不请求外部服务。

`VITE_DAILY_QUOTE_API` 有三种用法，接口不可用都会自动回退到内置句库：

| 填的值 | 行为 |
| :--- | :--- |
| 留空 | 只用内置句库，按日期固定 |
| `https://v1.hitokoto.cn` | 走 Hitokoto 单条一言接口（随机一句，点换一条重新请求） |
| 自己的 JSON 地址 | 返回 `{ "quotes": [...] }` 或数组，字段 `text / from / tag`，按日期取句 |

## 配置

复制 `.env.example` 为 `.env`（开发用 `.env.dev`），按注释填写。留空的项会回退到 `src/assets/site-config.json` 的默认值。

| 变量 | 用途 |
| :--- | :--- |
| `VITE_SITE_*` / `VITE_GITHUB_USERNAME` / `VITE_CITY` / `VITE_EMAIL` | SEO 与身份信息 |
| `VITE_PASTE_URL` | Paste 子站地址，默认 `https://paste.fuhouyu.com` |
| `VITE_WEATHER_*` | Open-Meteo 接口、城市、经纬度、时区 |
| `VITE_DAILY_QUOTE_API` | 每日一言数据源，留空用内置句库 |
| `VITE_WALLPAPER_API` | 壁纸模式下的每日一图 |
| `VITE_SONG_*` | Meting 音乐源、类型与资源 ID |
| `VITE_ICP` | 备案号，留空则页脚不显示 |

`src/assets/site-config.json` 管理搜索引擎、导航分组、天气默认坐标和每日一言标题。导航项支持 `envKey`（`paste` / `github` / `email`），会自动取环境变量里的地址；加站点、删站点只改这个 JSON，不用动组件。

## 挂到 paste.fuhouyu.com

主站导航「我的」分组和页脚都已有 **Paste** 入口，地址由 `VITE_PASTE_URL` 控制。若要把同一份页面作为子站挂到 `paste.fuhouyu.com`：

1. 在 Cloudflare Pages 的该项目里进入 **Custom domains** → **Set up a custom domain**，填 `paste.fuhouyu.com`，按提示添加 CNAME。
2. 复制一份环境变量，把 `VITE_PASTE_URL` 指回主域即可。
3. 如果只想让子站指向别的服务（例如自建 pastebin），无需改代码：把 `VITE_PASTE_URL` 换成目标地址，导航与页脚会同步生效。

## 部署（Cloudflare Pages）

| 项 | 值 |
| :--- | :--- |
| Framework preset | `Vite`（或 `None`） |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20+ |

在 Pages 的环境变量里填入与 `.env` 相同的键即可。

## 本地开发

```bash
pnpm install
cp .env.example .env.dev   # 按自己情况修改
pnpm dev                    # 默认 http://localhost:5173
pnpm lint
pnpm build
```

## 第三方接口

| 接口 | 用途 |
| :--- | :--- |
| `https://api.open-meteo.com/v1/forecast` | 天气 |
| `https://bing.biturl.top/` | 壁纸模式下的每日一图 |
| `https://api.injahow.cn/meting/` | 音乐与歌词 |

全部可替换，且任一接口失败都不会影响页面其它部分。
