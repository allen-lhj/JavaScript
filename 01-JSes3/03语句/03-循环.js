
// for循环中的第二个语句为判断语句，他总是返回true或false
// 从零开始做加法，加到什么时候总和是小于100的
  var sum = 0;
  for(let i = 0; i< 100; i++) {
    sum += i;
    if (sum >= 100) {
      break;
    }
    console.log(i, sum)
  }

  // 100以内的数，跳过可以被7整除或个位数是七的数，(整除的问题就用%来解决)

  for(let i = 0; i < 100; i++) {
    if (i % 7 === 0 || i % 10 === 7) {

    } else {
      console.log(i)
    }
  }
  // continue 跳出本次循环
  for(let i = 0; i < 100; i++) {
    if (i % 7 === 0 || i % 10 === 7) {
      continue;
    }
    console.log(i)
  }
  // 打印0-100
  // ()不能写比较
  // {}不能写i++,i--
  let i = 100;
  for(; i--;) {
    console.log(i) // i = 0时,for循环中中间的语句时判断语句，所以他只能返回true or false，i= 0时为false，循环停止
  }

  // 10 的 n 次方
  var n = 5;
  var num = 1;
  for (let i = 0; i < n; i++) {
      num *= 10;
  }

  // n 的阶乘
  // 阶乘时i一定要从1开始
  var n = 5;
  var num = 1;
  for (let i = 1; i <= 5; i++) {
      n *= i
  }

  // 将789输出为987

  var num = 789;
  var q = num % 10;
  var w = (num - q) % 100 / 10;
  var e = (num - q - w * 10) / 100
  console.log("" + e + w + q)

  // 打印三个数中最大的数
  var a = 1,
      b = 2,
      c = 3;
  if (a > b){
    if (a > c) {
      console.log(a)
    } else {
      console.log(c)
    }
  } else {
    if (b > c) {
      console.log(b)
    } else {
      console.log(c)
    }
  }

  // 打印100 以内质数（仅能被1和本身整除）
  //仅能被1和本身整除，说明质数会被整除两次
  var c = 0;
  for (let i = 2; i < 100; i++) {
    for (let j = 1; j <= i; j++) {
      if (i % j === 0) {
        c++
      }
    }
    if (c == 2) {
      console.log(i)
    }
    c = 0
  }
  // 斐波那契数列
  
  var n = parseInt(window.prompt('请输入第几位'));
  if (n <= 0) {
    console.log('输入错误')
  } else {
    var n1 = 1,
        n2 = 1,
        n3;

    if (n <= 2) {
      console.log(1);
    } else {
      for (var i = 2; i < n; i++) {
        n3 = n1 + n2;
        n1 = n2;
        n2 = n3;
      }
      console.log(n3)
    }
  }
