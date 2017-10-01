define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserInterface = (function () {
        function UserInterface(api) {
            this.api = api;
            this.translateInterface();
        }
        UserInterface.prototype.bindActions = function () {
            this.bindEncoding();
            this.bindEvents();
            this.populateActionsSelect('Encoding');
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
        UserInterface.prototype.bindEvents = function () {
            (function (self) {
                $(function () {
                    $("#tabs").tabs();
                    $('.ui-tabs-anchor').on('click', function () {
                        self.populateActionsSelect($(this).data('actions-label'));
                    });
                });
            })(this);
        };
        UserInterface.prototype.populateActionsSelect = function (actionLabel) {
            var actionSelect = $('#action');
            actionSelect.children().remove();
            $('#actions').find('optgroup[label="' + actionLabel + '"] option').each(function () {
                actionSelect.append('<option value="' + $(this).val() + '">' + $(this).text() + '</option>');
            });
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
