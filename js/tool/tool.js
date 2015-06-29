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


    tool.prototype = {
        regex: regex
    };



    window.tool = new tool();
})(window);