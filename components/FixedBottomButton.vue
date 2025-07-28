<template>
	<view class="fixed-bottom-button">
		<button
			type="primary" 
			size="default"
			:loading="loading"
			@click="onClick"
			style="background-color: #1a1a1a; color: #fff; font-weight: bold;"
			shape="circle"
			color="#1a1a1a"
			class="submit-button"
		>
			{{ loading ? loadingText : text }}
		</button>
	</view>
</template>

<script setup>
defineProps({
	text: {
		type: String,
		required: true
	},
	loading: {
		type: Boolean,
		default: false
	},
	loadingText: {
		type: String,
		default: '加载中...'
	}
})

const emit = defineEmits(['click'])

function onClick() {
	emit('click')
}
</script>

<style scoped>
.fixed-bottom-button {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx 30rpx;
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	background: #fff;
	border-top: 1rpx solid #eee;
	z-index: 2;
	display: flex;
	justify-content: center;
	align-items: center;
}

.submit-button {
	display: inline-block;	
	padding: 0rpx 200rpx;
	border-radius: 80rpx;
}
</style> 