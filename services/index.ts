import request from "./request"
import { baseUrl } from "../utils/utils"

type UploadImageResult = { imgUrl: string; width?: number; height?: number }

function buildAccessTokenQuery(): string {
	const token = String(uni.getStorageSync('token') || '')
	return token ? `access-token=${encodeURIComponent(token)}` : ''
}

/** 与 phaser RegisterService.uploadImage / HomeService.uploadImage 解析一致 */
function pickUploadUrl(datas: unknown): string {
	if (datas == null) return ''
	if (typeof datas === 'string') return datas
	if (typeof datas === 'object') {
		const o = datas as Record<string, unknown>
		const u = o.imgUrl ?? o.url ?? o.imageUrl ?? o.photo ?? o.image ?? o.headimg
		if (typeof u === 'string') return u
	}
	return ''
}

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
	 * 上传图片（与 phaser `/api/web/image` 一致：photo + type，token 走 query 与 header）
	 */
	postImage(filePath: string, type: string | number = 3): Promise<UploadImageResult> {
		return new Promise((resolve, reject) => {
			const token = String(uni.getStorageSync('token') || '')
			const query = buildAccessTokenQuery()
			uni.uploadFile({
				url: `${baseUrl}/image${query ? `?${query}` : ''}`,
				filePath,
				name: 'photo',
				header: {
					'access-token': token,
				},
				formData: {
					type: String(type),
				},
				success: (uploadRes) => {
					try {
						const body = typeof uploadRes.data === 'string'
							? JSON.parse(uploadRes.data)
							: uploadRes.data
						if (body?.ret != null && body.ret !== 0) {
							reject(new Error(body?.msg || '上传失败'))
							return
						}
						const datas = body?.datas ?? body?.data ?? body
						const imgUrl = pickUploadUrl(datas)
						if (!imgUrl) {
							reject(new Error('上传成功但未返回图片地址'))
							return
						}
						resolve({
							imgUrl,
							width: typeof datas?.width === 'number' ? datas.width : undefined,
							height: typeof datas?.height === 'number' ? datas.height : undefined,
						})
					} catch (err) {
						reject(err)
					}
				},
				fail: (err) => reject(err),
			})
		})
	},
	/**
	 * 活动报名
	*/
	postSignin(data) {
		return request.postOriginal({ url: '/activitysignet/signin', data })
	},
	/**
	 * 关注用户
	*/
	postFollow(data) {
		return request.post({ url: '/user/userflollow', data })
	},
	/**
	 * 我的活动详情
	*/
	getMyDetail(id) {
		return request.get({ url: '/activitysignet/mydetail', data: { id } })
	},
}