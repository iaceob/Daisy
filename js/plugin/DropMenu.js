/**
 * Created by canknow on 2015/6/29.
 */

function DropMenu(domElement, options) {
    Plugin.call(this,domElement,options);

    var $this = this;
    domElement.dropMenu=$this;

    var triggerEvent = "click" || options.triggerEvent;
    var target = domElement;
    var label = target.querySelector(":first-child");

    var ul = target.querySelector("ul");

    label.addEventListener(triggerEvent, function () {
        target.classList.toggle("open");
    });

    var lis = ul.querySelectorAll("li");

    for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        li.addEventListener("click", function () {
            target.classList.remove("open");

        });
    }

    document.addEventListener("click", function (event) {
        var dropMenuObjs = document.querySelectorAll(".dropMenu");

        for (var i = 0; i < dropMenuObjs.length; i++) {
            var dropMenuObj = dropMenuObjs[i];

            if (!dropMenuObj.isParent(event.target)) {
                dropMenuObj.classList.remove("open");
            }
        }

    });
}
DropMenu.prototype=new Plugin();