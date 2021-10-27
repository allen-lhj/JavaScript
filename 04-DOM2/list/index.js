;(function(doc) {
  var oList = doc.getElementsByClassName('list')[0],
      oItems = doc.getElementsByClassName('list-item'),
      curIndex = 0
  var init = function() {
    bindEvent()
  }

  function bindEvent() {
    addEvent(oList, 'mouseover', slide)
    addEvent(oList, 'mouseout', slide)
    // for (var i = 0; i < oItems.length; i++) {
    //   addEvent(oItems[i], 'mouseover', function() {
    //     oItems[curIndex].className = 'list-item';
    //     curIndex = Array.prototype.indexOf.call(oItems, this)
    //     oItems[curIndex].className += ' active'
    //   })
    // }
  }
  // 针对列表使用事件代理
  function slide (ev) {
    var e = ev || window.event,
        tar = e.target || e.srcElement,
        oParent = getParent(tar, 'li'),
        thisIdx = Array.prototype.indexOf.call(oItems, oParent)
        if(curIndex !== thisIdx) {
          oItems[curIndex].className = 'list-item';
          curIndex = thisIdx;
          oItems[curIndex].className += ' active'
        }
  }

  function getParent(target, element) {
    // div element = 'li'
    while (target.tagName.toLowerCase() !== element) {
      target = target.parentNode;
      console.log(target)
    }
    return target
  }
  init()
})(document)