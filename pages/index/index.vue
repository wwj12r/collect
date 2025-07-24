<template>
	<view class="content">
		<view class="imgs">
			<u-swiper :list="imgs" height="1100rpx" keyName="image" showTitle :autoplay="false" circular>
				<template v-slot="{ item }">
					<image :src="item" mode="aspectFill" style="width: 100%; height: 1100rpx; object-fit: cover;" />
				</template>
			</u-swiper>
		</view>
		<view class="detail">
			<view class="detail-title">
				<view class="detail-title-tips">报名中</view>
				<view class="detail-title-title">广州东山口第一届集章大会，8月8日正式启动</view>
			</view>
			<view class="detail-info">
				<view class="detail-info-top">
					<image class="detail-info-top-img" src="/static/logo.png"></image>
					<view class="detail-info-top-view">Starshine-js</view>
				</view>
				<view class="detail-info-time">
					<image class="detail-info-time-img" src="/static/index/time.png"></image>08-08 周日 13:00~18:00
				</view>
				<view class="detail-info-address">
					<view class="detail-info-address-view">
						<image class="detail-info-address-image" src="/static/index/address.png"></image>
						广州市越秀区天河城百货负一楼285-05
					</view>
					<view class="detail-info-address-right">距您 8.5km</view>
				</view>
				<view class="detail-info-button">
					<view class="detail-info-button-left">3126 人已报名</view>
					<view class="detail-info-button-right" @click="toDetail">
						<image class="detail-info-button-right-img" src="/static/index/button.png"></image>点击报名
					</view>
				</view>
			</view>
		</view>
		<!-- <u-button type="primary" @click="handleClick">点我</u-button> -->

	</view>
</template>

<script>
import {
	defineComponent,
	reactive,
	ref,
	watchEffect
} from 'vue';

export default defineComponent({
	setup() {
		const title = ref('ww12j')
		const handleClick = () => {
			console.log(112)
		}
		const imgs = ref(['/static/logo.png', '/static/logo.png', '/static/logo.png'])
		const toDetail = () => {
			console.log(11)
			uni.navigateTo({
				url: '/pages/index/detail?id=123'
			});
		}
		return {
			imgs,
			title,
			handleClick,
			toDetail,
		}
	}
});
</script>

<style lang="scss" scoped>
.detail-info-button {
	margin-top: 10rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.detail-info-button-right-img {
		width: 22rpx;
		height: 24rpx;
	}

	.detail-info-button-right {
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

	.detail-info-button-left {
		color: #FF4D00;
		font-weight: bold;
	}
}

.detail-info-address {
	height: 60rpx;
	margin-top: 19rpx;
	display: flex;
	align-items: start;
	color: #999999;
	justify-content: space-between;

	.detail-info-address-right {
		white-space: nowrap;
	}

	.detail-info-address-image {
		width: 21rpx;
		height: 24rpx;
	}

	.detail-info-address-view {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}
}

.detail-info-time {
	margin-top: 26rpx;
	display: flex;
	align-items: center;
	gap: 14rpx;
	color: #999999;
}

.detail-info-time-img {
	width: 23rpx;
	height: 23rpx;
}

view {
	box-sizing: border-box;
	font-size: 26rpx;
}

image {
	object-fit: cover;
}

.content {
	padding-top: 80rpx;
	background-color: #fff;
	height: 100vh;
	box-sizing: border-box;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.imgs {
	width: 100%;
	height: 1100rpx;
	background-color: #000;
}

.img {
	width: 100%;
	height: 1100rpx;
}

.detail {
	position: fixed;
	bottom: 37rpx;
	left: 23.5rpx;
	width: 703rpx;
	height: 414rpx;
	background-color: #fff;
	border-radius: 33rpx;
	padding: 25rpx 23rpx;
	overflow: hidden;
	box-sizing: border-box;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

}

.detail-title {

	.detail-title-tips {
		display: inline;
		background-color: #FF4D00;
		color: #fff;
		font-weight: 500;
		color: #FFFFFF;
		padding: 5rpx 15rpx;
		white-space: nowrap;
		font-size: 20rpx;
		margin-right: 14rpx;
		border-radius: 6rpx;
		vertical-align: middle;
	}

	.detail-title-title {
		display: inline;
		font-weight: 500;
		color: #1A1A1A;
		font-size: 34rpx;
		vertical-align: middle;
	}
}


.detail-info {}

.detail-info-top {
	display: flex;
	align-items: center;
	gap: 16rpx;
	margin-top: 26rpx;

	.detail-info-top-img {
		width: 44rpx;
		height: 44rpx;
		border-radius: 50%;
	}

	.detail-info-top-view {
		color: #CCCCCC;
	}
}
</style>