# Yibu's Personal Website

周翌步小朋友的个人网站 🎉

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Internationalization**: i18next
- **Deployment**: Vercel

## Features

- 🎨 沉浸式视频背景首页
- 🌐 中英文双语支持
- 🌙 深色/浅色主题切换
- 📱 响应式设计
- 🎬 响应式视频（大屏幕高清，小屏幕压缩版）

## Getting Started

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build
```

## Project Structure

```
yibu/
├── app/              # Next.js app router
├── components/       # React components
├── lib/             # Utilities
├── public/          # Static assets
├── stores/          # Zustand stores
└── locales/         # i18n translations
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## License

Made with ❤️ for Yibu
