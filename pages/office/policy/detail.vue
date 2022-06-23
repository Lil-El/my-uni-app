<template>
	<view class="uni-page uni-bg__white">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ""
			}
		},
		async onLoad(option) {
			const url = decodeURIComponent(JSON.parse(option.url))
			this.url = url;
		}
	}
</script>