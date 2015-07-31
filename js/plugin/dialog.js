!(function(window, $, dlg, ddlg, undefined){
    'use strict';
    var pluginName = 'dialog';

    function dialog(ele, opt){
        this.ele = ele;
        this.default = {
            title: '',
            content: '',
            footer: ''
        };
        this.options = $.extend({}, this.default, opt);
        if (this.ele||this.ele.length) {
            this.dlg = new dlg(this.ele, this.options);
        }
    };

    function show(){
        if (this.ele||this.ele.length) {
            this.ele.removeClass('hide').addClass('show');
            this.dlg.show();
        }
    };

    function hide(){
        if (this.ele||this.ele.length) {
            this.ele.removeClass('show').addClass('hide');
            this.dlg.close();
        }
    };

    dialog.prototype = {
        show: show,
        hide: hide
    };

    $.fn[pluginName] = function(options){
        return new dialog(this, options);
    };

})(window, jQuery, (function(widnow, undefined){
    'use strict';
    function dialog(ele, options){
        this.ele = ele;
        this.options = options;
    };

    function renderDialog(ele, title, container, footer){
        ele.find('.title').html(title||'');
        ele.find('.container').html(container||'');
        ele.find('.footer').html(footer||'');
    };

    function bindBtnClose(ele){
        ele.find('.close').bind('click', function(){
            ele.dialog().hide();
        });
    };

    function unbindBtnClose(ele){
        ele.find('.close').unbind('click');
    };

    dialog.prototype = {
        show: function(){
            renderDialog(this.ele, this.options.title||'', this.options.content||'', this.options.footer||'');
            bindBtnClose(this.ele);
        },
        close: function(){
            renderDialog(this.ele);
            unbindBtnClose(this.ele);
        }
    };


    return dialog;
})(window), (function(widnow, undefined){
    'use strict';
    function dialog(){};
    return dialog;
})(window));