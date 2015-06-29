function StartControl(domElement) {
    //control init
    var controlDoms = domElement.querySelectorAll("[data-ride]");

    for (var i = 0; i < controlDoms.length; i++) {
        var controlDom = controlDoms[i];
        var controlNames = controlDom.dataset["ride"].split(" ");

        for (var j = 0; j < controlNames.length; j++) {
            var controlName = controlNames[j].replaceFirstUpper();
            if(!controlDom[controlName]){
                window[controlName.replaceFirstUpper()](controlDom);
            }
        }
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