import rarities from './json/rarities.json';
import teams from './json/teams.json';
import leagues from './json/leagues.json';
import nations from './json/nations.json';



var stringToHTML = function(str) {
	var template = document.createElement('template');
	str = str.trim(); // Never return a text node of whitespace as the result
	template.innerHTML = str;
	return template.content.firstChild;
}

window._0x2d5402 = function(){}
window._0x249037 = function(){}
if(typeof UTSBCHubView !== 'undefined'){
	UTSBCHubView.prototype.populateTiles = function populateTiles(e, t) {
		DOMKit.empty(this.__sbcSetTiles),
		this.clearTiles(),
		e = e.filter(function(e) {
			return e.isDisplayable()
		}),
		utils.JS.isValid(t) && DOMKit.toggleDisplayStyle(this.__favoritesTile, 0 === e.length && t.type === enums.SBC.CATEGORY_TYPE.CUSTOM_FAVOURITE),
		e.forEach(function _generateTile(e) {
			var t = new UTSBCSetTileView;
			t.init(),
			t.__root.id = e.id,
			t.setTitle(e.name),
			t.setData(e),
			t.addTarget(this, this._eTileSelected, enums.Event.TAP),
			t.addTarget(this, this._eTilePreviewSelected, UTSBCSetTileView.Event.PREVIEW_SELECTED),
			this._sbcSetTiles.push(t),
			this.__sbcSetTiles.appendChild(t.getRootElement()),
			t.render()
		}, this),
		DOMKit.toggleClass(this.getRootElement(), "single-set", e.length <= 1)
	}
}
if(typeof UTSBCHubView !== 'undefined'){
	UTStoreView.prototype._generatePack = function _generatePack(e, t, i, s) {
		var o = new UTStorePackDetailsView
		, n = e.getPrice(enums.Currency.COINS)
		, a = e.getPrice(enums.Currency.POINTS);
		o.init(),
		o.__root.id = e.id,
		o.setPackId(e.id),
		o.setPackBackground(e.assetId, e.guidAssetId),
		o.setPackForeground(e.assetId),
		o.setPromo(e.dealType, e.isLimited),
		o.setName(services.Localization.localize(e.packName)),
		o.setDescription(services.Localization.localize(e.packDesc)),
		o.setPackQuantity(e.quantity),
		o.setItemCounts(e.itemQuantity, e.bronzeQuantity, e.silverQuantity, e.goldQuantity, e.rareQuantity),
		o.setTimeRemaining(e.end),
		o.setCoinsAmount(n),
		o.setPointsAmount(a),
		o.toggleOdds(s),
		o.setMyPack(e.isMyPack),
		e.isMyPack || (o.toggleCoins(i.coins && 0 < n),
			o.togglePoints(i.points && 0 < a),
			t.forEach(function(e) {
				e.type === enums.Currency.COINS ? o.enableCoinPurchase(0 < n && e.amount >= n) : e.type === enums.Currency.POINTS && o.enablePointsPurchase(0 < a && e.amount >= a)
			})),
		o.addTarget(this, this._ePackEventHandler, enums.UIPackEvent.OPEN),
		o.addTarget(this, this._ePackEventHandler, enums.UIPackEvent.BUY_COINS),
		o.addTarget(this, this._ePackEventHandler, enums.UIPackEvent.BUY_POINTS),
		o.addTarget(this, this._ePackEventHandler, enums.UIPackEvent.CHECK_ODDS),
		this.addSubview(o, this.__itemList),
		this._storePacks.push(o)
	}
}

