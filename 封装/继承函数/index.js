/*
 * @Autor: lhj
 * @Date: 2021-07-12 17:23:57
 * @LastEditTime: 2021-07-12 17:25:59
 */
var inherit = (function() {
  var buffer = function() {}
  return function(target, origin) {
    buffer.prototype = origin.prototype;
    target.prototype = new buffer();
    target.prototype.constructor = target;
    target.prototype.super_class = origin;
  }
})()

// 或函数方式

function inherit(target, origin) {
  var buffer = function() {};
  buffer.prototype = origin.prototype;
  target.prototype = new buffer();
  target.prototype.constructor = target;
  target.prototype.super_class = origin;
}