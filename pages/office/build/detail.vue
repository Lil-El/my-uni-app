<template>
	<view class="uni-page uni-bg__white">
		<uni-section title="基本信息" :gap="false">
			<u-cell title="建筑物名称" :value="detail.name"></u-cell>
			<u-cell title="建筑面积(㎡)" :value="detail.area || '0'"></u-cell>
			<u-cell title="基本用途" :value="dictData.BUILD_USAGE[detail.usage]"></u-cell>
			<u-cell title="建筑物高度(米)" :value="detail.buildHeight || '0'"></u-cell>
			<u-cell title="地上层数" :value="detail.aboveFloors"></u-cell>
			<u-cell title="地下层数" :value="detail.underFloors"></u-cell>
			<u-cell title="建筑物结构" :value="detail.structure"></u-cell>
			<u-cell title="基底面积(㎡)" :value="detail.baseArea || '0'"></u-cell>
			<u-cell title="不动产证" :value="detail.haveCertificate == 1 ? '有' : '无'"></u-cell>
			<u-cell title="不动产证号" v-if="detail.haveCertificate == 1" :value="detail.certificateNo"></u-cell>
			<u-cell title="关联项目" :value="detail.projectName">
				<u-text slot="value" :text="detail.rightUserUnit" align="right"></u-text>
			</u-cell>
			<u-cell title="关联图层">
				<u-text slot="value" :text="detail.rightUserUnit" align="right"></u-text>
			</u-cell>
		</uni-section>
	</view>
</template>

<script>
	import {mapActions} from "vuex";
	export default {
		data() {
			return {
				dictData: {
					BUILD_USAGE: {}, // 用途
					MAP_LAYER: {}
				},
				detail: {}
			}
		},
		computed: {
			
		},
		async onLoad(option) {
			try{
				uni.showLoading({
					title: "数据加载中"
				});
				await this.getDict();
				await this.getDetail(option.id);
			}catch(e){
				//TODO handle the exception
			}finally{
				uni.hideLoading();
			}
		},
		methods: {
			...mapActions(["getDictByCode"]),
			async getDict() {
				try{
					const BUILD_USAGE = await this.getDictByCode("BUILD_USAGE");
					BUILD_USAGE.forEach(item => {
						this.$set(this.dictData.BUILD_USAGE, item.code, item.name)
					})
				}catch(e){
					//TODO handle the exception
				}
			},
			async getDetail(id) {
				try{
					const res = await uni.$u.http.get("/building/getById", {params: {id}})
					this.detail = {...res.data.data};
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>