<template>
	<div class="main-wrapper">
		<table class="table mb-0">
			<thead class="thead-dark">
				<tr>
					<th class="align-middle text-left" scope="col" colspan="2">League</th>
					<th class="align-middle text-right" scope="col">Count</th>
					<th class="align-middle text-right" scope="col">Untradeable</th>
					<th class="align-middle text-right" scope="col">Quick Sell</th>
					<th class="align-middle text-right" scope="col">
						<button class="btn-standard mini call-to-action mx-auto" @click="collapse = !collapse">{{ collapse ? "-" : "+" }}</button>
					</th>
				</tr>
			</thead>
			<thead class="thead-dark">
				<tr>
					<th class="align-middle text-left" scope="col" colspan="2">Total</th>
					<th class="align-middle text-right" scope="col">{{totalSize}}</th>
					<th class="align-middle text-right" scope="col">{{totalUntradableCount}}</th>
					<th class="align-middle text-right" scope="col">{{totalDiscardValue}}</th>
					<th class="align-middle text-right" scope="col"></th>
				</tr>
			</thead>
		</table>
		<league-summary v-for="league in data" :data="league" :key="league.leagueID" v-show="collapse"></league-summary>
	</div>
</template>

<script>
	const browser = require("webextension-polyfill");
	import { mapFields } from 'vuex-map-fields';
	import _ from 'lodash'; 
	import utils from "./../utils.js"; 
	import LeagueSummary from './LeagueSummary'

	export default {
		data() {
			return {
				utils: utils,
				collapse: false,
			};
		},

		methods: {

		},
		computed: {
			data: function () {
				var playersStats = _.chain(this.playersData)
				.groupBy("leagueId")
				.map((players, key) => {
					var teams = _.chain(players)
					.groupBy("teamid")
					.map((players, key) => {
						var untradableCount = _.sumBy(players, (p) => p.untradeable | 0 );
						var discardValue = _.sumBy(players, (p) => p.discardValue );
						return { teamID: key, teamName: utils.teams[key], size: players.length, players: players, untradableCount: untradableCount, discardValue: discardValue, tradableCount: players.length - untradableCount}
					}).value()
					var untradableCount = _.sumBy(players, (p) => p.untradeable | 0 );
					var discardValue = _.sumBy(players, (p) => p.discardValue );
					return { leagueID: key, leagueName: utils.leagues[key], size: players.length, teams: teams, untradableCount: untradableCount, discardValue: discardValue, tradableCount: players.length - untradableCount}
				})
				.value();
				return playersStats.sort((a,b) => (a.leagueName > b.leagueName) ? 1 : ((b.leagueName > a.leagueName) ? -1 : 0));
			},
			totalUntradableCount: function(){
				return _.sumBy(this.data, 'untradableCount');
			},
			totalDiscardValue: function(){
				return _.sumBy(this.data, 'discardValue');
			},
			totalSize: function(){
				return _.sumBy(this.data, 'size');
			},
			...mapFields([
				'playersData'
				]),
		},
		components: {
			'league-summary': LeagueSummary
		}
	};
</script>


<style scoped>

.main-wrapper {
	flex-direction: row;
	flex-wrap: nowrap;
	height: auto !important;
	width: 100%;
}

@media (min-width: 1281px){
	.main-wrapper {
		width: 100% !important;
		max-width: 1200px !important;
		margin: auto;
	}
}

.table{
	table-layout: fixed !important;
}
</style>

<style scoped lang="scss">
.main-wrapper /deep/ {
	@import "~bootstrap/dist/css/bootstrap.min";
	.table .thead-dark th{
		background-color: #31383f;
	}
}
</style>

<!-- <style type="text/css">
	.ut-navigation-container-view--content{
		position: unset !important;
	}
</style> -->