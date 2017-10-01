define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Api = (function () {
        function Api() {
        }
        Api.prototype.withToken = function (token) {
            this.token = token;
            return this;
        };
        Api.prototype.makeCall = function (input, action) {
            return (function (self) {
                return $.Deferred(function (defer) {
                    $.ajax({
                        "url": Api.serverUrl + '/processAction.php',
                        "data": { 'token': self.token, "input": input, 'action': action },
                        "type": "POST",
                        "crossDomain": true
                    }).then(function (result) {
                        defer.resolve(result);
                    }).fail(function (result) {
                        defer.reject(new Error('There was an error processing your request.'));
                    });
                }).promise();
            })(this);
        };
        Api.serverUrl = 'http://extension.invobox.com';
        return Api;
    }());
    exports.Api = Api;
});
