// Support: Android 2.3
// Workaround failure to string-cast null input
Squery.parseJSON = function( data ) {
    return JSON.parse( data + "" );
};