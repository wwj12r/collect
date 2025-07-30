import { IndexApi } from "../services"
import { imgBaseUrl } from "./enums";

export const prefillImageUrl = (url: string) => {
	return imgBaseUrl + url;
}

export const getPhotoFromStringSlice = (photo: string) => {
	if (photo) {
		return prefillImageUrl(photo.split(',')[0])
	}
	return ''
}

/**
 * 上传图片，返回[{imgUrl: http://xxxx.png}]
 * @param tempFilePaths tempFilePaths数组
*/
export const uploadImg = async (tempFilePaths: string[]): Promise<{ imgUrl: string }[]> => {
	const results = await Promise.all(tempFilePaths.map(item => IndexApi.postImage(item)));
	return results as { imgUrl: string }[];
}

export const getGeoCoder = async (address: string) => {
	const res = await uni.request({
		url: `https://apis.map.qq.com/ws/geocoder/v1/?address=${address}&key=FGOBZ-4CG33-K523G-OVTXS-7UEJV-OUBGX`
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
										uni.setStorageSync('userId', res.userId)
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