<template>
	<view class="uni-page uni-bg__white">
		<u-sticky style="background-color: white;">
			<u-search customStyle="padding: 8px 16px;" show-action actionText="搜索" v-model="filter.projectName" animation @custom="getList(1)" @clear="getList(1)" placeholder="请输入项目名称"></u-search>
		</u-sticky>
		<u-cell-group>
			<u-cell v-for="item in list.data" :title="item.projectName" :label="item.detailedLocation" :url="'./detail?id=' + item.id" rightIcon="" isLink :key="item.id">
				<u-tag slot="value" v-if="item.projectStatus == 0" :text="item.projectStatusName" plain size="mini" type="info"></u-tag>
				<u-tag slot="value" v-if="item.projectStatus == 1" :text="item.projectStatusName" plain size="mini" type="error"></u-tag>
				<u-tag slot="value" v-if="item.projectStatus == 2" :text="item.projectStatusName" plain size="mini" type="primary"></u-tag>
				<u-tag slot="value" v-if="item.projectStatus == 3" :text="item.projectStatusName" plain size="mini" type="success"></u-tag>
				<u-tag slot="value" v-if="item.projectStatus == 4" :text="item.projectStatusName" plain size="mini" type="warning"></u-tag>
			</u-cell>
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
					projectName: ""
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
					const res = await uni.$u.http.get("/landDev/getLandDevList", {
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
					console.log(e);
				}
			}
		}
	}
</script>

<style lang="scss" scope>
	.filter-container {
		
	}
</style>