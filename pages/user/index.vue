<template>
	<view class="mine-page">
		<!-- 头部用户信息 -->
		<view class="user-info">
			<image class="avatar" src="https://your-image-url/avatar.jpg" />
			<view class="user-name">Momo大锤子</view>
			<view class="setting" @click="goSetting">
				<image src="/static/user/setting.png"></image>
				<text class="setting-text">设置</text>
			</view>
		</view>

		<view class="section-title">我的活动</view>
		<!-- 我的活动 -->
		<view class="section">
			<view class="activity-list">
				<view class="activity-item" v-for="item in activities" :key="item.text" @click="onActivityClick(item)">
					<image :src="'/static/user/' + item.icon + '.png'"></image>
					<text class="activity-text">{{ item.text }}</text>
					<button class="signup-btn" open-type="getUserInfo" @getuserinfo="getAuth(item)" v-if="!authorized"></button>
				</view>
			</view>
		</view>

		<view class="section-title">活动工具</view>
		<!-- 活动工具 -->
		<view class="section">
			<view class="tool-list">
				<view class="tool-item" v-for="item in tools" :key="item.text" @click="onActivityClick(item)">
					<image :src="'/static/user/' + item.icon + '.png'"></image>
					<text class="tool-text">{{ item.text }}</text>
					<button class="signup-btn" open-type="getUserInfo" @getuserinfo="getAuth(item)" v-if="!authorized"></button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuthorize } from '../../utils/utils'
const authorized = ref(uni.getStorageSync('token'))
const activities = [
	{ icon: 'all', text: '全部', link: '/pages/user/Activity/index?type=1,2,3,4' },
	{ icon: 'audit', text: '待审核', link: '/pages/user/Activity/index?type=1' },
	{ icon: 'use', text: '待核销', link: '/pages/user/Activity/index?type=2' },
	{ icon: 'done', text: '已完成', link: '/pages/user/Activity/index?type=4' }
]
const tools = [
	{ icon: 'publish', text: '发布活动', link: '/pages/user/Activity/publish' },
	{ icon: 'manage', text: '活动管理', link: '/pages/user/Activity/manage' },
	{ icon: 'scan', text: '扫码核销', link: '/pages/user/scan' },
	{ icon: 'print', text: '发布印章', link: '/pages/user/Print/index' }
]
const goSetting = () => {
	// 跳转到设置页
	uni.navigateTo({ url: '/pages/user/setting' })
}
const onActivityClick = (item) => {
	// 处理活动点击
	console.log(authorized.value)
	if (!authorized.value) return
	uni.navigateTo({ url: item.link })
}

const getAuth = (item) => {
	getAuthorize().then(res => uni.navigateTo({ url: item.link }))
}
</script>

<style scoped lang="scss">
.mine-page {
	background: #f7f7f7;
	min-height: 100vh;
}

.user-info {
	display: flex;
	align-items: center;
	padding: 40rpx 30rpx 20rpx 30rpx;
	border-radius: 0 0 24rpx 24rpx;
	position: relative;
}

.avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	margin-right: 24rpx;
	border: 2rpx solid #eee;
}

.user-name {
	font-size: 32rpx;
	font-weight: bold;
	flex: 1;
}

.setting {
	display: flex;
	align-items: center;
	flex-direction: column;
	position: absolute;
	right: 30rpx;
	top: 50%;
	gap: 12rpx;
	transform: translateY(-50%);

	image {
		width: 40rpx;
		height: 40rpx;
		object-fit: contain;
	}
}

.setting-text {
	font-size: 22rpx;
	margin-left: 6rpx;
	color: #888;
}

.section {
	margin: 20rpx 20rpx 0 20rpx;
	background: #fff;
	border-radius: 20rpx;
	padding: 24rpx 0 10rpx 0;
	position: relative;

	image {
		width: 40rpx;
		height: 40rpx;
		object-fit: contain;
	}

	.signup-btn {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
}

.section-title {
	font-size: 26rpx;
	font-weight: bold;
	margin-left: 32rpx;
	margin-top: 18rpx;
}

.activity-list,
.tool-list {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding-bottom: 10rpx;
}

.activity-item,
.tool-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	position: relative;
}

.activity-text,
.tool-text {
	font-size: 22rpx;
	color: #222;
	margin-top: 8rpx;
}
</style>
