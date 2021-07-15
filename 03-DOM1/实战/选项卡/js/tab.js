/*
 * @Autor: lhj
 * @Date: 2021-06-30 21:51:02
 * @LastEditTime: 2021-06-30 22:13:03
 */
var tabItem = document.getElementsByClassName('tab-item'),
    pageItem = document.getElementsByClassName('page-item');

for (var i = 0; i < tabItem.length; i++) {
  (function(j) {
    tabItem[j].onclick = function() {
      for(var k = 0; k < tabItem.length; k++) {
        tabItem[k].className = 'tab-item';
        pageItem[k].className = 'page-item';
      }
      this.className = 'tab-item cur';
      pageItem[j].className = 'page-item active'
    }
  })(i)
}