!(function(window, kit, undefined){
    'use strict';
    var self = kit.fn;

    function hasClass(target, cls){
        if (!target||!cls) throw '需要目标元素和样式名称';
        return !!target.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    };


    function doAddClass(target, cls){
        if (!hasClass(target, cls)) target.className+=' '+cls;
    };

    function doRemoveClass(target, cls){
        if (hasClass(target, cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            target.className=target.className.replace(reg,' ');
        }
    };




    /// ========
    function addClass(cls){
        self.forEach(function(target){
            // console.log(target);
            doAddClass(target, cls);
        });
        return self;
    };

    function removeClass(cls){
        self.forEach(function(target){
            doRemoveClass(target, cls);
        });
        return self;
    };

    function triggerClass(cls){
        self.forEach(function(target){
            hasClass(target, cls) ? doRemoveClass(target, cls) : doAddClass(target, cls);
        });
    };


    // self.hasClass = hasClass;
    self.addClass = addClass;
    self.removeClass = removeClass;
    self.triggerClass = triggerClass;


})(window, jsKit);