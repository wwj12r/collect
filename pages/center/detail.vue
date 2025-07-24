<template>
	<view class="idea-detail-page">
	  <!-- 大图展示 -->
	  <view class="img-area">
		<image :src="idea.img" class="main-img" mode="aspectFill" />
		<view class="side-actions">
		  <view class="action-item">
			<u-icon type="hand-up" size="32" color="#fff" />
			<text class="action-text">{{ idea.likes }}</text>
		  </view>
		  <view class="action-item">
			<u-icon type="chat" size="32" color="#fff" />
			<text class="action-text">{{ idea.comments }}</text>
		  </view>
		  <view class="action-item">
			<u-icon type="paperplane" size="32" color="#fff" />
			<text class="action-text">{{ idea.shares }}</text>
		  </view>
		</view>
	  </view>
  
	  <!-- 正文内容 -->
	  <view class="content-area">
		<view class="desc">{{ idea.desc }}</view>
		<view class="extra">{{ idea.extra }}</view>
		<view class="date">{{ idea.date }}</view>
		<view class="more-tip">上滑查看更多</view>
	  </view>
	</view>
  </template>
  
  <script setup>
  
  const idea = {
	img: 'https://your-image-url/idea-detail.jpg',
	likes: '3.2万',
	comments: 7812,
	shares: 3283,
	desc: '店里面的印章数量是我见过最多的，而且都很好看！',
	extra: '印章收集好打卡！南京夫子庙/周末来试试。儿童的印章数量是我见过最多的，而且都很好看！喜欢收藏的姐妹们快来看看~ #盖章 #集章 #集章地图 #文创产品 #文创设计 #推荐 南京夫子庙盖章南京集章 有南京感',
	date: '2025-07-21'
  }
  </script>
  
  <style scoped>
  .idea-detail-page {
	background: #f7f7f7;
	min-height: 100vh;
	padding-bottom: 40rpx;
  }
  .img-area {
	position: relative;
	width: 100%;
	height: 420rpx;
	background: #000;
	border-radius: 18rpx;
	overflow: hidden;
	margin: 18rpx auto 0 auto;
	max-width: 96vw;
  }
  .main-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
  }
  .side-actions {
	position: absolute;
	right: 18rpx;
	top: 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 2;
  }
  .action-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 24rpx;
  }
  .action-text {
	color: #fff;
	font-size: 22rpx;
	margin-top: 4rpx;
	text-shadow: 0 2rpx 8rpx rgba(0,0,0,0.18);
  }
  .content-area {
	background: #fff;
	border-radius: 0 0 18rpx 18rpx;
	margin: 0 auto;
	max-width: 96vw;
	padding: 24rpx 18rpx 18rpx 18rpx;
  }
  .desc {
	font-size: 26rpx;
	color: #222;
	font-weight: bold;
	margin-bottom: 12rpx;
  }
  .extra {
	font-size: 22rpx;
	color: #555;
	margin-bottom: 18rpx;
	line-height: 1.7;
  }
  .date {
	font-size: 20rpx;
	color: #bbb;
	margin-bottom: 8rpx;
  }
  .more-tip {
	text-align: center;
	color: #bbb;
	font-size: 20rpx;
	margin-top: 8rpx;
  }
  </style>