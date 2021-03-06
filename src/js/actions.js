import utils from "./../utils.js";

var switchCardView = function(){
	clickItem(document.querySelector(".ut-iteminfochange-button-control.btn-navigation-secondary"))	
}

var resetSearchFilter = function(){
	clickItem(document.querySelector(".ut-market-search-filters-view .button-container .btn-standard"))
}

var searchMarket = function(){
	clickItem(document.querySelector(".ut-market-search-filters-view .button-container .btn-standard.call-to-action"))
}

var buyNow = function(){
	Promise.resolve()
	.then(() => {
		clickItem(document.querySelector(".btn-standard.buyButton.currency-coins"))
	})
	.then(wait(300)).then(() => {
		confirmDialogBox()
	})
}

var confirmDialogBox = function(){
	clickItem(document.querySelector(".dialog-body .btn-text"))
}

var makeBid = function(){
	clickItem(document.querySelector(".btn-standard.call-to-action.bidButton"))
}

var watchToggle = function(){
	clickItem(document.querySelector(".ut-toggle-button-control.watch"))
}

var nextPage = function(){
	clickItem(document.querySelector("button.flat.pagination.next"))
}

var prevPage = function(){
	clickItem(document.querySelector("button.flat.pagination.prev"))
}

var goBack = function(){
	clickItem(document.querySelector("button.ut-navigation-button-control"))
}

var storeAll = function(){
	clickItem(document.querySelector(".ut-unassigned-view.ui-layout-left button.btn-standard.section-header-btn.mini.call-to-action"))
}

var quickSellAll = function(){
	Promise.resolve()
	.then(() => {
		clickItem(document.querySelector(".ut-unassigned-view.ui-layout-left button.ut-group-button.cta"))
	})
	.then(wait(300)).then(() => {
		confirmDialogBox()
	})
}

var comparePrice = function(){
	var btnGroup = document.querySelectorAll(".DetailPanel .ut-button-group button");
	// Market search
	if(btnGroup.length == 2){
		clickItem(btnGroup[1])
		// SBC Builder
	}else if(btnGroup.length == 9){
		clickItem(btnGroup[6])
		// Club search, Transfer list
	}else if(btnGroup.length == 10){
		clickItem(btnGroup[8])
		// Pack content
	}else if(btnGroup.length == 11){
		clickItem(btnGroup[9])
	}
}

var storeItem = function(){
	var btnGroup = document.querySelectorAll(".DetailPanel .ut-button-group button");
	// SBC Builder
	if(btnGroup.length == 9){
		if(btnGroup[1].textContent.toLowerCase().includes("redeem coins")){
			clickItem(btnGroup[1])
		}else{
			clickItem(btnGroup[7])
		}
		// Club search, Transfer list
	}else if(btnGroup.length == 10){
		clickItem(btnGroup[5])
		// Pack content
	}else if(btnGroup.length == 11){
		clickItem(btnGroup[6])
	}
}

var sendToTransfer = function(){
	var btnGroup = document.querySelectorAll(".DetailPanel .ut-button-group button");
	// SBC Builder
	if(btnGroup.length == 9){
		clickItem(btnGroup[7])
	}else if(btnGroup.length == 10){
		clickItem(btnGroup[5])
	}
}

var quickSell = function(){
	var btnGroup = document.querySelectorAll(".DetailPanel .ut-button-group button");
	var btn;
	// SBC Builder
	if(btnGroup.length == 9){
		btn = btnGroup[8]
		// Club search, Transfer list
	}else if(btnGroup.length == 10){
		btn = btnGroup[9]
		// Pack content
	}else if(btnGroup.length == 11){
		btn = btnGroup[10]
	}

	Promise.resolve()
	.then(() => {
		clickItem(btn)
	})
	.then(wait(300)).then(() => {
		confirmDialogBox()
	})
}


var listItem = function(){
	var btnGroup = document.querySelectorAll(".DetailPanel .ut-button-group button");
	// SBC Builder
	if(btnGroup.length == 9){
		clickItem(btnGroup[0])
		// Club search, Transfer list
	}else if(btnGroup.length == 10){
		clickItem(btnGroup[0])
		// Pack content
	}else if(btnGroup.length == 11){
		clickItem(btnGroup[1])
	}
}

