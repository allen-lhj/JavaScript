/*
 * @Autor: lhj
 * @Date: 2021-05-13 22:30:04
 * @LastEditTime: 2021-06-15 04:26:48
 */
 // arguments对象不是一个Array，它类似Array，但是除了length 属性和索引元素以外没有任何Array属性
 function test(a, b) {
   console.log(arguments)
   // 转化arguments为一个真正的Array
   var args = Array.prototype.slice.call(arguments)
   console.log(args)
 }
 test(1,{name: 'allen'})

 // 剩余参数
// 剩余参数允许我们将一个不定数量的参数表示为一个数组
function  sum(a,b,...theArgs) {
  // console.log(Array.isArray(theArgs)) // true
  // const result = theArgs.reduce((pre, curr) => pre + curr)
  // console.log(result)
  console.log(theArgs)
}

sum(1,2,3) // 6

// 剩余参数与arguments的区别
// 剩余参数只包含那些没有对应形参的实参，而arguments包含所有实参
// arguments不是一个真正的数组，而剩余参数是一个真正的数组，可以使用数组的所有方法
// 解构赋值语法是一种 Javascript 表达式。通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量。
// 交换变量
// var a = 3,
//     b = 4;
//   [a, b] = [b, a]
//   console.log(a)
//   console.log(b)
function test2(name) {
  return name || '您没有填写姓名'
}

console.log(test2())

function test3(a, b) {
  b = 3;
  console.log(arguments[1])
}
test3(1)