<template>
	<view 
		class="page-scaffold"
		:class="customClass"
		:style="customStyle"
	>
		<slot />
	</view>	
</template>

<script setup>
defineProps({
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
.page-scaffold {
	background: #f7f7f7;
	min-height: 100vh;
	padding: 20rpx;
	box-sizing: border-box;
}
</style> 