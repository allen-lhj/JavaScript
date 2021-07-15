/*
 * @Autor: lhj
 * @Date: 2021-06-28 17:22:34
 * @LastEditTime: 2021-06-28 18:19:09
 */
var jsonStr = '';

try {
  if (str === '') {
    throw 'JSON字符串为空';
  }
  console.log('执行');
  var json = JSON.parse(jsonStr)
} catch(e) {
  var errorTip = {
    name: '数据传输失败',
    errorCode: '10010'
  }
}
