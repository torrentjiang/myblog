import { defineConfig } from 'dumi';

export default defineConfig({
  favicons: ['/favicon.ico'],
  autoAlias: false,
  locales: [{ id: 'zh-CN', name: '中文' }],
  outputPath: 'docs-dist',
  sitemap: { hostname: 'http://www.torrentjiang.store' },
  socialLinks: {
    github: 'https://github.com/torrentjiang/myblog',
  },
  themeConfig: {
    logo: '/logo.png',
    name: 'torrent',
    footer: '我沪ICP备2022034341号',
  },
});
