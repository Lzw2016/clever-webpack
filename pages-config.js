// 多页面配置
const pagesConfig = [
  {
    htmlPath: "index.html",
    // htmlOutPath: "",
    jsPathArray: ['index.js'],
  },
  {
    htmlPath: "pages/demo/test.html",
    jsPathArray: [
      'pages/demo/index1.js',
      'pages/demo/index2.js',
    ],
  },
];

module.exports.pagesConfig = pagesConfig;
