function ButtonSet(domElement, options) {
    Plugin.call(this,domElement,options);

    var $this = this;
    var buttons = domElement.querySelectorAll(".button");

    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.addEventListener("click", function () {
            var activedButton = $this.domElement.querySelector(".actived");
            if (activedButton) {
                $this.domElement.querySelector(".actived").classList.remove("actived");
            }
            this.classList.add("actived");
        })
    }
}
ButtonSet.prototype=Plugin.prototype;
ButtonSet.prototype.constructor = ButtonSet;