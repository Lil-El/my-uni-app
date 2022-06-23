<template>
	<view class="uni-page">
		<view class="header u-flex u-flex-y-center">
			<u-avatar shape="square" size="60" src="/static/images/logo.png"></u-avatar>
			<view class="u-flex-fill uni-common-ml__16">
				<u-text :text="userInfo.name" align="left" color="white" bold></u-text>
				<u-text :text="userInfo.phone" align="left" color="white"></u-text>
			</view>
		</view>
		<view class="uni-margin uni-card">
			<u-cell title="修改密码" isLink arrow-direction="right" url="./update">
				<u-image slot="icon" shape="square" width="28" height="28" src="/static/images/logo.png"></u-image>
			</u-cell>
			<u-cell isLink :border="false" rightIcon="" size="large" @click="onLogout">
				<u-text slot="label" text="退出登录" color="#258CF1" bold align="center"></u-text>
			</u-cell>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: getApp().globalData.userInfo
			}
		},
		methods: {
			onLogout() {
				uni.$u.route({
					type: "reLaunch",
					url: "pages/user/login",
					params: {
						isAuto: false
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		padding: 110px 20px 14px;
		background: #00ccff;
		height: 66px;
	}
	.content {
		height: 0;
		box-sizing: border-box;
	}
</style>