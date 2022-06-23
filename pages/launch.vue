<template>
	<view class="uni-page">
		<u-swiper v-if="imgList.length > 1" :list="imgList" height="100vh"></u-swiper>
		<u-image v-else :list="imgList" height="100vh" width="100vw" :src="imgList[0]"></u-image>
		<view class="time" @tap="onNavigateLogin">
			<text class="time-label">跳过 {{time}}s</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: 3,
				intervalID: '',
				imgList: ["/static/images/launch.png"]
			}
		},
		methods: {
			onNavigateLogin() {
				uni.$u.route({
					type: "reLaunch",
					url: 'pages/user/login',
				})
				return (this.intervalID && clearInterval(this.intervalID))
			},
		},
		onLoad() {
			this.intervalID = setInterval(() => {
				if (this.time == 0) {
					return void this.onNavigateLogin();
				}
				this.time = this.time - 1;
			}, 1000)
		}
	}
</script>

<style scoped lang="scss">
	.time {
		width: 70px;
		height: 30px;
		top: 0;
		right: 0;
		margin-top: 30px;
		line-height: 28px;
		margin-right: 20px;
		position: fixed;
		background-color: rgba(178, 178, 178, 0.5);
		border-radius: 17px;
		text-align: center;
	}

	.time-label {
		color: #FFFFFF;
		font-size: 15px;
	}
</style>
