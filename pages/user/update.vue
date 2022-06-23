<template>
	<view class="uni-page uni-container uni-bg__white">
		<u-form :model="formData" :rules="rules" ref="formRef">
			<u-cell title="原密码" class="u-required">
				<template v-slot:value>
					<u-form-item prop="oldPassword" labelWidth="0">
						<u-input v-model="formData.oldPassword" border="" inputAlign="right" placeholder="请输入原密码" maxlength="32" type="password"></u-input>
					</u-form-item>
				</template>
			</u-cell>
			<u-cell title="新密码" class="u-required">
				<template v-slot:value>
					<u-form-item prop="newPassword">
						<u-input v-model="formData.newPassword" border="" inputAlign="right" placeholder="请输入新密码" maxlength="32" type="password"></u-input>
					</u-form-item>
				</template>
			</u-cell>
			<u-cell title="确认新密码" class="u-required">
				<template v-slot:value>
					<u-form-item prop="newPassword2">
						<u-input v-model="formData.newPassword2" border="" inputAlign="right" placeholder="请再次输入新密码" maxlength="32" type="password"></u-input>
					</u-form-item>
				</template>
			</u-cell>
		</u-form>
		<u-text text="请确保密码包含数字、大小写字母、特殊符号四种且8位以上" type="warning" size="14" customStyle="margin: 12px 0;"></u-text>
		
		<view class="u-button" style="background-color: #FFFFFF;">
			<button type="primary" :loading="loading" class="primary" @click="save">保存</button>
		</view>
	</view>
</template>
<script>
	import md5 from 'js-md5'
	export default {
		data() {
			const pattern = /^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{8,}$/;
			return {
				loading: false,
				formData: {
					oldPassword: '',
					newPassword: '',
					newPassword2: ''
				},
				rules: {
					oldPassword: [{required: true, message: "请输入原密码", trigger: ['change', 'blur']}],
					newPassword: [
						{required: true, message: "请输入新密码", trigger: ['change', 'blur']},
						{pattern, message: "密码格式不正确", trigger: ['change', 'blur']},
					],
					newPassword2: [
						{required: true, message: "请确认新密码", trigger: ['change', 'blur']},
						{pattern, message: "密码格式不正确", trigger: ['change', 'blur']},
					],
				}
			}
		},
		methods: {
			save() {
				if (this.loading) return void 0;
				if (this.formData.newPassword2 != this.formData.newPassword) {
					return void uni.$u.toast("两次密码输入不一致")
				}
				this.$refs.formRef.validate().then(() => {
					this.loading = true;
					uni.showLoading({
						title: '提交数据中...',
						mask: true
					})
					const info = {
						oldPassword: md5(this.formData.oldPassword),
						password: md5(this.formData.newPassword),
						rePassword: md5(this.formData.newPassword2)
					}
					uni.$u.http.post("/account/updatePwd", info, {
						header: {
							'Content-Type':  "application/json"
						}
					}).then(res => {
						console.log(res) 
						if (res.data.code == 200) {
							uni.$u.toast("修改成功");
							uni.setStorageSync("password",'');
							setTimeout(function() {
								uni.$u.route({
									type: "reLaunch",
									url: "pages/user/login",
									params: {
										isAuto: false
									}
								})
							}, 1000)
						}
					}).catch((err)=>{
						console.log(err)
					}).finally(()=>{
						uni.hideLoading();
						this.loading = false;
					})
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.update-container {
		position: relative;
	}
</style>
