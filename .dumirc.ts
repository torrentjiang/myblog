import { defineConfig } from 'dumi';

export default defineConfig({
  favicons: ['/profile/favicon.ico'],
  autoAlias: false,
  locales: [{ id: 'zh-CN', name: '中文' }],
  outputPath: 'docs-dist',
  publicPath: '/home/',
  base: '/home',
  sitemap: { hostname: 'https://www.torrentjiang.store' },
  themeConfig: {
    logo: '/profile/logo.png',
    name: 'torrent',
    footer: '沪ICP备2022034341号',
    socialLinks: {
      github: 'https://github.com/torrentjiang/myblog',
    },
  },
});
