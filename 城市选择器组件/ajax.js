;
(function (undefined) {
    "use strict"
    var _global;


    function Ajax(opt) {
        this.type = (opt.type || 'GET').toUpperCase();
        this.success = opt.success || function (re) {console.log(re)};
        this.error = opt.error || function (er) {};
        this.url = opt.url;
        this.ContentType = opt.ContentType || 'application/json'
    }
    Ajax.prototype = {
        request: function (data,success) {
            var xhr;
            var _this=this;
            //创建XMLHttpRequest对象
            if (window.XMLHttpRequest) {
                //非IE6
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
           
            //异步状态发生改变，接收响应数据
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (success) {
                        if (typeof xhr.responseText == 'string') {
                            success(JSON.parse(xhr.responseText));
                        } else {
                            success(xhr.responseText);
                        }
                    }else{
                        if (typeof xhr.responseText == 'string') {
                            _this.success(JSON.parse(xhr.responseText));
                        } else {
                            _this.success(xhr.responseText);
                        }
                    }
                } else {
                    _this.error && _this.error(status);
                }
            }
            if (_this.type == 'GET') {
                //连接服务器
                // xhr.open('GET', (!!formatedParams ? _this.url + '?' + formatedParams : params.url), true);
                xhr.open('GET',  _this.url + '?' + _this.formateParams(data), true);
                //发送请求
                xhr.send();
            } else {
                //连接服务器
                xhr.open('POST', _this.url, true);
                xhr.setRequestHeader('Content-Type', _this.ContentType);
                //发送请求
                xhr.send(_this.formateParams(data));
            }

        },
        formateParams: function (data, isCache) {
            var arr = [];
            for (var name in data) {
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            if (isCache) {
                arr.push('v=' + (new Date()).getTime());
            }
            return arr.join('&');
        }

    }

    // 最后将插件对象暴露给全局对象
    _global = (function () {
        return this || (0, eval)('this');
    }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Ajax;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return Ajax;
        });
    } else {
        !('Ajax' in _global) && (_global.Ajax = Ajax);
    }
}());