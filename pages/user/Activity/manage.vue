<template>
  <PageScaffold>
    <ActivityCard
      v-for="(activity, index) in data"
      :key="index"
      :activity="activity"
      @scan="onScan(activity)"
      @generateCode="onGenerateCode(activity)"
      @takeDown="onTakeDown(activity)"
      @refresh="refresh"
      customClass="mb-2"
    />
    <uni-load-more :status="status" />
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

const { data, status, loadMore, refresh } = useList(fetchData)

onReachBottom(loadMore)
onPullDownRefresh(refresh)

const onScan = (activity) => {
  console.log('扫码核销', activity)
  uni.showToast({
    title: '扫码核销功能',
    icon: 'none'
  })
}

const onGenerateCode = (activity) => {
  console.log('生成核销码', activity)
  uni.showToast({
    title: '生成核销码功能',
    icon: 'none'
  })
}

const onTakeDown = (activity) => {
  console.log('下架活动', activity)
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
/* 保留必要的自定义样式，主要用于小程序兼容性 */
</style>