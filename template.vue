<template>
	<view class="uni-page uni-bg__white">
		<u-form :model="data" :rules="rules" ref="form">
			<uni-section title="测试">
				<u-cell title="个人设置" isLink></u-cell>
				<u-cell title="会员等级" clickable value="新版本"></u-cell>
				<u-cell class="u-required" title="123">
					<u-form-item slot="value" prop="name" labelWidth="0">
						<u-input v-model="data.name" inputAlign="right" placeholder="请输入内容" ></u-input>
					</u-form-item>
				</u-cell>
				<u-cell title="备注">
					<u-text slot="label" text="请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容" ></u-text>
				</u-cell>
				<u-cell title="地址">
					<u-text slot="value" text="请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容" ></u-text>
				</u-cell>
				<u-cell title="地址">
					<u-link slot="right-icon" text="123" under-line></u-link>
				</u-cell>
				<u-cell title="phone" required>
					<u-input slot="value" placeholder="input" border="" inputAlign="right"></u-input>
				</u-cell>
				<u-cell title="picture">
					<u-grid slot="label" :border="false">
						<u-grid-item class="uni-common-mt__10" v-for="i in 5" :key="i">
							<u-image src="/static/images/logo.png" class="u-border" width="100" height="100"></u-image>
						</u-grid-item>
					</u-grid>
				</u-cell>
			</uni-section>
			<uni-section title="测试">
				<u-cell title="个人设置" isLink></u-cell>
				<u-cell title="会员等级" value="新版本"></u-cell>
			</uni-section>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					name: "",
				},
				rules: {
					name: [{required: true, message: "123", trigger: ['blur', 'change']}]
				}
			}
		},
		onLoad(option) {
			this.getDetail(option.id);
		},
		methods: {
			async getDetail(id) {
				try{
					return void console.log(id)
					uni.showLoading();
					const res = await uni.$u.http.get("")
					console.log(res)
				}catch(e){
					//TODO handle the exception
				}finally {
					uni.hideLoading();
				}
			}
		}
	}
</script>

<style>

</style>
