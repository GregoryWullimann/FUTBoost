import Vue from 'vue'
import Popup from './Popup.vue'
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
		changeShortcut (state, data) {
			var index = state.shortcuts.findIndex((x) => x.id == data.id);
			Vue.set(state.shortcuts, index, data)
			
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
	render: h => h(Popup)
})
