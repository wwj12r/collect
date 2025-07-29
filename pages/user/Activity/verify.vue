<template>
	<view class="ticket-page">
		<!-- 顶部状态 -->
		<view class="status-bar">
			<image src="/static/user/activity-position.png" mode="aspectFit" class="w-4 h-4"  />
			<text class="status-text">待现场使用</text>
		</view>
		<view class="tip-time">请在{{ useTime }} 前到现场使用</view>

		<!-- 活动信息卡片 -->
		<view class="ticket-card">
			<view class="event-info">
				<image class="event-img" :src="event.img" mode="aspectFill" />
				<view class="event-title">{{ event.title }}</view>
			</view>
			<view class="qrcode-area">
				<image class="qrcode-img" :src="qrcodeUrl" mode="aspectFill" @click="showPopup = true" />
				<view class="qrcode-tip">请出示活动凭证</view>
			</view>
			<view class="event-detail">
				<view class="event-time">
					<u-icon type="calendar" size="18" color="#bbb" />
					<text>{{ event.time }}</text>
				</view>
				<view class="event-address">
					<u-icon type="location" size="18" color="#bbb" />
					<text>{{ event.address }}</text>
				</view>
			</view>
		</view>

		<!-- 操作按钮 -->
		<view class="action-bar">
			<button class="action-btn" @click="save">保存到相册</button>
			<button class="action-btn" @click="shareImg">分享图片版</button>
			<button class="action-btn" @click="shareText">分享文字版</button>
		</view>

		<!-- 须知说明 -->
		<view class="notice">
			<view>1. 参与活动时，请出示活动凭证二维码；</view>
			<view>2. 二维码有效期为到期前1小时，失效后，请进入【我的订单】查看详情，重新获取或联系客服。</view>
		</view>
	</view>
	<!-- 先在<script setup>中引入组件 -->
	<VerifySuccessPopup v-model:show="showPopup" orderNo="44123458545695210087" initiator="Starshine-js" initiatorAvatar="https://your-image-url/avatar.png" @continue="handleContinue" />
</template>

<script setup>
import { ref } from 'vue'
import VerifySuccessPopup from './components/VerifySuccessPopup.vue'

const useTime = '2025-05-12 09:52:10'
const event = {
	img: 'https://your-image-url/event.jpg',
	title: '广州东山口第一届集章大会，8月8日 正式启动',
	time: '08-08 周日 13:00-18:00',
	address: '广州市越秀区文德路西场东街一巷285-05'
}
const qrcodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=活动凭证示例' // 可替换为自己的二维码图片

const showPopup = ref(false)
function goBack() {
	uni.navigateBack()
}
function save() {
	uni.showToast({ title: '保存到相册', icon: 'none' })
}
function shareImg() {
	uni.showToast({ title: '分享图片版', icon: 'none' })
}
function shareText() {
	uni.showToast({ title: '分享文字版', icon: 'none' })
}
</script>

<style scoped>
.ticket-page {
	background: #f7f7f7;
	min-height: 100vh;
	padding-bottom: 40rpx;
}

.status-bar {
	display: flex;
	align-items: center;
	padding: 32rpx 24rpx 12rpx 24rpx;
}

.status-text {
	font-size: 32rpx;
	font-weight: bold;
	margin-left: 12rpx;
}

.tip-time {
	font-size: 22rpx;
	color: #888;
	margin: 8rpx 0 48rpx 24rpx;
}

.ticket-card {
	background: #fff;
	border-radius: 24rpx;
	margin: 0 18rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
	padding: 0 0 24rpx 0;
	margin-bottom: 18rpx;
}

.event-info {
	display: flex;
	align-items: center;
	padding: 24rpx 24rpx 0 24rpx;
}

.event-img {
	width: 80rpx;
	height: 80rpx;
	border-radius: 12rpx;
	margin-right: 16rpx;
	object-fit: cover;
}

.event-title {
	font-size: 26rpx;
	font-weight: bold;
	color: #222;
	flex: 1;
}

.qrcode-area {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 24rpx 0 0 0;
}

.qrcode-img {
	width: 220rpx;
	height: 220rpx;
	background: #f2f2f2;
	border-radius: 16rpx;
	margin-bottom: 12rpx;
}

.qrcode-tip {
	font-size: 24rpx;
	color: #222;
	font-weight: bold;
	margin-bottom: 8rpx;
}

.event-detail {
	padding: 0 24rpx;
	margin-top: 8rpx;
}

.event-time,
.event-address {
	display: flex;
	align-items: center;
	font-size: 22rpx;
	color: #888;
	margin-bottom: 4rpx;
}

.event-time u-icon,
.event-address u-icon {
	margin-right: 6rpx;
}

.action-bar {
	display: flex;
	justify-content: space-around;
	margin: 24rpx 18rpx 0 18rpx;
}

.action-btn {
	flex: 1;
	margin: 0 8rpx;
	background: #f7f7f7;
	color: #222;
	font-size: 22rpx;
	border-radius: 24rpx;
	padding: 16rpx 0;
	border: none;
}

.notice {
	font-size: 20rpx;
	color: #888;
	margin: 32rpx 24rpx 0 24rpx;
	line-height: 1.8;
}
</style>