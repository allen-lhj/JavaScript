const arr = [1,2,3,4];
// 返回满足条件的数组对应第一个元素的下标
// 如果没有找到返回-1
const idx = arr.findIndex(item => item > 2);

console.log(idx);

// reduce 归纳，将一些满足条件的元素归纳到一个新的数组中