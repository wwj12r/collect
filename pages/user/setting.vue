<template>
	<view class="setting-page">
		<view class="info-list">
			<!-- 头像 -->
			<view class="info-row" @click="changeAvatar">
				<text class="label">头像</text>
				<view class="info">
					<image class="avatar" :src="imgBaseUrl + user.headimg" />
					<uni-icons type="right" size="20" color="#bbb" />
				</view>
			</view>
			<!-- 用户ID -->
			<view class="info-row">
				<text class="label">用户ID</text>
				<view class="info">
					<text class="value gray">{{ user.id }}</text>
					<uni-icons type="compose" size="18" color="#bbb" @click="copyId" />
				</view>
			</view>
			<!-- 用户名称 -->
			<view class="info-row">
				<text class="label">用户名称</text>
				<view class="info">
					<text class="value">{{ user.nickname }}</text>
					<uni-icons type="compose" size="18" color="#bbb" @click="editName" />
				</view>
			</view>
			<!-- 手机号码 -->
			<view class="info-row">
				<text class="label">手机号码</text>
				<view>
					<view class="value orange info">{{ user.phone ? user.phone : '点击获取手机号' }}
						<button class="phone-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button>
					</view>

				</view>
			</view>
		</view>
		<!-- 退出按钮 -->
		<button class="logout-btn" @click="logout">退出</button>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useToken } from '../../hooks/userToken'
import { UserApi } from '../../services/user'
import { IndexApi } from '../../services'
import { uploadImg } from '../../utils/utils'
import { imgBaseUrl } from '../../utils/enums'
const { tokenRef, setToken, clearToken } = useToken()

const user = ref({})

function changeAvatar() {
	uni.chooseImage({
		count: 1,
		success: async (res) => {
			const photos = await uploadImg(res.tempFilePaths)
			const photo = photos.map(i => i.imgUrl)[0]
			user.value.headimg = photo
			await UserApi.postUploadhead({ photo })
			uni.showToast({ title: '修改头像成功！' })
		}
	})
}
function copyId() {
	uni.setClipboardData({
		data: user.value.id,
		success: () => {
			uni.showToast({ title: '已复制', icon: 'none' })
		}
	})
}
function editName() {
	uni.showModal({
		title: '修改用户名',
		editable: true,
		placeholderText: '请输入新用户名',
		success: async (res) => {
			if (res.confirm && res.content) {
				user.value.nickname = res.content
				await UserApi.pustNickname(user.value.id, res.content)
				uni.showToast({ title: '修改头像成功！' })
			}
		}
	})
}
function logout() {
	uni.showModal({
		title: '提示',
		content: '确定要退出登录吗？',
		success: res => {
			if (res.confirm) {
				clearToken()
				uni.showToast({ title: '已退出', icon: 'none' })
				uni.navigateBack()
				// 这里可清除登录状态并跳转
			}
		}
	})
}

const getPhoneNumber = (e) => {
	console.log(111)
	console.log(e)
	if (e.detail.errMsg === 'getPhoneNumber:ok') {
		// 获取到加密数据
		const encryptedData = e.detail.encryptedData;
		const iv = e.detail.iv;

		// 获取用户登录凭证code
		uni.login({
			provider: 'weixin',
			success: (loginRes) => {
				const code = loginRes.code;
				IndexApi.postPhonenumber({
					code,
					encryptedData,
					iv
				}).then(res => console.log('aaa', res))
			}
		});
	} else {
		uni.showToast({
			title: '获取手机号失败',
			icon: 'none'
		});
	}
}
onMounted(() => {
	// getList()
	UserApi.getUser().then(res => user.value = res)
})
</script>

<style scoped lang="scss">
.setting-page {
	background: #f7f7f7;
	min-height: 100vh;
	padding-bottom: 80rpx;
}

.info-list {
	background: #fff;
	border-radius: 18rpx;
	margin: 24rpx 18rpx 0 18rpx;
	overflow: hidden;
}

.info-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 24rpx;
	height: 80rpx;
	border-bottom: 1rpx solid #f2f2f2;
	position: relative;

	.info {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}
}

.info-row:last-child {
	border-bottom: none;
}

.label {
	font-size: 22rpx;
	color: #222;
	width: 160rpx;
	flex-shrink: 0;
}

.value {
	font-size: 22rpx;
	color: #222;
	display: flex;
	justify-content: end;
	flex: 1;
}

.gray {
	color: #bbb;
}

.orange {
	color: #ff6600;
	position: relative;

	.phone-button {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
}

.avatar {
	width: 48rpx;
	height: 48rpx;
	border-radius: 50%;
	margin-right: 8rpx;
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
	bottom: 100rpx;
	z-index: 10;
}
</style>