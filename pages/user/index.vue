<template>
  <view class="mine-page">
    <!-- 头部用户信息 -->
    <view class="user-info">
      <image class="avatar" src="https://your-image-url/avatar.jpg" />
      <view class="user-name">Momo大锤子</view>
      <view class="setting" @click="goSetting">
        <uni-icons type="gear" size="28" color="#333" />
        <text class="setting-text">设置</text>
      </view>
    </view>

    <!-- 我的活动 -->
    <view class="section">
      <view class="section-title">我的活动</view>
      <view class="activity-list">
        <view class="activity-item" v-for="item in activities" :key="item.text" @click="onActivityClick(item)">
          <uni-icons :type="item.icon" size="32" color="#222" />
          <text class="activity-text">{{ item.text }}</text>
        </view>
      </view>
    </view>

    <!-- 活动工具 -->
    <view class="section">
      <view class="section-title">活动工具</view>
      <view class="tool-list">
        <view class="tool-item" v-for="tool in tools" :key="tool.text" @click="onActivityClick(tool)">
          <uni-icons :type="tool.icon" size="32" color="#222" />
          <text class="tool-text">{{ tool.text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activities: [
        { icon: 'grid', text: '全部' },
        { icon: 'circle', text: '痕章楼' },
        { icon: 'list', text: '痕楼捺' },
        { icon: 'checkbox', text: '已完成' }
      ],
      tools: [
        { icon: 'plusempty', text: '发布活动' },
        { icon: 'chatboxes', text: '活动管理' },
        { icon: 'scan', text: '扫码核销' },
        { icon: 'personadd', text: '发布印章' }
      ]
    }
  },
  methods: {
    goSetting() {
      // 跳转到设置页
      uni.navigateTo({ url: '/pages/setting/index' })
    },
    onActivityClick(item) {
		console.log(item)
      // 处理活动点击
		uni.navigateTo({ url: '/pages/user/Activity/index' })
    },
    onToolClick(tool) {
      // 处理工具点击
      uni.showToast({ title: tool.text, icon: 'none' })
    }
  }
}
</script>

<style scoped>
.mine-page {
  background: #f7f7f7;
  min-height: 100vh;
  padding-bottom: 40rpx;
}
.user-info {
  display: flex;
  align-items: center;
  padding: 40rpx 30rpx 20rpx 30rpx;
  background: #fff;
  border-radius: 0 0 24rpx 24rpx;
  position: relative;
}
.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 24rpx;
  border: 2rpx solid #eee;
}
.user-name {
  font-size: 32rpx;
  font-weight: bold;
  flex: 1;
}
.setting {
  display: flex;
  align-items: center;
  position: absolute;
  right: 30rpx;
  top: 50%;
  transform: translateY(-50%);
}
.setting-text {
  font-size: 22rpx;
  margin-left: 6rpx;
  color: #888;
}
.section {
  margin: 32rpx 20rpx 0 20rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 24rpx 0 10rpx 0;
}
.section-title {
  font-size: 26rpx;
  font-weight: bold;
  margin-left: 32rpx;
  margin-bottom: 18rpx;
}
.activity-list, .tool-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 10rpx;
}
.activity-item, .tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.activity-text, .tool-text {
  font-size: 22rpx;
  color: #222;
  margin-top: 8rpx;
}
</style>
