<template>
	<div class="search-prices">
		<div class="search-price-header">
			<h1>Preset {{ id }}:</h1>
		</div>
		<div class="price-filter">
			<button class="btn-standard mini call-to-action" @click="save">Save</button>
			<button class="btn-standard mini call-to-action" @click="load">Load</button>			
		</div>
	</div>
</template>

<script>
	const browser = require("webextension-polyfill");
	import { mapFields } from 'vuex-map-fields';
	import actions from "./../js/actions.js";
	import utils from "./../utils.js";

	export default {
		props: {
			id: Number,
		},
		data() {
			return {
			};
		},

		methods: {
			save() {
				var inputsNumeric = document.querySelectorAll(".ut-pinned-list input[type=tel]");
				var inputText = document.querySelector(".ut-pinned-list input[type=text]");
				var checkboxes = document.querySelectorAll(".ut-pinned-list input[type=checkbox]");
				var preset = {}
				preset.name = inputText.value;
				preset.minBid = parseInt(inputsNumeric[0].value.replace(/,/g, ''));
				preset.maxBid = parseInt(inputsNumeric[1].value.replace(/,/g, ''));
				preset.minBIN = parseInt(inputsNumeric[2].value.replace(/,/g, ''));
				preset.maxBIN = parseInt(inputsNumeric[3].value.replace(/,/g, ''));
				preset.minRating = parseInt(inputsNumeric[4].value);
				preset.maxRating = parseInt(inputsNumeric[5].value);
				preset.rarities = Array.from(checkboxes).map((x) => x.checked)

				var view = utils.getCurrentView();
				preset.quality = view._searchFilters._filters[0].getIndex();
				preset.position = view._searchFilters._filters[1].getIndex();
				preset.chemistry = view._searchFilters._filters[2].getIndex();
				preset.nationality = view._searchFilters._filters[3].getIndex();
				preset.league = view._searchFilters._filters[4].getIndex();
				preset.club = view._searchFilters._filters[5].getIndex();

				var playerSelect = view.getPlayerNameSearch();
				preset.player = null;
				if(playerSelect._selected){
				    preset.player = {
				    	id: playerSelect._selected.id, 
				    	name: playerSelect._selected.commonName ? playerSelect._selected.commonName : playerSelect._selected.firstName + " " + playerSelect._selected.lastName
				    }
				}

				this.presets[this.id-1] = preset;
				services.Notification.queue([`Preset ${this.id} saved`, enums.UINotificationType.NEUTRAL])
			},
			load() {
				actions.loadPreset({value: this.id});

			}
		},
		computed: {
			...mapFields([
				"presets"
				]),
		}
	};
</script>

<style scoped>
.price-filter {
	width: 49.7% !important;

}

.btn-standard{
	display: inline-block;
	margin-right: 16px;
}
.btn-standard:hover{
	background-color: #fc4554;
	color: #f2f2f2;
}

.btn-standard.disabled:hover{
	background-color: #ddd;
	color: #f2f2f2;
}
</style>
