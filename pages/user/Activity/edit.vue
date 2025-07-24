<template>
	<view class="edit-page">
	  <!-- 活动主图 -->
	  <view class="section">
		<view class="section-title">
		  <u-icon type="email" size="22" color="#222" />
		  <text>活动主图</text>
		</view>
		<view class="img-list">
		  <view
			v-for="(img, idx) in mainImages"
			:key="idx"
			class="img-box"
		  >
			<image :src="img" class="img" mode="aspectFill" />
		  </view>
		  <view class="img-box add" @click="chooseMainImage">
			<u-icon type="plusempty" size="32" color="#bbb" />
		  </view>
		</view>
	  </view>
  
	  <!-- 集章展示 -->
	  <view class="section">
		<view class="section-title">
		  <u-icon type="medal" size="22" color="#222" />
		  <text>集章展示</text>
		</view>
		<view class="img-list">
		  <view
			v-for="(img, idx) in stampImages"
			:key="idx"
			class="img-box"
		  >
			<image :src="img" class="img" mode="aspectFill" />
		  </view>
		  <view class="img-box add" @click="chooseStampImage">
			<u-icon type="plusempty" size="32" color="#bbb" />
		  </view>
		</view>
	  </view>
  
	  <!-- 活动介绍 -->
	  <view class="section">
		<view class="section-title">
		  <u-icon type="compose" size="22" color="#222" />
		  <text>活动介绍</text>
		</view>
		<textarea
		  class="textarea"
		  v-model="intro"
		  placeholder="输入正文"
		  maxlength="500"
		  auto-height
		/>
	  </view>
  
	  <!-- 活动详情 -->
	  <view class="section">
		<view class="section-title">
		  <u-icon type="chat" size="22" color="#222" />
		  <text>活动详情</text>
		</view>
		<view class="img-list">
		  <view
			v-for="(img, idx) in detailImages"
			:key="idx"
			class="img-box"
		  >
			<image :src="img" class="img" mode="aspectFill" />
		  </view>
		  <view class="img-box add" @click="chooseDetailImage">
			<u-icon type="plusempty" size="32" color="#bbb" />
		  </view>
		</view>
	  </view>
  
	  <!-- 保存按钮 -->
	  <button class="save-btn" @click="save">保存</button>
	</view>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const mainImages = ref([
	'https://your-image-url/main1.jpg',
	'https://your-image-url/main2.jpg'
  ])
  const stampImages = ref([
	'https://your-image-url/stamp1.jpg',
	'https://your-image-url/stamp2.jpg',
	'https://your-image-url/stamp3.jpg'
  ])
  const detailImages = ref([
	'https://your-image-url/detail1.jpg'
  ])
  const intro = ref('')
  
  function chooseMainImage() {
	uni.chooseImage({
	  count: 1,
	  success: res => {
		mainImages.value.push(res.tempFilePaths[0])
	  }
	})
  }
  function chooseStampImage() {
	uni.chooseImage({
	  count: 1,
	  success: res => {
		stampImages.value.push(res.tempFilePaths[0])
	  }
	})
  }
  function chooseDetailImage() {
	uni.chooseImage({
	  count: 1,
	  success: res => {
		detailImages.value.push(res.tempFilePaths[0])
	  }
	})
  }
  function save() {
	uni.showToast({ title: '保存成功', icon: 'success' })
	// 这里可对接后端API
  }
  </script>
  
  <style scoped>
  .edit-page {
	background: #f7f7f7;
	min-height: 100vh;
	padding-bottom: 80rpx;
  }
  .section {
	background: #fff;
	border-radius: 18rpx;
	margin: 24rpx 18rpx 0 18rpx;
	padding: 18rpx 0 0 0;
  }
  .section-title {
	font-size: 24rpx;
	font-weight: bold;
	display: flex;
	align-items: center;
	margin-bottom: 12rpx;
	padding-left: 24rpx;
  }
  .section-title uni-icons {
	margin-right: 8rpx;
  }
  .img-list {
	display: flex;
	align-items: center;
	padding: 0 24rpx 18rpx 24rpx;
  }
  .img-box {
	width: 100rpx;
	height: 100rpx;
	border-radius: 12rpx;
	background: #f2f2f2;
	margin-right: 16rpx;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
  }
  .img-box.add {
	border: 2rpx dashed #bbb;
	background: #fafafa;
  }
  .img {
	width: 100%;
	height: 100%;
	object-fit: cover;
  }
  .textarea {
	width: 92%;
	min-height: 100rpx;
	font-size: 22rpx;
	color: #333;
	background: #f7f7f7;
	border-radius: 8rpx;
	padding: 12rpx 16rpx;
	margin: 0 4% 18rpx 4%;
	border: none;
  }
  .save-btn {
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