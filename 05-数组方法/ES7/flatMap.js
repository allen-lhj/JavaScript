const arr = ['123', '456', '789'];


// ['1', '2', '3', '4']

const newArr = arr.map(function(item) {
    return item.split('');
}).flat()

// console.log(newArr)

// flatMap = map + flat
// flatMap 的效率更高,返回值是一个新的数组
const newArr1 = arr.flatMap(function(item) {
    return item.split('')
})
console.log(newArr1 === arr)

// 应用场景
const arr1 = ['My name si qq', 'Im 23 years old']

const newArr2 = arr1.flatMap(function(item) {
    return item.split(' ')
})

console.log(newArr2)