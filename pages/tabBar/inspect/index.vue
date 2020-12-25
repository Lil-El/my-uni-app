<template>
	<view class="uni-page uni-flex uni-column">
		<view class="task-query-bar uni-inline-item" ref="query-bar" v-if="hasPermission(role, ['admin'])">
			<view :class="['uni-common-mr', 'uni-padding-wrap', 'task-query-bar__item', active === status.FINISH ? 'active' : '']" @click="active = status.FINISH">
				<text>已完成</text>
			</view>
			<view :class="['uni-common-mr', 'uni-padding-wrap', 'task-query-bar__item', active === status.DONGING ? 'active' : '']" @click="active = status.DONGING">
				<text>进行中</text>
			</view>
		</view>
		<view :style="{ marginTop: hasPermission(role, ['admin']) ? '116rpx' : 0 }">
			<list-item v-for="item in list" :key="item.name" :lable="item.name" arrow="right" @click="handleClick()">
				<template v-slot:tail>
					<text>{{ item.date }}</text>
				</template>
			</list-item>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		const status = {
			FINISH: 'FINISH',
			DONGING: 'DONGING'
		};
		return {
			status,
			active: status.FINISH,
			role: getApp().globalData.userInfo?.role || '',
			list: []
		};
	},
	watch: {
		active: {
			immediate: true,
			async handler() {
				this.getInspectList();
			}
		}
	},
	async onShow() {
		await this.getUserInfo();
	},
	methods: {
		async getUserInfo() {
			if (!getApp().globalData.userInfo) await this.$store.dispatch('fetchUserInfoByTk');
			const userInfo = getApp().globalData.userInfo;
			this.role = userInfo?.role;
		},
		getInspectList() {
			setTimeout(() => {
				this.list = [
					{
						name: '巡查任务1',
						date: '09:36'
					},
					{
						name: '巡查任务2',
						date: '14:27'
					},
					{
						name: '巡查任务3',
						date: '昨日'
					},
					{
						name: '巡查任务4',
						date: '2020/12/20'
					}
				];
			}, 300);
		},
		handleClick() {
			if (!this.role) return void 0;
			if (this.active === this.status.FINISH) return void 0;
			uni.navigateTo({
				url: '/pages/inspect/inspect'
			});
		},
		hasPermission(role, permission) {
			if (!role) {
				return false;
			} else if (Array.isArray(permission)) {
				return permission.findIndex(item => item === role) >= 0;
			} else if (permission === '*') {
				return true;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
$bar-height: 68rpx;
$bar-padding: 24rpx;
.task-query-bar {
	position: fixed;
	top: 0;
	width: 100vw;
	height: $bar-height;
	padding: $bar-padding;
	background-color: white;
	border-bottom: 1px solid #eee;
	.task-query-bar__item {
		color: #8c8c8c;
		border: 1px solid #eee;
		border-radius: 8rpx;
		transition: 0.3s all ease;
	}
	.active {
		color: white;
		background-color: $primary-color;
	}
}
</style>
