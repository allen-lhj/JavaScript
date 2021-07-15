var a = 2,
    b = 3;

var c = (a + b) * a;

// console.log(c)

// 任何数据类型 + 字符串都是字符串
var d = 'str' + 1
var d = 'str' + undefined
var d = 'str' + null
var d = 'str' + [1,2,3,4]
var d = 'str' + {'obg':3}
// console.log(d)

// 除法
var f = 0 / 0;  // NaN
var f = 0 / 'sdd'; //NaN
var f = 1 / 0;  // Infinity
console.log(f)

// 取余   取模
console.log(5 % 2) // 1

console.log(3 % 6) // 4

// 交换值
var g = 3,
    r = 6;
// var e = 0;
// e = g;
// g = r;
// r = e;
g = g + r;
r = g - r;
g = g - r;
console.log(g, r)

