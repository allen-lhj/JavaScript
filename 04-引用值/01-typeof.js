/*
 * @Autor: lhj
 * @Date: 2021-05-12 22:32:50
 * @LastEditTime: 2021-05-12 22:41:48
 */

 console.log(typeof 1); // number
 console.log(typeof ''); // string
 console.log(typeof true); // boolean
 console.log(typeof []); // object
 console.log(typeof {}); // object
 console.log(typeof null); // object
 console.log(typeof undefined); // undefined
 console.log(typeof function(){}); // function

 console.log(typeof(1 - 1)); // number
 console.log(typeof(1 - '1')); // number
 console.log(typeof('1' - '1')); // number
 console.log(typeof(typeof(a))); // string // 任何typeof 再typeof一定是string