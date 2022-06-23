<template>
	<view>
		<web-view :src="webUrl" @message="onMessage"></web-view>
	</view>
</template>

<script>
	import getCoordinates from "@/utils/getCoordinate.js"
	import transform from "@/utils/gpsTransformation.js"
	export default {
		mixins: [getCoordinates, transform],
		data() {
			return {
				webUrl: `http://${getApp().globalData.ip}:8586/#/app`,
				// webUrl: `http://192.168.0.125:9000/#/app`,
				webview: null,
			}
		},
		mounted() {
			this.webview = this.$scope.$getAppWebview().children()[0];
		},
		methods: {
			onMessage(evt) {
				const handler = evt.detail.data[0];
				this[handler.fnName]?.(handler.params);
			},
			// 将登录信息保存，使webview可以直接访问/app页面
			login() {
				const storage = [{
					key: "tokenId",
					value: uni.getStorageSync("token")
				}, {
					key: "user", 
					value: {
						userId: getApp().globalData.userInfo.id
					}
				}]
				this.webview.evalJS(`setStorageByApp(${JSON.stringify(storage)})`);
			},
			async getCoordinate() {
				try{
					const coords = await this.getLatlngOnline();
					const result = this.gcj02towgs84(coords.lat, coords.lng);
					this.webview.evalJS(`window.getCoordinate(${JSON.stringify({
						latitude: result[0],
						longitude: result[1],
					})})`);
				}catch(e){
				}
			},
			toast(title) {
				uni.$u.toast(title)
			}
		}
	}
</script>