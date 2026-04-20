<template>
	<view class="wrap">正在保存…</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'

onLoad((query) => {
	const raw = query.url
	if (!raw) {
		uni.showToast({ title: '缺少图片地址', icon: 'none' })
		setTimeout(() => uni.navigateBack(), 1500)
		return
	}
	const url = decodeURIComponent(raw)
	uni.downloadFile({
		url,
		success: (res) => {
			if (res.statusCode !== 200 || !res.tempFilePath) {
				uni.showToast({ title: '下载失败', icon: 'none' })
				setTimeout(() => uni.navigateBack(), 1500)
				return
			}
			uni.saveImageToPhotosAlbum({
				filePath: res.tempFilePath,
				success: () => {
					uni.showToast({ title: '已保存到相册' })
					setTimeout(() => uni.navigateBack(), 800)
				},
				fail: (err) => {
					console.error('saveImageToPhotosAlbum', err)
					uni.showToast({ title: '保存失败，请检查相册权限', icon: 'none' })
					setTimeout(() => uni.navigateBack(), 2000)
				},
			})
		},
		fail: (err) => {
			console.error('downloadFile', err)
			uni.showToast({ title: '下载失败', icon: 'none' })
			setTimeout(() => uni.navigateBack(), 1500)
		},
	})
})
</script>

<style scoped>
.wrap {
	padding: 40rpx;
	text-align: center;
	color: #666;
	font-size: 28rpx;
}
</style>
