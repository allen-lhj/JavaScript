/*
 * @Autor: lhj
 * @Date: 2021-08-06 16:02:45
 * @LastEditTime: 2021-08-06 17:44:30
 */
// flat 扁平化  多维数组 -> 一维数组

const arr = [1 ,2, 3, [4, 5,[2,[3,[3,1]]]], 6]

const newArr = arr.flat(Infinity)

console.log(newArr)