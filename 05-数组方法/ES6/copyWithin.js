/*
 * @Autor: lhj
 * @Date: 2021-08-10 07:38:48
 * @LastEditTime: 2021-08-10 07:46:16
 */
// const arr = [1,2,3,4,5];

// const newArr = arr.copyWithin(0, 1, 3)
// console.log(arr === newArr)
// console.log(arr.copyWithin(0, 1, 3))

const arr = [0,1,2,3,4,5];
const newArr = arr.fill('a', 0, 4)
console.log(arr === newArr)