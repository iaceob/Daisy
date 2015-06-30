!(function(window, t, undefined){
    'use strict';

    function daisy(){};

    var conf = {
        expand: {}
    };

    window.c = conf;


    // 内部执行
    function assignRide(){
        var rides = t.$$('[data-ride]');
        for(var i=rides.length; i-->0;) {
            var ride = rides[i];
            var rideData = ride.dataset['ride'].trim().toUpperCase().split(' ');
            rideData.forEach(function(i){
                callExpand(i, ride);
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