<template>
	<view class="discover-page">
	  <!-- 顶部搜索栏 -->
	  <view class="search-bar">
		<input class="search-input" v-model="searchText" placeholder="广东盖帮之深圳集章大会预告" />
		<button class="search-btn" @click="onSearch">搜索</button>
		<view class="search-icons">
		  <uni-icons type="more-filled" size="28" color="#333" />
		</view>
	  </view>
  
	  <!-- 印章分类 -->
	  <view class="category-bar">
		<view
		  v-for="(cat, idx) in categories"
		  :key="cat"
		  :class="['category-item', { active: idx === activeCategory }]"
		  @click="activeCategory = idx"
		>
		  {{ cat }}
		</view>
	  </view>
  
	  <!-- 优质印章横滑 -->
	  <view class="section-title">优质印章</view>
	  <scroll-view class="stamp-scroll" scroll-x>
		<view class="stamp-card" v-for="(stamp, idx) in stamps" :key="idx">
		  <image :src="stamp.img" class="stamp-img" mode="aspectFill" />
		  <view class="stamp-name">{{ stamp.name }}</view>
		</view>
	  </scroll-view>
  
	  <!-- 热门创意话题 -->
	  <view class="section-title">热门创意话题</view>
	  <view class="topic-list">
		<view class="topic-card" v-for="(topic, idx) in topics" :key="idx">
		  <image :src="topic.img" class="topic-img" mode="aspectFill" />
		  <view class="topic-desc">{{ topic.desc }}</view>
		  <view class="topic-footer">
			<view class="topic-user">
			  <image :src="topic.avatar" class="user-avatar" />
			  <text class="user-name">{{ topic.user }}</text>
			</view>
			<view class="topic-stats">
			  <uni-icons type="heart" size="20" color="#f56c6c" />
			  <text class="stat">{{ topic.likes }}</text>
			</view>
		  </view>
		</view>
	  </view>
  
	  <!-- 悬浮发布按钮 -->
	  <button class="fab" @click="onPublish">
		<uni-icons type="plusempty" size="32" color="#fff" />
	  </button>
	</view>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const searchText = ref('')
  const categories = ['热门', '覆卤', '覆新']
  const activeCategory = ref(0)
  
  const stamps = [
	{ img: 'https://your-image-url/shanghai.jpg', name: '上海' },
	{ img: 'https://your-image-url/suzhou.jpg', name: '苏州' },
	{ img: 'https://your-image-url/guangzhou.jpg', name: '广州' }
  ]
  
  const topics = [
	{
	  img: 'https://your-image-url/topic1.jpg',
	  desc: '活里面的印章数量是我见过最多的，而且都很好看！喜欢...',
	  avatar: 'https://your-image-url/avatar1.jpg',
	  user: '酸辣贩奶',
	  likes: 32917
	},
	{
	  img: 'https://your-image-url/topic2.jpg',
	  desc: '来了南京的印章来了，可单色可套色，明天再整一下套色...',
	  avatar: 'https://your-image-url/avatar2.jpg',
	  user: 'Doi比企谷',
	  likes: 51082
	},
	{
	  img: 'https://your-image-url/topic3.jpg',
	  desc: '',
	  avatar: 'https://your-image-url/avatar3.jpg',
	  user: '',
	  likes: 0
	},
	{
	  img: 'https://your-image-url/topic4.jpg',
	  desc: '',
	  avatar: 'https://your-image-url/avatar4.jpg',
	  user: '',
	  likes: 0
	}
  ]
  
  function onSearch() {
	uni.showToast({ title: '搜索: ' + searchText.value, icon: 'none' })
  }
  function onPublish() {
	uni.showToast({ title: '发布', icon: 'none' })
  }
  </script>
  
  <style scoped>
  .discover-page {
	background: #f7f7f7;
	min-height: 100vh;
	padding-bottom: 80rpx;
  }
  .search-bar {
	display: flex;
	align-items: center;
	padding: 24rpx 20rpx 0 20rpx;
	background: #fff;
  }
  .search-input {
	flex: 1;
	height: 60rpx;
	border-radius: 30rpx;
	background: #f2f2f2;
	border: none;
	padding: 0 24rpx;
	font-size: 26rpx;
	margin-right: 12rpx;
  }
  .search-btn {
	background: #222;
	color: #fff;
	border-radius: 30rpx;
	font-size: 26rpx;
	padding: 0 32rpx;
	height: 60rpx;
	margin-right: 12rpx;
  }
  .search-icons {
	display: flex;
	align-items: center;
  }
  .category-bar {
	display: flex;
	background: #fff;
	padding: 0 20rpx;
	margin-bottom: 10rpx;
  }
  .category-item {
	font-size: 26rpx;
	color: #888;
	margin-right: 32rpx;
	padding: 18rpx 0;
	border-bottom: 4rpx solid transparent;
  }
  .category-item.active {
	color: #222;
	font-weight: bold;
	border-bottom: 4rpx solid #222;
  }
  .section-title {
	font-size: 28rpx;
	font-weight: bold;
	margin: 24rpx 0 12rpx 20rpx;
  }
  .stamp-scroll {
	display: flex;
	flex-direction: row;
	padding-left: 20rpx;
	margin-bottom: 18rpx;
  }
  .stamp-card {
	width: 180rpx;
	margin-right: 18rpx;
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	border: 2rpx dashed #ccc;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 10rpx;
  }
  .stamp-img {
	width: 180rpx;
	height: 180rpx;
	object-fit: cover;
  }
  .stamp-name {
	font-size: 22rpx;
	color: #222;
	margin-top: 8rpx;
	text-align: center;
  }
  .topic-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 20rpx;
  }
  .topic-card {
	width: 48%;
	background: #fff;
	border-radius: 16rpx;
	margin-bottom: 18rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
	display: flex;
	flex-direction: column;
  }
  .topic-img {
	width: 100%;
	height: 180rpx;
	object-fit: cover;
  }
  .topic-desc {
	font-size: 22rpx;
	color: #333;
	margin: 10rpx 12rpx 0 12rpx;
	min-height: 48rpx;
  }
  .topic-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10rpx 12rpx 12rpx 12rpx;
  }
  .topic-user {
	display: flex;
	align-items: center;
  }
  .user-avatar {
	width: 32rpx;
	height: 32rpx;
	border-radius: 50%;
	margin-right: 8rpx;
  }
  .user-name {
	font-size: 20rpx;
	color: #888;
  }
  .topic-stats {
	display: flex;
	align-items: center;
	color: #f56c6c;
	font-size: 20rpx;
  }
  .stat {
	margin-left: 4rpx;
  }
  .fab {
	position: fixed;
	right: 40rpx;
	bottom: 60rpx;
	width: 88rpx;
	height: 88rpx;
	background: #ff6600;
	border-radius: 50%;
	box-shadow: 0 4rpx 16rpx rgba(255,102,0,0.18);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
	border: none;
	padding: 0;
  }
  </style>