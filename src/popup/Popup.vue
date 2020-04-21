<template>
	<div class="main-wrapper">
		<div class="container p-0">
			<div class="row bg-dark text-white px-2 py-1">
				<div class="col">
					<h3>FUT Boost</h3>
				</div>
				<div class="col text-right">
					<a href="https://github.com/GregoryWullimann/FUTBoost" @click="openLink('https://github.com/')">	
						<img :src="gitHubLogo" class="img-fluid">
					</a>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<ul class="nav nav-tabs" id="navTab" role="tablist">
						<li class="nav-item">
							<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
								Home
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="shortcutsTab-tab" data-toggle="tab" href="#shortcutsTab" role="tab" aria-controls="shortcutsTab" aria-selected="false">
								Shortcuts
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="false">
								Settings
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="faq-tab" data-toggle="tab" href="#faq" role="tab" aria-controls="faq" aria-selected="false">
								FAQ
							</a>
						</li>
					</ul>
					<div class="tab-content" id="navTabContent">
						<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
							<div class="container pt-1">
								<div class="row">
									<div class="col">
										<h5>Welcome to FUT Boost!</h5>
										<p>This tool will simplify your life in the FUT Web App thanks to many features such as:</p>
										<ul>
											<li>Advanced filters in the transfer market</li>
											<li>Filter presets</li>
											<li>Club overview</li>
											<li>Players prices</li>
											<li>Squad Building Challanged prices</li>
											<li>Quick shortcuts</li>
											<li>And more to come!</li>
										</ul>
										<p>The tool is completely free and open-source, if you are interested in contribuing you can check out our <a href=""@click="openLink('https://github.com/GregoryWullimann/FUTBoost')">GitHub repository</a>.</p>
									</div>
								</div>
							</div>
						</div>
						<div class="tab-pane fade" id="shortcutsTab" role="tabpanel" aria-labelledby="shortcutsTab-tab">
							<div class="container pt-1">
								<div class="row" v-if="showReload">
									<div class="col">
										<p class="text-info text-center">
											You have to reload the FUT Web App to apply the changes.
										</p>
									</div>
								</div>
								<shortcut v-for="shortcut in shortcuts" v-if="shortcuts" :data="shortcut" :key="shortcut.id" @shortcutChanged="showReload = true"></shortcut>
							</div>
						</div>
						<div class="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
							<div class="container pt-1">
								<div class="row">
									<div class="col">
										Coming Soon
									</div>
								</div>
							</div>
						</div>
						<div class="tab-pane fade" id="faq" role="tabpanel" aria-labelledby="faq-tab">
							<div class="container pt-1">
								<div class="row">
									<div class="col">
										<dl>
											<dt>The shortcuts don't work!</dt>
											<dd>If you have modified a shortcut you have to restart the FUT web app in order to apply the changes.</dd>
											<dt>In the club summary I only see a few players!</dt>
											<dd>If you want to see a compelte club summary with all the players you have to scroll through all the pages in your club. This is a limitation we can't avoid.</dd>
											<dt>Can I get banned with FUT Boost?</dt>
											<dd>Currently there isn't a known risk of getting banned. If you are worried about your account you shouldn't be using this tool since we cannot guarantee that your account won't be banned.</dd>
											<dt>Do I have to pay something to use FUT Boost?</dt>
											<dd>No, it is free, forever!</dd>
											<dt>How can I help FUT Boost?</dt>
											<dd>The idea is to have the community develop FUT Boost, you can check out our GitHub repository to signal bugs, asks for new features, or develop new things!</dd>
										</dl>
									</div>
								</div>
							</div>
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
				showReload: false
			};
		},
		created: function () {
			console.log(this.shortcuts)
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