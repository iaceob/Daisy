!(function(window, daisy, $, undefined){
    'use strict';

    function std(){};

    var expandName = 'select';


    function machiningSelect(select){
        var ops = $(select).find('option');
        console.log(ops);
        var optl = '';
        for(var i=0; i<ops.length; i++) {
            optl += '<li data-value="'+ops[i].value+'">' + ops[i].innerHTML;
        }
        $(select).after('<div class="select-show"></div><ul class="box-select" style="width: {0}px; overflow: hidden">{1}</ul>'.format($(select).outerWidth(), optl));
        bindShow(select);
    };


    function bindShow(select){
        var selectOption = $(select).find('option:checked');
        var selectShow  = $(select).parent().find('.select-show');
        console.log($(select));
        selectShow.data('value', $(select).val()).text($(selectOption).text());
        $(selectShow).bind('click', function(){
            var val = $(this).data('value');
            var boxSelect = $(this).parent().find('.box-select');
            var offsetTop = $(this).top;

        });
    };


    function selected(target){
        machiningSelect(target);
    };


    daisy.registerExpand(expandName, selected);

    window.selectedKit = new std();
})(window, Daisy, jQuery);