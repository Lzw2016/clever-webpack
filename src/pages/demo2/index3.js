require('jquery');

const demo = function () {
  console.log("首页333");
};
demo();
$("#jquery-test").html("测试页面 -- jquery使用成功");

let count = 0;
$(document).ready(() => {
  $("#button").on("click", () => {
    $("#jquery-test").html(count);
    count++;
    console.log("click");
  });
});
