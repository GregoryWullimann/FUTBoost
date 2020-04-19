<template>
	<div class="row mb-1">
		<div class="col-6">
			<span>{{ data.fullText }}</span>
		</div>
		<div class="col-4 text-right">
			<kbd>
				{{ shortUpper }}
			</kbd>
		</div>
		<div class="col-2">
			<button class="btn-standard" @click="stopRecord" v-if="isRecording">Save</button>
			<button class="btn-standard" @click="recordShortcut" v-else>Edit</button>

		</div>
	</div>
</template>

<script>
	const browser = require("webextension-polyfill");
	import { mapFields } from 'vuex-map-fields';
	export default {
		props: {
			data: Object
		},
		data() {
			return {
				isRecording: false
			};
		},

		methods: {
			recordShortcut: function (event) {
				this.isRecording = true;
				this.saveKey = (e) => {
					if (!e.repeat){
						this.data.shortcut = e.key
						this.$store.commit("changeShortcut", {id: this.data.id, shortcut: e.key})
					}
				}
				document.addEventListener('keydown', this.saveKey);
			},
			stopRecord: function (event) {
				this.isRecording = false
				document.removeEventListener('keydown', this.saveKey)

				
			}
		},
		computed: {
			shortUpper(){
				return this.data.shortcut.toUpperCase()
			},
			...mapFields([
				]),
		}
	};
</script>

<style scoped>

</style>
