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
	/**
	 * 创意评论列表
	*/
	getArticlecomment(data) {
		return request.get({ url: '/articlecomment', data })
	},
	/**
	 * 创意评论
	*/
	postArticlecomment(data) {
		return request.post({ url: '/articlecomment', data })
	},
	/**
	 * 创意评论点赞
	*/
	postArticlecommentLike(data) {
		return request.post({ url: '/articlecomment/like', data })
	},
	/**
	 * 创意点赞
	*/
	postArticleLike(data) {
		return request.post({ url: '/article/articlelike', data })
	},
	/**
	 * 获得电子印章
	*/
	postContentjoin(data) {
		return request.post({ url: '/activitysignet/contentjoin', data })
	},
}