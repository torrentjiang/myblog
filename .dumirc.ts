import { defineConfig } from 'dumi';

export default defineConfig({
  favicons: ['/favicon.ico'],
  autoAlias: true,
  locales: [{ id: 'zh-CN', name: '中文' }],
  outputPath: 'docs-dist',
  themeConfig: {
    logo: '/logo.png',
    name: 'torrent',
    footer: '我沪ICP备2022034341号',
  },
});
