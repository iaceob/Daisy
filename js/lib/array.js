//Array.forEach implementation for IE support..
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
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

Array.prototype.clone = function () {
    var temp = new Array();
    for (var i = 0; i < this.length; i++) {
        temp[i] = this[i];
    }
    return temp;
}

Array.prototype.empty = function () {
    this.length = 0;
}

Array.prototype.max = function () {
    return Math.max.apply({}, this)
}

Array.prototype.min = function () {
    return Math.min.apply({}, this)
}

Array.prototype.set = function () {

    for (var i = 0; i < arguments.length; i++) {
        this[i] = arguments[i];
    }
}

Array.prototype.remove = function (child) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === child) {
            this.splice(i, 1);
            return;
        }
    }
}

Array.prototype.removeElement = function (object) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === object) {
            this.splice(i, 1);
            break;
        }
    }
}