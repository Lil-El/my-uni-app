<template>
	<view class="uni-page uni-bg__white">
		<u-sticky style="background-color: white;">
			<u-search customStyle="padding: 8px 16px;" show-action actionText="搜索" v-model="filter.roomName" animation @custom="getList(1)" @clear="getList(1)" placeholder="请输入房间名称"></u-search>
		</u-sticky>
		<u-cell-group>
			<u-cell v-for="item in list.data" :title="item.roomName" :label="item.buildingName" :url="'./detail?id=' + item.id" isLink :key="item.id"></u-cell>
			<u-loadmore v-show="list.data.length" :status="list.status" />
		</u-cell-group>
		<u-empty :show="list.data.length == 0" mode="data"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				filter: {
					roomName: ""
				},
				list: {
					data: [],
					current: 1,
					size: 10,
					status: "nomore"
				},
			}
		},
		async onPullDownRefresh() {
			await this.getList();
			uni.stopPullDownRefresh();
		},
		async onLoad() {
			uni.startPullDownRefresh();
		},
		onReachBottom() {
			this.list.status = 'loading';
			this.getList(this.list.current + 1);
		},
		methods: {
			async getList(current = 1) {
				try{
					const res = await uni.$u.http.get("/room/getRoomList", {
						params: {
							current,
							size: this.list.size,
							...this.filter
						}
					})
					const data = res.data.data;
					this.list.data = current == 1 ? data.records : [...this.list.data, ...data.records];
					this.list.current = data.records.length ? current : (current - 1);
					this.list.status = data.current < data.pages ? "loadmore" : "nomore";
				}catch(e){
					console.log(e)
				}
			}
		}
	}
</script>

<style lang="scss" scope>
	.filter-container {
		
	}
</style>