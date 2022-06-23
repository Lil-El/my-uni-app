<template>
	<view class="uni-page uni-bg__white">
		<u-sticky style="background-color: white;">
			<u-search customStyle="padding: 8px 16px;" show-action actionText="搜索" v-model="filter.contents" animation @custom="getList(1)" @clear="getList(1)" placeholder="请输入内容"></u-search>
		</u-sticky>
		<u-cell-group>
			<u-cell v-for="item in list.data" :title="item.contents" :titleStyle="{color: '#0569ff', textDecoration: 'underline', lineHeight: '18px'}" :label="dictData.POLICY_TYPES[item.policyTypes]" :url="'./detail?url=' + JSON.stringify(encodeURIComponent(item.urls))" rightIcon="" isLink :key="item.id">
				<u-tag slot="value" v-if="item.status == 0" text="新增信息" plain size="mini" type="error"></u-tag>
				<u-tag slot="value" v-else text="已有信息" plain size="mini" type="primary"></u-tag>
			</u-cell>
			<u-loadmore v-show="list.data.length" :status="list.status" />
		</u-cell-group>
		<u-empty :show="list.data.length == 0" mode="data"></u-empty>
	</view>
</template>

<script>
	import {mapActions} from "vuex";
	export default {
		data() {
			return {
				dictData: {
					POLICY_TYPES: {}
				},
				filter: {
					contents: ""
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
			await this.getDict();
		},
		onReachBottom() {
			this.list.status = 'loading';
			this.getList(this.list.current + 1);
		},
		methods: {
			...mapActions(["getDictByCode"]),
			async getDict() {
				try{
					const POLICY_TYPES = await this.getDictByCode("POLICY_TYPES");
					POLICY_TYPES.forEach(item => {
						this.$set(this.dictData.POLICY_TYPES, item.code, item.name)
					})
				}catch(e){
					//TODO handle the exception
				}
			},
			async getList(current = 1) {
				try{
					const res = await uni.$u.http.get("/policy/getList", {
						params: {
							current,
							size: this.list.size,
							...this.filter
						}
					})
					const data = res.data.data;
					data.records.forEach(item => {
						item.contents = item.contents.replace(/<[^>]+>/g, '');
					})
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