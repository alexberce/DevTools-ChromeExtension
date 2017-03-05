import {Api, UserInterface} from "./bootstrap";

export class App {

    private api: Api;

    private ui: UserInterface;

    /**
     *
     * @param token
     */
    constructor(token: string) {
        this.api = (new Api()).withToken(token);
        this.ui = new UserInterface(this.api);
    }

    public init() {
        this.ui.bindActions();

        return this;
    }
}