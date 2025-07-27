<template>
	<view class="stampImgs-grid">
		<!-- 第一个占位，点击跳转 -->
		<view class="stamp-img-item add" @click="toPublish">
			<image class="add-icon" src="/static/index/add.png" />
			<text class="add-text">发布我的印章</text>
		</view>
		<!-- 其余图片 -->
		<view v-for="(img, idx) in detail.content.collectImgs.split(',').slice(0, 11)" :key="idx" class="stamp-img-item">
			<image :src="imgBaseUrl + img" mode="aspectFill" />
		</view>
	</view>
</template>
<script>
const toPublish = () => {
	uni.navigateTo({ url: '/pages/user/Rrint/publish' })
}
</script>

<style scoped lang="scss">
.stampImgs-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20rpx;
	padding: 0 24rpx 18rpx 24rpx;
}

.stamp-img-item {
	width: 100%;
	aspect-ratio: 3/4;
	background: #f2f2f2;
	border-radius: 20rpx;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.stamp-img-item image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
	border-radius: 20rpx;
}

.stamp-img-item.add {
	background: #fafafa;
	border: 2rpx dashed #bbb;
	justify-content: center;
	align-items: center;
}

.add-icon {
	width: 60rpx;
	height: 60rpx;
	margin-bottom: 10rpx;
}

.add-text {
	color: #bbb;
	font-size: 22rpx;
}
</style>