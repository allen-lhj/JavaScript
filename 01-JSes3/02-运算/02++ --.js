/*
 * @Autor: lhj
 * @Date: 2021-05-11 21:38:47
 * @LastEditTime: 2021-05-11 21:45:54
 */
var a = 5,
    b;

b = a++ + 1;

console.log(b, a) // 6 6

var c = 5,
    d;

d = ++c + 1;

console.log(c, d); // 6 7

var e = 5,
    f;
// 运算时--e先减为4，加上e--这时e是4后面的--在相加时还没有运算，所以f为8,此时e还要再减1
f = --e + e--;
console.log(f, e) // 8 3