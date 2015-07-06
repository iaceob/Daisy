String.prototype.getBit = function (position) {
    return this.length < (position + 1) ? 0 : parseInt(this.substr((this.length - (position + 1)), 1));
};

String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    return RegExp.prototype.isPrototypeOf(reallyDo) ? this.replace(reallyDo, replaceWith) : this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
}

//去除左边的空格
String.prototype.lTrim = function () {
    return this.replace(/(^\s*)/g, '');
}

//去除右边的空格
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, '');
}

//去除前后空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
}

//得到左边的字符串
String.prototype.left = function (len) {
    if (isNaN(len) || len == null) {
        len = this.length;
    } else {
        if (parseInt(len) < 0 || parseInt(len) > this.length) {
            len = this.length;
        }
    }
    return this.substr(0, len);
}

//得到右边的字符串
String.prototype.right = function (len) {
    if (isNaN(len) || len == null) {
        len = this.length;
    } else {
        if (parseInt(len) < 0 || parseInt(len) > this.length) {
            len = this.length;
        }
    }
    return this.substring(this.length - len, this.length);
}

//得到中间的字符串,注意从0开始
String.prototype.mid = function (start, len) {
    return this.substr(start, len);
}

//对字符串进行Html编码
String.prototype.toHtmlEncode = function () {
    var str = this;
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/\'/g, "&apos;");
    str = str.replace(/\"/g, "&quot;");
    str = str.replace(/\n/g, "<br>");
    str = str.replace(/\ /g, "&nbsp;");
    str = str.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    return str;
}

//字符串逆转
String.prototype.reverse = function () {
    var str = this;
    if (str) {
        var str1 = '';
        for (var i = str.length - 1; i >= 0; i--) {
            str1 += str.charAt(i);
        }
        return (str1);
    }
};

String.prototype.isBlank = function(){
    var s = this.toString();
    return s===null||''===s||undefined===s ? true : false;
};

String.prototype.notBlank = function(){
    return !this.isBlank();
};

String.prototype.format = function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function(m,i){
        return args[i];
    });
};