<template>
	<swiper class="swiper" :autoplay="true" :indicator-dots="true" :circular="true" indicator-color="#d5efff" indicator-active-color="#57b6ff" :interval="3000">
		<swiper-item v-for="(item, index) in banners" :key="index"><image :src="item.url" mode="scaleToFill"></image></swiper-item>
	</swiper>
</template>

<script>
export default {
	name: 'uni-carousel',
	props: ['banners']
};
</script>

<style lang="scss" scoped>
.swiper {
	image {
		width: 100vw;
		height: 100%;
	}
}
</style>
