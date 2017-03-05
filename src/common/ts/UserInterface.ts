import {Api} from "./bootstrap";

export class UserInterface {

    private api: Api;

    constructor(api: Api){
        this.api = api;
    }

    public bindActions(){
        this.bindEncoding();
    }

    private static updateResult(result){
        let message;
        try {
            let resultArray = JSON.parse(result);
            message = resultArray['message'];
        }
        catch(e){
            message = 'There was an error processing your request';
        }

        $('#result').html(message);
    }

    public bindEncoding(){
        (function (self) {
            $('#processActionButton').click(function () {
                let input = $('#input').val();
                let action = $('#action').val();
                self.triggerAction(input, action);
            });
        })(this);
    }

    public triggerAction(input, action){
        this.api.makeCall(input, action).then(function (result) {
            UserInterface.updateResult(result);
        }).fail(function (error) {
            UserInterface.updateResult(error);
        });
    }
}