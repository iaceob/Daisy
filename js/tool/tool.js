!(function(window, undefined){
    'use strict';
    var document = window.document;
    function tool(){};

    var regex = {
        number: /^[0-9]*$/,
        number_nozero: /^[1-9]\d*$/,
        double: /^[-\+]?\d+(\.\d+)?$/,
        double2: /^[-\\+]?\\d+(\\.\\d*)?|\\.\\d+$/,
        money: /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/,
        phone_mobile: /^(0|86|17951)?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/,
        email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
        boolean: /^(1|0|true|false)$/
    };

    /*
     function setCookie(key, value, date, path) {
     date = date.isBlank() ? 360 : date;
     key = key.isBlank() ? 'NaN' : key;
     path = path.isBlank() ? '/' : path;
     var d = new Date();
     d.setTime(d.getTime() + date*24*60*60*1000);
     document.cookie = key + '=' + escape(value) + ';expires=' + d.toGMTString() + ';path=' + path;
     };
     function getCookie(key) {
     if (key.isBlank()) {
     var tmp = document.cookie.match(new RegExp("(^|)"+key+"=([^;]*)(;|$)"));
     return tmp.isBlank() ? window.unescape(tmp[2]) : null
     }
     return document.cookie;
     };
     */

    function querySelector(selector){
        return document.querySelector(selector);
    };
    function querySelectorAll(selector){
        return document.querySelectorAll(selector);
    };
    function execFunction(scope, func, params){
        try {
            if (!scope||!func) throw 'Unrecognized scope: {0} , and function: {1}'.format(scope, func);
            var f = scope[func];
            if (typeof f!=='function') throw 'scope {0} not found function: {1}'.format(scope, func);
            new f(params);
        } catch (e) {
            console.log('The error occurred in the function being executed, function: {0}'.format(func));
            console.debug(e);
        }
    };
    function bind(target, type, func){
        if (document.addEventListener) {
            target.addEventListener(type, func);
            return;
        };
        if (document.attachEvent) {
            target.attachEvent('on'+type, func);
            return;
        };
    };
    function unbind(target, type, func) {
        if (target.removeEventListener)
            target.removeEventListener(type, func, false);
        else if (target.detachEvent)
            target.detachEvent("on" + type, func);
        else delete target["on" + type];
    };
    function forEachNode(nodelist, callback){
        for(var i=nodelist.length; i-->0;)
            !callback||callback(nodelist[i]);
    };


    tool.prototype = {
        regex: regex,
        $: querySelector,
        $$: querySelectorAll,
        execFunction: execFunction,
        bind: bind,
        unbind: unbind,
        forEachNode: forEachNode
    };




    // ===== 非公开





    window.T = new tool();
})(window);