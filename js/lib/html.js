//获取元素相对于这个页面的x坐标。
HTMLElement.prototype.pageX = function () {
    return this.offsetParent ? (this.offsetLeft + this.offsetParent.pageX()) : this.offsetLeft;
}

//获取元素相对于这个页面的y坐标。
HTMLElement.prototype.pageY = function () {
    return this.offsetParent ? (this.offsetTop + this.offsetParent.pageY()) : this.offsetTop;
}

//通过元素获取表单的form
HTMLElement.prototype.getForm = function (obj) {
    var currentObj = obj;
    while (currentObj != document.body) {
        if (currentObj.parentNode.nodeName.toLowerCase() == 'form')
            return currentObj.parentNode;
        currentObj = currentObj.parentNode;
    }
    return false;
}

HTMLElement.prototype.trigger = function (triggerEvent, isBubble, isPreventDefault) {
    var bubble = true || isBubble;
    var preventDefault = true || isPreventDefault;
    //调用document对象的 createEvent 方法得到一个event的对象实例。
    var event = document.createEvent('HTMLEvents');
    // initEvent接受3个参数:事件类型，是否冒泡，是否阻止浏览器的默认行为
    event.initEvent("ondataavailable", bubble, preventDefault);
    event.eventType = 'message';
    //触发document上绑定的自定义事件ondataavailable
    this.dispatchEvent(triggerEvent);
}

HTMLElement.prototype.isParent = function (obj) {
    while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY') {
        if (obj == this) return true;
        obj = obj.parentNode;
    }
    return false;
}

HTMLElement.prototype.insertAfter = function (targetElement) {
    /*---算法:
     *---如果是最后一个节点,那么直接在最后一个节点插入
     *---如果不是,在插入节点的后面一个兄弟前插入即可
     *---*/
    var parent = targetElement.parentNode;
    //把目标元素的parpentNode属性值提取到变量parent里；
    /*
    if (parent.lastChild == targetElement)
    //检查目标元素是不是parent的最后一个元素，即比较parent元素的lastChild属性值与目标元素是否存“等于”关系；
    {
        parent.appendChild(this);
        //上在如果是true，就用appendChild()方法把新元素追加到parent元素上，这样就恰好把新元素紧跟着插入到目标元素的后面了；
    } else {
        parent.insertBefore(this, targetElement.nextSibling);
        //上面如果是false，就把新元素插入到目标元素和parent元素的下一个子元素的中间。目标元素后面的下一个兄弟节点是目标元素的nextSibling属性，用insertBefore()方法把新元素插入到目标元素的下一个兄弟节点的前面；
    }
    */
    parent.lastChild == targetElement ? parent.appendChild(this) : parent.insertBefore(this, targetElement.nextSibling);
}

HTMLElement.prototype.getStyle = function () {
    return window.getComputedStyle ? window.getComputedStyle(this, null) : this.currentStyle;
    /*
    if (window.getComputedStyle) {
        return window.getComputedStyle(this, null);
    }
    else {
        return this.currentStyle;
    }
    */
}

HTMLIFrameElement.prototype.setCharset = function () {
    var iframeDocument = this.contentDocument || this.contentWindow.document;
    var meta = iframeDocument.createElement("meta");
    meta.setAttribute("http-equiv", "Content-Type");
    meta.setAttribute("content", "text/html; charset=gb2312");
    iframeDocument.getElementsByTagName("head")[0].appendChild(meta);
}