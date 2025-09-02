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

export const getGeoCoder = async (address: string): Promise<{ lat: number, lng: number }> => {
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



export const getAuthorize = (silent = false) => {
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
				!silent && uni.showLoading({ title: '正在登录' })
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

export const navigateToMap = async (address: string) => {
	const geo = await getGeoCoder(address)
	uni.openLocation({
		latitude: geo.lat, // 纬度（Number 类型）
		longitude: geo.lng, // 经度（Number 类型）
		// name: detail.value.content.address, // 位置名称（可选）
		address, // 详细地址信息（可选）
		scale: 18, // 缩放比例，范围5~18，默认为18
		success: function () {
			console.log('打开地图成功');
		},
		fail: function (err) {
			console.error('打开地图失败', err);
		}
	});
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

export const isPastTime = (timeStr) => {
	const inputTime = new Date(timeStr.replace(/-/g, '/')); // Safari 兼容性
	const now = new Date();
	return inputTime < now;
}
