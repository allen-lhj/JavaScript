var arr = [1, 2, 3, 4]


// Array.prototype.myPush = function() {
//   for(var i = 0; i < arguments.length; i++) {
//     this[this.length] = arguments[i]
//   }
//   return this.length
// }
// arr.myPush(99)
// console.log(arr)

// arr.splice(1, 2, 'a', 'b', 'c')
// console.log(arr)
// var arr1 = ['a','b','c','d']
// arr1.splice(-2, 0, 'e')
// console.log(arr1)

var arr = [-1, 2, -5, 8, 2]
arr.sort();
console.log(arr) // [ -1, -5, 2, 2, 8 ]

var arr = ['b', 'z', 'h', 'i', 'a']
arr.sort();
console.log(arr) // [ 'a', 'b', 'h', 'i', 'z' ]

var arr = [27, 49, 5, 7]
arr.sort();
console.log(arr) //[ 27, 49, 5, 7 ]
// sort--》按照ASCII码来排列，
// 1.负值，a就排在前面
// 2.正值，b排在前面
// 3.0 保持不动
arr.sort(function(a, b) {
  if (a > b) {
    return 1
  } else {
    return -1
  }
})
// 升序 a - b 降序 b - a
arr.sort(function(a, b) {
  // return a - b;
  return b - a;
})
console.log(arr)
var arr = [1,2,3,4,5,6,7];
arr.sort(function() {
  var rand = Math.random();
  return rand - 0.5 // rand大于0.5或小于0.5的几率各占一半
})
console.log(arr)

var arr = [{name: 'Jone', age: 18}, {name: 'Bob', age: 28}, {name: 'jsise', age: 10}, {name: 'Soeme', age: 16}]

arr.sort(function(a, b) {
  return a.age - b.age
})
console.log(arr)

var arr = ['123','1200kll34', '13', '1231']
arr.sort(function(a, b) {
  return a.length - b.length
})
console.log(arr)