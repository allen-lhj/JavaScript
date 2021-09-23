window.onload = function() {
  init()
}
// 每个人的模块放在init函数中
function init() {
  keySearch()
}

var keySearch = (function() {
  var searchKw = document.getElementById('J_search_kw'),
      autoKw = document.getElementById('J_autoKw'),
      recomKw = JSON.parse(document.getElementById('J_recomKw').innerHTML),
      kwOrder = 0,
      t = null;

  addEvent(searchKw, 'focus', function() {
    // 聚焦的时候不在滚动
    clearInterval(t);
    autoKw.style.color = '#ccc';
  })
  // 输入事件
  addEvent(searchKw, 'input', function() {
    autoKwShow(this.value, false)
  })
  // 输入事件兼容性
  addEvent(searchKw, 'propertychange', function() {
    autoKwShow(this.value, false)
  })
  // 失去焦点事件
  addEvent(searchKw, 'blur', function() {
    autoKwShow(this.value, true)
    t = setInterval(autoKwChange, 3000)
  })
  // 根据输入框有没有值来隐藏keyword
  function autoKwShow(val, isBlur) {
    if (val.length <= 0) {
      autoKw.className = 'auto-kw show';
      autoKw.style.color = isBlur ? '#989898' : '#ccc'
    } else {
      autoKw.className = 'auto-kw hide'
    }
  }
  function setAutoKws() {
    autoKwChange()
    t = setInterval(autoKwChange, 3000)
  }

  function autoKwChange() {
    var len = recomKw.length;
    autoKw.innerHTML = recomKw[kwOrder];
    kwOrder = kwOrder >= len - 1 ? kwOrder = 0 : kwOrder + 1;
  }

  return function() {
    setAutoKws()
  }
})()