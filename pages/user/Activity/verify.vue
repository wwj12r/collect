<template>
	<PageScaffold>
		<!-- 顶部状态 -->
		<view class="status-bar">
			<image src="/static/user/activity-position.png" mode="aspectFit" class="w-4 h-4"  />
			<text class="status-text">待现场使用</text>
		</view>
		<view class="tip-time">请在{{ activity.endTime }} 前到现场使用</view>

		<!-- 活动信息卡片 -->
		<view class="ticket-card">
			<view class="flex items-start flex-row gap-4 p-4 pb-0">
				<image class="w-[200rpx] h-[200rpx]" v-if="getPhotoFromStringSlice(activity.photo)" :src="getPhotoFromStringSlice(activity.photo)"  mode="aspectFill" />
				<view class="pt-4 font-bold">{{ activity?.title }}, {{ activity?.startTime }}, 正式启动</view>
			</view>

			<view class="relative my-4 h-6">
				<view class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-0 w-6 h-6 rounded-full bg-branding-light-grey" />
				<view class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-0 border-t-2 border-dashed border-branding-light-grey" />
				<view class="absolute top-1/2 translate-x-1/2 -translate-y-1/2 right-0 w-6 h-6 rounded-full bg-branding-light-grey" />
			</view>

			<view class="qrcode-area">
				<image class="qrcode-img" v-if="qrcodeUrl" :src="prefillImageUrl(qrcodeUrl)" mode="aspectFit" @click="showPopup = true" />
				<view class="qrcode-tip">请出示活动凭证</view>
			</view>
			<view class="flex justify-center items-center">
				<view class="event-detail">
					<view class="event-time">
						<u-icon name="clock" size="14" color="#bbb" />
						<text>{{ activity.formatTime }}</text>
					</view>
					<view class="event-address">
						<u-icon name="map" size="14" color="#bbb" />
						<text>{{ activity.address }}</text>
					</view>
			</view>
			</view>

			<!-- 操作按钮 -->
			<view class="flex flex-row justify-around mt-4 mx-4 pt-6 border-t-2 border-dashed border-branding-light-grey">
				<button plain class="!border-none flex flex-col items-center gap-2 text-xs" @click="save">
					<image src="/static/user/qrcode-save.png" mode="aspectFit" class="w-6 h-6" />
					保存到相册
				</button>
				<button plain class="!border-none flex flex-col items-center gap-2 text-xs" open-type="share">
					<image src="/static/user/share-to-group.png" mode="aspectFit" class="w-6 h-6" />
					分享至朋友圈
				</button>
				<button plain class="!border-none flex flex-col items-center gap-2 text-xs" open-type="share">
					<image src="/static/user/share-to-friend.png" mode="aspectFit" class="w-6 h-6" />
					分享至好友
				</button>
			</view>
		</view>

		<!-- 须知说明 -->
		<view class="notice">
			<view>1. 参与活动时，请出示活动凭证二维码；</view>
			<view>2. 二维码有效期为到期前1小时，失效后，请进入【我的订单】查看详情，重新获取或联系客服。</view>
		</view>
	</PageScaffold>
	<!-- 先在<script setup>中引入组件 -->
	<VerifySuccessPopup v-model:show="showPopup" orderNo="44123458545695210087" initiator="Starshine-js" initiatorAvatar="https://your-image-url/avatar.png" @continue="handleContinue" />
</template>

<script setup>
import { ref } from 'vue'
import VerifySuccessPopup from './components/VerifySuccessPopup.vue'
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { ActivityApi } from '../../../services/activity'
import { getPhotoFromStringSlice, prefillImageUrl } from '../../../utils/utils'
import dayjs from 'dayjs'
import PageScaffold from '../../../components/PageScaffold.vue'

const qrcodeUrl = ref('')

const activity = ref({});
onLoad(async (query) => {
	if (!query.id) {
		return
	}
	// 保存活动ID到本地存储，用于分享
	uni.setStorageSync('currentActivityId', query.id)
	
	const res = await ActivityApi.fetchActivityDetail(query.id)
	let formatTime = ''
	const mapDayToChn = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
	if (dayjs(res.content.startTime).isSame(dayjs(res.content.endTime), 'day')) {
		formatTime = dayjs(res.content.startTime).format('MM月DD日') 
			+ mapDayToChn[dayjs(res.content.startTime).day()]
			+ dayjs(res.content.startTime).format('hh:mm')
			+ '~'
			+ dayjs(res.content.endTime).format('hh:mm')
	} else if (dayjs(res.content.startTime).isSame(dayjs(res.content.endTime), 'year')) {
		formatTime = dayjs(res.content.startTime).format('MM月DD日')
			+ dayjs(res.content.startTime).format('hh:mm')
			+ '~'
			+ dayjs(res.content.endTime).format('MM月DD日')
			+ dayjs(res.content.endTime).format('hh:mm')
	} else {
		formatTime = dayjs(res.content.startTime).format('YYYY年MM月DD日')
			+ dayjs(res.content.startTime).format('hh:mm')
			+ '~'
			+ dayjs(res.content.endTime).format('YYYY年MM月DD日')
			+ dayjs(res.content.endTime).format('hh:mm')
	}

	activity.value = {
		id: query.id,
		title: res.content.title,
		address: res.content.address,
		photo: res.content.photo,
		startTime: dayjs(res.content.startTime).format('MM月DD日'),
		endTime: dayjs(res.content.endTime).format('YYYY-MM-DD HH:mm:ss'),
		formatTime: formatTime,
	}
})

