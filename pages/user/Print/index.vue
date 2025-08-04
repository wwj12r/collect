<template>
	<view class="stampImgs-grid">
		<!-- 第一个占位，点击跳转 -->
		<view class="stamp-img-item add" @click="toPublish">
			<image class="add-icon" src="/static/index/add.png" />
			<text class="add-text">发布我的印章</text>
		</view>
		<!-- 其余图片 -->
		<view v-for="(img, idx) in list" :key="idx" class="stamp-img-item">
			<image :src="getFullImageUrl(img.photo)" mode="aspectFill" />
		</view>
	</view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { ActivityApi } from '../../../services/activity'
import { onReachBottom, onShow } from '@dcloudio/uni-app'
import { getFullImageUrl } from '../../../utils/utils'

const list = ref([])
const page = ref(1)
const pageSize = 10
const loading = ref(false)
const finished = ref(false)

const getList = () => {
	console.log(loading.value, finished.value)
	if (loading.value || finished.value) return
	loading.value = true
	const userId = uni.getStorageSync('userId')
	ActivityApi.getContentlist({ page: page.value, perPage: pageSize, creator: userId }).then(res => {
		if (res.content && res.content.length > 0) {
			list.value.push(...res.content)
			page.value++
		} else {
			finished.value = true
		}
		loading.value = false
	}).catch(err => {
		loading.value = false
	})
}

const toPublish = () => {
	finished.value = false
	uni.navigateTo({ url: '/pages/user/Print/publish' })
}
const resetList= () => {
  list.value = []
  page.value = 1
  finished.value = false
}
onShow(() => {
	resetList()
	getList()
})

// onMounted(() => {
// 	getList()
// })

onReachBottom(() => {
	getList()
})
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
	width: 60rpx!important;
	height: 60rpx!important;
	margin-bottom: 10rpx;
}

.add-text {
	color: #bbb;
	font-size: 22rpx;
}
</style>