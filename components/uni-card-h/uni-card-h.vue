<template>
	<view class="uni-card-header">
		<text class="uni-card-header__title">{{ title }}</text>
		<slot></slot>
	</view>
</template>

<script>
export default {
	name: 'uni-card-h',
	props: ['title'],
	data() {
		return {};
	}
};
</script>

<style lang="scss"></style>
