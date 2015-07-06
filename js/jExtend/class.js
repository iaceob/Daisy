(function(window, jExtend, undefined){
    'use strict';
    jExtend.fn.hasClass=function(className){
        return this[0].classList.contains(className)
    }

    jExtend.fn.addClass=function(className){
        this.each(function(i){
            this.classList.add(className);
        });

        //要保持一个插件的chainability，你必须确保你的插件返回this关键字
        return this;
    }

    jExtend.fn.removeClass=function(className){
        this.each(function(i){
            this.classList.remove(className);
        });

        //要保持一个插件的chainability，你必须确保你的插件返回this关键字
        return this;
    }

    jExtend.fn.toggleClass=function(className){
        this.each(function(i){
            this.classList.toggle(className);
        });

        //要保持一个插件的chainability，你必须确保你的插件返回this关键字
        return this;
    }

})(window, jExtend);