if(typeof components !== 'undefined'){
	components.ItemFUTBase.prototype.render = function render(e) {
		if(this.getRootElement().parentNode)
			this.getRootElement().parentNode.setAttribute("id", e.resourceId.toString())
		var t = services.Configuration.getItemRarity(e, e.getYear());
		this._rendered && this._resetRender(),
		this._canvas && (this._canvas.clearCanvas(),
			this.removeClass(components.ItemFUTBase.CLASS.LOADED),
			this.addClass(components.ItemFUTBase.CLASS.LOADING)),
		this.assets = {},
		this._assetsLoaded = {},
		this._renderShell(e, t),
		this._render(e, t),
		this.renderAuctionState(e.getAuctionData()),
		this._rendered = !0;
		var i = this._infoStateViewModel && this._canShowSecondaryViews ? this._infoStateViewModel.getState() : enums.UIItemInfoState.MAIN;
		this.setItemInfoState(i)
	}

	components.ListRowItem.prototype.render = function render() {
		utils.Debug.Assert(utils.JS.isValid(this.data), "Missing item data in list row component.");
		var e = this.getData()
		, t = utils.JS.isValid(this._itemComponent);
		t && this._itemComponent.canRender(e) || (t && this._itemComponent.destroy(),
			this._itemComponent = factories.ItemView.createSmallItem(e),
			this._itemComponent.init(),
			this.__entityContainer.insertBefore(this._itemComponent.getRootElement(), this.__entityContainer.firstChild)),
		this.renderItemData(),
		this._itemComponent.render(e),
		this.renderName(),
		utils.JS.isValid(this._dataComponent) && this._viewDirty && (this._dataComponent.destroy(),
			this._dataComponent = null),
		utils.JS.isValid(this._dataComponent) ? this._updateDataComponent(this._dataComponent, this.data, this.comparisonData, this.slotData) : this.setDataComponent(this._generateDataComponent(this.data, this.comparisonData, this.slotData)),
		utils.JS.isValid(this._activeTagComponent) || this.setActiveTagComponent(this._generateActiveTagComponent(this.data)),
		utils.JS.isValid(this.slotData) && !this.slotData.isValid() && this.data.isPlayer() && (this.__name.textContent = enums.Localization.BLANK_STR),
		utils.JS.isValid(this._dataComponent) && (this.__entityContainer.appendChild(this._dataComponent.getRootElement()),
			this._dataComponent.render(e)),
		utils.JS.isValid(this._activeTagComponent) && (this.addClass(enums.UIListRowState.IS_ACTIVE_SQUAD),
			this.__rowContent.appendChild(this._activeTagComponent.getRootElement()),
			this._activeTagComponent.render(e)),
		this._highlightUnassignedBought();
		if(this.data.resourceId == 0){
			this.__root.style.display = "none";
		}
		this._viewDirty = !1,
		this.onTimedUpdate()
	}
}
if(typeof UTSBCChallengeTileView !== 'undefined'){
	UTSBCChallengeTileView.prototype.render = function render() {
		if (utils.JS.isValid(this._data)) {
			var e = this._data.isInProgress()
			, t = this._data.isCompleted();
			this.__root.id = this._data.id,
			this.toggleClass("complete", t),
			this.toggleClass("in-progress", e),
			this._challengeImage.setResource(utils.AssetLocator.getSBCImageURI(utils.AssetLocator.IMAGE_TYPE_SBC_CHALLENGES, enums.Year.ASSET, this._data.assetId), !0).observe(this, function onResourceLoaded(e, t, i, s) {
				e.unobserve(this),
				t || this._challengeImage.setLocalResource("images/sbc/sbcDefaultChallengeTile.png")
			}),
			this._data.hasNotStarted() ? this.__subTitle.textContent = services.Localization.localize("sbc.challenge.status.notStarted") : e ? this.__subTitle.textContent = services.Localization.localize("sbc.challenge.status.inProgress") : t && (this.__subTitle.textContent = services.Localization.localize("sbc.challenge.status.complete"))
		}
	}
}
if(typeof UTSBCChallengesView !== 'undefined'){
	UTSBCChallengesView.prototype.setSBCSet = function setSBCSet(e) {
		this.__root.id = e.id,
		this._setInfo.setProgress(e.challengesCompletedCount, e.challengesCount),
		this._setInfo.setRewards(e.awards),
		this._setInfo.setRepeatableState(e.repeatable),
		this._setInfo.setEndTime(e.endTime || 0),
		this._setInfo.setExpiryState(!e.notExpirable),
		this._setInfo.setFavoriteState(e),
		this.clearChallenges(),
		e.challenges.forEach(this._generateChallengeTile, this),
		this.layoutSubviews()
	}
}
var getMinPrices = function(str) {
	fetch('https://cors-anywhere.herokuapp.com/https://www.futbin.com/stc/cheapest')
	.then((response) => {
		return response.text().then(function(text) {
			parser = new DOMParser();
			doc = parser.parseFromString(text, "text/html");          
			var container = doc.querySelectorAll(".top-stc-players-box");
			var prices = {};

			for (var i = 0; i < container.length; i++) {
				var rating = container[i].querySelector("span span").innerText;
				var minPrice = container[i].querySelector(".price-holder-row span").innerText;
				var multiplier = minPrice.includes('K') ? 1000 : minPrice.includes('M') ? 1000000 : 1;
				prices[parseInt(rating)] = parseFloat(minPrice.replace('K', '').replace('M', '')) * multiplier;
			}
			$scope.prices = prices;
		})
	});
}

var getPlayersPrice = function() {	
	var containers = Array.from(document.querySelectorAll(".entityContainer"));
	var ids = containers.map((x) => x.id)

	fetch(`https://cors-anywhere.herokuapp.com/https://www.futbin.com/20/playerPrices?player=0&rids=${ids.join(",")}`, {
	}).then((response) => {
		return response.json();
	})
	.then((data) => {
		for (let [id, value] of Object.entries(data)) {
			var container = document.getElementById(`${id}`);
			if(container){
				var list = container.querySelector(".player-stats-data-component");
				list.querySelector("ul").style.display = "inline-block"
				var price = data[id]["prices"][getPlatform().toLowerCase()]["LCPrice"]
				var updated = data[id]["prices"][getPlatform().toLowerCase()]["updated"]


				list.append(stringToHTML(`<ul style="display: inline-block;float: right;"><li>
					<span class="label">Price</span>
					<span class="value">${price}</span>
					</li>
					<li>
					<span class="label">Update</span>
					<span class="value">${updated}</span>
					</li>
					</ul>`))
			}
		}	
	});
}


