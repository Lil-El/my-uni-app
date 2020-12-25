<template>
	<view @click="handleClick">
		<view class="uni-flex uni-flex-between uni-navigate-item">
			<view class="uni-inline-item uni-navigate-text list-item-head">
				<text v-if="lable">{{ lable }}</text>
				<slot v-else></slot>
			</view>
			<view class="list-item-tail">
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
		}
	},
	data() {
		return {};
	},
	methods:{
		handleClick(){
			typeof this.$listeners.click === 'function' && this.$listeners.click();
		}
	}
};
</script>
