Math.cot = function (x) {
    return 1 / Math.tan(x);
}

Math.square = function (x) {
    return x * x;
}

function getBit(value, position) {
    var result = 0;

    if ((value & (1 << position)) != 0) {
        result = 1;
    }
    return result;
}


function clamp(x, a, b) {
    return (x < a) ? a : ((x > b) ? b : x);
}