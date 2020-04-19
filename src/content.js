import store from "./store.js"

var e = document.createElement("script");
e.src = chrome.runtime.getURL("js/injected.js");
document.documentElement.appendChild(e)



chrome.storage.onChanged.addListener((changes, areaName) => {
	chrome.storage.local.get({shortcuts: 'defaultValue'}, (items) => {
		store.commit("changeShortcuts", items.shortcuts)
	});
});




