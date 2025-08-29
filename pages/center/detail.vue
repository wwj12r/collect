<template>
	<swiper v-if="contentList.length" :list="contentList" class="swiper" height="100vh" direction="column" :vertical="true" :autoplay="false" keyName="id" showTitle circular @change="onSwiperChange">
		<swiper-item v-for="item in contentList" :key="item.id" height="100vh">
			<view class="idea-detail-page">
				<view class="detail-header">
					<u-icon name="arrow-left" size="22" @click="goback"></u-icon>
					<image :src="getFullImageUrl(item.headimg)" mode="aspectFill"></image>
					<view>{{ item.nickname }}</view>
				</view>
				<view class="img-area">

					<!-- <image :src="getFullImageUrl(item.photo)" class="main-img" mode="aspectFill" /> -->
					<u-swiper v-if="item.photo.split(',').length" :list="item.photo.split(',')" :height="toggleRef ? '900rpx' : '1096rpx'" interval="1500" :autoplay="autoplay" circular @change="onChange">
						<template v-slot:default="{ item: items }">
							<image :src="getFullImageUrl(items)" mode="aspectFit" :style="{ width: '100%', height: toggleRef ? '900rpx' : '1096rpx', background: '#000' }" />
						</template>
					</u-swiper>

					<view class="custom-indicator" v-if="item.photo.split(',').length > 1">
						<view v-for="(dot, index) in item.photo.split(',')" :key="index" :class="['custom-dot', { active: current === index }]"></view>
					</view>
					<view class="side-actions" v-if="item.islikes > -1">
						<view class="action-item" @click="like(item.islikes)">
							<!-- <image src="/static/gallery/like.png"></image> -->
							<image src="/static/center/unlike.png" v-if="!item.islikes"></image>
							<image src="/static/center/like.png" v-if="item.islikes"></image>
							<text class="action-text">{{ item.likesNum }}</text>
						</view>
						<view class="action-item" @click="showPopupFn">
							<image src="/static/center/comment.png"></image>
							<text class="action-text">{{ item.commentsNum }}</text>
						</view>
						<button plain style="border: none;" open-type="share">
							<view class="action-item">
								<image src="/static/center/share.png"></image>
								<text class="action-text">{{ item.shareNm }}</text>
							</view>
						</button>
					</view>
				</view>

				<view class="content-area">
					<view class="desc">{{ item.title }}</view>
					<view class="extra">
						<ExpandableText @toggle="toggle" :showToggleControl="false" iconSize='24rpx' :text="item.content" :maxLines="4" />
					</view>
					<view class="date">{{ item.createTime }}</view>
					<view class="more-tip">上滑查看更多</view>
					<button v-if="!item.artType && !item.isGet" class="logout-btn" @click="collect">收集电子章</button>
					<button v-if="!item.artType && item.isGet" style="background-color: #eee;" class="logout-btn">已拥有</button>
				</view>
			</view>
		</swiper-item>
	</swiper>
	<CommentPopup v-model:show="showPopup" :id="contentList[current].id" @comment="handleComment" />
</template>

<script setup>
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app';
import { onMounted, ref } from 'vue';
import { CenterApi } from '../../services/center';
import { ActivityApi } from '../../services/activity';
import { getFullImageUrl } from '../../utils/utils';
import CommentPopup from './components/CommentPopup.vue';
import ExpandableText from '../../components/ExpandableText.vue';

const current = ref(0)
const toggleRef = ref(false)
const contentList = ref({})
const showPopup = ref(false)
const idRef = ref('')
const isArticleRef = ref(false)
const userId = uni.getStorageSync('userId')

onLoad((option) => {
	console.log(option)
	fetchData(option.id, option.isArticle)
});
const fetchData = async (id, isArticle) => {
	idRef.value = id
	isArticleRef.value = isArticle
	if (isArticle) {
		const res = await CenterApi.getArticleDetail(id)
		contentList.value = [res]
		const list1 = await CenterApi.getArticle({ page: 1, perPage: 999, artType: 16, keyword: '' })
		contentList.value.push(...list1.content.filter(item => item.id != id))
		console.log(res)
		// const userId = uni.getStorageSync('userId')
		// const list2 = await ActivityApi.getContentlist({ page: 1, perPage: 999, creator: userId })
		// contentList.value.push(...list2.content)
	} else {
		const userId = uni.getStorageSync('userId')
		const list1 = await ActivityApi.getContentlist({ page: 1, perPage: 999, creator: '' })
		console.log([list1.content.find(item => item.id == id)])
		let findOne, rest = []
		list1.content.map(element => {
			if (element.id == id) {
				findOne = element
			} else {
				rest.push(element)
			}
		});
		contentList.value = [findOne, ...rest]
		// const list2 = await CenterApi.getArticle({ page: 1, perPage: 999, artType: 16, keyword: '' })
		// contentList.value.push(...list2.content)
	}
	console.log(contentList.value)
}

