!(function(window, $, undefined){
    'use strict';

    function std(){};


    function machiningSelect(select){
        var ops = $(select).find('option');
        console.log(ops);
        var optl = '';
        for(var i=0; i<ops.length; i++)
            optl += '<li data-value="'+ops[i].value+'">' + ops[i].innerHTML;
        $(select).after('<ul>'+optl+'</ul>');
    };

    function init(){
        var all = $('select.select');
        for(var i=all.length; i-->0;)
            machiningSelect(all[i]);
    };

    std.prototype = {
        init: init
    };

    window.selectedKit = new std();
})(window, jQuery);