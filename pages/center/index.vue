<template>
	<view class="discover-page">
		<!-- 顶部搜索栏 -->
		<view class="search-bar" v-if="tokenRef">
			<u-input prefixIcon="search" clearable :customStyle="{
				height: '60rpx',
				borderRadius: '30rpx',
				background: '#fff',
				padding: '0 110rpx 0 24rpx',
				fontSize: '26rpx',
				marginRight: '12rpx',
				// paddingRight: '120rpx',
				width: '100%'
			}" v-model="searchText" placeholder="搜索掌主名称或内容" @confirm="onSearch" @clear="onSearch" />
			<button class="search-btn" @click="onSearch">搜索</button>
			<view class="search-icons">
				<u-icon type="more-filled" size="28" color="#333" />
			</view>
		</view>
		<scroll-view class="search-content" v-if="tokenRef" scroll-y :scroll-with-animation="true" @scrolltolower="handleReachBottom">

			<!-- 优质印章横滑 -->
			<view class="section-title">优质印章

				<!-- 印章分类 -->
				<view class="category-bar">
					<view v-for="(cat, idx) in categories" :key="cat" :class="['category-item', { active: idx === activeCategory }]" @click="changeCategories(idx)">
						{{ cat }}
					</view>
				</view>
				<view class="category-all" @click="toList">查看更多</view>
			</view>
			<view class="stamp-scroll">
				<image @click="onToDetail(stamp)" class="stamp-cards" v-for="(stamp, idx) in stamps.filter(i => !activeCategory ? isWithinLast3Days(i.createTime) : !isWithinLast3Days(i.createTime))" :key="idx" :src="getFullImageUrl(stamp.photo)" mode="aspectFill">
				</image>
			</view>

			<!-- 热门创意话题 -->
			<view class="section-title">热门创意话题</view>
			<view class="topic-list">
				<view class="topic-card" v-for="(topic, idx) in list" :key="idx" @click="onToDetail(topic, true)">
					<image :src="getFullImageUrl(topic.photo?.split(',')[0])" class="topic-img" mode="aspectFill" />
					<view class="topic-desc">{{ topic.title }}</view>
					<view class="topic-footer">
						<view class="topic-user">
							<image :src="getFullImageUrl(topic.headimg)" class="user-avatar" />
							<text class="user-name">{{ topic.nickname }}</text>
						</view>
						<view class="topic-stats">
							<image src="/static/center/like.png" v-if="topic.islikes" mode="aspectFill" :style="{ transform: 'scale(1.5)' }"></image>
							<image src="/static/center/likeicon.png" v-if="!topic.islikes" mode="aspectFill"></image>
							<text class="stat">{{ topic.likesNum }}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 悬浮发布按钮 -->
			<button class="fab" @click="onPublish">
				<u-icon name="plus" size="32" color="#fff" />
			</button>
		</scroll-view>
		<view v-else>
			<button class="signup-btn" open-type="getUserInfo" @getuserinfo="getAuth">
				登录查看
			</button>
		</view>
	</view>
</template>

