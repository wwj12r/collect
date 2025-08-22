<template>
	<view class="stampImgs-grid">
		<view class="topic-card" v-for="(topic, idx) in list" :key="idx" @click="onToDetail(topic)">
			<image :src="getFullImageUrl(topic.photo?.split(',')[0])" class="topic-img" mode="aspectFill" />
			<view class="topic-desc">{{ topic.title }}</view>
			<view class="topic-footer">
				{{ topic.content }}
			</view>
		</view>
	</view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { ActivityApi } from '../../services/activity'
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import { getFullImageUrl } from '../../utils/utils';
const list = ref([])
const page = ref(1)
const pageSize = 10
const loading = ref(false)
const finished = ref(false)

onLoad((option) => {
	getList()
});
function onToDetail(item, isArticle) {
	uni.navigateTo({
		url: '/pages/center/detail?id=' + item.id + (isArticle ? '&isArticle=1' : '')
	})
}

const getList = () => {
	if (loading.value || finished.value) return
	loading.value = true
	uni.showLoading()
	ActivityApi.getContentlist({ page: page.value, perPage: pageSize }).then(res => {
		console.log(res)
		uni.hideLoading()
		list.value.push(...(res.content || []))
		page.value++
		loading.value = false
	})
}
onReachBottom(() => {
	getList()
})

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

.topic-card {
	width: 100%;
	border-radius: 16rpx;
	margin-bottom: 18rpx;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.topic-img {
	width: 100%;
	height: 420rpx;
}

.topic-desc {
	font-size: 24rpx;
	color: #333;
	font-weight: bold;
	margin: 10rpx 12rpx 0 12rpx;
	min-height: 48rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}

.topic-footer {
	font-size: 22rpx;
	color: #333;
	margin: 0 12rpx 0 12rpx;
}

.topic-user {
	display: flex;
	align-items: center;
}

.user-avatar {
	width: 32rpx;
	height: 32rpx;
	border-radius: 50%;
	margin-right: 8rpx;
}

.user-name {
	font-size: 20rpx;
	color: #888;
}

.topic-stats {
	display: flex;
	align-items: center;
	color: rgba(26, 26, 26, 1);
	font-size: 20rpx;

	image {
		width: 21rpx;
		height: 21rpx;
	}
}
</style>