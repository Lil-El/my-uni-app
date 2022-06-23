<template>
	<view class="uni-page office-container">
		<u-swiper :list="bannerList" previousMargin="20" nextMargin="20" circular :autoplay="false" radius="5" bgColor="#ffffff"></u-swiper>
		<view class="uni-container" v-for="group in menuList" :key="group.id">
			<u-text :text="group.name" align="left" bold color="#777777"></u-text>
			<view class="uni-card uni-padding uni-common-mt__10">
				<u-button v-for="(menu, index) in group.children" :key="menu.id" @click="onNavigate(menu.url)" :class="[(index + 1) != group.children.length ? 'uni-common-mb__6' : '']" :text="menu.name" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [],
				menuList: [],
			}
		},
		onLoad() {
			this.getBannerList();
			this.getMenuList();
		},
		methods: {
			async getBannerList() {
				const res = await uni.$u.http.get("/sysImage/getCarouselList")
				this.bannerList = res.data.data?.map(item => item.fileUrl);
			},
			async getMenuList() {
				const res = await uni.$u.http.get("/app/menu/listForRouter")
				this.menuList = res.data.data;
			},
			onNavigate(url) {
				return void uni.$u.route(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.office-container{
		@extend .uni-common-pt__10;
	}
</style>
