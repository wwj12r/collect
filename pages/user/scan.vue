<template>
	<view class="verify-page">
		<template v-if="!scansuc">
			<button class="verify-btn init" @click="scanCode">核销</button>
		</template>
		<template v-else-if="orderSn">
			<image class="imgage-suc" src="/static/index/suc.png"></image>
			<view class="info-card">
				<view class="info-row">
					<text class="label">订单编号：</text>
					<text class="value">{{ orderSn }}</text>
				</view>
				<view class="info-row">
					<text class="label">发起人：</text>
					<text class="value">{{ userName }}</text>
				</view>
			</view>
			<button class="verify-btn" @click="scanCode">继续核销</button>
		</template>
		<template v-else>
			<image class="imgage-fail" src="/static/index/fail.png"></image>
			<view class="info-warning">核销失败</view>
			<view class="info-tips">二维码失效或已核销，请重新扫码</view>
			<button class="verify-btn" @click="scanCode">重新核销</button>
		</template>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { ActivityApi } from '../../services/activity'
import { onLoad } from '@dcloudio/uni-app'

// 这里可以通过路由参数或接口获取实际数据
const orderSn = ref('')
const userName = ref('')
const scansuc = ref(false)

onLoad(async (options) => {
	if (options.code) {
		return getCode(options.code)
	}

	if (options.id) {
		const response = await ActivityApi.fetchActivityDetail(options.id)
		const code = response.content.code
		return getCode(code)
	}
})

function scanCode() {
	uni.scanCode({
		onlyFromCamera: true,
		success: (res) => {
			// 这里可以处理扫码结果 res.result
			console.log('扫码结果:', res)
			scansuc.value = true
			if (res.errMsg === 'scanCode:ok' && res.result) {
				getCode(res.result)
			}
		},
		fail: (err) => {
			uni.showToast({ title: '扫码失败', icon: 'none' })
		}
	})
}

const getCode = (code) => {
	ActivityApi.getQrcodeConfirm({ code: code }).then(res => {
		orderSn.value = res?.orderSn || ''
		userName.value = res?.nickname || ''
		if (res.msg) {
			if (res.ret == 0) {
				uni.showToast({ title: res.msg })
			} else {
				uni.showToast({ title: res.msg, icon: 'none' })
			}
		}
	})
}
</script>

<style scoped lang="scss">
.verify-page {
	min-height: 100vh;
	background: #fafafa;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 80rpx;
}

.imgage-suc {
	width: 380rpx;
	height: 384rpx;
	margin: 100rpx auto;
}

.imgage-fail {
	width: 330rpx;
	height: 278rpx;
	margin: 100rpx auto 0;
}

.info-warning {
	margin-top: 100rpx;
	font-size: 45rpx;
	font-weight: bold;
	color: rgba(26, 26, 26, 1);
}

.info-tips {
	margin-top: 28rpx;
	font-size: 30rpx;
	color: rgba(153, 153, 153, 1);
	margin-bottom: 50rpx;
}

.info-card {
	background: rgba(242, 242, 242, 1);
	border-radius: 18rpx;
	width: 90vw;
	max-width: 600rpx;
	padding: 40rpx 30rpx 30rpx 30rpx;
	margin-bottom: 80rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}

.info-row {
	display: flex;
	align-items: center;
	margin-bottom: 24rpx;
}

.label {
	color: #888;
	font-size: 26rpx;
	width: 160rpx;
	flex-shrink: 0;
}

.value {
	color: #222;
	font-size: 26rpx;
	word-break: break-all;
}

.verify-btn {
	width: 369rpx;
	height: 76rpx;
	background: #222;
	color: #fff;
	font-size: 32rpx;
	border-radius: 50rpx;
	padding: 22rpx 0;
	font-weight: bold;
	margin-top: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;

	&.init {
		margin-top: 200rpx;
	}
}
</style>