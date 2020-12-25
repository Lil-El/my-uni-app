<template>
	<view class="uni-card uni-padding-wrap" @click="handleClick">
		<slot></slot>
	</view>
</template>
<script>
	export default {
		name: 'uni-card',
		methods: {
			handleClick() {
				this.$listeners.click && this.$listeners.click();
			}
		}
	};
</script>
<style scoped lang="scss">
	.uni-card {
		margin-bottom: 20rpx;
	}
</style>
