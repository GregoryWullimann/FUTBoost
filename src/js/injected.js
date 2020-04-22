import Vue from 'vue'
import RatingFilter from './../components/RatingFilter.vue'
import RarityFilter from './../components/RarityFilter.vue'
import ClubSummary from './../components/ClubSummary.vue'
import FilterPreset from './../components/FilterPreset.vue'
import utils from "./../utils.js";
import store from './../store';
import actions from "./actions.js";
import futCode from "./futCode.js";

global.browser = require('webextension-polyfill')
Vue.prototype.$browser = global.browser

window.store = store; 

class Navigation {
	constructor() {
		this.previousController = null;
		this.currentController = null;
	}

	init() {
		// The console object is empty in the webapp, so we reacreate one 
		// so we can use console.log()
		var i = document.createElement('iframe');
		i.style.display = 'none';
		document.body.appendChild(i);
		window.console = i.contentWindow.console;

		var intervalMainNavigation = setInterval(() => {
			var mainNavigation = document.querySelector(".ut-tab-bar-view.game-navigation");
			if (!mainNavigation) {
				return;
			}

			this.observer = new MutationObserver(() => {
				var getCurrentController = utils.getCurrentController();
				var newController = this.currentController != getCurrentController.className
				this.previousController = newController ? this.currentController : this.previousController;
				this.currentController = getCurrentController.className;
				if(newController){
					if(render[this.currentController]){
						render[this.currentController](this.previousController);
					}
				}
			});
			this.observer.observe(mainNavigation, { attributes: true, childList: true, subtree: true });
			clearInterval(intervalMainNavigation);
		}, 1000)
	}
}

var render = {
	UTHomeHubViewController: function(){
	},
	UTSquadsHubViewController: function(){
	},
	UTSBCHubViewController: function(){
		var interval = setInterval(() => {
			utils.getSBCPrices();
			clearInterval(interval)
		}, 200)
	},
	UTSBCChallengesViewController: function(){
		var interval = setInterval(() => {
			var container = document.querySelector(".SBCChallenges");
			utils.getChallangesPrices(container.id);
			clearInterval(interval)
		}, 200)
	},
	UTSBCSquadSplitViewController: function(){
	},
	UTTransfersHubViewController: function(){

	},
	UTMarketSearchFiltersViewController: function(previousController){
		if(previousController == "UTMarketSearchResultsSplitViewController"){
			return;
		}
		var mainNavigation = document.querySelector(".ut-tab-bar-view.game-navigation");
		var container = mainNavigation.querySelector(".search-prices");
		for (var i = 10; i > 0; i--) {
			var ratingFilterDiv = document.createElement('div');
			ratingFilterDiv.id = "preset1";
			container.parentNode.insertBefore(ratingFilterDiv, container.nextSibling);
			new Vue({
				el: "#preset1",
				store,
				render: h => h(FilterPreset, { 
					props: { id: i }
				}),
			})
		}
		var rarityFilterDiv = document.createElement('div');
		rarityFilterDiv.id = "rarityFilter";
		container.parentNode.insertBefore(rarityFilterDiv, container.nextSibling);

		var ratingFilterDiv = document.createElement('div');
		ratingFilterDiv.id = "ratingFilter";
		container.parentNode.insertBefore(ratingFilterDiv, container.nextSibling);

		new Vue({
			el: "#ratingFilter",
			store,
			render: h => h(RatingFilter)
		})

		new Vue({
			el: "#rarityFilter",
			store,
			render: h => h(RarityFilter)
		})
	},
	UTTransferListSplitViewController: function(){
	},
	UTWatchListSplitViewController: function(){
	},
	UTStoreViewController: function(){
		var currentView = utils.getCurrentView()
		currentView.addTarget(this, (x) => { 
			if(currentView._navigation.getActiveTab() == "mypacks"){
				return;
			}
			var packs = utils.getCurrentController()._viewmodel._packs._collection
			var packContainers = document.querySelectorAll(".ut-store-pack-details-view");
			for (var i = 0; i < packContainers.length; i++) {
				var pack = packs[packContainers[i].id]
				if(pack){
					var purchased = new Intl.NumberFormat('en-UK').format(pack.purchaseCount)
					var totalCost = new Intl.NumberFormat('en-UK').format(pack.purchaseCount * pack.prices._collection.COINS.amount)
					packContainers[i].appendChild(utils.stringToHTML(`<hr>`))
					packContainers[i].appendChild(utils.stringToHTML(`<p class="description avoidLoop">Pack opended: <b>${purchased}</b></p>`))
					packContainers[i].appendChild(utils.stringToHTML(`<p class="description">Coins value: <b>${totalCost}</b></p>`))
				}
			}
		}, UTStoreView.Event.TAB_SELECTED)
	},
	UTClubHubViewController: function(){
	},
	ClubSearchResultsSplitViewController: function(previousController){
		if(previousController == "UTMyClubSearchFiltersViewController"){
			return;
		}
		var interval = setInterval(() => {
			var mainNavigation = document.querySelector(".ut-navigation-container-view--content");
			mainNavigation.style.position = "unset"
			mainNavigation.style["bottom"] = null
			var container = mainNavigation.querySelector(".ut-split-view.sidebar-right");
			container.style["flex-direction"] = "column"

			container.querySelector(".ut-navigation-container-view--content").style.position ="unset"
			container.querySelector(".ut-content").style.background = "#f2f2f2"

			var headerContainer = container.querySelector(".ut-list-header");
			if(!headerContainer){
				return;
			}
			headerContainer.parentNode.insertBefore(utils.stringToHTML(`<div class="ut-list-header">
				<span class="ut-list-header-action" style="">
				<button id="getPrices" class="btn-standard mini call-to-action">Get prices</button>
				</span></div>`), headerContainer.nextSibling);

			mainNavigation.querySelector("#getPrices").onclick = function(){
				utils.getPlayersPrice()
			};

			var clubSummary = document.createElement('div');
			clubSummary.setAttribute("id", "clubSummary");
			container.prepend(clubSummary);

			new Vue({
				el: "#clubSummary",
				store,
				render: h => h(ClubSummary)
			})
			clearInterval(interval)
		}, 200)

	},
	UTMyClubSearchFiltersViewController: function(){
	},
	UTMarketSearchResultsSplitViewController: function(){
		var interval = setInterval(() => {
			var mainNavigation = document.querySelector(".ut-tab-bar-view.game-navigation");
			var items = mainNavigation.querySelectorAll(".listFUTItem");
			if(items.length > 0){
				for (var i = 0; i < items.length; i++) {
					var el = items[i].querySelector("div.untradeable")
					if (el) {
						items[i].remove();
					}
				}
				clearInterval(interval)
			}
		}, 200)
	}
}

