<template>
  <view 
    :class="['bg-white rounded-lg shadow-sm overflow-hidden', customClass]" 
    :style="[{ borderRadius: '18rpx', boxShadow: '0 4rpx 16rpx rgba(0, 0, 0, 0.08)' }, customStyle]"
  >
    <!-- 顶部信息 -->
    <view class="flex justify-between items-center m-3">
      <text class="text-sm text-branding-grey" style="font-size: 28rpx;">创建时间: {{ activity.createTime }}</text>
      <text 
        class="text-sm font-medium" 
        :class="{ 'text-branding-grey': activity.status === '已发布', 'text-branding-orange': activity.status !== '已发布' }"
        style="font-size: 28rpx; font-weight: 500;"
      >
        {{ ActivityStateLabelMapper[activity.state] }}
      </text>
    </view>

    <!-- 活动主体 -->
    <view class="flex m-3 mt-0">
      <image 
        :src="prefillImageUrl(activity.photo)" 
        class="rounded-lg mr-2 flex-shrink-0" 
        mode="aspectFill"
        style="width: 226rpx; height: 192rpx; border-radius: 12rpx;"
      />
      <view class="flex-1 overflow-hidden flex flex-col justify-between">
        <view class="text-sm font-bold text-gray-900">
          {{ activity.title }}
        </view>
        <view>
          <view class="flex items-center">
            <text class="text-xs text-gray-600 flex-shrink-0">活动时间：</text>
            <text class="text-xs text-gray-800 flex-1">{{ activity.startTime }}</text>
          </view>
          <view class="flex items-center">
            <text class="text-xs text-gray-600 flex-shrink-0">活动地址：</text>
            <text class="text-xs text-gray-800 flex-1 min-w-0 truncate">{{ activity.address }}</text>
            <uni-icons type="right" size="16" color="#bbb" class="flex-shrink-0 ml-1" />
          </view>
        </view>
      </view>
    </view>

    <!-- 统计数据 -->
    <view class="flex justify-between m-3 pt-3 border-t border-gray-100">
      <view class="flex items-center">
        <img src="/static/user/activity-joined.png" class="w-3 h-3" />
        <text class="text-xs text-branding-grey ml-1">{{ activity.num }}人报名</text>
      </view>
      <view class="flex items-center">
        <img src="/static/user/activity-liked.png" class="w-3 h-3" />
        <text class="text-xs text-branding-grey ml-1">{{ activity.zanNum }}人点赞</text>
      </view>
      <view class="flex items-center">
        <img src="/static/user/activity-verified.png" class="w-3 h-3" />
        <text class="text-xs text-branding-grey ml-1">已核销{{ activity.usedNum }}人</text>
      </view>
      <view class="flex items-center">
        <img src="/static/user/activity-unverified.png" class="w-3 h-3" />
        <text class="text-xs text-branding-grey ml-1">未核销{{ activity.limitNum - activity.usedNum }}人</text>
      </view>
    </view>

    <!-- 操作按钮 -->
    <view v-if="activity.state === ActivityState.PUBLISHED" class="flex justify-around m-3 pt-2">
      <button 
        shape="circle"
        plain
        size="default"
        class="p-1 w-[200rpx] rounded-full text-sm font-bold bg-transparent inline-flex items-center justify-center !border !border-branding-grey !m-0"
        @click="onScan"
      >
        扫码核销
      </button>
      <button 
        shape="circle"
        plain
        size="default"
        class="p-1 w-[200rpx] rounded-full text-sm font-bold bg-transparent inline-flex items-center justify-center !border !border-branding-grey !m-0"
        @click="onGenerateCode"
      >
        生成核销码
      </button>
      <button 
        plain
        size="default"
        class="p-1 w-[200rpx] rounded-full text-sm font-bold bg-transparent inline-flex items-center justify-center !border !border-branding-grey !m-0"
        @click="onTakeDown"
        :loading="unpublishLoading"
        shape="circle"
      >
        下架
      </button>
    </view>

    <view v-if="activity.state === ActivityState.UNPUBLISHED" class="flex justify-around m-3 pt-2">
      <button 
        plain
        size="default"
        class="p-1 w-[240rpx] rounded-full text-sm font-bold bg-transparent inline-flex items-center justify-center !border !border-branding-grey !m-0"
        @click="onReEdit"
        shape="circle"
      >
        重新编辑
      </button>
      <button
        plain
        size="default"
        class="p-1 w-[240rpx] rounded-full text-sm font-bold bg-transparent inline-flex items-center justify-center !border !border-branding-grey !m-0"
        @click="onRepublishConfirm"
        shape="circle"
        :loading="republishLoading"
      >
        上架
      </button>
    </view>
  </view>
</template>

<script setup>
import { useAction } from '../hooks/useAction';
import { ActivityApi, ActivityState, ActivityStateLabelMapper } from '../services/activity';
import { prefillImageUrl } from '../utils/utils';

const emit = defineEmits(['scan', 'refresh'])

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    default: () => ({
      createTime: '',
      status: '',
      photo: '',
      title: '',
      time: '',
      address: '',
      startTime: '',
      zanNum: 0,
      usedNum: 0,
      num: 0,
      limitNum: 0,
      state: null,
      // stats: {
      //   joined: 0,
      //   liked: 0,
      //   verified: 0,
      //   unverified: 0
      // }
    })
  },
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

const onRepublishConfirm = () => {
  uni.showModal({
    title: '确认上架',
    content: '确定要上架这个活动吗？',
    success: async (res) => {
      if (res.confirm) {
        await republish()
        emit('refresh')
      }
    }
  })
}

const [republishLoading, republish] = useAction({
  successMessage: '上架成功',
  failedMessage: '上架失败',
  aciton: async () => {
    await ActivityApi.changeActivityState(props.activity.id, ActivityState.PUBLISHED)
    return true;
  }
})

const onTakeDown = () => {
  uni.showModal({
    title: '确认下架',
    content: '确定要下架这个活动吗？',
    success: async (res) => {
      if (res.confirm) {
        await unpublish()
        emit('refresh')
      }
    }
  })
}

const [unpublishLoading, unpublish] = useAction({
  successMessage: '下架成功',
  failedMessage: '下架失败',
  aciton: async () => {
    await ActivityApi.changeActivityState(props.activity.id, ActivityState.UNPUBLISHED)
    return true;
  }
})

const onScan = () => {
  emit('scan', activity)
}

const onReEdit = () => {
  uni.navigateTo({
    url: `/pages/user/Activity/publish?id=${props.activity.id}`
  })
}

const onGenerateCode = () => {
  uni.navigateTo({
    url: `/pages/user/Activity/verify?id=${props.activity.id}`
  })
}
</script>

<style scoped>
/* 保留必要的自定义样式，主要用于小程序兼容性 */
</style>
