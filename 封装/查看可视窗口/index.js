/*
 * @Autor: lhj
 * @Date: 2021-07-12 18:32:11
 * @LastEditTime: 2021-07-12 18:32:13
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