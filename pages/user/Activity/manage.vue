<template>
  <PageScaffold>
    <ActivityCard
      v-for="(activity, index) in data"
      :key="index"
      :activity="activity"
      @scan="onScan(activity)"
      @generateCode="onGenerateCode(activity)"
      @takeDown="onTakeDown(activity)"
      @refresh="onRefreshItem(index, activity)"
      customClass="mb-2"
    />
    
    <uni-load-more v-if="!empty" :status="status" />
    <view v-else class="activity-empty">
      <image src="/static/user/activity-empty.png"></image>
      <view>暂无内容</view>
      <text>活动箱饿晕了…急需支援...</text>
    </view>
  </PageScaffold>
</template>

<script setup>
import ActivityCard from '@/components/ActivityCard.vue'
import PageScaffold from '../../../components/PageScaffold.vue'
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { ActivityApi } from '../../../services/activity'
import { useList } from '../../../hooks/useList'

const fetchData = async (page) => {
  const response = await ActivityApi.fetchActivityManageList({
    page,
    perPage: 10
  })
  return response.content
}

const { data, status, loadMore, refresh, empty } = useList(fetchData)

const onRefreshItem = async (index, activity) => {
  const response = await ActivityApi.fetchActivityDetail(activity.id)
  data.value[index] = response.content
}

onReachBottom(loadMore)
onPullDownRefresh(async () => {
  await refresh()
  uni.stopPullDownRefresh()
})

const onGenerateCode = (activity) => {
  console.log('生成核销码', activity)
  uni.showToast({
    title: '生成核销码功能',
    icon: 'none'
  })
}

const onTakeDown = (activity) => {
  uni.showModal({
    title: '确认下架',
    content: '确定要下架这个活动吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '活动已下架',
          icon: 'success'
        })
      }
    }
  })
}
</script>

<style scoped>
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
</style>