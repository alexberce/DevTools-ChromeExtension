import { App } from '../../common/ts/bootstrap';

chrome.extension.sendMessage({}, function (response) {
    let readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            let application = (new App('SECRET_TOKEN')).init();
        }
    }, 10);
});