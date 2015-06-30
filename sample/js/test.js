var promise = new Promise(function(resolve, reject) {
    /* 异步操作成功 */
    if (true){
        resolve(value);
    }
    else {
        reject(error);
    }
});

promise.then(function(value) {
    // success
}, function(value) {
    // failure
});

window.onload=function(){
    console.log($("p")[2]);
}
