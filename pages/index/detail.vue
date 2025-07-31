<template>
	<view class="detail-page">
		<!-- 活动主图 -->
		<u-swiper v-if="detail.content?.photo?.split(',')?.length" :list="detail.content?.photo?.split(',')" height="520rpx" keyName="image" interval="5000" showTitle :autoplay="autoplay" circular @touchstart.native="handleTouchStart">
			<template v-slot="{ item }">
				<image :src="getFullImageUrl(item)" mode="aspectFill" style="width: 100%; height: 520rpx; object-fit: cover;" />
			</template>
		</u-swiper>

		<view class="info">
			<!-- 活动信息 -->
			<view class="info-card">
				<view class="tag">{{ detail.activitySignetStateList[detail.content.state] }}</view>
				<view class="event-title">{{ detail.content.title }}</view>
			</view>

			<!-- 主办方 -->
			<view class="organizer">
				<view class="organizer">
					<image class="avatar" :src="getFullImageUrl(detail.content?.headimg)" />
					<view class="org-name">{{ detail.content.nickName }}</view>
					<view class="org-name">发起人</view>
				</view>
				<button class="follow-btn" @click="follow" v-if="!detail.content.isFollow">+关注</button>
				<button class="follow-btn followed" v-else>已关注</button>
			</view>

			<!-- 活动详情 -->
			<view class="event-detail">
				<view class="detail-row">
					<text class="label">活动时间</text>
					<text class="value">{{ detail.content.startTime }}</text>
				</view>
				<view class="detail-row">
					<text class="label">活动地点</text>
					<view class="value valueview" @click="toAddress">{{ detail.content.address }}<uni-icons v-if="geoRef.lng" type="right" /></view>
				</view>
				<view class="detail-row">
					<text class="label">限定人数</text>
					<text class="value">{{ detail.content.limitNum }}人</text>
				</view>
				<view class="detail-row">
					<text class="label">活动主办</text>
					<!-- <text class="value"><ExpandableText :text="'detail.content.sponsordetail.content.sponsordetail.content.sponsordetail.content.sponsordetail.content.sponsordetail.content.sponsordetail.content.sponsor'" :maxLines="2" icon-color="#888" :icon-size="22" /></text> -->
					<view class="value">
						<ExpandableText :text="detail.content.sponsor" :maxLines="2" icon-color="rgba(26, 26, 26, 1)" :icon-size="24" />
					</view>
				</view>
			</view>

			<!-- 报名条件 -->
			<view class="section" v-if="detail.content.condition">
				<view class="section-title">
					<view>
						<image src="/static/index/tag.png"></image>报名条件
					</view>
					<view class="section-tips">
						完成条件后，报名时提交截图即可
					</view>
				</view>
				<view class="section-content red">
					发布一篇活动介绍到小红书
					<!-- <button class="copy-btn" @click="copyContent">复制内容</button> -->
					<view class="copy-btn" @click="copyContent(detail.content.condition)">
						<image class="copy-btn-img" src="/static/index/button.png"></image>复制内容
					</view>
				</view>
			</view>

			<!-- 集章展示 -->
			<view class="section">
				<view class="section-title">
					<view>
						<image src="/static/index/stamp.png"></image>集章展示
					</view>
					<view class="section-tips" @click="toList">
						查看更多
					</view>
				</view>
				<view class="stampImgs">
					<view v-for="(img, idx) in detail.content.collectImgs.split(',').slice(0, 8)" :key="idx" class="stamp-img-item">
						<image :src="getFullImageUrl(img)" mode="aspectFill" />
					</view>
				</view>
			</view>

			<!-- 活动详情图片 -->
			<view class="section">
				<view class="section-title">
					<view>
						<image src="/static/index/activity.png"></image>活动详情
					</view>
				</view>
				<image class="detail-img" :src="getFullImageUrl(detail.content.content)" mode="widthFix" />
			</view>

			<!-- 报名按钮 -->
			<view class="footer">
				<button class="signup-btn disabled" v-if="detail.content.state == 1">{{ detail.activitySignetStateList[detail.content.state] }}</button>
				<button class="signup-btn disabled" v-else-if="detail.content.state == 3">{{ detail.activitySignetStateList[detail.content.state] }}</button>
				<button class="signup-btn" @click="openPopUp" v-else-if="detail.content.state == 2 && detail.content.orderId == 0">报名（￥{{ detail.content.registrationFee }}）</button>
				<button class="signup-btn disabled" v-else-if="detail.content.orderId > 0">{{ detail.content.activitySignetOrderStateList[detail.content.orderState] }}</button>
				<button class="signup-btnall" open-type="getUserInfo" @getuserinfo="getAuth" v-if="!authorized"></button>
			</view>
		</view>
	</view>
	<!-- 报名弹窗 -->
	<u-popup :show="showPopup" @close="showPopup = false" @open="showPopup = true" :mask-click="false" border-radius="20" :safe-area-inset-bottom="true" round="20">
		<view class="popup-content">
			<view class="popup-title">
				提交报名信息
				<view class="close-btn">
					<u-icon name="arrow-down" custom-class="close-btn" @click="hidePopup" />
				</view>
			</view>
			<view class="popup-desc">平台将会保护你的个人隐私，当前信息方便组织方联系你</view>
			<view class="section-title">
				<view>
					<image src="/static/index/tag.png"></image>报名条件
				</view>
				<view class="section-tips">
					完成条件后，报名时提交截图即可
				</view>
			</view>
			<view class="section-content red" v-if="detail.content.condition">
				发布一篇活动介绍到小红书
				<!-- <button class="copy-btn" @click="copyContent">复制内容</button> -->
				<view class="copy-btn" @click="copyContent(detail.content.condition)">
					<image class="copy-btn-img" src="/static/index/button.png"></image>复制内容
				</view>
			</view>
			<view class="upload-area">
				<view class="upload-box" @click="chooseImage">
					<image v-if="imgUrl.length" v-for="(img, idx) in imgUrl" :src="img" :key="idx" class="upload-img" />
					<view v-else class="upload-empty">
						<image class="plus" src="/static/index/add.png"></image>
					</view>
				</view>
				<view v-if="!imgUrl.length" class="upload-tip">请上传已完成报名条件的截图</view>
			</view>
			<button class="submit-btn" :disabled="!imgUrl.length" @click="submit">提交</button>
		</view>
	</u-popup>


