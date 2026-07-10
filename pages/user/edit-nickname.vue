<template>
	<view class="edit-nickname-page">
		<view class="card">
			<text class="label">头像</text>
			<button class="avatar-picker" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image class="avatar" :src="avatarPreview" mode="aspectFill" />
				<text class="avatar-hint">点击获取微信头像</text>
			</button>
		</view>

		<view class="card">
			<text class="label">用户昵称</text>
			<input
				v-model="nickname"
				type="nickname"
				class="nickname-input"
				placeholder="点击获取微信昵称"
				:maxlength="20"
				@blur="onNicknameBlur"
			/>
			<text class="hint">点击输入框，可使用微信昵称快速填充</text>
		</view>

		<button class="save-btn" :disabled="saving" @click="saveProfile">
			{{ saving ? '保存中…' : '保存' }}
		</button>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { UserApi } from '../../services/user'
import { getFullImageUrl, miniProgramLogin, uploadImg } from '../../utils/utils'

const DEFAULT_AVATAR = '/static/logo.png'

const user = ref({})
const nickname = ref('')
const avatarTempPath = ref('')
const saving = ref(false)

const avatarPreview = computed(() => {
	if (avatarTempPath.value) return avatarTempPath.value
	if (user.value?.headimg) return getFullImageUrl(user.value.headimg)
	return DEFAULT_AVATAR
})

onLoad(() => {
	const token = String(uni.getStorageSync('token') || '')
	if (!token) return
	UserApi.getUser()
		.then((res) => {
			user.value = res || {}
			nickname.value = res?.nickname || ''
		})
		.catch(() => {})
})

function onChooseAvatar(event) {
	const url = String(event?.detail?.avatarUrl || '').trim()
	if (!url) return
	avatarTempPath.value = url
}

function onNicknameBlur(event) {
	const value = String(event?.detail?.value ?? nickname.value ?? '').trim()
	if (value) nickname.value = value
}

async function saveProfile() {
	const value = nickname.value.trim()
	if (!value) {
		uni.showToast({ title: '请输入昵称', icon: 'none' })
		return
	}
	if (saving.value) return
	saving.value = true
	try {
		await miniProgramLogin(true)
		const info = await UserApi.getUser()
		user.value = info || {}
		if (!user.value?.id) {
			throw new Error('用户信息未加载')
		}

		await UserApi.pustNickname(user.value.id, value)
		user.value.nickname = value

		if (avatarTempPath.value) {
			const photos = await uploadImg([avatarTempPath.value])
			const photo = photos?.[0]?.imgUrl
			if (photo) {
				await UserApi.pustNickname(user.value.id, '', photo)
				user.value.headimg = photo
			}
		}

		uni.showToast({ title: '资料已更新', icon: 'success' })
		setTimeout(() => uni.navigateBack(), 600)
	} catch (_) {
		uni.showToast({ title: '保存失败，请重试', icon: 'none' })
	} finally {
		saving.value = false
	}
}
</script>

<style scoped lang="scss">
.edit-nickname-page {
	min-height: 100vh;
	background: #f7f7f7;
	padding: 24rpx 18rpx;
	box-sizing: border-box;
}

.card {
	background: #fff;
	border-radius: 18rpx;
	padding: 24rpx;
	margin-bottom: 18rpx;
}

.label {
	display: block;
	font-size: 26rpx;
	color: #222;
	font-weight: 600;
	margin-bottom: 16rpx;
}

.avatar-picker {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12rpx;
	padding: 0;
	margin: 0;
	border: none;
	background: transparent;
	line-height: 1.4;
}

.avatar-picker::after {
	border: none;
}

.avatar {
	width: 128rpx;
	height: 128rpx;
	border-radius: 50%;
	background: #f0f0f0;
}

.avatar-hint {
	font-size: 22rpx;
	color: #999;
}

.nickname-input {
	width: 100%;
	height: 80rpx;
	padding: 0 20rpx;
	box-sizing: border-box;
	border: 1rpx solid #eee;
	border-radius: 12rpx;
	font-size: 28rpx;
	color: #222;
	background: #fafafa;
}

.hint {
	display: block;
	margin-top: 12rpx;
	font-size: 22rpx;
	color: #999;
	line-height: 1.5;
}

.save-btn {
	margin-top: 8rpx;
	width: 100%;
	height: 88rpx;
	line-height: 88rpx;
	border-radius: 999rpx;
	background: #222;
	color: #fff;
	font-size: 30rpx;
	font-weight: 700;
}

.save-btn::after {
	border: none;
}

.save-btn[disabled] {
	opacity: 0.6;
}
</style>
