/*
// This frame not support IE
//Array.forEach implementation for IE support..
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32
        if ({}.toString.call(callback) != '[object Function]') {
            throw new TypeError(callback + ' is not a function');
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}
*/

/**
 * 数组 clone
 * @returns {Array}
 */
Array.prototype.clone = function(){
    var tmp = [];
    for (var i = 0; i < this.length; i++) tmp[i] = this[i];
    return tmp;
};


Array.prototype.max = function () {
    return Math.max.apply({}, this);
};

Array.prototype.min = function () {
    return Math.min.apply({}, this);
};

Array.prototype.reset = function () {
    for (var i = 0; i < arguments.length; i++)
        this[i] = arguments[i];
    return this;
};

/*
Array.prototype.removeElement = function (object) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === object) {
            this.splice(i, 1);
            break;
        }
    }
};
*/

Array.prototype.remove=function(dx) {
    if(isNaN(dx)||dx>this.length) return false;
    this.splice(dx,1);
};

Array.prototype.clear= function(){
    for(var i=this.length; (i--)>0;) this.remove(i);
};