</template>
<script setup>
import { ref, onMounted } from 'vue'
import { IndexApi } from '../../services'
import { onLoad } from '@dcloudio/uni-app';
import { getGeoCoder, getAuthorize, uploadImg, getFullImageUrl } from '../../utils/utils';
import ExpandableText from '@/components/ExpandableText.vue'


const popupRef = ref(null)
const imgUrl = ref([])
const showPopup = ref(false)
const authorized = ref(uni.getStorageSync('token'))
const detail = ref({})
const userStatus = ref({})
const loading = ref(false)
const geoRef = ref({})

onLoad((option) => {
	fetchData(option.id)
});

onMounted((e) => {
})

const fetchData = async (id) => {
	IndexApi.getActivitysignetDetail(id || detail.value.id).then(async (res) => {
		detail.value = res
		console.log(res)
		// IndexApi.getMyDetail(res.content.orderId).then(user => userStatus.value = user)
		const geo = await getGeoCoder(res.content.address)
		console.log(geo)
		geoRef.value = geo
	})
}

const toAddress = () => {
	console.log(geoRef.value)
	wx.openLocation({
		latitude: geoRef.value.lat, // 纬度（Number 类型）
		longitude: geoRef.value.lng, // 经度（Number 类型）
		// name: detail.value.content.address, // 位置名称（可选）
		address: detail.value.content.address, // 详细地址信息（可选）
		scale: 18, // 缩放比例，范围5~18，默认为18
		success: function () {
			console.log('打开地图成功');
		},
		fail: function (err) {
			console.error('打开地图失败', err);
		}
	});
}

const hidePopup = () => {
	showPopup.value = false
}

const copyContent = (text) => {
	uni.setClipboardData({
		data: text,
		success: () => {
			uni.showToast({ title: '已复制', icon: 'none' })
		}
	})
}

const chooseImage = () => {
	uni.chooseImage({
		count: 9,
		success: (res) => {
			imgUrl.value = res.tempFilePaths
		}
	})
}
const submit = async (direct) => {
	try {
		uni.showLoading()
		let result
		if (direct) {
			result = await IndexApi.postSignin({
				id: detail.value.content.id,
			})
		} else {
			const res = await uploadImg(imgUrl.value)
			result = await IndexApi.postSignin({
				id: detail.value.content.id,
				photo: res.map(i => i.imgUrl).toString()
			})
		}
		uni.hideLoading()
		if (result.msg) {
			hidePopup()
			uni.showToast({ title: result.msg, icon: 'error' })
			return
		}
		uni.showToast({ title: '提交成功', icon: 'success' })
		if (detail.value.content.type == 1) {
			uni.navigateTo({ url: '/pages/index/success' })
		}
		fetchData()
	} catch (e) {
		console.log(e)
	}
	hidePopup()
}

const openPopUp = () => {
	if (detail.value.content.condition == 1) {
		showPopup.value = true
	} else {
		submit(true)
	}
}
const toList = () => {
	console.log(detail)
	uni.navigateTo({
		url: '/pages/index/list?id=' + detail.value.content.id
	})
}
const getAuth = () => {
	getAuthorize().then(res => showPopup.value = true)
}

const follow = () => {
	IndexApi.postFollow({ userId: detail.value.content.author }).then(res => {
		uni.showToast({ title: '关注成功！', icon: 'none' })
		fetchData(detail.value.content.id)
	})
}
</script>


<style lang="scss" scoped>
.card-swiper-wrapper {
	width: 100%;
	overflow: visible;
}

.card-item {
	width: 70vw;
	/* 每个卡片宽度 = 70% 屏幕宽度 */
	margin: 0 10rpx;
	border-radius: 16rpx;
	overflow: hidden;
}

