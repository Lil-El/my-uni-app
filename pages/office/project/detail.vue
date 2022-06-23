<template>
	<view class="uni-page uni-bg__white">
		<uni-section title="基本信息" :gap="false">
			<u-cell title="项目编号" :value="detail.projectCode"></u-cell>
			<u-cell title="项目名称" :value="detail.projectName"></u-cell>
			<u-cell title="项目主体性质" :value="detail.projectSubjectNature"></u-cell>
			<u-cell title="预计竣工时间" :value="detail.estimateCompletedTime"></u-cell>
			<u-cell title="承建单位" :value="detail.contractor"></u-cell>
			<u-cell title="工程总造价(元)" :value="detail.totalCost"></u-cell>
			<u-cell title="总栋数" :value="detail.totalBuildingNumber"></u-cell>
			<u-cell title="总建筑面积(㎡)" :value="detail.totalBuildingArea"></u-cell>
			<u-cell title="立项文号" :value="detail.projectDocumentNo"></u-cell>
			<u-cell title="关联宗地" :value="detail.parcelCode"></u-cell>
			<u-cell title="项目坐落">
				<view slot="value" style="width: 70%;">
					<u-text :text="region" align="right"></u-text>
					<u-text :text="detail.detailedLocation" align="right"></u-text>
				</view>
			</u-cell>
			<u-cell title="项目状态" :value="dictData.LAND_DEV_STATUS[detail.projectStatus]"></u-cell>
			<u-cell title="实际竣工时间" :value="detail.actualCompletedTime"></u-cell>
			<u-cell title="验收时间" :value="detail.acceptanceTime"></u-cell>
		</uni-section>
	</view>
</template>

<script>
	import {mapActions} from "vuex";
	export default {
		data() {
			return {
				dictData: {
					LAND_DEV_STATUS: {}
				},
				regionData: [],
				detail: {}
			}
		},
		computed: {
			region() {
				const province = this.regionData.filter(p => p.id == this.detail.province)[0] || {};
				const city = province?.children?.filter(p => p.id == this.detail.city)[0] || {};
				const county = city?.children?.filter(p => p.id == this.detail.district)[0] || {};
				return `${province.name || ""}/${city.name || ""}/${county.name || ""}`
			},
		},
		async onLoad(option) {
			try{
				uni.showLoading({
					title: "数据加载中"
				});
				await this.getDict();
				await this.getRegion();
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
					const LAND_DEV_STATUS = await this.getDictByCode("LAND_DEV_STATUS");
					LAND_DEV_STATUS.forEach(item => {
						this.$set(this.dictData.LAND_DEV_STATUS, item.code, item.name)
					})
					
				}catch(e){
					//TODO handle the exception
				}
			},
			async getRegion() {
				try{
					const res = await uni.$u.http.get("/area/getTree")
					this.regionData = res.data.data;
				}catch(e){
					//TODO handle the exception
				}
			},
			async getDetail(id) {
				try{
					const res = await uni.$u.http.get("/landDev/getById", {params: {id}})
					this.detail = {...res.data.data};
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>