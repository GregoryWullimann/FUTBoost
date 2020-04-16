<template>
	<div class="search-prices">
		<div class="search-price-header" id="customElement">
			<h1>Rating:</h1>
			<button class="flat camel-case" @click="min = 0; max = 100">Clear</button>
		</div>
		<div class="price-filter">
			<div class="info"><span class="label">Min:</span></div>
			<div class="ut-numeric-input-spinner-control">
				<button class="btn-standard decrement-value" :class="{ disabled: min <= 0 }" :disabled="min <= 0" @click="min = min > 0 ? min - 1 : min"></button>
				<input type="tel" class="numericInput ratingsValue" placeholder="Any" v-model="min">
				<button class="btn-standard increment-value" :class="{ disabled: min >= 100 }" :disabled="min >= 100" @click="min = min < 100 ?  min + 1 : min"></button>
			</div>
		</div>
		<div class="price-filter">
			<div class="info"><span class="label">Max:</span></div>
			<div class="ut-numeric-input-spinner-control">
				<button class="btn-standard decrement-value" :class="{ disabled: max <= 0 }" :disabled="max <= 0" @click="max = max > 0 ? max - 1 : max"></button>
				<input type="tel" class="numericInput ratingsValue" placeholder="Any" v-model="max">
				<button class="btn-standard increment-value" :class="{ disabled: max >= 100 }" :disabled="max >= 1000" @click="max = max < 100 ?  max + 1 : max"></button>
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
			};
		},

		methods: {
			writeInConsole() {

			}
		},
		computed: {
			...mapFields([
				'ratingsFilter.min',
				'ratingsFilter.max',
				]),
		}
	};
</script>

<style scoped>
.ut-market-search-filters-view.floating .search-prices .price-filter {
	width: 49.7% !important;
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
