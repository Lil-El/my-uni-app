<template>
	<view class="uni-container">
		<uni-carousel class="uni-card carousel" :banners="banners" />
		<!-- <uni-card class="office-modal">
			<uni-card-h title="常用" class="office-modal__title"></uni-card-h>
			<view class="uni-flex uni-flex-between">
				<navigator url="../../office/task/task" class="uni-inline-item office-modal__content" id="xjjl">
					<view><text>巡检记录</text></view>
				</navigator>
				<navigator v-if="userInfo.role && userInfo.role === 'admin'" url="../../office/inspect/inspect" class="uni-inline-item office-modal__content" id="xj">
					<view><text>巡检任务</text></view>
				</navigator>
			</view>
		</uni-card> -->
		<uni-card>
			<uni-card-h title="企业数据统计"></uni-card-h>
			<uni-card-b>
				<canvas
					canvas-id="canvasPie_1"
					id="canvasPie_1"
					class="charts"
					:style="{ width: cWidth + 'px', height: cHeight + 'px' }"
					@touchstart="touchPie($event, 'canvasPie_1')"
				></canvas>
			</uni-card-b>
		</uni-card>
		<uni-card>
			<uni-card-h title="项目数据统计"></uni-card-h>
			<uni-card-b>
				<canvas
					canvas-id="canvasPie_2"
					id="canvasPie_2"
					class="charts"
					:style="{ width: cWidth + 'px', height: cHeight + 'px' }"
					@touchstart="touchPie($event, 'canvasPie_2')"
				></canvas>
			</uni-card-b>
		</uni-card>
		<uni-card>
			<uni-card-h title="巡检数据统计" @click.native="isVisible = !isVisible">
				<text class="uni-text-small">
					更多
					<text class="uni-icon uni-icon-arrowdown"></text>
				</text>
			</uni-card-h>
			<uni-card-b v-show="isVisible">
				<view class="uni-flex uni-flex-around chart-data">
					<view>
						<text>一班</text>
						<text>30</text>
					</view>
					<view>
						<text>二班</text>
						<text>12</text>
					</view>
					<view>
						<text>三班</text>
						<text>8</text>
					</view>
					<view>
						<text>四班</text>
						<text>22</text>
					</view>
					<view>
						<text>五班</text>
						<text>32</text>
					</view>
				</view>
			</uni-card-b>
			<uni-card-b>
				<canvas
					canvas-id="canvasPie_3"
					id="canvasPie_3"
					class="charts"
					:style="{ width: cWidth + 'px', height: cHeight + 'px' }"
					@touchstart="touchPie($event, 'canvasPie_3')"
				></canvas>
			</uni-card-b>
		</uni-card>
	</view>
</template>

