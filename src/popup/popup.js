import Vue from 'vue'
import App from './App'
import shortcuts from './../js/shortcuts.js';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import { getField, updateField } from 'vuex-map-fields';
Vue.use(Vuex);

global.browser = require('webextension-polyfill')
Vue.prototype.$browser = global.browser



const store = new Vuex.Store({
	state: {
		shortcuts: shortcuts,
	},
	getters: {
		getField,
	},
	mutations: {
		changeShortcut (state, n) {
			var item = state.shortcuts.find((x) => x.id == n.id);
			item.shortcut = n.shortcut

			state.shortcuts = [item,
			...state.shortcuts.filter(element => element.id !== n.id)
			]
			
			chrome.storage.local.set({shortcuts: state.shortcuts});
		},
		updateField
	},
	plugins: [createPersistedState({key: 'FutBoost'})],
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	render: h => h(App)
})
