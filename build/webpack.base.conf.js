const path = require("path");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require("./config");

// 多入口配置 (JS文件)
const entries = () => {
  const pagesConfig = config.pagesConfig || [];
  if (!pagesConfig || pagesConfig.length <= 0) {
    console.error("请先配置pagesConfig");
    return {};
  }
  let count = 0;
  const entry = {};
  pagesConfig.forEach(itemConfig => {
    if (!itemConfig || !itemConfig.jsPathArray || itemConfig.jsPathArray.length <= 0) {
      return;
    }
    itemConfig.jsPathArray.forEach(jsPath => {
      const absolutePath = path.resolve(config.pagesRootPath, jsPath);
      entry[jsPath] = absolutePath;
      count++;
    });
  });
  if (count <= 0) {
    console.error("请先配置pagesConfig");
  }
  // console.log("entry", entry);
  return entry;
};

// 多页面页面配置 (HTML文件)
const getHtmlPlugin = () => {
  let baseConfig = {
    // 压缩 html 文件
    minify: {
      // 删除多余的属性
      removeRedundantAttributes: true,
      // 折叠空白区域
      collapseWhitespace: true,
      // 移除属性的引号
      removeAttributeQuotes: true,
      // 移除注释
      removeComments: true,
      // 省略只有 boolean 值的属性值 例如：readonly checked
      collapseBooleanAttributes: true,
      // 压缩内联css
      minifyCSS: true
    },
    favicon: config.favicon,
    appVersion: config.appVersion
  };
  if (config.runMode === config.runModeEnum.dev) {
    baseConfig = webpackMerge(baseConfig, {
      // dev Html 文件处理
    });
  } else {
    baseConfig = webpackMerge(baseConfig, {
      // prod Html 文件处理
    });
  }
  const htmlPluginArray = [];
  config.pagesConfig.forEach(itemConfig => {
    if (!itemConfig.htmlPath) {
      return;
    }
    const htmlWebpackConfig = webpackMerge(baseConfig, {
      // 输出文件的名称
      filename: itemConfig.htmlPath,
      // 模板文件的路径
      template: path.resolve(config.pagesRootPath, itemConfig.htmlPath),
      chunks: [...itemConfig.jsPathArray]
    });
    // console.log("template", htmlWebpackConfig.template);
    htmlPluginArray.push(new HtmlWebpackPlugin(htmlWebpackConfig));
  });
  return htmlPluginArray;
};

// 公用的rules
const baseModuleRules = [
  // {
  //     test: require.resolve('jquery'),
  //     use: [
  //         { loader: 'expose-loader', options: 'jQuery' },
  //         { loader: 'expose-loader', options: '$' }
  //     ]
  // },
  {
    // 用于匹配loaders所处理文件拓展名的正则表达式
    test: /\.json$/,
    // 具体loader的名称
    use: 'json-loader',
    type: 'javascript/auto',
    exclude: /node_modules/
  },
  {
    test: /\.(png|jp?g|gif|svg|ico)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          // 小于8192字节的图片打包成base 64图片
          limit: 8192,
          name: 'images/[name].[hash:8].[ext]',
          publicPath: ''
        }
      },
    ]
  },
  // 文件依赖配置项——字体图标
  {
    test: /\.(woff|woff2|svg|eot|ttf)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'fonts/[name].[ext]?[hash:8]',
          publicPath: ''
        },
      }
    ]
  },
  // 文件依赖配置项——音频
  {
    test: /\.(wav|mp3|ogg)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'audios/[name].[ext]?[hash:8]',
          publicPath: ''
        },
      }
    ],
  },
  // 文件依赖配置项——视频
  {
    test: /\.(ogg|mpeg4|webm)?$/,
    use: [{
      loader: 'file-loader',
      options: {
        limit: 8192,
        name: 'videos/[name].[ext]?[hash:8]',
        publicPath: ''
      },
    }],
  }
];

// 公用插件
const basePlugins = [
  // new HtmlWebpackPlugin({
  //   filename: 'index.html',
  //   template: path.resolve(__dirname, '../src/index.html'),
  //   title: 'webpack4.x',
  //   minify: {
  //     removeRedundantAttributes: true,
  //     collapseWhitespace: true,
  //     removeAttributeQuotes: true,
  //     removeComments: true,
  //     collapseBooleanAttributes: true
  //   },
  //   favicon: config.favicon,
  //   appVersion: config.appVersion
  // }),
  ...getHtmlPlugin()
];

// resolve.extensions
const baseResolveExtensions = [' ', '.js', '.json', '.jsx'];
// resolve.modules
const baseResolveModules = [
  config.srcPath,
  config.nodeModulesPath
];
// resolve.alias
const baseResolveAlias = {
  '@': config.srcPath
};

module.exports = {
  entries,
  getHtmlPlugin,
  baseModuleRules,
  basePlugins,
  baseResolveExtensions,
  baseResolveModules,
  baseResolveAlias,
};
