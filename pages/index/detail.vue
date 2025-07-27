<template>
	<view class="detail-page">
		<!-- 活动主图 -->
		<image class="banner" src="https://your-image-url/banner.jpg" mode="widthFix" />

		<!-- 活动标题 -->
		<view class="title">东山口套色章上线</view>
		<view class="subtitle">东山口·扶光书店 × 幸运无限</view>

		<!-- 活动主图下方图片 -->
		<image class="main-img" src="https://your-image-url/main.jpg" mode="widthFix" />

		<!-- 活动信息 -->
		<view class="info-card">
			<view class="tag">报名中</view>
			<view class="event-title">广州东山口第一届集章大会，8月8日正式启动</view>
		</view>

		<!-- 主办方 -->
		<view class="organizer">
			<image class="avatar" src="https://your-image-url/avatar.jpg" />
			<view class="org-name">Starshine·JS</view>
			<button class="follow-btn">+关注</button>
		</view>

		<!-- 活动详情 -->
		<view class="event-detail">
			<view class="detail-row">
				<text class="label">活动时间</text>
				<text class="value">2025年08月08日 周日 13:00-18:00</text>
			</view>
			<view class="detail-row">
				<text class="label">活动地点</text>
				<text class="value">广州市越秀区文德路西场东街一巷285:05</text>
			</view>
			<view class="detail-row">
				<text class="label">限定人数</text>
				<text class="value">600人</text>
			</view>
			<view class="detail-row">
				<text class="label">嘉宾阵容</text>
				<text class="value">班班邮馆、Brian、小海狸的蓝莓花禾、Raven</text>
			</view>
		</view>

		<!-- 报名条件 -->
		<view class="section">
			<view class="section-title">报名条件</view>
			<view class="section-content">
				需满足条件，报名获取资格码即可
				<button class="copy-btn">复制内容</button>
			</view>
		</view>

		<!-- 集章展示 -->
		<view class="section">
			<view class="section-title">集章展示</view>
			<scroll-view class="stamps" scroll-x>
				<view class="stamp-item" v-for="(img, idx) in stampImgs" :key="idx">
					<image :src="img" mode="aspectFill" />
				</view>
			</scroll-view>
		</view>

		<!-- 活动详情图片 -->
		<view class="section">
			<view class="section-title">活动详情</view>
			<image class="detail-img" src="https://your-image-url/banner.jpg" mode="widthFix" />
		</view>

		<!-- 报名按钮 -->
		<view class="footer" @click="openPopUp" v-if="authorized">
			<button class="signup-btn">报名（￥99）</button>
		</view>
		<view class="footer" v-else>
			<button class="signup-btn" open-type="getUserInfo" @getuserinfo="getAuthorize">
				报名（￥99）
			</button>
		</view>
	</view>
	<!-- 报名弹窗 -->
	<u-popup :show="showPopup" @close="showPopup = false" @open="showPopup = true" :mask-click="false">
		<view class="popup-content">
			<view class="popup-title">
				提交报名信息
				<!-- <u-icons type="closeempty" size="24" class="close-btn" @click="hidePopup" /> -->
			</view>
			<view class="popup-desc">平台将会保护你的个人隐私，当前信息方便组织方联系你</view>
			<view class="section-title">报名条件</view>
			<view class="requirement-row">
				<text>发布一篇活动介绍到小红书</text>
				<button class="copy-btn" @click="copyContent">复制内容</button>
			</view>
			<view class="upload-area">
				<view class="upload-box" @click="chooseImage">
					<image v-if="imgUrl" :src="imgUrl" class="upload-img" />
					<view v-else class="plus">+</view>
				</view>
				<view class="upload-tip">请上传已完成报名条件的截图</view>
			</view>
			<button class="submit-btn" :disabled="!imgUrl" @click="submit">提交</button>
		</view>
	</u-popup>

</template>
<script setup>
import { ref, onMounted } from 'vue'
import { IndexApi } from '../../services'

onMounted(() => {
	// fetchData()
})
const loading = ref(false)

