define(["require", "exports"], function (require, exports) {
    "use strict";
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
                        defer.reject(new Error('Failed to process the action.'));
                    });
                }).promise();
            })(this);
        };
        Api.serverUrl = 'http://localhost';
        return Api;
    }());
    exports.Api = Api;
});
