/*
 * @Autor: lhj
 * @Date: 2021-07-01 10:20:53
 * @LastEditTime: 2021-07-01 10:54:31
 */
;(function() {
  var Tab = function(opt) {
    this.tabItem = document.getElementsByClassName(opt.tabItem);
    this.pageItem = document.getElementsByClassName(opt.pageItem);
    this.bindClick(opt.cur, opt.active)
  }

  Tab.prototype = {
    bindClick: function(cur, active) {
      var tabs = this.tabItem,
        pages = this.pageItem;
    for(let i = 0; i < tabs.length; i++) {
      tabs[i].onclick = function() {
        for(let j = 0; j < tabs.length; j++) {
          tabs[j].className = 'tab-item';
          pages[j].className = 'page-item';
        }
        this.className = 'tab-item' + ' ' + cur;
        pages[i].className = 'page-item' + ' ' + active;
      }
    }
    }
  }
  window.Tab = Tab;
})()