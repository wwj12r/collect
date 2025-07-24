<template>
	<view class="manage-page">
	  <view class="activity-card" v-for="(item, idx) in activities" :key="idx">
		<!-- 顶部信息 -->
		<view class="card-header">
		  <text class="create-time">创建时间：{{ item.createTime }}</text>
		  <text
			class="status"
			:class="{
			  published: item.status === '已发布',
			  unpublished: item.status === '未发布'
			}"
		  >
			{{ item.status }}
		  </text>
		</view>
		<!-- 活动主体 -->
		<view class="card-main">
		  <image :src="item.img" class="card-img" mode="aspectFill" />
		  <view class="card-info">
			<view class="card-title">{{ item.title }}</view>
			<view class="card-detail">
			  <view class="detail-row">
				<text class="label">活动时间：</text>
				<text class="value">{{ item.time }}</text>
			  </view>
			  <view class="detail-row">
				<text class="label">活动地址：</text>
				<text class="value">{{ item.address }}</text>
			  </view>
			</view>
		  </view>
		</view>
		<!-- 活动数据 -->
		<view class="card-stats">
		  <view class="stat">
			<u-icon type="person" size="20" color="#bbb" />
			<text>{{ item.stats.joined }}人报名</text>
		  </view>
		  <view class="stat">
			<u-icon type="heart" size="20" color="#bbb" />
			<text>{{ item.stats.liked }}人点赞</text>
		  </view>
		  <view class="stat">
			<u-icon type="checkbox" size="20" color="#bbb" />
			<text>已核销{{ item.stats.verified }}人</text>
		  </view>
		  <view class="stat">
			<u-icon type="close" size="20" color="#bbb" />
			<text>未核销{{ item.stats.unverified }}人</text>
		  </view>
		</view>
		<!-- 操作按钮 -->
		<view class="card-actions" v-if="item.status === '已发布'">
		  <button class="action-btn" @click="onScan(item)">扫码核销</button>
		  <button class="action-btn" @click="onCode(item)">生成核销码</button>
		  <button class="action-btn" @click="onDown(item)">下架</button>
		</view>
		<view class="card-actions" v-else>
		  <button class="action-btn" @click="onEdit(item)">重新编辑</button>
		  <button class="action-btn primary" @click="onUp(item)">上架</button>
		</view>
	  </view>
	</view>

  </template>
  
  <script setup>
  
  const activities = [
	{
	  createTime: '2025-07-12 11:25',
	  status: '已发布',
	  img: 'https://your-image-url/act1.jpg',
	  title: '见珠水.荔路繁花Hallo Pandas熊猫主题市集',
	  time: '2025-07-30 11:30',
	  address: '广州市越秀区文德路西场东街一巷285:05',
	  stats: {
		joined: 2318,
		liked: 285,
		verified: 245,
		unverified: 25
	  }
	},
	{
	  createTime: '2025-07-12 11:25',
	  status: '未发布',
	  img: 'https://your-image-url/act1.jpg',
	  title: '见珠水.荔路繁花Hallo Pandas熊猫主题市集',
	  time: '2025-07-30 11:30',
	  address: '广州市越秀区文德路西场东街一巷285:05',
	  stats: {
		joined: 2318,
		liked: 285,
		verified: 245,
		unverified: 25
	  }
	},
	{
	  createTime: '2025-07-12 11:25',
	  status: '已发布',
	  img: 'https://your-image-url/act1.jpg',
	  title: '见珠水.荔路繁花Hallo Pandas熊猫主题市集',
	  time: '2025-07-30 11:30',
	  address: '广州市越秀区文德路西场东街一巷285:05',
	  stats: {
		joined: 2318,
		liked: 285,
		verified: 245,
		unverified: 25
	  }
	}
  ]
  
  function onScan(item) {
	uni.navigateTo({ url: '/pages/user/Activity/verify' })
  }
  function onCode(item) {
	uni.showToast({ title: '生成核销码', icon: 'none' })
  }
  function onDown(item) {
	uni.showToast({ title: '下架', icon: 'none' })
  }
  function onEdit(item) {
	uni.showToast({ title: '重新编辑', icon: 'none' })
  }
  function onUp(item) {
	uni.showToast({ title: '上架', icon: 'none' })
  }
  </script>
  
  <style scoped>
  .manage-page {
	background: #f7f7f7;
	min-height: 100vh;
	padding: 20rpx 0 40rpx 0;
  }
  .activity-card {
	background: #fff;
	border-radius: 18rpx;
	margin: 0 16rpx 18rpx 16rpx;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
	padding: 0 0 18rpx 0;
  }
  .card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 22rpx;
	color: #aaa;
	padding: 18rpx 18rpx 0 18rpx;
  }
  .status {
	font-size: 22rpx;
	font-weight: bold;
  }
  .status.published {
	color: #bbb;
  }
  .status.unpublished {
	color: #ff6600;
  }
  .card-main {
	display: flex;
	align-items: flex-start;
	padding: 10rpx 18rpx 0 18rpx;
  }
  .card-img {
	width: 120rpx;
	height: 90rpx;
	border-radius: 12rpx;
	margin-right: 16rpx;
	object-fit: cover;
	flex-shrink: 0;
  }
  .card-info {
	flex: 1;
	display: flex;
	flex-direction: column;
  }
  .card-title {
	font-size: 26rpx;
	font-weight: bold;
	color: #222;
	margin-bottom: 8rpx;
  }
  .card-detail {
	font-size: 20rpx;
	color: #666;
  }
  .detail-row {
	margin-bottom: 2rpx;
  }
  .label {
	color: #888;
  }
  .value {
	color: #333;
  }
  .card-stats {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding: 10rpx 18rpx 0 18rpx;
	font-size: 20rpx;
	color: #bbb;
  }
  .stat {
	display: flex;
	align-items: center;
	margin-right: 24rpx;
  }
  .stat text {
	margin-left: 4rpx;
  }
  .card-actions {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 16rpx 18rpx 0 18rpx;
  }
  .action-btn {
	font-size: 22rpx;
	border-radius: 20rpx;
	padding: 0 24rpx;
	height: 44rpx;
	line-height: 44rpx;
	border: 2rpx solid #bbb;
	color: #222;
	background: #f7f7f7;
	margin-right: 18rpx;
  }
  .action-btn.primary {
	background: #222;
	color: #fff;
	border: none;
  }
  </style>