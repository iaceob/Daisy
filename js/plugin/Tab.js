function Tab(domElement, options) {
    Plugin.call(this,domElement,options);

    var $this = this;
    domElement["tab"]=$this;

    var tabNavList = domElement.querySelector(".tab-nav-list");
    var tabBox = domElement.querySelector(".tab-box");
    var tabPages = tabBox.querySelectorAll(".tab-page");
    var tabNavLis = tabNavList.querySelectorAll("li");

    for (var i = 0; i < tabNavLis.length; i++) {
        var tabNavLi = tabNavLis[i];

        (function (i) {
            tabNavLi.addEventListener("click", function () {
                tabNavList.querySelector(".actived").classList.remove("actived");
                this.classList.add("actived");
                var currentTabPage = tabBox.querySelector(".show");
                currentTabPage.classList.remove("show");
                currentTabPage.classList.add("hide");

                var tabPage = document.getElementById(this.dataset["target"]) || tabPages[i];
                tabPage.classList.remove("hide");
                tabPage.classList.add("show");
            });
        })(i);
    }
}
Tab.prototype=new Plugin();