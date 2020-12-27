<template>
	<view @click="handleClick">
		<view class="uni-flex uni-flex-between uni-navigate-item">
			<view class="uni-inline-item uni-navigate-text list-item-head">
				<text v-if="lable">{{ lable }}</text>
				<slot v-else></slot>
			</view>
			<view v-if="editable" class="uni-inline-item">
				<slot name="edit"></slot>
				<text v-if="arrow" :class="['uni-icon', 'uni-icon-arrow' + arrow, 'uni-navigate-icon']"></text>
			</view>
			<view v-else>
				<slot name="tail"></slot>
				<text v-if="arrow" :class="['uni-icon', 'uni-icon-arrow' + arrow, 'uni-navigate-icon']"></text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			arrow: {
				type: String,
				default: '',
				require: false
			},
			lable: {
				type: String,
				default: '',
				require: false
			},
			editable: {
				type: Boolean,
				default: false,
				require: false
			}
		},
		mounted() {
			console.log(this)
		},
		methods: {
			handleClick() {
				typeof this.$listeners.click === 'function' && this.$listeners.click();
			}
		}
	};
</script>
