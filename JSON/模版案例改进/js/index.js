var jsonData = '[{"id":"1","career":"\u524d\u7aef\u5de5\u7a0b\u5e08","city":"\u5317\u4eac","salary":"15","img":"1.jpg"},{"id":"2","career":"\u524d\u7aef\u5de5\u7a0b\u5e08","city":"\u5e7f\u5dde","salary":"11","img":"2.jpg"},{"id":"3","career":"\u524d\u7aef\u5de5\u7a0b\u5e08","city":"\u4e0a\u6d77","salary":"10","img":"3.jpg"},{"id":"4","career":"\u524d\u7aef\u5de5\u7a0b\u5e08","city":"\u6210\u90fd","salary":"9","img":"4.jpg"},{"id":"5","career":"\u540e\u7aef\u5de5\u7a0b\u5e08","city":"\u5317\u4eac","salary":"11","img":"5.jpg"},{"id":"6","career":"\u524d\u7aef\u5de5\u7a0b\u5e08","city":"\u5317\u4eac","salary":"13","img":"6.jpg"},{"id":"7","career":"\u524d\u7aef\u5de5\u7a0b\u5e08","city":"\u6df1\u5733","salary":"12","img":"7.jpg"},{"id":"8","career":"\u524d\u7aef\u5de5\u7a0b\u5e08","city":"\u4e0a\u6d77","salary":"10","img":"8.jpg"},{"id":"9","career":"\u540e\u7aef\u5de5\u7a0b\u5e08","city":"\u6210\u90fd","salary":"10","img":"9.jpg"},{"id":"10","career":"\u524d\u7aef\u5de5\u7a0b\u5e08","city":"\u5317\u4eac","salary":"18","img":"10.jpg"}]';

function render() {
  var JSONData = document.getElementById('J_Data').innerHTML,
      data = JSON.parse(JSONData),
      len = data.length,
      tpl = document.getElementById('J_tpl').innerHTML,
      oList = document.getElementsByClassName('js-list')[0],
      list = '',
      item;
console.log(data)
  for (var i = 0; i < len; i++) {
    item = data[i];
    list += setTplToHTML(tpl, regTpl, {
      career: item.career,
      city: item.city,
      salary: item.salary,
      img: item.img
    })
  }
  oList.innerHTML = list;
}

// function tpl(data) {
//   return (
//     '<li class="list-item">'+
//     '<div class="mask">'+
//       '<h3>' + data.career +'（'+ data.city + '）'+ '</h3>'+
//       '<p>月薪'+ data.salary + 'K</p>'+
//     '</div>'+
//     '<img src="student/img/'+ data.img + '" alt="">'+
//   '</li>'
//   )
// }

function setTplToHTML(tpl, regExp, opt) {
  return tpl.replace(regTpl(), function(node, key) {
    console.log(node, key);
    return opt[key];
  })
}

function regTpl() {
  return new RegExp(/{{(.*?)}}/, 'gim');
}
render();