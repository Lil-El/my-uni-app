<template>
	<view class="uni-page login-container">
		<view class="header u-flex-y u-flex-items-center">
			<u-image src="/static/images/logo.png" width="80px" height="80px"></u-image>
			<u-text text="欢迎使用" size="20" color="#333333" align="center" margin="14px 0 0"></u-text>
			<u-text text="太化集团不动产管理平台" size="20" color="#333333" align="center" margin="0 0"></u-text>
		</view>
	
		<view class="content">
			<u-form :model="formData" :rules="formRules" ref="formRef">
				<u-form-item prop="username" labelWidth="0">
					<view class="uni-width">
						<view class="form-label">账号</view>
						<u-input placeholder="请输入账号" border="bottom" v-model="formData.username" clearable maxlength="24"></u-input>						
					</view>
				</u-form-item>
				<u-form-item prop="password" labelWidth="0">
					<view class="uni-width">
						<view class="form-label">密码</view>
						<u-input :key="isPasswordVisible" :type="isPasswordVisible ? 'text' : 'password'" placeholder="请输入密码" border="bottom" v-model="formData.password" maxlength="32">
							<template slot="suffix">
								<u-icon @click="isPasswordVisible = !isPasswordVisible" :name="isPasswordVisible ? 'eye-fill' : 'eye-off'" :color="isPasswordVisible ? '#0da6dd' : '#909399'" size="20"></u-icon>
							</template>
						</u-input>
					</view>
				</u-form-item>
			</u-form>
			
			<u-checkbox-group class="uni-common-mt__10" v-model="autoData" @change="onChangeAuto">
				<u-checkbox label="自动登录" name="AUTO_LOGIN"></u-checkbox>
			</u-checkbox-group>
			<view class="uni-common-mt__24">
				<u-button type="primary" text="登录" size="large" :loading="loading" :disabled="loading" @click="onLogin"></u-button>
			</view>
		</view>
		<view class="foot">
			<u-text @click="isSettingVisible = true" text="服务设置" align="center" size="14"></u-text>
			<u-text text="Copyright @2021 TINCHER" color="#9fa0a2" align="center" size="12"></u-text>
			<u-text :text="'All Rights Reserved (v' + versionData.name+ ')'" color="#9fa0a2" align="center" size="12"></u-text>
		</view>
		
		<u-popup :show="isSettingVisible" :round="10" mode="bottom" @open="setSettingData">
			<view class="uni-container">
				<u-form :model="settingData" :rules="settingRules" ref="settingRef">
					<u-form-item prop="ip" label="IP">
						<u-input placeholder="请输入IP地址" border="bottom" v-model="settingData.ip" clearable maxlength="32"></u-input>						
					</u-form-item>
					<u-form-item prop="port" label="端口">
						<u-input placeholder="请输入端口号" border="bottom" v-model="settingData.port" clearable maxlength="32"></u-input>
					</u-form-item>
					<u-form-item>
						<u-button type="info" @click="onSettingDefault">重置</u-button>
						<u-button type="primary" @click="onSetting">设置</u-button>
					</u-form-item>
				</u-form>
			</view>
		</u-popup>
		
		<u-modal :show="isUpdateVisible" @cancel="onCancel" @confirm="onDownload" :title="isDownloading ? '下载安装包中' : '发现新版本'" :showCancelButton="!updateData.isForce && !isDownloading" :showConfirmButton="!isDownloading" confirmText="立即更新" cancelText="取消">
			<u-line-progress v-if="isDownloading" :percentage="updateData.percent" activeColor="#3C9CFF"></u-line-progress>
			<view class="uni-width" v-else>
				<u-text :text="updateData.content"></u-text>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {setHttpConfig} from "@/config/request.js"
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				formData: {
					username: uni.getStorageSync("username"),
					password: uni.getStorageSync("password"),					
				},
				formRules: {
					username: [{required: true, message: "请输入账号", trigger: ['blur', 'change']}],
					password: [{required: true, message: "请输入账号", trigger: ['blur', 'change']}],
				},
				settingData: {
					ip: "",
					port: "",
				},
				settingRules: {
					ip: [{required: true, message: "请输入IP地址", trigger: ['blur', 'change']}],
					port: [{required: true, message: "请输入端口号", trigger: ['blur', 'change']}],
				},
				autoData: [],
				// 更新数据
				updateData: { 
					isForce: false,
					content: "",
					percent: 0
				},
				// 版本数据
				versionData: {
					code: "",
					name: ""
				},
				isSettingVisible: false,
				isUpdateVisible: false,
				isPasswordVisible: false,
				loading: false,
			}
		},
		computed: {
			isDownloading() {
				return this.updateData.percent != 0;
			}
		},
		async onLoad(option) {
			uni.$off("$location");
			this.versionData = await this.getAppVersion();
			if (uni.getStorageSync("isAuto")) {
				this.autoData = [uni.getStorageSync("isAuto")];
			}
			const isAuto = option.isAuto === "false" ? false : this.autoData[0];
			this.onCheckVersion(isAuto);
		},
		methods: {
			async onLogin() {
				if(this.loading) return void 0;
				this.$refs.formRef.validate().then(() => {
					this.loading = true;
					return uni.$u.http.post('/app/user/login', {
						username: this.formData.username,
						password: md5(this.formData.password),
					})
				}).then((res)=>{
					uni.setStorageSync('token', res.data.data.token);
					uni.setStorageSync("username", this.formData.username);
					uni.setStorageSync("password", this.formData.password);
					uni.setStorageSync("userInfo", res.data.data.user);
					getApp().globalData.userInfo = res.data.data.user;
					uni.setStorageSync("isAuto", this.autoData[0] || "");
					 // 开启 -> 位置服务
					getApp().onLocation();
					uni.$emit("$location");
					
					this.onNavigateHome();
				}).catch(e => {
					console.log(e)
				}).finally(()=>{
					this.loading = false;
				})
			},
			onNavigateHome() {
				return void uni.$u.route({
					type: "reLaunch",
					url: 'pages/office/index',
				})
			},
			onChangeAuto(data) {
				this.autoData = data;
			},
			setSettingData() {
				this.settingData = {
					ip: uni.getStorageSync('ip') || getApp().globalData.ip,
					port: uni.getStorageSync('port') || getApp().globalData.port,
				}
			},
			onSettingDefault() {
				uni.setStorageSync("ip", getApp().globalData.ip);
				uni.setStorageSync("port", getApp().globalData.port);
				this.setSettingData();
				setHttpConfig();
			},
			onSetting(){
				this.$refs.settingRef.validate().then(()=>{
					uni.setStorageSync('ip', this.settingData.ip);
					uni.setStorageSync('port', this.settingData.port);
					this.isSettingVisible = false;
					setHttpConfig();
				})
			},
			onCheckVersion(isAutoLogin = false) {
				uni.$u.http.get("/version/get").then((res)=>{
					const data = res.data.data;
					console.log(data)
					if (~~data.version > ~~this.versionData.code) {
						this.updateData = {
							content: data.remark,
							isForce: data.type == 0,
							percent: 0,
						}
						this.isUpdateVisible = true;
					} else {
						isAutoLogin && this.onLogin();
					}
				}).catch((e)=>{
					console.log(e)
				})
			},
			onCancel() {
				this.isUpdateVisible = false;
			},
			onDownload() {
				if (uni.$u.os() == 'ios') {
					this.fetchIosIpa();
				} else {
					this.fetchAndroidApk()
				}
			},
			fetchAndroidApk() {
				uni.$u.http.download("/app/install", {
					params: getApp().globalData.pgyerKey,
					custom: {
						pgyer: true
					},
					getTask: (task) => {
						task.onProgressUpdate((res) => {
							this.updateData.percent = Number.parseInt(res.totalBytesWritten / res.totalBytesExpectedToWrite * 100);
						});
					},
				}).then(({tempFilePath})=>{
					plus.runtime.install(plus.io.convertLocalFileSystemURL(tempFilePath), {}, {}, function(error) {
						uni.$u.toast("安装失败");
					})
				}).finally(()=>{
					this.isUpdateVisible = false;
				})
			},
			fetchIosIpa() {
				uni.$u.http.post("/app/view", getApp().globalData.pgyerKey, {
					custom: {
						pgyer: true
					}
				}).then(res => {
					const buildKey = res.data.data.buildKey;
					plus.runtime.openURL(`itms-services://?action=download-manifest&url=https://www.pgyer.com/app/plist/${buildKey}`);
				})
			},
			getAppVersion() {
				return new Promise((resolve, reject) => {
					plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
						resolve({
							code: wgtinfo.versionCode,
							name: wgtinfo.version
						});
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.login-container {
		background-image: url('/static/images/login_bg.png');
		background-size: 100% 100%;
		padding-top: 70px;
	}
	.header {
		margin-bottom: 14px;
	}

	.content {
		@extend .uni-common-ml__16;
		@extend .uni-common-mr__16;
		.form-label {
			display: block;
			font-size: 14px;
			line-height: 2.5em;
		}
	}

	.ckb {
		font-size: 14px;
		color: #777777;
	}

	.foot {
		position: absolute;
		bottom: 10px;
		left: 0;
		right: 0;
	}
</style>