const onSwiperChange = async (e) => {
	current.value = e.detail.current
	if (contentList.value[e.detail.current].artType && !contentList.value[e.detail.current].username) {
		const res = await CenterApi.getArticleDetail(contentList.value[e.detail.current].id)
		contentList.value = contentList.value.map(item => item.id == contentList.value[e.detail.current].id ? { ...item, ...res } : item)
	}
}
const goback = () => {
	uni.navigateBack()
}
const onChange = (e) => {
	// current.value = e.current
}

const showPopupFn = () => {
	showPopup.value = true
}

const handleComment = () => {
	fetchData(contentList.value[current.value].id, isArticleRef.value)
}

const like = (liked) => {
	if (liked) return
	CenterApi.postArticleLike({ aid: contentList.value[current.value].id })
	contentList.value = contentList.value.map(item => item.id == contentList.value[current.value].id ? { ...item, islikes: 1, likesNum: Number(item.likesNum) + 1 } : item)
}

const toggle = (e) => {
	toggleRef.value = e
}

const collect = async () => {
	const res = await CenterApi.postContentjoin({ id: contentList.value[current.value].id })
	console.log(res)
	if (res?.ret == 1) {
		uni.showToast({ title: res.msg, icon: 'error' })
	} else if (!res) {
		uni.showToast({ title: '收集成功！' })
		contentList.value = contentList.value.map(item => item.id == contentList.value[current.value].id ? { ...item, isGet: true } : item)
		// setTimeout(() => {
		// 	uni.navigateTo({ url: '/page/gallery/index' })
		// }, 500);
	}
}


// 分享给朋友
onShareAppMessage(() => {
	const item = contentList.value[current.value]
	return {
		title: item?.title || '分享内容',
		path: `/pages/center/detail?id=${item?.id}&isArticle=${isArticleRef.value}`,
		imageUrl: getFullImageUrl(item?.photo?.split(',')[0] || '')
	}
})
</script>

<style scoped lang="scss">
.custom-indicator {
	@include flex(row);
	justify-content: center;
	position: absolute;
	bottom: 20rpx;
	left: 0;
	right: 0;
	z-index: 10;
}

.custom-dot {
	height: 7rpx;
	width: 52rpx;
	border-radius: 100px;
	background-color: rgba(255, 255, 255, 0.6);
	margin: 0 10rpx;
	transition: background-color 0.3s;

	&.active {
		background-color: rgba(255, 255, 255, 1);
	}
}

.dot {
	width: 10rpx;
	height: 10rpx;
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 100rpx;
	margin: 0 6rpx;
	transition: all 0.3s;
}

.dot.active {
	width: 20rpx;
	background-color: #ffffff;
}

.swiper {
	padding: 0;
	height: 100vh;
}

.idea-detail-page {
	background: #fafafa;
	min-height: 100vh;
	padding-bottom: 40rpx;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	.detail-header {
		width: 100%;
		height: 120rpx;
		margin-top: 70rpx;
		background-color: #fff;
		display: flex;
		align-items: center;

		image {
			width: 67rpx;
			height: 67rpx;
			border-radius: 50%;
			margin-left: 33rpx;
			margin-right: 21rpx;
		}

		view {
			color: rgba(26, 26, 26, 1);
			font-size: 28rpx;
		}
	}
}

.img-area {
	position: relative;
	width: 100%;
	// height: 1096rpx;
	// flex: 1;
	background: #000;
	overflow: hidden;
}

.main-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
}

.side-actions {
	position: absolute;
	right: 28rpx;
	bottom: 10rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 20;
	transform: translate3d(0, 0, 0);
}

.action-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 24rpx;
	gap: 5rpx;

	image {
		width: 84rpx;
		height: 84rpx;
		object-fit: contain;
		margin-bottom: -10rpx;
	}
}

.action-text {
	color: #fff;
	font-size: 22rpx;
	margin-top: 4rpx;
	text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.48);
}

.content-area {
	border-radius: 0 0 18rpx 18rpx;
	margin: 0 auto;
	width: 100%;
	padding: 24rpx 18rpx 18rpx 18rpx;
}

.desc {
	font-size: 26rpx;
	color: rgba(26, 26, 26, 1);
	font-weight: bold;
	margin-bottom: 12rpx;
}

.extra {
	font-size: 22rpx;
	color: rgba(26, 26, 26, 1);
	margin-bottom: 18rpx;
	line-height: 1.7;
	max-height: 300rpx;
	overflow: scroll;
}

.date {
	font-size: 20rpx;
	color: rgba(179, 179, 179, 1);
	margin-bottom: 8rpx;
}

.more-tip {
	text-align: center;
	color: #bbb;
	font-size: 20rpx;
	margin-top: 8rpx;
}

.logout-btn {
	width: 396rpx;
	height: 76rpx;
	background: #222;
	color: #fff;
	font-size: 30rpx;
	border-radius: 76rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	position: fixed;
	left: 190rpx;
	bottom: 40rpx;
	z-index: 10;
}
</style>