import request from "./request"

export const UserApi = {

	/**
	 * 用户信息
	*/
	getUser() {
		return request.get({ url: '/activitysignet/userinfo' })
	},

	/**
	 * 修改用户头像
	*/
	postUploadhead(data) {
		return request.post({ url: '/user/uploadhead', data })
	},

	/**
	 * 修改用户昵称
	*/
	pustNickname(id, nickname, headimg) {
		return request.put({ url: '/user/' + id, data: nickname ? { nickname } : { headimg } })
	},
}