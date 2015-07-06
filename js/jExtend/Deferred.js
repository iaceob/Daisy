/**
 * Created by canknow on 2015/6/30.
 */

(function( window,jExtend,undefined ) {

    jExtend.Deferred=function(promise){
        this.promise=new Promise(promise);;
        this.promise.then(function() {}, function() {});
    }
    jExtend.Deferred.prototype.then=function(successHandle,failHandle){
        this.promise.then(function(data) {
            successHandle(data);
        },function(data){
            failHandle(data);
        });
        return this;
    }
    jExtend.Deferred.prototype.success=function(callback){
        this.promise.then(function(data) {
            callback(data);
        });
        return this;
    }
    jExtend.Deferred.prototype.complete=function(callback){
        this.promise.then(function(data) {
            callback(data);
        },function(data) {
            callback(data);
        });
        return this;
    }
    jExtend.Deferred.prototype.fail=function(callback){
        this.promise.then(function(){},function(data) {
            callback(data);
        });
        return this;
    }

})( window,jExtend);