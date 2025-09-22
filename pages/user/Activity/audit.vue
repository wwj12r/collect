<template>
	<view class="activity-page">
		<!-- 顶部分类Tab -->
		<view class="tab-bar">
			<view v-for="(tab, idx) in tabs" :key="tab" :class="['tab-item', { active: tab.value === activeTab }]" @click="changeTab(tab.value)">
				{{ tab.label }}（{{ groupCount[tab.key] || 0 }}）
			</view>
		</view>

		<view class="activity-filter" v-if="list.length && specItemList.length">
			<view class="activity-filter-btn" @click="showSpecPopup = true">
				<image src="/static/user/filter.png"></image>
				按规格筛选
			</view>
			<view class="activity-filter-reset" v-if="specItemId" @click="specItemId=''">重制</view>
		</view>
		<!-- 活动卡片列表 -->
		<view class="activity-list" v-if="list.length">
			<view class="activity-card" v-for="(item, idx) in list" :key="item.id">
				<view class="order-row">
					<text class="signup-time">{{ item.state == 4 ? '核销' : '报名' }}时间：{{ item.createTime }}</text>
					<view class="card-statustext" :class="['status-text', buttonStatus[item.state].value]" v-if="item.state != 2">{{ buttonStatus[item.state].label }}</view>
				</view>
				<view class="card-main">
					<view class="card-content">
						<image :src="getFullImageUrl(item.headimg)" class="card-img" mode="aspectFill" />
						<view class="card-info">
							<view class="card-left">
								<view class="card-title">活动<text>{{ item.title }}</text></view>
								<view class="card-box">
									<view class="card-user">用户<text>{{ item.nickname }}</text></view>
									<view class="card-phone">号码<text>{{ item.phone }}</text></view>
								</view>
								<view class="card-specItem">规格<text>{{ item.specInfo?.content }}</text></view>
							</view>
							<view class="card-status" v-if="item.state == 2">
								<button :class="['status-btn', buttonStatus[item.state].value]" @click="btnClick(item)">
									{{ buttonStatus[item.state].label }}
								</button>
							</view>
						</view>
					</view>
					<view class="card-detail" v-if="item.photo.split(',').length || item.reason">
						<view class="detail-row" v-if="item.state == 3">
							<text class="label">原因：</text>
							<text>{{ item.reason }}</text>
						</view>
						<view class="detail-row" v-else>
							<text class="label">报名资料</text>
							<view class="detail-images">
								<image :src="getFullImageUrl(item)" v-for="(item, idx) in item.photo.split(',')" :key="item" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="activity-empty">
			<image src="/static/user/activity-empty.png"></image>
			<view>暂无内容</view>
			<text>活动箱饿晕了…急需支援...</text>
		</view>
		<AuditPopup v-model:show="showAudit" v-model:modelValue="currentIndex" :items="mediaList" @approve="handleApprove" @reject="handleReject" />
	</view>
	<u-popup :show="showSpecPopup" @close="showSpecPopup = false" @open="showSpecPopup = true" :mask-click="false" border-radius="20" :safe-area-inset-bottom="true" round="20">
		<view class="popup-content">
			<view class="popup-title" style="color: #1A1A1A;">
				选择规格
				<view class="close-btn">
					<u-icon name="arrow-down" custom-class="close-btn" @click="hidePopup" />
				</view>
			</view>
			<view class="spec-list">
				<view class="spec-item" v-for="(items, index) in specItemList" :key="items.id">
					<view class="spec-title">{{ items.title }}</view>
					<view class="spec-contentList">
						<view v-for="(item, index) in item.contentList" :key="item.id" class="spec-content" @click="checkSpecItem(item.id)" :class="{ 'active': specItemId.includes(item.id) }">{{ item.content }}</view>
					</view>
				</view>
			</view>
			<button class="submit-btn" :disabled="!specItemId.length" @click="showSpecPopup=false">提交</button>
		</view>
	</u-popup>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ActivityApi } from '../../../services/activity'
import { onReachBottom, } from '@dcloudio/uni-app'
import { onLoad } from '@dcloudio/uni-app';
import { getFullImageUrl, getGeoCoder } from '../../../utils/utils';
import AuditPopup from './components/AuditPopup.vue';
const id = ref([])
const list = ref([])
const page = ref(1)
const pageSize = 10
const loading = ref(false)
const finished = ref(false)
const specItemList = ref([])
const showAudit = ref(false)
const mediaList = ref([])
const currentIndex = ref(0)
const groupCount = ref([])

