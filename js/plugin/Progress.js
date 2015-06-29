function Progress(domElement,options) {
    Plugin.call(this,domElement,options);

    var $this = this;

    this.options = options || {};

    if (!this.domElement) {
        this.domElement = document.createElement("div");
    }
    this.domElement.classList.add("progress");

    var indicator = document.createElement("div");
    indicator.className = "indicator";
    this.domElement.appendChild(indicator);
    this.setvalue = function (value) {
        indicator.style.width = value + "%";
    }
}
Progress.prototype=Plugin.prototype;
Progress.prototype.constructor = Progress;