const path = require("path");
// 打包模式 production development 默认 production
let runMode = process.env.NODE_ENV || 'production';
if (runMode !== 'production' && runMode !== 'development') {
  runMode = 'production';
}
// 打包模式枚举
const runModeEnum = {
  dev: 'development',
  prod: 'production'
};

// 所有路径配置的前缀(路径配置是相对项目根路径为前提配置的)
const pathPrefix = '../';
// 打包版本号
const appVersion = new Date().getTime();
// 网站图标绝对路径
const favicon = path.resolve(__dirname, `${pathPrefix}src/favicon.ico`);
// 项目根目录绝对路径
const rootPath = path.resolve(__dirname, `${pathPrefix}`);
// 打包输出目录绝对路径
const distPath = path.resolve(__dirname, `${pathPrefix}dist`);
// node_modules文件夹绝对路径
const nodeModulesPath = path.resolve(__dirname, `${pathPrefix}node_modules`);
// src文件夹绝对路径
const srcPath = path.resolve(__dirname, `${pathPrefix}src`);
// public文件夹绝对路径
const publicPath = path.resolve(__dirname, `${pathPrefix}public`);
// static文件夹绝对路径
const staticPath = path.resolve(__dirname, `${pathPrefix}static`);
// devserver 端口
const port = 8000;
// dev时是否需要自动打开浏览器
const needOpenApp = false;

// 代理配置
const proxy = {
  // '/api': {
  //   target: 'http://localhost:3000',
  //   pathRewrite: {
  //     '^/api': ''
  //   }
  // }
};

module.exports = {
  runMode,
  runModeEnum,
  appVersion,
  favicon,
  rootPath,
  distPath,
  nodeModulesPath,
  srcPath,
  publicPath,
  staticPath,
  port,
  needOpenApp,
  proxy,
  pagesConfig: require("../pages-config").pagesConfig,
};
