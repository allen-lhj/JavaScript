/*
 * @Autor: lhj
 * @Date: 2021-07-12 17:12:03
 * @LastEditTime: 2021-07-12 17:12:16
 */
function myTypeof(val) {
  var type = typeof(val);
  var toStr = Object.prototype.toString;
  var res = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'object number',
    '[object String]': 'object string',
    '[object Boolean]': 'object boolean'
  }
  if (val === null) {
    return 'null';
  } else if (type === 'object') {
    var ret = toStr.call(val);
    return res[ret]
  } else {
    return type;
  }
}