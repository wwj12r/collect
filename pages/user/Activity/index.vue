<template>
  <view class="activity-page">
    <!-- 顶部分类Tab -->
    <view class="tab-bar">
      <view
        v-for="(tab, idx) in tabs"
        :key="tab"
        :class="['tab-item', { active: idx === activeTab }]"
        @click="activeTab = idx"
      >
        {{ tab }}
      </view>
    </view>

    <!-- 活动卡片列表 -->
    <view class="activity-list">
      <view class="activity-card" v-for="(item, idx) in filteredList" :key="item.orderNo">
        <view class="order-row">
          <text class="order-no">订单编号:{{ item.orderNo }}</text>
          <text class="signup-time">报名时间:{{ item.signupTime }}</text>
        </view>
        <view class="card-main">
          <image :src="item.img" class="card-img" mode="aspectFill" />
          <view class="card-info">
            <view class="card-title">{{ item.title }}</view>
            <view class="card-status">
              <button
                v-if="item.statusText"
                :class="['status-btn', item.statusType]"
                size="mini"
                plain
              >
                {{ item.statusText }}
              </button>
            </view>
            <view class="card-detail">
              <view class="detail-row">
                <text class="label">活动时间：</text>
                <text class="value">{{ item.time }}</text>
              </view>
              <view class="detail-row">
                <text class="label">活动地址：</text>
                <text class="value">{{ item.address }}</text>
              </view>
            </view>
          </view>
          <uni-icons type="right" size="24" color="#bbb" class="arrow" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = ['全部', '待审核', '待核销', '已完成']
const activeTab = ref(0)

const list = [
  {
    orderNo: '241234585456452510082',
    signupTime: '2025-07-12 13:21',
    img: 'https://your-image-url/act1.jpg',
    title: '见珠水.荔路繁花Hallo Pandas熊猫主题市集',
    statusText: '待审核',
    statusType: 'pending',
    time: '2025-07-30 11:30',
    address: '广州市越秀区文德路西场东街一巷285:05'
  },
  {
    orderNo: '241234585456452510083',
    signupTime: '2025-07-12 13:25',
    img: 'https://your-image-url/act2.jpg',
    title: '书店盖章活动「1200x幸运无限联名套色章」',
    statusText: '',
    statusType: '',
    time: '2025-08-15 14:30',
    address: '广州市越秀区1200bookshop北京路店'
  },
  {
    orderNo: '241234585456452510084',
    signupTime: '2025-07-12 13:29',
    img: 'https://your-image-url/act3.jpg',
    title: '见珠水.荔路繁花Hallo Pandas熊猫主题市集',
    statusText: '核销码',
    statusType: 'verify',
    time: '2025-07-30 11:30',
    address: '广州市越秀区文德路西场东街一巷285:05'
  },
  {
    orderNo: '24123458545695210087',
    signupTime: '2025-07-12 11:25',
    img: 'https://your-image-url/act4.jpg',
    title: '北京路套色章上线Hallo Pandas熊猫主题市集',
    statusText: '',
    statusType: '',
    time: '2025-08-01 10:00',
    address: '广州市越秀区北京路步行街'
  }
]

const filteredList = computed(() => {
  if (activeTab.value === 0) return list
  if (activeTab.value === 1) return list.filter(i => i.statusText === '待审核')
  if (activeTab.value === 2) return list.filter(i => i.statusText === '核销码')
  if (activeTab.value === 3) return list.filter(i => i.statusText === '')
  return list
})
</script>

<style scoped>
.activity-page {
  background: #f7f7f7;
  min-height: 100vh;
  padding-bottom: 40rpx;
}
.tab-bar {
  display: flex;
  background: #fff;
  border-radius: 0 0 20rpx 20rpx;
  margin-bottom: 18rpx;
  padding: 0 10rpx;
}
.tab-item {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #888;
  padding: 22rpx 0;
  border-radius: 40rpx;
  margin: 12rpx 8rpx 0 8rpx;
  background: #f2f2f2;
}
.tab-item.active {
  background: #222;
  color: #fff;
  font-weight: bold;
}
.activity-list {
  padding: 0 16rpx;
}
.activity-card {
  background: #fff;
  border-radius: 18rpx;
  margin-bottom: 18rpx;
  border: 2rpx dashed #ccc;
  overflow: hidden;
  padding: 0 0 10rpx 0;
}
.order-row {
  display: flex;
  justify-content: space-between;
  font-size: 20rpx;
  color: #aaa;
  padding: 12rpx 16rpx 0 16rpx;
}
.card-main {
  display: flex;
  align-items: flex-start;
  padding: 10rpx 16rpx 0 16rpx;
  position: relative;
}
.card-img {
  width: 120rpx;
  height: 90rpx;
  border-radius: 12rpx;
  margin-right: 16rpx;
  object-fit: cover;
  flex-shrink: 0;
}
.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.card-title {
  font-size: 26rpx;
  font-weight: bold;
  color: #222;
  margin-bottom: 8rpx;
}
.card-status {
  margin-bottom: 8rpx;
}
.status-btn {
  font-size: 22rpx;
  border-radius: 20rpx;
  padding: 0 18rpx;
  height: 36rpx;
  line-height: 36rpx;
  border: 2rpx solid #bbb;
  color: #888;
  background: #f2f2f2;
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
.card-detail {
  font-size: 20rpx;
  color: #666;
}
.detail-row {
  margin-bottom: 2rpx;
}
.label {
  color: #888;
}
.value {
  color: #333;
}
.arrow {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
