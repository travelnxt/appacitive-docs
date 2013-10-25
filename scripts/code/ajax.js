(function ($) {

    if (!window.Help) {
        window.Help = {};
    }
    if (!window.Help.utils) {
        window.Help.utils = {};
    }

    $.support.cors = true;

    window.Help.utils.ajax = new (function () {

        this.send = function (request, onSuccess, onError) {
            if (typeof onSuccess !== 'function') onSuccess = function () { }
            if (typeof onError !== 'function') onError = function () { }

            var isExplorer = /msie [7-9]+/;
            var oldIE = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
            var docMode = document.documentMode;
            request.method = request.method || 'GET';
            request.async = true;
            var data = request.data || {};
            data = JSON.stringify(data);

            if (oldIE) {
                var xdr = new XDomainRequest();
                xdr.onload = function () {
                    var response = xdr.responseText;
                    try {
                        var contentType = xdr.contentType;
                        if (contentType.toLowerCase() == 'application/json' || contentType.toLowerCase() == 'application/javascript') {
                            var jData = response;
                            response = JSON.parse(jData);
                        }
                    } catch (e) { }
                    onSuccess(response, this);
                };
                xdr.onerror = xdr.ontimeout = function () {
                    onError({ code: "400", message: "Server Error" }, xdr);
                };
                xdr.onprogress = function () { };
                request.url = window.location.protocol + "//" + window.location.host + request.url;
                
                if (request.url.indexOf('?') == -1)
                    request.url = request.url + '?ua=ie';
                else
                    request.url = request.url + '&ua=ie';

                xdr.open(request.method, request.url, request.async);
                xdr.send(data);
                return xdr;
            } else {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if ((this.status >= 200 && this.status < 300) || this.status == 304) {
                            var response = this.responseText;
                            try {
                                var contentType = this.getResponseHeader('content-type') || this.getResponseHeader('Content-Type');
                                if (contentType.toLowerCase() == 'application/json' || contentType.toLowerCase() == 'application/javascript') {
                                    response = JSON.parse(response);
                                }
                            } catch (e) { }
                            onSuccess(response, this);
                        } else {
                            onError({ code: this.status, message: this.statusText }, this);
                        }
                    }
                };
                xhr.open(request.method, request.url, request.async);
                xhr.setRequestHeader('Content-Type', 'text/plain');
                xhr.send(data);
                return xhr;
            }
        };
    })();
})(jQuery);