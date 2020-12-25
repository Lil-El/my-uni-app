<script>
export default {
	async onLaunch() {
		// #ifdef APP-PLUS
		// App平台检测升级，服务端代码是通过uniCloud的云函数实现的，详情可参考：https://ext.dcloud.net.cn/plugin?id=2226
		if (plus.runtime.appid !== 'HBuilder') {
			// 真机运行不需要检查更新，真机运行时appid固定为'HBuilder'，这是调试基座的appid
		}
		// #endif
	},
	globalData: {
		userInfo: null
	},
	
};
</script>

<style lang="scss">
// @import '/static/style/index.scss';
/* #ifndef APP-PLUS-NVUE */

/* 以下样式用于 hello uni-app 演示所需 */
page {
	background-color: #f4f5f6;
	height: 100%;
	font-size: 28rpx;
	line-height: 1.8;
}

.uni-header-logo {
	padding: 30rpx;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 10rpx;
}

.uni-header-image {
	width: 100px;
	height: 100px;
}

.uni-hello-text {
	color: #7a7e83;
}

.uni-hello-addfile {
	text-align: center;
	line-height: 300rpx;
	background: #fff;
	padding: 50rpx;
	margin-top: 10px;
	font-size: 38rpx;
	color: #808080;
}
/* #endif*/
</style>
