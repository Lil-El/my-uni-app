<template>
	<view class="uni-page uni-flex">
		<view class="uni-container uni-flex-item uni-flex uni-column login-container">
			<view><image src="../../../static/logo.png" class="uni-flex-item" mode="aspectFit"></image></view>
			<view class="uni-flex-item uni-flex uni-column login-form">
				<form class="uni-common-mt" @submit="">
					<view class="uni-form-item uni-column">
						<input class="uni-input" placeholder="输入纳税人识别号" />
						<input class="uni-input" password placeholder="输入密码" />
						<input class="uni-input" password placeholder="再次输入密码" />
					</view>
					<view class="uni-form-item"><button form-type="submit" class="cm-button cm-bg-primary form-btn">提交</button></view>
				</form>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {};
	},
	/**
	 * @param {Object} option
	 * @description 通过url传递title，修改navigationBarTitle为'修改密码'；默认title是'找回密码'
	 */
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: option.title
		});
	},
	methods: {}
};
</script>

<style scoped lang="scss">
.login-container {
	align-items: center;
	.login-form {
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}
	.text-btn {
		font-size: 24rpx;
	}
	.form-btn {
		color: white;
		width: 100%;
	}
}
</style>
