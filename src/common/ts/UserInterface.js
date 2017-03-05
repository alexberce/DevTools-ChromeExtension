define(["require", "exports"], function (require, exports) {
    "use strict";
    var UserInterface = (function () {
        function UserInterface(api) {
            this.api = api;
        }
        UserInterface.prototype.bindActions = function () {
            this.bindEncoding();
        };
        UserInterface.updateResult = function (result) {
            var message;
            try {
                var resultArray = JSON.parse(result);
                message = resultArray['message'];
            }
            catch (e) {
                message = 'There was an error processing your request';
            }
            $('#result').html(message);
        };
        UserInterface.prototype.bindEncoding = function () {
            (function (self) {
                $('#processActionButton').click(function () {
                    var input = $('#input').val();
                    var action = $('#action').val();
                    self.triggerAction(input, action);
                });
            })(this);
        };
        UserInterface.prototype.triggerAction = function (input, action) {
            this.api.makeCall(input, action).then(function (result) {
                UserInterface.updateResult(result);
            }).fail(function (error) {
                UserInterface.updateResult(error);
            });
        };
        return UserInterface;
    }());
    exports.UserInterface = UserInterface;
});