const specItemId = ref([])
const showSpecPopup = ref(false)
const getList = () => {
	if (loading.value || finished.value) return
	loading.value = true
	uni.showLoading()
	ActivityApi.getSignlist({ page: page.value, perPage: pageSize, state: activeTab.value, id: id.value, specItemId: specItemId.value }).then(res => {
		console.log(res)
		uni.hideLoading()
		specItemList.value = res.specItemList
		groupCount.value = res.groupCount
		list.value.push(...(res.content || []))
		page.value++
		loading.value = false
	})
}

onLoad((option) => {
	console.log(option)
	id.value = option.id
	getList()
})
onReachBottom(() => {
	getList()
})

const buttonStatus = {
	2: { value: 'pending', label: '待审核' },
	1: { value: 'done', label: '已审核' },
	3: { value: 'reject', label: '已拒绝' },
	4: { value: 'used', label: '查看详情' },
}

const tabs = [
	{ label: '待审核', value: '2', key: 2 },
	{ label: '已审核', value: '1', key: 1 },
	{ label: '已拒绝', value: '3', key: 3 },
	{ label: '已核销', value: '4', key: 4 },
]
const activeTab = ref('2')
const changeTab = (val) => {
	activeTab.value = val
	console.log(val)
	page.value = 1
	list.value = []
	finished.value = false
	getList()
}
const btnClick = (item) => {
	console.log(item.photo.split(','))
	showAudit.value = item
	mediaList.value = item.photo.split(',')
	// if (item.state == 2 || item.state == 4) {
	// 	uni.navigateTo({ url: '/pages/user/Activity/verify?type=user&id=' + item.id })
	// } else if (item.state == 1) {
	// 	uni.showToast({ title: '订单审核中' })
	// }
}

const handleApprove = () => {
	ActivityApi.postAuditorder({
		id: showAudit.value.id,
		state: 2,
	}).then(res => {
		if (res?.ret == 1) {
			uni.showToast({ title: res.msg, icon: 'error' })
		} else if (!res) {
			showAudit.value = false
			mediaList.value = []
			// list.value = list.value.map(item => item.id == showAudit.value.id ? { ...item, state: true } : item)
			page.value = 1
			list.value = []
			finished.value = false
			getList()
			uni.showToast({ title: '审批成功！' })
		}
	})
}

const handleReject = (reason) => {
	ActivityApi.postAuditorder({
		id: showAudit.value.id,
		state: 3,
		reason
	}).then(res => {
		if (res?.ret == 1) {
			uni.showToast({ title: res.msg, icon: 'error' })
		} else if (!res) {
			showAudit.value = false
			mediaList.value = []
			// list.value = list.value.map(item => item.id == showAudit.value.id ? { ...item, state: true } : item)
			page.value = 1
			list.value = []
			finished.value = false
			getList()
			uni.showToast({ title: '审批成功！' })
		}
	})
}
const checkSpecItem = (id) => {
	specItemId.value = id
}
</script>

<style scoped lang="scss">
.spec-list {
	height: 450rpx;
	overflow: scroll;
	display: flex;
	flex-direction: column;
	gap: 33rpx;
	padding: 12rpx 0;
}

