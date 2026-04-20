<template>
	<view class="share-entry">
		<text class="share-entry__tip">点击下方按钮选择好友转发</text>
		<button class="share-entry__btn" open-type="share" hover-class="share-entry__btn--hover" @tap="onShareTap">
			转发
		</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			shareTitle: '撒米屋',
			/** 点开分享卡片要打开的小程序路径，须以 / 开头 */
			sharePath: '/pages/index/index',
			shareImageUrl: '',
			backTimer: null,
		}
	},
	onLoad(query) {
		if (query.title) {
			try {
				this.shareTitle = decodeURIComponent(query.title)
			} catch (_) {}
		}
		if (query.path) {
			try {
				this.sharePath = decodeURIComponent(query.path)
			} catch (_) {}
		}
		if (query.imageUrl) {
			try {
				this.shareImageUrl = decodeURIComponent(query.imageUrl)
			} catch (_) {}
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
