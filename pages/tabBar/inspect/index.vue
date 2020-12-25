<template>
	<view class="uni-page uni-flex uni-column">
		<view class="uni-inline-item task-query-bar" ref="query-bar" v-if="hasPermission(role, ['admin'])">
			<view :class="['uni-common-mr', 'uni-padding-wrap', 'task-query-bar__item', active === status.FINISH ? 'active' : '']"
			 @click="active = status.FINISH">
				<text>已完成</text>
			</view>
			<view :class="['uni-common-mr', 'uni-padding-wrap', 'task-query-bar__item', active === status.DONGING ? 'active' : '']"
			 @click="active = status.DONGING">
				<text>进行中</text>
			</view>
			<view :class="['uni-common-mr', 'uni-padding-wrap', 'task-query-bar__item', active === status.SCREEN ? 'active' : '']" @click="screenVisible = !screenVisible">
				<text>筛选</text>
			</view>
		</view>
		<view class="task-query-modal" v-if="screenVisible" @tap="handleTap" :data-hide="true">
			<uni-card class="uni-flex uni-column uni-flex-between task-query-modal__content">
				<view>
					<list-item lable="姓名"></list-item>
					<list-item lable="类型"></list-item>
					<list-item lable="时间"></list-item>
				</view>
				<view class="uni-flex task-query-modal__btns">
					<text class="uni-flex-item cm-text-btn">重置</text>
					<!-- 只有在active为screen时，请求携带screenData，其他时不携带 -->
					<text class="uni-flex-item cm-text-btn" @click="screenVisible = false;active = status.SCREEN">提交</text>
				</view>
			</uni-card>
		</view>
		<view>
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
				DONGING: 'DONGING',
				SCREEN: 'SCREEN'
			};
			return {
				status,
				active: status.FINISH,
				screenVisible: false, // 筛选 为true，active置为false
				screenData:{
					
				},
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
					this.list = [{
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
			handleTap(ev){
				if(ev.target.dataset.hide) this.screenVisible = !this.screenVisible;
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
		position: sticky;
		top: 0;
		width: calc(100vw - 48rpx); // 100vw - 2 * $bar-padding
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

	.task-query-modal {
		position: fixed;
		background-color: rgba($color: #000000, $alpha: 0.2);
		width: 100vw;
		height: calc(100vh - 116rpx);
		top: $bar-height + $bar-padding * 2;
		.task-query-modal__content{
			height: 70%;
			padding: 0;
		}
		.task-query-modal__btns{
			align-self: flex-end;
			width: 100vw;
			text:nth-child(1){
				color: $primary-color;
				background-color: #e8f7fe;
			}
			text:nth-child(2){
				color: white;
				background-color: $primary-color;
			}
		}
	}
</style>
