require('jquery');
const runtime = require('art-template/lib/runtime');
runtime.toUpperCase = (str) => {
  return str.toUpperCase();
};
const test = require('./template/test.art.html');
const template = test({ array: ["模版调用成功", "aaa", "bbb", "ccc", "ddd", "eee"] });

console.log("测试333", template);

$("#art-template-test").html(template);
