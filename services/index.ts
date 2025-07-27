import request from "./request"

export const IndexApi = {

	/**
	 * 微信小程序登录
	*/
	postLogin(data) {
		return request.post({ url: '/activitysignet/miniprogramlogin', data })
	},

	/**
	 * 微信小程序获取手机号
	*/
	postPhonenumber(data) {
		return request.post({ url: '/activitysignet/getphonenumber', data })
	},
	/**
	 * 首页/活动列表页
	*/
	getActivitysignet(data) {
		return request.get({ url: '/activitysignet', data })
	},
	/**
	 * 活动详情
	*/
	getActivitysignetDetail(id: string) {
		return request.get({ url: '/activitysignet/' + id })
	},
	/**
	 * 上传活动图片
	*/
	postImage(data) {
		// return uni.uploadFile({
		// 	url: 'https://www.91sami.com/api/web/image', // ✅ 改成你自己的接口地址
		// 	filePath: data.photo,
		// 	name: 'file', // ✅ 与后端接收字段一致
		// 	header: {
		// 		'access-token': uni.getStorageSync('token') || '',
		// 	},
		// 	formData: {
		// 	  type: 4,
		// 	},
		// 	success: (uploadRes) => {
		// 	  console.log('上传成功：', uploadRes)
		// 	},
		// 	fail: (err) => {
		// 	  console.error('上传失败：', err)
		// 	}
		//   })
		return request.upload({ url: '/image', data: { ...data, type: 4 } })
	},
	/**
	 * 活动报名
	*/
	postSignin(data) {
		return request.post({ url: 'activitysignet/signin', data })
	},
}