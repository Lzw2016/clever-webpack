import lodash from "lodash";

const demo = function () {
  console.log("首页111");
  lodash.forEach([1, 2, 3, 5, 6], item => {
    console.log("首页111 -> ", item);
  });
};

demo();
