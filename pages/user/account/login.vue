<template>
	<view class="uni-page uni-flex">
		<view class="uni-container uni-flex-item uni-flex uni-column login-container">
			<view><image src="../../../static/logo.png" class="uni-flex-item" mode="aspectFit"></image></view>
			<view class="uni-flex-item uni-flex uni-column login-form">
				<form class="uni-common-mt">
					<view class="uni-form-item uni-column">
						<input class="uni-input" v-model="name" placeholder="输入用户名" />
						<input class="uni-input" v-model="pwd" password placeholder="输入密码" />
					</view>
					<view class="uni-form-item"><button form-type="submit" class="cm-button cm-bg-primary form-btn" @click="toLogin">登录</button></view>
				</form>
				<view>
					<text class="cm-color-primary text-btn" @click="navigateTo('/pages/user/account/forget')">忘记密码</text>
					<text class="uni-common-ml uni-common-mr">|</text>
					<text class="cm-color-primary text-btn" @click="navigateTo('/pages/user/account/register')">注册</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			name: 'MINO',
			pwd: '123'
		};
	},
	methods: {
		...mapActions(['login']),
		toLogin() {
			this.login({ name: this.name, pwd: this.pwd })
				.then(msg => {
					uni.showToast({
						title: msg,
						duration: 500
					});
				})
				.then(() => {
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/tabBar/user/index'
						})
					}, 500);
				}).catch((msg)=>{
					uni.showToast({
						title: msg,
						duration: 500
					});
				})
		},
		navigateTo(url) {
			uni.navigateTo({ url });
		}
	}
};
</script>

<style lang="scss" scoped>
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
