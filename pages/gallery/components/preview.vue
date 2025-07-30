<template>
	<view v-if="show" class="popup-mask">
		<view class="preview-popup">
			<view class="close-btn">
				<u-icon name="close-circle" size="48rpx" color="#fff" @click="close" />
			</view>
			<image class="main-img" :src="imgUrl" mode="widthFix" />
			<view class="btn-row">
				<button class="share-btn" open-type="share" @click="onShare">分享</button>
				<button class="like-btn" @click="onLike">
					<u-icon name="thumb-up" size="22" color="#fff" style="margin-right:8rpx;" />
					<!-- <uni-icons type="compose" size="22" color="#999" /> -->
					点赞
				</button>
			</view>
		</view>
	</view>
</template>

<script setup lan ts>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
	show: Boolean,
	imgUrl: String,
})

const emit = defineEmits(['update:show', 'share', 'like'])

function close() {
	emit('update:show', false)
}
function onShare() {
	emit('share')
}
function onLike() {
	emit('like')
}
</script>

<style scoped lang="scss">
.popup-mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.55);
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
}

.preview-popup {
	border-radius: 24rpx;
	box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.10);
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
}

.close-btn {
	position: absolute;
	top: -80rpx;
	right: -0rpx;
	z-index: 2;
}

.main-img {
	width: 656rpx;
	height: 941rpx;
	border-radius: 20rpx;
	margin-bottom: 46rpx;
}

.title {
	font-size: 28rpx;
	font-weight: bold;
	color: #222;
	margin-bottom: 8rpx;
	text-align: center;
}

.desc {
	font-size: 24rpx;
	color: #222;
	margin-bottom: 4rpx;
	text-align: center;
}

.sub-desc {
	font-size: 20rpx;
	color: #888;
	margin-bottom: 18rpx;
	text-align: center;
}

.btn-row {
	display: flex;
	width: 80%;
	justify-content: space-between;
	margin-top: 12rpx;
}

.share-btn {
	width: 280rpx;
	height: 76rpx;
	background: #fff;
	color: rgba(26, 26, 26, 1);
	font-size: 24rpx;
	border-radius: 76rpx;
	margin-right: 28rpx;
	border: none;
	padding: 14rpx 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.like-btn {
	width: 280rpx;
	height: 76rpx;
	background: transparent;
	color: #fff;
	font-size: 24rpx;
	border-radius: 76rpx;
	border: 1rpx solid #fff;
	display: flex;
	align-items: center;
	gap: 13rpx;
	justify-content: center;
}
</style>