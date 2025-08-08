import request from "./request"

export const CenterApi = {
	/**
	 * 创意列表(热门创意话题)
	*/
	getArticle(data) {
		return request.get({ url: '/article', data })
	},

	/**
	 * 发布创意
	*/
	postArticle(data) {
		return request.post({ url: '/article', data })
	},
	/**
	 * 创意详情
	*/
	getArticleDetail(id) {
		return request.get({ url: '/article/' + id })
	},
}