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


document.addEventListener('keydown', (e) => {
	if(e.target.nodeName.toLowerCase() === "input"){
		return;
	} 
	if (!e.repeat && store.state.shortcuts){
		var shortcut = store.state.shortcuts.find(el => el.shortcut == e.key);
		if(shortcut){
			actions[shortcut.f](...(shortcut.params ? shortcut.params : []));
		}
	}
});


