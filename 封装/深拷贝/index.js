/*
 * @Autor: lhj
 * @Date: 2021-07-06 18:31:30
 * @LastEditTime: 2021-07-12 17:34:50
 */
function deepClone(origin, target) {
  var target = target || {},
      toStr = Object.prototype.toString,
      arrayType = '[object Array]';
  for (let i in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof(origin[i]) === 'object' && origin[i] !== null) {
        toStr.call(origin[i]) === arrayType ? target[i] = [] : target[i] = {}
        deepClone(origin[i], target[i])
      } else {
        target[i] = origin[i]
      }
    }
  }
  return target
}
