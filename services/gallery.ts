import request from "./request"

export const GalleryApi = {


	/**
	 * 集章卡册列表
	*/
	getContentuserlist() {
		return request.post({ url: '/activitysignet/contentuserlist' })
	},
}