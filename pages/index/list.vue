<template>
	<view class="stampImgs-grid">
		<view v-for="(img, idx) in detail.content.collectImgs.split(',')" :key="idx" class="stamp-img-item">
			<image :src="imgBaseUrl + img" mode="aspectFill" />
		</view>
	</view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { IndexApi } from '../../services'
import { onLoad } from '@dcloudio/uni-app';
import { imgBaseUrl } from '../../utils/enums';
const detail = ref({})

onLoad((option) => {
	fetchData(option.id)
});

const fetchData = async (id) => {
	const res = await IndexApi.getActivitysignetDetail(id)
	console.log(res)
	detail.value = res
}

</script>
<style scoped>
.stampImgs-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20rpx;
	padding: 0 24rpx 18rpx 24rpx;
}

.stamp-img-item {
	width: 100%;
	aspect-ratio: 3/4;
	/* 或固定高度 */
	background: #f2f2f2;
	border-radius: 20rpx;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}

.stamp-img-item image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
}
</style>