.spec-item {
	display: flex;
	color: #1A1A1A;
	align-items: baseline;
	gap: 12rpx;

	.spec-title {
		width: 170rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.spec-contentList {
		display: flex;
		width: 480rpx;
		gap: 23rpx;
		flex-wrap: wrap;

		.spec-content {
			border: 1px solid #E6E6E6;
			border-radius: 12rpx;
			padding: 18rpx 41rpx;

			&.active {
				background-color: #1A1A1A;
				color: #fff;
			}
		}
	}
}


.submit-btn {
	width: 350rpx;
	height: 76rpx;
	background: #222;
	color: #fff;
	font-size: 28rpx;
	border-radius: 50rpx;
	padding: 18rpx 0;
	font-weight: bold;
	margin-top: 24rpx;
	opacity: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.submit-btn:disabled {
	background: #ccc;
	color: #fff;
	opacity: 0.7;
}

.popup-content {
	background: #fff;
	border-radius: 24rpx 24rpx 0 0;
	padding: 32rpx 24rpx 24rpx 24rpx;
	min-height: 600rpx;
	position: relative;
}

.popup-title {
	font-size: 32rpx;
	font-weight: bold;
	text-align: center;
	margin-bottom: 32rpx;
	position: relative;
	color: rgba(64, 33, 49, 1);
	display: flex;
	justify-content: center;

	.u-icon {
		margin-left: auto;
		font-size: 16rpx;
	}
}

.close-btn {
	position: absolute;
	right: 0;
	top: 0;
}

.activity-filter {
	display: flex;
	justify-content: space-between;
	font-size: 22rpx;
	margin: 20rpx 13rpx;

	.activity-filter-btn {
		display: flex;
		color: #1A1A1A;
		align-items: center;
		gap: 10rpx;

		image {
			width: 21rpx;
			height: 21rpx;
		}
	}

	.activity-filter-reset {
		color: #999999;
	}
}

.activity-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 338rpx;

	image {
		width: 402rpx;
		height: 308rpx;
	}

	view {
		margin-top: 100rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
	}

	text {
		margin-top: 29rpx;
		font-size: 28rpx;
		color: rgba(153, 153, 153, 1);
	}
}

.activity-page {
	background: #fafafa;
	min-height: 100vh;
	padding-bottom: 40rpx;
}

.tab-bar {
	display: flex;
	border-radius: 0 0 20rpx 20rpx;
	margin-bottom: 18rpx;
	padding: 0 10rpx;
}

.tab-item {
	flex: 1;
	text-align: center;
	font-size: 26rpx;
	color: #888;
	padding: 12rpx 0;
	border-radius: 40rpx;
	margin: 12rpx 8rpx 0 8rpx;
	background: #fff;
	border: 1px solid #eee;
}

.tab-item.active {
	background: #1a1a1a;
	color: #fff;
	font-weight: bold;
}

.activity-list {
	padding: 0 13rpx;
}

.activity-card {
	background: #fff;
	border-radius: 18rpx;
	margin-bottom: 20rpx;
	overflow: hidden;
	padding: 32rpx 20rpx 0;

}

.order-row {
	display: flex;
	justify-content: space-between;
	font-size: 22rpx;
	color: #aaa;
}

.card-main {
	padding: 10rpx 0;
	position: relative;
}

.card-content {
	display: flex;
	padding: 29rpx 0 23rpx;
	border-bottom: 1px dotted rgba(217, 217, 217, 1);
}

.card-img {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	margin-right: 20rpx;
	object-fit: cover;
	flex-shrink: 0;
}

.card-info {
	display: flex;
	justify-content: space-between;
	flex: 1;
	align-items: flex-end;

	.card-left {
		font-size: 24rpx;
		color: #999999;
		display: flex;
		flex-direction: column;
		gap: 10rpx;

		.card-box {
			display: flex;
			gap: 4rpx;

			text {
				display: inline-block;
				min-width: 120rpx;
			}

		}

		text {
			color: #1A1A1A;
			margin-left: 26rpx;
		}
	}
}

.card-title {
	flex: 1;

	text {
		font-size: 26rpx;
	}
}

.card-status {
	display: flex;
	justify-content: end;
}

.card-statustext {
	align-self: flex-start;
}

.status-btn {
	font-size: 25rpx;
	border-radius: 53rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 53rpx;
	width: 132rpx;
	color: #888;
	background: #f2f2f2;
	margin: 0;
	margin-left: auto;
	white-space: nowrap;
}

.status-btn.pending {
	color: #fff;
	background: #222;
	border: none;
}

.status-btn.verify {
	color: #fff;
	background: #ff6600;
	border: none;
}

.status-text {
	font-size: 22rpx;
}

.status-text.reject {
	color: #1A1A1A;
}

.status-text.done {
	color: #CCCCCC;
}

.status-text.used {
	color: #999999;
}

.card-detail {
	font-size: 22rpx;
	color: rgba(26, 26, 26, 1);
	padding: 23rpx 0 0;
}

.detail-row {
	margin-bottom: 13rpx;
	display: flex;
	color: #999999;

	.valueview {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.detail-images {
		display: flex;
		margin-left: 26rpx;
		gap: 22rpx;
	}

	image {
		width: 82rpx;
		height: 82rpx;
		border-radius: 4rpx;
	}
}

.value {
	color: rgba(26, 26, 26, 1);
}

.arrow {
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}
</style>