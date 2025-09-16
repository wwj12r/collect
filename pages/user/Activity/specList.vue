<template>
	<view class="spec-page">
		<scroll-view scroll-y class="section-list" v-if="specs.length">
			<view class="section" v-for="(spec, si) in specs" :key="spec.id">
				<view class="section-header">
					<uni-easyinput class="title-input" v-model="spec.title" :inputBorder="false" placeholder="请输入日期/场次 如:9月1日/早场" />
					<view class="right-icons">
						<uni-icons type="plusempty" size="24" color="#ff6600" @click="addTime(si)" />
						<uni-icons type="trash" size="22" color="#bbb" @click="removeSpec(si)" />
					</view>
				</view>
				<view class="divider"></view>
				<view class="time-list">
					<view class="time-item" v-for="(t, ti) in spec.contentList" :key="t.id">
						<view class="time-card">
							<u-input type="time" class="time-input center-input" v-model="t.content" :clear-icon="false" input-align="center" placeholder="输入时间段 如:9:00-12:00">
							</u-input>
						</view>
						<uni-icons class="add-mini" type="plusempty" size="22" color="#ff6600" @click="addTime(si, ti + 1)" />
						<uni-icons class="del-mini" type="closeempty" size="20" color="#bbb" @click="removeTime(si, ti, spec.contentList)" />
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-else class="empty">
			<image src="/static/user/activity-empty.png" mode="widthFix" />
			<view>还没有规格</view>
			<text>点击下方新建日期/场次</text>
		</view>

		<view class="new-section" @click="addSpec()">新增日期/场次</view>

		<view class="footer">
			<button class="confirm" @click="confirm">确定</button>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { eventEmitter, EVENT_TYPE } from '@/utils/eventEmitter'

const specs = ref([])

function load() {
	const cache = uni.getStorageSync('activity_specs_v2')
	if (Array.isArray(cache)) specs.value = cache
	else addSpec()
}

function persist() {
	uni.setStorageSync('activity_specs_v2', specs.value)
	eventEmitter.emit(EVENT_TYPE.ACTIVITY_SPEC_UPDATED, specs.value)
}

function addSpec() {
	specs.value.push({ id: Date.now().toString(), title: '', contentList: [{ id: `${Date.now()}-t1`, content: '', end: '' }] })
	persist()
}

function removeSpec(index) {
	uni.showModal({
		title: '确认删除', content: '删除该场次？', success: (res) => {
			if (res.confirm) {
				specs.value.splice(index, 1)
				persist()
			}
		}
	})
}

function addTime(specIndex, insertAt) {
	const s = specs.value[specIndex]
	const arr = s.contentList
	const t = { id: `${Date.now()}-${Math.random()}`, content: '', end: '' }
	if (typeof insertAt === 'number') arr.splice(insertAt, 0, t)
	else arr.push(t)
	persist()
}

function removeTime(specIndex, timeIndex, length) {
	if (length.length === 1) return
	const s = specs.value[specIndex]
	s.contentList.splice(timeIndex, 1)
	persist()
}

function confirm() {
	// 校验：开始<结束，且同一规格内不重叠（边界相等允许）
	const toMinutes = (timeStr) => {
		if (!timeStr) return NaN
		const parts = String(timeStr).trim().split(':')
		if (parts.length < 2) return NaN
		const h = Number(parts[0])
		const m = Number(parts[1])
		const s = parts[2] !== undefined ? Number(parts[2]) : 0
		if (
			Number.isNaN(h) || Number.isNaN(m) || Number.isNaN(s) ||
			h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59
		) return NaN
		return h * 60 + m + s / 60
	}

	const normalized = specs.value.map(s => ({
		title: s.title,
		contentList: s.contentList.filter(t => t.content).map(i => ({
			content: i.content
		}))
	}))

	console.log(normalized)

	uni.setStorageSync('activity_specs_v2', normalized)
	eventEmitter.emit(EVENT_TYPE.ACTIVITY_SPEC_UPDATED, normalized)
	uni.showToast({ title: '已保存', icon: 'success' })
	setTimeout(() => uni.navigateBack(), 300)
}

const onGet = () => eventEmitter.emit(EVENT_TYPE.ACTIVITY_SPEC_TRANSFER, specs.value)
onMounted(() => {
	load()
	eventEmitter.on(EVENT_TYPE.ACTIVITY_SPEC_GET, onGet)
})
onUnmounted(() => {
	eventEmitter.off(EVENT_TYPE.ACTIVITY_SPEC_GET, onGet)
})
</script>

<style scoped lang="scss">
.spec-page {
	min-height: 100vh;
	background: #fafafa;
	padding: 20rpx 20rpx 140rpx;
}

.section-list {
	max-height: calc(100vh - 240rpx);
}

.section {
	background: #fff;
	border-radius: 16rpx;
	padding: 20rpx;
	margin-bottom: 20rpx;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.title-input {
	flex: 1;
}

.right-icons {
	display: flex;
	align-items: center;
	gap: 16rpx;
	margin-left: 16rpx;
}

.divider {
	height: 2rpx;
	background: #f0f0f0;
	margin: 16rpx 0;
}

.time-list {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.time-item {
	position: relative;
}

.time-card {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10rpx;
	border-radius: 16rpx;
	height: 88rpx;
	width: 550rpx;

	.time-input {
		text-align: center;
	}
}

.time-text {
	font-size: 26rpx;
	color: #1a1a1a;
	padding: 0 10rpx;
}

.dash {
	color: #999;
	font-size: 28rpx;
}

.add-mini {
	position: absolute;
	right: 0rpx;
	top: 50%;
	transform: translateY(-50%);
}

.del-mini {
	position: absolute;
	right: 56rpx;
	top: 50%;
	transform: translateY(-50%);
}

.new-section {
	margin: 16rpx 0 0;
	border: 2rpx dashed #e6e6e6;
	border-radius: 16rpx;
	color: #999;
	text-align: center;
	padding: 32rpx 0;
}

.empty {
	text-align: center;
	color: #999;
	padding: 120rpx 0 40rpx;
}

.empty image {
	width: 220rpx;
	margin-bottom: 16rpx;
}

.footer {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background: #fafafa;
	padding: 20rpx;
}

.confirm {
	width: 90%;
	margin: 0 auto;
	background: #1a1a1a;
	color: #fff;
	height: 88rpx;
	border-radius: 44rpx;
	font-size: 30rpx;
}
</style>
