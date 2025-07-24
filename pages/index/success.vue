<template>
	<view class="success-page">
	  <image class="ok-img" src="https://your-image-url/ok.png" mode="widthFix" />
	  <view class="main-text">信息提交成功</view>
	  <view class="sub-text">等待审核</view>
	  <button class="notify-btn" @click="notifyMe">审核后通知我</button>
	</view>
  </template>
  
  <script setup>
  function notifyMe() {
	uni.showToast({ title: '已订阅通知', icon: 'success' })
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
	padding-top: 80rpx;
  }
  .ok-img {
	width: 180rpx;
	margin-bottom: 32rpx;
  }
  .main-text {
	font-size: 32rpx;
	font-weight: bold;
	color: #222;
	margin-bottom: 12rpx;
	text-align: center;
  }
  .sub-text {
	font-size: 24rpx;
	color: #bbb;
	margin-bottom: 48rpx;
	text-align: center;
  }
  .notify-btn {
	width: 60%;
	background: #222;
	color: #fff;
	font-size: 28rpx;
	border-radius: 40rpx;
	padding: 18rpx 0;
	font-weight: bold;
	margin-top: 24rpx;
  }
  </style>