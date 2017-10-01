define(["require", "exports", "./bootstrap"], function (require, exports, bootstrap_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(token) {
            this.api = (new bootstrap_1.Api()).withToken(token);
            this.ui = new bootstrap_1.UserInterface(this.api);
        }
        App.prototype.init = function () {
            this.ui.bindActions();
            return this;
        };
        return App;
    }());
    exports.App = App;
});
