
Squery.extend({
    event: {
        add: function(element, type, handle, capture){
            element.addEventListener(type, handle, capture);
        },
        remove: function(element, type, handle, capture){
            element.removeEventListener(type, handle, capture);
        }
    }
});



!(function(window, $, eventKit, undefined){
    'use strict';
    $ = $.fn;

    var handleHash = {};

    function handleFunc(e){
        var ee = new eventKit(e);
    };

    $.on = function(type, handle, capture){
        this.each(function(i){
            // this.addEventListener(type, handleFunc, capture);
            if (!(this in handleHash)) {
                handleHash[this] = {};
            }
            if (!(type in handleHash[this])) {
                handleHash[this][type] = [];
            }
            handleHash[this][type].push([handle, true]);
            Squery.event.add(this, type, handle, capture);
        });
        return this;
    };

    $.off = function(type, capture){
        this.each(function(i){
            // console.log(type);
            var target = this;
            if (target in handleHash) {
                var handles = handleHash[target];
                if (type in handles) {
                    var typeHandles = handles[type];
                    for(var i=typeHandles.length; i--;) {
                        var handle = typeHandles[i];
                        Squery.event.remove(target, type, handle[0], capture);
                    }
                }
            }
        });
        return this;
    };

    $.trigger = function(type){
        var event = new Event(type);
        this.each(function(i){
            var target = this;
            target.dispatchEvent(event);
        });
    };

    $.bind = $.on;
    $.unbind = $.off;

})(window, Squery, (function(window, $, undefined){
    'use strict';

    // TODO 重構 event

    function kit(originEvent){
        // ============
        // console.log(originEvent);
        return originEvent;
    };


    return kit;
})(window, Squery));
