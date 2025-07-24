<template>
	<view>
		<!-- 遮罩层 -->
		<view v-if="show" class="popup-mask" @click="close"></view>
		<!-- 弹窗内容 -->
		<view v-if="show" class="verify-popup">
			<u-icon type="closeempty" size="32" color="#888" class="close-btn" @click="close" />
			<image class="ok-img" src="https://your-image-url/ok.png" mode="widthFix" />
			<view class="main-text">您已成功核销</view>
			<view class="info-box">
				<view class="info-row">
					<text class="label">订单编号：</text>
					<text class="value">44123458545695210087</text>
				</view>
				<view class="info-row">
					<text class="label">发起人：</text>
					<image class="avatar" src="https://your-image-url/avatar.png" />
					<text class="value">Starshine-js</text>
				</view>
			</view>
			<button class="continue-btn" @click="onContinue">点击继续核销</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
	show: Boolean,
	orderNo: String,
	initiator: String,
	initiatorAvatar: String
})
const emit = defineEmits(['update:show', 'continue'])

function close() {
	emit('update:show', false)
}
function onContinue() {
	emit('continue')
	close()
}

</script>

<style scoped>
.popup-mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.45);
	z-index: 1000;
}

.verify-popup {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background: #fff;
	border-radius: 24rpx;
	width: 80vw;
	max-width: 420rpx;
	z-index: 1001;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 48rpx 0 36rpx 0;
	box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.10);
}

.close-btn {
	position: absolute;
	right: 24rpx;
	top: 24rpx;
	z-index: 2;
}

.ok-img {
	width: 120rpx;
	margin-bottom: 24rpx;
}

.main-text {
	font-size: 30rpx;
	font-weight: bold;
	color: #222;
	margin-bottom: 24rpx;
	text-align: center;
}

.info-box {
	background: #f5f5f5;
	border-radius: 14rpx;
	padding: 18rpx 24rpx;
	margin-bottom: 32rpx;
	width: 80%;
}

.info-row {
	display: flex;
	align-items: center;
	margin-bottom: 10rpx;
}

.info-row:last-child {
	margin-bottom: 0;
}

.label {
	color: #888;
	font-size: 22rpx;
}

.value {
	color: #222;
	font-size: 22rpx;
	margin-left: 4rpx;
}

.avatar {
	width: 32rpx;
	height: 32rpx;
	border-radius: 50%;
	margin: 0 8rpx;
}

.continue-btn {
	width: 80%;
	background: #222;
	color: #fff;
	font-size: 28rpx;
	border-radius: 40rpx;
	padding: 18rpx 0;
	font-weight: bold;
	margin-top: 12rpx;
}
</style>