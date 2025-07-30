import request from "./request"

export const GalleryApi = {


	/**
	 * 集章卡册列表
	*/
	getContentuserlist(data) {
		return request.get({ url: '/activitysignet/contentuserlist', data })
	},

	/**
	 * 活动点赞
	*/
	postZan(data) {
		return request.post({ url: '/activitysignet/zan', data })
	},
}