<template>
	<u-cell-group :border="false" class="uni-section">
		<view class="u-flex u-flex-between section-header">
			<view class="u-flex-xy-center">
				<view :class="['uni-section__dot', 'uni-section__dot__' + type ]"></view>
				<view>{{title}}</view>
			</view>
			<slot name="tail"></slot>
		</view>
		<u-line v-if="border" />
		<slot />
		<u-gap v-show="gap" height="8" bgColor="#f0f0f0"></u-gap>
	</u-cell-group>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: 'primary'
			},
			border: {
				type: Boolean,
				default: true
			},
			gap: {
				type: Boolean,
				default: true,
			},
			title: {
				type: String,
				default: ''
			},
		},
	};
</script>

<style lang="scss" scoped>
	.section-header {
		padding: 10px 12px;
		background-color: white;
	}
	.uni-section {
		background-color: white;
	}
	.uni-section__dot {
		width: 4px;
		height: 16px;
		border-radius: 2px;
		background-color: $u-primary;
		margin-right: 5px;
		&__primary {
			background-color: $u-primary;
		}
		&__success {
			background-color: $u-success;
		}
		&__warning {
			background-color: $u-warning;
		}
		&__error {
			background-color: $u-error;
		}
		&__info {
			background-color: $u-info;
		}
	}
</style>
