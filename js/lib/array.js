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