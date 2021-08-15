/*
 * @Autor: lhj
 * @Date: 2021-07-26 17:44:11
 * @LastEditTime: 2021-07-26 20:51:17
 */
function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, function() {
      fn.call(el);
    })
  } else {
    el['on' + type] = fn;
  }
}
// 查找子元素
function elemChildren(node) {
  var temp = {
    'length': 0,
    'splice': Array.prototype.splice
  },
      len = node.childNodes.length;

  for(var i = 0; i < len; i++) {
    var childItem = node.childNodes[i];
    
    if (childItem.nodeType === 1) {
      temp[temp.length] = childItem;
      temp['length']++;
    }
  }
  
  return temp
}