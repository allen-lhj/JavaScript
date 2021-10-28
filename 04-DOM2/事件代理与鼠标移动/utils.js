/*
 * @Autor: lhj
 * @Date: 2021-07-27 13:40:59
 * @LastEditTime: 2021-07-30 16:00:29
 */

/**
 * @description: 深拷贝
 */
function deepClone(origin, target) {
  var target = target || {},
      toStr = Object.prototype.toString,
      arrayType = '[object Array]';
  for (let i in origin) {
    if (origin.hasOwnProperty(i)) {
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

/**
 * @description: 继承
 */
function inherit(target, origin) {
  var buffer = function() {};
  buffer.prototype = origin.prototype;
  target.prototype = new buffer();
  target.prototype.constructor = target;
  target.prototype.super_class = origin;
}

/**
 * @description: typeof
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

/**
 * @description: 查找子元素
 */
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

/**
 * @description: 获取元素样式
 */
function getStyles(ele, prop) {
    // IE不支持
  if (window.getComputedStyle) {
    if (prop) {
      return window.getComputedStyle(ele, null)[prop]; 
    } else {
      return window.getComputedStyle(ele, null)
    }
  } else {
      // 只有IE和Opera支持currentStyle
    if (prop) {
      return ele.currentStyle[prop]
    } else {
      return ele.currentStyle
    }
  }
}

/**
 * @description: 滚动条滚动距离
 */
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

/**
 * @description: 封装pageX/Y, 依赖getScrollOffset
 */
function pagePos(e) {
  var sLeft = getScrollOffset().left,
      sTop = getScrollOffset().top,
      cLeft = document.documentElement.clientLeft || 0,
      cTop = document.documentElement.clientTop || 0;
  return {
    // 当前可视区域的坐标 + 滚动条距离 - 文档偏移
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }
}

function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, function() {
      fn.call(el);
    })
  } else {
    el['on' + 'type'] = fn;
  }
}

function removeEvent(elem, type, fn) {
  if (elem.addEventListener) {
    elem.removeEventListener(type, fn, false);
  } else if (elem.attachEvent) {
    elem.detachEvent('on' + type, fn);
  } else {
    elem['on' + 'type'] = null;
  }
}
/**
 * @description: 取消冒泡
 * @param {*} e
 * @return {*}
 */
function cancleBubble(e) {
  var e = e || window.event;

  if (e.stopPropageation) {
    e.stopPropageation();
  } else {
    e.cacelBubble = true;
  }
}

/**
 * @description: 取消默认事件
 * @param {*} e
 * @return {*}
 */
function preventDefaultEvent(e) {
  var e = e || window.event;
  if (e.preventDefaultEvent) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
}

/**
 * @description: 获取视口宽高范围
 * @param {*}
 * @return {*}
 */
function getViewportSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    if (document.compatMode === 'BackCompat') {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {
      return {
        width: document.documentElement.clientWidth,
        hegiht: document.documentElement.clientHeight
      }
    }
  }
}