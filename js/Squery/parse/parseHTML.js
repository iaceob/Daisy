(function( window, undefined ) {
    var reg_singleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;

    // data: string of html
    // context (optional): If specified, the fragment will be created in this context,
    // defaults to document
    Squery.parseHTML = function( data, context ) {
        if ( typeof data !== "string" ) {
            return [];
        }

        // document.implementation stops scripts or inline event handlers from
        // being executed immediately
        context = context || document.implementation.createHTMLDocument( "" );

        var parsed = reg_singleTag.exec( data );

        // Single tag
        if ( parsed ) {
            return [ context.createElement( parsed[1] ) ];
        }

        var wrapper=context.createElement( "div" );
        wrapper.innerHTML=data;

        return Squery.merge( [], wrapper.childNodes );
    };

})( window);