<template>
	<view class="publish-idea-page">
		<!-- 顶部导航栏（如用uni-app自带导航可省略） -->
		<!-- <uni-nav-bar title="发布创意" left-icon="back" /> -->

		<!-- 图片上传 -->
		<view class="img-upload" @click="chooseImage">
			<image v-if="imgUrl" :src="imgUrl" class="img" mode="aspectFill" />
			<view v-else class="img-placeholder">
				<image class="add-icon" src="/static/index/add.png" />
			</view>
		</view>

		<!-- 标题输入 -->
		<input class="title-input" v-model="title" placeholder="添加标题" maxlength="30" placeholder-class="input-placeholder" />

		<!-- 正文输入 -->
		<textarea class="content-input" v-model="content" placeholder="添加正文" placeholder-class="input-placeholder" maxlength="500" auto-height />

		<!-- 底部按钮 -->
		<button class="submit-btn" @click="submit">发布活动</button>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { ActivityApi } from '../../../services/activity'
import { uploadImg } from '../../../utils/utils'

const imgUrl = ref('')
const title = ref('')
const content = ref('')

function chooseImage() {
	uni.chooseImage({
		count: 1,
		success: res => {
			imgUrl.value = res.tempFilePaths[0]
		}
	})
}

const submit = async () => {
	if (!imgUrl.value) {
		uni.showToast({ title: '请上传图片', icon: 'none' })
		return
	}
	if (!title.value) {
		uni.showToast({ title: '请输入标题', icon: 'none' })
		return
	}
	if (!content.value) {
		uni.showToast({ title: '请输入正文', icon: 'none' })
		return
	}
	uni.showLoading({ title: '发布中...' })
	const photo = await uploadImg([imgUrl.value]).then(res => res[0].imgUrl)
	console.log(photo)
	const res = await ActivityApi.postContentcreate({
		title: title.value,
		content: content.value,
		photo
	})
	uni.showToast({ title: '发布成功', icon: 'success' })
	uni.navigateBack()
}
</script>

<style scoped>
.publish-idea-page {
	background: #f7f7f7;
	min-height: 100vh;
	padding: 0 0 80rpx 0;
	position: relative;
}

.img-upload {
	width: 120rpx;
	height: 120rpx;
	margin: 32rpx 0 0 32rpx;
	border-radius: 12rpx;
	background: #f2f2f2;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.img-placeholder {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	image{
		width: 30rpx;
		height: 30rpx;
	}
}

.title-input {
	margin: 32rpx 32rpx 0 32rpx;
	font-size: 28rpx;
	color: #222;
	border: none;
	border-bottom: 1rpx solid #eee;
	background: transparent;
	padding: 16rpx 0;
}

.content-input {
	margin: 0 32rpx;
	font-size: 24rpx;
	color: #222;
	border: none;
	background: transparent;
	min-height: 120rpx;
	padding: 16rpx 0;
}

.input-placeholder {
	color: #bbb;
	font-size: 24rpx;
}

.submit-btn {
	width: 80%;
	background: #222;
	color: #fff;
	font-size: 30rpx;
	border-radius: 40rpx;
	padding: 18rpx 0;
	font-weight: bold;
	position: fixed;
	left: 10%;
	bottom: 40rpx;
	z-index: 10;
}
</style>