/*
 * @Autor: lhj
 * @Date: 2021-06-23 17:44:21
 * @LastEditTime: 2021-06-23 18:13:53
 */
function Car() {}
var car = new Car();
console.log(car instanceof Car) // true
console.log(car instanceof Object) // true
console.log([] instanceof Object) // true
console.log([] instanceof Array) // true

var a = [1,2]
var b = ''
var c = {}
var d = 1
var e = null
var f = undefined
var g = false
console.log(a.toString())
console.log(Object.prototype.toString.call(a))
console.log(Object.prototype.toString.call(b))
console.log(Object.prototype.toString.call(c))
console.log(Object.prototype.toString.call(d))
console.log(Object.prototype.toString.call(e))
console.log(Object.prototype.toString.call(f))
console.log(Object.prototype.toString.call(g))