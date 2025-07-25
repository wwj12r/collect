<template>
	<view class="album-page">
		<!-- 顶部背景大图 -->
		<view class="header">
			<image class="header-bg" src="https://your-image-url/top-bg.jpg" mode="aspectFill" />
			<!-- 标题贴纸 -->
			<image class="title-sticker" src="https://your-image-url/title-sticker.png" mode="widthFix" />
			<!-- 右上角菜单按钮 -->
			<view class="menu-btn" @click="onMenuClick">
				<uni-icons type="more-filled" size="32" color="#333" />
			</view>
		</view>

		<!-- 集章卡片网格 -->
		<view class="card-grid">
			<view class="card-item" v-for="(card, idx) in cards" :key="idx" @click="showPopup = true">
				<image class="card-img" :src="card.img" mode="aspectFill" />
				<view class="card-title">{{ card.title }}</view>
			</view>
		</view>
	</view>
	<StampPreviewPopup v-model:show="showPopup" :imgUrl="imgUrl" title="Be Water My friend" desc="" subDesc="If you love life, don't waste time, for time is what life is made up of." @share="uni.showToast({ title: '分享', icon: 'none' })" @like="uni.showToast({ title: '点赞', icon: 'none' })" />
</template>

<script setup>
import { ref } from 'vue'
import StampPreviewPopup from './components/preview.vue'

const showPopup = ref(false)

const cards = ref([
	{
		img: 'https://your-image-url/bruce-lee.jpg',
		title: 'Be Water My friend'
	},
	{
		img: 'https://your-image-url/jaychou.jpg',
		title: '咏叹不褪晓'
	},
	{
		img: 'https://your-image-url/slamdunk.jpg',
		title: 'SLAM DUNK'
	},
	{
		img: 'https://your-image-url/canton-tower.jpg',
		title: 'CANTON TOWER'
	},
	{
		img: 'https://your-image-url/stephen-jay.jpg',
		title: 'STEPHEN CHOW JAY CHOU'
	},
	{
		img: 'https://your-image-url/stamp-collection.jpg',
		title: ''
	}
])


const onMenuClick = () => {
	uni.showToast({ title: '菜单点击', icon: 'none' })
}
</script>

<style scoped>
.album-page {
	background: #f7f7f7;
	min-height: 100vh;
}

.header {
	position: relative;
	width: 100%;
	height: 260rpx;
}

.header-bg {
	width: 100%;
	height: 260rpx;
	object-fit: cover;
	border-bottom-left-radius: 32rpx;
	border-bottom-right-radius: 32rpx;
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
	margin-top: 60rpx;
	padding: 0 24rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.card-item {
	width: 47%;
	background: #fff;
	border-radius: 18rpx;
	margin-bottom: 28rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
	overflow: hidden;
	border: 2rpx dashed #ccc;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 12rpx;
}

.card-img {
	width: 100%;
	height: 200rpx;
	object-fit: cover;
	border-bottom: 1rpx solid #eee;
}

.card-title {
	font-size: 22rpx;
	color: #222;
	margin-top: 10rpx;
	text-align: center;
	min-height: 32rpx;
}
</style>