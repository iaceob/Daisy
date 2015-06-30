(function(window, undefined){
    'use strict';

    function StartControl(domElement) {
        //control init
        var controlDoms = domElement.querySelectorAll("[data-ride]");

        for (var i = 0; i < controlDoms.length; i++) {
            var controlDom = controlDoms[i];
            var controlNames = controlDom.dataset["ride"].trim().split(" ");

            controlNames.forEach(function(controlName){
                if(!controlDom[controlName]){
                    new window[controlName.replaceFirstUpper()](controlDom);
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

        StartControl(document.body);

        document.addEventListener("DOMNodeInserted",function(e){
            StartControl(e.target);
        });
    });

})(window);