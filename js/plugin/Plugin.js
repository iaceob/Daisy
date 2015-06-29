function Plugin(domElement, options) {
    var $this = this;
    var name=this.getName().replaceFirstLower();
    this.domElement = domElement;
    domElement[name]=this;
}