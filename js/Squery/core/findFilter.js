(function( window, undefined ) {
    var document=window.document;
    var documentElement=document.documentElement;

    var matchesSelector = documentElement.matches ||
    documentElement.webkitMatchesSelector ||
    documentElement.mozMatchesSelector ||
    documentElement.oMatchesSelector ||
    documentElement.msMatchesSelector;

    Squery.fn.extend({
        selector:function(selector, context){
            context = context || document;
            return context.querySelectorAll(selector);
        },
        find: function( selector ) {
            var i, results = [];

            for (i = 0; i < this.length; i++) {
                Squery.merge(results, this.selector(selector, this[i]));
            }

            return this.pushStack(results);
        },
        filter: function( selector ) {
            var i, results = [];

            for (i = 0; i < this.length; i++) {
                if(this[i].matchesSelector(selector)){
                    Squery.merge(results, this[i]);
                }

            }

            return this.pushStack(results);
        }
    });

})( window);