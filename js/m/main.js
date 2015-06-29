!(function(window, t, undefined){
    'use strict';

    function daisy(){};

    var conf = {
        expand: {}
    };

    window.c = conf;


    // 内部执行
    function assignRide(){
        var ari = t.$$('[data-ride]');
        for(var i=ari.length; i-->0;) {
            var ci = ari[i];
            var dc = ci.dataset['ride'].trim().split(' ');
            dc.forEach(function(i){
                callExpand(i.toUpperCase(), ci);
            });
        }
    };






    // prototype 注册区
    function registerExpand(name, func){
        conf.expand[name.toUpperCase()] = func;
        return this;
    };

    function callExpand(name, params){
        t.execFunction(conf.expand, name, params);
    };

    function init(){
        assignRide();
    };


    // Testing
    window.addEventListener('load', function(){
        init();
    });

    // prototype reg
    daisy.prototype = {
        registerExpand: registerExpand,
        callExpand: callExpand,
        init: init
    };

    window.Daisy = new daisy();
})(window, T);