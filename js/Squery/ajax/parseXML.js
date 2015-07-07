// Cross-browser xml parsing
Squery.parseXML = function( data ) {
    var xml;
    if ( !data || typeof data !== "string" ) {
        return null;
    }

    // Support: IE9
    try {
        xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
    }
    catch ( e ) {
        xml = undefined;
    }

    if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
        Squery.error( "Invalid XML: " + data );
    }
    return xml;
};
