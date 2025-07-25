<template>
	<view v-if="show" class="popup-mask" @click.self="close">
	  <view class="preview-popup">
		<u-icon type="closeempty" size="32" color="#888" class="close-btn" @click="close" />
		<image class="main-img" :src="imgUrl" mode="widthFix" />
		<view class="title">{{ title }}</view>
		<view class="desc">{{ desc }}</view>
		<view class="sub-desc">{{ subDesc }}</view>
		<view class="btn-row">
		  <button class="share-btn" @click="onShare">分享</button>
		  <button class="like-btn" @click="onLike">
			<u-icon type="hand-up" size="22" color="#fff" style="margin-right:8rpx;" />
			点赞
		  </button>
		</view>
	  </view>
	</view>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
	show: Boolean,
	imgUrl: String,
	title: {
	  type: String,
	  default: 'Be Water My friend'
	},
	desc: {
	  type: String,
	  default: ''
	},
	subDesc: {
	  type: String,
	  default: "If you love life, don't waste time, for time is what life is made up of."
	}
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
  
  <style scoped>
  .popup-mask {
	position: fixed;
	left: 0; top: 0; right: 0; bottom: 0;
	background: rgba(0,0,0,0.55);
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
  }
  .preview-popup {
	background: #fff;
	border-radius: 24rpx;
	width: 88vw;
	max-width: 480rpx;
	padding: 32rpx 0 24rpx 0;
	box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.10);
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
  }
  .close-btn {
	position: absolute;
	right: 24rpx;
	top: 24rpx;
	z-index: 2;
  }
  .main-img {
	width: 80%;
	border-radius: 12rpx;
	margin-bottom: 18rpx;
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
	flex: 1;
	background: #f7f7f7;
	color: #222;
	font-size: 24rpx;
	border-radius: 32rpx;
	margin-right: 12rpx;
	border: none;
	padding: 14rpx 0;
  }
  .like-btn {
	flex: 1;
	background: #222;
	color: #fff;
	font-size: 24rpx;
	border-radius: 32rpx;
	border: none;
	padding: 14rpx 0;
	display: flex;
	align-items: center;
	justify-content: center;
  }
  </style>