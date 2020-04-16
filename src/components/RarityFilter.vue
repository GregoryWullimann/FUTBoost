<template>
	<div class="search-prices">
		<div class="search-price-header" id="customElement">
			<h1>Rarity:</h1>
			<button class="flat camel-case" @click="raritiesFilter.map(x => { x.show = selectAll; return x }); selectAll = !selectAll">
				{{ selectAll ? "Select all" : "Unselect all" }}
			</button>
		</div>
		<div class="price-filter">
			<div v-for="rarity in firstHalf" :key="rarity.id">
				<input type="checkbox" class="form-check-input" v-model="rarity.show">
				<label class="form-check-label">{{ rarity.name }}</label>
			</div>
		</div>
		<div class="price-filter">
			<div v-for="rarity in secondHalf" :key="rarity.id">
				<input type="checkbox" class="form-check-input" v-model="rarity.show">
				<label class="form-check-label">{{ rarity.name }}</label>
			</div>
		</div>
	</div>
</template>

<script>
	const browser = require("webextension-polyfill");
	import { mapFields } from 'vuex-map-fields';

	export default {
		data() {
			return {
				selectAll: false,
			};
		},

		methods: {
		},
		computed: {
			raritiesSorted: function () {
				var tmp = this.raritiesFilter.slice(0, this.raritiesFilter.length);
				return tmp.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
			},
			firstHalf: function () {
				return this.raritiesSorted.slice(0, Math.ceil(this.raritiesSorted.length / 2))
			},	
			secondHalf: function () {
				return this.raritiesSorted.slice(Math.ceil(this.raritiesSorted.length / 2), this.raritiesSorted.length)
			},
			...mapFields([
				'raritiesFilter'
				]),
		}
	};
</script>

<style scoped>
.ut-market-search-filters-view.floating .search-prices .price-filter {
	width: 49.7% !important;
}
</style>
