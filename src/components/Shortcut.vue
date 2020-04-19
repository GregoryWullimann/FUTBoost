<template>
	<div class="row mb-1">
		<div class="col-4">
			<span>{{ data.fullText }}</span>
		</div>
		<div class="col-4 text-right">
			<div class="input-group">
				<input type="text" class="form-control form-control-sm" v-for="params in data.params" v-if="data.params" v-model="params.value" :placeholder="params.name">
			</div>
		</div>
		<div class="col-2 text-right">
			<kbd>
				{{ shortcutUpper }}
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
						this.$store.commit("changeShortcut", this.data)
					}
				}
				document.addEventListener('keydown', this.saveKey);
			},
			stopRecord: function (event) {
				this.isRecording = false
				document.removeEventListener('keydown', this.saveKey)
				this.$emit('shortcutChanged')
			}
		},
		computed: {
			shortcutUpper(){
				return this.data.shortcut.toUpperCase()
			},
			...mapFields([
				]),
		},
		watch: {
			data: {
				handler(val, old){
					console.log(this.data)
					this.$store.commit("changeShortcut", this.data)
				},
				deep: true
			}
		}
	};
</script>

<style scoped>
.form-control-sm{
	height: calc(1em + .4rem + 2px) !important;
	padding: 0.25rem 0.5rem !important;
	font-size: 0.875rem !important;
	line-height: 1 !important;
	border-radius: .2rem !important;
}
</style>
