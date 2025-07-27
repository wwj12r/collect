<template>
	<view class="login-page">
		<view class="logo">
			<image src="/static/logo.png" mode="aspectFit" />
		</view>
		<view class="welcome-text">欢迎使用本应用，请授权登录</view>
		<!-- <button class="auth-button" open-type="getUserInfo" @getuserinfo="handleLogin">
			授权登录
		</button> -->
		<button class="auth-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权登录</button>
	</view>
</template>

<script>
import { IndexApi } from '../../services';

export default {
	data() {
		return {};
	},
	methods: {
		getAuthorize() {
			uni.getSetting({
				success: res => {
					uni.showLoading({ title: '正在登录' })
					if (res.authSetting['scope.userInfo']) {
						this.login()
					} else {
						uni.authorize({
							scope: 'scope.userInfo',
							success: res => {
								console.log(res)
								this.login()
							},
							fail: err => {
								console.log(err)
								uni.hideLoading()
							}
						})
					}
				}
			})
		},
		login() {
			uni.login({
				provider: 'weixin',
				success: res => {
					this.getUserInfo(res.code)
				},
				fail: err => {
					console.log(err)
					uni.hideLoading()
				}
			})
		},
		getUserInfo(code) {
			uni.getUserInfo({
				provider: 'weixin',
				withCredentials: true,
				success: res => {
					console.log(code, JSON.stringify(res))
					this.getToken(code, res)
				},
				fail: err => {
					console.log(err)
					uni.hideLoading()
				},
			})
		},
		getToken(code, userInfo) {
			console.log(11111)
			console.log(code)
			console.log(userInfo)
			console.log(JSON.stringify(userInfo))
			IndexApi.postLogin({code, userInfo}).then(res => {
				console.log('res',res)
			})
		},
		getPhoneNumber(e) {
			console.log(111)
			console.log(e)
			if (e.detail.errMsg === 'getPhoneNumber:ok') {
				// 获取到加密数据
				const encryptedData = e.detail.encryptedData;
				const iv = e.detail.iv;

				// 获取用户登录凭证code
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						const code = loginRes.code;

						uni.request({
							url: "https://www.91sami.com/api/web/activitysignet/getphonenumber",
							dataType: "json",
							responseType: "json",
							method: "POST",
							data: {
								code,
								encryptedData,
								iv
							},
						}).then(res => {
							console.log(res)
						})
					}
				});
			} else {
				uni.showToast({
					title: '获取手机号失败',
					icon: 'none'
				});
			}
		}
	},
};
</script>

<style scoped>
.login-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #f5f5f5;
}

.logo {
	width: 100px;
	height: 100px;
	margin-bottom: 20px;
}

.logo image {
	width: 100%;
	height: 100%;
}

.welcome-text {
	font-size: 16px;
	color: #333;
	margin-bottom: 20px;
}

.auth-button {
	width: 200px;
	height: 40px;
	background-color: #007aff;
	color: #fff;
	border-radius: 20px;
	text-align: center;
	line-height: 40px;
}
</style>