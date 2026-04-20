<template>
	<view class="share-entry">
		<text class="share-entry__tip">点击下方按钮选择好友转发</text>
		<button class="share-entry__btn" open-type="share" hover-class="share-entry__btn--hover" @tap="onShareTap">
			转发
		</button>
	</view>
</template>

<script>
const DEFAULT_SHARE_TITLE = 'hi朋友，来一起玩"你拼我猜"吗？'
const DEFAULT_SHARE_DESC = '和手帐搭子一起在游戏中玩出素材吧。'
const DEFAULT_SHARE_PATH = '/pages/index/index'

function safeDecode(value) {
	if (typeof value !== 'string') return ''
	try {
		return decodeURIComponent(value).trim()
	} catch (_) {
		return value.trim()
	}
}

function normalizeMiniProgramPath(path) {
	if (!path) return DEFAULT_SHARE_PATH
	return path.startsWith('/') ? path : `/${path}`
}

function buildWebviewPathFromH5Url(h5url) {
	if (!h5url) return ''
	const clean = safeDecode(h5url)
	if (!clean) return ''
	return `/pages/index/index?url=${encodeURIComponent(clean)}&nativeShare=1`
}

export default {
	data() {
		return {
			/** 与 H5 WaitingRoom 的分享文案保持一致 */
			shareTitle: DEFAULT_SHARE_TITLE,
			shareDesc: DEFAULT_SHARE_DESC,
			/** 点开分享卡片要打开的小程序路径，须以 / 开头 */
			sharePath: DEFAULT_SHARE_PATH,
			shareImageUrl: '',
			backTimer: null,
		}
	},
	onLoad(query) {
		const h5Path = buildWebviewPathFromH5Url(query.h5url)
		const hasH5Path = !!h5Path
		if (h5Path) {
			// 优先用当前 webview 的 H5 URL 组装分享落地，确保 roomId（/room/:id）透传给 H5
			this.sharePath = h5Path
		}
		if (query.title) {
			const v = safeDecode(query.title)
			if (v) this.shareTitle = v
		}
		if (query.desc) {
			const v = safeDecode(query.desc)
			if (v) this.shareDesc = v
		}
		if (!hasH5Path && query.path) {
			const v = safeDecode(query.path)
			if (v) this.sharePath = normalizeMiniProgramPath(v)
		}
		if (query.imageUrl) {
			this.shareImageUrl = safeDecode(query.imageUrl)
		}
	},
	onUnload() {
		if (this.backTimer) {
			clearTimeout(this.backTimer)
			this.backTimer = null
		}
	},
	methods: {
		onShareTap() {
			if (this.backTimer) clearTimeout(this.backTimer)
			// 留出时间让系统先拉起转发面板，再返回上一页
			this.backTimer = setTimeout(() => {
				this.backTimer = null
				uni.navigateBack({ delta: 1 })
			}, 1200)
		},
	},
	onShareAppMessage() {
		const out = {
			title: this.shareTitle,
			path: this.sharePath,
		}
		if (this.shareImageUrl) {
			out.imageUrl = this.shareImageUrl
		}
		return out
	},
}
</script>

<style scoped>
.share-entry {
	min-height: 100vh;
	padding: 80rpx 48rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #f6f6f6;
}
.share-entry__tip {
	font-size: 28rpx;
	color: #666;
	margin-bottom: 48rpx;
	text-align: center;
}
.share-entry__btn {
	width: 100%;
	max-width: 480rpx;
	font-size: 32rpx;
	line-height: 2;
	background: #07c160;
	color: #fff;
	border-radius: 12rpx;
}
.share-entry__btn::after {
	border: none;
}
.share-entry__btn--hover {
	opacity: 0.9;
}
</style>
