<template>
	<view
		:class="customClass"
		:style="customStyle"
	>
		<uni-section 
			:title="title" 
			:titleFontSize="titleFontSize"
			class="biz-section"
			padding="0 24rpx 18rpx 24rpx"
		>
			<template #decoration v-if="icon">
				<img :src="icon" class="section-icon" />
			</template>
			
			<slot />
		</uni-section>
	</view>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		required: true
	},
	titleFontSize: {
		type: String,
		default: '36rpx'
	},
	icon: {
		type: String,
		default: ''
	},
	customClass: {
		type: [String, Array, Object],
		default: ''
	},
	customStyle: {
		type: [String, Object],
		default: ''
	}
})
</script>

<style scoped>
.section-icon {
	width: 36rpx;
	height: 36rpx;
	margin-right: 12rpx;
}

:deep(.uni-section) {
	margin-bottom: 24rpx;
	background: #fff;
	border-radius: 18rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	padding-bottom: 24rpx;
}

:deep(.uni-section-header) {
	padding: 24rpx 24rpx 18rpx 24rpx;
	background: #fff;
	border-bottom: 1rpx solid #f0f0f0;
}

:deep(.uni-section__content-title) {
	font-size: 28rpx;
	font-weight: bold;
	color: #1A1A1A;
}
</style>
