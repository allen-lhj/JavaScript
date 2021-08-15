/*
 * @Autor: lhj
 * @Date: 2021-08-02 14:19:36
 * @LastEditTime: 2021-08-05 19:11:44
 */
// const arr = [1, 2, 3, 4, 5];

// copyWithin  ES2015   es6, 无论怎样复制不会改变数组长度
// params: target start end
// target: 从哪里开使覆盖
// start: 下标是多少
// end: len - 1（从头开始从1数） 超过数组长度就取到末尾
// 如果没有start和end，取整个数组元素，
// const newArr = arr.copyWithin(0, 1, 4);
// const newArr = arr.copyWithin(3);
// console.log(newArr)
// console.log(arr)

// generator iterator
// var arr = [1, 2, 3, 4, 5];

// 七种数组遍历的方法，遍历是迭代的一次又一次实现
// forEach -> 普通的数组遍历方法 对 for的优化
// map -> 映射 -> 返回一个每一项元素经过函数处理过的数组
// filter -> 过滤 -> 每一次遍历，来决定数组是否纳入新的数组
// reduce -> 归纳 -> 每一次遍历将当前数组收归到容器中
// reduceRight -> reduce的反向操作
// every -> 判定是否有某一个或多个符合条件
// some -> 判定是否有一个或多个符合条件

// 我们希望遍历的过程是可控的，（遍历的过程可停止，也可继续）
// 迭代器是生成器函数执行后返回的一个带有next方法的对象
// 生成器对迭代的控制是由yeild关键字来执行的
// 循环就是一次又一次的迭代

// 生成器是一个函数
// 迭代器是生成器执行后返回的一个带有next方法的对象

// function * generator() {
//   yield 'name'
//   yield 'age'
//   yield 'sex'
// }

// const iterator = generator()
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

// const arr = [1,2,3,4]

// function gen (arr) {
//   var nextIndex = 0;
//   return {
//     next: function () {
//       return nextIndex < arr.length ? 
//       { value: arr[nextIndex ++], done: false} :
//       { value: arr[nextIndex ++], done: true}
//     }
//   }
// }
// const a = gen(arr)
// console.log(a.next())
// console.log(a.next())
// console.log(a.next())
// console.log(a.next())
// console.log(a.next())

// const _ = arr.entries()
// console.log(_.next())
// console.log(_.next())
// console.log(_.next())
// console.log(_.next())
// console.log(_.next())
// console.log(_.next())
//与iterator不同的是 value 为 数组[index, item]

// 当我们使用 for of 的时候
// for (let i of arr) {
//   console.log(i) // 1 2 3 4 5 只能得到数组的值
// }
// 数组实际上就是一个特殊的对象，key键名是一个从零开始的有序递增的数字
// for (let i of arr.entries()) {
//   console.log(i) // 得到数组的值和对应的索引
// }

// for of 判断对象是否继承 [Symbol.iterator] = Array.prototype[Symbol.iterator]
// var newArr = []
// for (var i = 0; i < arr.length + 1; i++) {
//   var item = _.next();
//   !item.done && (newArr[i] = item.value);
// }
// console.log(newArr)

// const newArr = [
//   [56, 23],
//   [56, 43, 43, 211],
//   [123,1,2]
// ]

// function sortArr (arr) {
//   var _it = arr.entries(),
//       _doNext = true;
//   while(_doNext) {
//     var _r = _it.next();
//     if (!_r.done) {
//       _r.value[1].sort(function (a, b) {
//         return a- b;
//       })
//       _doNext = true;
//     } else {
//       _doNext = false;
//     }
//   }
//   return arr;
// }

// console.log(sortArr(newArr))
// fill 方法根据下标范围来给范围内的元素覆盖新的值
// const arr = [0,1,2,3,4,5];
// // const newArr = arr.fill('a', 0, 4)
// // const newArr = arr.fill('a')
// // const newArr = arr.fill()
// // console.log(newArr)

// Array.prototype.myfill = function() {
//   var value = arguments[0] || undefined,
//       start = arguments[1] >> 0,
//       end = arguments[2] >> 0;
//   if (this == null) {
//     throw new TypeError('This is null or defined');
//   }

//   var obj = Object(this),
//       len = obj.length >>> 0;

//   start = start < 0 ?
//           Math.max(len + start, 0) :
//           Math.min(start, len);
//   end = end === undefined ? 
//                 len :
//                 end >> 0;
//   end = end < 0 ?
//         Math.max(len + end, 0) :
//         Math.min(end, len);
//   while(start < end) {
//     obj[start] = value;
//     start ++
//   }

//   return obj;
// }

// const newArr = arr.myfill('a',1,2)

// console.log(newArr)

// find 返回第一个满足条件的数组元素，如果没有返回undefined
const arr = [1, 2, 3, 4]

const newarr = arr.find(function(item, index, arr) {
  return item > 2;
}, {a:1})
console.log(newarr)

// 稀疏数组,中间有空隙
// find 遍历不会忽略空值，其他ES5方法会忽略，所以find的遍历效率低于其他ES5方法，
// find不会改变原数组
const arr = Array(5)

arr[0] = 1;
arr[2] = 3;
arr[4] = 5;
console.log(arr)
const arr2 = [1,2,3,4]
Array.prototype.myFind = function (cb) {
  if(this === null) {
    throw new TypeError('this is null');
  }
  if (typeof cb !== 'function') {
    throw new TypeError('Callback must be a function type')
  }

  var obj = Object(this),
      len = obj.length >>> 0,
      arg2 = arguments[1],
      step = 0;

  while(step < len) {
    var value = obj[step];

    if (cb.apply(arg2, [value, step, obj])) {
      return value;
    }
    step++;
  }
  return undefined
}

const b = arr2.myFind(item => item > 3)
console.log(b)