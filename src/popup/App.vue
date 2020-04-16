<template>
	<div class="main-wrapper">
		<div class="container p-0">
			<div class="row bg-dark text-white px-2 py-1">
				<div class="col">
					<h3>FUTEnhancher</h3>
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
							<a class="nav-link active" id="shortcuts-tab" data-toggle="tab" href="#shortcuts" role="tab" aria-controls="shortcuts" aria-selected="true">
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
							Thanks for using FUT Enhancer! 
						</div>
						<div class="tab-pane fade  show active" id="shortcuts" role="tabpanel" aria-labelledby="shortcuts-tab">
							<div class="container">
								<div class="row"  v-for="shortcut in shortcuts" v-if="shortcuts">
									<div class="col">
										<span>{{ shortcut.fullText }}</span>
									</div>
									<div class="col text-right">
										<kbd>
											{{ shortcut.shortcut.toUpperCase() }}
										</kbd>
									</div>
									<div class="col">
										<button class="btn-standard" @click="recordSequence">Edit</button>
									</div>
								</div>
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
	import { mapFields } from 'vuex-map-fields';
	import 'bootstrap';
	import {Shortcut} from 'shortcuts';


	export default {
		data() {
			return {

			};
		},

		computed: {
			gitHubLogo: function(){
				return chrome.extension.getURL('images/GitHub-Mark-Light-32px.png');
			},
			...mapFields([
				'shortcuts',
				]),
		},

		methods: {
			openLink(link) {
				console.log(this.store)
				chrome.tabs.create({url: link});
			},
			recordSequence(){
				const dispose = Shortcut.record ( shortcut => { // Recording shortcuts
					console.log ( 'Shortcut recorded:', shortcut );
				});
			}

		},

	};
</script>

<style lang="scss" scoped>

</style>
<style scoped lang="scss">
.main-wrapper /deep/ {
	@import "~bootstrap/dist/css/bootstrap.min";
}
</style>