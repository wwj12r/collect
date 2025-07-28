<template>
  <view class="upload-box">
    <!-- 已上传的图片 -->
    <view v-for="(img, idx) in imgUrl" :key="idx" class="image-item">
      <image :src="prefillPath(img)" class="upload-img" mode="aspectFill" />
      <view class="delete-btn" @click.stop="deleteImage(idx)">
        <uni-icons type="close" size="16" color="#fff" />
      </view>
    </view>
    
    <!-- 添加按钮 -->
    <view v-if="imgUrl.length < limit" class="upload-empty" @click="chooseImage">
      <image class="plus" src="/static/index/add.png" v-if="!isUploading"></image>
      <uni-load-more v-else status="loading" :contentText="{ contentrefresh: '上传中' }" />
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { uploadImg } from '../utils/utils';
import { imgBaseUrl } from '../utils/enums';

// 使用 defineModel API
const model = defineModel({
  type: Array,
  default: () => []
})

// 定义组件属性
const props = defineProps({
  limit: {
    type: Number,
    default: 9
  },
  onChange: {
    type: Function,
    default: null
  }
})

// 定义事件
const emit = defineEmits(['change'])

// 图片列表
const imgUrl = ref(model.value || [])

const isUploading = ref(false)

// 监听外部传入的 model 变化
watch(() => model.value, (newVal) => {
  imgUrl.value = newVal || []
}, { deep: true })

// 监听内部 imgUrl 变化，向外部发送更新
watch(imgUrl, (newVal) => {
  model.value = newVal
  emit('change', newVal)
  if (props.onChange) {
    props.onChange(newVal)
  }
}, { deep: true })

const prefillPath = (url) => `${imgBaseUrl}${url}`

// 选择图片
const chooseImage = () => {
  if (isUploading.value) return;
  const remainingCount = props.limit - imgUrl.value.length
  if (remainingCount <= 0) {
    uni.showToast({
      title: `最多只能上传${props.limit}张图片`,
      icon: 'none'
    })
    return
  }

  uni.chooseImage({
    count: remainingCount,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: async (res) => {
      isUploading.value = true
      try {
        const response = await uploadImg(res.tempFilePaths);
        const photos = response.map(i => i.imgUrl)
        const newImages = [...imgUrl.value, ...photos]
        imgUrl.value = newImages
      } finally {
        isUploading.value = false
      }
    },
    fail: (err) => {
      console.error('选择图片失败:', err)
      uni.showToast({
        title: '选择图片失败',
        icon: 'none'
      })
    }
  })
}

// 删除图片
const deleteImage = (index) => {
  const newImages = [...imgUrl.value]
  newImages.splice(index, 1)
  imgUrl.value = newImages
}
</script>

<style lang="scss" scoped>
.upload-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20rpx;
  width: 100%;
}

.image-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12rpx;
  overflow: hidden;
}

.upload-img {
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
}

.delete-btn {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  width: 40rpx;
  height: 40rpx;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-empty {
  width: 100%;
  aspect-ratio: 1;
  border: 2rpx dashed #ddd;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-empty:hover {
  border-color: #007aff;
  background: #f0f8ff;
}

.plus {
  width: 40rpx;
  height: 40rpx;
}

.upload-text {
  font-size: 24rpx;
  color: #999;
}
</style>