.card-img {
	width: 100%;
	height: 300rpx;
	/* 你自己定义高度 */
	border-radius: 16rpx;
}

.info {
	padding: 30rpx 26rpx;
}

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

	&.disabled {
		background-color: #f7f7f7;
		color: rgba(0, 0, 0, .3);

	}
}

.signup-btnall {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
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
	margin-bottom: 32rpx;
	position: relative;
	color: rgba(64, 33, 49, 1);
	display: flex;
	justify-content: center;

	.u-icon {
		margin-left: auto;
		font-size: 16rpx;
	}
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
	margin-bottom: 50rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 12rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: rgba(26, 26, 26, 1);

	view {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	image {
		width: 28rpx;
		height: 28rpx;
	}

	.section-tips {
		color: rgba(153, 153, 153, 1);
		font-size: 22rpx;
	}
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
	margin-bottom: 68rpx;
	margin-top: 33rpx;
}

.upload-box {
	width: 100%;
	margin-bottom: 20rpx;
	border-radius: 12rpx;
	display: flex;
	align-items: center;
	justify-content: start;
	flex-wrap: wrap;
	margin-right: 18rpx;
	overflow: hidden;
	position: relative;
	gap: 12rpx;

	.upload-empty {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f2f2f2;
		width: 246rpx;
		height: 246rpx;
	}

	.plus {
		width: 48rpx;
		height: 48rpx;
	}
}

.upload-img {
	width: 220rpx;
	height: 220rpx;
	object-fit: cover;
	border-radius: 20rpx;
}

.plus {
	font-size: 48rpx;
	color: #bbb;
}

.upload-tip {
	font-size: 22rpx;
	color: rgba(64, 33, 49, 1);
}

.submit-btn {
	width: 350rpx;
	height: 76rpx;
	background: #222;
	color: #fff;
	font-size: 28rpx;
	border-radius: 50rpx;
	padding: 18rpx 0;
	font-weight: bold;
	margin-top: 24rpx;
	opacity: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.submit-btn:disabled {
	background: #ccc;
	color: #fff;
	opacity: 0.7;
}

.detail-page {
	background: #fafafa;
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
	margin: 0 0 20rpx;
	border-radius: 16rpx;
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
	font-size: 40rpx;
	font-weight: bold;
}

.organizer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: rgba(153, 153, 153, 1);
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
	color: #fff;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 45rpx;
	border: 1px solid rgba(26, 26, 26, 1);
	width: 126rpx;
	border-radius: 8rpx;
	padding: 4rpx 16rpx;
	color: #1A1A1A;
	margin: 0;

	&.followed {
		background: #eee;
		color: #aaa;
		border: 1px solid #eee;
	}
}

.event-detail {
	margin: 20rpx 0 0;
	border-radius: 16rpx;
	padding: 20rpx 0 0;
}

.detail-row {
	display: flex;
	align-items: center;
	margin-bottom: 26rpx;
	padding-bottom: 26rpx;
	position: relative;
}

.detail-row::after {
	content: "";
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1px;
	/* 虚线厚度 */
	background-image: repeating-linear-gradient(to right,
			rgba(217, 217, 217, 1) 0px,
			rgba(217, 217, 217, 1) 2px,
			transparent 2px,
			transparent 5px);
}

.label {
	width: 140rpx;
	color: rgba(179, 179, 179, 1);
	font-size: 22rpx;
	flex: none;
}

.valueview {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.value {
	font-size: 24rpx;
	color: rgba(26, 26, 26, 1);
	flex: 1;
	overflow: hidden;
	word-break: break-all;
}

.section {
	margin: 20rpx 0;
	border-radius: 16rpx;
	padding: 20rpx 0 0;

	.stampImgs {
		display: flex;
		gap: 16px;
		overflow: scroll;

		.stamp-img-item {
			width: 270rpx;

			image {
				border-radius: 20rpx;
				width: 270rpx;
				height: 360rpx;
				box-shadow:
					0 2px 4px rgba(191, 191, 191, 0.15),
					0 8px 24px rgba(191, 191, 191, 0.30);

			}
		}
	}
}

.section-content {
	font-size: 22rpx;
	color: #666;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(237, 237, 237, 1);
	border-radius: 20rpx;
	padding: 42rpx 33rpx;
	height: 22rpx;

	&.red {
		color: rgba(64, 33, 49, 1);
	}

	.copy-btn-img {
		width: 22rpx;
		height: 24rpx;
	}

	.copy-btn {
		padding: 12rpx 25rpx;
		border-radius: 100rpx;
		background-color: #000;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7rpx;
		color: #FFFFFF;
		font-size: 24rpx;
	}
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
	padding: 18rpx 0 64rpx;
	box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.05);
	display: flex;
	justify-content: center;
}

.signup-btn {
	width: 370rpx;
	height: 76rpx;
	background: #222;
	color: #fff;
	font-size: 32rpx;
	border-radius: 50rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	margin: 0;
}
</style>