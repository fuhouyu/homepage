# 个人主页

基于 **React** + **Vite** + **Ant Design** 的个人主页。

---

## ⚙️ 环境变量配置

在项目根目录下创建 `.env` 文件，并参考以下配置进行设置：

```env
# --- 站点 SEO 配置 ---
VITE_SITE_NAME=             # 网站标题
VITE_SITE_KEYWORDS=  # 关键词 (SEO)
VITE_SITE_DES=          # 网站描述 (SEO)
VITE_SITE_AUTHOR=            # 作者名称

# --- 用户信息 ---
VITE_GITHUB_USERNAME=        # GitHub 用户名
VITE_CITY=                       # 所在城市
VITE_EMAIL=         # 联系邮箱

# --- 音乐播放配置 ---
VITE_SONG_API=https://api.example.com/music  # 音乐解析 API
VITE_SONG_SERVER=netease                      # 数据源: netease (网易云), tencent (QQ)
VITE_SONG_TYPE=playlist                       # 类型: song (单曲), playlist (歌单)
VITE_SONG_ID=                       # 资源 ID

# --- 备案与合规 ---
VITE_ICP=浙ICP备XXXXXXXX号          # 网站备案号
```

## 🚀 部署说明 (Cloudflare Pages)

### 1. 基础部署流程

1. **Fork 本项目**：点击页面右上角的 `Fork` 按钮，将代码克隆到你的个人仓库。
2. **连接 Cloudflare**：
    - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
    - 导航至 **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**。
3. **选择仓库**：选择你刚刚 Fork 的 `homepage` 项目。
4. **构建配置**：
    - **Framework preset**: `Vite` (或保持 `None`)
    - **Build command**: `npm run build`
    - **Build output directory**: `dist`
5. **保存并部署**：点击 `Save and Deploy`，等待约 1 分钟即可通过生成的域名访问。

---

## 🔌 API 接口清单

本项目主要调用的第三方 API 地址及用途如下：

| API 地址                                       | 用途描述                        |
|:---------------------------------------------|:----------------------------|
| `http://ip-api.com/json/`                    | 获取用户实时 IP、地理位置及经纬度          |
| `https://v1.hitokoto.cn/`                    | 一言 (Hitokoto) - 首页随机励志/文学句子 |
| `https://api.injahow.cn/meting/`             | 音乐                          |
| `https://api.dicebear.com/7.x/avataaars/svg` | 头像                          |
| `https://api.open-meteo.com/v1/forecast`     | 天气                          |
| `https://bing.biturl.top/`                   | 必应每日一图                      |

---

## 💻 本地开发

1. **克隆项目**: `git clone https://github.com/fuhouyu/homepage.git`
2. **安装依赖**: `npm install`  # 或 pnpm install
3. **配置环境**: 配置`.env`环境变量
4. **启动项目**: `npm run dev`