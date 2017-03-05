export class Api {
    /**
     *
     * @type {string}
     */
    private static serverUrl: string = 'http://localhost';

    /**
     * @type {string}
     */
    private token: string;

    /**
     *
     * @param token
     * @returns {Api}
     */
    public withToken(token: string): Api{
        this.token = token;

        return this;
    }

    /**
     *
     * @param input
     * @param action
     * @returns {JQueryPromise<any>}
     */
    public makeCall(input: string, action: string): JQueryPromise<any>{
        return (function(self){
            return $.Deferred<any>(function(defer){
                $.ajax({
                    "url": Api.serverUrl + '/processAction.php',
                    "data": { 'token': self.token, "input": input, 'action': action },
                    "type": "POST",
                    "crossDomain": true
                }).then(function(result){
                    defer.resolve(result);
                }).fail(function(result){
                    defer.reject(new Error('Failed to process the action.'));
                });
            }).promise();
        })(this);
    }
}