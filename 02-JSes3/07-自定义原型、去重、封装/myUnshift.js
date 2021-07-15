/*
 * @Autor: lhj
 * @Date: 2021-06-28 06:38:45
 * @LastEditTime: 2021-06-28 06:52:42
 */
var arr = ['d', 'e', 'f'];
// 自定义实现unshift
Array.prototype.myUnShift = function() {
  var argArr = Array.prototype.slice.call(arguments);
  var newArr = argArr.concat(this);
  return newArr;
}
var newArr = arr.myUnShift('a');
console.log(newArr)

// 数组按照元素字节数排序
// unicode 0-255 1个字节   256及以后两个字节
var arr = ['我爱你', 'OK', 'Hello', 'what are you 弄啥嘞'];

function getBytes(str) {
  var bytes = str.length;

  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      bytes++
    }
  }
  return bytes;
}

arr.sort(function(a, b) {
  return getBytes(a) - getBytes(b);
})
console.log(arr)