import {Api} from "./bootstrap";

export class UserInterface {

    private api: Api;

    /**
     *
     * @param api
     */
    constructor(api: Api) {
        this.api = api;
    }

    public bindActions(): void {
        this.translateInterface();
        this.bindEncoding();
    }

    /**
     *
     * @param result
     */
    private updateResult(result): void {
        let message;
        try {
            let resultArray = JSON.parse(result);
            message = resultArray['message'];
        }
        catch (e) {
            message = this.getTranslation("apiGeneralError");
        }

        $('#result').html(message);
    }

    public bindEncoding(): void {
        (function (self) {
            $('#processActionButton').click(function () {
                let input = $('#input').val();
                let action = $('#action').val();
                self.triggerAction(input, action);
            });
        })(this);
    }

    /**
     *
     * @param input
     * @param action
     */
    public triggerAction(input, action): void {
        (function (self) {
            self.api.makeCall(input, action).then(function (result) {
                self.updateResult(result);
            }).fail(function (error) {
                self.updateResult(error);
            });
        })(this);
    }

    public translateInterface(): void {
        // TODO: translate placeholders and optgroup labels
        (function (self) {
            $('[data-i18n]').each(function () {
                let element = $(this);
                let resourceName = element.data('i18n');
                let resourceText = self.getTranslation(resourceName);
                element.text(resourceText);
            });
        })(this);
    }

    /**
     *
     * @param translationKey
     * @returns {string}
     */
    private getTranslation(translationKey: string): string {
        return chrome.i18n.getMessage(translationKey);
    }
}