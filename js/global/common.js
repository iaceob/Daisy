(function(window, undefined){
    'use strict';

    function startPlugin(domElement) {
        //plugin init
        var pluginDoms = domElement.querySelectorAll("[data-ride]");

        for (var i = 0; i < pluginDoms.length; i++) {
            var pluginDom = pluginDoms[i];
            var pluginNames = pluginDom.dataset["ride"].trim().split(" ");

            pluginNames.forEach(function(pluginName){
                if(!pluginDom[pluginName]){
                    $(pluginDom)[pluginName]();
                }
            })
        }
    }

    window.addEventListener("load", function () {
        try{
            prettyPrint();
        }
        catch(ex){
            console.log(ex.message);
        }

        startPlugin(document.body);

        document.addEventListener("DOMNodeInserted",function(e){
            startPlugin(e.target);
        });
    });

})(window);