<script setup>
import { onReachBottom, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { ActivityApi } from '../../services/activity'
import { CenterApi } from '../../services/center'
import { useToken } from '../../hooks/userToken'
import { getAuthorize, getFullImageUrl } from '../../utils/utils'
const { tokenRef, setToken } = useToken()

const searchText = ref('')
const categories = ['最新', '热门']
const activeCategory = ref(0)
const stamps = ref([])

const list = ref([])

const page = ref(1)
const pageSize = 10
const loading = ref(false)
const finished = ref(false)
const keyword = ref('')

const changeCategories = (idx) => {
	activeCategory.value = idx
}

const getList = (search) => {
	if (loading.value || finished.value) return
	loading.value = true
	search && uni.showLoading()
	CenterApi.getArticle({ page: search ? 1 : page.value, perPage: pageSize, artType: 16, keyword: keyword.value || '' }).then(res => {
		uni.hideLoading()
		if (res.content && res.content.length > 0) {
			list.value.push(...res.content)
			page.value++
		} else if (search) {
			page.value = 1
			list.value = res.content
		} else {
			finished.value = true
		}
		loading.value = false
	}).catch(err => {
		uni.hideLoading()
		loading.value = false
	})
}

onShow(() => {
	list.value = []
	page.value = 1
	finished.value = false;
	const userId = uni.getStorageSync('userId')
	ActivityApi.getContentlist({ page: 1, perPage: 999, creator: '' }).then(res => {
		stamps.value = res.content || []
	})
	getList()
});
// onReachBottom(() => {
// 	tokenRef.value && getList()
// })

function onSearch() {
	keyword.value = searchText.value
	getList(keyword.value)
}
function toList() {
	uni.navigateTo({ url: '/pages/center/list' })
}
function onPublish() {
	uni.navigateTo({ url: '/pages/center/idea' })
}
function onToDetail(item, isArticle) {
	uni.navigateTo({
		url: '/pages/center/detail?id=' + item.id + (isArticle ? '&isArticle=1' : '')
	})
}

const handleReachBottom = () => {
	// 加载更多数据
	console.log('容器滚动到底了')
	tokenRef.value && getList()
}
const getAuth = () => {
	getAuthorize().then(res => {
		setToken(uni.getStorageSync('token'));
		getList()
	})
}
function isWithinLast3Days(dateStr) {
	const inputTime = new Date(dateStr).getTime();
	const now = Date.now();
	const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

	return now - inputTime <= threeDaysInMs;
}
</script>

<style scoped lang="scss">
.discover-page {
	background: #fafafa;
	height: 100vh;
	box-sizing: border-box;
	padding: 100rpx 23rpx 0;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.search-bar {
	display: flex;
	align-items: center;
	width: 498rpx;
	position: relative;
}

.search-content {
	flex: 1;
	overflow: scroll;
	padding-top: 20rpx;
	box-sizing: border-box;
}

.search-input {
	height: 60rpx;
	border-radius: 30rpx;
	background: #fff;
	border: none;
	padding: 0 24rpx;
	font-size: 22rpx;
	margin-right: 12rpx;
	width: 100%;
}

.search-btn {
	position: absolute;
	right: 17rpx;
	top: 6rpx;
	height: 50rpx;
	width: 100rpx;
	background: #222;
	color: #fff;
	white-space: nowrap;
	border-radius: 30rpx;
	font-size: 26rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 12;
}

.search-icons {
	display: flex;
	align-items: center;
}

.category-bar {
	display: flex;
	gap: 20rpx;
	padding: 0 10rpx;

}

.category-all {
	margin-left: auto;
	color: rgb(153, 153, 153);
	font-size: 26rpx;
}

.category-item {
	font-size: 26rpx;
	color: rgba(153, 153, 153, 1);
	margin-right: 32rpx;
	padding: 8rpx 0;
	border-bottom: 4rpx solid transparent;
}

.category-item.active {
	color: #222;
	font-weight: bold;
	border-bottom: 4rpx solid #222;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	display: flex;
	gap: 40rpx;
	align-items: baseline;
	margin: 26rpx 0 20rpx 0;
}

.stamp-scroll {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	overflow: scroll;
	margin-bottom: 38rpx;
	min-height: 272rpx;
}

.stamp-cards {
	width: 223rpx;
	height: 272rpx;
	flex: none;
	margin-right: 16rpx;
	border-radius: 13rpx;
	overflow: hidden;
	display: inline-block;
}

.stamp-img {
	width: 180rpx;
	height: 180rpx;
	object-fit: cover;
}

.stamp-name {
	font-size: 22rpx;
	color: #222;
	margin-top: 8rpx;
	text-align: center;
}

.topic-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.topic-card {
	width: 48%;
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
	font-size: 22rpx;
	color: #333;
	margin: 10rpx 12rpx 0 12rpx;
	min-height: 48rpx;
}

.topic-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10rpx 12rpx 12rpx 12rpx;
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

.stat {
	margin-left: 4rpx;
}

.fab {
	position: fixed;
	right: 40rpx;
	bottom: 60rpx;
	width: 88rpx;
	height: 88rpx;
	background: #ff6600;
	opacity: 0.85;
	border-radius: 50%;
	box-shadow: 0 4rpx 16rpx rgba(255, 102, 0, 0.18);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
	border: none;
	padding: 0;
}

.signup-btn {
	width: 650rpx;
	background: #222;
	color: #fff;
	font-size: 32rpx;
	border-radius: 50rpx;
	padding: 20rpx 0;
	font-weight: bold;
	margin: 810rpx auto;
	display: block;

	&.disabled {
		background-color: #f7f7f7;
		color: rgba(0, 0, 0, .3);

	}
}
</style>