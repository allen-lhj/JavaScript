/*
 * @Autor: lhj
 * @Date: 2021-05-11 22:02:12
 * @LastEditTime: 2021-05-12 00:16:24
 */


// 查询成绩等级
// 在条件中 && 就是并且，两边必须同时满足，|| 表示或者，满足左右一起中一项就可
var score = 98;

if (score <= 100 && score >=90) {
  console.log('你的成绩为A')
}

if (score >=70 && score < 90) {
  console.log('你的成绩为B')
}

if (score > 0 && score < 70) {
  console.log('你的成绩为C')
}
/**
 * @description: 检查上面的代码，使用if判断时我们首先要判断条件的‘互斥性’，如果你的条件不是互斥的可以分开写，如果是互斥的不要分开写
 * 上面的三个条件都是互斥的，即满足其中一个条件的时候，其他的条件肯定不满足，这个时候一定不要分开写
 * 为什么？我们可以看到，如果成绩为98的时候，代码执行到第一个if，哦，满足，输出 ‘你的成绩是A’，但是接下来，还会去判断第二个条件，第三个条件!
 * 如果我们写在一起
 */

if (score <= 100 && score >=90) {
  console.log('你的成绩为A')
} else if (score >=70 && score < 90) {
  console.log('你的成绩为B')
} else if (score > 0 && score < 70) {
  console.log('你的成绩为C')
}

// 当成绩满足了其中一个条件的时候，剩下的语句会直接跳过

// 同时我们还应该将问题考虑全面，考虑到数据出现问题的情况，将所有出现的可能都进行处理，比如成绩出现问题，大于100，或者为负数的错误情况
if (score <= 100 && score >=90) {
  console.log('你的成绩为A')
} else if (score >=70 && score < 90) {
  console.log('你的成绩为B')
} else if (score >= 0 && score < 70) {
  console.log('你的成绩为C')
} else {
  console.log('你的成绩计算出现异常！')
}
/**
 * @description: Switch语句，很多时候在if 与 switch之间纠结，看到有博客说谁的性能更好，
 * @params 一个用来与case子语句匹配的表达式
 * 有人觉得switch更直观，但我认为它们的使用场景不同，各有所长
 */
// 如下代码，针对用户输入不同城市，匹配不同薪资,整整齐齐
var city = window.prompt('输入你的城市！')

switch (city) {
  case '北京':
    console.log('19K');
    break;
  case '广州':
    console.log('15K');
    break;
  case '深圳':
    console.log('17K');
    break;
  default:
    console.log('10K');
}
// 但是如果用switch case做上面的查询成绩功能，那就有点奇怪了
// 首先参数你必须填true,语句才会向下执行
switch (true) {
  case score <= 100 && score >=90:
    console.log('你的成绩为A');
    break;
  case score >=70 && score < 90:
    console.log('你的成绩为B');
    break;
  case score > 0 && score < 70:
    console.log('你的成绩为C');;
    break;
  default:
    console.log('你的成绩计算出现异常！')
}
// 所以当判断条件为定值的时候最好用switch，尤其条件达到三个以上，当条件为范围的时候最好使用if
