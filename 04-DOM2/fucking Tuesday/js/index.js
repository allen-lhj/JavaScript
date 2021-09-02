/*
 * @Autor: lhj
 * @Date: 2020-07-28 09:49:05
 * @LastEditTime: 2020-07-30 15:48:53
 */
Element.prototype.dragNclick = (function(elemClick) {
  var bTime = 0,
      eTime = 0,
      oPos = [],
      elem = this;

  drag();
  function drag() {
    var x,
        y;
    addEvent(elem, 'mousedown', function(e) {
      var e = e || window.event;
      bTime = new Date().getTime();
      oPos = [getStyles(elem, 'left'), getStyles(elem, 'top')]
      x = pagePos(e).X - parseInt(getStyles(elem, 'left'));
      y = pagePos(e).Y - parseInt(getStyles(elem, 'top'));

      addEvent(document, 'mousemove', mouseMove);
      addEvent(document, 'mouseup', mouseUp);
      cancleBubble(e);
      preventDefaultEvent(e)
    });

    function mouseMove(e) {
      var e = e || window.event;
      elem.style.left = pagePos(e).X - x + 'px';
      elem.style.top = pagePos(e).Y - y + 'px';
    }

    function mouseUp(e) {
      var e = e || window.event;
      eTime = new Date().getTime();

      if (eTime - bTime < 100) {
        elem.style.left = oPos[0]
        elem.style.top = oPos[1]
        elemClick()       
      }
      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);
    }
  }
})