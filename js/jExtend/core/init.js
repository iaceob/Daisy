(function( window, undefined ) {
     // A central reference to the root jExtend(document)
     var rootjExtend,

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
    // Shortcut simple #id case for speed
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;


    jExtend.prototype.init=function(selector, context, root ){
        var elements;
        
        // HANDLE: $(""), $(null), $(undefined), $(false)
        if (!selector) {
            return this;
        }

        // init accepts an alternate rootjExtend
        // so migrate can support jExtend.sub (gh-2101)
        root = root || rootjExtend;

        if(typeof selector=="string"){
            elements=document.querySelectorAll(selector);
        }
        else if(typeof selector == "object"&&selector instanceof Element){
            elements=[selector];
        }
        else if(typeof selector == "Function" ){
            // Execute immediately if ready is not present
            return root.ready !== undefined ? root.ready( selector ) : selector( jExtend );
        }

        return this.setArray(elements);
    };


    // Give the init function the jExtend prototype for later instantiation
    jExtend.prototype.init.prototype = jExtend.fn;

    // Initialize central reference
    rootjExtend = jExtend( document );

})( window);
