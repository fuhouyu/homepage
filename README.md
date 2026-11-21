# fuhouyu.com

基于 **React 19 + Vite + Tailwind CSS 4** 的个人聚合主页。

定位是聚合式起始页：时间、天气、每日一言、月历、快捷入口、音乐都在一屏内，不放项目、不写博客、不放个人自述，也不做搜索框。文案、句库、链接、接口地址全部通过配置或环境变量注入，代码里没有硬编码。

视觉上走报纸头版，并且分三种「底」：**图版**（打开头版图时，每日一图原色满幅铺开，上下各压一道遮罩、中间几乎不挡，文字一律白色带投影）、**纸版**（浅色主题下的印刷纸底）、**夜版**（暗色主题下的墨底）。三者共用同一套类名，换底只改 `html` 上的 `data-ground` / `data-theme`，组件里没有「深色就换个写法」的分支。

版面是一张垂直居中的纸：报头、正文、页脚一起居中，高屏不会在报头和正文之间裂出空洞，内容超过一屏时居中边距自动归零。报头三段式收口——衬线报名 + 粗规线 + 日期线（公历星期 · 农历 · 年内第几天）+ 细规线。桌面是「主栏 + 右侧状态栏」两栏（版心 80rem，状态栏 22rem，中间一道竖规线），主栏只留两段主叙事——细体超大时钟与衬线大字引言，天气、月历与播放压成状态栏三条旁注；平板把状态栏横排成一行，手机单列堆叠。字号最大与最小拉到约 10:1，正文 17px 起，靠悬殊而不是精致建立层级。

整页按屏高收进一屏：展示级字号与纵向气口都带 `svh` 上限，1366×768 起不需要下滑就能看完整张头版（`node .workbuddy/interact.mjs` 里有一条 `整页不出现纵向滚动` 的回归断言按 1440×860 验）。缩放只发生在标题、时钟、报名与留白上，正文 17px、meta 13px、micro 12px 在任何屏高都不缩，读不清的代价不转嫁给读者。

