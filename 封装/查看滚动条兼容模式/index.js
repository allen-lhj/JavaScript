/*
 * @Autor: lhj
 * @Date: 2021-07-12 18:28:19
 * @LastEditTime: 2021-07-12 18:28:21
 */
// 封装兼容函数
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