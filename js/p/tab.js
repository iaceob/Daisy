!(function(window, daisy, t, undefined){
    'use strict';

    var expandName = 'tab';
    var self;

    function tab(target){
        self = this;
        self.navs = target.querySelector('.tab-navs');
        self.box = target.querySelector('.tab-box');
        self.items = target.querySelectorAll('.tab-item');
        self.tabs = target.querySelectorAll('li');
        self.init();
    };


    tab.prototype = {
        init: function(){
            console.log(self.items);
            self.items.forEach(function(item){
                item.addClass('hide');
            });
            self.tabs.forEach(function(tab){
                if (tab.className.match(/actived/)) {
                    var item = document.getElementById(tab.dataset['target']);
                    item.removeClass('hide').addClass('show');
                }
                t.bind(tab, 'click', self.bindTabClick);
            });
        },
        bindTabClick: function(){
            var tab = this;
            self.tabs.forEach(function(t){
                t.removeClass('actived');
                t.addClass(t!==tab||'actived');
            });
            self.items.forEach(function(i){
                i.removeClass('show').removeClass('hide');
                i.addClass('hide');
            });
            document.getElementById(tab.dataset['target']).removeClass('hide').addClass('show');
        }
    };

    daisy.registerExpand(expandName, tab);
})(window, Daisy, T);