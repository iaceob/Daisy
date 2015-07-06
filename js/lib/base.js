Object.prototype.setParameters = function (parameters) {
    parameters = parameters || {};

    for (var i in parameters) {
        this[i] = parameters[i];
    }
}

/*
Object.prototype.isClassOf = function (className) {
    var currentObject = this;

    while (currentObject != Object) {

        if (currentObject.constructor == className) return true;
        if (currentObject.__proto__)
            currentObject = currentObject.__proto__;
        else
            return false;
    }

    return false;
};
*/

Object.prototype.getName = function () {
    var s = this.constructor.toString();
    if (s.indexOf('function') == -1)return null;

    s = s.replace('function', '');
    var idx = s.indexOf('(');
    s = s.substring(0, idx);
    s = s.replace(' ', '');
    return s;
}