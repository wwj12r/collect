<template>
	<view class="wv-root">
		<web-view v-if="webSrc" :src="webSrc" @message="onWebViewMessage" />
	</view>
</template>

<script>
import { getAuthorize } from '../../utils/utils'

const DEFAULT_SHARE = {
	title: '撒米屋',
	path: '/pages/index/index',
	imageUrl: '',
}
let lastShareFromH5 = { ...DEFAULT_SHARE }
const WEBVIEW_URL_PREFIX = 'https://www.91sami.com/smwgameMini/newMap?token='

const ROOM_SHARE_TITLE = 'hi朋友，来一起玩"你拼我猜"吗？'

function mergeTokenIntoH5Url(url, token) {
	if (!url) return ''
	if (!token) return url
	try {
		const u = new URL(url)
		u.searchParams.set('token', token)
		return u.toString()
	} catch (_) {
		const sep = url.includes('?') ? '&' : '?'
		return `${url}${sep}token=${encodeURIComponent(token)}`
	}
}

function deriveShareFromWebSrc(webSrc) {
	if (!webSrc || typeof webSrc !== 'string') return
	try {
		const u = new URL(webSrc)
		if (/\/room\/[^/]+\/?/i.test(u.pathname)) {
			const mpPath = `/pages/index/index?url=${encodeURIComponent(webSrc)}&nativeShare=1`
			lastShareFromH5 = {
				title: ROOM_SHARE_TITLE,
				path: mpPath,
				imageUrl: '',
			}
		}
	} catch (_) {}
}

export default {
	data() {
		return {
			webSrc: '',
			nativeShareBtn: false,
			shareBtnCustom: false,
			shareBtnBoxStyle: '',
		}
	},
	onLoad(options = {}) {
		this.ensureLoginAndLoadWebview(options)
		this.nativeShareBtn = options.nativeShare === '1'
		const st = parseInt(options.shareTop, 10)
		const sr = parseInt(options.shareRight, 10)
		const sw = parseInt(options.shareW, 10)
		const sh = parseInt(options.shareH, 10)
		if ([st, sr, sw, sh].every((n) => !Number.isNaN(n) && n >= 0)) {
			this.shareBtnCustom = true
			this.shareBtnBoxStyle = `position:fixed;top:${st}rpx;right:${sr}rpx;width:${sw}rpx;height:${sh}rpx;left:auto;bottom:auto;display:flex;align-items:center;justify-content:center;`
		}
	},
	onShow() {
		// 从分享 path 进入且携带了 url 时，优先保持该 url（含 roomId）
		if (!this.webSrc) this.updateWebSrcByToken()
	},
	methods: {
		updateWebSrcByToken() {
			const token = String(uni.getStorageSync('token') || '')
			const url = WEBVIEW_URL_PREFIX + encodeURIComponent(token)
			if (url !== this.webSrc) {
				this.webSrc = url
				deriveShareFromWebSrc(this.webSrc)
			}
		},
		async ensureLoginAndLoadWebview(options = {}) {
			const token = String(uni.getStorageSync('token') || '')
			if (!token) {
				try {
					await getAuthorize()
				} catch (_) {
					// 登录失败时不阻断页面，仍加载未登录地址
				}
			}
			const latestToken = String(uni.getStorageSync('token') || '')
			if (options.url) {
				const baseUrl = decodeURIComponent(String(options.url))
				this.webSrc = mergeTokenIntoH5Url(baseUrl, options.token || latestToken)
				deriveShareFromWebSrc(this.webSrc)
				return
			}
			this.updateWebSrcByToken()
		},
		goShareEntry() {
			const p = lastShareFromH5
			const q = []
			if (p.title) q.push(`title=${encodeURIComponent(p.title)}`)
			if (p.path) q.push(`path=${encodeURIComponent(p.path)}`)
			if (p.imageUrl) q.push(`imageUrl=${encodeURIComponent(p.imageUrl)}`)
			if (this.webSrc) q.push(`h5url=${encodeURIComponent(this.webSrc)}`)
			const url = `/pages/common/share-entry${q.length ? `?${q.join('&')}` : ''}`
			uni.navigateTo({ url })
		},
		onWebViewMessage(e) {
			console.log(e)
			try {
				const detail = e.detail || e.mp?.detail || {}
				let list = detail.data
				if (list == null) return
				if (!Array.isArray(list)) {
					list = [list]
				}
				if (!list.length) return
				const last = list[list.length - 1]
				if (last && last.type === 'share') {
					lastShareFromH5 = {
						title:
							typeof last.title === 'string' && last.title ? last.title : DEFAULT_SHARE.title,
						path:
							typeof last.path === 'string' && last.path.startsWith('/')
								? last.path
								: DEFAULT_SHARE.path,
						imageUrl: typeof last.imageUrl === 'string' ? last.imageUrl : '',
					}
				}
			} catch (_) {}
		},
	},
	onShareAppMessage() {
		const promise = new Promise((resolve) => {
			setTimeout(() => {
				const p = lastShareFromH5
				resolve({
					title: p.title,
					path: p.path,
					imageUrl: p.imageUrl || undefined,
				})
			}, 100)
		})
		return {
			title: DEFAULT_SHARE.title,
			path: DEFAULT_SHARE.path,
			promise,
		}
	},
}
</script>

<style scoped>
.wv-root {
	width: 100%;
	height: 100vh;
	position: relative;
}
.wv-native-share {
	position: fixed;
	z-index: 99998;
	left: 0;
	right: 0;
	bottom: calc(200rpx + env(safe-area-inset-bottom));
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	pointer-events: auto;
}
.wv-native-share--custom {
	left: auto;
	right: auto;
	bottom: auto;
}
.wv-native-share--custom .wv-native-share__btn {
	width: 100%;
	height: 100%;
	padding: 0 8rpx;
	font-size: 22rpx;
	box-sizing: border-box;
}
.wv-native-share__btn {
	font-size: 28rpx;
	padding: 18rpx 56rpx;
	line-height: 1.25;
	color: #4a3208;
	background: linear-gradient(180deg, #ffe08a, #ffc169);
	border-radius: 999rpx;
	border: 2rpx solid rgba(191, 155, 109, 0.9);
}
.wv-native-share__btn::after {
	border: none;
}
.wv-native-share__btn--hover {
	opacity: 0.88;
}
</style>
