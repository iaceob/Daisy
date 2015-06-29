!(function(window, undefined){
    'use strict';

    function daisy(){};

    var conf = {
        expand: []
    };


    function addExpand(name, func){
        conf.expand.push({name: func});
    };


    window.Daisy = new daisy();
})(window);