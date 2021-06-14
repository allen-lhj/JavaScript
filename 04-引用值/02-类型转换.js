/*
 * @Autor: lhj
 * @Date: 2021-05-12 23:09:55
 * @LastEditTime: 2021-06-09 07:47:06
 */

 // 转换数字时，非数字类型都是NaN
 // 
var a = '3.14' //number 3.14
var a = 'a' //NaN
var a = true //NaN
var a = false //NaN
var a = null //NaN
var a = undefined //NaN
console.log(Number(a)) 


var a = '10'
console.log(parseInt(a, 16)) // 16 第二参数表示以多少进制为基底转换为10进制，以16进制为基底转为10进制，逢16进1所以是16
var a = 'b' // 0123456789abcdef   b为11
console.log(parseInt(a, 16))  //11
console.log(parseInt('abc123')) // NaN
console.log(parseInt('1a23')) // 1 当遇到不是数字的后面直接舍弃

// 隐式类型转换，减 、乘、除的时候先将非数值型转为数值型，而加的时候会出现字符串拼接的情况
// 字符串中是数值可以转为number
var a = '123';
a++;
console.log(a) // 124;
//是字符的则做字符串拼接
var a = 'a' + 1;// string(1)
console.log(a) // a1


var a = '3' * 2; // 6 string--> number 
var a = '1' > 2; // false string--> number 
var a = 'b' > 'c' // 比较ASCII码


var a1 = 2 > 1 > 3; //false 2> 1 返回true， true就是1小于3返回false
var a2 = 2 > 1 == 1; // true

// undefined 与 null既不大于0也不小于0也不等于0
console.log(undefined == null) // true
// isNaN 判断是否为非数
console.log(isNaN('a')) // true 隐式转换也是非数
console.log(isNaN(null)) // fasle 隐式转换是0