// const fetchData = () => {
// 	loading.value = true
// 	uni.login({
// 		provider: 'weixin',
// 		success: (res) => {
// 			const code = res.code
// 			console.log('微信登录 code：', code)
// 			IndexApi.postLogin({ code })
// 		},
// 		fail: (err) => {
// 			console.error('微信登录失败', err)
// 		}
// 	})
// }

const popupRef = ref(null)
const imgUrl = ref('')
const showPopup = ref(false)
const authorized = ref(uni.getStorageSync('token'))

const hidePopup = () => {
	popupRef.value.close()
}

const copyContent = () => {
	uni.setClipboardData({
		data: '发布一篇活动介绍到小红书',
		success: () => {
			uni.showToast({ title: '已复制', icon: 'none' })
		}
	})
}

const chooseImage = () => {
	uni.chooseImage({
		count: 1,
		success: (res) => {
			imgUrl.value = res.tempFilePaths[0]
		}
	})
}

const getAuthorize = () => {
	uni.getSetting({
		success: res => {
			uni.showLoading({ title: '正在登录' })
			if (res.authSetting['scope.userInfo']) {
				login()
			} else {
				uni.authorize({
					scope: 'scope.userInfo',
					success: res => {
						console.log(res)
						login()
					},
					fail: err => {
						console.log(err)
						uni.hideLoading()
					}
				})
			}
		}
	})
}
const login = () => {
	uni.login({
		provider: 'weixin',
		success: res => {
			getUserInfo(res.code)
		},
		fail: err => {
			console.log(err)
			uni.hideLoading()
		}
	})
}
const getUserInfo = (code) => {
	uni.getUserInfo({
		provider: 'weixin',
		withCredentials: true,
		success: res => {
			console.log(code, JSON.stringify(res))
			getToken(code, res)
		},
		fail: err => {
			console.log(err)
			uni.hideLoading()
		},
	})
}
const getToken = (code, userInfo) => {
	IndexApi.postLogin({ code, userInfo: JSON.stringify(userInfo) }).then(res => {
		console.log(res)
		uni.setStorageSync('token', res.access_token)
		showPopup.value = true
		uni.hideLoading()
	}).catch(rej => {
		uni.hideLoading()
	})
}
const submit = () => {
	uni.showToast({ title: '提交成功', icon: 'success' })
	hidePopup()
}

const openPopUp = () => {
	// 微信登录逻辑（建议封装再开启）
	if (!uni.getStorageSync('token')) {
		uni.navigateTo({ url: '/pages/login/index' })
	} else {
		showPopup.value = true
	}
}

const stampImgs = [
	'https://your-image-url/stamp1.jpg',
	'https://your-image-url/stamp2.jpg',
	'https://your-image-url/stamp3.jpg'
]
</script>


<style scoped>
.signup-btn {
	width: 90%;
	background: #222;
	color: #fff;
	font-size: 32rpx;
	border-radius: 50rpx;
	padding: 20rpx 0;
	font-weight: bold;
	margin: 40rpx auto;
	display: block;
}

.popup-content {
	background: #fff;
	border-radius: 24rpx 24rpx 0 0;
	padding: 32rpx 24rpx 24rpx 24rpx;
	min-height: 600rpx;
	position: relative;
}

.popup-title {
	font-size: 32rpx;
	font-weight: bold;
	text-align: center;
	margin-bottom: 12rpx;
	position: relative;
}

.close-btn {
	position: absolute;
	right: 0;
	top: 0;
}

.popup-desc {
	font-size: 22rpx;
	color: #888;
	text-align: center;
	margin-bottom: 24rpx;
}

.section-title {
	font-size: 26rpx;
	font-weight: bold;
	margin-bottom: 12rpx;
}

.requirement-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #f7f7f7;
	border-radius: 12rpx;
	padding: 16rpx;
	margin-bottom: 18rpx;
}

.copy-btn {
	font-size: 22rpx;
	background: #eee;
	color: #333;
	border-radius: 8rpx;
	padding: 4rpx 16rpx;
}

