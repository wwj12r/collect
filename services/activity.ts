import request, { BizResponse } from "./request"

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
	intro: string
}

export interface PublishActivityResponse {
	message: string
	activity_id: string
	status: 'success' | 'error'
}

export const ActivityApi = {
	/**
	 * 发布活动
	 * 根据 Postman 文档: https://documenter.getpostman.com/view/3444793/2sB34kEeJG#e68c801e-7022-4796-bf91-2949f61f327d
	 */
	publishActivity(data: PublishActivityRequest) {
		return request.post<BizResponse>({ 
			url: '/activitysignet', 
			data 
		})
	}
}
