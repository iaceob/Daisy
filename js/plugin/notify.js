/*
 * nofity 0.1
 * Copyright (c) 2015 Canknow http://www.canknow.com/
 * Date: 2015-07-30
 * nofity
 */

(function($){

    function Notify(message){
        var _this=this;
        $notifyBox=$(".notify-box");
        if(!$notifyBox.length){
            $notifyBox=$('<div class="notify-box">').appendTo("body");
        }
        this.$notify=$('<div class="notify">\
        <span class="icon icon-info"></span>\
            <h5 class="title">notify title</h5>\
            <div class="body">\
                <p class="content">'+message+'</p>\
            </div>\
        </div>').appendTo($notifyBox).css({
            left:'100%'
        }).animate({
            left:'0'
        },500);
        setTimeout(function(){
            _this.hide();
        },5000);
    }
    Notify.prototype.constructor=Notify;
    Notify.prototype.hide=function(){
        this.$notify.animate({
            left:'-100%',
            opacity:0,
            height:0
        },500,function(){
            $(this).remove();
        })
    }

    $.notify=function(message){
        return new Notify(message);
    }
})(jQuery)