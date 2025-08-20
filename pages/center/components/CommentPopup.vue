<template>
	<view v-if="show" class="comment-popup">
		<!-- 遮罩层 -->
		<view class="popup-mask" @click.self="close"></view>

		<!-- 弹窗内容 -->
		<view class="popup-content">
			<view class="popup-top">
				<view class="popup-close" @click="close">
					<u-icon name="close" size="20rpx" color="rgba(102, 102, 102, 1)"></u-icon>
				</view>
			</view>
			<!-- 评论列表 -->
			<view class="comments-section">

				<scroll-view class="comments-list" scroll-y @scrolltolower="fetchComments()">
					<view class="comment-item" v-if="comments.length" v-for="comment in comments" :key="comment.id">
						<image :src="getFullImageUrl(comment.formUserInfo?.headimg)" class="comment-avatar" />
						<view class="comment-content">
							<view class="comment-user">{{ comment.formUserInfo?.nickname }}</view>
							<view class="comment-text">{{ comment.comment }}</view>
							<view class="comment-meta">
								<text class="comment-time">{{ comment.createTime }}</text>
								<text class="comment-location">{{ comment.location }}</text>
							</view>
						</view>
						<view class="comment-like" @click="like(comment.id)">
							<!-- <image src="/static/center/heart.png"></image> -->
							<u-icon name="heart" v-if="!comment.isLike"></u-icon>
							<u-icon name="heart-fill" v-if="comment.isLike"></u-icon>
							<text class="like-count">{{ comment.like }}</text>
						</view>
					</view>
					<view class="comment-empty" v-if="isEmpty">
						<image src="/static/center/empty.png"></image>
						<view>沉默到吐不出墨水…</view>
						<text>发条评论参与讨论吧</text>
					</view>
					<view v-if="comments.length" class="bottom-line">- 这是底线 -</view>
				</scroll-view>

			</view>

			<!-- 底部输入框 -->
			<view class="input-section">
				<u-input class="comment-input" :customStyle="{
					width: '100%',
					height: '80rpx',
					background: '#f5f5f5',
					borderRadius: '380rpx',
					padding: '0 24rpx',
					fontSize: '26rpx',
					marginRight: '16rpx',
				}" v-model="commentText" placeholder="爱评论的人运气都不差" placeholder-class="input-placeholder" @confirm="submitComment" />
				<view class="input-actions">
					<u-icon type="at" size="24" color="#666" />
					<u-icon type="chatbubble" size="24" color="#666" style="margin-left: 16rpx;" />
					<u-icon type="image" size="24" color="#666" style="margin-left: 16rpx;" />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { CenterApi } from '../../../services/center'
import { getFullImageUrl } from '../../../utils/utils'

const props = defineProps({
	show: Boolean,
	id: Number,
})
const comments = ref([])
const page = ref(1)
const pageSize = 10
const loading = ref(false)
const finished = ref(false)
const isEmpty = ref(false)

// 监听 show 变化，当弹窗打开时请求接口
watch(() => props.show, (newVal) => {
	if (newVal) {
		fetchComments()
	}
})

// 请求评论列表接口
const fetchComments = async (refresh) => {
	if (loading.value || finished.value) return
	if (refresh) {
		comments.value = []
		page.value = 1
		finished.value = false;
	}
	loading.value = true
	try {
		const res = await CenterApi.getArticlecomment({
			aid: props.id,
			page: page.value,
			perPage: pageSize,
		})
		if (res.content && res.content.length > 0) {
			comments.value.push(...res.content)
			page.value++
		} else {
			finished.value = true
			if (page.value === 1) {
				isEmpty.value= true
			}
		}
		loading.value = false
	} finally {
		loading.value = false
	}
}

const emit = defineEmits(['update:show', 'comment'])

const commentText = ref('')


function close() {
	emit('update:show', false)
}

