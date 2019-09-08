/**
 * 多页面配置
 * 使用相对路径，相对于"/src/pages"下的路径
 * htmlPath     - HTML模板文件路径，使用ejs模版(必填)
 * htmlOutPath  - HTML打包处理之后的输出路径，不写就是用htmlPath的值，当一个页面可以使用同一个HTML模板文件时有用(选填)
 * jsPathArray  - 当前页面依赖的js文件数组(必填)
 */
const pagesConfig = [
  {
    htmlPath: "index.html",
    // htmlOutPath: "111/index.html",
    jsPathArray: ['index.js'],
  },
  {
    htmlPath: "demo/test.html",
    jsPathArray: [
      'demo/index1.js',
      'demo/index2.js',
      'demo/index3.js',
    ],
  },
  {
    htmlPath: "demo2/test.html",
    jsPathArray: [
      'demo2/index2.js',
      'demo2/index3.js',
    ],
  },
  {
    htmlPath: "demo3/test.html",
    jsPathArray: ['demo3/index.js'],
  },
];

module.exports.pagesConfig = pagesConfig;
