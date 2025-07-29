<template>
	<view class="verify-page">
	  <view class="info-card">
		<view class="info-row">
		  <text class="label">订单编号：</text>
		  <text class="value">{{ orderSn }}</text>
		</view>
		<view class="info-row">
		  <text class="label">报名人：</text>
		  <text class="value">{{ userName }}</text>
		</view>
	  </view>
	  <button class="verify-btn" @click="scanCode">核销</button>
	</view>
  </template>
  
  <script setup>
  import { ref } from 'vue'
import { ActivityApi } from '../../services/activity'
  
  // 这里可以通过路由参数或接口获取实际数据
  const orderSn = ref('44123458545695210087')
  const userName = ref('Momo大锤子')
  
  function scanCode() {
	uni.scanCode({
	  onlyFromCamera: true,
	  success: (res) => {
		// 这里可以处理扫码结果 res.result
		console.log('扫码结果:', res)
		ActivityApi.getQrcodeConfirm(res).then(res => {
			uni.showToast({ title: '核销成功', icon: 'success' })
		})
	  },
	  fail: (err) => {
		uni.showToast({ title: '扫码失败', icon: 'none' })
	  }
	})
  }
  </script>
  
  <style scoped>
  .verify-page {
	min-height: 100vh;
	background: #f7f7f7;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 80rpx;
  }
  .info-card {
	background: #fff;
	border-radius: 18rpx;
	width: 90vw;
	max-width: 600rpx;
	padding: 40rpx 30rpx 30rpx 30rpx;
	margin-bottom: 80rpx;
	box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);
  }
  .info-row {
	display: flex;
	align-items: center;
	margin-bottom: 24rpx;
  }
  .label {
	color: #888;
	font-size: 26rpx;
	width: 160rpx;
	flex-shrink: 0;
  }
  .value {
	color: #222;
	font-size: 26rpx;
	word-break: break-all;
  }
  .verify-btn {
	width: 80vw;
	max-width: 400rpx;
	background: #222;
	color: #fff;
	font-size: 32rpx;
	border-radius: 50rpx;
	padding: 22rpx 0;
	font-weight: bold;
	margin-top: 40rpx;
  }
  </style>