<script>
import uCharts from '@/components/uni-charts/uni-charts.js';
var canvasObj = {};
export default {
	data() {
		return {
			// uCharts
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			serverData: '',
			// office
			isVisible: false,
			userInfo: {},
			banners: [
				{
					url:
						'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Faf1416cc3f019da668f279a00b319ae97fcd8ce5.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611216368&t=b6322939e2b0e4dc749c2a7719490242'
				},
				{
					url:
						'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Ff7af7b36df1160d488168b93f06f5ec27da96ecb.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611216613&t=d53d4fef6ec0e715d132942f4d408c35'
				}
			]
		};
	},
	onLoad() {
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
	},
	onReady() {
		this.getServerData();
	},
	async onShow() {
		uni.showLoading();
		await this.getUserInfo();
		uni.hideLoading();
	},
	methods: {
		async getUserInfo() {
			if (!getApp().globalData.userInfo) await this.$store.dispatch('fetchUserInfoByTk');
			const userInfo = getApp().globalData.userInfo;
			this.userInfo = {
				...userInfo,
				phone: userInfo?.phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
			};
		},
		getServerData() {
			uni.showLoading({
				title: '正在加载数据...'
			});
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/hello-uniapp-ucharts-data.json',
				data: {},
				success: res => {
					this.fillData(res.data);
				},
				fail: () => {
					this.tips = '网络错误，请重试';
				},
				complete() {
					uni.hideLoading();
				}
			});
		},
		fillData(data) {
			this.serverData = data;
			this.tips = data.tips;
			this.sliderMax = data.Candle.categories.length;
			this.showPie('canvasPie_1', {
				series: data.Pie.series
			});
			this.showPie('canvasPie_2', {
				series: data.Pie.series
			});
			this.showPie('canvasPie_3', {
				series: data.Pie.series
			});
			return void 0;
			//
			let Column = {
				categories: [],
				series: []
			};
			let ColumnMeter = {
				categories: [],
				series: []
			};
			let LineA = {
				categories: [],
				series: []
			};
			let LineB = {
				categories: [],
				series: []
			};
			let Area = {
				categories: [],
				series: []
			};

			let Ring = {
				series: []
			};
			let Funnel = {
				series: []
			};
			let Radar = {
				categories: [],
				series: []
			};
			let Arcbar1 = {
				series: []
			};
			let Arcbar2 = {
				series: []
			};
			let Arcbar3 = {
				series: []
			};
			let Gauge = {
				categories: [],
				series: []
			};
			let Candle = {
				categories: [],
				series: []
			};
			let Mix = {
				categories: [],
				series: []
			};
			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			Column.categories = data.Column.categories;
			//这里的series数据是后台做好的，如果您的数据没有和前面我注释掉的格式一样，请自行拼接数据
			Column.series = data.Column.series;
			ColumnMeter.categories = data.ColumnMeter.categories;
			//这里的series数据,如果为Meter，series[0]定义为外层数据，series[1]定义为内层数据
			ColumnMeter.series = data.ColumnMeter.series;
			LineA.categories = data.LineA.categories;
			LineA.series = data.LineA.series;
			LineB.categories = data.LineB.categories;
			LineB.series = data.LineB.series;
			Area.categories = data.Area.categories;
			Area.series = data.Area.series;
			Pie.series = data.Pie.series;
			Ring.series = data.Ring.series;
			Funnel.series = data.Pie.series;
			//自定义文案示例，需设置format字段
			for (let i = 0; i < Ring.series.length; i++) {
				Ring.series[i].format = () => {
					return Ring.series[i].name + Ring.series[i].data;
				};
			}
			Radar.categories = data.Radar.categories;
			Radar.series = data.Radar.series;
			Arcbar1.series = data.Arcbar1.series;
			Arcbar2.series = data.Arcbar2.series;
			Arcbar3.series = data.Arcbar3.series;
			Gauge.categories = data.Gauge.categories;
			Gauge.series = data.Gauge.series;
			Candle.categories = data.Candle.categories;
			Candle.series = data.Candle.series;
			Mix.categories = data.Mix.categories;
			Mix.series = data.Mix.series;
			// this.showColumn("canvasColumn", Column);
			// this.showColumnMeter("canvasColumnMeter", ColumnMeter);
			// this.showLineA("canvasLineA", LineA);
			// this.showLineB("canvasLineB", LineB);
			// this.showArea("canvasArea", Area);
			this.showPie('canvasPie', Pie);
			// this.showRing("canvasRing", Ring);
			// this.showFunnel("canvasFunnel", Funnel);
			// this.showRadar("canvasRadar", Radar);
			// this.showArcbar("canvasArcbar1", Arcbar1);
			// this.showArcbar2("canvasArcbar2", Arcbar2);
			// this.showArcbar3("canvasArcbar3", Arcbar3);
			// this.showGauge("canvasGauge", Gauge);
			// this.showCandle("canvasCandle", Candle);
			// this.showMix("canvasMix", Mix);
		},
		showPie(canvasId, chartData) {
			let legend = { show: true, padding: 4, lineHeight: 20, margin: 0 };
			// if (canvasId === 'canvasPie_2') {
			// 	legend = {
			// 		show: true,
			// 		padding: 4,
			// 		lineHeight: 20,
			// 		margin: 0,
			// 		position: 'right',
			// 		float: 'center',
			// 		itemGap: 10
			// 	};
			// }
			canvasObj[canvasId] = new uCharts({
				$this: this,
				canvasId: canvasId,
				type: 'pie',
				fontSize: 12,
				padding: [10, 10, 0, 10],
				legend,
				background: '#FFFFFF',
				pixelRatio: this.pixelRatio,
				series: chartData.series,
				animation: true,
				width: this.cWidth * this.pixelRatio - 75,
				height: this.cHeight * this.pixelRatio,
				dataLabel: true,
				extra: {
					pie: {
						lableWidth: 15
					}
				}
			});
		},
		touchPie(e, id) {
			canvasObj[id].showToolTip(e, {
				format(item) {
					return item.name + ':' + item.data;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.carousel {
	margin-bottom: 20rpx;
}
.office-modal {
	padding: 10rpx 16rpx 20rpx;
	.office-modal__title {
		&::after {
			height: 0;
		}
	}
	.office-modal__content {
		height: 100rpx;
		color: white;
		font-size: 32rpx;
		background-size: 100% 100%;
		justify-content: flex-end;
		flex-basis: 46%;
		text {
			margin-right: 34rpx;
		}
	}
}
.chart-data {
	flex-wrap: wrap;
	view {
		background-color: #8ac7ff;
		margin: 4px;
		width: 46%;
	}
}
#xj {
	background-image: url('@/static/img/tabBar/company-select.png');
}
#xjjl {
	background-image: url('@/static/img/tabBar/car-select.png');
}
</style>
