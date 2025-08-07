<template>
	<view class="success-page">
		<image class="ok-img" src="/static/index/suc.png" mode="widthFix" />
		<view class="main-text">信息提交成功</view>
		<view class="sub-text">等待审核</view>
		<button class="notify-btn" @click="notifyMe">审核后通知我</button>
	</view>
</template>

<script setup>
function notifyMe() {
	wx.requestSubscribeMessage({
		tmplIds: ['w5B7RjLXLc0dFMKRkLkatysqarOUvtG4eoa3fTkxgyE', 'ETneY-nAmjx44Lu5yH2gClTzpv0lzLiLPsuSgpr2_NU'], // 可以传多个
		success(res) {
			console.log('用户授权结果:', res)
			// 用户允许订阅后，res = { 模板ID1: "accept", 模板ID2: "reject" }
			if (res['w5B7RjLXLc0dFMKRkLkatysqarOUvtG4eoa3fTkxgyE'] === 'accept') {
				uni.showToast({ title: '已订阅通知', icon: 'success' })
			}
			if (res['ETneY-nAmjx44Lu5yH2gClTzpv0lzLiLPsuSgpr2_NU'] === 'accept') {
				uni.showToast({ title: '已订阅通知', icon: 'success' })
			}
		},
		fail(err) {
			console.error('请求订阅授权失败', err)
		}
	})
	// 这里可对接订阅消息API
}
</script>

<style scoped>
.success-page {
	min-height: 100vh;
	background: #f7f7f7;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.ok-img {
	width: 380rpx;
	margin-bottom: 100rpx;
}

.main-text {
	font-size: 40rpx;
	font-weight: bold;
	color: rgba(26, 26, 26, 1);
	margin-bottom: 22rpx;
	text-align: center;
}

.sub-text {
	font-size: 28rpx;
	color: rgba(153, 153, 153, 1);
	margin-bottom: 138rpx;
	text-align: center;
}

.notify-btn {
	width: 369rpx;
	height: 76rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(26, 26, 26, 1);
	color: #fff;
	font-size: 32rpx;
	border-radius: 100rpx;
	padding: 18rpx 0;
	font-weight: bold;
	margin-top: 24rpx;
}
</style>