const submitComment = async () => {
	if (!commentText.value.trim()) return
	const res = await CenterApi.postArticlecomment({
		aid: props.id,
		comment: commentText.value,
	})
	commentText.value = ''
	uni.showToast({ title: '评论成功！' })
	fetchComments(true)
	// if (commentText.value.trim()) {
	emit('comment', commentText.value)
	// 	commentText.value = ''
	// }
}

const like = async (id) => {
	const res = await CenterApi.postArticlecommentLike({ commentId: id })
	uni.showToast({ title: '点赞成功！' })
	comments.value = comments.value.map(item => item.id == id ? { ...item, isLike: 1, like: Number(item.like) + 1 } : item)
	// fetchComments(true)
}
</script>

<style scoped lang="scss">
.comment-popup {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 1072rpx;
	width: 100%;
	z-index: 1000;
	border-radius: 20rpx 20rpx 0 0;
	overflow: hidden;
}

.popup-mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
}

.popup-content {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: #fff;
	display: flex;
	flex-direction: column;

	.popup-top {
		width: 100%;
		padding-right: 32rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.popup-close {
			width: 33rpx;
			height: 33rpx;
			background-color: rgba(230, 230, 230, 1);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.u-icon {
			width: 33rpx;
			height: 33rpx;
		}
	}
}

.top-nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 24rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.user-info {
	display: flex;
	align-items: center;
}

.avatar {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	margin-right: 12rpx;
}

.username {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.nav-actions {
	display: flex;
	align-items: center;
}

.video-area {
	position: relative;
	height: 400rpx;
	background: #000;
}

.video-cover {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.video-progress {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 4rpx;
	background: rgba(255, 255, 255, 0.3);
}

.progress-bar {
	width: 30%;
	height: 100%;
	background: #fff;
}

.comments-section {
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.comments-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.comments-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.comments-list {
	flex: 1;
	padding: 0 24rpx;
	padding-bottom: 80rpx;
	box-sizing: border-box;
	height: 100%;

	.comment-empty {
		display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		image {
			width: 196rpx;
			height: 218rpx;
		}

		view {
			font-weight: 500;
			margin-top: 67rpx;
			color: rgba(26, 26, 26, 1);
			font-size: 32rpx;
		}

		text {
			margin-top: 28rpx;
			font-size: 22rpx;
			color: rgba(153, 153, 153, 1);
		}
	}
}

.comment-item {
	display: flex;
	padding: 24rpx 0;
	align-items: center;
	border-bottom: 1rpx solid #f8f8f8;
}

.comment-avatar {
	width: 76rpx;
	height: 76rpx;
	border-radius: 50%;
	margin-right: 34rpx;
	flex-shrink: 0;
}

.comment-content {
	flex: 1;
}

.comment-user {
	font-size: 26rpx;
	color: rgba(153, 153, 153, 1);
	font-weight: 500;
	margin-bottom: 8rpx;
}

.comment-text {
	font-size: 28rpx;
	color: rgba(26, 26, 26, 1);
	line-height: 1.5;
	margin-bottom: 8rpx;
}

.comment-meta {
	display: flex;
	align-items: center;
	font-size: 22rpx;
	color: #999;
}

.comment-time {
	margin-right: 16rpx;
}

.comment-like {
	display: flex;
	align-items: center;
	margin-left: 16rpx;
	margin-right: 16rpx;
	gap: 8rpx;

	image {
		width: 24rpx;
		height: 20rpx;
	}
}

.like-count {
	font-size: 22rpx;
	color: #666;
	margin-left: 4rpx;
}

.bottom-line {
	text-align: center;
	font-size: 22rpx;
	color: #ccc;
	padding: 24rpx 0;
}

.input-section {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	align-items: center;
	padding: 20rpx 24rpx;
	margin-bottom: 30rpx;
	border-top: 1rpx solid #f0f0f0;
	background: #fff;
}

.comment-input {
	flex: 1;
	height: 80rpx;
	background: #f5f5f5;
	border-radius: 30rpx;
	padding: 0 24rpx;
	font-size: 26rpx;
	margin-right: 16rpx;
}

.input-placeholder {
	color: #999;
}

.input-actions {
	display: flex;
	align-items: center;
}
</style>