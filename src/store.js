import Vue from 'vue';
import Vuex from 'vuex';
import { getField, updateField } from 'vuex-map-fields';
import VuexWebExtensions from 'vuex-webextensions';
import createPersistedState from "vuex-persistedstate";
import utils from "./utils.js";
import actions from "./js/actions.js";
import shortcuts from "./js/shortcuts.js";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		ratingsFilter: {
			min: 0,
			max: 100
		},
		raritiesFilter: utils.rarities.filter((i) => i.valid),
		playersData: [],
		shortcuts: shortcuts
	},
	mutations: {
	},
	getters: {
		getField,
	},
	mutations: {
		updateField,
	},
	plugins: [createPersistedState({ storage: window.localStorage })],
})

export default store