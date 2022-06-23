export default {
	data(){
		return{
			_networkType: null
		}
	},
	methods: {
		async getNetworkType() {
			return new Promise((resolve, reject) => {
				uni.getNetworkType({
					success: async ({ networkType }) => {
						this._networkType = networkType;
						resolve(networkType);
					}
				});
			});
		},
		getLatlngOnline(){
			return new Promise((resolve, reject) => {
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						resolve({
							lat: res.latitude,
							lng: res.longitude
						});
					},
					fail: error => {
						this.getNetworkType();
						// uni.showToast({
						// 	title: '当前位置获取失败,请检查GPS是否打开',
						// 	duration: 2000,
						// 	icon: 'none'
						// });
						console.log('网络定位错误：', error);
						reject();
					}
				});
			});
		},
		getLatlngOffline(){
			console.log('getLatlngOffline')
			return new Promise((resolve, reject) => {
				plus.geolocation.getCurrentPosition(
					res => {
						resolve({
							lat: res.coords.latitude,
							lng: res.coords.longitude
						});
					},
					error => {
						this.getNetworkType();
						// let errorMsg = {
						// 	2: '定位失败，检查GPS是否打开，建议持设备到相对开阔的露天场所再次尝试'
						// };
						// uni.showToast({
						// 	title: errorMsg[error.code] || error.message,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
						reject();
					}
				);
			});
		},
		async getLatlng() {
			let coord = this._networkType === "none" ? await getLatlngOffline() : await getLatlngOnline();
			return coord;
		},
	}
}