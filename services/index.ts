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
	postImage(data: string) {
		return new Promise(resolve => {
			const fs = uni.getFileSystemManager();
			fs.readFile({
				filePath: data,
				encoding: 'binary', // 你也可以使用 'base64'
				success: (res) => {
					uni.uploadFile({
						url: 'https://www.91sami.com/api/web/image', // ✅ 改成你自己的接口地址
						filePath: data,
						name: 'photo', // ✅ 与后端接收字段一致
						header: {
							'access-token': uni.getStorageSync('token') || '',
						},
						formData: {
							type: 4,
						},
						success: (uploadRes) => {
							console.log('上传成功：', uploadRes)
							resolve(JSON.parse(uploadRes.data).datas)
						},
						fail: (err) => {
							console.error('上传失败：', err)
						}
					})
				},
				fail: (err) => {
					console.error('读取文件失败', err);
				}
			});
		})
	},
	/**
	 * 活动报名
	*/
	postSignin(data) {
		return request.post({ url: '/activitysignet/signin', data })
	},
	/**
	 * 关注用户
	*/
	postFollow(data) {
		return request.post({ url: '/user/userflollow', data })
	},
}