**🚀 [演示地址](https://fuhouyu.com)**

---

## 页面结构

| 区块 | 内容 |
| :--- | :--- |
| 站点设置 | 报头最上方的细条：主题分段控件（浅色 / 暗色）、头版图 switch、GitHub 图标按钮。设置不占用报名那一行 |
| 报头 | 展示级衬线报名，下面压粗规线、日期线（公历 / 星期 · 农历 · 年内第几天 / 总天数）与细规线 |
| 时钟 | 问候语栏标 + 到秒大字（细体，秒用强调色）+「今天 / 全年」两条进度条，无面板 |
| Hero | 每日一言：栏标与「朗读 / 换一条」同行右对齐，下面是不加引号框的衬线大字引言（悬挂标点、`text-wrap: balance`），再下面是出处与分类 |
| 状态栏 | 右侧一栏，三条旁注：天气（栏标 + 34px 现象图标 + 当前温度 + 今日高低温 / 体感）、月历（零网络请求的当月网格，周一起排，今日是强调色实心格）、播放（封面 + 曲名曲师 + 固定一行高度的歌词 + 播放 / 换一首） |
| 加载 | 顶部 2px 进度线绑定真实在途请求数，请求清零即收；天气与播放未到达时先用骨架块占住高度，内容到位不会把版面顶开 |
| 快捷入口 | 「我的 / 常去」两组并排成两列，每项是方形磁贴：站点的 favicon，取不到自动落回品牌首字母；名称在下，说明走 `title` |
| 图注 | 头版照片的图注与摄影署名合成页脚一行（`每日一图 署名 · 图注 · © 年份 · 用户名 · 城市`），版面末尾不再单占一块高度 |
| 页脚 | 每日一图署名、版权、城市、备案、Paste / GitHub / Email |

主题只有 **浅色 / 暗色** 两档，首屏绘制前由 `index.html` 内联脚本落定，不会闪白。**头版图**是独立开关且**默认打开**：打开即进入图版，文字颜色在首帧就定成白色，不等图片到达，所以不会出现整页从墨色翻成白色的跳变；照片要先解码成功才淡入，接口或图片失败则留在深色底上，仍是一套完整可读的夜版。关掉它即回到纸版 / 夜版。首屏不依赖任何外部请求，所有请求都有超时与兜底，每日一图单独给 20 秒预算。

### 每日一言

默认读取 `src/assets/daily-quotes.json`（30 句，可自行增删），按「一年中的第几天」取值，所以**同一天刷新始终是同一句**；点栏标右侧的「换一条」可临时换一句。朗读使用浏览器内置 `speechSynthesis`，不请求外部服务。

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
| `VITE_WALLPAPER_API` | 「头版图」开关打开时的每日一图 |
| `VITE_SONG_*` | Meting 音乐源、类型与资源 ID |
| `VITE_ICP` | 备案号，留空则页脚不显示 |

`src/assets/site-config.json` 管理导航分组（含每项的品牌色 `tone` 与说明 `desc`）、天气默认坐标。导航项支持 `envKey`（`paste` / `github` / `email`），会自动取环境变量里的地址；加站点、删站点只改这个 JSON，不用动组件。

## 样式与主题

全部样式集中在 `src/styles/tokens.css`：`--app-*` 是唯一 token 真源（三套底色的颜色、玻璃与遮罩、字号阶梯、字体栈、圆角、阴影、版心与状态栏宽度），Tailwind 的 `@theme inline` 只负责把这些变量映射成工具类，所以改主题只改一个文件。

- **三套底各写一遍 token**：`:root` 是纸版，`html[data-theme='dark']` 是夜版，`html[data-ground='photo']` 是图版。图版块写在另两块之后，靠同优先级下的源码顺序取胜；再往下 `html[data-ground='photo'][data-theme='light'|'dark']` 只调明暗情绪，文字两档都是白字。连文字色都跟着底走，因此组件层零条件判断。
- 图版的可读性靠**独立的遮罩层**而不是把图片调暗：`--app-scrim` 上下压到 0.82 / 0.86、中段几乎透明，照片保持原色原饱和度，正文用白字加 `--app-shadow-text`。玻璃（分段控件、图标按钮、磁贴悬停）走 `backdrop-filter: blur(18px) saturate(1.5)`。
- 强调色只用于「可交互 / 当前 / 正在发生」三类状态（月历今日格、时钟秒数与两条进度、天气图标、焦点态、开关打开、规线与图注的起笔），正文层级一律走墨色阶梯，暗色下另有一套取值。
- 版式靠规线切分：`.rule-heavy` 是 2px 粗线且左端起一段品牌色再转中性，`.hairline` 是 1px 细线，`.group-title::after` 与状态栏的 `border-left` 把目录和旁注各自收成一栏。
- 质感靠一层 `feTurbulence` 生成的去饱和噪声平铺（内联 data URI，浅色 3.8% / 暗色 4.2%，零网络请求）把纯色底拉回「纸」的感觉；图版下自动关掉，颗粒不往照片上糊。
- 入场是一次自上而下的落位：报头 → 主栏 → 状态栏 → 快捷入口按 80ms 递进淡入上浮（`.reveal` + `--rise-delay`），曲线是 `linear()` 写的 spring，落位要「咔哒」一下而不是软收；照片另有一层 1.1s 淡入。只动 `opacity / transform`，不触发重排；`prefers-reduced-motion` 下自动取消。
- 控件是真实形态而不是纯文字：主题用分段控件，头版图用 switch，播放与换一首用图标按钮，「朗读 / 换一条」用文字按钮，等待中的数据用骨架块。
- 加载不做整页 spinner，也不撒假进度：顶部那条线只反映 `fetch` 的在途数量，请求全清零它就消失；骨架只出现在真正会改变布局高度的位置，`prefers-reduced-motion` 下两者一起落回静态。
- 纵向预算写在 token 里：`--app-space-block`（块与块）、`--app-space-col`（栏内与旁注之间）、`--app-space-head`（报头三段之间）都是 `min(rem, Nsvh)`，展示级字号 `--app-text-hero|display|nameplate|figure` 在 `clamp()` 里多压一道 `Nsvh` 上限，月历格高 `min(1.55rem, max(1.125rem, 1.95svh))`。于是矮屏先吃掉留白与标题，高屏（≥1000px）仍回到原本的宽气口，两套屏高共用同一份组件代码。
- 断点写在 `tokens.css` 与工具类里：`lg` 起主栏 + 22rem 状态栏两栏，`sm`～`lg` 状态栏横排成一行并按内容高度顶对齐，更窄则单列堆叠。
- 农历用 `Intl.DateTimeFormat('zh-CN-u-ca-chinese')` 现算，月份直接取 ICU 结果、日期用 `src/utils/date.ts` 里的「初一…三十」读法表；浏览器缺 Chinese 日历支持时整段省略，不显示半截数据。
- 引言字体栈是 `Georgia → Songti SC / STSong / Noto Serif CJK SC → serif`：拉丁字母走 Georgia，汉字逐字回退到系统宋体，不加载 webfont，首屏零字体请求。中文没有词间空隙，所以大字号行高取 1.6，并用 `text-indent` 做悬挂标点。Windows 下会落到 SimSun，观感偏旧，介意的话需要自备衬线字体子集。
- 图标全部是 `src/components/Icon` 里手写的内联 SVG（统一 24 网格、1.75 描边、跟随 `currentColor`），没有第三方图标库依赖。目录磁贴的 favicon 直连 `https://{host}/favicon.ico`，同样不走第三方图标服务；取不到时首字母标记就是图标本身，不额外做空状态。
- 项目已不再依赖 antd 与 styled-components，组件全部是原生元素 + 工具类。

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
| `https://bing.biturl.top/` | 「头版图」开关打开时的每日一图 |
| `https://api.injahow.cn/meting/` | 音乐与歌词 |

全部可替换，且任一接口失败都不会影响页面其它部分。
