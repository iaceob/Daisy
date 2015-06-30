/**
 * Created by canknow on 2015/6/30.
 */

(function( window,sizzle, undefined ) {
    if(!sizzle){
        throw new ReferenceError("没有引入Sizzle.js！");
    }
    var  version = "@VERSION";

    //首先定义了jExtend函数。
    function jExtend( selector, context ) {
        return new jExtend.fn.init( selector, context );
    }

    //定义jExtend的原型。
    jExtend.fn = jExtend.prototype = {

        // The current version of jExtend being used
        version: version,
        //因为重写了jExtend的原型所以把constructor从新指向jExtend
        constructor: jExtend,
        // Start with an empty selector
        selector: "",
        // The default length of a jExtend object is 0
        length: 0
    };

    jExtend.extend = jExtend.fn.extend = function() {};

    jExtend.prototype.init=function(selector){
        // HANDLE: $(""), $(null), $(undefined), $(false)
        if (!selector) {
            return this;
        }

        if(typeof selector!=="string" &&!(selector instanceof Element)){
            throw new TypeError("错误的参数类型，参数必须是字符串，或者Node对象或者NodeList对象");
        }

        if(typeof selector=="string"){
            this.elements=sizzle(selector);
        }
        else if(typeof selector == "object" &&selector instanceof Element){
            this.elements=[selector];
        }
        this.length=this.elements.length;
        return this;
    }

    //define each
    jExtend.prototype.each=function(callback,index){
        var elements=this.elements;
        for (var i = elements.length - 1; i >= 0; i--) {
            callback(elements[i],i);
        };
    }

    jExtend.fn = jExtend.prototype;
    jExtend.fn.init.prototype = jExtend.fn;

    window.jExtend = window.$ = jExtend;
})( window,Sizzle);