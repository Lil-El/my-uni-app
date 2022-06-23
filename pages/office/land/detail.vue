<template>
	<view class="uni-page uni-bg__white">
		<uni-section title="基本信息">
			<u-cell title="宗地代码" :value="detail.parcelCode"></u-cell>
			<u-cell title="宗地面积" :value="detail.parcelArea"></u-cell>
			<u-cell title="宗地坐落">
				<view slot="value" style="width: 70%;">
					<u-text :text="region" align="right"></u-text>
					<u-text :text="detail.parcelLocation" align="right"></u-text>
				</view>
			</u-cell>
			<u-cell title="获得方式" :value="dictData.LAND_GAIN_TYPE[detail.gainType]"></u-cell>
			<u-cell title="获得日期" :value="detail.gainDate"></u-cell>
			<u-cell title="土地使用期限" :value="detail.serviceLife == 1 ? '有期限' : '无期限'"></u-cell>
			<u-cell title="土地使用期限起止日期">
				<view slot="value">
					<u-text :text="'起:' + (detail.startTime || '-')"></u-text>
					<u-text :text="'止:' + (detail.endTime || '-')"></u-text>
				</view>
			</u-cell>
			<u-cell title="土地使用证" :value="detail.whetherUse == 1 ? '有' : '无'"></u-cell>
			<u-cell title="土地使用证编号" v-if="detail.whetherUse == 1" :value="detail.useCertificate"></u-cell>
			<!-- <u-cell title="关联图层" :value="detail.parcelCode"></u-cell> -->
			<u-cell title="所属单位">
				<view slot="value" style="width: 70%;">
					<u-text :text="belongUnit" align="right"></u-text>
				</view>
			</u-cell>
			<u-cell title="使用权所属单位">
				<u-text slot="value" :text="detail.rightUserUnit" align="right"></u-text>
			</u-cell>
		</uni-section>
		<!-- 
		<uni-section title="控制性详细规划">
			<u-cell title="权利类型" :value="dictData.LAND_RIGHT_TYPE[detail.rightType]"></u-cell>
			<u-cell title="土地用途" :value="landUse"></u-cell>
			<u-cell title="容积率(%)" :value="detail.plotRatio || '0'"></u-cell>
			<u-cell title="建筑密度(%)" :value="detail.buildDensity || '0'"></u-cell>
			<u-cell title="绿化率(%)" :value="detail.greenRate || '0'"></u-cell>
			<u-cell title="建筑高度(米)" :value="detail.buildHeight || '0'"></u-cell>
		</uni-section> -->
		
		<uni-section title="土地成本">
			<uni-table border stripe emptyText="暂无数据" >
				<uni-tr>
					<uni-th align="left" width="120">成本类型</uni-th>
					<uni-th align="left" width="120">金额(元)</uni-th>
					<uni-th align="left" width="120">说明</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in detail.landCost" :key="index">
					<uni-td>{{dictData.LAND_COST_TYPE[item.costType]}}</uni-td>
					<uni-td>{{item.amount}}</uni-td>
					<uni-td>{{item.description || "-"}}</uni-td>
				</uni-tr>
			</uni-table>
		</uni-section>
		
		<uni-section title="支付计划">
			<uni-table border stripe emptyText="暂无数据" >
				<uni-tr>
					<uni-th align="left">支付日期</uni-th>
					<uni-th align="left">支付金额(元)</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in detail.landPayPlan" :key="index">
					<uni-td>{{item.payDate}}</uni-td>
					<uni-td>{{item.payAmount}}</uni-td>
				</uni-tr>
			</uni-table>
		</uni-section>
		
		<uni-section title="土地使用税" :gap="false">
			<u-cell title="行政区" :value="taxRegion"></u-cell>
			<u-cell title="纳税等级" :value="dictData.TAX_GRADE[detail.taxGrade]"></u-cell>
			<u-cell title="实际纳税人" :value="detail.taxPayer"></u-cell>
			<u-cell title="纳税定额(元/㎡)" :value="detail.taxQuota || '0'"></u-cell>
			<u-cell title="应税面积(㎡)" :value="detail.taxArea || '0'"></u-cell>
			<u-cell title="免税面积(㎡)" :value="detail.taxExemptArea || '0'"></u-cell>
			<u-cell title="应纳税额(元)" :value="detail.taxAmount || '0'"></u-cell>
			<u-cell title="备注">
				<u-text slot="label" :text="detail.taxRemark || '-'"></u-text>
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
					LAND_GAIN_TYPE: {}, // 获得方式
					LAND_RIGHT_TYPE: {}, // 土地权力类型
					LAND_COST_TYPE: {}, // 成本类型
					TAX_GRADE: {}, // 纳税等级
					LAND_USE: [], // 土地用途
				},
				regionData: [],
				deptData: [],
				detail: {}
			}
		},
		computed: {
			region() {
				const province = this.regionData.filter(p => p.areaCode == this.detail.province)[0] || {};
				const city = province?.children?.filter(p => p.areaCode == this.detail.city)[0] || {};
				const county = city?.children?.filter(p => p.areaCode == this.detail.county)[0] || {};
				return `${province.name || ""}/${city.name || ""}/${county.name || ""}`
			},
			taxRegion() {
				const taxProvince = this.regionData?.filter(p => p.areaCode == this.detail.taxProvince)[0] || {};
				const taxCity = taxProvince?.children?.filter(p => p.areaCode == this.detail.taxCity)[0] || {};
				const taxCounty = taxCity?.children?.filter(p => p.areaCode == this.detail.taxCounty)[0] || {};
				return `${taxProvince.name || ""}/${taxCity.name || ""}/${taxCounty.name || ""}`
			},
			landUse() {
				// const first = this.dictData.LAND_USE?.filter(item => item.code == this.detail.landUseFirst)[0];
				// const second = first?.children.filter(item => item.code == this.detail.landUseSecond)[0];
				// return `${first?.name || ""}/${second?.name || ""}`
			},
			belongUnit() {
				let result = [];
				let next = (arr, target, prefix = [])=>{
					for(let i = 0; i < arr.length; i++) {
						const item = arr[i];
						if(item.id == target) {
							result = [...prefix, item]
						} else {
							next(item.children || [], target, [...prefix, item])
						}
					}
				}
				next(this.deptData, this.detail.belongUnit)
				return result.map(item => item.name).toString();
			}
		},
		async onLoad(option) {
			try{
				uni.showLoading({
					title: "数据加载中"
				});
				await this.getDict();
				await this.getRegion();
				await this.getDetail(option.id);
				await this.getDept();
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
					const LAND_GAIN_TYPE = await this.getDictByCode("LAND_GAIN_TYPE");
					LAND_GAIN_TYPE.forEach(item => {
						this.$set(this.dictData.LAND_GAIN_TYPE, item.code, item.name)
					})
					
					const LAND_RIGHT_TYPE = await this.getDictByCode("LAND_RIGHT_TYPE");
					LAND_RIGHT_TYPE.forEach(async item => {
						this.$set(this.dictData.LAND_RIGHT_TYPE, item.code, item.name)
					})
					
					const LAND_COST_TYPE = await this.getDictByCode("LAND_COST_TYPE");
					LAND_COST_TYPE.forEach(async item => {
						this.$set(this.dictData.LAND_COST_TYPE, item.code, item.name)
					})
					
					const TAX_GRADE = await this.getDictByCode("TAX_GRADE");
					TAX_GRADE.forEach(async item => {
						this.$set(this.dictData.TAX_GRADE, item.code, item.name)
					})
					
					const LAND_USE = await this.getDictByCode("LAND_USE");
					LAND_USE?.forEach(async item => {
						item.children = await this.getDictByCode(item.code)
					})
					this.dictData.LAND_USE = LAND_USE;
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
			async getDept() {
				try{
					const res = await uni.$u.http.get("/dept/getTree")
					this.deptData = res.data.data;
					
				}catch(e){
					//TODO handle the exception
				}
			},
			async getDetail(id) {
				try{
					const res = await uni.$u.http.get("/landInfo/getById", {params: {id}})
					this.detail = {...res.data.data};
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>