var nav = new Navigation();
nav.init()



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

// By overring the XMLHttpRequest.open method it is possible to control the XHR responses
var old_Open = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
	this.addEventListener('readystatechange', function () {
		if (this.readyState === 4) {
			if (this.responseURL.includes('fut.ea.com/ut/game/fifa20/usermassinfo')) {
				// console.log(this.responseText)
			} else if (this.responseURL.includes('fut.ea.com/ut/game/fifa20/club?sort=desc')) {
				var isClubTab = document.querySelector(".ut-tab-bar-item.icon-club.selected");
				if (isClubTab) {
					var data = JSON.parse(this.responseText);
					window.store.state.playersData = window.store.state.playersData.concat(data.itemData)
					window.store.state.playersData = window.store.state.playersData.filter((player, index, self) =>
						index === self.findIndex((p) => (
							p.id === player.id
							))
						)
				}
			} else if (this.responseURL.includes('fut.ea.com/ut/game/fifa20/transfermarket') && !this.responseURL.includes('definitionId')) {
				var ratingsFilter = window.store.state.ratingsFilter;
				var raritiesFilter = window.store.state.raritiesFilter;
				var removeID = raritiesFilter.map((x) => x.show ? null : x.id )
				var data = JSON.parse(this.responseText);

				for (var i = 0; i < data.auctionInfo.length; i++) {
					if (data.auctionInfo[i].itemData.rating < ratingsFilter.min || 
						data.auctionInfo[i].itemData.rating > ratingsFilter.max ||
						removeID.includes(data.auctionInfo[i].itemData.rareflag)) {
						data.auctionInfo[i].tradeId = 0;
					data.auctionInfo[i].itemData = {};
				}
			}
			Object.defineProperty(this, 'response', { writable: true });
			Object.defineProperty(this, 'responseText', { writable: true });
			this.responseText = JSON.stringify(data);
			this.response = JSON.stringify(data);
		} else if (this.responseURL.includes('fut.ea.com/ut/game/fifa20/tradepile')) {
			// console.log(this.responseText)
		} else if (this.responseURL.includes('fut.ea.com/ut/game/fifa20/store/purchaseGroup/cardpack')) {
			// 
		}
	}
}, false);

	old_Open.call(this, method, url, async, user, pass);
};
