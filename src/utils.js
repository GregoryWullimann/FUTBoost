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
	return window.getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController();
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