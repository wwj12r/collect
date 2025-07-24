<template>
	<view class="setting-page">
	  <view class="info-list">
		<!-- 头像 -->
		<view class="info-row" @click="changeAvatar">
		  <text class="label">头像</text>
		  <image class="avatar" :src="user.avatar" />
		  <u-icon type="right" size="20" color="#bbb" />
		</view>
		<!-- 用户ID -->
		<view class="info-row">
		  <text class="label">用户ID</text>
		  <text class="value gray">{{ user.id }}</text>
		  <u-icon type="copy" size="18" color="#bbb" @click="copyId" />
		</view>
		<!-- 用户名称 -->
		<view class="info-row">
		  <text class="label">用户名称</text>
		  <text class="value">{{ user.name }}</text>
		  <u-icon type="compose" size="18" color="#bbb" @click="editName" />
		</view>
		<!-- 手机号码 -->
		<view class="info-row">
		  <text class="label">手机号码</text>
		  <text
			class="value orange"
			@click="getPhone"
		  >{{ user.phone ? user.phone : '点击获取手机号' }}</text>
		</view>
	  </view>
	  <!-- 退出按钮 -->
	  <button class="logout-btn" @click="logout">退出</button>
	</view>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const user = ref({
	avatar: 'https://your-image-url/avatar.jpg',
	id: '831024',
	name: 'Momo大锤子',
	phone: ''
  })
  
  function changeAvatar() {
	uni.chooseImage({
	  count: 1,
	  success: res => {
		user.value.avatar = res.tempFilePaths[0]
	  }
	})
  }
  function copyId() {
	uni.setClipboardData({
	  data: user.value.id,
	  success: () => {
		uni.showToast({ title: '已复制', icon: 'none' })
	  }
	})
  }
  function editName() {
	uni.showModal({
	  title: '修改用户名',
	  editable: true,
	  placeholderText: '请输入新用户名',
	  success: res => {
		if (res.confirm && res.content) {
		  user.value.name = res.content
		}
	  }
	})
  }
  function getPhone() {
	if (user.value.phone) return
	// 这里可对接获取手机号的API
	user.value.phone = '138****8888'
	uni.showToast({ title: '获取成功', icon: 'success' })
  }
  function logout() {
	uni.showModal({
	  title: '提示',
	  content: '确定要退出登录吗？',
	  success: res => {
		if (res.confirm) {
		  uni.showToast({ title: '已退出', icon: 'none' })
		  // 这里可清除登录状态并跳转
		}
	  }
	})
  }
  </script>
  
  <style scoped>
  .setting-page {
	background: #f7f7f7;
	min-height: 100vh;
	padding-bottom: 80rpx;
  }
  .info-list {
	background: #fff;
	border-radius: 18rpx;
	margin: 24rpx 18rpx 0 18rpx;
	overflow: hidden;
  }
  .info-row {
	display: flex;
	align-items: center;
	padding: 0 24rpx;
	height: 80rpx;
	border-bottom: 1rpx solid #f2f2f2;
	position: relative;
  }
  .info-row:last-child {
	border-bottom: none;
  }
  .label {
	font-size: 22rpx;
	color: #222;
	width: 160rpx;
	flex-shrink: 0;
  }
  .value {
	font-size: 22rpx;
	color: #222;
	flex: 1;
  }
  .gray {
	color: #bbb;
  }
  .orange {
	color: #ff6600;
  }
  .avatar {
	width: 48rpx;
	height: 48rpx;
	border-radius: 50%;
	margin-right: 8rpx;
  }
  .logout-btn {
	width: 80%;
	background: #222;
	color: #fff;
	font-size: 30rpx;
	border-radius: 40rpx;
	padding: 18rpx 0;
	font-weight: bold;
	position: fixed;
	left: 10%;
	bottom: 40rpx;
	z-index: 10;
  }
  </style>