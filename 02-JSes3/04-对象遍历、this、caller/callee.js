/*
 * @Autor: lhj
 * @Date: 2021-06-23 18:34:57
 * @LastEditTime: 2021-06-24 07:27:58
 */
function test(a, b, c) {
  console.log(arguments.callee) // 返回函数本身
  console.log(test.length) // 函数的length 返回形参的个数
  console.log(arguments.length)
}
test(1,2)

var sum = (function(n) {
  if (n <= 1) {
    return 1;
  }
  return n + arguments.callee(n - 1);
})(100);

function test1() {
  test2()
}
function test2() {
  console.log(test2.caller)
}
test1()