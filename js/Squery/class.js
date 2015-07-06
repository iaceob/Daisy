(function(window, Squery, undefined){
    'use strict';
    Squery.fn.hasClass=function(className){
        return this[0].classList.contains(className)
    }

    Squery.fn.addClass=function(className){
        this.each(function(i){
            this.classList.add(className);
        });

        //要保持一个插件的chainability，你必须确保你的插件返回this关键字
        return this;
    }

    Squery.fn.removeClass=function(className){
        this.each(function(i){
            this.classList.remove(className);
        });

        //要保持一个插件的chainability，你必须确保你的插件返回this关键字
        return this;
    }

    Squery.fn.toggleClass=function(className){
        this.each(function(i){
            this.classList.toggle(className);
        });

        //要保持一个插件的chainability，你必须确保你的插件返回this关键字
        return this;
    }

})(window, Squery);