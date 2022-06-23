<script>
	import {setHttpConfig} from "@/config/request.js"
	import gpsTransformation from "@/utils/gpsTransformation.js"
	import getCoordinate from "@/utils/getCoordinate.js"
	var appMap = null;
	var g_wakelock = null;
	export default {
		mixins: [gpsTransformation, getCoordinate],
		globalData: {
			ip: '60.214.209.188',
			port: '8585/factory',
			userInfo: uni.getStorageSync("userInfo") || {},
			pgyerKey: {
				_api_key: "7073fcffcf1d8b79c1284134fcd72d53",
				appKey: uni.$u.os() == "ios" ? "4b728030e1c1866efe377b49b767a706" : "657d7b3b98f48ae09b1d60146da807d4",						
			}
		},
		onLaunch() {
			setHttpConfig();
			this.onLocation();
		},
		methods: {
			onLocation() {
				return void 0; // TODO;
				if (uni.$u.os() === "android") {
					this.wakeLock();
				}
				uni.$on("$location", async () => {
					try {
						const coord = await this.getLatlngOnline();
						let [latitude, longitude] = this.gcj02towgs84(coord.lat, coord.lng);
						if (longitude && latitude) {
							await uni.$u.http.post("/app/user/addUserLocation", { longitude, latitude }, {
								custom: {
									toast: false
								}
							})
						}
					} catch (e) {
						console.log("位置服务异常");
					} finally {
						this.locationTimer && clearTimeout(this.locationTimer);
						this.locationTimer = setTimeout(() => uni.$emit("$location"), 15 * 1000)
					}
				})
			},
			wakeLock() {
				let main = plus.android.runtimeMainActivity();
				let Context = plus.android.importClass('android.content.Context');
				let PowerManager = plus.android.importClass('android.os.PowerManager');
				let pm = main.getSystemService(Context.POWER_SERVICE);
				g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, 'ANY_NAME');
				g_wakelock.acquire();
			},
			releaseWakeLock() {
				if (g_wakelock != null && g_wakelock.isHeld()) {
					g_wakelock.release();
					g_wakelock = null;
				}
			},
		},
		onUnload() {
			if (uni.$u.os() === "android") {
				this.releaseWakeLock();
			}
			uni.$off('$location')
		}
	}
</script>

<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
@import "@/uni_modules/uview-ui/libs/css/flex.scss";
page {
	background-color: #f9f9fa;
}
</style>