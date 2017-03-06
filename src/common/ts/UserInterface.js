define(["require", "exports"], function (require, exports) {
    "use strict";
    var UserInterface = (function () {
        function UserInterface(api) {
            this.api = api;
        }
        UserInterface.prototype.bindActions = function () {
            this.translateInterface();
            this.bindEncoding();
        };
        UserInterface.prototype.updateResult = function (result) {
            var message;
            try {
                var resultArray = JSON.parse(result);
                message = resultArray['message'];
            }
            catch (e) {
                message = this.getTranslation("apiGeneralError");
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
            (function (self) {
                self.api.makeCall(input, action).then(function (result) {
                    self.updateResult(result);
                }).fail(function (error) {
                    self.updateResult(error);
                });
            })(this);
        };
        UserInterface.prototype.translateInterface = function () {
            (function (self) {
                $('[data-i18n]').each(function () {
                    var element = $(this);
                    var resourceName = element.data('i18n');
                    var resourceText = self.getTranslation(resourceName);
                    element.text(resourceText);
                });
            })(this);
        };
        UserInterface.prototype.getTranslation = function (translationKey) {
            return chrome.i18n.getMessage(translationKey);
        };
        return UserInterface;
    }());
    exports.UserInterface = UserInterface;
});
