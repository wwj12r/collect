import { IndexApi } from "../services"
import request from "../services/request"
import { imgBaseUrl } from "./enums";

export const prefillImageUrl = (url: string) => {
	return imgBaseUrl + url;
}

export const uploadImg = async (tempFilePaths: string[]) => {
	return Promise.all(await tempFilePaths.map(item => IndexApi.postImage(item)))
}

export const getGeoCoder = async (address: string) => {
	const res = await uni.request({
		url: `https://apis.map.qq.com/ws/geocoder/v1/?address=${address}&key=QQMBZ-EOM6Z-C3EXT-7U336-ME6XH-3ZFVC`
	})
	console.log(res)
}



export const getAuthorize = () => {
	return new Promise(resolve => {
		uni.getSetting({
			success: res => {
				const login = () => {
					uni.login({
						provider: 'weixin',
						success: code => {
							uni.getUserInfo({
								provider: 'weixin',
								withCredentials: true,
								success: res => {
									console.log(code.code, JSON.stringify(res))
									// getToken(res.code, res)

									IndexApi.postLogin({ code: code.code, userInfo: JSON.stringify(res) }).then(res => {
										console.log(res)
										uni.setStorageSync('token', res.access_token)
										// showPopup.value = true
										resolve(res)
										uni.hideLoading()
									}).catch(rej => {
										uni.hideLoading()
									})
								},
								fail: err => {
									console.log(err)
									uni.hideLoading()
								},
							})
						},
						fail: err => {
							console.log(err)
							uni.hideLoading()
						}
					})
				}
				uni.showLoading({ title: '正在登录' })
				if (res.authSetting['scope.userInfo']) {
					login()
				} else {
					uni.authorize({
						scope: 'scope.userInfo',
						success: res => {
							console.log(res)
							login()
						},
						fail: err => {
							console.log(err)
							uni.hideLoading()
						}
					})
				}
			}
		})
	})
}