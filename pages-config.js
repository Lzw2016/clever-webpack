// 多页面配置
const pagesConfig = [
  {
    htmlPath: "index.html",
    // htmlOutPath: "",
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
];

module.exports.pagesConfig = pagesConfig;
