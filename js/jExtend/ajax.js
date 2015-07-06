/**
 * Created by canknow on 2015/6/30.
 */

(function( window,jExtend,undefined ) {

    var ajaxSettings={
        url: window.location.href,
        type: "GET",
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",

        accepts: {
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
        },

        contents: {
            xml: /xml/,
            html: /html/,
            json: /json/
        },

        responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON"
        },

        // Data converters
        // Keys separate source (or catchall "*") and destination types with a single space
        converters: {
            "text": window.String,
            "json": jExtend.parseJSON,
            "xml": jExtend.parseXML
        }
    };

    function ajaxConvert(dataType,response) {
        response=ajaxSettings.converters[dataType](response);

        return {
            state: "success",
            data: response
        };
    }

    jExtend.ajax=function(options){

        //创建一些默认值，拓展任何被提供的选项
        var settings = jExtend.extend({
            'url': ajaxSettings.url,
            'type': ajaxSettings.type,
            'data':{},
            'dataType':'string',
            'async':false,
            'username':'',
            'password':'',
            'success':function(){},
            'fail':function(){},
            'complete':function(){}
        }, options);

        var xmlhttp=new XMLHttpRequest();

        switch (settings['dataType']){
            case 'json':
                xmlhttp.responseType = "json";
                xmlhttp.setRequestHeader("Accept", "application/json");
                break;
        }

        switch (settings['type']){
            case 'get':
                break;
            case 'post':
                //post方式需要自己设置http的请求头

                break;
        }

        var  deferred = new jExtend.Deferred(function(resolve, reject) {
            xmlhttp.onreadystatechange=function(){
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var result;
                        if(settings['dataType']=='xml'){
                            response=xmlhttp.responseXML;
                        }
                        else{
                            response=xmlhttp.responseText;
                        }

                        response=ajaxConvert(settings['dataType'],response);

                        resolve(response);
                    }
                    else {
                        reject("failed");
                    }
                }
            };
            //设置连接信息
            //第一个参数表示Http的请求方式，支持所有的Http请求方式，主要使用get和post。
            //第二个参数表示请求的URL地址，get方式请求的参数也在URL中，
            //第三个参数表示采用同步还是异步，true表示采用异步
            xmlhttp.open(
                settings.type,
                settings.url||ajaxSettings.url,
                settings.async,
                settings.username,
                settings.password
            );

            //需要将"Content-type"的首部设置为"application/x-www-form-urlencoded".
            // 它会告知服务器正在发送数据，并且数据已经符合URL编码了。
            xmlhttp.setRequestHeader("Content-Type",ajaxSettings.contentType);
            xmlhttp.send(null);

            /* 异步操作成功 */
            if (true){
                resolve(value);
            }
            else {
                reject(error);
            }
        });

        deferred.success(function(data){
            settings.complete(data);
            settings.success(data);
        }).fail(function(data){
            settings.complete(data);
            settings.fail(data);
        });

        return deferred;
    }

})( window,jExtend);