var loadPreset = function(v){
	var presets = window.store.state.presets
	var id = v.value

	if(id > presets.length){
		return;
	}
	var preset = presets[id-1];
	var view = utils.getCurrentView();
	var playerSelect = view.getPlayerNameSearch();
	if(preset.player){
		var entries = playerSelect._searchEngine.getEntriesForString(preset.player.name)
		var obj = entries.find((x) => x.id == preset.player.id)
		playerSelect._ePlayerEntryClicked(obj, preset.player.name)
	}
	view._minBidPriceRow._currencyInput.setValue(preset.minBid)
	view._maxBidPriceRow._currencyInput.setValue(preset.maxBid)
	view._minBuyNowPriceRow._currencyInput.setValue(preset.minBIN)
	view._maxBuyNowPriceRow._currencyInput.setValue(preset.maxBIN)
	view._searchFilters._filters[0].getDropDownElement().selectedIndex = preset.quality
	view._searchFilters._filters[0]._handleChange()
	view._searchFilters._filters[1].getDropDownElement().selectedIndex = preset.position
	view._searchFilters._filters[1]._handleChange()
	view._searchFilters._filters[2].getDropDownElement().selectedIndex = preset.chemistry
	view._searchFilters._filters[2]._handleChange()
	view._searchFilters._filters[3].getDropDownElement().selectedIndex = preset.nationality
	view._searchFilters._filters[3]._handleChange()

	Promise.resolve()
	.then(() => {
		view._searchFilters._filters[4].getDropDownElement().selectedIndex = preset.league
		view._searchFilters._filters[4]._handleChange()
	})
	.then(wait(200)).then(() => {
		view._searchFilters._filters[5].getDropDownElement().selectedIndex = preset.club
		view._searchFilters._filters[5]._handleChange()
	})

	for (var i = 0; i < window.store.state.raritiesFilter.length; i++) {
		window.store.state.raritiesFilter[i].show = preset.rarities[i]
	}
	services.Notification.queue([`Preset ${id} loaded`, enums.UINotificationType.NEUTRAL])
}

var listItemMinBIN = function(){
	Promise.resolve()
	.then(() => {
		listItem()
	})
	.then(wait(300)).then(() => {
		var currentController = utils.getCurrentController();
		if(currentController.className == "ClubSearchResultsSplitViewController"){
			var subController = currentController._childViewControllers[1]._childViewControllers[0]
		}else if(currentController.className == "UTSBCSquadSplitViewController"){
			var subController = currentController._childViewControllers[2]._childViewControllers[0]._childViewControllers[0]
		}else if(currentController.className == "UTUnassignedItemsSplitViewController"){
			var subController = currentController._childViewControllers[0]._childViewControllers[0]
		}
		subController._quickListPanel._view._bidNumericStepper._currencyInput.setValue(100)
		subController._quickListPanel._view._buyNowNumericStepper._currencyInput.setValue(100)
	})
	.then(wait(100)).then(() => {
		clickItem(document.querySelector(".panelActions button.btn-standard.call-to-action"))
	});

}

var makePriceBid = function(...[price]){
	Promise.resolve()
	.then(() => {
		document.querySelector(".bidOptions input.numericInput").value = price.value
	})
	.then(wait(300)).then(() => {
		makeBid()
	})
}

var listItemPrice = function(...[start, bin]){
	Promise.resolve()
	.then(() => {
		listItem()
	})
	.then(wait(300)).then(() => {
		document.querySelectorAll(".panelActionRow input.numericInput")[0].value = start.value
		document.querySelectorAll(".panelActionRow input.numericInput")[1].value = bin.value
		clickItem(document.querySelector(".panelActions button.btn-standard.call-to-action"))
	})
}

var selectNextItem = function(){
	var current = document.querySelector(".listFUTItem.selected");
	if(current){
		clickItem(current.nextSibling)
	}
}

var selectPrevItem = function(){
	var current = document.querySelector(".listFUTItem.selected");
	if(current){
		clickItem(current.previousSibling)
	}
}

var openPack = function(id){
	var packContainer = document.getElementById(id);
	if(packContainer){
		Promise.resolve()
		.then(() => {
			clickItem(packContainer.querySelector("button.coins"))
		})
		.then(wait(300)).then(() => {
			confirmDialogBox();
		})
	}
}

var openBronzePack = function(){
	Promise.resolve()
	.then(() => {
		var storeBtn = document.querySelector(".ut-tab-bar button.icon-store");
		clickItem(storeBtn)
	})
	.then(wait(750)).then(() => {
		var menu = document.querySelector(".menu-container");
		var menuEl = menu.children;
		clickItem(menuEl[menuEl.length-1])
	}).then(wait(150)).then(() => {
		openPack(100)
	})
}

function buildBronzeSBC(){
	Promise.resolve()
	.then(() => {
		clickItem(document.getElementById("6"))
	})
	.then(wait(500)).then(() => {
		fillSBC();
	})
}

