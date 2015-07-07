function setParameters(obj,parameters){
    parameters = parameters || {};

    for (var i in parameters) {
        obj[i] = parameters[i];
    }
}

function getName(obj){
    var s = obj.constructor.toString();

    if (s.indexOf('function') == -1)
        return null;

    s = s.replace('function', '');
    var idx = s.indexOf('(');
    s = s.substring(0, idx);
    s = s.replace(' ', '');
    return s;
}