.upload-area {
	display: flex;
	align-items: center;
	margin-bottom: 18rpx;
}

.upload-box {
	width: 120rpx;
	height: 120rpx;
	background: #f2f2f2;
	border-radius: 12rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 18rpx;
	overflow: hidden;
	position: relative;
}

.upload-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.plus {
	font-size: 48rpx;
	color: #bbb;
}

.upload-tip {
	font-size: 22rpx;
	color: #888;
}

.submit-btn {
	width: 100%;
	background: #222;
	color: #fff;
	font-size: 28rpx;
	border-radius: 50rpx;
	padding: 18rpx 0;
	font-weight: bold;
	margin-top: 24rpx;
	opacity: 1;
}

.submit-btn:disabled {
	background: #ccc;
	color: #fff;
	opacity: 0.7;
}

.detail-page {
	background: #f7f7f7;
	min-height: 100vh;
	padding-bottom: 120rpx;
}

.banner {
	width: 100%;
	display: block;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	text-align: center;
	margin: 20rpx 0 0 0;
}

.subtitle {
	font-size: 24rpx;
	color: #3b6eea;
	text-align: center;
	margin-bottom: 20rpx;
}

.main-img {
	width: 100%;
	margin-bottom: 20rpx;
}

.info-card {
	background: #fff;
	margin: 20rpx;
	border-radius: 16rpx;
	padding: 20rpx;
	display: flex;
	align-items: center;
}

.tag {
	background: #ff5a1f;
	color: #fff;
	border-radius: 8rpx;
	padding: 4rpx 16rpx;
	font-size: 22rpx;
	margin-right: 16rpx;
}

.event-title {
	font-size: 28rpx;
	font-weight: bold;
}

.organizer {
	display: flex;
	align-items: center;
	margin: 0 20rpx 20rpx 20rpx;
}

.avatar {
	width: 48rpx;
	height: 48rpx;
	border-radius: 50%;
	margin-right: 12rpx;
}

.org-name {
	font-size: 24rpx;
	margin-right: 12rpx;
}

.follow-btn {
	font-size: 22rpx;
	background: #3b6eea;
	color: #fff;
	border-radius: 8rpx;
	padding: 4rpx 16rpx;
}

.event-detail {
	background: #fff;
	margin: 0 20rpx 20rpx 20rpx;
	border-radius: 16rpx;
	padding: 20rpx;
}

.detail-row {
	display: flex;
	align-items: center;
	margin-bottom: 12rpx;
}

.label {
	width: 140rpx;
	color: #888;
	font-size: 22rpx;
}

.value {
	font-size: 24rpx;
	color: #333;
}

.section {
	background: #fff;
	margin: 0 20rpx 20rpx 20rpx;
	border-radius: 16rpx;
	padding: 20rpx;
}

.section-title {
	font-size: 26rpx;
	font-weight: bold;
	margin-bottom: 12rpx;
	display: flex;
	align-items: center;
}

.section-content {
	font-size: 22rpx;
	color: #666;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.copy-btn {
	font-size: 22rpx;
	background: #eee;
	color: #333;
	border-radius: 8rpx;
	padding: 4rpx 16rpx;
	margin-left: 20rpx;
}

.stamps {
	display: flex;
	flex-direction: row;
	overflow-x: auto;
	margin-top: 10rpx;
}

.stamp-item {
	width: 180rpx;
	height: 240rpx;
	margin-right: 16rpx;
	border-radius: 12rpx;
	overflow: hidden;
	background: #f2f2f2;
	flex-shrink: 0;
}

.stamp-item image {
	width: 100%;
	height: 100%;
	display: block;
}

.detail-img {
	width: 100%;
	margin-top: 10rpx;
	border-radius: 12rpx;
}

.footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	background: #fff;
	padding: 20rpx 0;
	box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.05);
	display: flex;
	justify-content: center;
}

.signup-btn {
	width: 90%;
	background: #222;
	color: #fff;
	font-size: 32rpx;
	border-radius: 50rpx;
	padding: 20rpx 0;
	font-weight: bold;
}
</style>