// 原始值
var a, b = 3;
console.log(a) // a = undefined
console.log(b)

var c = 2,
    b = 4;
console.log(c)
// 重复赋值会覆盖
var f = 1;
f = 9;
console.log(f)



// 引用值
var arr1 = [1,2,3,4]
var arr2 = arr1;
arr1.push(5,6)
console.log(arr2)
