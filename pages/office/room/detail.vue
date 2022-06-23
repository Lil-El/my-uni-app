<template>
	<view class="uni-page uni-bg__white">
		<uni-section title="基本信息" :gap="false">
			<u-cell title="关联建筑物" :value="detail.buildingName"></u-cell>
			<u-cell title="房间名称" :value="detail.roomName"></u-cell>
			<u-cell title="面积(㎡)" :value="detail.area || '0'"></u-cell>
			<u-cell title="不动产证" :value="detail.haveCertificate == 1 ? '有' : '无'"></u-cell>
			<u-cell title="不动产证号" v-if="detail.haveCertificate == 1" :value="detail.certificateNo"></u-cell>
			<u-cell title="使用人" :value="detail.userName"></u-cell>
			<u-cell title="联系电话" :value="detail.phone"></u-cell>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				await this.getDetail(option.id);
			}catch(e){
				//TODO handle the exception
			}finally{
				uni.hideLoading();
			}
		},
		methods: {
			async getDetail(id) {
				try{
					const res = await uni.$u.http.get("/room/getById", {params: {id}})
					this.detail = {...res.data.data};
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>