var getSBCPrices = function() {
	if(window.store.state.SBCPrices){
		setSBCPrices(window.store.state.SBCPrices);
		return;
	}
	fetch('https://cors-anywhere.herokuapp.com/https://www.futbin.com/squad-building-challenges')
	.then((response) => {
		return response.text().then(function(text) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(text, "text/html");          
			var mainContainer = doc.querySelector(".all_sbc_sets_area");
			var sbcs = mainContainer.querySelectorAll("a");
			var costs = {}
			for (var i = 0; i < sbcs.length; i++) {
				var sbc = sbcs[i].querySelector(".sbc_set_box")
				if(!sbc){
					continue;
				}
				var id = sbcs[i].href.replace("https://www.easports.com/squad-building-challenges/ALL/", "")
				var name = sbc.querySelector(".set_name").innerText.trim();
				var imgID = sbc.querySelector(".set_box_front img.lazy").dataset.original.replace("https://cdn.futbin.com/content/fifa20/img/sbc/sbc_set_image_","").replace(".png","");
				var pc = sbc.querySelector(".estimated_coins_pc").dataset.price;
				var ps = sbc.querySelector(".estimated_coins_ps4").dataset.price;
				var xbox = sbc.querySelector(".estimated_coins_xone").dataset.price;
				var cost = {
					id: id,
					name: name,
					imgID: imgID,
					link: "https://www.futbin.com/squad-building-challenges/ALL/"+id,
					pc: parseInt(pc),
					ps: parseInt(ps),
					xbox: parseInt(xbox),
				}
				costs[id] = cost
			}
			window.store.state.SBCPrices = costs;
			setSBCPrices(window.store.state.SBCPrices)
		})
	});
}

var setSBCPrices = function(costs){
	var mainNavigation = document.querySelector(".ut-tab-bar-view.game-navigation");
	var container = mainNavigation.querySelector(".ut-navigation-container-view--content");
	var sbc = container.querySelectorAll(".sbc-set.sbc-tile");
	for (let [key, value] of Object.entries(costs)) {
		var currentSBC = document.getElementById(key);
		if(currentSBC){
			var c = currentSBC.querySelector(".group-rewards");
			if(c){
				c.append(stringToHTML(`
					<div class="content-container" style="justify-content: space-between;">
					<div class="tileContent customPrices">
					Estimated cost: ${new Intl.NumberFormat('en-UK').format(value[getPlatform().toLowerCase()])}
					</div>
					<div class="tileContent">
					<a href="${value.link}" target="_blank">Futbin solutions</a>
					</div>		
					</div>`))
			}
		}
	}
}

var getChallangesPrices = function(id) {
	fetch('https://cors-anywhere.herokuapp.com/https://www.futbin.com/squad-building-challenges/ALL/'+id)
	.then((response) => {
		return response.text().then(function(text) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(text, "text/html");          
			var challanges = doc.querySelectorAll(".chal_col");
			var costs = {}
			for (var i = 0; i < challanges.length; i++) {
				var id = challanges[i].querySelector(".mark-completed-challenge.notxtselect").dataset.challengeId
				var prices = challanges[i].querySelector(".est_chal_prices_holder");
				var link = challanges[i].querySelector(".btn_holder a").href;
				var pc = prices.dataset.pcPrice;
				var ps = prices.dataset.psPrice;
				var xbox = prices.dataset.xonePrice;
				var cost = {
					SBCLink: "https://www.futbin.com/squad-building-challenges/ALL/"+id,
					link: link.replace("https://www.easports.com","https://www.futbin.com"),
					pc: parseInt(pc),
					ps: parseInt(ps),
					xbox: parseInt(xbox),
				}
				costs[id] = cost
			}		
			console.log(costs);
			setChallangesPrices(costs);
		})
	});
}

var setChallangesPrices = function(costs){
	for (let [key, value] of Object.entries(costs)) {
		var challange = document.getElementById(key);
		if(challange){
			challange.append(stringToHTML(`
				<div class="content-container" style="display: flex;padding: 8px;justify-content: space-between;">
				<div class="tileContent customPrices">
				Estimated cost: ${new Intl.NumberFormat('en-UK').format(value[getPlatform().toLowerCase()])}
				</div>
				<div class="tileContent">
				<a href="${value.link}" target="_blank">Futbin solutions</a>
				</div>		
				</div>`))
		}
	}
}


var getPlatform = function(){
	return services.User.getUser().personas[0].platform;
}

var getCurrentController = function(){
	return getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController();
}

var getCurrentView = function(){
	return getCurrentController().getView();
}


export default { 
	rarities, 
	teams, 
	leagues,
	nations,
	stringToHTML,
	getMinPrices,
	getSBCPrices,
	getChallangesPrices,
	getPlatform,
	getPlayersPrice,
	getCurrentController,
	getCurrentView,
};