<template>
	<div class="main-wrapper">
		<div class="container p-0">
			<div class="row bg-dark text-white px-2 py-1">
				<div class="col">
					<h3>FUT Boost</h3>
				</div>
				<div class="col text-right">
					<a href="https://github.com/" @click="openLink('https://github.com/')">	
						<img :src="gitHubLogo" class="img-fluid">
					</a>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<ul class="nav nav-tabs" id="navTab" role="tablist">
						<li class="nav-item">
							<a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">
								Home
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link active" id="shortcutsTab-tab" data-toggle="tab" href="#shortcutsTab" role="tab" aria-controls="shortcutsTab" aria-selected="true">
								Shortcuts
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="false">
								Settings
							</a>
						</li>
					</ul>
					<div class="tab-content" id="navTabContent">
						<div class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
							Thanks for using FUT Boost! 
						</div>
						<div class="tab-pane fade show active" id="shortcutsTab" role="tabpanel" aria-labelledby="shortcutsTab-tab">
							<div class="container pt-1">
								<shortcut v-for="shortcut in shortcuts" v-if="shortcuts" :data="shortcut" :key="shortcut.id"></shortcut>
							</div>
						</div>
						<div class="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
							Coming Soon
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const browser = require("webextension-polyfill");
	import 'bootstrap';
	import ShortcutComponent from './../components/Shortcut';
	import { mapFields } from 'vuex-map-fields';

	export default {
		data() {
			return {
			};
		},
		created: function () {
			chrome.storage.local.set({shortcuts: this.shortcuts});
		},
		computed: {
			gitHubLogo: function(){
				return chrome.extension.getURL('images/GitHub-Mark-Light-32px.png');
			},
			...mapFields([
				'shortcuts'
				])
		},
		methods: {
			openLink(link) {
				chrome.tabs.create({url: link});
			}
		},
		components: {
			'shortcut': ShortcutComponent,
		}
	};
</script>

<style lang="scss" scoped>

</style>
<style scoped lang="scss">
.main-wrapper /deep/ {
	@import "~bootstrap/dist/css/bootstrap.min";
}
</style>