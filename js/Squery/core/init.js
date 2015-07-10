(function( window, Squery, undefined ) {
    'use strict';
     // A central reference to the root Squery(document)
     var rootSquery,

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
    // Shortcut simple #id case for speed
    reg_quickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;

    Squery.prototype.init=function(selector, context, root ){
        var elements;
        
        // HANDLE: $(''), $(null), $(undefined), $(false)
        if (!selector) {
            return this;
        }

        // init accepts an alternate rootSquery
        // so migrate can support Squery.sub (gh-2101)
        root = root || rootSquery;

        if(typeof selector=='string') {

            //发现不是 '<'开始，'>'结尾 $('<p id='test'>My <em>new</em> text</p>')这种的情况
            //如果selector是html标签组成的话，直接match = [ null, selector, null ];而不用正则检查
            var match = (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) ? [null, selector, null] : reg_quickExpr.exec(selector);
            /*
            if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {

                // Assume that strings that start and end with <> are HTML and skip the regex check
                match = [null, selector, null];
            } else {
                match = reg_quickExpr.exec(selector);
            }
            */

            // Match html or make sure no context is specified for #id
            if (match && (match[1] || !context)) {
                // HANDLE: $(html) -> $(array)
                if (match[1]) {
                    context = context instanceof Squery ? context[0] : context;

                    // Option to run scripts is true for back-compat
                    // Intentionally let the error be thrown if parseHTML is not present
                    Squery.merge(this, Squery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

                } else {
                    elements = document.getElementById(match[2]);

                    if (elements) {
                        // Inject the element directly into the jQuery object
                        this[0] = elements;
                        this.length = 1;
                    }
                }
                return this;
            }
            // HANDLE: $(expr, $(...))
            return !context ? ( context || root ).find( selector ) : this.constructor( context ).find( selector );
            /*
            if ( !context) {
                return ( context || root ).find( selector );
                // HANDLE: $(expr, context)
                // (which is just equivalent to: $(context).find(expr)
            }
            return this.constructor( context ).find( selector );
            */
        }
        // HANDLE: $(function)
        // Shortcut for document ready
        if(typeof selector == 'Function' ){
            // Execute immediately if ready is not present
            return root.ready !== undefined ? root.ready( selector ) : selector( Squery );
        }
        // HANDLE: $(DOMElement)
        // else if(selector.nodeType ){
            elements=[selector];
        // }

        return this.setArray(elements);
    };


    // Give the init function the Squery prototype for later instantiation
    Squery.prototype.init.prototype = Squery.fn;

    // Initialize central reference
    rootSquery = Squery( document );
})(window, Squery);
