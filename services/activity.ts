import request, { BizResponse, PaginationRequest, PaginationResponse } from "./request"

// 发布活动相关类型定义
export interface PublishActivityRequest {
	title: string
	address: string
	startTime: string
	endTime: string
	photo: string
	content: string
	collectImgs: string
	type: number
	condition: string
	limitNum: number
	introduction: string
}

export interface FetchActivityManageListRequest {
	page: number
	perPage: number
}

export interface Activity {
	id: string
	title: string
	author: string
	startTime: string
	endTime: string
	photo: string
	state: ActivityState
	num: string
	zanNum: string
	limitNum: string
	usedNum: string
	address: string
}

export enum ActivityState {
	UNPUBLISHED = '1',
	PUBLISHED = '2',
	ENDED = '3'
}

export const ActivityStateLabelMapper = {
	[ActivityState.UNPUBLISHED]: '未发布',
	[ActivityState.PUBLISHED]: '已发布',
	[ActivityState.ENDED]: '已结束'
}

export const ActivityApi = {
	/**
	 * 发布活动
	 * 根据 Postman 文档: https://documenter.getpostman.com/view/3444793/2sB34kEeJG#e68c801e-7022-4796-bf91-2949f61f327d
	 */
	publishActivity(data: PublishActivityRequest) {
		return request.postOriginal<BizResponse>({
			url: '/activitysignet',
			data
		})
	},

	republishActivity(data: PublishActivityRequest, id: string) {
		return request.putOrigin<BizResponse>({
			url: `/activitysignet/${id}`,
			data
		})
	},

	/**
	 * 修改活动状态
	 * Like https://documenter.getpostman.com/view/3444793/2sB34kEeJG#dda0a658-ff90-4a44-a8fa-3879376f067c
	 */
	changeActivityState(id: string, state: ActivityState) {
		return request.postOriginal<BizResponse>({
			url: `/activitysignet/updatestate`,
			data: {
				id,
				state
			}
		})
	},

	/**
	 * 活动详情
	*/
	fetchActivityDetail(id: string) {
		return request.get<{ content: Activity }>({
			url: `/activitysignet/${id}`,
		})
	},

	/**
	 * 活动管理
	 * Like http://huododocumenter.getpostman.com/view/3444793/2sB34kEeJG#0d4fdf7c-87c7-4edd-97ab-e65539e6d07a 
	 */
	fetchActivityManageList(data: PaginationRequest) {
		return request.get<PaginationResponse<Activity>>({
			url: '/activitysignet/publishlist',
			data
		})
	},

	getMylist(data) {
		return request.get({ url: '/activitysignet/mylist', data })
	},

	getQrcodeConfirm(data) {
		return request.get({ url: '/activitysignet/confirm', data })
	},

	getContentlist(data) {
		return request.get({ url: '/activitysignet/contentlist', data })
	},

	postContentcreate(data) {
		return request.post({ url: '/activitysignet/contentcreate', data })
	},
	
	/**
	 * 获取活动核销二维码
	 * @param id 活动id
	 * @returns 二维码图片url
	 * @link https://documenter.getpostman.com/view/3444793/2sB34kEeJG#1dc4bc79-f96d-4d95-950e-564f49c4c690
	 */
	fetchBizVerifyQrCode(id: string) {
		return request.get<{imgUrl: string}>({
			url: `/activitysignet/qrcodeauthor`,
			data: { id }
		})
	},

	/**
	 * 获取用户活动核销二维码
	 * @param id 活动id
	 * @returns 二维码图片url
	 * @link https://documenter.getpostman.com/view/3444793/2sB34kEeJG#1dc4bc79-f96d-4d95-950e-564f49c4c690
	 */
	fetchUserVerifyQrCode(id: string) {
		return request.get<{imgUrl: string}>({
			url: `/activitysignet/qrcode`,
			data: { id }
		})
	}

}