onLoad(async (query) => {
	if (!query.id) {
		return
	}
	const res = await ActivityApi.fetchActivityVerifyQrCode(query.id)
	qrcodeUrl.value = res.imgUrl
})

const showPopup = ref(false)

function save() {
	if (!qrcodeUrl.value) {
		uni.showToast({ 
			title: '二维码未加载完成', 
			icon: 'none' 
		})
		return
	}
	
	// 先下载图片到本地临时文件
	uni.downloadFile({
		url: prefillImageUrl(qrcodeUrl.value),
		success: (res) => {
			if (res.statusCode === 200) {
				// 保存图片到相册
				uni.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success: () => {
						uni.showToast({ 
							title: '保存成功', 
							icon: 'success' 
						})
					},
					fail: (err) => {
						console.error('保存失败:', err)
						if (err.errMsg.includes('auth deny')) {
							// 用户拒绝授权，引导用户开启相册权限
							uni.showModal({
								title: '提示',
								content: '需要您授权保存图片到相册，请在设置中开启相册权限',
								confirmText: '去设置',
								success: (modalRes) => {
									if (modalRes.confirm) {
										uni.openSetting({
											success: (settingRes) => {
												console.log('设置页面返回:', settingRes)
											}
										})
									}
								}
							})
						} else {
							uni.showToast({ 
								title: '保存失败，请重试', 
								icon: 'none' 
							})
						}
					}
				})
			} else {
				uni.showToast({ 
					title: '图片下载失败', 
					icon: 'none' 
				})
			}
		},
		fail: (err) => {
			console.error('下载失败:', err)
			uni.showToast({ 
				title: '图片下载失败', 
				icon: 'none' 
			})
		}
	})
}

// 分享给朋友
onShareAppMessage(() => {
	return {
		title: `${activity.value.title || '活动二维码'}`,
		path: `/pages/user/Activity/verify?id=${activity.value.id || ''}`,
		imageUrl: qrcodeUrl.value ? prefillImageUrl(qrcodeUrl.value) : ''
	}
})

// 分享到朋友圈
onShareTimeline(() => {
	return {
		title: `${activity.value.title || '活动二维码'}`,
		query: `id=${activity.value.id || ''}`,
		imageUrl: qrcodeUrl.value ? prefillImageUrl(qrcodeUrl.value) : ''
	}
})

</script>

<style scoped>
.ticket-page {
	background: #f7f7f7;
	min-height: 100vh;
	padding-bottom: 40rpx;
}

.status-bar {
	display: flex;
	align-items: center;
	padding: 32rpx 24rpx 12rpx 24rpx;
}

.status-text {
	font-size: 32rpx;
	font-weight: bold;
	margin-left: 12rpx;
}

.tip-time {
	font-size: 22rpx;
	color: #888;
	margin: 8rpx 0 48rpx 24rpx;
}

.ticket-card {
	background: #fff;
	border-radius: 24rpx;
	margin: 0 18rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
	padding: 0 0 24rpx 0;
	margin-bottom: 18rpx;
}

.event-info {
	display: flex;
	align-items: center;
	padding: 24rpx 24rpx 0 24rpx;
}

.event-img {
	width: 80rpx;
	height: 80rpx;
	border-radius: 12rpx;
	margin-right: 16rpx;
	object-fit: cover;
}

.event-title {
	font-size: 26rpx;
	font-weight: bold;
	color: #222;
	flex: 1;
}

.qrcode-area {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 24rpx 0 0 0;
}

.qrcode-img {
	width: 300rpx;
	height: 300rpx;
	background: #f2f2f2;
	border-radius: 16rpx;
	margin-bottom: 12rpx;
}

.qrcode-tip {
	font-size: 36rpx;
	color: #222;
	font-weight: bold;
	margin-bottom: 8rpx;
}

.event-detail {
	margin-top: 8rpx;
}

.event-time,
.event-address {
	display: flex;
	align-items: center;
	font-size: 22rpx;
	color: #888;
	margin-bottom: 4rpx;
	gap: 10rpx;
}

.event-time u-icon,
.event-address u-icon {
	margin-right: 6rpx;
}


.notice {
	font-size: 24rpx;
	color: #888;
	margin: 32rpx 48rpx 0 48rpx;
	line-height: 1.8;
}
</style>