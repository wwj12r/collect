<template>
	<view>
		<!-- 遮罩层 -->
		<view v-if="show" class="popup-mask" @click="onMask"></view>
		<!-- 弹窗内容 -->
		<view v-if="show" class="reject-popup">
			<u-icon type="closeempty" size="32" color="#888" class="close-btn" @click="close" />
			<image class="emoji" src="/static/index/fail.png" mode="widthFix" />
			<view class="field">
				<view class="field-label">拒绝原因</view>
				<view class="field-area">
					<!-- 下拉选择框 -->
					<view class="select" @click="toggleOptions">
						<text class="placeholder" v-if="selectedIndex === -1">请选择</text>
						<text v-else class="selected">{{ reasons[selectedIndex] || '自定义输入' }}</text>
						<u-icon name="arrow-down" size="26rpx" color="#999" />
					</view>
					<view class="options" v-if="showOptions">
						<view class="option" v-for="(opt, idx) in reasons" :key="idx" @click.stop="selectOption(idx)">{{ opt }}</view>
						<view class="option custom" @click.stop="selectCustom">
							<uni-icons type="compose" size="26rpx" color="#999" />自定义输入</view>
					</view>
					<view class="custom-input" v-if="useCustom && !showOptions">
						<u-textarea v-model="customText" :placeholder="customPlaceholder" :autoHeight="true" :maxlength="200" />
					</view>
				</view>
			</view>
			<view class="btn-row">
				<button class="btn cancel" @click="onCancel">取消</button>
				<button class="btn confirm" @click="onConfirm">确定</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
	show: { type: Boolean, default: false },
	reasons: {
		type: Array,
		default: () => ['不符合报名条件', '资料信息不全']
	},
	forceReason: { type: Boolean, default: true },
	customPlaceholder: { type: String, default: '请输入拒绝原因（最多30字）' }
})

const emit = defineEmits(['update:show', 'cancel', 'confirm'])

const selectedIndex = ref(-1)
const showOptions = ref(false)
const useCustom = ref(false)
const customText = ref('')

watch(() => props.show, (v) => {
	if (v) {
		selectedIndex.value = -1
		showOptions.value = false
		useCustom.value = false
		customText.value = ''
	}
})

function onMask() {
	// 点击遮罩不关闭，防误触。如需关闭，改成 close()
}

function close() {
	emit('update:show', false)
}

function toggleOptions() {
	showOptions.value = !showOptions.value
}

function selectOption(idx) {
	selectedIndex.value = idx
	useCustom.value = false
	showOptions.value = false
}

function selectCustom() {
	selectedIndex.value = 10
	useCustom.value = true
	showOptions.value = false
}

function onCancel() {
	emit('cancel')
	close()
}

function onConfirm() {
	let reason = ''
	if (useCustom.value) {
		reason = customText.value.trim()
		if (props.forceReason && !reason) {
			return uni.showToast({ title: '请输入拒绝原因', icon: 'none' })
		}
	} else {
		if (selectedIndex.value === -1) {
			if (props.forceReason) return uni.showToast({ title: '请选择拒绝原因', icon: 'none' })
		} else {
			reason = props.reasons[selectedIndex.value]
		}
	}
	emit('confirm', { reason, custom: useCustom.value })
	close()
}
</script>

<style scoped>
.popup-mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.45);
	z-index: 1000;
}

.reject-popup {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background: #fff;
	border-radius: 24rpx;
	width: 600rpx;
	height: 880rpx;
	z-index: 1001;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 93rpx 60rpx 60rpx 60rpx;
	box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.10);
}

.close-btn {
	position: absolute;
	right: 24rpx;
	top: 24rpx;
	z-index: 2;
}

.emoji {
	width: 220rpx;
	margin-bottom: 24rpx;
}

.field {
	width: 100%;
	display: flex;
	gap: 20rpx;

	.field-area {
		flex: 1;
	}
}

.field-label {
	font-size: 26rpx;
	color: #999;
	margin: 10rpx 0 12rpx 6rpx;
}

.select {
	width: 100%;
	height: 54rpx;
	border: 2rpx solid #eaeaea;
	border-radius: 100rpx;
	padding: 0 24rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #333;
}

.placeholder {
	color: #bbb;
}

.options {
	width: 100%;
	background: #fff;
	border: 2rpx solid #eaeaea;
	border-top: none;
	border-radius: 0 0 16rpx 16rpx;
	margin-top: -2rpx;
	max-height: 320rpx;
	overflow: auto;
}

.option {
	padding: 22rpx 24rpx;
	font-size: 26rpx;
	color: #333;
	border-top: 2rpx solid #f6f6f6;
	&.custom{
		color: #999;
	}
}

.custom-input {
	width: 100%;
	margin-top: 20rpx;
	background: #f7f7f7;
	border-radius: 16rpx;
	padding: 16rpx;
}

.btn-row {
	width: 100%;
	display: flex;
	justify-content: space-between;
	gap: 58rpx;
	margin-top: auto;
}

.btn {
	flex: 1;
	height: 76rpx;
	border-radius: 44rpx;
	font-size: 30rpx;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
}

.cancel {
	border: 1px solid #222;
	background: #fff;
	color: #222;
}

.confirm {
	background: #222;
	color: #fff;
}
</style>
