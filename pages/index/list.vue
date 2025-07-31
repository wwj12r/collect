<template>
	<view class="stampImgs-grid">
		<view v-for="(img, idx) in detail.content.collectImgs.split(',')" :key="idx" class="stamp-img-item">
			<image :src="getFullImageUrl(img)" @click="previewImage(idx)" mode="aspectFill" />
		</view>
	</view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { IndexApi } from '../../services'
import { onLoad } from '@dcloudio/uni-app';
import { getFullImageUrl } from '../../utils/utils';
const detail = ref({})

onLoad((option) => {
	fetchData(option.id)
});

const previewImage = (index) => {
	const imgs = detail.value.content.collectImgs.split(',').map(i => getFullImageUrl(i))
    uni.previewImage({
      current: imgs[index], // 当前显示图片的 http 链接
      urls: imgs // 需要预览的图片 http 链接列表
    })
}

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