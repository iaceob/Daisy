window.onload=function(){

    console.log($("p").find("span"));
    console.log($("p").hasClass("p"));
    console.log($("p").addClass("myp"));
    console.log($("p").toArray());

    console.log($("p").first()[0]);

    console.log($("<div><p></p>saldfjksdf</div>4321dsa"));

    $.ajax({
        url:"/jquery/test1.txt",
        async:false,
        success: function (data) {
            console.log("success");
        },
        fail: function (data) {
            console.log("error");
        },
        complete:function(data){
            console.log("complete");
        }
    }).success(function(data){
        console.log(data);
    }).fail(function(data){
        console.log(data);
    }).fail(function(data){
        console.log(data);
    }).complete(function(data){
        console.log(data);
    });







    var button=document.getElementById("button");
    button.addEventListener("click",function(){
        console.log("hello");
    })
    var event = document.createEvent("MouseEvents");//onchange事件要用HTMLEvents
    event.initEvent("click",true,true);//三个参数分别对应event的 type 属性、bubbles 属性和 cancelable 属性
    button.dispatchEvent(event);//给元素分派事件

}
