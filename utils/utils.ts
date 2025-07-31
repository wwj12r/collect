import { IndexApi } from "../services"
import { imgBaseUrl } from "./enums";
// 用ES6的import方式引入QQMapWX，避免require导致的类型错误
import QQMapWX from '../utils/qqmap';
import { useToken } from "../hooks/userToken";


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
	return new Promise(resolve => {
		const qqmapsdk = new QQMapWX({
			key: 'FGOBZ-4CG33-K523G-OVTXS-7UEJV-OUBGX'
		})
		qqmapsdk.geocoder({
			address,
			success: (e) => {
				resolve(e?.result?.location)
			},
			fail: function (error) {
				console.error(error);
			},
		})
	})
	// const res = await uni.request({
	// 	url: `https://apis.map.qq.com/ws/geocoder/v1?location=${address}&key=FGOBZ-4CG33-K523G-OVTXS-7UEJV-OUBGX`
	// })
}



export const getAuthorize = () => {
	const { tokenRef, setToken } = useToken()
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
										setToken(res.access_token)
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

export const getFullImageUrl = (url: string) => {
	return url?.startsWith('http') ? url : imgBaseUrl + url
}

export const getDistance = (lat1, lon1, lat2, lon2) => {
	const toRad = val => val * Math.PI / 180;
	const R = 6371; // 地球半径（单位：公里）
  
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
  
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
			  Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // 返回单位为 km
  }