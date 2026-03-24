# 🎉 Yibu's Personal Website

> 周翌步小朋友的个人成长网站 | A personal website for Yibu Zhou

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ 功能特性

- 🎬 **沉浸式视频背景** - 首屏全屏视频，自动切换高清/压缩版本
- 🗺️ **足迹地图** - 交互式地图展示去过的城市，支持缩放、定位和距离标尺
- 🌐 **多语言支持** - 中英文双语切换
- 🌙 **主题切换** - 深色/浅色/系统主题
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🎨 **精美动画** - 流畅的过渡和交互效果
- ⚡ **性能优化** - 视频懒加载、渐进式加载

## 🚀 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | [Next.js 15](https://nextjs.org/) (App Router) |
| 语言 | [TypeScript](https://www.typescriptlang.org/) |
| 样式 | [Tailwind CSS](https://tailwindcss.com/) |
| UI 组件 | [shadcn/ui](https://ui.shadcn.com/) |
| 地图 | [Leaflet](https://leafletjs.com/) + [Carto](https://carto.com/) |
| 状态管理 | [Zustand](https://zustand-demo.pmnd.rs/) |
| 国际化 | [i18next](https://www.i18next.com/) |
| 部署 | [Vercel](https://vercel.com/) |

## 📁 项目结构

```
yibu/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/
│   ├── sections/          # 页面区块组件
│   │   ├── hero.tsx       # 首屏（视频背景）
│   │   ├── about.tsx      # 关于我
│   │   ├── map.tsx        # 足迹地图
│   │   ├── map-content.tsx # 地图核心组件
│   │   ├── hobbies.tsx    # 爱好展示
│   │   ├── achievements.tsx # 成就展示
│   │   └── works.tsx      # 作品展示
│   ├── ui/                # shadcn/ui 组件
│   └── ...                # 其他组件
├── lib/                   # 工具函数
│   ├── utils.ts           # 通用工具
│   ├── age.ts             # 年龄计算
│   └── i18n.ts            # 国际化配置
├── public/
│   ├── assets/            # 静态资源（头像、视频）
│   ├── favicon_io/        # 网站图标
│   └── locales/           # 翻译文件
├── stores/                # Zustand 状态管理
└── ...
```

## 🛠️ 本地开发

### 环境要求

- Node.js 18.18.0 或更高版本
- Yarn 或 npm

### 安装依赖

```bash
yarn install
```

### 启动开发服务器

```bash
yarn dev
```

访问 http://localhost:8787

### 构建生产版本

```bash
yarn build
```

## 🌍 国际化

项目支持中英文双语，翻译文件位于：

```
public/locales/
├── zh/common.json    # 中文
└── en/common.json    # 英文
```

添加新功能时，请同时更新两个翻译文件。

## 🎬 视频资源

| 文件 | 用途 | 大小 |
|------|------|------|
| `hero-background-v2.mp4` | 大屏幕 (≥1024px) | ~13MB |
| `hero-background-compressed.mp4` | 小屏幕 (<1024px) | ~6.8MB |
| `video-poster.jpg` | 视频加载前封面 | ~595KB |

视频采用响应式加载策略，根据屏幕尺寸自动切换。

## 🔧 环境变量

复制 `.env.example` 为 `.env.local` 并配置：

```bash
# Supabase 配置（可选，如需使用数据库）
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

⚠️ **注意**：`.env.local` 已加入 `.gitignore`，请勿提交到 Git！

## 🚫 Git 忽略文件

以下文件不会被提交到 Git：

- `node_modules/` - 依赖包
- `.next/` - Next.js 构建输出
- `dist/` - 静态导出目录
- `.env*.local` - 本地环境变量
- `.vercel/` - Vercel 部署配置

## 📝 更新日志

### 2026-03-12
- 🗺️ 新增交互式足迹地图
- 🗺️ 基于 Leaflet + Carto 的地图展示
- 🗺️ 支持 20 个城市标记（中国 15、日本 3、韩国 2）
- 🗺️ 添加距离标尺和 GPS 定位功能
- 🗺️ 地图支持缩放和平移交互

### 2026-03-11
- ✨ 初版发布
- 🎬 实现响应式视频背景
- 🌐 添加中英文双语支持
- 🌙 添加深色/浅色主题

## 📄 许可证

Made with ❤️ for Yibu

---

<p align="center">
  <a href="https://github.com/wenkangzhou/yibu-website">GitHub</a> •
  <a href="https://yibuu.com/">Live Demo</a>
</p>
