<template>
	<view class="uni-container">
		<view class="list-group">
			<slot></slot>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.uni-container {
	padding: 0px !important;
	margin: 15px;
}
.list-group {
	overflow: hidden;
	border-radius: 8rpx;
}
</style>