function buildSilverSBC(){
	Promise.resolve()
	.then(() => {
		clickItem(document.getElementById("7"))
	})
	.then(wait(500)).then(() => {
		fillSBC();
	})
}

function fillSBC(){
	Promise.resolve()
	.then(() => {
		var buildSquadBtn = document.querySelectorAll(".btn-standard")[1];
		clickItem(buildSquadBtn)
	})
	.then(wait(500)).then(() => {
		var leagueDropDown = findElementWithText(document.querySelectorAll(".ut-search-filter-control--row"), "league")
		clickItem(leagueDropDown)
	})
	.then(wait(250)).then(() => {
		var dropDownItems = document.querySelectorAll(".inline-list li");
		var validLeagues = ["EFL League One (ENG 3)", "EFL League Two (ENG 4)", "Domino’s Ligue 2 (FRA 2)", "Calcio B (ITA 2)", "Bundesliga 2 (GER 2)", "3. Liga (GER 3)", "LaLiga SmartBank (ESP 2)", "3F Superliga (DEN 1)", "Allsvenskan (SWE 1)", "Eliteserien (NOR 1)", "Finnliiga (FIN 1)", "Hellas Liga (GRE 1)", "Hyundai A-League (AUS 1)", "K-League 1 (KOR 1)", "League of Russia (RUS 1)", "LIGA BBVA MX (MEX 1)", "Liga Hrvatska (CRO 1)", "Liga I (ROM 1)", "Meiji Yasuda J1 (JPN 1)", "PKO Ekstraklasa (POL 1)", "Pro League (BEL 1)", "RSL (SUI 1)", "Scottish Prem (SPFL)", "SSE Airtricity Lge (IRL 1)", "United Emirates League (UAE 1)", "Ö. Bundesliga (AUT 1)", "Česká Liga (CZE 1)"]
		var r = Math.floor(Math.random() * Math.floor(validLeagues.length));
		var randomLeagueName = validLeagues[r];
		var el = findElementWithText(dropDownItems, randomLeagueName.toLowerCase())
		clickItem(el)
	}).then(wait(250)).then(() => {
		var buildMainBtn = document.querySelector(".btn-standard.call-to-action");
		clickItem(buildMainBtn)
	}).then(wait(250)).then(() => {
		moveFromBenchSBC()
	});
}

function findElementWithText(e, text){
	return Array.from(e).find(el => el.textContent.toLowerCase().includes(text));
}

function moveFromBenchSBC(){
	var currentController = utils.getCurrentController()
	var sbcController = currentController._leftController
	var players = sbcController._squad._players
	for(var i = 11; i < players.length; i++){
		if(players[i].item.id == 0 || players[i].item.rareflag == 94){
			continue;
		}
		for(var j = 0; j < 11; j++){
			if(players[j].item.id == 0 || players[i].item.rareflag == 94){
				var tmp = players[j].item
				players[j].item = players[i].item;
				players[i].item = tmp;
				break;
			}
		}
	}

	sbcController._squad._players = players
	sbcController.applyDataChange()
	services.SBC.saveChallenge(sbcController._challenge).observe(sbcController, sbcController._onSBCSaveComplete)
	currentController.viewDidAppear()
}

function wait(ms) {
	var r = Math.random() * ((ms+100) - ms) + ms;
	return value => new Promise(resolve => setTimeout(() => resolve(value), r));
}

function disptachEvent(e, t){
	var n = new Touch({
		identifier: Math.random().toString(),
		target: e,
		clientX: Math.random(),
		clientY: Math.random(),
		radiusX: 2.5,
		radiusY: 2.5,
		rotationAngle: 10,
		force: .5
	});

	var r = new TouchEvent(t, {
		cancelable: !0,
		bubbles: !0,
		touches: [n],
		targetTouches: [n],
		changedTouches: [n],
		shiftKey: !0
	});

	e.dispatchEvent(r);
}

function clickItem(e){
	if(!e){
		return false;
	}
	disptachEvent(e, "touchstart")
	disptachEvent(e, "touchend")
	return true;
}


export default { 
	switchCardView,
	resetSearchFilter,
	buyNow,
	makeBid,
	watchToggle,
	searchMarket,
	nextPage,
	prevPage,
	goBack,
	storeAll,
	quickSellAll,
	comparePrice,
	storeItem,
	sendToTransfer,
	quickSell,
	listItem,
	listItemMinBIN,
	makePriceBid,
	selectPrevItem,
	selectNextItem,
	listItemPrice,
	loadPreset,
	openBronzePack,
	fillSBC,
	buildBronzeSBC,
	buildSilverSBC
};