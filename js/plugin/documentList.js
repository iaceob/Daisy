!(function(window,$,undefined){
    'use strict';

    $.fn.documentList=function(options){
        var default_settings={

        };

        var settings= $.extend(default_settings,options);

        this.each(function(index,element){
            var $documentList=$(element);
            $documentList.find("ul").prev(".title").click(function(){
                $(this).closest("li").toggleClass("actived").end().next("ul").slideToggle();
            })
        })
    }
})(window,jQuery);