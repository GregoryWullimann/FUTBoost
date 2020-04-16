<template>
	<table class="table mb-0">
		<thead class="thead-light">
			<tr>
				<th class="align-middle text-left" scope="col" colspan="2">{{ data.leagueName }}</th>
				<th class="align-middle text-right" scope="col">{{ data.size }}</th>
				<th class="align-middle text-right" scope="col">{{ data.untradableCount }}</th>
				<th class="align-middle text-right" scope="col">{{ data.discardValue }}</th>
				<th class="align-middle text-right" scope="col">
					<button class="btn-standard mini call-to-action mx-auto" @click="collapse = !collapse">{{ collapse ? "-" : "+" }}</button>
				</th>
			</tr>
		</thead>
		<tbody v-show="collapse">
			<tr v-for="club in sortedTeams">
				<td class="align-middle text-left" scope="col" colspan="2">{{ club.teamName }}</td>
				<td class="align-middle text-right" scope="col">{{ club.size }}</td>
				<td class="align-middle text-right" scope="col">{{ club.untradableCount }}</td>
				<td class="align-middle text-right" scope="col">{{ club.discardValue }}</td>
				<td class="align-middle text-right" scope="col"></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
	const browser = require("webextension-polyfill");
	import { mapFields } from 'vuex-map-fields';
	import _ from 'lodash';  
	import utils from "./../utils.js";


	export default {
		props: {
			data: Object
		},
		data() {
			return {
				utils: utils,
				collapse: false,
			};
		},

		computed: {
			sortedTeams: function(){
				return this.data.teams.sort((a,b) => (a.teamName > b.teamName) ? 1 : ((b.teamName > a.teamName) ? -1 : 0));				
			}
		}
	};
</script>



<style scoped>
table{
	table-layout: fixed !important;
}

</style>
