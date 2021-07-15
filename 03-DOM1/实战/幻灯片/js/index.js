;(function() {
  var Slider = function(opt) {
    this.sliderItem = document.getElementsByClassName(opt.sliderItem);
    this.thumbItem = document.getElementsByClassName(opt.thumbItem);
    this.bindClick()
  }

  Slider.prototype = {
    bindClick: function() {
      for (var i = 0; i < this.thumbItem.length; i++) {
        (function(j) {
          this.thumbItem[j].onclick = function() {
            for (let k = 0; k < this.thumbItem.length; k++) {
              this.sliderItem[i].className = 'slider-item';
              this.thumbItem[i].className = 'thumb-item'
            }
            this.sliderItem[j].className += ' active';
            this.className += ' cur'
          }
        })(i)
      }
    }
  }
})()