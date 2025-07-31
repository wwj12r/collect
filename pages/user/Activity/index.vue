<template>
  <view class="activity-page">
    <!-- 顶部分类Tab -->
    <view class="tab-bar">
      <view v-for="(tab, idx) in tabs" :key="tab" :class="['tab-item', { active: tab.value === activeTab }]" @click="changeTab(tab.value)">
        {{ tab.label }}
      </view>
    </view>

    <!-- 活动卡片列表 -->
    <view class="activity-list" v-if="list.length">
      <view class="activity-card" v-for="(item, idx) in list" :key="item.id">
        <view class="order-row">
          <text class="order-no">订单编号：{{ item.orderSn }}</text>
          <text class="signup-time">报名时间：{{ item.createTime }}</text>
        </view>
        <view class="card-main">
          <view class="card-content">
            <image :src="getFullImageUrl(item.photo)" class="card-img" mode="aspectFill" />
            <view class="card-info">
              <view class="card-title">{{ item.title }}</view>
              <view class="card-status">
                <button v-if="item.state" :class="['status-btn', buttonStatus[item.state].value]" @click="btnClick(item)">
                  {{ buttonStatus[item.state].label }}
                </button>
              </view>
            </view>
          </view>
          <view class="card-detail">
            <view class="detail-row">
              <text class="label">活动时间：</text>
              <text class="value">{{ item.startTime }}</text>
            </view>
            <view class="detail-row">
              <text class="label">活动地址：</text>
              <view class="value valueview" @click="toAddress(item.address)">{{ item.address }}<uni-icons type="right" size="10"></uni-icons></view>
              <!-- <uni-icons type="right" size="18" color="rgba(26, 26, 26, 1)" class="arrow" /> -->
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
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ActivityApi } from '../../../services/activity'
import { onReachBottom, } from '@dcloudio/uni-app'
import { onLoad } from '@dcloudio/uni-app';
import { getFullImageUrl, getGeoCoder } from '../../../utils/utils';
const list = ref([])
const page = ref(1)
const pageSize = 10
const loading = ref(false)
const finished = ref(false)
const activitySignetOrderStateList = ref({})
const getList = () => {
  if (loading.value || finished.value) return
  loading.value = true
  uni.showLoading()
  ActivityApi.getMylist({ page: page.value, perPage: pageSize, state: activeTab.value }).then(res => {
    console.log(res)
    uni.hideLoading()
    activitySignetOrderStateList.value = res.activitySignetOrderStateList
    list.value.push(...(res.content || []))
    page.value++
    loading.value = false
  })
}


const toAddress = async (address) => {
  const geo = await getGeoCoder(address)
  wx.openLocation({
    latitude: geo.lat, // 纬度（Number 类型）
    longitude: geo.lng, // 经度（Number 类型）
    // name: detail.value.content.address, // 位置名称（可选）
    address: address, // 详细地址信息（可选）
    scale: 18, // 缩放比例，范围5~18，默认为18
    success: function () {
      console.log('打开地图成功');
    },
    fail: function (err) {
      console.error('打开地图失败', err);
    }
  });
}

onLoad((option) => {
  console.log(option)
  activeTab.value = option.type
  getList()
})
onReachBottom(() => {
  getList()
})

const buttonStatus = {
  1: { value: 'pending', label: '待审核' },
  2: { value: 'verify', label: '核销码' },
  3: { value: '', label: '审核不通过' },
  4: { value: '', label: '已核销' },
}

const tabs = [
  { label: '全部', value: '1,2,3,4' },
  { label: '待审核', value: '1' },
  { label: '待核销', value: '2' },
  { label: '已完成', value: '4' },
]
const activeTab = ref(0)
const changeTab = (val) => {
  activeTab.value = val
  console.log(val)
  page.value = 1
  list.value = []
  finished.value = false
  getList()
}
const btnClick = (item) => {
  console.log(item.state)
  if (item.state == 2) {
    uni.navigateTo({ url: '/pages/user/Activity/verifyid=' + item.id })
  }
}
</script>

<style scoped lang="scss">
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
  font-size: 20rpx;
  color: #aaa;
  padding: 12rpx 0;
}

.card-main {
  padding: 10rpx 0;
  position: relative;
}

.card-content {
  display: flex;
  padding: 34rpx 0 23rpx;
  border-bottom: 1px dotted rgba(217, 217, 217, 1);
}

.card-img {
  width: 226rpx;
  height: 165rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
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
  flex: 1;
}

.card-status {
  display: flex;
  justify-content: end;
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
  color: rgba(26, 26, 26, 1);
  padding: 23rpx 0 0;
}

.detail-row {
  margin-bottom: 13rpx;
  display: flex;

  .valueview {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.label {
  color: rgba(26, 26, 26, 1);
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
