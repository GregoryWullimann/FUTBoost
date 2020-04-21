import Vue from 'vue';
import Vuex from 'vuex';
import { getField, updateField } from 'vuex-map-fields';
import utils from "./utils.js";
import actions from "./js/actions.js";
import shortcuts from "./js/shortcuts.js";
import VuexWebExtensions from 'vuex-webextensions';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		ratingsFilter: {
			min: 0,
			max: 100
		},
		raritiesFilter: utils.rarities.filter((i) => i.valid),
		playersData: [],
		presets: [],
		shortcuts: null
	},
	getters: {
		getField,
	},
	mutations: {
		changeShortcuts (state, newShortcuts) {
			state.shortcuts = newShortcuts
		},
		updateField
	},
	plugins: [createPersistedState({
		paths: ['ratingsFilter', 'raritiesFilter', 'shortcuts', 'presets'],
		key: 'FutBoost'
	})],
})

export default store