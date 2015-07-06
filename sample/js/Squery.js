window.onload=function(){

    console.log($("p").find("span"));
    //console.log($("p").hasClass("p"));

    //console.log($("p").toArray());

    //console.log($("p").first()[0]);

    //console.log($("p").first()[0]);

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
}
