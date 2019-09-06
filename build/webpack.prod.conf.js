const path = require("path");
const webpack = require("webpack");
// 分离 css 文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 清除生成文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 压缩 JS
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 压缩 css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require("./config");
const webpackBaseConf = require("./webpack.base.conf");
const postcss = require('../postcss.config');

module.exports = {
  entry: webpackBaseConf.entries(),
  output: {
    path: config.distPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: "/"
  },
  mode: "production",
  // 加载器 loader 配置项
  module: {
    rules: [
      ...webpackBaseConf.baseModuleRules,
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: [
          config.srcPath,
          path.resolve(config.nodeModulesPath, 'webpack-dev-server/client')
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcss.plugins
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcss.plugins,
              parser: 'postcss-scss'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              publicPath: ""
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                path.resolve(config.publicPath, 'assets/styles/core/_settings.scss'),
                path.resolve(config.publicPath, 'assets/styles/core/_mixin.scss')
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      // 编译 less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcss.plugins,
              parser: 'postcss-less'
            }
          },
          {
            loader: 'less-loader',
            options: {
              publicPath: ""
            }
          }
        ]
      }
    ]
  },
  optimization: {
    namedChunks: true,
    moduleIds: 'hashed',
    splitChunks: {
      maxInitialRequests: 6,
      cacheGroups: {
        dll: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/](jquery|core-js|vue|vue-router)[\\/]/,
          name: 'dll',
          priority: 2,
          enforce: true,
          reuseExistingChunk: true
        },
        superSlide: {
          chunks: 'all',
          test: /[\\/]src[\\/]assets[\\/]js[\\/]/,
          name: 'superSlide',
          priority: 1,
          enforce: true,
          reuseExistingChunk: true
        },
        commons: {
          name: 'commons',
          // Math.ceil(pages.length / 3), 当你有多个页面时，获取pages.length，至少被1/3页面的引入才打入common包
          minChunks: 2,
          chunks: 'all',
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
    // 用于配置 minimizers 和选项
    minimizer: [
      // webpack 不支持es6语法的压缩，这里要使用需要babel配合
      // 压缩 js
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        // set to true if you want JS source maps
        sourceMap: true
      }),
      // 压缩 css
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  // 插件配置项
  plugins: [
    ...webpackBaseConf.basePlugins,
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[hash].css'
    }),
    // 删除 dist 文件夹
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        // 打包的静态资源目录地址
        from: config.staticPath,
        // 打包到dist下面的static
        to: './static'
      },
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      //  是否在默认浏览器中自动打开报告
      openAnalyzer: true,
      //  将在“服务器”模式下使用的端口启动HTTP服务器。
      analyzerPort: 9528,
      reportFilename: path.resolve(config.rootPath, "report.html")
    })
  ],
  resolve: {
    // 设置可省略文件后缀名
    extensions: [
      ...webpackBaseConf.baseResolveExtensions,
    ],
    // 查找 module 的话从这里开始查找; // 绝对路径;
    modules: [
      ...webpackBaseConf.baseResolveModules,
    ],
    // 配置路径映射（别名）
    alias: {
      ...webpackBaseConf.baseResolveAlias
    }
  }
};
