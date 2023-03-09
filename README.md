# torrent の技术博客

[![NPM version](https://img.shields.io/npm/v/myblog.svg?style=flat)](https://npmjs.org/package/myblog)
[![NPM downloads](http://img.shields.io/npm/dm/myblog.svg?style=flat)](https://npmjs.org/package/myblog)

## 访问地址：

[torrent 技术博客](http://www.torrentjiang.store/)

## 技术栈

react、markdown、dumi2.0、webhook

## 自动化部署流程

[webhook](https://docs.github.com/en/webhooks-and-events/webhooks/about-webhooks)
服务器监听 git push 提交代码
↓
执行 git pull 操作拉取最新代码
↓
npm install，项目可能会有新加的 npm 包
↓
npm run docs:build
↓
重启 nginx 服务

## 执行脚本

```bash
# install dependencies
$ npm install

# develop library by docs demo
$ npm start

# build library source code
$ npm run build

# build library source code in watch mode
$ npm run build:watch

# build docs 打包
$ npm run docs:build

```
