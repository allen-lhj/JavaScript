/*
 * @Autor: lhj
 * @Date: 2021-06-28 06:54:22
 * @LastEditTime: 2021-06-28 07:20:21
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

// console.log(myTypeof(new Number(1)))

// 数组去重
var arr = [0,0,0,1,2,2,3,4,5,6];

Array.prototype.unique = function() {
  var temp = {},
      newArr = [];
  for(let i = 0; i < this.length; i++) {
    if(!temp.hasOwnProperty(this[i])) {
      temp[this[i]] = this[i]
      newArr.push(this[i])
    }
  }
  return newArr
}

// console.log(arr.unique())
