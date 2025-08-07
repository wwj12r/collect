<template>
	<view class="album-page">
		<!-- 顶部背景大图 -->
		<view class="header" v-if="list.length || !tokenRef">
			<image class="header-bg" src="/static/gallery/bg.png" mode="aspectFill" />
			<image class="header-bg-title" src="/static/gallery/bg-title.png" mode="aspectFill" />
		</view>
		<view v-if="!list.length && tokenRef" class="album-empty">
			<image src="/static/gallery/empty.png"></image>
			<view>今日牌运: 空空如也!</view>
			<text>去创意广场收集电子章吧~</text>
		</view>

		<!-- 集章卡片网格 -->
		<view class="card-grid" v-if="tokenRef">
			<view class="card-item" v-for="(card, idx) in list" :key="idx" @click="previewImg(card)">
				<image class="card-img" :src="getFullImageUrl(card.photo)" mode="aspectFill" />
			</view>
		</view>
		<view v-else>
			<button class="signup-btn" open-type="getUserInfo" @getuserinfo="getAuth">
				登录查看
			</button>
		</view>
	</view>
	<StampPreviewPopup v-model:show="showPopup" :imgUrl="getFullImageUrl(active.photo)" @like="zan" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StampPreviewPopup from './components/preview.vue'
import { getAuthorize, getFullImageUrl } from '../../utils/utils'
import { GalleryApi } from '../../services/gallery'
import { onReachBottom, onShow, onLoad, onShareAppMessage } from '@dcloudio/uni-app'
import { useToken } from '../../hooks/userToken'
const { tokenRef, setToken } = useToken()

onShareAppMessage(() => {
	console.log(showPopup.value)
	return {
		title: '我的展厅',
		imageUrl: getFullImageUrl(active.value.photo),
		path: '/pages/gallery/index?id=' + uni.getStorageSync('userId')
	}
})

const list = ref([])
const page = ref(1)
const pageSize = 10
const loading = ref(false)
const finished = ref(false)
const active = ref({})

const getList = (id) => {
	if (loading.value || finished.value) return
	loading.value = true
	// uni.showLoading()
	GalleryApi.getContentuserlist({ page: page.value, perPage: pageSize, userId: id || '' }).then(res => {
		// uni.hideLoading()
		if (res.content && res.content.length > 0) {
			list.value.push(...res.content)
			page.value++
		} else {
			finished.value = true
		}
		loading.value = false
	}).catch(err => {
		uni.hideLoading()
		loading.value = false
	})
}
// onMounted(() => {
// 	tokenRef.value && getList()
// })

const resetList = () => {
	list.value = []
	page.value = 1
	finished.value = false
}

onShow((option) => {
	list.value = []
	page.value = 1
	finished.value = false;
	(tokenRef.value || option?.id) && getList(option?.id)
});
onReachBottom(() => {
	tokenRef.value && getList()
})

const showPopup = ref(false)

const getAuth = () => {
	getAuthorize().then(res => {
		setToken(uni.getStorageSync('token'));
		getList()
	})
}

const previewImg = (item) => {
	showPopup.value = true
	active.value = item
}

const zan = async () => {
	await GalleryApi.postZan({ id: active.value.id })
	uni.showToast({ title: '点赞成功！' })
	showPopup.value = false
}
</script>

<style scoped lang="scss">
.album-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 338rpx;

	image {
		width: 328rpx;
		height: 398rpx;
	}

	view {
		margin-top: 100rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
	}

	text {
		margin-top: 29rpx;
		font-size: 28rpx;
		color: rgba(153, 153, 153, 1);
	}
}

.signup-btn {
	width: 650rpx;
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

.album-page {
	background: #f0f2f5;
	min-height: 100vh;
}

.header {
	position: relative;
	width: 100%;
	height: 870rpx;
}

.header-bg {
	width: 100%;
	height: 870rpx;
}

.header-bg-title {
	position: absolute;
	width: 341rpx;
	height: 241rpx;
	top: 200rpx;
	left: 372rpx;
}

.title-sticker {
	position: absolute;
	left: 40rpx;
	bottom: -40rpx;
	width: 260rpx;
	z-index: 2;
}

.menu-btn {
	position: absolute;
	top: 32rpx;
	right: 32rpx;
	z-index: 3;
	background: rgba(255, 255, 255, 0.7);
	border-radius: 50%;
	padding: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.card-grid {
	position: relative;
	margin-top: -386rpx;
	padding: 0 24rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.card-item {
	width: 344rpx;
	height: 386rpx;
	border-radius: 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
	overflow: hidden;
	margin-bottom: 20rpx;
}

.card-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.card-title {
	font-size: 22rpx;
	color: #222;
	margin-top: 10rpx;
	text-align: center;
	min-height: 32rpx;
}
</style>