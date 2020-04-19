import store from "./store.js"
import actions from "./js/actions.js"

var e = document.createElement("script");
e.src = chrome.runtime.getURL("js/injected.js");
document.documentElement.appendChild(e)


chrome.storage.onChanged.addListener((changes, areaName) => {
	chrome.storage.local.get({shortcuts: 'defaultValue'}, (items) => {
		store.commit("changeShortcuts", items.shortcuts)
	});
});



(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-163991898-1', 'auto');
ga('set', 'checkProtocolTask', null); // Required: disables protocol checking.