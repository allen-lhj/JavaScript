/*
 * @Autor: lhj
 * @Date: 2021-07-26 17:33:50
 * @LastEditTime: 2021-07-27 07:20:51
 */
var initTodoList = (function() {
  const showInput = document.getElementsByClassName('j-show-input')[0],
        inputWrap = document.getElementsByClassName('input-wrap')[0],
        addItem = document.getElementsByClassName('j-add-item')[0],
        textInput = document.getElementById('textInput'),
        oList = document.getElementsByClassName('j-list')[0];
  let inputShow = false;
  addEvent(showInput, 'click', function() {
    if (inputShow) {
      inputWrap.style.display = 'none';
      inputShow = false;
    } else {
      inputWrap.style.display = 'block';
      inputShow = true;
    }
  })

  addEvent(addItem, 'click', function() {
    var val = textInput.value,
          len = val.length,
          oItems = document.getElementsByClassName('item'),
          itemLen = oItems.length,
          item;
    if(len === 0) {
      return;
    }

    for (var i = 0; i < itemLen; i++) {
      item = elemChildren(oItems[i])[0];
      var text = item.innerText;

      if (val === text) {
        alert('已存在此项目');
        return;
      }
    }
    var oLi = document.createElement('li');
    oLi.className = 'item';
    oLi.innerHTML = itemTpl(val);
    oList.appendChild(oLi);
    textInput.value = '';
    inputWrap.style.display = 'none';
    inputShow = false;
  });

  function itemTpl(text) {
    return (
      '<p class="item-content">' + text + '</p>' +
      '<div class="btn-group">' +
          '<a href="javascript:;" class="edit-btn fa fa-edit"></a>' +
          '<a href="javascript:;" class="remove-btn fa fa-times"></a>' +
      '</div>'
    );
  }
})()