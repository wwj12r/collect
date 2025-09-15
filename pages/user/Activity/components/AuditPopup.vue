<template>
	<view v-if="show" class="audit-popup">
		<!-- 遮罩层 -->
		<view class="popup-mask" @click.self="close"></view>

		<!-- 弹窗内容 -->
		<view class="popup-content">
			<view class="popup-top">
				<view class="popup-close" @click="close">
					<u-icon name="close" size="20rpx" color="#fff"></u-icon>
					<!-- <u-icon type="closeempty" size="32" color="#888" class="close-btn" @click="close" /> -->
				</view>
			</view>

			<!-- 预览区域：swiper -->
			<view class="swiper-wrap">
				<swiper class="swiper" :current="currentIndex" @change="onSwiperChange">
					<swiper-item v-for="(item, idx) in items" :key="idx">
						<view class="slide">
							<image v-if="getItemType(item) === 'image'" :src="getFullImageUrl(getItemSrc(item))" mode="aspectFit" class="slide-image" />
							<video v-else :src="getItemSrc(item)" controls class="slide-video"></video>
						</view>
					</swiper-item>
				</swiper>
				<!-- <view class="indicator" v-if="items && items.length">
					{{ currentIndex + 1 }}/{{ items.length }}
				</view> -->
			</view>

			<!-- 底部操作栏 -->
			<view class="action-bar">
				<button class="btn reject" @click="onReject">拒绝</button>
				<button class="btn approve" @click="onApprove">同意</button>
			</view>
		</view>
		<AuditReject v-model:show="showReject" :reasons="['不符合报名条件', '资料信息不全']" @cancel="showReject = false" @confirm="onRejectConfirm" />
	</view>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { getFullImageUrl } from '../../../../utils/utils'
import AuditReject from './AuditReject.vue'

const props = defineProps({
	show: { type: Boolean, default: false },
	items: { type: Array, default: () => [] }, // 支持字符串或对象，自动取 src
	modelValue: { type: Number, default: 0 }, // 初始位置
	itemKey: { type: String, default: 'id' }, // 对象 key
	srcKey: { type: String, default: 'src' }, // 资源地址字段
	typeKey: { type: String, default: 'type' }, // 资源类型 image/video
})

const emit = defineEmits(['update:show', 'approve', 'reject', 'update:modelValue'])

const currentIndex = ref(0)
const showReject = ref(false)

watch(() => props.show, (visible) => {
	if (visible) currentIndex.value = clampIndex(props.modelValue)
})

watch(() => props.modelValue, (val) => {
	currentIndex.value = clampIndex(val)
})

function clampIndex(i) {
	const len = props.items?.length || 0
	if (len === 0) return 0
	return Math.max(0, Math.min(i, len - 1))
}

function close() {
	emit('update:show', false)
}

function onSwiperChange(e) {
	const idx = e?.detail?.current || 0
	currentIndex.value = idx
	emit('update:modelValue', idx)
}

function getItemKey(item, idx) {
	if (!item) return idx
	if (typeof item === 'string') return item + '_' + idx
	return item[props.itemKey] ?? idx
}

function getItemType(item) {
	if (!item) return 'image'
	if (typeof item === 'string') {
		return guessTypeByUrl(item)
	}
	return item[props.typeKey] || guessTypeByUrl(item[props.srcKey]) || 'image'
}

function getItemSrc(item) {
	if (!item) return ''
	if (typeof item === 'string') return item
	return item[props.srcKey] || ''
}

function guessTypeByUrl(url) {
	if (!url) return 'image'
	const lower = String(url).toLowerCase()
	if (/(\.mp4|\.mov|\.m4v|\.avi|\.webm)$/.test(lower)) return 'video'
	return 'image'
}

function onApprove() {
	const item = props.items?.[currentIndex.value]
	emit('approve', { index: currentIndex.value, item })
}

function onReject() {
	const item = props.items?.[currentIndex.value]
	showReject.value = true
	// emit('reject', { index: currentIndex.value, item })
}

function onRejectConfirm(reason) {
	console.log(reason)
	showReject.value = true
	emit('reject', reason.reason)
}
</script>

<style scoped lang="scss">
.audit-popup {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 1000;
	width: 100%;
	height: 100%;
}

.popup-mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.8);
}

.popup-content {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	.popup-top {
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 32rpx;

		.popup-close {
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 2px solid #fff;
		}

		.u-icon {
			width: 33rpx;
			height: 33rpx;
		}
	}
}

.swiper-wrap {
	position: relative;
	flex: none;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	width: 667rpx;
	height: 1164rpx;
	overflow: hidden;
	margin: 0 auto;
}

.swiper {
	width: 100%;
	height: 100%;
}

.slide {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #000;
	border-radius: 20rpx;
	overflow: hidden;
}

.slide-image {
	width: 100%;
	height: 100%;
}

.slide-video {
	width: 100%;
	height: 100%;
}

.indicator {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 160rpx;
	text-align: center;
	color: #fff;
	font-size: 24rpx;
	opacity: 0.8;
}

.action-bar {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 12rpx 124rpx;
	padding-bottom: 108rpx;
	display: flex;
	gap: 54rpx;
	box-shadow: 0 -8rpx 24rpx rgba(0, 0, 0, 0.03);
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
	color: #fff;
}

.reject {
	background: rgb(113 112 112 / 50%);
}

.approve {
	background: #222;
}
</style>
