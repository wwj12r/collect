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
}