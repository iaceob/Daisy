
!(function(window, kit, undefined){
    'use strict';
    var document = window.document;
    var self = kit.fn;
    function selector(select){
        self.splice(0, self.length);
        var allDom = document.querySelectorAll(select);
        for(var i=allDom.length; i-->0;)
            self.push(allDom[i]);
        return this;
    };

    self.selector = selector;
})(window, jsKit);