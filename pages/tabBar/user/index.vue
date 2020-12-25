<template>
	<view>
		<view class="uni-container uni-inline-item cm-bg-primary">
			<image id="avatar" src="@/static/logo.png" mode="aspectFill"></image>
			<view class="uni-flex uni-column uni-flex-around uni-common-ml">
				<template v-if="userInfo.role">
					<text class="text">{{ userInfo.name }}</text>
					<text class="sub-text">{{ userInfo.phone }}</text>
				</template>
				<template v-else>
					<navigator url="/pages/user/account/login" class="text">登录</navigator>
				</template>
			</view>
		</view>
		<template v-for="(group, index) in menuGroup">
			<list-group :key="index" v-if="hasPermission(userInfo.role, group.login, group.permission)">
				<template v-for="item in group.menu">
					<list-item
						v-if="hasPermission(userInfo.role, item.login || group.login, item.permission || group.permission)"
						:key="item.key"
						arrow="right"
						@click="handleEvent(item)"
					>
						<image :src="require('@/static/' + item.iconUrl)" class="menu-image"></image>
						<text>{{ item.label }}</text>
						<!-- <template v-slot:tail>
							<text>山东天元</text>
						</template> -->
					</list-item>
				</template>
			</list-group>
		</template>
	</view>
</template>
<script>
import MenuConfig from '@/utils/menu.config.js';
export default {
	data() {
		return {
			// userName: uni.getStorageSync('USERBEAN').name,
			// phone:uni.getStorageSync('USERBEAN').phone,
			userInfo: {},
			menuGroup: []
		};
	},
	async onLoad() {
		await this.getUserInfo();
		this.initMenuGroup();
	},
	methods: {
		async getUserInfo() {
			if (!getApp().globalData.userInfo) await this.$store.dispatch('fetchUserInfoByTk');
			const user = getApp().globalData.userInfo;
			this.userInfo = {
				...user,
				phone: user?.phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
			};
			// 	uni.showLoading({
			// 		title: '请稍后',
			// 		mask: true
			// 	});
			// 	var _this = this;
			// 	var submitData = {
			// 		id: uni.getStorageSync('USERBEAN').id
			// 	};
			// 	uni.request({
			// 		url: uni.getStorageSync('serviceUrl') + 'user/getId',
			// 		method: 'GET',
			// 		data: submitData,
			// 		header: {
			// 			Authorization: uni.getStorageSync('user_token'),
			// 			'Content-Type': 'application/x-www-form-urlencoded'
			// 		},
			// 		success(res) {
			// 			console.log(res);
			// 			uni.resInterceptor(res);

			// 			var data = res.data;
			// 			if (data.code == 200) {
			// 				_this.userName = data.data.name;

			// 				_this.phone = data.data.phone;
			// 				_this.usericon = data.data.headPhoto;
			// 				console.log('useer/index', _this.usericon);
			// 			} else {
			// 				uni.showToast({
			// 					icon: 'none',
			// 					title: '获取信息失败，请稍候再试!'
			// 				});
			// 			}
			// 		},
			// 		fail(err) {
			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: '网络异常，请稍候再试!'
			// 			});
			// 		},
			// 		complete() {
			// 			setTimeout(() => {
			// 				uni.hideLoading();
			// 			}, 1000);
			// 		}
			// 	});
		},
		initMenuGroup() {
			this.menuGroup = MenuConfig;
		},
		hasPermission(role, isLogin, permission) {
			if (isLogin && !role) return false;
			if (Array.isArray(permission)) return permission.findIndex(item => item === role) >= 0;
			if (permission === '*') return true;
		},
		handleEvent(item) {
			if (item.navUrl) uni.navigateTo({ url: item.navUrl });
			if (item.key === 'logout') this.toLogout();
		},
		toLogout() {
			uni.showModal({
				title: '提示',
				content: '退出？',
				success: () => {
					uni.showToast({
						title: 'logout'
					});
					this.$store.dispatch('logout');
					this.getUserInfo();
					uni.reLaunch({
						url: '/pages/tabBar/user/index.vue'
					});
				}
			});
		},
		selectIcon() {
			var _this = this;
			uni.chooseImage({
				count: 1, //默认9
				success: function(res) {
					console.log('文件~~', res);
					uni.getImageInfo({
						src: res.tempFilePaths[0],
						success: function(image) {
							_this.uploadFile(image.path);
							console.log('userInfo', image.path);
						}
					});
				},
				fail(err) {
					console.log(err);
					uni.showToast({
						title: '失败!请重新选择',
						icon: 'none'
					});
				}
			});
		},
		//上传图片
		uploadFile(path) {
			var _this = this;
			uni.showLoading({
				title: '请稍后...',
				mask: true
			});

			uni.uploadFile({
				url: uni.getStorageSync('serviceUrl') + 'user/updatePhoto',
				filePath: path,
				name: 'file',
				formData: {
					userId: uni.getStorageSync('USERBEAN').id
				},
				header: {
					Authorization: uni.getStorageSync('user_token'),
					'content-type': 'multipart/form-data'
				},
				method: 'POST',
				success: uploadFileRes => {
					uni.resInterceptor(uploadFileRes);
					console.log(uploadFileRes);
					uni.hideLoading();
					if (uploadFileRes.statusCode == 200) {
						var res = JSON.parse(uploadFileRes.data);
						console.log(res);
						if (res.code == 200) {
							_this.usericon = res.data.headPhoto;
							uni.showToast({
								title: res.msg,
								duration: 2000
							});
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					} else {
						uni.showToast({
							title: uploadFileRes.errMsg,
							icon: 'none'
						});
					}
				},
				fail: function(err) {
					console.log(err);
					uni.hideLoading();
					uni.showToast({
						title: '网络异常，请稍候再试',
						icon: 'none'
					});
				}
			});
		},

		loginOut() {
			getApp().globalData.isLogin = false;
			uni.removeStorageSync('USERBEAN');
			uni.setStorageSync('auto', 0);
			uni.reLaunch({
				url: './login'
			});
		},
		fee_back() {
			uni.navigateTo({
				url: './feedback'
			});
		}
	}
};
</script>

<style scoped lang="scss">
.text {
	color: white;
	font-weight: bold;
	font-size: 16px;
}
.sub-text {
	color: #d9d9d9;
	font-weight: bold;
	font-size: 12px;
}
.menu-image {
	width: 20px;
	height: 20px;
	margin-right: 18rpx;
}
</style>
