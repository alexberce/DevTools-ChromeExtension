define(["require", "exports", '../../common/ts/bootstrap'], function (require, exports, bootstrap_1) {
    "use strict";
    chrome.extension.sendMessage({}, function (response) {
        var readyStateCheckInterval = setInterval(function () {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);
                var application = (new bootstrap_1.App('SECRET_TOKEN')).init();
            }
        }, 10);
    });
});
