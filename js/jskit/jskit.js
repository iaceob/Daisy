!(function(window, undefined){
    'use strict';


    var self = kit.fn = kit.prototype = Object.create(Array.prototype);

    function kit(select){
        try {
            return self.selector(select);
        } catch (e) {
            return null;
        }
    };




    window.jsKit = kit;
})(window);


